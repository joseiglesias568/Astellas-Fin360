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
  ],
};
