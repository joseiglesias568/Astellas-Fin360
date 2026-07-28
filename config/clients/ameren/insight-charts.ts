// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/insight-charts.ts
//
// Provenance Legend: [CITED:AR-FY25] [CITED:EC-Q1-FY26]
// [DERIVED] = math from cited  [INTERPOLATED] = extrapolated  [ASSUMED] = estimate
// ─────────────────────────────────────────────────────────────────────
import { InsightChartsConfig } from '../../types';

export const insightCharts: InsightChartsConfig = {
  charts: [
    // 1. Geographic Segment Revenue Contribution — Q1 FY2026
    {
      id: 1,
      title: 'Revenue by Geographic Segment',
      subtitle: 'Q1 FY2026 — Revenue (¥B)',
      chartType: 'horizontalBar',
      data: [
        { name: 'United States', share: 35.5 },          // 196.0 / 552.8 [DERIVED]
        { name: 'International Markets', share: 22.0 },  // 121.8 / 552.8 [DERIVED]
        { name: 'Established Markets', share: 20.3 },    // 112.0 / 552.8 [DERIVED]
        { name: 'Japan', share: 15.6 },                  // 86.5 / 552.8 [DERIVED]
        { name: 'China', share: 6.6 },                   // 36.5 / 552.8 [DERIVED]
      ],
      trendData: [
        { q: "Q1 FY'25", us: 188.8, intl: 115.1, em: 109.3, jp: 88.4, cn: 34.7 },  // [INTERPOLATED]
        { q: "Q2 FY'25", us: 185.0, intl: 117.0, em: 106.5, jp: 87.5, cn: 33.8 },  // [INTERPOLATED]
        { q: "Q3 FY'25", us: 187.0, intl: 118.4, em: 107.5, jp: 86.0, cn: 33.5 },  // [INTERPOLATED]
        { q: "Q4 FY'25", us: 188.9, intl: 121.3, em: 105.2, jp: 85.2, cn: 40.1 },  // [INTERPOLATED]
        { q: "Q1 FY'26", us: 196.0, intl: 121.8, em: 112.0, jp: 86.5, cn: 36.5 },  // [CITED:EC-Q1-FY26]
      ],
    },

    // 2. Core Operating Margin Trend — Quarterly
    {
      id: 2,
      title: 'Core Operating Margin Trend',
      subtitle: '% — Quarterly | FY2026 Full-Year Guidance: ~26.4%',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 27.2, target: 26.0 },  // [INTERPOLATED]
        { q: 'Q2 FY2025', comp: 26.0, target: 26.0 },  // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 26.0, target: 26.0 },  // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 24.7, target: 26.0 },  // [INTERPOLATED — Q4 R&D spend heavier]
        { q: 'Q1 FY2026', comp: 27.7, target: 26.4 },  // [CITED:EC-Q1-FY26]
        { q: 'FY2026G',   comp: 26.4, target: 26.4 },  // FY2026 guidance [ASSUMED]
      ],
      breakdowns: {
        ticket: '27.7% Q1 FY2026',
        traffic: '+50bps YoY margin expansion',
        revenue: 'FY2026 guidance: ~26.4% Core OP margin',
        margin: 'SMT savings target ¥40B in FY2026',
      },
    },

    // 3. Total Revenue Growth — Quarterly
    {
      id: 3,
      title: 'Total Revenue by Quarter',
      subtitle: '¥B — All Geographic Segments',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 536.3, target: 530.0 },  // [INTERPOLATED]
        { q: 'Q2 FY2025', comp: 529.8, target: 525.0 },  // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 532.4, target: 528.0 },  // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 540.7, target: 536.0 },  // [INTERPOLATED]
        { q: 'Q1 FY2026', comp: 552.8, target: 545.0 },  // [CITED:EC-Q1-FY26]
      ],
      breakdowns: {
        ticket: '¥552.8B Q1 FY2026',
        traffic: '+3.1% YoY',
        revenue: 'FY2026 guidance: ¥2,200B',
        margin: 'Growth driven by PADCEV, VEOZAH',
      },
    },

    // 4. Core EPS — Quarterly vs Guidance
    {
      id: 4,
      title: 'Core EPS vs Guidance',
      subtitle: '¥ per share — quarterly actual and annualized run-rate',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 63, target: 58 },  // [INTERPOLATED]
        { q: 'Q2 FY2025', comp: 59, target: 57 },  // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 58, target: 57 },  // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 57, target: 55 },  // [INTERPOLATED]
        { q: 'Q1 FY2026', comp: 67, target: 62 },  // [CITED:EC-Q1-FY26]
      ],
      breakdowns: {
        ticket: '¥67 Q1 FY2026',
        traffic: '+6.3% YoY',
        revenue: 'FY2026 guidance: ¥250+',
        margin: 'FY2025 full-year: ¥237',
      },
    },

    // 5. XTANDI + PADCEV Product Revenue — Quarterly Trend
    {
      id: 5,
      title: 'XTANDI & PADCEV Revenue Trend',
      subtitle: '¥B — Key Oncology Products Quarterly',
      chartType: 'composedBar',
      data: [
        { q: 'Q1 FY2025', comp: 145.8, target: 140 },  // XTANDI+PADCEV combined [INTERPOLATED]
        { q: 'Q2 FY2025', comp: 148.3, target: 142 },  // [INTERPOLATED]
        { q: 'Q3 FY2025', comp: 150.1, target: 144 },  // [INTERPOLATED]
        { q: 'Q4 FY2025', comp: 152.8, target: 148 },  // [INTERPOLATED]
        { q: 'Q1 FY2026', comp: 211.7, target: 200 },  // XTANDI ¥146.5B + PADCEV ¥65.2B [DERIVED]
      ],
      breakdowns: {
        ticket: '¥211.7B Q1 FY2026 (XTANDI+PADCEV)',
        traffic: 'XTANDI +0.5%; PADCEV +22.1% YoY',
        revenue: 'FY2026 XTANDI ¥572B + PADCEV ¥268B guidance',
        margin: 'PADCEV primary growth driver; XTANDI stable despite IRA',
      },
    },

    // 6. SMT Savings Cumulative Tracker
    {
      id: 6,
      title: 'SMT Cumulative Savings Progress',
      subtitle: '¥B — Sustainable Margin Transformation Annual Savings vs Targets',
      chartType: 'composedBar',
      data: [
        { q: 'FY2024', comp: 0, target: 0 },    // Pre-SMT baseline [CONFIG-ONLY]
        { q: 'FY2025', comp: 21, target: 21 },  // FY2025 achieved ¥21B [CITED:AR-FY25]
        { q: 'FY2026G', comp: 40, target: 40 }, // FY2026 target ¥40B [CITED:AR-FY25]
        { q: 'FY2027G', comp: 65, target: 65 }, // Cumulative ¥65B [CITED:AR-FY25]
      ],
      breakdowns: {
        ticket: '¥21B FY2025 (achieved)',
        traffic: 'FY2026 target: ¥40B in-year savings',
        revenue: 'Cumulative target: ¥65B by FY2027',
        margin: 'Primary lever for Core OP margin expansion to 28%+',
      },
    },
  ],
};
