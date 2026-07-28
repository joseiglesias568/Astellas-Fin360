/**
 * Illustrative driver × executive-KPI linkage priors for the CVS Health Driver Analytics heat map.
 * Combines CFO pillar alignment, contribution salience, and pairwise driver correlation priors.
 * Not empirical forecast accuracy — replace with rolling regression / IC when series exist.
 */

import type { AllocationPillar } from '@/lib/scenario/allocation-frontier';
import { leverAllocationPillar } from '@/lib/scenario/allocation-frontier';
import {
    DRIVER_ANALYTICS_TREE,
    contributionScore,
    flattenLeverNodes,
    getDriverCorrelation,
} from '@/lib/scenario/driver-analytics-model';

export interface DriverKpiHeatmapColumn {
    id: string;
    /** Short header for grid cells */
    label: string;
    /** Maps to themes called out on Executive Summary / monthly bridge */
    executiveLens: string;
    /** Weights sum to 1 — which CFO pillars this KPI draws signal from */
    pillarWeights: Partial<Record<AllocationPillar, number>>;
}

const KPI_COLUMNS: DriverKpiHeatmapColumn[] = [
    {
        id: 'premium_revenue',
        label: 'Premium Rev.',
        executiveLens: 'HCB premium revenue & MA enrollment growth',
        pillarWeights: { revenue_growth: 1 },
    },
    {
        id: 'mbr_aoi',
        label: 'MBR / AOI',
        executiveLens: 'Medical benefit ratio and adjusted operating income margin',
        pillarWeights: { productivity_cost: 0.65, revenue_growth: 0.35 },
    },
    {
        id: 'specialty_pbm',
        label: 'Specialty Rx',
        executiveLens: 'Specialty pharmacy revenue & Caremark PBM claims growth',
        pillarWeights: { revenue_growth: 0.60, productivity_cost: 0.40 },
    },
    {
        id: 'health100_sga',
        label: 'Health100',
        executiveLens: 'SG&A efficiency & Health100 program savings progress toward $2B target',
        pillarWeights: { productivity_cost: 0.55, loyalty_digital: 0.45 },
    },
    {
        id: 'leverage_fcf',
        label: 'Leverage / FCF',
        executiveLens: 'Balance sheet deleveraging (~3.84x → 3.0x target) & free cash flow',
        pillarWeights: { balance_sheet: 0.75, productivity_cost: 0.25 },
    },
    {
        id: 'digital_adoption',
        label: 'Digital Health',
        executiveLens: 'Digital Rx fill rate, AI prior auth, ExtraCare loyalty & MyAetna engagement',
        pillarWeights: { loyalty_digital: 1 },
    },
];

function pillarAlignment(leverPillar: AllocationPillar, col: DriverKpiHeatmapColumn): number {
    let num = 0;
    let den = 0;
    for (const [p, w] of Object.entries(col.pillarWeights)) {
        if (!w) continue;
        den += w;
        if (p === leverPillar) num += w;
    }
    return den > 0 ? num / den : 0;
}

function peerCorrBlend(driverId: string, col: DriverKpiHeatmapColumn, allDriverIds: string[]): number {
    let sum = 0;
    let den = 0;
    for (const [p, w] of Object.entries(col.pillarWeights)) {
        if (!w) continue;
        const pillar = p as AllocationPillar;
        const peers = allDriverIds.filter((id) => id !== driverId && leverAllocationPillar(id) === pillar);
        const avg =
            peers.length === 0
                ? 0
                : peers.reduce((acc, id) => acc + getDriverCorrelation(driverId, id), 0) / peers.length;
        sum += avg * w;
        den += w;
    }
    return den > 0 ? sum / den : 0;
}

/** Economic sign: when a higher lever value is adverse for this KPI lens, flip to negative association. */
function expectNegativeAssociation(driverId: string, kpiId: string): boolean {
    // Reimbursement headwind: higher value = larger drag on revenue and AOI
    if (driverId === 'reimbursement-headwind-m') {
        return ['premium_revenue', 'mbr_aoi', 'specialty_pbm', 'leverage_fcf'].includes(kpiId);
    }
    // MA premium rate: higher bids reduce commercial enrollment (negative enrollment growth association)
    if (driverId === 'ma-bid-year-premium-rate' && kpiId === 'premium_revenue') {
        return false; // higher MA rate increases premium revenue net — positive
    }
    // Stelara biosimilar: higher conversion reduces branded specialty revenue but lifts AOI
    if (driverId === 'stelara-biosimilar-conversion-pct' && kpiId === 'specialty_pbm') {
        return true; // gross specialty revenue declines; AOI improves separately
    }
    return false;
}

export function orderedDriverLeverIds(): string[] {
    return flattenLeverNodes(DRIVER_ANALYTICS_TREE).map((n) => n.leverIds![0]);
}

export function buildDriverKpiHeatmapMatrix(driverIds: string[]): {
    columns: DriverKpiHeatmapColumn[];
    matrix: number[][];
} {
    const matrix = driverIds.map((d) => {
        const lp = leverAllocationPillar(d);
        const contrib = contributionScore(d) / 100;
        return KPI_COLUMNS.map((col) => {
            const align = pillarAlignment(lp, col);
            const peer = peerCorrBlend(d, col, driverIds);
            let v = 0.58 * align * contrib + 0.42 * peer * (0.28 + 0.72 * align);
            if (expectNegativeAssociation(d, col.id)) v = -Math.abs(v);
            return Math.max(-1, Math.min(1, v));
        });
    });
    return { columns: KPI_COLUMNS, matrix };
}
