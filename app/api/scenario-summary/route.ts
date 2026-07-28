import { NextRequest } from 'next/server';
import { assertAuthenticatedApi } from '@/lib/assert-auth-api';
import { generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { MODEL_MAP } from '@/lib/ai/model-router';

export async function POST(request: NextRequest) {
  const denied = await assertAuthenticatedApi(request);
  if (denied) return denied;

  try {
    const { scenario, tabId, tabLabel, leverAdjustments, leverContext, calculatedImpact } = await request.json() as {
      scenario: string;
      tabId: string;
      tabLabel: string;
      leverAdjustments: Record<string, number>;
      leverContext: { id: string; name: string; unit: string; default: number }[];
      calculatedImpact?: Record<string, number | string>;
    };

    if (!scenario) {
      return Response.json({ error: 'Scenario description is required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
    }

    // Build a description of what levers changed
    const leverChanges = Object.entries(leverAdjustments).map(([id, value]) => {
      const lever = leverContext.find(l => l.id === id);
      if (!lever) return null;
      const direction = value > lever.default ? 'increased' : value < lever.default ? 'decreased' : 'unchanged';
      return `${lever.name}: ${lever.default}${lever.unit} → ${value}${lever.unit} (${direction})`;
    }).filter(Boolean).join('\n');

    // Build impact context if available
    const impactContext = calculatedImpact
      ? `\nCalculated financial impact from the deterministic model:\n${Object.entries(calculatedImpact).map(([k, v]) => `- ${k}: ${v}`).join('\n')}`
      : '';

    const systemPrompt = `You are a senior Astellas Pharma Inc. (ALPMY) financial strategy advisor providing executive-level scenario analysis. Your analysis should combine quantitative reasoning with strategic pharmaceutical, oncology, and global market judgment.

Context:
- Astellas Pharma Inc. (TSE: 4503, OTC: ALPMY). FY2025 actuals: Revenue ¥2,139.2B (+11.9%), Core OP ¥555.7B (26.0% margin), Core EPS ¥237.01. FY2026 guidance: Revenue ¥2,220B, Core OP ¥620B (27.9% margin), Core EPS ¥256.77.
- Key products: XTANDI (enzalutamide) ¥960.8B (+5.3%, prostate cancer); Strategic Brands ¥480.3B (+43%): PADCEV ¥221.2B (urothelial cancer), IZERVAY ¥77.6B (geographic atrophy), XOSPATA ¥71.8B (AML), VYLOY ¥63.1B (gastric cancer), VEOZAH ¥46.6B (vasomotor symptoms).
- CEO Naoki Okamura / CFO Atsushi Kitamura priorities: XTANDI IRA risk mitigation; Strategic Brands to ¥610B FY2026; SMT ¥40B FY2026 savings (cumulative ¥65B); R&D 3+ POCs and Phase 3 initiations; China expansion to ¥150B+.
- Lever sensitivities: +1pp XTANDI IRA cut ≈ -¥9.6B revenue; +1pp Strategic Brands growth ≈ +¥4.8B revenue; +¥1B SMT savings ≈ +¥1B Core OP; +¥1 USD/JPY ≈ +¥2.1B revenue; +1pp China growth ≈ +¥1.0B revenue.
- Key risks: XTANDI US IRA negotiation (≤-¥50B FY2026 headwind); ARSi competition (apalutamide/darolutamide); VYLOY launch execution; JPY/USD FX (¥151 FY2025 avg baseline); R&D Phase 3 binary outcomes.

You are analyzing the "${tabLabel}" scenario tab.`;

    const resultSchema = z.object({
      executiveSummary: z.string().describe('A 2-3 sentence executive summary of the scenario and its projected financial impact. Reference specific dollar amounts and basis points where possible.'),
      keyInsights: z.array(z.string()).describe('3-4 specific, actionable insights about this scenario. Each should be a single sentence with a quantitative element.'),
      risks: z.array(z.string()).describe('2-3 key risks or downside considerations. Be specific about what could go wrong and the magnitude.'),
      strategicImplication: z.string().describe('A 1-2 sentence strategic recommendation for leadership based on this scenario analysis.'),
      confidenceLevel: z.enum(['high', 'moderate', 'low']).describe('Confidence in the scenario projections based on the assumptions required'),
      confidenceRationale: z.string().describe('One sentence explaining why this confidence level was assigned'),
    });

    const result = await generateObject({
      model: anthropic(MODEL_MAP.sonnet),
      schema: resultSchema,
      prompt: `Analyze this scenario for Astellas Pharma Inc. leadership:

Scenario described by user: "${scenario}"

Lever adjustments made:
${leverChanges}
${impactContext}

Provide a comprehensive executive analysis combining the quantitative lever changes with strategic business context. Be specific with numbers and financial projections. Reference Astellas-specific dynamics (XTANDI IRA price risk mitigation, Strategic Brands portfolio execution, SMT cost transformation, geographic segment performance, R&D pipeline milestones, and capital allocation discipline).`,
      system: systemPrompt,
    });

    return Response.json(result.object);
  } catch (error) {
    console.error('[SCENARIO-SUMMARY ERROR]', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
