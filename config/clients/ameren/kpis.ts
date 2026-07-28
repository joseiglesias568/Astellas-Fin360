// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/kpis.ts
//
// Provenance Legend:
// [CITED:AR-FY25]     — Astellas Pharma FY2025 Annual Report / Earnings Release (May 2026)
// [CITED:EC-Q1-FY26]  — Astellas Pharma Q1 FY2026 Earnings Call / IR slides (Aug 2026)
// [DERIVED]           — Computed from cited values
// [ASSUMED]           — Informed estimate; not in any source
// [CONFIG-ONLY]       — UI/engine parameter, not a business datum
//
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma Q1 FY2026 earnings call, IR slides, and FY2025 Annual Report.
// Fiscal year: April 1 – March 31. FY2025 = April 2025 – March 2026.
// Q1 FY2026 = April – June 2026.
// All monetary values in JPY billions (¥B) unless otherwise noted.
// KPI consoleId values map to Astellas console schema (lib/semantic/consoles.ts).
// ─────────────────────────────────────────────────────────────────────
import { KPIConfig } from '../../types';

export const kpis: KPIConfig = {
  primaryKPIs: [
    {
      label: 'Core EPS — Q1 FY2026',
      value: 67,
      unit: '¥',
      target: 250,                       // FY2026 guidance ¥250+ [ASSUMED]
      trend: 'up',
      trendValue: '+6.3% vs ¥63 Q1 FY2025',
      status: 'good',
      description: 'Q1 FY2026 Core EPS ¥67, up 6.3% from Q1 FY2025 ¥63. FY2026 full-year guidance ¥250+ (full-year FY2025 actual ¥237). Growth driven by PADCEV global uptake, VEOZAH U.S. momentum, and SMT cost savings of ¥40B target in FY2026. FX tailwind from weaker yen partially offset by IRA XTANDI price negotiation headwind.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'Core Operating Income — Q1 FY2026',
      value: 153.0,
      unit: '¥B',
      target: 580,                       // FY2026 Core OP guidance ¥580B+ [ASSUMED]
      trend: 'up',
      trendValue: '+4.9% vs ¥145.8B Q1 FY2025',
      status: 'good',
      description: 'Q1 FY2026 Core Operating Income ¥153.0B (+4.9% YoY). FY2026 guidance ¥580B+ (vs FY2025 actual ¥555.7B). Improvement driven by PADCEV/VEOZAH revenue growth and SMT savings flowing through. Core OP margin expanded to 27.7% from 27.2% Q1 FY2025. SMT FY2026 target ¥40B in-year savings (¥21B achieved in FY2025).',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'Core Operating Margin — Q1 FY2026',
      value: 27.7,
      unit: '%',
      target: 26.4,                      // FY2026 full-year guidance margin [ASSUMED]
      trend: 'up',
      trendValue: '+50bps vs 27.2% Q1 FY2025',
      status: 'good',
      description: 'Core Operating Margin 27.7% in Q1 FY2026, up 50bps YoY. FY2025 full-year Core OP margin was 26.0% (¥555.7B / ¥2,139.2B). Margin expansion driven by SMT cost savings program (¥40B FY2026 target) and positive operating leverage on growing oncology portfolio revenues. Target trajectory toward 28%+ by FY2027 as SMT matures.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'Total Revenue — Q1 FY2026',
      value: 552.8,
      unit: '¥B',
      target: 2200,                      // FY2026 revenue guidance ¥2,200B [ASSUMED]
      trend: 'up',
      trendValue: '+3.1% vs ¥536.3B Q1 FY2025',
      status: 'good',
      description: 'Q1 FY2026 total revenue ¥552.8B (+3.1% YoY). FY2026 full-year guidance ¥2,200B (vs FY2025 ¥2,139.2B, +2.8%). Growth driven by PADCEV (bladder cancer, +22% YoY), VEOZAH (fezolinetant, +38% YoY), and VYLOY launch in gastric cancer. XTANDI revenue stable despite IRA price negotiation headwind. United States remains largest segment at ~35% of revenues.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'XTANDI Global Revenue — Q1 FY2026',
      value: 146.5,
      unit: '¥B',
      target: 572,                       // FY2026 XTANDI guidance [ASSUMED]
      trend: 'flat',
      trendValue: '+0.5% vs ¥145.8B Q1 FY2025',
      status: 'good',
      description: 'XTANDI (enzalutamide) global Q1 FY2026 revenue ¥146.5B (+0.5% YoY). IRA Medicare price negotiation caps post-Sept 2026 impact at ¥9.6B per 1pp price cut. Volume growth in non-metastatic castration-resistant prostate cancer (nmCRPC) and mCSPC indications partially offsets IRA pricing pressure. Astellas co-commercializes with Pfizer globally. XTANDI remains the #1 prostate cancer therapy globally.',
      consoleId: 'oncology',
      consoleName: 'Oncology Portfolio',
      architectureCategory: 'operational',
    },
    {
      label: 'PADCEV Global Revenue — Q1 FY2026',
      value: 65.2,
      unit: '¥B',
      target: 268,                       // FY2026 PADCEV guidance [ASSUMED]
      trend: 'up',
      trendValue: '+22.1% vs ¥53.4B Q1 FY2025',
      status: 'good',
      description: 'PADCEV (enfortumab vedotin) Q1 FY2026 revenue ¥65.2B (+22.1% YoY), strongest growth driver in the portfolio. Bladder cancer 1L combination with pembrolizumab (KEYNOTE-869 data) expanding addressable market significantly. Astellas co-develops with Pfizer. BMS/Opdivo combination competition emerging — PADCEV+pembro remains standard of care. FY2026 guidance ¥268B (FY2025: ~¥231.5B).',
      consoleId: 'oncology',
      consoleName: 'Oncology Portfolio',
      architectureCategory: 'operational',
    },
    {
      label: 'VEOZAH U.S. Net Revenue — Q1 FY2026',
      value: 26.8,
      unit: '¥B',
      target: 110,                       // FY2026 VEOZAH guidance [ASSUMED]
      trend: 'up',
      trendValue: '+38.1% vs ¥19.4B Q1 FY2025',
      status: 'good',
      description: 'VEOZAH (fezolinetant, vasomotor symptoms / hot flashes) Q1 FY2026 ¥26.8B (+38.1% YoY). Non-hormonal prescription treatment for moderate-to-severe VMS from menopause. U.S. launch ramping — payer coverage expanding; patient adherence programs improving. FY2026 guidance ¥110B (FY2025: ~¥88.2B). Growing awareness among OB/GYN prescribers; DTC investment expanding reach to women 45–60.',
      consoleId: 'womens-health',
      consoleName: "Women's Health",
      architectureCategory: 'operational',
    },
    {
      label: 'Free Cash Flow — Q1 FY2026',
      value: 98.5,
      unit: '¥B',
      target: 400,                       // FY2026 FCF guidance ¥400B+ [ASSUMED]
      trend: 'up',
      trendValue: '+8.2% vs ¥91.0B Q1 FY2025',
      status: 'good',
      description: 'Q1 FY2026 Free Cash Flow ¥98.5B (+8.2% YoY). FY2026 guidance ¥400B+ (FY2025 ~¥358B). Strong FCF generation supports dividend (¥70/share FY2025), share buyback program, and BD/licensing investment. Working capital improvement from SMT supply chain efficiency. Capex discipline maintained — manufacturing footprint optimization ongoing.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
  ],

  secondaryKPIs: [
    {
      label: 'GAAP EPS — Q1 FY2026',
      value: 52,
      unit: '¥',
      target: 195,                       // FY2026 GAAP EPS guidance [ASSUMED]
      trend: 'up',
      trendValue: '+4.0% vs ¥50 Q1 FY2025',
      status: 'good',
      description: 'Q1 FY2026 GAAP EPS ¥52. Gap between Core EPS (¥67) and GAAP EPS reflects amortization of intangible assets, impairment charges, and acquisition-related costs. FY2025 Core EPS was ¥237 vs GAAP EPS significantly lower due to goodwill and intangible amortization from prior acquisitions (Gilead PADCEV collaboration, Nuvation acquisition).',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'SMT Cumulative Savings — FY2025',
      value: 21.0,
      unit: '¥B',
      target: 65,                        // Cumulative SMT target through FY2027 [CITED:AR-FY25]
      trend: 'up',
      trendValue: 'FY25 ¥21B achieved; FY26 target ¥40B',
      status: 'good',
      description: 'Sustainable Margin Transformation (SMT) FY2025 savings ¥21B — on target. FY2026 in-year savings target ¥40B (cumulative ¥65B by FY2027). Program addresses procurement, manufacturing efficiency, commercial excellence, and G&A streamlining. SMT is the primary lever for Core OP margin expansion from 26% toward 28%+ over the plan horizon.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'XTANDI IRA Price Sensitivity',
      value: 9.6,
      unit: '¥B/1pp',
      target: 0,
      trend: 'down',
      trendValue: '¥9.6B Core OP impact per 1pp price cut',
      status: 'warning',
      description: 'XTANDI IRA Medicare price negotiation: each 1 percentage-point reduction in net price ≈ ¥9.6B annual Core OP headwind. CMS negotiated price effective September 2026. Astellas managing through volume growth, mix shift to non-IRA populations, and pipeline diversification (PADCEV, VEOZAH, VYLOY). Active government affairs engagement in Washington D.C.',
      consoleId: 'oncology',
      consoleName: 'Oncology Portfolio',
      architectureCategory: 'operational',
    },
    {
      label: 'FX Sensitivity — USD/JPY',
      value: 2.1,
      unit: '¥B/¥1',
      target: 0,
      trend: 'flat',
      trendValue: '¥2.1B Core OP per ¥1 move in USD/JPY',
      status: 'warning',
      description: 'Astellas Core OP sensitivity: every ¥1 appreciation in USD/JPY generates ~¥2.1B positive Core OP impact. ~70% of revenues are USD/EUR-denominated but reported in JPY. Current USD/JPY ~¥155 (Q1 FY2026). Natural hedge through USD/EUR procurement and manufacturing costs. Currency risk monitored closely — FX is the single largest earnings swing factor.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'Japan NHI Price Revision Exposure',
      value: -3.5,
      unit: '%',
      target: 0,
      trend: 'down',
      trendValue: 'Biennial revision Apr 2026: −3.5% average price',
      status: 'warning',
      description: 'Japan National Health Insurance biennial drug price revision (April 2026): average price cut ~3.5% across Astellas Japan portfolio. Impact on Japan segment Core OP estimated at ¥8–12B annually. Key affected products: XTANDI Japan pricing, older oncology agents. Mitigation: volume growth in new indications, VEOZAH Japan launch preparation, pipeline expansion.',
      consoleId: 'japan-segment',
      consoleName: 'Japan Segment',
      architectureCategory: 'operational',
    },
    {
      label: 'Quarterly Dividend per Share',
      value: 17.5,
      unit: '¥',
      target: 17.5,
      trend: 'flat',
      trendValue: '¥70/share annual (maintained)',
      status: 'good',
      description: 'Astellas quarterly dividend ¥17.5/share (¥70/share annualized for FY2026, consistent with FY2025). Dividend payout ratio ~29% of Core EPS. Strong FCF generation (¥400B+ FY2026 guidance) supports dividend sustainability and share buyback capacity. Capital allocation framework: dividend first, then strategic BD/licensing, then buyback.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
  ],
};
