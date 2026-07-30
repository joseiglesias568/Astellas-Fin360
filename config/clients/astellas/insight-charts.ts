// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/insight-charts.ts
//
// Provenance Legend: [CITED:AR-FY25] [CITED:EC-Q1-FY26] [CITED:MR-FY26]
// [DERIVED] = math from cited  [INTERPOLATED] = extrapolated  [ASSUMED] = estimate
// ─────────────────────────────────────────────────────────────────────
import { InsightChartsConfig } from '../../types';

export const insightCharts: InsightChartsConfig = {
  charts: [
    // 1. Regional Revenue Contribution — FY2025
    {
      id: 1,
      title: 'Regional Revenue Contribution',
      subtitle: 'FY2025 — Total Revenue by Geography (¥B)',
      chartType: 'horizontalBar',
      data: [
        { name: 'United States', share: 55.2 },         // ~¥1,180B / ¥2,137B total [DERIVED]
        { name: 'Established Markets', share: 18.3 },   // ~¥391B / ¥2,137B [DERIVED]
        { name: 'Japan', share: 13.6 },                 // ~¥291B / ¥2,137B [DERIVED]
        { name: 'International Markets', share: 8.5 },  // ~¥182B / ¥2,137B [DERIVED]
        { name: 'China', share: 4.4 },                  // ~¥93B / ¥2,137B [DERIVED]
      ],
      trendData: [
        { q: "Q1'FY25", us: 275.0, em: 93.0, jp: 71.0, im: 44.0, cn: 22.0 }, // [INTERPOLATED]
        { q: "Q2'FY25", us: 288.0, em: 96.0, jp: 73.0, im: 45.0, cn: 23.0 }, // [INTERPOLATED]
        { q: "Q3'FY25", us: 302.0, em: 99.0, jp: 74.0, im: 46.0, cn: 24.0 }, // [INTERPOLATED]
        { q: "Q4'FY25", us: 315.0, em: 103.0, jp: 73.0, im: 47.0, cn: 24.0 }, // [INTERPOLATED]
        { q: "Q1'FY26", us: 325.0, em: 100.0, jp: 74.0, im: 47.0, cn: 23.0 }, // [ASSUMED]
      ],
    },

    // 2. Core OP Margin Trend
    {
      id: 2,
      title: 'Core Operating Profit Margin Trend',
      subtitle: '% — Astellas Consolidated | FY2026 Guidance: ~27.9%',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 24.8, target: 26.0 },  // [INTERPOLATED]
        { q: 'Q2 FY2025', comp: 25.9, target: 26.0 },  // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 26.4, target: 26.0 },  // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 26.9, target: 26.0 },  // [INTERPOLATED]
        { q: 'Q1 FY2026', comp: 25.5, target: 27.9 },  // [ASSUMED]
        { q: 'FY2026G',   comp: 27.9, target: 27.9 },  // FY2026 guidance [CITED:MR-FY26]
      ],
      breakdowns: {
        ticket: '26.0% FY2025 Core OP Margin',
        traffic: '+0.7pp YoY improvement in FY2025',
        revenue: 'FY2026 target: ~27.9% (Core OP ¥620B / Revenue ¥2,220B)',
        margin: 'SMT ¥40B savings driving margin expansion',
      },
    },

    // 3. Total Revenue Growth — Quarterly
    {
      id: 3,
      title: 'Total Revenue by Quarter',
      subtitle: '¥B — Astellas Consolidated',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 505.0, target: 495.0 }, // [INTERPOLATED]
        { q: 'Q2 FY2025', comp: 519.0, target: 510.0 }, // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 545.0, target: 535.0 }, // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 568.0, target: 558.0 }, // [INTERPOLATED]
        { q: 'Q1 FY2026', comp: 542.0, target: 555.0 }, // [ASSUMED]
      ],
      breakdowns: {
        ticket: '¥542B Q1 FY2026',
        traffic: '+7.3% YoY',
        revenue: 'FY2026 guidance: ¥2,220B',
        margin: 'XTANDI + Strategic Brands driving growth; FX at ¥151/USD',
      },
    },

    // 4. Core EPS — Quarterly vs Guidance
    {
      id: 4,
      title: 'Core EPS vs Guidance Range',
      subtitle: '¥ per share — quarterly actual and annualized run-rate',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 54.3, target: 52.0 },  // [INTERPOLATED]
        { q: 'Q2 FY2025', comp: 57.8, target: 55.0 },  // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 62.4, target: 60.0 },  // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 62.5, target: 60.0 },  // [INTERPOLATED]
        { q: 'Q1 FY2026', comp: 60.2, target: 62.0 },  // IRA impact reflected [ASSUMED]
      ],
      breakdowns: {
        ticket: '¥237.01 FY2025 Core EPS',
        traffic: '+12.8% YoY FY2025',
        revenue: 'FY2026 target: ~¥265 (implied by guidance)',
        margin: 'SMT + Strategic Brands growth driving EPS expansion vs IRA headwind',
      },
    },

    // 5. XTANDI Revenue Trend — Quarterly
    {
      id: 5,
      title: 'XTANDI Revenue Trend',
      subtitle: '¥B — Prostate Cancer Franchise Quarterly Revenue',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 218.5, target: 210.0 }, // [INTERPOLATED]
        { q: 'Q2 FY2025', comp: 235.0, target: 228.0 }, // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 248.0, target: 240.0 }, // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 259.3, target: 252.0 }, // [INTERPOLATED]
        { q: 'Q1 FY2026', comp: 230.0, target: 240.0 }, // IRA price impact [ASSUMED]
      ],
      breakdowns: {
        ticket: '¥960.8B FY2025 XTANDI Revenue',
        traffic: '+8.2% FY2025 YoY growth',
        revenue: 'IRA negotiated price effective Jan 2026: primary risk lever',
        margin: 'US prostate cancer franchise: ~45% of total Astellas revenue',
      },
    },

    // 6. Strategic Brands Combined Revenue — Quarterly
    {
      id: 6,
      title: 'Strategic Brands Combined Revenue',
      subtitle: '¥B — PADCEV + IZERVAY + VYLOY + VEOZAH + XOSPATA',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 83.0,  target: 80.0 },  // [INTERPOLATED]
        { q: 'Q2 FY2025', comp: 105.0, target: 100.0 }, // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 135.0, target: 128.0 }, // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 157.3, target: 150.0 }, // [INTERPOLATED]
        { q: 'Q1 FY2026', comp: 130.0, target: 138.0 }, // [ASSUMED]
      ],
      breakdowns: {
        ticket: '¥480.3B FY2025 Strategic Brands (+43% YoY)',
        traffic: '+43% YoY growth in FY2025',
        revenue: 'PADCEV ¥221.2B | IZERVAY ¥77.6B | XOSPATA ¥71.8B | VYLOY ¥63.1B | VEOZAH ¥46.6B',
        margin: 'Growing share of total portfolio; key offset to XTANDI IRA risk',
      },
    },

    // 7. IRA XTANDI MFP Risk — Quarterly Revenue Headwind
    {
      id: 7,
      title: 'IRA XTANDI MFP — Estimated Revenue Headwind',
      subtitle: '¥B — Quarterly revenue impact vs. pre-IRA baseline',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2026', comp: -19.5, target: 0 }, // [ASSUMED] IRA price effective Jan 2026
        { q: 'Q2 FY2026', comp: -23.0, target: 0 }, // [ASSUMED]
        { q: 'Q3 FY2026', comp: -24.5, target: 0 }, // [ASSUMED]
        { q: 'Q4 FY2026', comp: -24.0, target: 0 }, // [ASSUMED]
        { q: 'Q1 FY2027', comp: -26.0, target: 0 }, // [ASSUMED] full year effect
      ],
      breakdowns: {
        ticket: '-¥91B estimated FY2026 XTANDI headwind',
        revenue: 'IRA Minimum Fair Price effective Jan 1, 2026',
        traffic: '~9.5% ASP reduction on US XTANDI revenue',
        margin: 'PADCEV/VEOZAH growth partially offsets; Core EPS guidance absorbs ~¥30/share',
      },
    },

    // 8. FX Sensitivity — USD/JPY Rate vs Planning Rate
    {
      id: 8,
      title: 'USD/JPY Exchange Rate vs Planning Baseline',
      subtitle: '¥ per $1 USD — actual vs. ¥151 planning assumption',
      chartType: 'composedBar',
      data: [
        { q: "Q1'FY25", comp: 148.5, target: 151 }, // [INTERPOLATED]
        { q: "Q2'FY25", comp: 152.3, target: 151 }, // [INTERPOLATED]
        { q: "Q3'FY25", comp: 153.8, target: 151 }, // [INTERPOLATED]
        { q: "Q4'FY25", comp: 150.1, target: 151 }, // [INTERPOLATED]
        { q: "Q1'FY26", comp: 149.4, target: 151 }, // [ASSUMED]
      ],
      breakdowns: {
        ticket: '¥151/USD FY2026 planning rate',
        revenue: '¥2.1B Core OP impact per ¥1 USD/JPY move',
        traffic: '¥3.0B Revenue sensitivity per ¥1 move',
        margin: 'Current rate below planning assumption — slight Core OP headwind',
      },
    },

    // 9. VEOZAH US Net Sales — Launch Ramp
    {
      id: 9,
      title: 'VEOZAH Net Sales Ramp',
      subtitle: '¥B — US Launch Trajectory (VMS Indication)',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 10.2, target: 8.0 },  // [INTERPOLATED]
        { q: 'Q2 FY2025', comp: 11.5, target: 11.0 }, // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 12.8, target: 13.0 }, // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 12.1, target: 13.5 }, // [INTERPOLATED]
        { q: 'Q1 FY2026', comp: 14.2, target: 15.0 }, // [ASSUMED]
      ],
      breakdowns: {
        ticket: '¥46.6B FY2025 VEOZAH Revenue',
        revenue: 'FY2026 target: ¥70B+ (ramping US uptake)',
        traffic: '+52% YoY FY2025 growth',
        margin: 'Women\'s health indication; non-hormonal VMS treatment gaining market share',
      },
    },

    // 11. VYLOY Japan NHI Sales — Gastric Cancer Pipeline
    {
      id: 11,
      title: 'VYLOY Net Sales Growth',
      subtitle: '¥B — Japan NHI Listed; Expanding Gastric Cancer Indications',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 8.5,  target: 6.0 },  // [INTERPOLATED] — NHI listing early FY2025
        { q: 'Q2 FY2025', comp: 14.0, target: 12.0 }, // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 18.2, target: 17.0 }, // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 22.4, target: 20.0 }, // [INTERPOLATED]
        { q: 'Q1 FY2026', comp: 25.0, target: 27.0 }, // [ASSUMED]
      ],
      breakdowns: {
        ticket: '¥63.1B FY2025 VYLOY Revenue',
        revenue: 'FY2026 target: ¥100B+ (global rollout + label expansion)',
        traffic: '+113% YoY FY2025 — fastest growing pipeline asset',
        margin: 'Claudin 18.2 ADC; strong Phase 3 gastric/GEJ data supporting global NHI listings',
      },
    },

    // 13. Total Revenue — Quarterly vs Annual Guidance
    {
      id: 13,
      title: 'Total Revenue vs Guidance',
      subtitle: '¥B — Consolidated Quarterly Revenue | FY2026 Guidance: ¥2,220B',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 505.0, target: 495.0 }, // [INTERPOLATED]
        { q: 'Q2 FY2025', comp: 519.0, target: 510.0 }, // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 545.0, target: 535.0 }, // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 568.2, target: 558.0 }, // [CITED:AR-FY25] ~¥2,137.2B full-year
        { q: 'Q1 FY2026', comp: 542.0, target: 555.0 }, // [ASSUMED]
      ],
      breakdowns: {
        ticket: '¥2,139.2B FY2025 Total Revenue',
        revenue: 'FY2026 guidance: ¥2,220B (+3.8% YoY)',
        traffic: '+5.2% YoY FY2025 growth',
        margin: 'XTANDI + Strategic Brands growth offset by FX and IRA pricing headwinds',
      },
    },
  ],
};
