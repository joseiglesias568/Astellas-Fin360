/**
 * Marginal operating-income sensitivities and illustrative allocation samples
 * for "last dollar" CFO framing (growth vs productivity vs balance sheet vs digital health).
 */

import type { ScenarioBaselinePL, ScenarioLever } from '@/config/types';
import { calculateImpact, type LeverDef } from '@/lib/scenario-engine';

export type AllocationPillar =
    | 'revenue_growth'
    | 'productivity_cost'
    | 'balance_sheet'
    | 'loyalty_digital';

export const LEVER_TO_PILLAR: Record<string, AllocationPillar> = {
    // HCB: revenue & premium growth
    'ma-bid-year-premium-rate': 'revenue_growth',
    'commercial-enrollment-growth': 'revenue_growth',
    // HCB: medical cost management
    'medicaid-mlr-improvement': 'productivity_cost',
    'prior-auth-automation-rate': 'productivity_cost',
    // Health Services PBM: volume & claims growth
    'pharmacy-claims-growth-pct': 'revenue_growth',
    'specialty-rx-growth-pct': 'revenue_growth',
    'glp1-volume-growth-pct': 'revenue_growth',
    // Health Services PBM: formulary & model management
    'truecost-client-conversion': 'productivity_cost',
    'stelara-biosimilar-conversion-pct': 'productivity_cost',
    // PCW: pharmacy revenue growth
    'same-store-rx-growth': 'revenue_growth',
    'glp1-market-share-pct': 'revenue_growth',
    // PCW: cost management & headwinds
    'reimbursement-headwind-m': 'productivity_cost',
    'store-optimization-savings': 'productivity_cost',
    // PCW: format & clinic (digital/loyalty adjacent)
    'healthhub-conversion-count': 'loyalty_digital',
    'minuteclinic-visits': 'loyalty_digital',
    // Digital Health & Health100
    'health100-sga-savings': 'productivity_cost',
    'digital-rx-fill-rate-pct': 'loyalty_digital',
    'ai-prior-auth-approval-pct': 'loyalty_digital',
    'myaetna-portal-engagement-pct': 'loyalty_digital',
    'extracare-active-members-m': 'loyalty_digital',
    'health100-member-adoption-pct': 'loyalty_digital',
    'minuteclinic-digital-scheduling-pct': 'loyalty_digital',
    // Capital Allocation: Oak Street growth investment
    'oak-street-clinic-count': 'balance_sheet',
    'oak-street-vbc-patients': 'balance_sheet',
};

export function leverAllocationPillar(leverId: string): AllocationPillar {
    return LEVER_TO_PILLAR[leverId] ?? 'productivity_cost';
}

/** Drivers where a higher lever value is adverse — improvement direction is decreasing the lever. */
const LOWER_IS_IMPROVEMENT = new Set(['reimbursement-headwind-m']);

export interface LeverMarginalOi {
    leverId: string;
    name: string;
    pillar: AllocationPillar;
    unit: string;
    /** Δ operating income ($M) for a one-step move at the current position (signed). */
    marginalOiPerStep: number;
    pillarLabel: string;
}

export interface FrontierPoint {
    weights: Record<AllocationPillar, number>;
    operatingIncomeDelta: number;
    revenueDelta: number;
}

const PILLAR_LABEL: Record<AllocationPillar, string> = {
    revenue_growth: 'Revenue & enrollment growth',
    productivity_cost: 'Medical economics & cost management',
    balance_sheet: 'Capital allocation & balance sheet',
    loyalty_digital: 'Digital health & Health100',
};

function leverDefsFromLevers(levers: ScenarioLever[]): LeverDef[] {
    return levers.map((l) => ({ id: l.id, min: l.min, max: l.max, default: l.default }));
}

/**
 * Central finite-difference gradient for each lever vs current scenario OI.
 */
export function computeMarginalOperatingIncomeGradients(
    leverValues: Record<string, number>,
    levers: ScenarioLever[],
    baselineRevenueB: number,
    baselinePL: ScenarioBaselinePL | undefined,
): LeverMarginalOi[] {
    const leverDefs = leverDefsFromLevers(levers);
    const out: LeverMarginalOi[] = [];

    for (const L of levers) {
        const cur = leverValues[L.id] ?? L.default;
        const span = L.max - L.min;
        const step = Math.max(L.step, span * 0.003);
        const up = Math.min(L.max, cur + step);
        const down = Math.max(L.min, cur - step);
        const effStep = up - down || step;

        const oiUp = calculateImpact({ ...leverValues, [L.id]: up }, baselineRevenueB, baselinePL, leverDefs).operatingIncome;
        const oiDown = calculateImpact({ ...leverValues, [L.id]: down }, baselineRevenueB, baselinePL, leverDefs).operatingIncome;

        const derivative = effStep > 0 ? (oiUp - oiDown) / effStep : 0;
        const marginalOiPerStep = derivative * L.step;
        const pillar = leverAllocationPillar(L.id);

        out.push({
            leverId: L.id,
            name: L.name,
            pillar,
            unit: L.unit,
            marginalOiPerStep,
            pillarLabel: PILLAR_LABEL[pillar],
        });
    }

    return out.sort((a, b) => Math.abs(b.marginalOiPerStep) - Math.abs(a.marginalOiPerStep));
}

/**
 * Random convex combinations of pillar weights → small coordinated lever bumps → scatter of OI vs revenue deltas.
 * Illustrative efficient-set visualization, not an optimizer.
 */
export function sampleAllocationFrontier(
    leverValues: Record<string, number>,
    levers: ScenarioLever[],
    baselineRevenueB: number,
    baselinePL: ScenarioBaselinePL | undefined,
    samples = 100,
): FrontierPoint[] {
    const leverDefs = leverDefsFromLevers(levers);
    const pillars: AllocationPillar[] = [
        'revenue_growth',
        'productivity_cost',
        'balance_sheet',
        'loyalty_digital',
    ];
    const points: FrontierPoint[] = [];

    for (let i = 0; i < samples; i++) {
        const raw = pillars.map(() => Math.random());
        const s = raw.reduce((a, b) => a + b, 0) || 1;
        const weights = Object.fromEntries(pillars.map((p, j) => [p, raw[j] / s])) as Record<
            AllocationPillar,
            number
        >;

        const perturbed = { ...leverValues };
        const intensity = 0.015;

        for (const L of levers) {
            const pillar = LEVER_TO_PILLAR[L.id];
            if (!pillar) continue;
            const w = weights[pillar];
            const span = L.max - L.min;
            const cur = perturbed[L.id] ?? L.default;
            let bump = w * intensity * span;
            if (LOWER_IS_IMPROVEMENT.has(L.id)) {
                bump = -bump;
            }
            perturbed[L.id] = Math.max(L.min, Math.min(L.max, cur + bump));
        }

        const r = calculateImpact(perturbed, baselineRevenueB, baselinePL, leverDefs);
        points.push({
            weights,
            operatingIncomeDelta: r.operatingIncome,
            revenueDelta: r.revenue,
        });
    }

    return points;
}

export function pillarMarginalTotals(gradients: LeverMarginalOi[]): Record<AllocationPillar, number> {
    const acc: Record<AllocationPillar, number> = {
        revenue_growth: 0,
        productivity_cost: 0,
        balance_sheet: 0,
        loyalty_digital: 0,
    };
    for (const g of gradients) {
        acc[g.pillar] += g.marginalOiPerStep;
    }
    return acc;
}
