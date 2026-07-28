/**
 * Astellas Pharma CFO driver tree + illustrative correlation / multicollinearity scaffolding.
 * Four-segment cascade: XTANDI franchise, Emerging Products (PADCEV/VEOZAH/IZERVAY/VYLOY),
 * SMT Transformation & Efficiency, and Japan/Global Commercial Operations.
 * Correlations are structural priors for dialogue — replace with empirical covariances when time-series are wired.
 */

import type { ScenarioLever } from '@/config/types';

export type DriverTiming = 'leading' | 'lagging' | 'coincident';

export interface DriverTreeNode {
    id: string;
    label: string;
    subtitle?: string;
    /** Bridge target on the Astellas P&L */
    plBridge: string;
    timing?: DriverTiming;
    leverIds?: string[];
    children?: DriverTreeNode[];
}

export const DRIVER_ANALYTICS_TREE: DriverTreeNode = {
    id: 'cfo-root',
    label: 'CFO value creation lens',
    subtitle: 'Astellas Pharma four-segment bridge: XTANDI franchise, Emerging Products, SMT Transformation, Japan & Global Commercial',
    plBridge: 'Core Operating Income',
    timing: 'coincident',
    children: [
        {
            id: 'xtandi-franchise',
            label: 'XTANDI Franchise & Prostate Cancer Economics',
            plBridge: 'XTANDI Core Operating Income (net revenue × franchise margin)',
            timing: 'leading',
            children: [
                {
                    id: 'xtandi-us-revenue',
                    label: 'XTANDI US net revenue management',
                    plBridge: 'XTANDI US revenue (~¥570B base, IRA-adjusted)',
                    timing: 'leading',
                    leverIds: ['xtandi-us-net-revenue-growth'],
                },
                {
                    id: 'xtandi-ira-mgmt',
                    label: 'IRA Maximum Fair Price negotiation',
                    plBridge: 'XTANDI US net revenue (MFP discount vs. WAC × Medicare volume)',
                    timing: 'lagging',
                    children: [
                        {
                            id: 'xtandi-mfp-node',
                            label: 'XTANDI Maximum Fair Price (IRA)',
                            plBridge: 'XTANDI US Medicare revenue (MFP × Part D utilization)',
                            timing: 'lagging',
                            leverIds: ['xtandi-ira-maximum-fair-price'],
                        },
                        {
                            id: 'xtandi-share-node',
                            label: 'XTANDI US market share',
                            plBridge: 'XTANDI US revenue (TRx share × net price × patient count)',
                            timing: 'coincident',
                            leverIds: ['xtandi-market-share-pct'],
                        },
                    ],
                },
                {
                    id: 'xtandi-japan-intl',
                    label: 'XTANDI Japan & International revenue',
                    plBridge: 'XTANDI ex-US revenue (~¥390B Japan + Established Markets)',
                    timing: 'coincident',
                    leverIds: ['xtandi-japan-revenue-growth'],
                },
            ],
        },
        {
            id: 'emerging-products',
            label: 'Emerging Products Portfolio',
            plBridge: 'Emerging Products Core Operating Income (~¥280B combined FY25)',
            timing: 'coincident',
            children: [
                {
                    id: 'padcev-commercial',
                    label: 'PADCEV bladder cancer commercial',
                    plBridge: 'PADCEV revenue (~¥221B at ~35% net margin)',
                    timing: 'coincident',
                    children: [
                        {
                            id: 'padcev-volume-node',
                            label: 'PADCEV US volume growth rate',
                            plBridge: 'PADCEV US revenue (volume growth × net price per infusion)',
                            timing: 'coincident',
                            leverIds: ['padcev-us-volume-growth-pct'],
                        },
                        {
                            id: 'padcev-mfg-node',
                            label: 'PADCEV manufacturing capacity utilization',
                            plBridge: 'PADCEV revenue ceiling (supply availability × demand fill rate)',
                            timing: 'lagging',
                            leverIds: ['padcev-manufacturing-capacity'],
                        },
                        {
                            id: 'padcev-share-node',
                            label: 'PADCEV first-line bladder cancer share',
                            plBridge: 'PADCEV US revenue (1L market share × addressable patient count)',
                            timing: 'coincident',
                            leverIds: ['padcev-first-line-share-pct'],
                        },
                    ],
                },
                {
                    id: 'veozah-launch',
                    label: 'VEOZAH US women\'s health launch',
                    plBridge: 'VEOZAH revenue ramp (~¥25-50B FY26 target)',
                    timing: 'leading',
                    children: [
                        {
                            id: 'veozah-prescriber-node',
                            label: 'VEOZAH physician prescriber adoption',
                            plBridge: 'VEOZAH revenue (active prescribers × avg scripts per prescriber)',
                            timing: 'leading',
                            leverIds: ['veozah-prescriber-adoption-pct'],
                        },
                        {
                            id: 'veozah-rx-node',
                            label: 'VEOZAH weekly prescription volume',
                            plBridge: 'VEOZAH US revenue (weekly TRx × net price × fill rate)',
                            timing: 'coincident',
                            leverIds: ['veozah-rx-volume-growth'],
                        },
                    ],
                },
                {
                    id: 'izervay-commercial',
                    label: 'IZERVAY geographic atrophy market build',
                    plBridge: 'IZERVAY revenue (~¥15-25B FY26 target)',
                    timing: 'coincident',
                    children: [
                        {
                            id: 'izervay-share-node',
                            label: 'IZERVAY US GA market share',
                            plBridge: 'IZERVAY US revenue (GA market share × patient count × net price)',
                            timing: 'coincident',
                            leverIds: ['izervay-market-share-pct'],
                        },
                    ],
                },
                {
                    id: 'vyloy-japan',
                    label: 'VYLOY Japan gastric cancer launch',
                    plBridge: 'VYLOY Japan revenue ramp (~¥5-15B FY26 target)',
                    timing: 'leading',
                    leverIds: ['vyloy-japan-revenue-growth'],
                },
            ],
        },
        {
            id: 'japan-global-operations',
            label: 'Japan & Global Commercial Operations',
            plBridge: 'Japan segment + Established Markets Core OP (~¥660B combined revenue)',
            timing: 'coincident',
            children: [
                {
                    id: 'japan-nhi-mgmt',
                    label: 'Japan NHI pricing & regulatory',
                    plBridge: 'Japan segment revenue (~¥380B × NHI revision adjustment)',
                    timing: 'lagging',
                    children: [
                        {
                            id: 'nhi-revision-node',
                            label: 'Japan NHI biennial price revision',
                            plBridge: 'Japan segment revenue (portfolio × NHI revision rate)',
                            timing: 'lagging',
                            leverIds: ['japan-nhi-price-revision-pct'],
                        },
                        {
                            id: 'japan-growth-node',
                            label: 'Japan segment volume growth',
                            plBridge: 'Japan segment revenue (patient volume × mix × net price)',
                            timing: 'coincident',
                            leverIds: ['japan-segment-revenue-growth'],
                        },
                    ],
                },
                {
                    id: 'established-markets',
                    label: 'Established Markets revenue growth',
                    plBridge: 'Established Markets revenue (~¥280B × growth rate)',
                    timing: 'coincident',
                    leverIds: ['established-markets-revenue-growth'],
                },
                {
                    id: 'fx-management',
                    label: 'FX hedging & currency management',
                    plBridge: 'Core OP translation (¥2.1B per ¥1 USD/JPY move on ~¥570B USD base)',
                    timing: 'coincident',
                    leverIds: ['fx-usd-jpy-rate'],
                },
            ],
        },
        {
            id: 'smt-transformation',
            label: 'SMT Transformation & Efficiency',
            plBridge: 'Enterprise SG&A & operating efficiency (SMT ¥40B FY26 savings target)',
            timing: 'leading',
            children: [
                {
                    id: 'smt-savings-program',
                    label: 'SMT savings delivery program',
                    plBridge: 'Enterprise SG&A (direct bottom-line savings toward ¥40B FY26 target)',
                    timing: 'lagging',
                    leverIds: ['smt-savings-target-m'],
                },
                {
                    id: 'digital-commercial',
                    label: 'Digital commercial & AI automation',
                    plBridge: 'Cross-segment efficiency, HCP engagement & commercial productivity',
                    timing: 'leading',
                    children: [
                        {
                            id: 'digital-rx-node',
                            label: 'Digital HCP engagement adoption rate',
                            plBridge: 'Commercial operating efficiency (digital vs. field rep cost per interaction)',
                            timing: 'leading',
                            leverIds: ['digital-commercial-adoption-pct'],
                        },
                        {
                            id: 'rd-pipeline-node',
                            label: 'R&D pipeline advancement rate',
                            plBridge: 'Pipeline value creation (Phase 3 success rate × addressable market)',
                            timing: 'leading',
                            leverIds: ['rd-pipeline-advancement-pct'],
                        },
                        {
                            id: 'oncology-margin-node',
                            label: 'Oncology Core OP margin',
                            plBridge: 'Oncology segment Core OP (revenue mix × commercial leverage)',
                            timing: 'coincident',
                            leverIds: ['oncology-core-op-margin'],
                        },
                        {
                            id: 'specialty-growth-node',
                            label: 'Total specialty Rx volume growth',
                            plBridge: 'Specialty segment revenue (volume × net price × mix)',
                            timing: 'coincident',
                            leverIds: ['specialty-rx-volume-growth'],
                        },
                    ],
                },
            ],
        },
    ],
};

/**
 * Pairwise Pearson-like correlation priors (−1 … 1) for Astellas drivers that co-move across cycles.
 * Priors reflect oncology market dynamics, FX translation, Japan NHI cycles, and pharma commercial levers.
 */
const CORR: Record<string, Record<string, number>> = {
    'xtandi-us-net-revenue-growth': {
        'xtandi-market-share-pct': 0.78,            // US revenue growth and market share are tightly linked
        'xtandi-ira-maximum-fair-price': -0.65,     // higher MFP discount → lower net revenue growth
        'padcev-us-volume-growth-pct': 0.42,        // shared oncology customer base; XTANDI growth reflects market access
        'oncology-core-op-margin': 0.68,            // XTANDI is the largest margin contributor
        'specialty-rx-volume-growth': 0.55,         // XTANDI is primary driver of specialty volume
    },
    'xtandi-ira-maximum-fair-price': {
        'xtandi-us-net-revenue-growth': -0.65,
        'xtandi-market-share-pct': 0.35,            // favorable MFP may allow preferred formulary access
        'oncology-core-op-margin': -0.58,           // adverse MFP compresses oncology operating margin
    },
    'xtandi-market-share-pct': {
        'xtandi-us-net-revenue-growth': 0.78,
        'xtandi-ira-maximum-fair-price': 0.35,
        'padcev-first-line-share-pct': 0.38,        // shared urology/oncology sales force cross-sell
        'veozah-prescriber-adoption-pct': 0.22,     // same commercial organization; indirect correlation
    },
    'xtandi-japan-revenue-growth': {
        'japan-nhi-price-revision-pct': -0.72,      // Japan revenue growth inversely correlated with price cuts
        'japan-segment-revenue-growth': 0.85,       // XTANDI is the dominant Japan segment revenue driver
        'established-markets-revenue-growth': 0.45, // consistent market access approach across geographies
    },
    'padcev-us-volume-growth-pct': {
        'xtandi-us-net-revenue-growth': 0.42,
        'padcev-manufacturing-capacity': 0.75,      // volume growth is directly constrained by manufacturing capacity
        'padcev-first-line-share-pct': 0.82,        // first-line share capture is the primary volume driver
        'specialty-rx-volume-growth': 0.68,         // PADCEV is a key specialty volume driver
    },
    'padcev-manufacturing-capacity': {
        'padcev-us-volume-growth-pct': 0.75,
        'padcev-first-line-share-pct': 0.60,        // supply availability enables share capture
        'smt-savings-target-m': 0.32,               // manufacturing efficiency is a SMT workstream
    },
    'padcev-first-line-share-pct': {
        'padcev-us-volume-growth-pct': 0.82,
        'padcev-manufacturing-capacity': 0.60,
        'xtandi-market-share-pct': 0.38,            // shared oncology account management
    },
    'veozah-prescriber-adoption-pct': {
        'veozah-rx-volume-growth': 0.88,            // prescriber adoption is the direct driver of Rx volume
        'digital-commercial-adoption-pct': 0.52,   // digital HCP engagement accelerates VEOZAH adoption
        'smt-savings-target-m': 0.28,               // SMT efficiency frees commercial resources for VEOZAH
    },
    'veozah-rx-volume-growth': {
        'veozah-prescriber-adoption-pct': 0.88,
        'specialty-rx-volume-growth': 0.45,         // VEOZAH growing into specialty tier
        'digital-commercial-adoption-pct': 0.48,
    },
    'izervay-market-share-pct': {
        'specialty-rx-volume-growth': 0.42,
        'digital-commercial-adoption-pct': 0.35,   // ophthalmology digital engagement model
        'oncology-core-op-margin': 0.28,
    },
    'vyloy-japan-revenue-growth': {
        'japan-segment-revenue-growth': 0.55,       // VYLOY contributes to Japan segment growth
        'japan-nhi-price-revision-pct': -0.40,      // new product subject to initial NHI pricing
        'established-markets-revenue-growth': 0.32,
    },
    'japan-nhi-price-revision-pct': {
        'japan-segment-revenue-growth': -0.82,      // NHI revision is the primary Japan revenue headwind
        'xtandi-japan-revenue-growth': -0.72,
        'vyloy-japan-revenue-growth': -0.40,
        'oncology-core-op-margin': -0.48,
    },
    'japan-segment-revenue-growth': {
        'japan-nhi-price-revision-pct': -0.82,
        'xtandi-japan-revenue-growth': 0.85,
        'vyloy-japan-revenue-growth': 0.55,
        'established-markets-revenue-growth': 0.42,
    },
    'established-markets-revenue-growth': {
        'xtandi-japan-revenue-growth': 0.45,
        'japan-segment-revenue-growth': 0.42,
        'fx-usd-jpy-rate': 0.38,                    // EUR/JPY affects Established Markets translation
        'oncology-core-op-margin': 0.35,
    },
    'fx-usd-jpy-rate': {
        'established-markets-revenue-growth': 0.38,
        'xtandi-us-net-revenue-growth': 0.55,       // USD/JPY affects XTANDI US repatriated revenue
        'oncology-core-op-margin': 0.52,            // FX translation directly affects reported Core OP
    },
    'smt-savings-target-m': {
        'padcev-manufacturing-capacity': 0.32,
        'digital-commercial-adoption-pct': 0.62,   // digital is a core SMT delivery mechanism
        'rd-pipeline-advancement-pct': 0.42,        // R&D productivity is a SMT workstream
        'oncology-core-op-margin': 0.58,            // SMT savings flow through to Core OP margin
    },
    'digital-commercial-adoption-pct': {
        'smt-savings-target-m': 0.62,
        'veozah-prescriber-adoption-pct': 0.52,
        'veozah-rx-volume-growth': 0.48,
        'rd-pipeline-advancement-pct': 0.45,
        'specialty-rx-volume-growth': 0.38,
    },
    'rd-pipeline-advancement-pct': {
        'smt-savings-target-m': 0.42,
        'digital-commercial-adoption-pct': 0.45,
        'oncology-core-op-margin': 0.35,
    },
    'oncology-core-op-margin': {
        'xtandi-us-net-revenue-growth': 0.68,
        'xtandi-ira-maximum-fair-price': -0.58,
        'japan-nhi-price-revision-pct': -0.48,
        'fx-usd-jpy-rate': 0.52,
        'smt-savings-target-m': 0.58,
    },
    'specialty-rx-volume-growth': {
        'xtandi-us-net-revenue-growth': 0.55,
        'padcev-us-volume-growth-pct': 0.68,
        'veozah-rx-volume-growth': 0.45,
        'izervay-market-share-pct': 0.42,
        'digital-commercial-adoption-pct': 0.38,
    },
};

export function getDriverCorrelation(a: string, b: string): number {
    if (a === b) return 1;
    return CORR[a]?.[b] ?? CORR[b]?.[a] ?? 0;
}

/** Simple multicollinearity alert: max |r| with peers in same branch. */
export function collinearityBand(leverId: string, peers: string[]): 'low' | 'moderate' | 'high' {
    let maxR = 0;
    for (const p of peers) {
        if (p === leverId) continue;
        maxR = Math.max(maxR, Math.abs(getDriverCorrelation(leverId, p)));
    }
    if (maxR >= 0.65) return 'high';
    if (maxR >= 0.4) return 'moderate';
    return 'low';
}

/** Structural contribution score (0–100) — Astellas driver salience vs Core OP bridge. */
const CONTRIBUTION_SCORE: Record<string, number> = {
    'xtandi-us-net-revenue-growth': 95,          // primary Astellas EPS driver; ~¥570B US XTANDI base
    'xtandi-ira-maximum-fair-price': 92,         // IRA MFP is the largest external P&L risk
    'xtandi-market-share-pct': 88,               // share × net price × volume drives US XTANDI revenue
    'padcev-us-volume-growth-pct': 85,           // fastest-growing product; ~40% YoY FY25
    'japan-nhi-price-revision-pct': 82,          // biennial Japan pricing; -5% to -8% revision risk
    'fx-usd-jpy-rate': 80,                       // ¥2.1B per ¥1 USD/JPY move; highly material
    'smt-savings-target-m': 78,                  // direct bottom-line; ¥40B FY26 target
    'padcev-first-line-share-pct': 75,           // 1L bladder cancer share drives PADCEV trajectory
    'japan-segment-revenue-growth': 72,          // Japan ~18% of total revenue; NHI-driven
    'padcev-manufacturing-capacity': 70,         // supply constraint is binding PADCEV growth ceiling
    'oncology-core-op-margin': 68,               // structural margin across largest revenue segment
    'xtandi-japan-revenue-growth': 65,           // XTANDI Japan ~¥200B annually
    'established-markets-revenue-growth': 62,   // Established Markets ~¥280B; growth driver
    'veozah-prescriber-adoption-pct': 60,        // launch metric; physician adoption is the leading indicator
    'specialty-rx-volume-growth': 58,            // total specialty volume; includes XTANDI, PADCEV
    'digital-commercial-adoption-pct': 55,       // commercial efficiency; SMT delivery mechanism
    'veozah-rx-volume-growth': 52,               // VEOZAH weekly scripts; volume ramp metric
    'rd-pipeline-advancement-pct': 50,           // pipeline value creation; future revenue driver
    'izervay-market-share-pct': 48,              // IZERVAY GA market share; emerging ophthalmology revenue
    'vyloy-japan-revenue-growth': 45,            // VYLOY early launch; incremental Japan revenue
};

export function contributionScore(leverId: string): number {
    return CONTRIBUTION_SCORE[leverId] ?? 50;
}

export function timingLabel(t: DriverTiming | undefined): string {
    switch (t) {
        case 'leading':
            return 'Leading — tends to move before the parent P&L line fully reflects it.';
        case 'lagging':
            return 'Lagging — often confirms after clinical, regulatory, or pricing proceedings work through revenue and cost bases.';
        default:
            return 'Coincident — moves in the same reporting window as the bridged line item.';
    }
}

export function flattenLeverNodes(root: DriverTreeNode): DriverTreeNode[] {
    const out: DriverTreeNode[] = [];
    const walk = (n: DriverTreeNode) => {
        if (n.leverIds?.length) out.push(n);
        n.children?.forEach(walk);
    };
    walk(root);
    return out;
}

export function findLeverNode(root: DriverTreeNode, leverId: string): DriverTreeNode | null {
    const hit = flattenLeverNodes(root).find((n) => n.leverIds?.includes(leverId));
    return hit ?? null;
}

/** Peer drivers = other levers under the same major CFO branch (sibling subtree). */
export function peerLeverIds(root: DriverTreeNode, leverId: string): string[] {
    function collectAllLeverIdsUnder(node: DriverTreeNode): string[] {
        const ids = [...(node.leverIds ?? [])];
        node.children?.forEach((ch) => ids.push(...collectAllLeverIdsUnder(ch)));
        return ids;
    }

    for (const branch of root.children ?? []) {
        const ids = collectAllLeverIdsUnder(branch);
        if (ids.includes(leverId)) {
            return ids.filter((id) => id !== leverId);
        }
    }
    return [];
}

export function leverMetaFromDb(levers: ScenarioLever[], leverId: string): ScenarioLever | undefined {
    return levers.find((l) => l.id === leverId);
}
