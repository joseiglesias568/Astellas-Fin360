/**
 * Quarterly driver trends for Astellas Pharma Driver Analytics — illustrative actuals through FY25
 * and directional projections FY26–FY27 aligned to public disclosure narratives.
 * Replace with DB-backed series when operational metrics are wired.
 */

export interface DriverTimeSeries {
    /** Quarter labels, oldest → newest */
    labels: string[];
    values: number[];
    /** First index of projected / extrapolated segment */
    splitIndex: number;
    /** Short axis descriptor */
    valueAxisLabel: string;
    footnote: string;
}

const HIST_LABELS = [
    'Q1 FY24', 'Q2 FY24', 'Q3 FY24', 'Q4 FY24',
    'Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25',
];
const PROJ_LABELS = [
    'Q1 FY26', 'Q2 FY26', 'Q3 FY26', 'Q4 FY26',
    'Q1 FY27', 'Q2 FY27', 'Q3 FY27', 'Q4 FY27',
];

const ALL_LABELS = [...HIST_LABELS, ...PROJ_LABELS];
const SPLIT = HIST_LABELS.length;

const SERIES: Record<string, Omit<DriverTimeSeries, 'labels' | 'splitIndex'>> = {
    // ── XTANDI Franchise ──────────────────────────────────────────────────────
    'xtandi-us-net-revenue-growth': {
        values: [4.5, 5.0, 5.5, 6.0, 6.2, 6.5, 6.8, 7.0, 5.5, 4.0, 2.5, 2.0, 1.5, 1.8, 2.0, 2.2],
        valueAxisLabel: '% YoY net revenue growth',
        footnote:
            'XTANDI US net revenue growth YoY; FY24 steady growth driven by prostate cancer market expansion and label breadth; FY25 Q4 ~7% on volume momentum ahead of IRA effective date. FY26 decelerates as IRA Maximum Fair Price takes effect mid-year, compressing US net revenue per unit. FY27 stabilizes as volume growth partially offsets per-unit price compression.',
    },
    'xtandi-ira-maximum-fair-price': {
        values: [100, 100, 100, 100, 100, 100, 100, 100, 95, 88, 82, 80, 79, 79, 79, 79],
        valueAxisLabel: 'MFP as % of WAC',
        footnote:
            'XTANDI US Maximum Fair Price as % of Wholesale Acquisition Cost (WAC); FY24-FY25 at 100% (pre-IRA effective date); Q1 FY26 reflects CMS negotiated MFP announcement; Q2 FY26 MFP effective date reduces net revenue per Medicare unit. FY27 MFP is fixed for the negotiation cycle — next renegotiation due FY29.',
    },
    'xtandi-market-share-pct': {
        values: [37.5, 38.0, 38.5, 39.0, 39.5, 40.0, 40.5, 41.0, 40.5, 40.0, 39.5, 39.0, 38.8, 38.5, 38.5, 38.2],
        valueAxisLabel: '% US prostate cancer market share',
        footnote:
            'XTANDI total US prostate cancer therapy market share (TRx basis); FY24-FY25 steady share expansion from mCSPC and nmCSPC label additions; FY26 modest compression from ERLEADA nmCSPC competition and IRA formulary dynamics. FY27 stabilizes as XTANDI combination data (TALAPRO-3) supports retention in BRCA-unselected population.',
    },
    'xtandi-japan-revenue-growth': {
        values: [2.0, 2.2, 2.5, 3.0, 3.2, 3.5, 3.8, 4.0, -3.0, -3.5, -2.5, -2.0, 1.5, 2.0, 2.5, 3.0],
        valueAxisLabel: '% YoY revenue growth',
        footnote:
            'XTANDI Japan revenue growth YoY; FY24 stable growth from volume expansion; FY25 Q4 +4% on patient volume momentum before April revision. FY26 negative as April 2026 Japan NHI biennial price revision (-6.5%) takes effect, compressing Japan XTANDI per-unit revenue; FY27 returns to growth as volume expansion overcomes the revised pricing base.',
    },
    // ── Emerging Products ─────────────────────────────────────────────────────
    'padcev-us-volume-growth-pct': {
        values: [60, 52, 46, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18],
        valueAxisLabel: '% YoY volume growth',
        footnote:
            'PADCEV US infusion volume growth YoY; FY24 explosive >50% growth from first-line bladder cancer launch with pembrolizumab combination; FY25 Q4 +34% as EV-302 label adoption continues through urology and medical oncology accounts. FY26-FY27 decelerates to 18-25% as baseline comparisons normalize and addressable patient population approaches saturation.',
    },
    'padcev-manufacturing-capacity': {
        values: [45, 52, 58, 62, 65, 68, 70, 72, 74, 76, 79, 82, 85, 87, 89, 92],
        valueAxisLabel: '% of target capacity utilized',
        footnote:
            'PADCEV manufacturing capacity as % of commercial demand target; ADC production complexity created supply constraints through FY24. FY25 capital investment in biologics manufacturing expands batch production volume. FY26-FY27 targets 85-92% fill rate through expanded reactor capacity and improved linker-payload process yields.',
    },
    'padcev-first-line-share-pct': {
        values: [18, 22, 27, 31, 34, 36, 38, 40, 42, 44, 45, 46, 47, 48, 49, 50],
        valueAxisLabel: '% first-line bladder cancer share',
        footnote:
            'PADCEV first-line urothelial carcinoma market share (in combination with pembrolizumab); launched in major markets FY24; FY25 steady penetration as EV-302 NCCN guideline incorporation drives standard-of-care adoption. FY26-FY27 targets >50% share as prescriber experience grows and combination data in additional subgroups builds.',
    },
    'veozah-prescriber-adoption-pct': {
        values: [0, 1, 3, 5, 8, 11, 15, 19, 23, 28, 33, 38, 43, 47, 51, 55],
        valueAxisLabel: '% of addressable OB/GYN prescribers',
        footnote:
            'VEOZAH (fezolinetant) active OB/GYN prescriber adoption as % of addressable US prescriber base (~25,000 active menopause specialists); launched US FY24. FY25 building prescriber base through medical education and DTC campaigns. FY26-FY27 targets 50%+ prescriber adoption as women\'s health awareness grows and real-world outcomes data accumulates.',
    },
    'veozah-rx-volume-growth': {
        values: [0, 45, 85, 75, 65, 55, 50, 45, 42, 38, 35, 32, 28, 25, 22, 20],
        valueAxisLabel: '% YoY weekly TRx growth',
        footnote:
            'VEOZAH weekly total prescriptions growth YoY; FY24 explosive launch momentum; FY25 moderates as initial prescriber uptake curve flattens and market education deepens. FY26-FY27 continues strong growth trajectory as refill base builds, adherence programs improve persistence, and potential label expansion to additional indications.',
    },
    'izervay-market-share-pct': {
        values: [0, 2, 5, 9, 13, 16, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37],
        valueAxisLabel: '% geographic atrophy market share',
        footnote:
            'IZERVAY (avacincaptad pegol) US geographic atrophy market share; entered market FY24 as one of first complement-targeting GA therapies. FY25 building retinal specialist prescribing base alongside Syfovre (Apellis) competition. FY26-FY27 targets 35%+ GA share through differentiated efficacy profile and label expansion discussions with FDA.',
    },
    'vyloy-japan-revenue-growth': {
        values: [0, 0, 0, 0, 0, 0, 15, 45, 80, 65, 55, 45, 38, 32, 28, 25],
        valueAxisLabel: '% YoY revenue growth',
        footnote:
            'VYLOY (zolbetuximab) Japan revenue growth; Japan NHI listing expected Q3 FY25; FY25 Q3-Q4 initial commercial launch in gastric cancer. FY26 rapid growth as prescribing ramps through GI oncology accounts following SPOTLIGHT and GLOW trial data adoption. FY27 moderates as addressable patient population penetration increases.',
    },
    // ── Japan & Global Commercial ─────────────────────────────────────────────
    'japan-nhi-price-revision-pct': {
        values: [0, 0, 0, 0, -5.5, -5.5, -5.5, -5.5, -6.5, -6.5, -6.5, -6.5, 0, 0, 0, 0],
        valueAxisLabel: '% portfolio price revision (April effective)',
        footnote:
            'Japan NHI biennial price revision rate applied to Astellas Japan portfolio; FY24 non-revision year (0%); FY25 revision -5.5% effective April 2025; FY26 revision -6.5% effective April 2026 — wider cut reflecting XTANDI mature product classification. FY27 is a non-revision year under the biennial cycle.',
    },
    'japan-segment-revenue-growth': {
        values: [3.5, 4.0, 4.5, 5.0, -1.5, -1.0, -0.5, 0.5, -4.5, -3.5, -2.5, -2.0, 2.0, 2.5, 3.0, 3.5],
        valueAxisLabel: '% YoY revenue growth',
        footnote:
            'Japan segment total revenue growth YoY; FY24 stable growth from volume expansion and VYLOY pre-launch preparation; FY25 modest growth as -5.5% NHI revision offset by volume expansion. FY26 significant headwind from -6.5% NHI revision creating negative reported growth; FY27 returns to positive as VYLOY and new launches offset revision baseline.',
    },
    'established-markets-revenue-growth': {
        values: [3.0, 3.2, 3.5, 3.8, 4.0, 4.2, 4.5, 4.8, 5.0, 5.2, 5.5, 5.8, 6.0, 6.2, 6.5, 6.8],
        valueAxisLabel: '% YoY revenue growth',
        footnote:
            'Established Markets (Europe, Australia, Canada) segment revenue growth YoY; driven by XTANDI European market penetration, PADCEV EU launches, and VEOZAH European approval pathway. EUR/JPY FX translation creates variability in reported yen terms. FY26-FY27 targets 6%+ growth from PADCEV EU launch ramp and XTANDI earlier-stage label use.',
    },
    'fx-usd-jpy-rate': {
        values: [148, 152, 155, 150, 148, 152, 155, 152, 153, 151, 149, 148, 148, 150, 151, 150],
        valueAxisLabel: 'USD/JPY exchange rate',
        footnote:
            'USD/JPY exchange rate used in Astellas quarterly financial reporting; FY24 rate averaging ~152 supported favorable XTANDI US revenue translation; FY25 ~152 average consistent with prior year. FY26-FY27 management guidance assumption ~¥148-152 range, with each ¥1 move impacting Core OP by approximately ¥2.1B on annualized basis.',
    },
    // ── SMT Transformation ────────────────────────────────────────────────────
    'smt-savings-target-m': {
        values: [5, 8, 11, 14, 16, 18, 20, 21, 25, 28, 32, 36, 40, 45, 50, 55],
        valueAxisLabel: '¥B cumulative annual savings',
        footnote:
            'SMT (Strategic Management Transformation) cumulative annualized savings; FY25 delivered ¥21B vs target; FY26 target ¥40B through commercial model transformation, SG&A efficiency, procurement savings, and R&D productivity. Key workstreams: digital HCP engagement, shared services consolidation, manufacturing process improvement, and portfolio rationalization.',
    },
    'digital-commercial-adoption-pct': {
        values: [12, 16, 20, 24, 27, 30, 33, 36, 39, 43, 47, 51, 54, 57, 60, 63],
        valueAxisLabel: '% of HCP interactions digital',
        footnote:
            'Share of HCP (healthcare professional) commercial interactions conducted through digital channels (virtual rep, e-promotion, approved email); FY25 ~36% reflecting pandemic-era digital adoption persistence. FY26-FY27 targets 55-63% as Astellas invests in CRM-driven omnichannel engagement reducing cost-per-interaction vs. field rep visits.',
    },
    'rd-pipeline-advancement-pct': {
        values: [58, 60, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
        valueAxisLabel: '% Phase 3 advancement success rate',
        footnote:
            'Astellas pipeline Phase 3 clinical trial advancement success rate (assets advancing to regulatory submission vs. Phase 3 initiations); FY24-FY25 ~64-67% reflecting strong oncology clinical platform. FY26-FY27 targets 70%+ through improved biomarker-based patient selection, adaptive trial design, and focused therapeutic area strategy.',
    },
    'oncology-core-op-margin': {
        values: [24.0, 24.5, 25.0, 25.5, 25.8, 26.0, 26.2, 26.4, 25.5, 25.0, 24.8, 24.5, 25.0, 25.5, 26.0, 26.5],
        valueAxisLabel: '% Core OP margin',
        footnote:
            'Astellas consolidated Core OP margin; FY24 improving from 24% toward 26% target as XTANDI/PADCEV revenue growth outpaces cost base; FY25 ~26.4% at peak. FY26 margin compression from IRA XTANDI headwind and Japan NHI revision. FY27 recovery as SMT savings accelerate and PADCEV volume leverage improves.',
    },
    'specialty-rx-volume-growth': {
        values: [15, 18, 21, 24, 27, 30, 32, 34, 35, 36, 37, 38, 38, 39, 40, 41],
        valueAxisLabel: '% YoY specialty volume growth',
        footnote:
            'Astellas total specialty prescription volume growth YoY across key products (XTANDI, PADCEV, VEOZAH, IZERVAY); FY24 strong growth from PADCEV launch and XTANDI expansion; FY25 Q4 ~34% driven by PADCEV first-line bladder cancer rapid penetration. FY26-FY27 moderates to 38-41% as large-volume products mature and new launches build.',
    },
};

export function getDriverTimeseries(leverId: string): DriverTimeSeries | null {
    const row = SERIES[leverId];
    if (!row) return null;
    if (row.values.length !== ALL_LABELS.length) {
        throw new Error(`driver-analytics-timeseries: length mismatch for ${leverId}`);
    }
    return {
        labels: ALL_LABELS,
        values: row.values,
        splitIndex: SPLIT,
        valueAxisLabel: row.valueAxisLabel,
        footnote: row.footnote,
    };
}
