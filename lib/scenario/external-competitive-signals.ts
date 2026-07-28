/**
 * External / competitive signals for Scenario Modeling — Astellas Pharma Inc.
 *
 * Content synthesized from Astellas Annual Securities Report FY2025, Q1 FY26 earnings,
 * IRA drug price negotiation framework, Japan NHI biennial revision, and oncology
 * competitive landscape research. Figures are editorial ranges for CFO discussion — not Astellas guidance.
 */

export type SignalImportance = 'critical' | 'high' | 'elevated' | 'moderate';

export interface ExternalSignalImpactRange {
  /** What the range measures */
  label: string;
  /** Lower bound (¥B operating income unless noted) */
  lowM: number;
  /** Upper bound (¥B) */
  highM: number;
  /** Optional operating margin bridge (bps) */
  marginBpsLow?: number;
  marginBpsHigh?: number;
}

export interface ExternalSignalSwot {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface ExternalCompetitiveSignal {
  id: string;
  rank: number;
  category: string;
  title: string;
  /** Ultra-short label for compact P&L tiles */
  shortTitle: string;
  /** Keys = `ScenarioLever.externalId`; merged onto baseline defaults then clamped */
  plLeverPreset: Record<string, number>;
  /** One tight sentence for card face */
  summary: string;
  importance: SignalImportance;
  /** Short phrase on materiality / contagion */
  materialityNote: string;
  indicatorsToWatch: string[];
  impactRange: ExternalSignalImpactRange;
  swot: ExternalSignalSwot;
  /** Traceability to internal research files / themes */
  researchRefs: string[];
}

/** Merge preset onto baseline defaults and clamp to lever bounds (min/max per id). */
export function buildPlValuesFromSignalPreset(
  baselineDefaults: Record<string, number>,
  preset: Record<string, number>,
  bounds: { id: string; min: number; max: number }[],
): Record<string, number> {
  const next = { ...baselineDefaults };
  const boundById = new Map(bounds.map((b) => [b.id, b]));
  for (const [key, raw] of Object.entries(preset)) {
    const b = boundById.get(key);
    if (b) {
      next[key] = Math.max(b.min, Math.min(b.max, raw));
    } else {
      next[key] = raw;
    }
  }
  return next;
}

export const EXTERNAL_COMPETITIVE_SIGNALS_INTRO = {
  headline: 'Top external signals to watch',
  subtext:
    'Uncontrollable forces outside Astellas Pharma\'s operating plan — ranked by potential financial materiality and velocity. Expand any card for a SWOT-style view.',
  methodology:
    'Impact bands pair disclosed sensitivities (e.g., ¥2.1B per ¥1 USD/JPY move; Japan NHI revision -5% to -8% on Japan segment revenue; XTANDI IRA Maximum Fair Price negotiation effective 2026) with scenario judgment from oncology, pharma regulatory, and FX research in the Astellas analysis corpus. They are illustrative annualized swings vs. a baseline planning case, not forecasts.',
};

/** Five highest-priority external monitors — stable ordering by rank */
export const EXTERNAL_COMPETITIVE_SIGNALS: ExternalCompetitiveSignal[] = [
  {
    id: 'xtandi-ira-price-negotiation',
    rank: 1,
    category: 'IRA / US Drug Pricing',
    title: 'XTANDI IRA Medicare Price Negotiation — Maximum Fair Price Risk',
    shortTitle: 'IRA / XTANDI Price',
    plLeverPreset: {
      'xtandi-ira-maximum-fair-price': 85.0,
      'xtandi-us-net-revenue-growth': -8.0,
      'xtandi-market-share-pct': 38.0,
    },
    summary:
      'CMS has selected XTANDI (enzalutamide) for Medicare Part D price negotiation under the Inflation Reduction Act, with a Maximum Fair Price effective from January 2026. Each 10% reduction in XTANDI US net price versus the current WAC translates to approximately ¥40-60B annual revenue impact. Astellas management is engaged in active dialogue with CMS to maximize the negotiated price floor.',
    importance: 'critical',
    materialityNote:
      'XTANDI generates ~¥960.8B FY25 revenue globally (~60% from US). A 15-25% MFP discount vs WAC could compress US XTANDI revenue by ¥80-130B annually, representing the single largest external P&L risk. Each 5% MFP adverse vs. base case ≈ ¥30B Core OP impact.',
    indicatorsToWatch: [
      'CMS XTANDI Maximum Fair Price announcement (expected Q3 2025) — track vs. 15–20% discount expectation',
      'IRA negotiation timeline milestones — CMS must publish initial offer, counter-offer, and final MFP by statutory deadlines',
      'Congressional IRA amendment proposals — any modifications to negotiation scope or eligible drug criteria',
      'Peer drug precedents — Eliquis, Jardiance, Xarelto negotiated prices provide benchmarks for XTANDI range',
      'Medicare Part D XTANDI utilization data — volume response to MFP effective date determines net revenue impact',
    ],
    impactRange: {
      label: 'Illustrative XTANDI US revenue swing from +5% MFP favorable vs. -15% adverse vs. base case',
      lowM: -130,
      highM: 30,
      marginBpsLow: -610,
      marginBpsHigh: 140,
    },
    swot: {
      strengths: [
        'Astellas is actively engaged with CMS in constructive IRA negotiation dialogue to document XTANDI clinical value.',
        'XTANDI label expansions (nmCSPC, mCSPC) create broader patient access arguments supporting higher MFP.',
        'Pfizer co-promote termination completed — Astellas retains full US XTANDI economics, maximizing net revenue optionality.',
      ],
      weaknesses: [
        'XTANDI US revenue (~¥570B) is concentrated in a single product/market, amplifying IRA price risk.',
        'CMS negotiation precedents are being set with limited ability to challenge the statutory framework.',
      ],
      opportunities: [
        'IRA negotiation outcome creates a defined floor — removes worst-case uncertainty and allows planning for FY27+.',
        'MFP publication creates formulary optimization opportunity: preferred tier placement could expand Medicare volume.',
        'Label expansion to earlier prostate cancer stages (low-risk nmCSPC) expands non-IRA-negotiated revenue base.',
      ],
      threats: [
        'CMS sets XTANDI MFP at the statutory floor, reducing US net revenue by 25%+ vs. current WAC.',
        'Congressional expansion of IRA negotiation to Part B or additional drugs accelerates pricing pressure timeline.',
        'Competitor ERLEADA (apalutamide) not subject to IRA negotiation until later cycle — pricing differential could shift prescriber behavior.',
      ],
    },
    researchRefs: [
      'Astellas Q1 FY26 earnings call — IRA negotiation framework, XTANDI MFP preparation, revenue guidance sensitivity',
      'Astellas Annual Securities Report FY2025 — XTANDI US net revenue ¥960.8B, IRA risk factor disclosure',
      'CMS Drug Price Negotiation Technical Report — XTANDI selected drug, negotiation process milestones',
    ],
  },
  {
    id: 'japan-nhi-biennial-price-revision',
    rank: 2,
    category: 'Japan Pricing / Regulatory',
    title: 'Japan NHI Biennial Drug Price Revision — April 2026 Impact',
    shortTitle: 'Japan NHI Revision',
    plLeverPreset: {
      'japan-nhi-price-revision-pct': -6.5,
      'japan-segment-revenue-growth': -4.0,
      'xtandi-japan-revenue-growth': -5.0,
    },
    summary:
      'Japan\'s biennial NHI drug price revision (April 2026) is expected to reduce Astellas Japan segment net revenue by ¥30-60B depending on revision magnitude (-5% to -8% range). XTANDI, PADCEV, and mature portfolio products in Japan face the revision simultaneously. Astellas\'s Japan volume growth strategy and new product launches (VYLOY) are designed to partially offset the pricing headwind.',
    importance: 'high',
    materialityNote:
      'Japan segment generates ~¥380B annually (~18% of total revenue). A -7% NHI price revision on the full Japan portfolio translates to approximately ¥26B revenue headwind in FY27. Combined with the mid-year revision cycle, Japan Core OP margin compression could reach 200-300bps in the revision year.',
    indicatorsToWatch: [
      'MHLW preliminary NHI revision rate announcement (typically December preceding April effective date)',
      'Product-specific revision rates for XTANDI, PADCEV, and VYLOY under MHLW formulae',
      'VYLOY Japan NHI listing timeline — new product revenue offsets revision headwind',
      'Japan market access decisions on Astellas pipeline assets ahead of the revision cycle',
      'Competitor response to revision — industry volume growth strategies that may offset per-unit price declines',
    ],
    impactRange: {
      label: 'Illustrative Japan segment revenue swing from -5% favorable vs. -8% adverse NHI revision',
      lowM: -60,
      highM: -19,
      marginBpsLow: -280,
      marginBpsHigh: -89,
    },
    swot: {
      strengths: [
        'Astellas has deep Japan market capabilities and MHLW relationships to advocate effectively on NHI pricing.',
        'VYLOY (zolbetuximab) Japan NHI listing in FY26 provides incremental revenue to partially offset revision headwinds.',
        'Japan volume growth from XTANDI broader indication use and PADCEV gastric cancer studies supports mix improvement.',
      ],
      weaknesses: [
        'Japan NHI biennial revision is statutory — Astellas cannot avoid the mechanism, only manage exposure.',
        'Mature products (legacy oncology portfolio) face disproportionately large revision rates under MHLW repricing formulae.',
      ],
      opportunities: [
        'New product launches (VYLOY, IZERVAY Japan approval) expand Japan revenue base outside the legacy revision cycle.',
        'Patient volume growth in aging Japan oncology market partially compensates for per-unit price compression.',
        'Favorable NHI designation for innovative new molecular entities could achieve premium pricing above revision baseline.',
      ],
      threats: [
        'MHLW accelerates biennial revision frequency or introduces mid-cycle adjustments for high-spend products.',
        'Japan pricing policies tighten on oncology drugs due to healthcare budget pressure, disproportionately hitting Astellas.',
        'Additional cost containment measures (reference pricing, international price comparison) compound biennial revision impact.',
      ],
    },
    researchRefs: [
      'Astellas Q1 FY26 earnings call — Japan NHI April 2026 revision guidance, Japan segment revenue trajectory',
      'Astellas Annual Securities Report FY2025 — Japan segment ¥380B revenue, NHI risk factor disclosure',
      'MHLW Drug Pricing Review FY2026 — biennial revision methodology and scope of Astellas portfolio products',
    ],
  },
  {
    id: 'padcev-competitive-manufacturing',
    rank: 3,
    category: 'Commercial / Manufacturing',
    title: 'PADCEV Manufacturing Scale-Up & Bladder Cancer Competitive Dynamics',
    shortTitle: 'PADCEV Supply / Competition',
    plLeverPreset: {
      'padcev-us-volume-growth-pct': 28.0,
      'padcev-manufacturing-capacity': 75.0,
      'specialty-rx-volume-growth': 18.0,
    },
    summary:
      'PADCEV (enfortumab vedotin) delivered ¥221.2B FY25 revenue with significant first-line bladder cancer market share gains. The primary near-term risk is manufacturing scale-up: ADC (antibody-drug conjugate) production complexity creates supply chain constraints that could limit volume growth below the 25-35% annual trajectory. Competitive ADC entries (Roche/ImmunoGen, Gilead/Kite) are building clinical pipelines targeting the same indication.',
    importance: 'elevated',
    materialityNote:
      'PADCEV is Astellas\'s second-largest revenue product and fastest-growing franchise (~40% YoY growth in FY25). Manufacturing capacity limitations could cost ¥15-30B in foregone revenue per quarter. Each 5pp share loss in first-line bladder cancer to ADC competitors ≈ ¥25B annual revenue impact.',
    indicatorsToWatch: [
      'PADCEV quarterly batch production volume vs. commercial demand — supply fill rate is the leading constraint indicator',
      'ADC competitor clinical trial readouts — Roche SYD985, Gilead sacituzumab govitecan bladder cancer data',
      'FDA inspection status of PADCEV manufacturing sites — regulatory clearance is prerequisite for capacity expansion',
      'First-line bladder cancer market share data (IQVIA) — Astellas target >40% by FY27 vs. ~35% FY25',
      'Seagen integration progress — post-Pfizer acquisition, PADCEV manufacturing is part of a larger portfolio optimization',
    ],
    impactRange: {
      label: 'Illustrative PADCEV revenue swing from +35% volume growth vs. -10% supply-constrained scenario',
      lowM: -40,
      highM: 75,
      marginBpsLow: -187,
      marginBpsHigh: 351,
    },
    swot: {
      strengths: [
        'PADCEV combination with pembrolizumab is standard of care in first-line bladder cancer — clinical leadership provides durable positioning.',
        'EV-302/KEYNOTE-A39 landmark data creates high barriers to competitive displacement in first-line setting.',
        'Astellas global commercial reach in oncology maximizes PADCEV penetration across US, Europe, and Japan.',
      ],
      weaknesses: [
        'ADC manufacturing complexity (linker-payload chemistry) creates inherent capacity scaling challenges vs. small molecule competitors.',
        'Single active manufacturing site creates concentration risk for PADCEV supply continuity.',
      ],
      opportunities: [
        'PADCEV new indications (upper tract urothelial carcinoma, earlier disease stages) expand addressable patient population beyond current approval.',
        'Combination studies with other checkpoint inhibitors could broaden PADCEV first-line use beyond pembrolizumab.',
        'PADCEV Japan and European launch momentum creates additional revenue diversification beyond US concentration.',
      ],
      threats: [
        'Roche/ImmunoGen SYD985 or other ADC competitors achieve compelling Phase 3 data in first-line bladder cancer.',
        'Manufacturing FDA inspection issues or supply disruption creates gap in PADCEV availability for patients.',
        'CMS IRA negotiation could target PADCEV in future cycles as spend grows with volume, creating pricing risk from FY28.',
      ],
    },
    researchRefs: [
      'Astellas Q1 FY26 earnings call — PADCEV ¥221.2B FY25, first-line bladder cancer market share update',
      'Astellas Annual Securities Report FY2025 — PADCEV commercial trajectory, manufacturing investment',
      'EV-302 New England Journal of Medicine publication — clinical foundation for first-line standard of care positioning',
    ],
  },
  {
    id: 'fx-headwind-usd-jpy',
    rank: 4,
    category: 'Macro & FX',
    title: 'USD/JPY & EUR/JPY FX Headwinds on Astellas Repatriated Revenue',
    shortTitle: 'FX / Currency Risk',
    plLeverPreset: {
      'fx-usd-jpy-rate': 148.0,
      'established-markets-revenue-growth': 2.5,
    },
    summary:
      'Astellas generates ~60% of revenue outside Japan (primarily USD from XTANDI US). Each ¥1 appreciation in the USD/JPY rate impacts Core OP by approximately ¥2.1B annually. With FY25 XTANDI US revenue of ~¥570B, a 5-point USD/JPY move (e.g., from ¥150 to ¥145) creates a ¥10.5B headwind — equivalent to 1.9% of FY25 Core OP. The EUR/JPY rate additionally affects Established Markets (~¥280B revenue).',
    importance: 'high',
    materialityNote:
      'FX represents Astellas\'s most pervasive macro risk: ¥2.1B per ¥1 USD/JPY move on an annual basis. A sustained 10-point USD/JPY depreciation (e.g., ¥155 → ¥145) could reduce Core OP by ¥21B — 3.8% of FY25 Core OP. Astellas hedges ~50% of annual FX exposure through forward contracts but 6-12 month lags limit full protection.',
    indicatorsToWatch: [
      'Bank of Japan monetary policy announcements — YCC adjustment or rate hikes drive USD/JPY depreciation',
      'US Federal Reserve interest rate decisions and forward guidance affecting USD strength vs. JPY',
      'Astellas quarterly FX assumptions vs. spot rate — management guidance updates typically flag ±¥5 scenarios',
      'EUR/JPY rate movement — affects Established Markets revenue translation (approximately ¥0.9B per ¥1 EUR/JPY)',
      'Astellas hedging program coverage ratio and maturity — determines how much of FY26 exposure is locked in',
    ],
    impactRange: {
      label: 'Illustrative Core OP swing from ¥155 (favorable) vs. ¥140 (adverse) USD/JPY for FY26',
      lowM: -31.5,
      highM: 10.5,
      marginBpsLow: -568,
      marginBpsHigh: 189,
    },
    swot: {
      strengths: [
        'Astellas operates a structured FX hedging program covering ~50% of annual USD/JPY exposure through forward contracts.',
        'Natural hedge exists through USD-denominated operating costs (US commercial, manufacturing) partially offsetting revenue translation.',
        'Astellas management proactively updates FX sensitivity guidance each quarter, providing transparent investor communication.',
      ],
      weaknesses: [
        'Revenue concentration in JPY-reporting with USD/EUR cost base creates structural translation mismatch.',
        'Hedging program cannot fully protect against sustained multi-year JPY appreciation without prohibitive premium costs.',
      ],
      opportunities: [
        'USD/JPY above ¥155 creates significant FX tailwind — Astellas benefits when JPY is weak vs. dollar.',
        'Geographic revenue diversification into China and International Markets over time reduces USD concentration.',
        'Natural hedge expansion through increased USD-denominated R&D and manufacturing investment reduces translation exposure.',
      ],
      threats: [
        'Bank of Japan policy normalization (rate hikes) could drive sustained JPY appreciation toward ¥130-140 range.',
        'US Federal Reserve rate cuts accelerate USD weakness, amplifying translation headwind beyond hedging coverage.',
        'Simultaneous EUR/JPY and USD/JPY depreciation creates compounding FX impact exceeding ¥40B annually.',
      ],
    },
    researchRefs: [
      'Astellas Q1 FY26 earnings call — FX sensitivity ¥2.1B per ¥1 USD/JPY, hedging program update',
      'Astellas Annual Securities Report FY2025 — FX risk factor disclosure, currency sensitivity analysis',
      'Bank of Japan Monetary Policy Statement Q1 2026 — YCC policy evolution and JPY rate implications',
    ],
  },
  {
    id: 'oncology-competitive-pressure',
    rank: 5,
    category: 'Competitive / Oncology',
    title: 'Oncology Competitive Pressure — ERLEADA, LYNPARZA & Prostate Cancer Dynamics',
    shortTitle: 'Oncology Competition',
    plLeverPreset: {
      'xtandi-market-share-pct': 36.0,
      'xtandi-us-net-revenue-growth': -3.0,
      'rd-pipeline-advancement-pct': 65.0,
    },
    summary:
      'XTANDI faces intensifying competition from J&J\'s ERLEADA (apalutamide) in non-metastatic prostate cancer and AstraZeneca/Merck\'s LYNPARZA (olaparib) in BRCA-mutant prostate cancer. While XTANDI retains the dominant share position in metastatic castration-resistant prostate cancer (mCRPC) and is expanding into earlier disease states, label overlaps are creating prescriber choice dynamics that could constrain XTANDI market share growth to 0-2% annually vs. the 5%+ historical trajectory.',
    importance: 'elevated',
    materialityNote:
      'XTANDI\'s ~38-42% US market share in total prostate cancer therapy represents the foundation of Astellas revenue. Each 1pp market share loss ≈ ¥9.6B annual revenue. LYNPARZA\'s BRCA-biomarker-selected label creates a precision oncology segment where XTANDI cannot compete directly — the question is how large that biomarker-selected population becomes relative to the broader XTANDI addressable market.',
    indicatorsToWatch: [
      'IQVIA quarterly XTANDI TRx data vs. ERLEADA and LYNPARZA — leading share signal',
      'ERLEADA nmCSPC label performance — primary competitive overlap with XTANDI in non-metastatic patients',
      'LYNPARZA BRCA-biomarker testing rate in prostate cancer — higher testing = larger LYNPARZA-eligible population',
      'XTANDI TALAPRO-3 and MAGNITUDE combination study readouts — expansion data could reposition XTANDI ahead of competitors',
      'J&J Janssen prostate cancer pipeline (apalutamide combinations) — next-generation competition beyond current ERLEADA',
    ],
    impactRange: {
      label: 'Illustrative XTANDI US revenue swing from stable vs. -3pp share loss to ERLEADA/LYNPARZA',
      lowM: -29,
      highM: 10,
      marginBpsLow: -136,
      marginBpsHigh: 47,
    },
    swot: {
      strengths: [
        'XTANDI has 10+ years of real-world data and established clinical evidence across all prostate cancer treatment lines.',
        'XTANDI label spans mCRPC, nmCRPC, mCSPC, nmCSPC — the broadest prostate cancer indication coverage of any AR inhibitor.',
        'Strong urology and oncology KOL relationships built over a decade of XTANDI clinical engagement.',
      ],
      weaknesses: [
        'XTANDI market exclusivity expires in key markets — generic entry risk for enzalutamide in EU circa 2028.',
        'ERLEADA head-to-head comparison data (ATLAS trial) could challenge XTANDI equivalence arguments in nmCRPC.',
      ],
      opportunities: [
        'XTANDI combination with PARP inhibitors (talazoparib) in BRCA-unselected patients could expand addressable market.',
        'Prostate cancer incidence growth from aging demographics (Baby Boomer cohort) expands the total addressable market.',
        'XTANDI biosimilar market exclusivity in Japan and emerging markets protects revenue trajectory longer than US/EU.',
      ],
      threats: [
        'J&J ERLEADA gains market share in nmCSPC through sustained commercial investment and head-to-head positioning.',
        'LYNPARZA BRCA-biomarker label grows as BRCA testing rates increase in prostate cancer standard of care.',
        'Novel mechanism AR degraders (ARV-110 class) in clinical development could represent the next generation of prostate cancer therapy.',
      ],
    },
    researchRefs: [
      'Astellas Q1 FY26 earnings call — XTANDI competitive position, prostate cancer market share update',
      'Astellas Annual Securities Report FY2025 — XTANDI ¥960.8B revenue, competitive landscape risk factors',
      'IQVIA MIDAS Prostate Cancer Therapy Market Report Q1 2026 — XTANDI vs. ERLEADA vs. LYNPARZA TRx dynamics',
    ],
  },
];

export function findExternalSignalById(id: string): ExternalCompetitiveSignal | undefined {
  return EXTERNAL_COMPETITIVE_SIGNALS.find((s) => s.id === id);
}
