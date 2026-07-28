import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 24: Variance Explanations — Astellas Pharma Inc. (TYO: 4503 / OTC: ALPMY)
// 4 metrics × 2 types × 5 quarters = 40 records
// Astellas fiscal year: Q1=Apr-Jun, Q2=Jul-Sep, Q3=Oct-Dec, Q4=Jan-Mar
//
// Metrics: Revenue (¥B), Core OP Margin (%), Core EPS (¥/share), XTANDI Revenue (¥B)
// Types:   actual_vs_plan  |  actual_vs_prior_year
// Quarters: Q1 FY25, Q2 FY25, Q3 FY25, Q4 FY25, Q1 FY26
//
// Astellas Key Facts (Q1 FY26 guidance):
//   Revenue ¥558.0B (+3.7% YoY) | Core OP Margin 27.9% | Core EPS ¥36.5 | XTANDI ¥175.0B
//   FY25 full-year: Revenue ¥2,139.2B | Core OP Margin 26.0% | Core EPS ¥130.3
//   FY26 guidance: Revenue ¥2,220B | Core OP Margin ~27.9% | SMT savings ¥40B
// =============================================================================

const QUARTER_LABELS = ['Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25', 'Q1 FY26'];

interface DriverBreakdown {
  driver: string;
  impact: number;
  impactUnit: string;
  explanation: string;
  confidence: number;
}

interface VarianceRecord {
  quarter: string;
  metricName: string;
  varianceType: 'actual_vs_plan' | 'actual_vs_prior_year';
  totalVariance: number;
  totalVarianceUnit: string;
  driverBreakdown: DriverBreakdown[];
  narrative: string;
  recommendations: string[];
}

const records: VarianceRecord[] = [

  // ───────────────────────────────────────────────────────────────────────────
  // Q1 FY25 (Apr–Jun 2025)
  // Revenue ¥537.9B | Core OP Margin 26.0% | Core EPS ¥32.8 | XTANDI ¥178.4B
  // ───────────────────────────────────────────────────────────────────────────

  {
    quarter: 'Q1 FY25', metricName: 'Revenue (¥B)', varianceType: 'actual_vs_plan',
    totalVariance: 12.9, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'PADCEV / IZERVAY US Launch Acceleration', impact: 9.4, impactUnit: '¥B', explanation: 'PADCEV Q1 FY25 US revenue +34.8% YoY — above +28% plan; IZERVAY geographic AMD approval in US and Japan driving early launch volumes ahead of plan; combined PADCEV+IZERVAY ¥9.4B above plan as ADC and eye care indications exceeded launch-curve forecasts', confidence: 0.88 },
      { driver: 'XTANDI EMEA Above Plan', impact: 4.8, impactUnit: '¥B', explanation: 'XTANDI EU volumes above plan on early-stage prostate cancer indication penetration in Germany and France; Spanish/Italian tender wins ahead of schedule; XTANDI EMEA contribution +¥4.8B vs plan on volume above forecast', confidence: 0.84 },
      { driver: 'Japan NHI Drug Price Revision Headwind', impact: -1.3, impactUnit: '¥B', explanation: 'Q1 FY25 reflects partial impact of NHI biennial drug price revision effective April 2025; BETANIS and VESICARE pricing reduced 5-8% — legacy product revenue below plan on accelerated NHI pricing; partially offset by VYLOY Japan launch volumes', confidence: 0.86 },
    ],
    narrative: 'Q1 FY25 revenue of ¥537.9B exceeded plan by ¥12.9B (+2.5%). Strategic Brands (PADCEV, IZERVAY) outperformed their launch curves — particularly IZERVAY whose geographic AMD US approval in FY24 translated into strong early commercial volumes. XTANDI continued above-plan EMEA expansion. The Japan NHI pricing headwind on legacy products was within expected range and smaller than the Strategic Brands upside. This beat confirms the FY25 Strategic Brands growth thesis is tracking ahead of expectations.',
    recommendations: [
      'Raise FY25 PADCEV/IZERVAY revenue guidance if Q2 volumes sustain Q1 pace — US oncology channel checks suggest continued above-plan detailing effectiveness for PADCEV in 2L urothelial cancer',
      'Quantify IZERVAY NHI Japan approval economics separately from US launch performance — investors need visibility into Japan geographic AMD market size to model IZERVAY Japan trajectory',
    ],
  },
  {
    quarter: 'Q1 FY25', metricName: 'Revenue (¥B)', varianceType: 'actual_vs_prior_year',
    totalVariance: 43.7, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'PADCEV Revenue Growth (+34.8% YoY)', impact: 18.2, impactUnit: '¥B', explanation: 'PADCEV global revenue +34.8% YoY driven by continued 2L urothelial cancer penetration in US + EU + Japan; PADCEV now in 5 approved indications globally; Seagen collaboration driving multi-indication expansion of the ADC platform', confidence: 0.90 },
      { driver: 'XTANDI Revenue Growth (+5.6% YoY)', impact: 10.4, impactUnit: '¥B', explanation: 'XTANDI Q1 FY25 ¥178.4B vs Q1 FY24 ¥168.0B (+6.2% YoY); EMEA early-stage prostate cancer indication gaining share; China volumes growing on joint venture penetration; US market sustaining despite enzalutamide class competition from darolutamide', confidence: 0.88 },
      { driver: 'IZERVAY and VYLOY New Product Launches', impact: 12.8, impactUnit: '¥B', explanation: 'IZERVAY US/Japan geographic atrophic macular degeneration launch generating ¥19.4B Q1 FY25 vs ¥6.8B Q1 FY24 (when only early launch); VYLOY (zolbetuximab) Japan approval generating ¥3.2B early revenue; combined new launch contribution ¥12.8B YoY incremental', confidence: 0.86 },
      { driver: 'Legacy Product Revenue Decline', impact: -4.9, impactUnit: '¥B', explanation: 'BETANIS, VESICARE, TARGEDIA: combined legacy product decline -¥4.9B YoY on generic competition and Japan NHI pricing revision; expected structural decline as these products reach LOE; company explicitly guiding for continued decline through FY25-FY26', confidence: 0.90 },
      { driver: 'Favorable FX Translation (USD/JPY ¥147→¥150)', impact: 7.2, impactUnit: '¥B', explanation: 'USD/JPY appreciation from ¥147 (Q1 FY24) to ¥150 (Q1 FY25) adds ¥3/USD × XTANDI and PADCEV US dollar revenue base; ¥2.1B per ¥1 USD move × ¥3 differential = ¥6.3B FX translation tailwind; EUR/JPY minor additional contribution', confidence: 0.85 },
    ],
    narrative: 'Q1 FY25 revenue grew +¥43.7B (+8.8%) YoY — the most significant revenue growth quarter in 3 years. PADCEV at +34.8%, XTANDI at +6.2%, and new launches IZERVAY and VYLOY all contributing simultaneously while legacy product declines remain manageable. The Strategic Brands revenue mix is now dominant — PADCEV/IZERVAY/VYLOY combined represent 25%+ of total Q1 FY25 revenue. FX translation provided an additional ¥7.2B tailwind.',
    recommendations: [
      'Frame the Q1 FY25 revenue growth as structural rather than cyclical — PADCEV +34.8% is a 5-year compound growth story; provide a long-range PADCEV revenue model showing oncology label expansion pipeline',
      'Disclose IZERVAY US vs. Japan revenue split quarterly — market will want to track each territory launch ramp separately as Japan AMD market is distinct from US geographic AMD market dynamics',
    ],
  },

  {
    quarter: 'Q1 FY25', metricName: 'Core OP Margin (%)', varianceType: 'actual_vs_plan',
    totalVariance: 50, totalVarianceUnit: 'bps',
    driverBreakdown: [
      { driver: 'Strategic Brands Revenue Mix Above Plan', impact: 70, impactUnit: 'bps', explanation: 'Higher-than-planned mix of PADCEV/IZERVAY (above-plan revenue on improving COGS economics) favorably impacted blended margin; Strategic Brands contribute above-average margin at maturity — mix shift above plan added 70bps to Core OP margin', confidence: 0.88 },
      { driver: 'SMT Program Q1 FY25 Savings ¥5.1B Above ¥4.8B Plan', impact: 30, impactUnit: 'bps', explanation: 'SMT program delivered ¥5.1B Q1 FY25 vs ¥4.8B plan — ¥0.3B outperformance from SG&A workstream; Japan MR productivity program ahead of schedule; corporate G&A reductions from shared services consolidation ahead of plan; 30bps Core OP margin benefit', confidence: 0.86 },
      { driver: 'R&D Investment Above Plan (new POC programs)', impact: -50, impactUnit: 'bps', explanation: 'Q1 FY25 R&D ¥81.2B was ¥2.0B above plan — new POC (proof of concept) program initiations in oncology IO combination space drove above-plan R&D; management decision to invest in early-stage pipeline acceleration cost 50bps of Core OP margin vs plan', confidence: 0.84 },
    ],
    narrative: 'Q1 FY25 Core OP Margin of 26.0% beat plan by 50bps. The Strategic Brands revenue mix outperformance and SMT program delivery ahead of schedule were the primary drivers of the beat. Above-plan R&D investment (intentional pipeline acceleration) partially offset the upside. The net 50bps beat is a high-quality positive: revenue leverage and efficiency savings, not cost underruns, drove the outperformance.',
    recommendations: [
      'Communicate the Core OP Margin bridge explicitly: SMT ¥5.1B (above plan) + Strategic Brands mix (70bps) = structural margin improvement; above-plan R&D investment (50bps headwind) is a positive indicator for pipeline quality',
      'Provide FY25 full-year Core OP Margin guidance corridor — investors need the annual target to model the H2 FY25 trajectory, particularly if R&D investment remains above plan',
    ],
  },
  {
    quarter: 'Q1 FY25', metricName: 'Core OP Margin (%)', varianceType: 'actual_vs_prior_year',
    totalVariance: 350, totalVarianceUnit: 'bps',
    driverBreakdown: [
      { driver: 'Revenue Operating Leverage on Higher Revenue Base', impact: 180, impactUnit: 'bps', explanation: 'Revenue +8.8% YoY on largely fixed SG&A/R&D cost base; operating leverage from ¥43.7B revenue growth on lower-variable-cost incremental revenue delivers 180bps of margin expansion; financial scale effect of growing oncology revenue is the primary driver', confidence: 0.90 },
      { driver: 'SMT Program Year-1 Savings (¥4.9B FY24 → ¥21B FY25 trajectory)', impact: 120, impactUnit: 'bps', explanation: 'SMT program ramp from ¥4.9B FY24 annualized to ¥21B FY25 target — Q1 FY25 run-rate represents ¥16B incremental vs FY24; 120bps Core OP margin expansion from SMT-driven SG&A, COGS, and R&D efficiency improvements YoY', confidence: 0.88 },
      { driver: 'Strategic Brands Margin Mix Improvement', impact: 80, impactUnit: 'bps', explanation: 'Strategic Brands (PADCEV, IZERVAY, VYLOY) growing as % of revenue vs Q1 FY24 base; these products carry above-average operating margin at current scale; mix shift toward higher-margin products adds 80bps YoY margin expansion independent of revenue growth', confidence: 0.86 },
      { driver: 'Above-Plan R&D Investment Headwind', impact: -30, impactUnit: 'bps', explanation: 'R&D ¥81.2B Q1 FY25 vs ¥79.5B Q1 FY24 — above-plan R&D investment in new POC programs; also IZERVAY post-approval studies adding to YoY R&D increase; net -30bps YoY headwind from accelerated pipeline investment', confidence: 0.84 },
    ],
    narrative: 'Q1 FY25 Core OP Margin expanded +350bps YoY from approximately 22.5% (Q1 FY24) to 26.0% (Q1 FY25). This is the largest single-quarter YoY margin improvement in recent Astellas history. The drivers are structural: SMT program delivering savings, revenue scale leverage, and the mix shift toward high-margin Strategic Brands. The 350bps expansion validates the FY25 Core OP Margin guidance of 26.0% and provides confidence in the FY26 target of 27.9%.',
    recommendations: [
      'Communicate Core OP Margin as the primary FY25-FY27 financial KPI — the 350bps YoY expansion is a structural inflection, not a one-time event; the SMT + Strategic Brands leverage thesis is confirmed by Q1 data',
      'Provide an explicit Core OP Margin bridge from Q1 FY24 22.5% to Q1 FY25 26.0% showing each driver — this is the most compelling financial disclosure available in Q1 FY25 earnings',
    ],
  },

  {
    quarter: 'Q1 FY25', metricName: 'Core EPS (¥/share)', varianceType: 'actual_vs_plan',
    totalVariance: 1.3, totalVarianceUnit: '¥/share',
    driverBreakdown: [
      { driver: 'Core OP Margin Beat Flow-Through', impact: 1.8, impactUnit: '¥/share', explanation: '50bps Core OP margin beat on ¥537.9B revenue = ¥2.7B above-plan Core OP; at ~60% EPS conversion from Core OP and ~620M diluted shares = +¥1.8/share Core EPS benefit from margin outperformance', confidence: 0.88 },
      { driver: 'Favorable FX Translation', impact: 0.5, impactUnit: '¥/share', explanation: 'USD/JPY ¥2 above plan translates to ¥4.2B above-plan Core OP contribution from FX (¥2 × ¥2.1B/¥1); at EPS conversion = +¥0.5/share Core EPS; FX excluded from Core OP guidance but included in Core EPS', confidence: 0.84 },
      { driver: 'Above-Plan R&D Investment', impact: -1.0, impactUnit: '¥/share', explanation: 'R&D ¥2.0B above plan = -¥2.0B Core OP vs plan; at EPS conversion = -¥1.0/share Core EPS headwind from accelerated POC investment; management communicated this as intentional pipeline acceleration, not an overrun', confidence: 0.86 },
    ],
    narrative: 'Q1 FY25 Core EPS of ¥32.8 beat plan of ¥31.5 by ¥1.3 (+4.1%). The operating margin beat and favorable FX translation drove the upside, partially offset by above-plan R&D investment. Core EPS growth of ¥5.3 (+19.2%) YoY reflects the full-year power of the Strategic Brands growth and SMT cost transformation thesis materializing simultaneously.',
    recommendations: [
      'Provide updated full-year FY25 Core EPS guidance range after Q1 beat — at ¥32.8 Q1 actual, the trajectory to ¥130+ full-year EPS is credible; confirm or raise FY25 guidance in H1 FY25 mid-year update',
    ],
  },
  {
    quarter: 'Q1 FY25', metricName: 'Core EPS (¥/share)', varianceType: 'actual_vs_prior_year',
    totalVariance: 5.3, totalVarianceUnit: '¥/share',
    driverBreakdown: [
      { driver: 'Core OP Expansion +350bps YoY', impact: 4.2, impactUnit: '¥/share', explanation: '350bps Core OP margin expansion on ¥537.9B Q1 FY25 revenue vs ¥494.2B Q1 FY24 generates materially higher Core OP; combined revenue growth + margin expansion drives ¥4.2/share of the ¥5.3 YoY Core EPS increase — the primary fundamental driver', confidence: 0.90 },
      { driver: 'Favorable FX Translation vs. Q1 FY24', impact: 0.9, impactUnit: '¥/share', explanation: 'Q1 FY25 USD/JPY ¥150 vs Q1 FY24 ¥147 = ¥3 favorable = ¥6.3B FX tailwind; at Core EPS conversion ≈ +¥0.9/share incremental Core EPS from FX vs prior year', confidence: 0.86 },
      { driver: 'Share Count Neutral', impact: 0.2, impactUnit: '¥/share', explanation: 'Astellas share buyback program (¥50B announced FY24) reducing diluted share count modestly YoY; modest positive EPS accretion from share reduction; approximately +¥0.2/share from buyback effect', confidence: 0.82 },
    ],
    narrative: 'Q1 FY25 Core EPS grew ¥5.3 (+19.2%) YoY — among the strongest EPS growth performances in Astellas history. The fundamental driver is the intersection of +8.8% revenue growth with +350bps margin expansion, creating extraordinary operating leverage. FX translation added ¥0.9/share incremental. The YoY EPS growth rate of 19% significantly exceeds Astellas medium-term guidance and positions the company for a year of above-consensus earnings delivery.',
    recommendations: [
      'Flag Core EPS as the headline KPI — ¥5.3 YoY growth (+19.2%) is the most compelling single data point in Q1 FY25 results; anchor all investor communication around this metric and its structural drivers',
    ],
  },

  {
    quarter: 'Q1 FY25', metricName: 'XTANDI Revenue (¥B)', varianceType: 'actual_vs_plan',
    totalVariance: 3.4, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'US Volume Above Plan (EMEA + Asia Contribution)', impact: 4.8, impactUnit: '¥B', explanation: 'XTANDI US quarterly volume tracking above plan on nmHSPC (non-metastatic hormone-sensitive prostate cancer) indication penetration; physician adoption of early-stage indication above plan in community urology; EMEA volume also above plan from Germany and France tender wins', confidence: 0.88 },
      { driver: 'Japan NHI Pricing Negative Surprise', impact: -1.4, impactUnit: '¥B', explanation: 'Japan XTANDI NHI reimbursement price reduction effective April 2025 (biennial NHI revision cycle) was 3.5% vs. 2.0% plan assumption; Japan XTANDI revenue -¥1.4B vs plan on pricing; volume was on plan, entirely a pricing miss on NHI revision rate assumption', confidence: 0.84 },
    ],
    narrative: 'Q1 FY25 XTANDI revenue of ¥178.4B beat plan by ¥3.4B (+1.9%). Strong EMEA and US volume performance more than offset the Japan NHI pricing headwind. The NHI pricing miss was modest and consistent with the biennial revision risk management approach. XTANDI continues to perform as a durable revenue platform despite competition from darolutamide — the multi-indication strategy (mCRPC + nmCRPC + nmHSPC + mHSPC) is maintaining volume share even as price per unit is modestly pressured.',
    recommendations: [
      'Provide IRA risk sensitivity for XTANDI — each 1pp US price cut = -¥9.6B annual Core OP (per Astellas guidance); investors need this sensitivity to model XTANDI contribution under IRA negotiation scenarios',
      'Quantify XTANDI market share by indication — nmHSPC share vs darolutamide is the key competitive battleground; early-stage indication is both the growth driver and the most vulnerable to competition',
    ],
  },
  {
    quarter: 'Q1 FY25', metricName: 'XTANDI Revenue (¥B)', varianceType: 'actual_vs_prior_year',
    totalVariance: 10.4, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'Volume Growth: nmHSPC + mHSPC Early-Stage Indications', impact: 8.9, impactUnit: '¥B', explanation: 'XTANDI US volume growth from nmHSPC (non-metastatic hormone-sensitive) and mHSPC (metastatic hormone-sensitive) prostate cancer indications gaining physician adoption in community urology settings; these early-stage patients represent a larger addressable patient population than mCRPC alone — structural volume expansion', confidence: 0.90 },
      { driver: 'EMEA Volume Growth (Germany, France, Spain)', impact: 3.8, impactUnit: '¥B', explanation: 'XTANDI EMEA volume +15% YoY from early-stage indication approvals and National Health System tender wins in Germany (¥2.1B incremental), France (¥0.9B), and Spain/Italy (¥0.8B); EMEA growing faster than US on lower base of early-stage penetration', confidence: 0.88 },
      { driver: 'Japan/Asia NHI Pricing Headwind', impact: -2.3, impactUnit: '¥B', explanation: 'Japan NHI pricing -3.5% on biennial revision cycle; combined with modest volume maturity in Japan market — YoY decline of ¥2.3B from Japan XTANDI pricing and volume moderating in a market where XTANDI penetration is high and growth is natural-rate-limited', confidence: 0.84 },
    ],
    narrative: 'Q1 FY25 XTANDI revenue grew +¥10.4B (+6.2%) YoY. The multi-indication strategy in prostate cancer continues to drive volume growth — early-stage indications (nmHSPC, mHSPC) are expanding the addressable patient population beyond the historical mCRPC base. EMEA is outpacing the US on a % growth basis due to earlier stage of market development. Japan pricing pressure is manageable. XTANDI at ¥178.4B/quarter (¥714B annualized) remains the largest single product in the Astellas portfolio.',
    recommendations: [
      'Disclose XTANDI revenue by geography (US, EMEA, Japan, RoW) quarterly — investor models are highly sensitive to the US/Japan mix given the contrasting pricing and growth dynamics; geographic transparency would improve XTANDI modeling accuracy significantly',
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Q2 FY25 (Jul–Sep 2025)
  // Revenue ¥537.0B | Core OP Margin 26.0% | Core EPS ¥33.1 | XTANDI ¥180.2B
  // ───────────────────────────────────────────────────────────────────────────

  {
    quarter: 'Q2 FY25', metricName: 'Revenue (¥B)', varianceType: 'actual_vs_plan',
    totalVariance: 7.0, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'XTANDI Above Plan on EMEA Volume', impact: 3.2, impactUnit: '¥B', explanation: 'XTANDI Q2 FY25 ¥180.2B vs ¥177.0B plan — ¥3.2B above plan from EMEA early-stage indication momentum continuing above plan-assumptions; Germany tender tranche timing favorable; UK National Health Service approval of nmHSPC indication in Q2', confidence: 0.88 },
      { driver: 'PADCEV US Revenue Above Plan', impact: 5.0, impactUnit: '¥B', explanation: 'PADCEV Q2 FY25 US revenue above plan — NMIBC sNDA preparation driving physician awareness; 2L urothelial cancer market share expanding above plan timeline; net incremental above plan ¥5.0B; accelerated ADC manufacturing scale supporting supply vs demand', confidence: 0.84 },
      { driver: 'VYLOY EU Market Approval Timing Delayed', impact: -1.2, impactUnit: '¥B', explanation: 'VYLOY EU EMA approval expected Q2 FY25 — delayed to Q3 FY25; ¥1.2B launch revenue originally planned for Q2 shifted to Q3; regulatory submission timelines compressed but still within FY25 guidance corridor', confidence: 0.86 },
    ],
    narrative: 'Q2 FY25 revenue of ¥537.0B beat plan by ¥7.0B (+1.3%). XTANDI EMEA momentum and PADCEV US above-plan performance drove the beat. VYLOY EU approval timing slipped one quarter — representing a modest Q2 headwind that will reverse in Q3 when the approved revenue begins. The Q2 beat shows the Strategic Brands portfolio diversification is working — XTANDI and PADCEV can compensate for single-product timing effects.',
    recommendations: [
      'Provide VYLOY EU launch timeline update — Q3 FY25 approval expected; quantify the ¥1.2B timing shift and confirm the EU launch commercial readiness investment is on track',
    ],
  },
  {
    quarter: 'Q2 FY25', metricName: 'Revenue (¥B)', varianceType: 'actual_vs_prior_year',
    totalVariance: 52.7, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'PADCEV Revenue +34.8% YoY', impact: 19.4, impactUnit: '¥B', explanation: 'PADCEV global revenue continuing above-plan growth trajectory; Q2 FY25 PADCEV ¥38.2B vs ¥28.3B Q2 FY24 (+34.9% YoY); new market authorizations and continued 2L urothelial cancer penetration; NMIBC indication preparation building physician awareness', confidence: 0.90 },
      { driver: 'XTANDI Volume Growth +5.9% YoY', impact: 10.2, impactUnit: '¥B', explanation: 'XTANDI Q2 FY25 ¥180.2B vs ¥170.0B Q2 FY24 (+5.9% YoY); all geographies contributing; EMEA growth particularly strong on nmHSPC adoption; early-stage prostate cancer indication driving volume expansion across the global network', confidence: 0.88 },
      { driver: 'IZERVAY Commercial Ramp', impact: 16.8, impactUnit: '¥B', explanation: 'IZERVAY Q2 FY25 ¥22.1B vs ¥5.3B Q2 FY24 (+317% YoY from low base); US commercial launch fully ramped; retinal specialist adoption and payer access expanding; IZERVAY is the fastest-growing Astellas product on a YoY percentage basis', confidence: 0.86 },
      { driver: 'Legacy Product Decline (BETANIS/VESICARE)', impact: -5.8, impactUnit: '¥B', explanation: 'Legacy product revenue declining structurally on generic competition and NHI pricing: BETANIS -¥2.8B YoY, VESICARE -¥2.1B YoY, other legacy -¥0.9B YoY; expected and managed through SMT program resource reallocation; total portfolio decline ¥5.8B YoY', confidence: 0.90 },
      { driver: 'FX Translation Tailwind (USD/JPY ¥155 peak)', impact: 12.1, impactUnit: '¥B', explanation: 'Q2 FY25 USD/JPY peaked at ¥155 — above FY25 budget rate ¥145 by ¥10; ¥10 × ¥2.1B/¥1 sensitivity = ¥21B annualized FX tailwind vs. budget; Q2 contribution of ¥12.1B from FX vs Q2 FY24 (¥148/USD); largest quarterly FX translation gain of FY25', confidence: 0.88 },
    ],
    narrative: 'Q2 FY25 revenue grew +¥52.7B (+10.9%) YoY — the strongest YoY growth quarter of FY25. All Strategic Brands contributed to growth simultaneously while legacy products declined as expected. The peak USD/JPY rate in Q2 provided a ¥12.1B FX tailwind. IZERVAY commercial ramp from near-zero to ¥22.1B quarterly is the standout performance — this is a product growing from launch to established revenue in a single fiscal year.',
    recommendations: [
      'Disclose IZERVAY quarterly revenue explicitly — the ¥16.8B YoY increment demonstrates extraordinary launch velocity; investors tracking geographic AMD market development need this data point',
      'Note the Q2 FX tailwind magnitude: ¥12.1B from USD/JPY; provide sensitivity guidance for H2 FY25 assuming ¥150/USD rate vs ¥155 peak — investors need to model H2 FX comparison base effects',
    ],
  },

  {
    quarter: 'Q2 FY25', metricName: 'Core OP Margin (%)', varianceType: 'actual_vs_plan',
    totalVariance: 20, totalVarianceUnit: 'bps',
    driverBreakdown: [
      { driver: 'Revenue Leverage Above Plan', impact: 40, impactUnit: 'bps', explanation: 'Q2 revenue ¥537.0B vs ¥530.0B plan; ¥7.0B above-plan revenue on largely fixed cost base delivers approximately 40bps margin leverage; high incremental margin on above-plan PADCEV/XTANDI volumes', confidence: 0.86 },
      { driver: 'SMT Savings H1 FY25 On Track', impact: 0, impactUnit: 'bps', explanation: 'SMT Q2 savings ¥5.3B exactly on plan; H1 FY25 cumulative ¥10.4B on track for ¥21B full-year; no SMT variance vs. plan in Q2 — program executing as designed; neutral margin impact vs. plan from SMT in Q2', confidence: 0.90 },
      { driver: 'R&D Above Plan (ongoing POC programs)', impact: -20, impactUnit: 'bps', explanation: 'R&D ¥79.5B vs ¥78.5B plan — ¥1.0B above plan for ongoing POC program acceleration and VYLOY Phase 3 enrollment ramp; -20bps vs plan from above-plan R&D; consistent with Q1 pattern of intentional pipeline investment above budget', confidence: 0.84 },
    ],
    narrative: 'Q2 FY25 Core OP Margin of 26.0% beat plan by 20bps. Revenue leverage from the above-plan top line was partially consumed by ongoing above-plan R&D investment. SMT delivered exactly on plan. The 20bps beat is more modest than Q1 (50bps) — reflecting that R&D investment above plan is consistent and intentional, and management is allowing pipeline acceleration at the cost of modest margin plan upside.',
    recommendations: [
      'Provide full-year FY25 guidance update at H1: ¥10.4B H1 SMT confirms ¥21B full-year; R&D above-plan pattern should be communicated as intentional pipeline investment, not budget discipline issue',
    ],
  },
  {
    quarter: 'Q2 FY25', metricName: 'Core OP Margin (%)', varianceType: 'actual_vs_prior_year',
    totalVariance: 300, totalVarianceUnit: 'bps',
    driverBreakdown: [
      { driver: 'Revenue Scale Leverage on Higher Base', impact: 150, impactUnit: 'bps', explanation: '+10.9% revenue growth on a cost base growing more slowly than revenue; operating leverage on fixed COGS, SG&A, and R&D infrastructure delivers 150bps of margin expansion; ¥52.7B revenue growth creating strong financial leverage', confidence: 0.90 },
      { driver: 'SMT Program Year-1 Savings', impact: 110, impactUnit: 'bps', explanation: 'SMT ¥5.3B Q2 FY25 vs ¥1.1B Q2 FY24 = ¥4.2B incremental savings YoY; on ¥537B quarterly revenue base = 110bps incremental Core OP margin expansion from SMT program YoY delivery acceleration', confidence: 0.88 },
      { driver: 'R&D and COGS Investment for Growth', impact: -40, impactUnit: 'bps', explanation: 'Incremental R&D for VYLOY Phase 3 and new POC programs above Q2 FY24 R&D investment; PADCEV COGS above Q2 FY24 as volumes scale with higher absolute manufacturing costs; net -40bps incremental investment vs prior year', confidence: 0.84 },
    ],
    narrative: 'Q2 FY25 Core OP Margin expanded +300bps YoY. The double-digit revenue growth combined with SMT program Year-1 savings is creating powerful operating leverage. The margin expansion trajectory is consistent with the FY25 full-year 26.0% guidance and the FY26 target of 27.9%, which requires approximately 190bps further expansion from the FY25 level.',
    recommendations: [
      'Use H1 FY25 results (both Q1 +350bps and Q2 +300bps YoY) to affirm the FY26 margin expansion thesis — the cumulative SMT program and Strategic Brands mix shift are delivering above-historical-average margin expansion rates',
    ],
  },

  {
    quarter: 'Q2 FY25', metricName: 'Core EPS (¥/share)', varianceType: 'actual_vs_plan',
    totalVariance: 1.1, totalVarianceUnit: '¥/share',
    driverBreakdown: [
      { driver: 'Core OP Above Plan', impact: 0.8, impactUnit: '¥/share', explanation: '20bps margin beat on ¥537B revenue = ¥1.1B above-plan Core OP; at Core EPS conversion rate ≈ +¥0.8/share; operating performance drives the majority of the EPS beat', confidence: 0.88 },
      { driver: 'Interest Income from BOJ Rate Move', impact: 0.3, impactUnit: '¥/share', explanation: 'BOJ raised policy rate to 0.25% effective August 2025; Astellas cash balances (¥350B+) generate approximately ¥0.9B incremental annual interest income at 0.25% rate; Q2 partial-quarter impact ≈ ¥0.2B → +¥0.3/share Core EPS vs plan', confidence: 0.84 },
    ],
    narrative: 'Q2 FY25 Core EPS of ¥33.1 beat plan by ¥1.1 (+3.3%). Consistent with Q1 pattern: operating performance above plan and favorable items in financial income driving EPS beats. The BOJ rate lift is adding a small but growing financial income contribution that was not in original plan assumptions.',
    recommendations: [
      'Update FY25 Core EPS guidance to reflect BOJ rate impact — ¥0.9B annual interest income at 0.25% BOJ rate was not in original FY25 plan; provide sensitivity for further BOJ normalization',
    ],
  },
  {
    quarter: 'Q2 FY25', metricName: 'Core EPS (¥/share)', varianceType: 'actual_vs_prior_year',
    totalVariance: 5.3, totalVarianceUnit: '¥/share',
    driverBreakdown: [
      { driver: 'Core OP Expansion and Revenue Growth', impact: 4.0, impactUnit: '¥/share', explanation: '+300bps Core OP margin expansion on +10.9% revenue growth generates significant Core OP increase; primary driver of +¥5.3 YoY Core EPS growth; compound effect of multiple expansion + revenue growth is the financial superpower in the Astellas FY25 thesis', confidence: 0.90 },
      { driver: 'FX Tailwind vs. Q2 FY24', impact: 1.0, impactUnit: '¥/share', explanation: 'Q2 FY25 USD/JPY peak ¥155 vs Q2 FY24 ¥148 = ¥7 favorable; ¥7 × ¥2.1B/¥1 = ¥14.7B incremental FX vs prior year; at Core EPS conversion ≈ +¥1.0/share YoY FX contribution', confidence: 0.86 },
      { driver: 'BOJ Rate Lift Financial Income', impact: 0.3, impactUnit: '¥/share', explanation: 'Q2 FY25 BOJ rate 0.25% vs. Q2 FY24 0.1%; financial income improvement on cash balances; approximately ¥0.3/share incremental YoY contribution from higher deposit income and JV equity income growth', confidence: 0.82 },
    ],
    narrative: 'Q2 FY25 Core EPS grew ¥5.3 (+19.1%) YoY — identical growth rate to Q1. H1 FY25 Core EPS of ¥65.9 puts the company firmly on track for the FY25 full-year guidance. The consistency of the 19%+ YoY growth across H1 FY25 demonstrates the sustainability of the Strategic Brands / SMT program earnings engine.',
    recommendations: [
      'Announce an updated FY25 Core EPS guidance range at H1 results that reflects the consistent H1 beat pattern — if H1 came in ¥2.4 above H1 plan, the full-year beat trajectory warrants guidance revision',
    ],
  },

  {
    quarter: 'Q2 FY25', metricName: 'XTANDI Revenue (¥B)', varianceType: 'actual_vs_plan',
    totalVariance: 3.2, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'EMEA Volume Above Plan (Germany + UK)', impact: 4.4, impactUnit: '¥B', explanation: 'XTANDI EMEA above plan on UK nmHSPC approval and German tender wins; EMEA Q2 FY25 above plan by ¥4.4B; XTANDI EMEA growing fastest segment of the global portfolio in FY25 as early-stage indication rolls out market by market', confidence: 0.88 },
      { driver: 'Japan Volume Below Plan on NHI Pricing', impact: -1.2, impactUnit: '¥B', explanation: 'Japan XTANDI volume modestly below plan as generic class competition (darolutamide Japan approval in Q1 FY25) creates market share pressure; NHI pricing revision effect compounding; ¥1.2B Japan miss vs plan in Q2', confidence: 0.84 },
    ],
    narrative: 'Q2 FY25 XTANDI revenue ¥180.2B beat plan by ¥3.2B (+1.8%). Peak revenue quarter for XTANDI in FY25 — Q2 benefited from both USD/JPY translation peak and EMEA volume momentum. Japan class competition beginning to show in modest volume underperformance. XTANDI global revenue at ¥714B+ annualized run-rate remains above FY25 guidance.',
    recommendations: [
      'Provide a XTANDI geographic revenue table — US, EMEA, Japan, China/Asia separate; Japan share loss to darolutamide needs to be quantified to allow investors to model XTANDI Japan trajectory accurately in a competitive market',
    ],
  },
  {
    quarter: 'Q2 FY25', metricName: 'XTANDI Revenue (¥B)', varianceType: 'actual_vs_prior_year',
    totalVariance: 10.2, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'US and EMEA Volume Expansion', impact: 12.4, impactUnit: '¥B', explanation: 'Combined US+EMEA volume growth from early-stage indication penetration; US nmHSPC market penetration continuing; EMEA nmHSPC approvals rolling out across EU5; combined volume growth adding ¥12.4B vs Q2 FY24', confidence: 0.88 },
      { driver: 'Japan Revenue Decline (pricing + class competition)', impact: -2.2, impactUnit: '¥B', explanation: 'Japan XTANDI pricing -3.5% NHI revision + modest volume share loss to darolutamide = -¥2.2B YoY Japan revenue; Japan XTANDI maturity cycle: penetration high, growth limited, pricing declining; manageable given US/EMEA growth offsetting', confidence: 0.86 },
    ],
    narrative: 'Q2 FY25 XTANDI +¥10.2B (+6.0%) YoY. US/EMEA geographic expansion continues to offset Japan pricing/competitive headwinds. XTANDI at ¥180.2B is 33.6% of total Q2 FY25 revenue — the product remains essential to Astellas financial performance, which makes the IRA price negotiation risk a material FY26-FY27 concern.',
    recommendations: [
      'Model the XTANDI IRA price negotiation scenario range — each 1pp mandatory price cut = -¥9.6B Core OP; provide investors a framework for assessing the magnitude of the IRA headwind against the SMT savings offset (¥40B FY26)',
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Q3 FY25 (Oct–Dec 2025)
  // Revenue ¥527.1B | Core OP Margin 26.0% | Core EPS ¥31.9 | XTANDI ¥176.4B
  // ───────────────────────────────────────────────────────────────────────────

  {
    quarter: 'Q3 FY25', metricName: 'Revenue (¥B)', varianceType: 'actual_vs_plan',
    totalVariance: -5.9, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'Japan NHI Pricing Larger-Than-Planned Revision', impact: -4.2, impactUnit: '¥B', explanation: 'Japan NHI Drug Price revision October 2025 (quarterly off-cycle revision for specific products) was larger than the ¥2.0B plan assumption — actual revision -¥4.2B from BETANIS/VESICARE/XTANDI pricing; Q3 Japan revenue below plan on pricing, not volume', confidence: 0.86 },
      { driver: 'XTANDI Below Plan on US Market Dynamics', impact: -3.6, impactUnit: '¥B', explanation: 'XTANDI Q3 FY25 ¥176.4B vs ¥180.0B plan — US volume below plan as IRA price negotiation announcement timing (October 2025) created temporary physician prescribing caution; market dynamics around IRA announcement created ¥3.6B revenue miss vs plan', confidence: 0.84 },
      { driver: 'PADCEV and IZERVAY Above Plan Offset', impact: 1.9, impactUnit: '¥B', explanation: 'PADCEV NMIBC sNDA FDA submission in Q3 FY25 driving above-plan physician interest and prescription pull-through; IZERVAY above plan on continued geographic AMD commercial momentum; combined +¥1.9B above plan, partially offsetting XTANDI and Japan headwinds', confidence: 0.88 },
    ],
    narrative: 'Q3 FY25 revenue of ¥527.1B missed plan by ¥5.9B (-1.1%). The IRA price negotiation announcement for XTANDI in October 2025 created temporary prescribing uncertainty in the US, and Japan NHI pricing revisions were larger than planned. PADCEV and IZERVAY above-plan performance provided partial offset. This is the trough quarter of FY25 — Q4 FY25 is expected to recover as IRA announcement uncertainty resolves and PADCEV NMIBC FDA data creates renewed physician confidence.',
    recommendations: [
      'Communicate explicitly that the XTANDI Q3 revenue miss is timing/psychology driven (IRA announcement uncertainty) rather than a structural market share loss — physician prescribing data should clarify Q3 vs Q4 dynamics',
      'Provide XTANDI IRA scenario analysis: if mandatory price reduction is 5pp, 10pp, or 15pp — each scenario shows what the SMT savings offset provides and what the net Core OP impact would be',
    ],
  },
  {
    quarter: 'Q3 FY25', metricName: 'Revenue (¥B)', varianceType: 'actual_vs_prior_year',
    totalVariance: 47.0, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'Strategic Brands Growth (PADCEV + IZERVAY + VYLOY)', impact: 44.8, impactUnit: '¥B', explanation: 'PADCEV Q3 FY25 ¥37.5B vs ¥27.5B Q3 FY24 (+36.4%); IZERVAY ¥22.8B vs ¥4.2B (+442% from low base); VYLOY ¥8.5B (new launch, zero Q3 FY24); combined Strategic Brands incremental ¥44.8B YoY is the primary revenue growth engine in Q3', confidence: 0.90 },
      { driver: 'XTANDI Below Q3 FY24 Growth Rate', impact: 6.3, impactUnit: '¥B', explanation: 'XTANDI Q3 FY25 ¥176.4B vs ¥170.1B Q3 FY24 (+3.7% YoY) — deceleration from Q1-Q2 pace of ~6% due to IRA announcement timing effect and Japan pricing; growth remains positive but below trend', confidence: 0.88 },
      { driver: 'Legacy Product Decline Continuing', impact: -4.1, impactUnit: '¥B', explanation: 'Legacy products (BETANIS, VESICARE, TARGEDIA) continuing structural decline: -¥4.1B YoY Q3 from generic competition and NHI pricing pressure; expected and managed; approximately matches FY25 full-year legacy decline trajectory', confidence: 0.88 },
    ],
    narrative: 'Q3 FY25 revenue grew +¥47.0B (+9.8%) YoY despite the XTANDI IRA announcement headwind. Strategic Brands carried the Q3 growth story — PADCEV +36%, IZERVAY +442%, and VYLOY first contribution. The revenue growth deceleration from Q2 (+10.9%) to Q3 (+9.8%) is modest and primarily attributable to the IRA-related XTANDI uncertainty; underlying Strategic Brands demand remains strong.',
    recommendations: [
      'Frame Q3 FY25 as the strategic inflection — first quarter where Strategic Brands incremental revenue (¥44.8B) exceeds XTANDI total quarterly revenue growth; the portfolio diversification thesis is now demonstrated by actual results',
    ],
  },

  {
    quarter: 'Q3 FY25', metricName: 'Core OP Margin (%)', varianceType: 'actual_vs_plan',
    totalVariance: -20, totalVarianceUnit: 'bps',
    driverBreakdown: [
      { driver: 'Revenue Miss Flow-Through', impact: -40, impactUnit: 'bps', explanation: '-¥5.9B revenue vs plan on high-margin XTANDI/Japan businesses; contribution margin on missed revenue approximately 70% → ¥4.1B Core OP miss → approximately 78bps of Q3 Core OP margin headwind; net margin impact after semi-variable cost reduction approximately -40bps', confidence: 0.84 },
      { driver: 'SMT Q3 Outperformance', impact: 20, impactUnit: 'bps', explanation: 'Q3 FY25 SMT savings ¥5.3B vs ¥5.1B plan — Japan MR productivity program ahead of schedule; SMT Q3 outperformance partially offsets the revenue miss on Core OP margin; demonstrates SMT program independence from revenue performance', confidence: 0.90 },
    ],
    narrative: 'Q3 FY25 Core OP Margin of 26.0% missed plan by 20bps — a modest miss driven by the XTANDI revenue shortfall. SMT program outperformance in Q3 partially absorbed the revenue mix headwind. The fact that Core OP Margin held at 26.0% despite the revenue miss demonstrates the structural improvement in cost efficiency from the SMT program.',
    recommendations: [
      'Highlight that 26.0% Core OP Margin was held despite ¥5.9B revenue miss — this demonstrates the operating leverage and cost discipline that SMT has delivered; it argues for the durability of the FY26 margin target',
    ],
  },
  {
    quarter: 'Q3 FY25', metricName: 'Core OP Margin (%)', varianceType: 'actual_vs_prior_year',
    totalVariance: 320, totalVarianceUnit: 'bps',
    driverBreakdown: [
      { driver: 'Revenue Growth and Operating Leverage', impact: 160, impactUnit: 'bps', explanation: '+9.8% revenue growth delivering 160bps of operating leverage; incremental revenue flows through at approximately 50% margin vs Q3 FY24 base structure; scale effect of ¥47B revenue growth on fixed operating cost base', confidence: 0.90 },
      { driver: 'SMT Savings YoY Acceleration', impact: 100, impactUnit: 'bps', explanation: 'SMT ¥5.3B Q3 FY25 vs ¥1.2B Q3 FY24 = ¥4.1B incremental; 100bps margin improvement YoY from SMT program ramping from early stages to full-year delivery mode', confidence: 0.88 },
      { driver: 'PADCEV/IZERVAY Above-Average Margin Mix Shift', impact: 60, impactUnit: 'bps', explanation: 'Q3 FY25 revenue mix shifting toward PADCEV and IZERVAY (growing share) which carry above-average core operating margin; mix shift from lower-margin legacy products to higher-margin specialty oncology/ophthalmology products adds 60bps margin YoY', confidence: 0.86 },
    ],
    narrative: 'Q3 FY25 Core OP Margin expanded +320bps YoY — slightly below the Q1 (+350bps) and Q2 (+300bps) pace due to XTANDI IRA announcement uncertainty suppressing the highest-margin product volumes. The fundamental margin expansion thesis remains intact: SMT program, revenue scale, and portfolio mix shift are all contributing. Q3 represents the second-consecutive quarter of 300bps+ margin expansion.',
    recommendations: [
      'Affirm at Q3 FY25 earnings that the full-year FY25 Core OP Margin of 26.0% is on track — three quarters all at 26.0% demonstrate the stability and sustainability of the margin improvement',
    ],
  },

  {
    quarter: 'Q3 FY25', metricName: 'Core EPS (¥/share)', varianceType: 'actual_vs_plan',
    totalVariance: -0.6, totalVarianceUnit: '¥/share',
    driverBreakdown: [
      { driver: 'Revenue Miss and Margin Miss Flow-Through', impact: -1.1, impactUnit: '¥/share', explanation: '-¥5.9B revenue × ~60% Core OP contribution × EPS conversion = approximately -¥1.1/share Core EPS vs plan from Q3 revenue miss; primary driver of the modest EPS miss', confidence: 0.84 },
      { driver: 'SMT Outperformance and Financial Income', impact: 0.5, impactUnit: '¥/share', explanation: 'SMT ¥0.2B outperformance vs plan and BOJ rate 0.5% effective August 2025 generating above-plan financial income; combined +¥0.5/share partially offsetting the revenue miss impact', confidence: 0.86 },
    ],
    narrative: 'Q3 FY25 Core EPS of ¥31.9 missed plan by ¥0.6 (-1.8%) — the only quarterly EPS miss in FY25. The XTANDI IRA announcement timing effect and Japan NHI pricing drove the miss. Q4 FY25 is expected to recover as IRA uncertainty resolves and seasonal year-end dynamics are favorable. The full-year FY25 Core EPS guidance remains achievable given the H1 beat absorbed the Q3 shortfall.',
    recommendations: [
      'Affirm full-year FY25 Core EPS guidance explicitly at Q3 earnings — the Q3 miss of ¥0.6 is within the range of H1 outperformance; management credibility requires confirming guidance is intact despite the Q3 below-plan quarter',
    ],
  },
  {
    quarter: 'Q3 FY25', metricName: 'Core EPS (¥/share)', varianceType: 'actual_vs_prior_year',
    totalVariance: 4.7, totalVarianceUnit: '¥/share',
    driverBreakdown: [
      { driver: 'Core OP Expansion on Revenue Growth', impact: 3.6, impactUnit: '¥/share', explanation: '+320bps Core OP margin expansion on +9.8% revenue growth; combined effect of higher revenue on lower cost base generates ¥3.6/share YoY Core EPS growth; this is the fundamental operating earnings improvement', confidence: 0.90 },
      { driver: 'FX Tailwind vs. Q3 FY24', impact: 0.8, impactUnit: '¥/share', explanation: 'Q3 FY25 USD/JPY ¥150 vs Q3 FY24 ¥148; ¥2 favorable × ¥2.1B/¥1 = ¥4.2B FX tailwind; Core EPS contribution ≈ +¥0.8/share YoY incremental FX benefit', confidence: 0.84 },
      { driver: 'Financial Income Improvement (BOJ rate)', impact: 0.3, impactUnit: '¥/share', explanation: 'BOJ rate 0.5% in Q3 FY25 vs 0.1% Q3 FY24; interest income improvement approximately ¥0.5B quarterly incremental; +¥0.3/share YoY Core EPS contribution from BOJ rate normalization', confidence: 0.82 },
    ],
    narrative: 'Q3 FY25 Core EPS grew ¥4.7 (+17.3%) YoY. The deceleration from Q1/Q2 (+19%) to Q3 (+17%) reflects the XTANDI IRA announcement impact. YoY growth remains extremely strong — ¥4.7 per share in a single quarter. H1+Q3 cumulative YoY Core EPS growth of ¥15.3/share puts FY25 on track for approximately ¥20/share full-year YoY improvement — an extraordinary result.',
    recommendations: [
      'Provide context for the Q3 deceleration relative to Q1/Q2 — investors tracking the +19% trajectory need to understand the XTANDI IRA announcement effect was temporary; Q4 recovery should restore the growth rate trajectory',
    ],
  },

  {
    quarter: 'Q3 FY25', metricName: 'XTANDI Revenue (¥B)', varianceType: 'actual_vs_plan',
    totalVariance: -3.6, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'US IRA Announcement Prescribing Caution', impact: -3.0, impactUnit: '¥B', explanation: 'XTANDI IRA price negotiation announcement in October 2025 — US oncologists and urologists temporarily shifting prescribing decisions as market assessed IRA implications for XTANDI access and pricing; estimated ¥3.0B US volume impact in Q3 from caution period; expected to normalize in Q4', confidence: 0.80 },
      { driver: 'Japan NHI Pricing Larger Than Plan', impact: -0.6, impactUnit: '¥B', explanation: 'Japan quarterly NHI off-cycle price adjustment October 2025 was larger than planned; XTANDI Japan price reduced by 4% vs 2% plan; volume stable but pricing worse than planned; ¥0.6B Japan XTANDI revenue miss vs plan from pricing', confidence: 0.86 },
    ],
    narrative: 'Q3 FY25 XTANDI revenue ¥176.4B missed plan by ¥3.6B (-2.0%). The IRA announcement created temporary US prescribing caution — the first tangible financial evidence of IRA execution risk for XTANDI. Japan NHI pricing also came in worse than planned. Both effects are identifiable and potentially temporary (IRA caution) or managed (Japan pricing). Q4 FY25 XTANDI performance will be a key indicator of whether IRA uncertainty is resolved or structural.',
    recommendations: [
      'Provide Q4 FY25 XTANDI prescription data as early indicator — weekly dispense data will show whether Q3 caution reversed in Q4; this data point will set investor expectations for XTANDI IRA risk management effectiveness',
    ],
  },
  {
    quarter: 'Q3 FY25', metricName: 'XTANDI Revenue (¥B)', varianceType: 'actual_vs_prior_year',
    totalVariance: 6.3, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'Global Volume Growth (US + EMEA net)', impact: 8.5, impactUnit: '¥B', explanation: 'XTANDI US + EMEA combined volume +5.1% YoY despite IRA caution — early-stage indication penetration creating structural volume growth that overcomes individual-quarter headwinds; EMEA growing faster than US offsetting US slowdown', confidence: 0.86 },
      { driver: 'Japan and IRA-Related Headwinds', impact: -2.2, impactUnit: '¥B', explanation: 'Japan pricing revision and IRA-related US caution combined headwind vs Q3 FY24 — Japan -¥1.6B on pricing, US -¥0.6B on temporary prescribing caution; these are identifiable deductions from structural YoY volume growth', confidence: 0.84 },
    ],
    narrative: 'Q3 FY25 XTANDI grew +¥6.3B (+3.7%) YoY — decelerating from Q1/Q2 ~6% pace. The deceleration is attributable to identifiable headwinds (IRA caution + Japan pricing) rather than competitive market share loss. XTANDI global demand remains healthy at +5% underlying volume growth. The IRA-related Q3 miss requires transparent communication about the mechanism and resolution pathway.',
    recommendations: [
      'Distinguish between structural XTANDI demand (healthy +5% volume) and Q3 temporary IRA/pricing headwinds in investor communications — conflating the two creates unwarranted negative narratives about XTANDI franchise health',
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Q4 FY25 (Jan–Mar 2026)
  // Revenue ¥537.2B | Core OP Margin 26.0% | Core EPS ¥32.5 | XTANDI ¥179.0B
  // ───────────────────────────────────────────────────────────────────────────

  {
    quarter: 'Q4 FY25', metricName: 'Revenue (¥B)', varianceType: 'actual_vs_plan',
    totalVariance: 12.2, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'XTANDI US Recovery from IRA Announcement Uncertainty', impact: 5.8, impactUnit: '¥B', explanation: 'XTANDI Q4 FY25 ¥179.0B vs ¥176.0B plan — Q3 IRA announcement caution resolved; US prescribing normalized; EMEA continuing above-plan volume growth; XTANDI Q4 beat ¥3.0B above plan plus ¥5.8B from full recovery of Q3 timing effect', confidence: 0.88 },
      { driver: 'PADCEV NMIBC sNDA FDA Approval Impact', impact: 4.2, impactUnit: '¥B', explanation: 'PADCEV non-muscle invasive bladder cancer (NMIBC) sNDA received FDA Priority Review breakthrough in Q4 FY25 — physician awareness and KOL engagement programs driving additional PADCEV prescriptions ahead of formal approval; ¥4.2B above plan on strong end-of-year commercial execution', confidence: 0.86 },
      { driver: 'VYLOY Japan Year-1 Above-Plan Launch', impact: 2.2, impactUnit: '¥B', explanation: 'VYLOY Japan gastric cancer launch tracking above initial commercial plan — physician adoption faster than modeled in gastric cancer treatment guidelines; VYLOY Q4 FY25 ¥5.8B vs ¥3.6B plan; strong Japan KOL endorsement driving above-plan prescription uptake', confidence: 0.84 },
    ],
    narrative: 'Q4 FY25 revenue of ¥537.2B beat plan by ¥12.2B (+2.3%). XTANDI recovered from Q3 IRA uncertainty, PADCEV NMIBC momentum accelerated ahead of FDA approval, and VYLOY Japan launch performed above plan. Q4 recovery completes FY25 with full-year revenue of ¥2,139.2B — beating the original FY25 guidance and confirming the Strategic Brands growth thesis across all major products.',
    recommendations: [
      'At FY25 full-year earnings: frame the Q4 recovery as confirmation of the thesis — XTANDI IRA uncertainty was temporary; PADCEV NMIBC is approaching its next major catalyst; VYLOY Japan launch is beating plan',
    ],
  },
  {
    quarter: 'Q4 FY25', metricName: 'Revenue (¥B)', varianceType: 'actual_vs_prior_year',
    totalVariance: 82.8, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'Low Base Effect from Q4 FY24 (¥454.4B)', impact: 40.0, impactUnit: '¥B', explanation: 'Q4 FY24 was the lowest revenue quarter in FY24 at ¥454.4B — partial base effect creates favorable YoY comparison; ¥82.8B Q4 YoY growth vs average ¥48B/quarter other quarters partially reflects the low Q4 FY24 base', confidence: 0.88 },
      { driver: 'Strategic Brands Full-Year Scale (PADCEV + IZERVAY + VYLOY)', impact: 38.6, impactUnit: '¥B', explanation: 'Strategic Brands at full commercial scale in Q4 FY25 vs early launch stage Q4 FY24 — PADCEV +¥12.4B YoY, IZERVAY +¥18.8B YoY, VYLOY +¥7.4B YoY (from zero in Q4 FY24); combined +¥38.6B Strategic Brands growth above the base', confidence: 0.90 },
      { driver: 'XTANDI Recovery + EMEA Expansion', impact: 11.2, impactUnit: '¥B', explanation: 'XTANDI Q4 FY25 ¥179.0B vs ¥167.8B Q4 FY24 (+6.7%); IRA uncertainty resolved and EMEA early-stage indication expansion delivering; XTANDI contributing above-trend growth in Q4 on favorable base comparison', confidence: 0.88 },
      { driver: 'Legacy Product Decline (expected)', impact: -7.0, impactUnit: '¥B', explanation: 'Legacy product revenue decline continuing Q4 FY25; BETANIS Japan generic competition, VESICARE global LOE in multiple markets; net legacy decline ¥7.0B YoY Q4; in line with full-year legacy decline expectation', confidence: 0.90 },
    ],
    narrative: 'Q4 FY25 revenue grew +¥82.8B (+18.2%) YoY — the strongest quarterly YoY growth of FY25. The combination of a low Q4 FY24 base and peak FY25 Strategic Brands performance drives the exceptional comparison. Full-year FY25 revenue of ¥2,139.2B grew +11.9% YoY — comfortably above the original guidance and setting a strong base for FY26 guidance of ¥2,220B (+3.8%).',
    recommendations: [
      'At FY25 full-year results: provide context on Q4 +18.2% YoY — the low FY24 base amplifies the comparison; normalize to H1 FY25 +9.9% as the structural annual growth rate for forward modeling guidance',
    ],
  },

  {
    quarter: 'Q4 FY25', metricName: 'Core OP Margin (%)', varianceType: 'actual_vs_plan',
    totalVariance: 50, totalVarianceUnit: 'bps',
    driverBreakdown: [
      { driver: 'Revenue Beat Flow-Through at High Incremental Margin', impact: 70, impactUnit: 'bps', explanation: '¥12.2B revenue beat on high-margin XTANDI/PADCEV recovery volumes; incremental margin approximately 70% on these products; 70bps Core OP margin contribution from above-plan revenue leveraging fixed operating costs', confidence: 0.86 },
      { driver: 'SMT Q4 FY25 Year-End Accelerated Delivery', impact: 30, impactUnit: 'bps', explanation: 'SMT Q4 FY25 ¥5.6B vs ¥5.3B plan; year-end efficiency measures and organizational structure changes accelerating savings delivery; Q4 SMT outperformance adds 30bps Core OP margin vs plan', confidence: 0.88 },
      { driver: 'VYLOY and PADCEV Launch Investment', impact: -50, impactUnit: 'bps', explanation: 'Q4 FY25 PADCEV NMIBC pre-approval commercial investment and VYLOY EU launch preparation costs above plan; ¥2.7B above-plan SG&A for launch readiness activities; -50bps Core OP margin vs plan from front-loaded commercial investment', confidence: 0.84 },
    ],
    narrative: 'Q4 FY25 Core OP Margin of 26.0% beat plan by 50bps. Revenue recovery and SMT outperformance drove the beat, partially offset by intentional front-loaded commercial investment for PADCEV NMIBC and VYLOY EU launches. Full-year FY25 Core OP Margin of 26.0% is the structural baseline — the FY26 target of 27.9% requires 190bps additional expansion from this confirmed base.',
    recommendations: [
      'Use Q4 FY25 beat (+50bps vs plan) to demonstrate that the 26.0% Core OP Margin is a durable floor rather than a ceiling — management can deliver at or above plan consistently',
    ],
  },
  {
    quarter: 'Q4 FY25', metricName: 'Core OP Margin (%)', varianceType: 'actual_vs_prior_year',
    totalVariance: 280, totalVarianceUnit: 'bps',
    driverBreakdown: [
      { driver: 'Revenue Scale Effect on Low FY24 Base', impact: 140, impactUnit: 'bps', explanation: '+18.2% revenue growth on a low Q4 FY24 base delivers extraordinary operating leverage; fixed cost structure unchanged while revenue grew ¥82.8B; 140bps of the margin expansion is base-effect amplified but confirms the power of the operating leverage model', confidence: 0.88 },
      { driver: 'SMT Full-Year Run-Rate ¥21B vs ¥4.9B FY24', impact: 100, impactUnit: 'bps', explanation: 'SMT program scaling from ¥4.9B FY24 to ¥21.0B FY25; the quarterly run-rate improvement from ¥1.2B (Q4 FY24) to ¥5.6B (Q4 FY25) = ¥4.4B incremental/quarter = 100bps Core OP margin YoY improvement from SMT alone', confidence: 0.90 },
      { driver: 'PADCEV/IZERVAY/VYLOY Above-Average Margin Mix', impact: 40, impactUnit: 'bps', explanation: 'Q4 FY25 Strategic Brands represent a materially higher % of total revenue vs Q4 FY24 — mix shift to above-average margin products adds 40bps YoY from portfolio composition improvement', confidence: 0.86 },
    ],
    narrative: 'Q4 FY25 Core OP Margin expanded +280bps YoY from approximately 23.2% (Q4 FY24) to 26.0% (Q4 FY25). All four quarters of FY25 delivered 26.0% Core OP Margin — demonstrating the stability and repeatability of the structural improvement. The full-year FY25 Core OP Margin of 26.0% is a confirmed structural baseline.',
    recommendations: [
      'Deliver at FY25 results: Core OP Margin 26.0% in all 4 quarters = structural, not seasonal; this is the strongest argument for FY26 guidance credibility — 4 consecutive quarters at 26.0% confirming the transformation has been completed',
    ],
  },

  {
    quarter: 'Q4 FY25', metricName: 'Core EPS (¥/share)', varianceType: 'actual_vs_plan',
    totalVariance: 1.5, totalVarianceUnit: '¥/share',
    driverBreakdown: [
      { driver: 'Core OP Above Plan', impact: 1.2, impactUnit: '¥/share', explanation: '50bps Core OP margin beat on ¥537.2B revenue = ¥2.7B above-plan Core OP; at Core EPS conversion ≈ +¥1.2/share; operating performance consistently beating plan across all four quarters of FY25', confidence: 0.88 },
      { driver: 'JV Equity Income and Other Financial Items', impact: 0.3, impactUnit: '¥/share', explanation: 'China JV equity income above plan on early VYLOY approval signal and XTANDI China volumes; XTANDI Pfizer co-promotion milestone payment; net above-plan financial income contributes +¥0.3/share Core EPS vs plan', confidence: 0.82 },
    ],
    narrative: 'Q4 FY25 Core EPS of ¥32.5 beat plan by ¥1.5 (+4.8%). Full-year FY25 Core EPS of ¥130.3 is above guidance, demonstrating consistent operational delivery across all four quarters. The FY26 Core EPS guidance target (approximately ¥145/share implied) represents 11.3% YoY growth from a higher-than-planned FY25 base.',
    recommendations: [
      'Declare FY25 a strategic transformation validation year — all four quarters at or above Core OP plan, above-plan Core EPS in Q1, Q2, Q4, only Q3 below on identifiable temporary factors; provide FY26 guidance range on this basis',
    ],
  },
  {
    quarter: 'Q4 FY25', metricName: 'Core EPS (¥/share)', varianceType: 'actual_vs_prior_year',
    totalVariance: 6.0, totalVarianceUnit: '¥/share',
    driverBreakdown: [
      { driver: 'Revenue Scale and Margin Expansion', impact: 4.8, impactUnit: '¥/share', explanation: '+18.2% revenue growth with +280bps margin expansion on low Q4 FY24 base; combined effect of extraordinary revenue leverage on Q4 low base drives ¥4.8/share Core EPS improvement; Q4 is the highest YoY Core EPS growth quarter of FY25', confidence: 0.90 },
      { driver: 'SMT Full Run-Rate Q4 FY25 vs Q4 FY24', impact: 1.0, impactUnit: '¥/share', explanation: 'SMT ¥5.6B Q4 FY25 vs ¥1.6B Q4 FY24 = ¥4.0B incremental; Core EPS contribution +¥1.0/share from SMT run-rate ramp between year-ago quarter and current year', confidence: 0.88 },
      { driver: 'FX Comparison Base', impact: 0.2, impactUnit: '¥/share', explanation: 'Q4 FY25 USD/JPY ¥149 vs Q4 FY24 ¥151 — slight yen appreciation vs prior year Q4; modest FX headwind (-¥4.2B) partially offset by other income; net +¥0.2/share from favorable JV income vs prior year comparison', confidence: 0.82 },
    ],
    narrative: 'Q4 FY25 Core EPS grew ¥6.0 (+22.6%) YoY — the strongest quarterly YoY growth of FY25. Full-year FY25 Core EPS YoY growth of approximately ¥21/share (+19.3%) confirms Astellas has delivered on its most ambitious earnings expansion guidance in a decade. The FY26 starting point is materially above original FY25 plan, providing an above-expected base for FY26 growth guidance.',
    recommendations: [
      'Frame FY25 full-year Core EPS of ¥130.3 as a milestone achievement — +19.3% YoY growth from ¥109/share FY24 is a historic earnings improvement; communicate that FY26 guidance of ~¥145/share (+11.3%) represents continued — if moderating — earnings growth on a materially higher base',
    ],
  },

  {
    quarter: 'Q4 FY25', metricName: 'XTANDI Revenue (¥B)', varianceType: 'actual_vs_plan',
    totalVariance: 3.0, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'US IRA Uncertainty Resolution Driving Volume Recovery', impact: 3.8, impactUnit: '¥B', explanation: 'XTANDI US prescribing fully recovered from Q3 IRA caution — physician confidence restored as Astellas communicated IRA scenario analysis and continued product support; Q4 US volume above plan on catch-up from Q3 temporary suppression; recovery above plan by ¥3.8B', confidence: 0.88 },
      { driver: 'Japan Q4 Pricing Pressure', impact: -0.8, impactUnit: '¥B', explanation: 'Japan XTANDI year-end pricing headwind from full implementation of October 2025 NHI revision; Q4 Japan below plan by ¥0.8B on pricing (volumes stable); expected annual pricing headwind fully embedded in Q4 run-rate', confidence: 0.86 },
    ],
    narrative: 'Q4 FY25 XTANDI revenue ¥179.0B beat plan by ¥3.0B (+1.7%). The Q3 IRA announcement caution fully resolved in Q4 — US prescribing recovered to above-plan pace, confirming the Q3 miss was temporary. Japan pricing pressure continues as expected. Full-year FY25 XTANDI revenue ~¥714B delivered on guidance. The IRA risk for FY26 remains the primary XTANDI uncertainty — the Q4 recovery does not resolve the multi-year IRA price negotiation risk.',
    recommendations: [
      'Provide FY26 XTANDI guidance range with IRA scenario: (1) base case no IRA negotiation, (2) 5pp mandatory discount, (3) 15pp mandatory discount; investors need this framework to properly risk-adjust XTANDI FY26 revenue modeling',
    ],
  },
  {
    quarter: 'Q4 FY25', metricName: 'XTANDI Revenue (¥B)', varianceType: 'actual_vs_prior_year',
    totalVariance: 11.2, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'Volume Growth on Low Q4 FY24 Base', impact: 13.4, impactUnit: '¥B', explanation: 'Q4 FY24 was lowest XTANDI quarter of FY24 on Japan pricing + seasonal volume patterns; Q4 FY25 XTANDI ¥179.0B vs ¥167.8B Q4 FY24; volume +6.7% YoY — the highest quarterly YoY XTANDI growth of FY25, partly base-effect amplified', confidence: 0.88 },
      { driver: 'Japan Pricing Headwind vs. Q4 FY24', impact: -2.2, impactUnit: '¥B', explanation: 'Japan XTANDI pricing fully -3.5% post-NHI revision compounding on Q4; annual pricing headwind vs Q4 FY24 represents -¥2.2B YoY; structural and expected Japan pricing drag', confidence: 0.86 },
    ],
    narrative: 'Q4 FY25 XTANDI grew +¥11.2B (+6.7%) YoY — recovering to above-trend growth on the low Q4 FY24 comparison base. FY25 full-year XTANDI growth approximately +5% YoY from ¥680B FY24 to ¥714B FY25. The IRA price negotiation process beginning in FY26 will be the defining financial risk for XTANDI in the next 2 years — each 1pp mandatory price cut = -¥9.6B annual Core OP impact.',
    recommendations: [
      'At FY25 results, provide a XTANDI FY25 → FY26 revenue bridge showing the IRA risk range alongside the base demand growth; this bridges FY25 actual into FY26 guidance and prepares investors for the IRA headwind magnitude',
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Q1 FY26 (Apr–Jun 2026) — Forecast/Estimate
  // Revenue ¥558.0B est. | Core OP Margin 27.9% | Core EPS ¥36.5 est. | XTANDI ¥175.0B est.
  // ───────────────────────────────────────────────────────────────────────────

  {
    quarter: 'Q1 FY26', metricName: 'Revenue (¥B)', varianceType: 'actual_vs_plan',
    totalVariance: 8.0, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'Strategic Brands Above Plan (PADCEV NMIBC + VYLOY China)', impact: 14.2, impactUnit: '¥B', explanation: 'PADCEV NMIBC sNDA FDA approval Q1 FY26 driving above-plan prescription volume for bladder cancer; VYLOY China approval Q1 FY26 generating launch revenues above initial plan timeline; combined ¥14.2B above plan from two new product approvals in quarter', confidence: 0.85 },
      { driver: 'XTANDI IRA Price Headwind Below Plan', impact: -6.2, impactUnit: '¥B', explanation: 'XTANDI Q1 FY26 ¥175.0B vs ¥181.2B plan — IRA price negotiation outcome: mandatory 7.5pp price reduction effective January 2026; -¥9.6B per 1pp × 7.5pp = ¥72B annual impact → ¥18B quarterly; partially offset by volume support; net revenue miss ¥6.2B vs plan', confidence: 0.82 },
    ],
    narrative: 'Q1 FY26 revenue of ¥558.0B (estimated) beat plan by ¥8.0B (+1.5%). PADCEV NMIBC approval and VYLOY China launch generated significant above-plan contributions that more than offset the XTANDI IRA price reduction headwind. The net result demonstrates the portfolio diversification thesis: new product approvals can offset established product pricing headwinds. Q1 FY26 is the first quarter where XTANDI IRA is a real revenue headwind — and Astellas beat plan regardless.',
    recommendations: [
      'Frame Q1 FY26 as the inflection quarter: XTANDI IRA pressure first felt in actuals; Strategic Brands (PADCEV NMIBC + VYLOY China) compensating; provide quarterly bridge showing XTANDI drag vs. Strategic Brands offset through FY26',
    ],
  },
  {
    quarter: 'Q1 FY26', metricName: 'Revenue (¥B)', varianceType: 'actual_vs_prior_year',
    totalVariance: 20.1, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'Strategic Brands Growth (PADCEV + IZERVAY + VYLOY + VEOZAH)', impact: 42.8, impactUnit: '¥B', explanation: 'Strategic Brands Q1 FY26 combined ¥145.8B vs ¥103.0B Q1 FY25 (+41.6% YoY); PADCEV NMIBC new indication and volume growth; IZERVAY continued ramp; VYLOY China + Japan contributing; VEOZAH initial US VMS revenues; combined Strategic Brands growth ¥42.8B YoY', confidence: 0.86 },
      { driver: 'XTANDI IRA Revenue Headwind (-7.5pp price)', impact: -22.7, impactUnit: '¥B', explanation: 'XTANDI Q1 FY26 ¥175.0B vs ¥178.4B Q1 FY25 — net -¥3.4B YoY on IRA pricing reduction partially offset by volume growth; full IRA impact ¥18B quarterly vs ¥21B quarterly structural headwind from gross price × volume; underlying volume grew but pricing eroded net revenue', confidence: 0.80 },
    ],
    narrative: 'Q1 FY26 revenue grew +¥20.1B (+3.7%) YoY. The growth rate is lower than FY25 (8-18% range) as XTANDI IRA pricing creates the expected headwind. However, Strategic Brands at +41.6% YoY confirms the growth engine is running — the portfolio is transitioning from XTANDI-dependent to multi-product as planned. The net +3.7% YoY beat is above-consensus given market concerns about XTANDI IRA severity.',
    recommendations: [
      'At Q1 FY26 results: demonstrate that the Strategic Brands growth rate (+41.6%) is sufficient to more than replace XTANDI IRA headwind at current trajectory — provide a ¥/year comparison: XTANDI IRA -¥72B annually vs Strategic Brands +¥170B annual incremental; portfolio math is favorable',
    ],
  },

  {
    quarter: 'Q1 FY26', metricName: 'Core OP Margin (%)', varianceType: 'actual_vs_plan',
    totalVariance: 40, totalVarianceUnit: 'bps',
    driverBreakdown: [
      { driver: 'Revenue Beat Margin Leverage', impact: 55, impactUnit: 'bps', explanation: '¥8.0B above-plan revenue on largely fixed cost base; incremental margin on Strategic Brands above-plan volumes approximately 65%; 55bps Core OP margin improvement from operating leverage on above-plan revenue', confidence: 0.85 },
      { driver: 'SMT Q1 FY26 Ahead of Plan', impact: 15, impactUnit: 'bps', explanation: 'SMT Q1 FY26 ¥9.6B vs ¥9.4B plan — digital detailing and supply chain workstreams delivering ahead of Q1 target; 15bps above-plan Core OP margin contribution from SMT outperformance', confidence: 0.88 },
      { driver: 'XTANDI IRA Below-Plan Volume Adjustment', impact: -30, impactUnit: 'bps', explanation: 'XTANDI IRA price reduction reduces contribution margin vs plan even where volume stays above plan; margin compression on XTANDI revenue flows directly to Core OP margin; -30bps Core OP impact from lower XTANDI revenue per unit vs plan assumption', confidence: 0.80 },
    ],
    narrative: 'Q1 FY26 Core OP Margin of 27.9% (estimated) beat plan by 40bps. The SMT outperformance and Strategic Brands revenue leverage more than offset the XTANDI IRA margin compression. Core OP Margin at 27.9% is +190bps above Q1 FY25 (26.0%) — the expansion trajectory to the FY26 full-year 27.9% target appears on track after Q1.',
    recommendations: [
      'Affirm FY26 Core OP Margin guidance at 27.9% at Q1 FY26 earnings — the first quarter at 27.9% actual confirms the target is achievable; provide SMT savings update (¥9.6B Q1 = ¥38.4B annualized, on track for ¥40B full-year)',
    ],
  },
  {
    quarter: 'Q1 FY26', metricName: 'Core OP Margin (%)', varianceType: 'actual_vs_prior_year',
    totalVariance: 190, totalVarianceUnit: 'bps',
    driverBreakdown: [
      { driver: 'SMT Program Year-2 vs. Year-1 Acceleration', impact: 110, impactUnit: 'bps', explanation: 'SMT Q1 FY26 ¥9.6B vs ¥5.1B Q1 FY25 = ¥4.5B incremental; on ¥558B revenue base = 110bps incremental Core OP margin expansion from SMT YoY acceleration; this is the primary driver of FY26 margin expansion over FY25 structural level', confidence: 0.90 },
      { driver: 'Revenue Mix Toward Strategic Brands', impact: 60, impactUnit: 'bps', explanation: 'Strategic Brands rising from ~19% of Q1 FY25 revenue to ~26% of Q1 FY26 revenue — mix shift to PADCEV, IZERVAY, VYLOY which carry above-average operating margins as volumes scale; 60bps YoY from portfolio mix improvement', confidence: 0.86 },
      { driver: 'XTANDI IRA Margin Compression', impact: -40, impactUnit: 'bps', explanation: 'XTANDI gross margin compressed by IRA mandatory price reduction; lower revenue per script on XTANDI flows through to Core OP at high drop-down rate; -40bps YoY Core OP margin headwind from XTANDI IRA pricing vs Q1 FY25 pre-IRA margin', confidence: 0.82 },
      { driver: 'Revenue Operating Leverage (+3.7% YoY)', impact: 60, impactUnit: 'bps', explanation: '+3.7% revenue growth with SMT-driven fixed cost efficiency = 60bps of operating leverage; lower growth rate than FY25 means less leverage, but SMT savings amplify the core leverage effect', confidence: 0.86 },
    ],
    narrative: 'Q1 FY26 Core OP Margin expanded +190bps YoY from 26.0% (Q1 FY25) to 27.9% (Q1 FY26 estimated). The SMT program step-up and Strategic Brands mix shift are the primary structural drivers. XTANDI IRA creates a 40bps headwind — the first visible quantified Core OP impact of the IRA risk. Net +190bps confirms the FY26 full-year 27.9% target is achievable and provides foundation for continued margin expansion toward the 30% medium-term target.',
    recommendations: [
      'Frame Q1 FY26 +190bps YoY margin expansion as continued structural delivery — not a one-quarter phenomenon; the SMT program ¥40B FY26 target and Strategic Brands mix shift will sustain above-FY25 margins throughout FY26',
    ],
  },

  {
    quarter: 'Q1 FY26', metricName: 'Core EPS (¥/share)', varianceType: 'actual_vs_plan',
    totalVariance: 1.5, totalVarianceUnit: '¥/share',
    driverBreakdown: [
      { driver: 'Core OP Above Plan', impact: 1.3, impactUnit: '¥/share', explanation: '40bps Core OP margin beat on ¥558B revenue = ¥2.2B above-plan Core OP; at Core EPS conversion ≈ +¥1.3/share', confidence: 0.86 },
      { driver: 'China JV Equity Income Above Plan', impact: 0.2, impactUnit: '¥/share', explanation: 'VYLOY China launch driving above-plan China JV equity income; ¥0.5B above plan in Q1 FY26 = +¥0.2/share Core EPS contribution; new China revenue stream from VYLOY approval exceeding plan in first quarter', confidence: 0.82 },
    ],
    narrative: 'Q1 FY26 Core EPS ¥36.5 (estimated) beat plan by ¥1.5 (+4.3%). Consistent pattern: operating outperformance and new revenue streams (China JV) above plan. XTANDI IRA headwind is real but manageable within the portfolio. Core EPS at ¥36.5 represents +¥3.7 (+11.3%) YoY — the start of the FY26 EPS growth trajectory.',
    recommendations: [
      'Provide Q1 FY26 Core EPS bridge explicitly: XTANDI IRA -¥X (headwind), SMT savings +¥Y, Strategic Brands +¥Z, FX ±¥W; investors need this framework to track the XTANDI headwind offset quarterly through FY26',
    ],
  },
  {
    quarter: 'Q1 FY26', metricName: 'Core EPS (¥/share)', varianceType: 'actual_vs_prior_year',
    totalVariance: 3.7, totalVarianceUnit: '¥/share',
    driverBreakdown: [
      { driver: 'Core OP Expansion and Revenue Growth', impact: 4.0, impactUnit: '¥/share', explanation: '+190bps Core OP margin expansion on +3.7% revenue growth generates ¥4.0/share YoY Core EPS improvement; margin expansion more powerful than revenue growth as driver of EPS growth in FY26', confidence: 0.88 },
      { driver: 'XTANDI IRA EPS Headwind', impact: -0.5, impactUnit: '¥/share', explanation: 'XTANDI IRA mandatory price reduction reduces XTANDI contribution margin YoY — approximately -¥0.5/share Core EPS headwind from XTANDI IRA pricing vs Q1 FY25 pre-IRA earnings; first visible Core EPS impact from IRA risk', confidence: 0.80 },
      { driver: 'FX Headwind vs. Q1 FY25 (yen appreciation)', impact: -0.4, impactUnit: '¥/share', explanation: 'Q1 FY26 USD/JPY ~¥145 vs Q1 FY25 ~¥150; ¥5 yen appreciation × ¥2.1B/¥1 = ¥10.5B FX headwind vs prior year; Core EPS impact ≈ -¥0.4/share YoY FX comparison headwind; BOJ rate normalization creating yen strength headwind', confidence: 0.84 },
      { driver: 'China JV and BOJ Financial Income', impact: 0.6, impactUnit: '¥/share', explanation: 'VYLOY China JV equity income new stream; BOJ rate 0.75% (est Q1 FY26) vs 0.1% Q1 FY25 = incremental ¥2.2B annual financial income; combined +¥0.6/share YoY from new financial income streams', confidence: 0.82 },
    ],
    narrative: 'Q1 FY26 Core EPS grew +¥3.7 (+11.3%) YoY — a healthy deceleration from FY25\'s 19%+ pace, reflecting XTANDI IRA headwinds and yen appreciation. The underlying business (Strategic Brands growth + SMT savings) remains on track for FY26 targets. The new headwinds (XTANDI IRA, FX) are partially offset by new income streams (China JV, higher financial income on BOJ rate). FY26 Core EPS guidance of approximately ¥145 (+11.3% from ¥130.3 FY25) is tracking to plan after Q1.',
    recommendations: [
      'At Q1 FY26 earnings: provide a full FY26 Core EPS bridge showing XTANDI IRA drag (-¥X), SMT savings acceleration (+¥Y), Strategic Brands growth (+¥Z), FX headwind (-¥W), and new income streams (+¥V); sum to FY26 Core EPS guidance ¥145 — investors need this framework to track execution quarterly',
    ],
  },

  {
    quarter: 'Q1 FY26', metricName: 'XTANDI Revenue (¥B)', varianceType: 'actual_vs_plan',
    totalVariance: -6.2, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'IRA Mandatory Price Reduction Larger Than Plan', impact: -5.2, impactUnit: '¥B', explanation: 'IRA negotiated price: 7.5pp mandatory reduction effective January 2026 vs. plan assumption of 5pp reduction; additional 2.5pp × ¥9.6B/pp = ¥24B annual incremental → ¥6B quarterly; Q1 FY26 XTANDI ¥6.2B below plan driven by IRA pricing outcome vs plan assumptions', confidence: 0.78 },
      { driver: 'US Volume Recovery Above Expectations', impact: -1.0, impactUnit: '¥B', explanation: 'US XTANDI volume growing slightly above expectations (+2% vs. plan); mitigates the IRA price impact partially; net volume contribution -¥1.0B due to the mandatory price reduction rate being higher per unit; IRA volume protection better than feared', confidence: 0.82 },
    ],
    narrative: 'Q1 FY26 XTANDI revenue ¥175.0B (estimated) missed plan by ¥6.2B (-3.4%). The IRA mandatory price reduction of 7.5pp exceeded the 5pp plan assumption — a negative outcome vs management guidance. Volume held reasonably well on continued prostate cancer indication penetration. The IRA pricing outcome is now quantified: -¥9.6B per 1pp × 7.5pp = -¥72B annual impact, or approximately -¥18B quarterly vs pre-IRA baseline.',
    recommendations: [
      'Provide a revised XTANDI FY26 guidance range incorporating the confirmed 7.5pp IRA price reduction; investors need the revised ¥/quarter estimate to calibrate XTANDI FY26 modeling; also provide FY27 IRA trajectory if additional price pressure is expected from MFP escalator',
    ],
  },
  {
    quarter: 'Q1 FY26', metricName: 'XTANDI Revenue (¥B)', varianceType: 'actual_vs_prior_year',
    totalVariance: -3.4, totalVarianceUnit: '¥B',
    driverBreakdown: [
      { driver: 'IRA Mandatory Price Reduction vs Q1 FY25 Pre-IRA Price', impact: -18.0, impactUnit: '¥B', explanation: 'Q1 FY26 reflects 7.5pp mandatory price reduction vs Q1 FY25 pre-IRA price; ¥9.6B/pp × 7.5pp = ¥72B annual = ¥18B quarterly impact on XTANDI revenue in absolute terms; this is the IRA headwind quantified for the first time in actual results', confidence: 0.80 },
      { driver: 'Volume Growth Offsetting IRA Pricing', impact: 14.6, impactUnit: '¥B', explanation: 'Underlying XTANDI volume +6.2% YoY on continued prostate cancer indication expansion (nmHSPC, mHSPC, mCRPC globally); EMEA and China contributing volume growth; 6.2% volume growth on ¥178.4B Q1 FY25 base = +¥11.1B volume; additional EMEA/China timing = ¥14.6B gross volume contribution', confidence: 0.82 },
    ],
    narrative: 'Q1 FY26 XTANDI revenue declined -¥3.4B (-1.9%) YoY — the first quarterly YoY decline in XTANDI history. Volume growth (+6.2%) is healthy but insufficient to offset the 7.5pp IRA mandatory price reduction (-¥18B quarterly). This marks the beginning of the XTANDI IRA headwind era. The volume growth confirms the franchise is not losing market share; the revenue decline is purely pricing policy. Over time, IRA price will stabilize while volume continues to grow — the net XTANDI trajectory will improve once the price reduction is fully lapped.',
    recommendations: [
      'At Q1 FY26 earnings: explain the YoY XTANDI decline forensically — volume +6.2% (positive), price -7.5pp mandatory (external policy); investors need to distinguish demand from pricing in the XTANDI revenue model; the franchise health metric is volume share, not net revenue',
    ],
  },
];

export async function seedVarianceExplanations(
  prisma: PrismaClient,
  companyId: number,
  periodMap: Record<string, { id: number }>,
) {
  const availableQuarters = QUARTER_LABELS.filter((q) => periodMap[q]);

  if (availableQuarters.length === 0) {
    console.log('  No matching quarters in periodMap for variance explanations — skipping');
    return;
  }

  const rows = records
    .filter((r) => availableQuarters.includes(r.quarter))
    .map((r) => ({
      companyId,
      periodId: periodMap[r.quarter].id,
      metricName: r.metricName,
      varianceType: r.varianceType,
      totalVariance: r.totalVariance,
      totalVarianceUnit: r.totalVarianceUnit,
      driverBreakdown: r.driverBreakdown as unknown as any,
      narrative: r.narrative,
      recommendations: r.recommendations as unknown as any,
    }));

  await prisma.varianceExplanation.createMany({ data: rows });

  console.log(
    `  Seeded ${rows.length} Astellas Pharma variance explanations ` +
    `(${availableQuarters.length} quarters × 4 metrics × 2 types)`,
  );
}
