import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed Analytics Products: ML Forecast Results + Anomaly Detections
// Layer 3: Data & Analytics Products
//
// Forecast horizon: Q3 FY24 → Q1 FY26. Period labels match Astellas convention
// (April-March fiscal year). All monetary values in JPY billions (¥B) unless noted.
// Astellas FY2025 context: Revenue ¥2,139.2B (+11.9%), Core OP ¥555.7B (26.0%),
// Core EPS ¥237.01.
// FY2026 guidance: Revenue ¥2,220B, Core OP ¥620B (27.9%), Core EPS ¥256.77.
// Key products: XTANDI ¥960.8B (+5.3%), Strategic Brands ¥480.3B (+43%).
// =============================================================================

export async function seedAnalyticsProducts(prisma: PrismaClient, companyId: number) {
  console.log('  Seeding ML forecast results...');

  const forecastData = [
    // Core EPS (¥) — quarterly Core EPS; FY25 annual ¥237.01
    // Q3 seasonality peak (SMT delivery + operating leverage); Q4 lowest (year-end costs)
    { metricName: 'Core EPS (¥)', periodLabel: 'Q3 FY24', modelType: 'Ensemble', forecastValue: 42.0, lowerBound: 38.5, upperBound: 45.5, actualValue: 44.5, confidenceScore: 0.87, mape: 5.62 },
    { metricName: 'Core EPS (¥)', periodLabel: 'Q4 FY24', modelType: 'Ensemble', forecastValue: 30.5, lowerBound: 27.0, upperBound: 34.0, actualValue: 28.0, confidenceScore: 0.85, mape: 8.93 },
    { metricName: 'Core EPS (¥)', periodLabel: 'Q1 FY25', modelType: 'Ensemble', forecastValue: 47.0, lowerBound: 43.0, upperBound: 51.0, actualValue: 54.88, confidenceScore: 0.86, mape: 14.36 },
    { metricName: 'Core EPS (¥)', periodLabel: 'Q2 FY25', modelType: 'Ensemble', forecastValue: 55.5, lowerBound: 51.0, upperBound: 60.0, actualValue: 59.14, confidenceScore: 0.88, mape: 6.16 },
    { metricName: 'Core EPS (¥)', periodLabel: 'Q3 FY25', modelType: 'Ensemble', forecastValue: 62.0, lowerBound: 58.0, upperBound: 66.0, actualValue: 71.18, confidenceScore: 0.87, mape: 12.90 },
    { metricName: 'Core EPS (¥)', periodLabel: 'Q4 FY25', modelType: 'Ensemble', forecastValue: 55.0, lowerBound: 51.0, upperBound: 59.0, actualValue: 51.81, confidenceScore: 0.88, mape: 6.16 },
    { metricName: 'Core EPS (¥)', periodLabel: 'FY25', modelType: 'Ensemble', forecastValue: 232.0, lowerBound: 225.0, upperBound: 239.0, actualValue: 237.01, confidenceScore: 0.92, mape: 2.11 },
    { metricName: 'Core EPS (¥)', periodLabel: 'Q1 FY26', modelType: 'Ensemble', forecastValue: 59.5, lowerBound: 55.0, upperBound: 64.0, actualValue: null, confidenceScore: 0.88, mape: 0 },

    // XTANDI Revenue (¥B/quarter) — IRA risk watch for FY2026; US mCRPC + nmCRPC market leader
    // Q4 seasonality dip typical; IRA headwind risk for Q1 FY26 and beyond
    { metricName: 'XTANDI Revenue (¥B)', periodLabel: 'Q1 FY25', modelType: 'XGBoost', forecastValue: 245.0, lowerBound: 235.0, upperBound: 255.0, actualValue: 249.3, confidenceScore: 0.91, mape: 1.72 },
    { metricName: 'XTANDI Revenue (¥B)', periodLabel: 'Q2 FY25', modelType: 'XGBoost', forecastValue: 240.0, lowerBound: 230.0, upperBound: 250.0, actualValue: 238.7, confidenceScore: 0.92, mape: 0.54 },
    { metricName: 'XTANDI Revenue (¥B)', periodLabel: 'Q3 FY25', modelType: 'XGBoost', forecastValue: 248.0, lowerBound: 238.0, upperBound: 258.0, actualValue: 253.5, confidenceScore: 0.90, mape: 2.17 },
    { metricName: 'XTANDI Revenue (¥B)', periodLabel: 'Q4 FY25', modelType: 'XGBoost', forecastValue: 225.0, lowerBound: 215.0, upperBound: 235.0, actualValue: 219.3, confidenceScore: 0.89, mape: 2.60 },
    { metricName: 'XTANDI Revenue (¥B)', periodLabel: 'FY25', modelType: 'XGBoost', forecastValue: 965.0, lowerBound: 940.0, upperBound: 990.0, actualValue: 960.8, confidenceScore: 0.94, mape: 0.44 },
    { metricName: 'XTANDI Revenue (¥B)', periodLabel: 'Q1 FY26', modelType: 'XGBoost', forecastValue: 235.0, lowerBound: 210.0, upperBound: 255.0, actualValue: null, confidenceScore: 0.84, mape: 0 },

    // Strategic Brands Revenue (¥B/quarter) — PADCEV + IZERVAY + VYLOY + VEOZAH + XOSPATA
    // +43% FY2025; acceleration continuing into FY2026 as PADCEV first-line UC ramps
    { metricName: 'Strategic Brands Revenue (¥B)', periodLabel: 'Q1 FY25', modelType: 'Ensemble', forecastValue: 100.0, lowerBound: 92.0, upperBound: 108.0, actualValue: 109.0, confidenceScore: 0.85, mape: 8.26 },
    { metricName: 'Strategic Brands Revenue (¥B)', periodLabel: 'Q2 FY25', modelType: 'Ensemble', forecastValue: 112.0, lowerBound: 104.0, upperBound: 120.0, actualValue: 118.5, confidenceScore: 0.86, mape: 5.49 },
    { metricName: 'Strategic Brands Revenue (¥B)', periodLabel: 'Q3 FY25', modelType: 'Ensemble', forecastValue: 122.0, lowerBound: 114.0, upperBound: 130.0, actualValue: 130.7, confidenceScore: 0.85, mape: 6.66 },
    { metricName: 'Strategic Brands Revenue (¥B)', periodLabel: 'Q4 FY25', modelType: 'Ensemble', forecastValue: 118.0, lowerBound: 110.0, upperBound: 126.0, actualValue: 122.1, confidenceScore: 0.87, mape: 3.36 },
    { metricName: 'Strategic Brands Revenue (¥B)', periodLabel: 'FY25', modelType: 'Ensemble', forecastValue: 440.0, lowerBound: 415.0, upperBound: 465.0, actualValue: 480.3, confidenceScore: 0.84, mape: 8.39 },
    { metricName: 'Strategic Brands Revenue (¥B)', periodLabel: 'Q1 FY26', modelType: 'Ensemble', forecastValue: 147.0, lowerBound: 135.0, upperBound: 159.0, actualValue: null, confidenceScore: 0.85, mape: 0 },

    // Core OP Margin (%) — Q3 FY25 spike 32.8% reflects Q3 seasonality + SMT delivery
    // Q4 FY25 trough 21.1% driven by year-end costs; FY2026 guidance 27.9%
    { metricName: 'Core OP Margin (%)', periodLabel: 'Q1 FY25', modelType: 'Ensemble', forecastValue: 23.5, lowerBound: 22.0, upperBound: 25.0, actualValue: 24.3, confidenceScore: 0.87, mape: 3.29 },
    { metricName: 'Core OP Margin (%)', periodLabel: 'Q2 FY25', modelType: 'Ensemble', forecastValue: 24.8, lowerBound: 23.3, upperBound: 26.3, actualValue: 25.8, confidenceScore: 0.88, mape: 3.88 },
    { metricName: 'Core OP Margin (%)', periodLabel: 'Q3 FY25', modelType: 'Ensemble', forecastValue: 28.5, lowerBound: 27.0, upperBound: 30.0, actualValue: 32.8, confidenceScore: 0.85, mape: 13.11 },
    { metricName: 'Core OP Margin (%)', periodLabel: 'Q4 FY25', modelType: 'Ensemble', forecastValue: 23.5, lowerBound: 22.0, upperBound: 25.0, actualValue: 21.1, confidenceScore: 0.84, mape: 11.37 },
    { metricName: 'Core OP Margin (%)', periodLabel: 'FY25', modelType: 'Ensemble', forecastValue: 25.8, lowerBound: 24.5, upperBound: 27.1, actualValue: 26.0, confidenceScore: 0.92, mape: 0.77 },
    { metricName: 'Core OP Margin (%)', periodLabel: 'Q1 FY26', modelType: 'Ensemble', forecastValue: 25.5, lowerBound: 23.5, upperBound: 27.5, actualValue: null, confidenceScore: 0.87, mape: 0 },

    // Revenue (¥B/quarter) — consolidated total; FY2025 ¥2,139.2B (+11.9%); guidance ¥2,220B
    { metricName: 'Revenue (¥B)', periodLabel: 'Q1 FY25', modelType: 'Ensemble', forecastValue: 522.0, lowerBound: 508.0, upperBound: 536.0, actualValue: 537.9, confidenceScore: 0.90, mape: 2.96 },
    { metricName: 'Revenue (¥B)', periodLabel: 'Q2 FY25', modelType: 'Ensemble', forecastValue: 530.0, lowerBound: 516.0, upperBound: 544.0, actualValue: 537.0, confidenceScore: 0.91, mape: 1.30 },
    { metricName: 'Revenue (¥B)', periodLabel: 'Q3 FY25', modelType: 'Ensemble', forecastValue: 515.0, lowerBound: 501.0, upperBound: 529.0, actualValue: 527.1, confidenceScore: 0.90, mape: 2.30 },
    { metricName: 'Revenue (¥B)', periodLabel: 'Q4 FY25', modelType: 'Ensemble', forecastValue: 530.0, lowerBound: 516.0, upperBound: 544.0, actualValue: 537.2, confidenceScore: 0.91, mape: 1.34 },
    { metricName: 'Revenue (¥B)', periodLabel: 'FY25', modelType: 'Ensemble', forecastValue: 2110.0, lowerBound: 2080.0, upperBound: 2140.0, actualValue: 2139.2, confidenceScore: 0.93, mape: 1.37 },
    { metricName: 'Revenue (¥B)', periodLabel: 'Q1 FY26', modelType: 'Ensemble', forecastValue: 558.0, lowerBound: 540.0, upperBound: 576.0, actualValue: null, confidenceScore: 0.89, mape: 0 },

    // USD/JPY Rate — key FX lever; ¥151 planning baseline; +¥1 → +¥2.1B revenue
    { metricName: 'USD/JPY Rate', periodLabel: 'Q1 FY25', modelType: 'Prophet', forecastValue: 150.0, lowerBound: 146.0, upperBound: 154.0, actualValue: 152.0, confidenceScore: 0.82, mape: 1.32 },
    { metricName: 'USD/JPY Rate', periodLabel: 'Q2 FY25', modelType: 'Prophet', forecastValue: 149.0, lowerBound: 145.0, upperBound: 153.0, actualValue: 150.0, confidenceScore: 0.83, mape: 0.67 },
    { metricName: 'USD/JPY Rate', periodLabel: 'Q3 FY25', modelType: 'Prophet', forecastValue: 151.0, lowerBound: 147.0, upperBound: 155.0, actualValue: 153.0, confidenceScore: 0.81, mape: 1.31 },
    { metricName: 'USD/JPY Rate', periodLabel: 'Q4 FY25', modelType: 'Prophet', forecastValue: 148.0, lowerBound: 144.0, upperBound: 152.0, actualValue: 152.0, confidenceScore: 0.80, mape: 2.63 },
    { metricName: 'USD/JPY Rate', periodLabel: 'Q1 FY26', modelType: 'Prophet', forecastValue: 151.0, lowerBound: 147.0, upperBound: 155.0, actualValue: null, confidenceScore: 0.80, mape: 0 },
  ];

  await prisma.forecastResult.createMany({
    data: forecastData.map((f) => ({
      companyId,
      metricName: f.metricName,
      periodLabel: f.periodLabel,
      modelType: f.modelType,
      forecastValue: f.forecastValue,
      lowerBound: f.lowerBound,
      upperBound: f.upperBound,
      actualValue: f.actualValue,
      confidenceScore: f.confidenceScore,
      mape: f.mape,
    })),
  });

  console.log(`  Created ${forecastData.length} forecast results`);

  // Anomaly Detections

  console.log('  Seeding anomaly detections...');

  const anomalies = [
    {
      metricName: 'Q1 FY25 Core EPS Beat',
      detectedAt: '2025-07-30T08:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 47.0,
      actualValue: 54.88,
      deviationPct: 16.77,
      explanation: 'Q1 FY25 Core EPS of ¥54.88 beat the model expectation of ¥47.0 by ¥7.88 or +16.8%. The outperformance was driven by Strategic Brands revenue acceleration — particularly PADCEV first-line UC ramp (¥55.3B quarterly average vs ¥45B model) and IZERVAY geographic atrophy geographic atrophy coverage expansion (¥19.4B quarterly average, +226% YoY trajectory) — contributing approximately ¥5/share. Favourable USD/JPY (¥152 actual vs ¥150 model baseline) provided approximately ¥1.5/share FX translation uplift. SMT savings front-loading contributed approximately ¥1.4/share. FY2025 guidance raised to ¥237.01 Core EPS. Model updated to reflect Q1 actuals and Strategic Brands growth steeper-than-expected trajectory.',
      status: 'resolved',
      relatedDrivers: ['Core EPS (¥)', 'Strategic Brands Revenue (¥B)', 'PADCEV Revenue', 'USD/JPY Rate', 'SMT Savings'],
    },
    {
      metricName: 'XTANDI IRA Risk Flag — CMS MPCP Monitoring',
      detectedAt: '2025-08-15T10:00:00Z',
      severity: 'warning',
      direction: 'below_expected',
      expectedValue: 240.0,
      actualValue: 0,
      deviationPct: 0.0,
      explanation: 'CMS has included XTANDI (enzalutamide) in the Medicare Drug Price Negotiation Program (MPCP) second round. The model flags this as a monitoring event with material downside risk to the base case XTANDI revenue trajectory of ¥960.8B FY2025. Key risk parameters: XTANDI Medicare Part D revenue represents approximately 40% of US XTANDI net sales; IRA sensitivity is -¥9.6B revenue per +1pp CMS-negotiated price reduction. The negotiation timeline spans multiple quarters; Maximum Fair Price (MFP) implementation is expected to begin in 2027. Model maintaining current ¥235B Q1 FY26 quarterly forecast pending CMS MFP announcement. Bear case scenario (-15% IRA price reduction) implies -¥57.6B annual revenue headwind at full implementation. All XTANDI forecasts flagged as IRA-watch pending CMS negotiation conclusion.',
      status: 'acknowledged',
      relatedDrivers: ['XTANDI Revenue (¥B)', 'Core EPS (¥)', 'Revenue (¥B)', 'IRA Negotiation Timeline'],
    },
    {
      metricName: 'Q3 FY25 Core OP Margin Spike',
      detectedAt: '2026-01-30T08:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 28.5,
      actualValue: 32.8,
      deviationPct: 15.09,
      explanation: 'Q3 FY25 Core OP Margin of 32.8% was 430bps above the model expectation of 28.5%. The outperformance was driven by a combination of three factors: (1) Q3 FY25 seasonal operating leverage on ¥527.1B revenue with fixed-cost absorption improving margins; (2) SMT savings accelerating to approximately ¥6B in Q3 alone (cumulative YTD ¥15B vs ¥12B plan); and (3) IZERVAY and VYLOY launch costs lower than planned as promotional spend was phased to Q4 FY25 and Q1 FY26. Core OP Q3 FY25 was approximately ¥172.9B (32.8% × ¥527.1B). Q4 FY25 saw the expected margin reversion to 21.1% as year-end R&D milestone payments and launch costs were recognised. FY2025 full-year Core OP ¥555.7B (26.0% margin) in line with guidance of ¥540-560B.',
      status: 'resolved',
      relatedDrivers: ['Core OP Margin (%)', 'Revenue (¥B)', 'SMT Savings', 'Core EPS (¥)'],
    },
    {
      metricName: 'VYLOY Q2 FY25 Launch Acceleration',
      detectedAt: '2025-10-30T09:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 10.0,
      actualValue: 15.7,
      deviationPct: 57.0,
      explanation: 'VYLOY (zolbetuximab) quarterly revenue of ¥15.7B in Q2 FY25 exceeded the model expectation of ¥10.0B by ¥5.7B or +57%. The acceleration was driven by stronger-than-expected gastric cancer market reception in China following NMPA approval, with VYLOY achieving first-mover advantage in CLDN18.2-positive gastric/gastroesophageal junction (G/GEJ) adenocarcinoma. Key account penetration at tier-1 oncology centres in China exceeded the launch model pace by approximately 40%, indicating higher-than-anticipated CLDN18.2 testing rates. Japan market uptake (PMDA approval) also tracked ahead of plan. Model updated to reflect accelerated launch trajectory; Q3 FY25 VYLOY forecast raised to ¥18.5B and FY26 full-year VYLOY forecast raised to ¥80B+.',
      status: 'resolved',
      relatedDrivers: ['Strategic Brands Revenue (¥B)', 'Revenue (¥B)', 'China Market Development'],
    },
    {
      metricName: 'USD/JPY Q4 FY25 Favourable Translation',
      detectedAt: '2026-04-30T10:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 148.0,
      actualValue: 152.0,
      deviationPct: 2.70,
      explanation: 'Q4 FY25 average USD/JPY rate of ¥152 was ¥4 more favourable than the model expectation of ¥148 (planning basis for Q4). With approximately 60% of Astellas revenue denominated in USD or USD-correlated currencies (predominantly US XTANDI, PADCEV, and IZERVAY), a ¥4 USD/JPY difference translates to approximately +¥8.4B revenue and approximately +¥3.6/share Core EPS tailwind in Q4 FY25 alone (based on +¥1 USD/JPY = +¥2.1B revenue sensitivity). The ¥152 Q4 rate is consistent with the full-year FY2025 XTANDI revenue of ¥960.8B — approximately ¥25B of the full-year XTANDI outperformance vs the original ¥930B plan is attributable to FX translation. FY2026 planning baseline maintained at ¥151 USD/JPY.',
      status: 'resolved',
      relatedDrivers: ['USD/JPY Rate', 'Revenue (¥B)', 'XTANDI Revenue (¥B)', 'Core EPS (¥)'],
    },
    {
      metricName: 'Strategic Brands +43% FY2025 Outperformance',
      detectedAt: '2026-05-28T09:00:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 440.0,
      actualValue: 480.3,
      deviationPct: 9.16,
      explanation: 'FY2025 Strategic Brands total revenue of ¥480.3B exceeded the model expectation of ¥440.0B by ¥40.3B or +9.2% (total growth of +43% vs prior year). The outperformance was broad-based across the portfolio: PADCEV ¥221.2B (+34.8% YoY) driven by EV-302 first-line urothelial carcinoma approval and Pfizer co-promotion acceleration; IZERVAY ¥77.6B (+226% YoY) significantly ahead of model as geographic atrophy market developed faster than expected with formulary access improving throughout FY2025; VYLOY ¥63.1B (new launch above plan, supported by China + Japan approvals); VEOZAH ¥46.6B (vasomotor symptoms launch ahead of model). The ¥480.3B Strategic Brands total represents 22.4% of total Astellas revenue, up from 17.2% in FY2024, confirming the franchise diversification away from XTANDI concentration. FY2026 Strategic Brands guidance raised to ¥600B+.',
      status: 'resolved',
      relatedDrivers: ['Strategic Brands Revenue (¥B)', 'Revenue (¥B)', 'Core EPS (¥)', 'Core OP Margin (%)'],
    },
    {
      metricName: 'SMT Savings FY2025 Ahead of Target',
      detectedAt: '2026-05-28T09:30:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 18.0,
      actualValue: 21.0,
      deviationPct: 16.67,
      explanation: 'FY2025 SMT (Sustainable Margin Transformation) savings of ¥21B exceeded the original ¥18B plan by ¥3B or +16.7%. The outperformance was attributable to three workstreams: (1) Procurement and COGS efficiency — ¥8.5B actual vs ¥7.0B plan, driven by API sourcing renegotiations and contract manufacturing optimisation; (2) SG&A optimisation — ¥7.2B actual vs ¥6.5B plan, led by headcount rationalisation in non-commercial functions and T&E policy discipline; (3) R&D operational efficiency — ¥5.3B actual vs ¥4.5B plan, driven by prioritisation of higher-return POC programmes. Manufacturing network rationalisation delivered ¥3B additional savings not in the original plan. The ¥21B FY2025 achievement provides confidence in the ¥40B FY2026 target. Core OP bridge: SMT ¥21B contributed approximately ¥3B more than budgeted to the Core OP of ¥555.7B. Status confirmed resolved; FY2026 PMO tracking now active.',
      status: 'resolved',
      relatedDrivers: ['Core OP Margin (%)', 'Core EPS (¥)', 'SMT Savings Programme'],
    },
    {
      metricName: 'China Q4 FY25 Growth Acceleration',
      detectedAt: '2026-04-30T10:30:00Z',
      severity: 'info',
      direction: 'above_expected',
      expectedValue: 25.0,
      actualValue: 33.0,
      deviationPct: 32.0,
      explanation: 'China revenue growth of +33% YoY in Q4 FY25 significantly exceeded the plan of +25%, driven primarily by VYLOY NMPA approval tailwind and accelerated hospital formulary listing in tier-1 cities. The +33% reported growth includes approximately +8pp contribution from VYLOY new launch (not in Q4 FY24 base) and +25% underlying organic growth from existing portfolio. China total revenue reached approximately ¥52B in Q2 FY25 run-rate terms. VYLOY has achieved remarkably rapid CLDN18.2 biomarker testing adoption in key academic oncology centres, exceeding the model assumption of 18-month penetration ramp. China growth sensitivity: +1pp additional China growth = +¥1.0B revenue. FY2026 China guidance raised to ¥210B+ (vs ¥192B FY2025 estimate), implying +9% growth excluding VYLOY incremental contribution.',
      status: 'resolved',
      relatedDrivers: ['Revenue (¥B)', 'Strategic Brands Revenue (¥B)', 'China Market Development'],
    },
  ];

  await prisma.anomalyDetection.createMany({
    data: anomalies.map((a) => ({
      companyId,
      metricName: a.metricName,
      detectedAt: a.detectedAt,
      severity: a.severity,
      direction: a.direction,
      expectedValue: a.expectedValue,
      actualValue: a.actualValue,
      deviationPct: a.deviationPct,
      explanation: a.explanation,
      status: a.status,
      relatedDrivers: a.relatedDrivers,
    })),
  });

  console.log(`  Created ${anomalies.length} anomaly detections`);
  console.log('Analytics Products seed complete');
}
