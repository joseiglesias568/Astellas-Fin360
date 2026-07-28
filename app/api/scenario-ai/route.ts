import { NextRequest } from 'next/server';
import { assertAuthenticatedApi } from '@/lib/assert-auth-api';
import { generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { MODEL_MAP } from '@/lib/ai/model-router';

interface LeverSpec {
  id: string;
  name: string;
  description: string;
  min: number;
  max: number;
  default: number;
  step: number;
  unit: string;
  category: string;
}

export async function POST(request: NextRequest) {
  const denied = await assertAuthenticatedApi(request);
  if (denied) return denied;

  try {
    const { scenario, tabId, tabLabel, tabDescription, levers } = await request.json() as {
      scenario: string;
      tabId: string;
      tabLabel: string;
      tabDescription: string;
      levers: LeverSpec[];
    };

    if (!scenario || !levers?.length) {
      return Response.json({ error: 'Scenario description and levers are required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
    }

    // Build lever descriptions for the prompt
    const leverDescriptions = levers.map(l =>
      `- "${l.id}" (${l.name}): ${l.description}. Range: ${l.min}${l.unit} to ${l.max}${l.unit}, default: ${l.default}${l.unit}, step: ${l.step}`
    ).join('\n');

    const systemPrompt = `You are an Astellas Pharma Inc. (ALPMY) financial scenario modeling AI assistant. Your job is to interpret natural language scenario descriptions and map them to specific financial lever adjustments.

You are working in the "${tabLabel}" analysis tab: ${tabDescription}

Available levers you can adjust:
${leverDescriptions}

Rules:
1. Only adjust levers that are relevant to the user's scenario description.
2. Values MUST be within the specified min/max range for each lever.
3. Values MUST be aligned to the step size (e.g., if step is 5, use values like 0, 5, 10, not 3 or 7).
4. If the user mentions a specific number, try to use it (clamped to range).
5. If the user describes a directional change (e.g., "increase", "improve"), adjust from the default in that direction.
6. If the scenario implies multiple lever changes, adjust all relevant levers.
7. Provide a concise explanation of your reasoning.

Context for Astellas Pharma Inc.:
- FY2025 actuals: Revenue ¥2,139.2B (+11.9%), Core OP ¥555.7B (26.0% margin), Core EPS ¥237.01. FY2026 guidance: Revenue ¥2,220B, Core OP ¥620B (27.9%), Core EPS ¥256.77.
- Key products: XTANDI ¥960.8B (+5.3%, prostate cancer); Strategic Brands combined ¥480.3B (+43%): PADCEV ¥221.2B, IZERVAY ¥77.6B, XOSPATA ¥71.8B, VYLOY ¥63.1B, VEOZAH ¥46.6B.
- CEO Naoki Okamura / CFO Atsushi Kitamura priorities: XTANDI IRA risk mitigation, Strategic Brands to ¥610B FY2026, SMT ¥40B FY2026 savings, China expansion, 3+ pipeline POCs.
- Lever sensitivities: +1pp XTANDI IRA cut ≈ -¥9.6B revenue; +1pp Strategic Brands growth ≈ +¥4.8B revenue; +¥1B SMT savings ≈ +¥1B Core OP; +¥1 USD/JPY ≈ +¥2.1B revenue translation; +1pp China growth ≈ +¥1.0B revenue.
- FY2025 segments: United States ¥940.2B (44%), Established Markets ¥563.6B (26%), Japan ¥289.0B (14%), International ¥230.7B (11%), China ¥101.5B (5%).`;

    // Build the dynamic schema based on available levers
    // Note: Anthropic API does not support min/max on number types in JSON schema,
    // so we use plain z.number() and enforce bounds after parsing
    const leverSchema = z.object(
      Object.fromEntries(
        levers.map(l => [
          l.id,
          z.number()
            .optional()
            .describe(`${l.name}: ${l.description}. Range ${l.min}-${l.max}, default ${l.default}`)
        ])
      )
    );

    const resultSchema = z.object({
      explanation: z.string().describe('A concise 1-2 sentence explanation of what the scenario models and why these levers were adjusted'),
      leverAdjustments: leverSchema.describe('Only include levers that should change from their defaults'),
    });

    const result = await generateObject({
      model: anthropic(MODEL_MAP.sonnet),
      schema: resultSchema,
      prompt: `Scenario: "${scenario}"\n\nAnalyze this scenario and determine which levers to adjust and to what values. Only adjust levers relevant to the scenario.`,
      system: systemPrompt,
    });

    // Clamp values to lever bounds
    const clampedAdjustments: Record<string, number> = {};
    for (const [leverId, value] of Object.entries(result.object.leverAdjustments)) {
      if (value != null) {
        const lever = levers.find(l => l.id === leverId);
        if (lever) {
          clampedAdjustments[leverId] = Math.max(lever.min, Math.min(lever.max, value as number));
        }
      }
    }

    return Response.json({
      explanation: result.object.explanation,
      leverAdjustments: clampedAdjustments,
    });
  } catch (error) {
    console.error('[SCENARIO-AI ERROR]', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
