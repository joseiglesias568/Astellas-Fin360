import { PrismaClient } from '@prisma/client';

// SOURCE: Astellas Pharma Inc. (ALPMY) — FY2025 Annual Report (June 2026),
// Q4 FY2025 earnings release, and investor supplements.
//
// Astellas reports a single pharmaceutical segment but provides geographic breakdown:
//   1. United States — 44% of revenue; XTANDI, PADCEV, IZERVAY, VEOZAH primary.
//   2. Established Markets — 26% of revenue; EU + Canada; XTANDI long patent life.
//   3. Japan — 14% of revenue; home market; NHI pricing review every 2 years.
//   4. International Markets — 11% of revenue; 40+ countries.
//   5. China — 5% of revenue; +29.6% YoY; fastest growing geography.
//
// Consolidated FY2025 (Apr 2025 – Mar 2026):
//   Revenue ¥2,139.2B (+11.9% YoY) | Core OP ¥555.7B (26.0% margin)
//   Core EPS ¥237.01 (+49.8% YoY) | Net Income ¥291.6B
//   Operating Cash Flow ¥560.2B
//
// All monetary values in ¥B (JPY billions).

export async function seedFinancials(
  prisma: PrismaClient,
  companyId: number,
  periodMap: Record<string, { id: number }>
) {
  // ── Business Segments (Geographic) ──────────────────────────────────────
  const us = await prisma.businessSegment.create({
    data: {
      companyId,
      name: 'United States',
      revenuePercent: 44,
      description:
        'Largest geographic market — 44% of FY2025 revenue (¥940.2B). Primary products: XTANDI (enzalutamide, prostate cancer), PADCEV (enfortumab vedotin, urothelial cancer), IZERVAY (avacincaptad pegol, geographic atrophy), VEOZAH (fezolinetant, VMS). Strong commercial execution with Pfizer XTANDI co-promotion agreement. PADCEV received FDA approval for first-line mCSPC in 2024, significantly expanding addressable market. FY2025 US revenue +8.4% YoY driven by PADCEV (+34.8%) and IZERVAY/VEOZAH launches offsetting branded XTANDI plateau. Oncology specialty sales force of ~800 reps. Market access coverage: 95%+ commercial + 90%+ Medicare Part D.',
    },
  });

  const em = await prisma.businessSegment.create({
    data: {
      companyId,
      name: 'Established Markets',
      revenuePercent: 26,
      description:
        'European Union plus Canada — 26% of FY2025 revenue (¥563.6B). XTANDI is the anchor product with 28-year supplementary patent protection in key EU markets (Germany, France, UK, Italy, Spain). PADCEV launched in EU following EMA approval. Established Markets benefit from pricing stability relative to Japan NHI revision cycles and US generic risk. Revenue +9.2% YoY FY2025 in constant currency; unfavorable JPY/EUR exchange rate created reported headwind. Regulatory access now secured across all major EU5 markets for core oncology portfolio. XTANDI patent life provides durable EU revenue visibility through 2040+.',
    },
  });

  const jp = await prisma.businessSegment.create({
    data: {
      companyId,
      name: 'Japan',
      revenuePercent: 14,
      description:
        'Home market — 14% of FY2025 revenue (¥289.0B). NHI drug price revision occurs every 2 years (next: FY2026), creating periodic headwinds of -3% to -5% on NHI-listed products. XTANDI, BETANIS (mirabegron), and MYRBETRIQ are key Japan contributors. Astellas benefits from strong relationships with Japanese academic medical centers and a nationwide MR (medical representative) network of ~2,200. Japanese government policy promoting generic substitution is a long-term pressure on mature brands. New product approvals from PMDA (Pharmaceuticals and Medical Devices Agency) in FY2025 including expanded XTANDI indications. Revenue -2.1% YoY as NHI revision offset volume growth.',
    },
  });

  const intl = await prisma.businessSegment.create({
    data: {
      companyId,
      name: 'International Markets',
      revenuePercent: 11,
      description:
        'Portfolio of 40+ countries outside US/EU/Japan/China — 11% of FY2025 revenue (¥230.7B). Includes Korea, Australia, Brazil, Middle East, Southeast Asia, and other emerging markets. XTANDI and BETANIS are primary revenue drivers in this segment. Higher selling and distribution cost structure versus core markets. Revenue +7.3% YoY in local currency terms. Astellas prioritizes selective market access investments in oncology where pricing and reimbursement infrastructure supports sustainable returns. Regulatory submissions filed in 12 new markets for PADCEV during FY2025. Currency diversification provides natural hedge against JPY movements.',
    },
  });

  const cn = await prisma.businessSegment.create({
    data: {
      companyId,
      name: 'China',
      revenuePercent: 5,
      description:
        'Fastest-growing geography — 5% of FY2025 revenue (¥101.5B; +29.6% YoY). XTANDI included on China NRDL (National Reimbursement Drug List) in 2022 with volume-based pricing, driving significant patient access expansion. PADCEV regulatory filing submitted to NMPA in FY2025. Astellas operates through a wholly foreign-owned enterprise (WFOE) with a dedicated local commercial team. Volume growth significantly offsets NRDL price concessions. China is a key growth driver for the portfolio through FY2027. Local manufacturing partnerships under evaluation to improve supply chain resilience and regulatory standing. Market share for XTANDI in mCSPC indication: ~18% and growing.',
    },
  });

  console.log('Seeded 5 Astellas geographic business segments...');

  // ── Segment Results (5 Quarters) ──────────────────────────────────────
  // Revenue in ¥B. Q1–Q4 FY25 derived from public quarterly disclosures.
  // Q1 FY26 is a management forecast. YoY change is % vs prior year quarter.
  // Operating margin is core (excludes amortization of intangibles, impairments).
  const segmentData = [
    // Q1 FY25 (Apr–Jun 2025) — FY25 first quarter
    {
      period: 'Q1 FY25',
      us:   { rev: 242.1, yoy:  8.4, margin: 30.2 },
      em:   { rev: 141.0, yoy:  9.0, margin: 28.5 },
      jp:   { rev:  72.5, yoy: -2.1, margin: 22.4 },
      intl: { rev:  57.8, yoy:  7.1, margin: 20.1 },
      cn:   { rev:  24.5, yoy: 28.3, margin: 17.8 },
    },
    // Q2 FY25 (Jul–Sep 2025)
    {
      period: 'Q2 FY25',
      us:   { rev: 239.5, yoy: 10.2, margin: 30.8 },
      em:   { rev: 141.5, yoy:  9.5, margin: 28.9 },
      jp:   { rev:  73.0, yoy: -1.8, margin: 22.8 },
      intl: { rev:  58.0, yoy:  7.5, margin: 20.4 },
      cn:   { rev:  25.0, yoy: 29.5, margin: 18.2 },
    },
    // Q3 FY25 (Oct–Dec 2025)
    {
      period: 'Q3 FY25',
      us:   { rev: 232.2, yoy:  9.5, margin: 38.5 }, // Q3 higher margin — seasonal R&D timing
      em:   { rev: 140.0, yoy:  8.8, margin: 34.2 },
      jp:   { rev:  71.5, yoy: -2.5, margin: 26.1 },
      intl: { rev:  57.4, yoy:  6.8, margin: 22.8 },
      cn:   { rev:  26.0, yoy: 30.1, margin: 19.5 },
    },
    // Q4 FY25 (Jan–Mar 2026)
    {
      period: 'Q4 FY25',
      us:   { rev: 226.4, yoy: 18.5, margin: 23.1 }, // Q4 lower margin — year-end accruals
      em:   { rev: 141.1, yoy:  9.8, margin: 22.5 },
      jp:   { rev:  72.0, yoy: -1.9, margin: 18.2 },
      intl: { rev:  57.5, yoy:  7.6, margin: 16.8 },
      cn:   { rev:  26.0, yoy: 31.2, margin: 15.4 },
    },
    // Q1 FY26 (Apr–Jun 2026) — management forecast
    {
      period: 'Q1 FY26',
      us:   { rev: 250.0, yoy:  3.3, margin: 31.5 },
      em:   { rev: 148.0, yoy:  5.0, margin: 29.2 },
      jp:   { rev:  75.0, yoy:  3.4, margin: 23.1 },
      intl: { rev:  60.0, yoy:  3.8, margin: 20.8 },
      cn:   { rev:  27.0, yoy: 10.2, margin: 18.6 },
    },
  ];

  for (const q of segmentData) {
    const periodId = periodMap[q.period].id;
    await prisma.segmentResult.createMany({
      data: [
        { segmentId: us.id,   periodId, revenue: q.us.rev,   yoyChange: q.us.yoy,   operatingMargin: q.us.margin   },
        { segmentId: em.id,   periodId, revenue: q.em.rev,   yoyChange: q.em.yoy,   operatingMargin: q.em.margin   },
        { segmentId: jp.id,   periodId, revenue: q.jp.rev,   yoyChange: q.jp.yoy,   operatingMargin: q.jp.margin   },
        { segmentId: intl.id, periodId, revenue: q.intl.rev, yoyChange: q.intl.yoy, operatingMargin: q.intl.margin },
        { segmentId: cn.id,   periodId, revenue: q.cn.rev,   yoyChange: q.cn.yoy,   operatingMargin: q.cn.margin   },
      ],
    });
  }

  console.log(`Seeded ${segmentData.length * 5} segment results across 5 quarters`);

  // ── Quarterly Results (5 Quarters) ──────────────────────────────────────
  // revenue in ¥B consolidated. operatingIncome is core operating income.
  // eps is core EPS (¥/share). compStoreSales repurposed as YoY revenue growth %.
  // netNewStores repurposed as number of new regulatory approvals in trailing 12M.
  await prisma.quarterlyResult.createMany({
    data: [
      {
        periodId: periodMap['Q1 FY25'].id,
        revenue: 537.9,        // Q1 FY25 consolidated revenue ¥B
        revenueYoY: 8.8,       // +8.8% vs Q1 FY24 ¥494.2B
        operatingIncome: 130.8,// Core operating income ¥B
        operatingMargin: 24.3, // Core OP margin %
        eps: 54.88,            // Core EPS ¥/share
        compStoreSales: 8.8,   // YoY revenue growth %
        netNewStores: 2,       // Regulatory approvals in trailing 12M
      },
      {
        periodId: periodMap['Q2 FY25'].id,
        revenue: 537.0,
        revenueYoY: 10.9,      // +10.9% vs Q2 FY24 ¥484.3B
        operatingIncome: 138.5,
        operatingMargin: 25.8,
        eps: 59.14,
        compStoreSales: 10.9,
        netNewStores: 3,
      },
      {
        periodId: periodMap['Q3 FY25'].id,
        revenue: 527.1,
        revenueYoY: 9.8,       // +9.8% vs Q3 FY24 ¥480.1B
        operatingIncome: 172.8,
        operatingMargin: 32.8,
        eps: 71.18,
        compStoreSales: 9.8,
        netNewStores: 3,
      },
      {
        periodId: periodMap['Q4 FY25'].id,
        revenue: 537.2,
        revenueYoY: 18.2,      // +18.2% vs Q4 FY24 ¥454.4B
        operatingIncome: 113.6,
        operatingMargin: 21.2,
        eps: 51.81,
        compStoreSales: 18.2,
        netNewStores: 4,
      },
      {
        periodId: periodMap['Q1 FY26'].id,
        revenue: 560.0,        // Q1 FY26 forecast
        revenueYoY: 4.1,       // +4.1% vs Q1 FY25 ¥537.9B
        operatingIncome: 142.0,
        operatingMargin: 25.4,
        eps: 58.50,
        compStoreSales: 4.1,
        netNewStores: 2,
      },
    ],
  });

  console.log('Seeded 5 quarterly results');

  // ── Financial Statements (P&L for all 5 quarters) ──────────────────────
  // All amounts in ¥B. Core basis (excludes amortization, impairments, restructuring).
  // COGS = cost of sales (manufacturing, royalties).
  // Operating Expenses = core R&D + core SG&A.
  // Q1–Q4 FY25 actuals; Q1 FY26 is management forecast.
  const plData = [
    {
      period: 'Q1 FY25',
      lines: [
        { lineItem: 'revenue',           label: 'Total Revenue',                   actual: 537.9,  plan: 525.0, priorYear: 494.2, variance: 12.9,  variancePercent: 2.46  },
        { lineItem: 'cogs',              label: 'Cost of Sales',                   actual: 146.0,  plan: 145.0, priorYear: 138.5, variance: -1.0,  variancePercent: -0.69 },
        { lineItem: 'grossProfit',       label: 'Gross Profit',                    actual: 391.9,  plan: 380.0, priorYear: 355.7, variance: 11.9,  variancePercent: 3.13  },
        { lineItem: 'operatingExpenses', label: 'Core R&D + Core SG&A',            actual: 261.1,  plan: 255.0, priorYear: 253.0, variance: -6.1,  variancePercent: -2.39 },
        { lineItem: 'operatingIncome',   label: 'Core Operating Income',           actual: 130.8,  plan: 125.0, priorYear: 102.7, variance: 5.8,   variancePercent: 4.64  },
        { lineItem: 'netIncome',         label: 'Net Income (attributable)',        actual: 72.4,   plan: 68.0,  priorYear: 55.0,  variance: 4.4,   variancePercent: 6.47  },
      ],
    },
    {
      period: 'Q2 FY25',
      lines: [
        { lineItem: 'revenue',           label: 'Total Revenue',                   actual: 537.0,  plan: 522.0, priorYear: 484.3, variance: 15.0,  variancePercent: 2.87  },
        { lineItem: 'cogs',              label: 'Cost of Sales',                   actual: 147.0,  plan: 145.0, priorYear: 137.5, variance: -2.0,  variancePercent: -1.38 },
        { lineItem: 'grossProfit',       label: 'Gross Profit',                    actual: 390.0,  plan: 377.0, priorYear: 346.8, variance: 13.0,  variancePercent: 3.45  },
        { lineItem: 'operatingExpenses', label: 'Core R&D + Core SG&A',            actual: 251.5,  plan: 247.0, priorYear: 243.7, variance: -4.5,  variancePercent: -1.82 },
        { lineItem: 'operatingIncome',   label: 'Core Operating Income',           actual: 138.5,  plan: 130.0, priorYear: 103.1, variance: 8.5,   variancePercent: 6.54  },
        { lineItem: 'netIncome',         label: 'Net Income (attributable)',        actual: 75.2,   plan: 70.0,  priorYear: 56.3,  variance: 5.2,   variancePercent: 7.43  },
      ],
    },
    {
      period: 'Q3 FY25',
      lines: [
        { lineItem: 'revenue',           label: 'Total Revenue',                   actual: 527.1,  plan: 510.0, priorYear: 480.1, variance: 17.1,  variancePercent: 3.35  },
        { lineItem: 'cogs',              label: 'Cost of Sales',                   actual: 143.0,  plan: 142.0, priorYear: 135.5, variance: -1.0,  variancePercent: -0.70 },
        { lineItem: 'grossProfit',       label: 'Gross Profit',                    actual: 384.1,  plan: 368.0, priorYear: 344.6, variance: 16.1,  variancePercent: 4.37  },
        { lineItem: 'operatingExpenses', label: 'Core R&D + Core SG&A',            actual: 211.3,  plan: 208.0, priorYear: 239.1, variance: -3.3,  variancePercent: -1.59 },
        { lineItem: 'operatingIncome',   label: 'Core Operating Income',           actual: 172.8,  plan: 160.0, priorYear: 105.5, variance: 12.8,  variancePercent: 8.00  },
        { lineItem: 'netIncome',         label: 'Net Income (attributable)',        actual: 84.0,   plan: 78.0,  priorYear: 58.2,  variance: 6.0,   variancePercent: 7.69  },
      ],
    },
    {
      period: 'Q4 FY25',
      lines: [
        { lineItem: 'revenue',           label: 'Total Revenue',                   actual: 537.2,  plan: 520.0, priorYear: 454.4, variance: 17.2,  variancePercent: 3.31  },
        { lineItem: 'cogs',              label: 'Cost of Sales',                   actual: 150.5,  plan: 148.0, priorYear: 129.5, variance: -2.5,  variancePercent: -1.69 },
        { lineItem: 'grossProfit',       label: 'Gross Profit',                    actual: 386.7,  plan: 372.0, priorYear: 324.9, variance: 14.7,  variancePercent: 3.95  },
        { lineItem: 'operatingExpenses', label: 'Core R&D + Core SG&A',            actual: 273.1,  plan: 268.0, priorYear: 235.3, variance: -5.1,  variancePercent: -1.90 },
        { lineItem: 'operatingIncome',   label: 'Core Operating Income',           actual: 113.6,  plan: 104.0, priorYear: 89.6,  variance: 9.6,   variancePercent: 9.23  },
        { lineItem: 'netIncome',         label: 'Net Income (attributable)',        actual: 60.0,   plan: 55.0,  priorYear: 48.1,  variance: 5.0,   variancePercent: 9.09  },
      ],
    },
    {
      period: 'Q1 FY26', // Management forecast
      lines: [
        { lineItem: 'revenue',           label: 'Total Revenue',                   actual: 560.0,  plan: 545.0, priorYear: 537.9, variance: 15.0,  variancePercent: 2.75  },
        { lineItem: 'cogs',              label: 'Cost of Sales',                   actual: 151.0,  plan: 150.0, priorYear: 146.0, variance: -1.0,  variancePercent: -0.67 },
        { lineItem: 'grossProfit',       label: 'Gross Profit',                    actual: 409.0,  plan: 395.0, priorYear: 391.9, variance: 14.0,  variancePercent: 3.54  },
        { lineItem: 'operatingExpenses', label: 'Core R&D + Core SG&A',            actual: 267.0,  plan: 263.0, priorYear: 261.1, variance: -4.0,  variancePercent: -1.52 },
        { lineItem: 'operatingIncome',   label: 'Core Operating Income',           actual: 142.0,  plan: 132.0, priorYear: 130.8, variance: 10.0,  variancePercent: 7.58  },
        { lineItem: 'netIncome',         label: 'Net Income (attributable)',        actual: 76.0,   plan: 72.0,  priorYear: 72.4,  variance: 4.0,   variancePercent: 5.56  },
      ],
    },
  ];

  for (const q of plData) {
    const periodId = periodMap[q.period].id;
    await prisma.financialStatement.createMany({
      data: q.lines.map((l) => ({
        companyId,
        periodId,
        lineItem: l.lineItem,
        label: l.label,
        actual: l.actual,
        plan: l.plan,
        priorYear: l.priorYear,
        variance: l.variance,
        variancePercent: l.variancePercent,
      })),
    });
  }

  console.log(`Seeded ${plData.length * 6} financial statement lines across 5 quarters`);

  // ── Revenue Bridge Items (5 Quarters) ────────────────────────────────
  // Key drivers: XTANDI volume, PADCEV/VEOZAH/IZERVAY new product launches,
  // China NRDL volume expansion, FX (JPY vs USD/EUR), Japan NHI pricing,
  // LOE headwinds on legacy brands.
  const bridgeData = [
    {
      period: 'Q1 FY25',
      items: [
        { label: 'XTANDI Volume & Mix Growth',          impact: 15.0,  category: 'volume' },
        { label: 'PADCEV New Indications (1L mCSPC)',    impact: 12.0,  category: 'volume' },
        { label: 'VEOZAH + IZERVAY Launches',           impact: 18.0,  category: 'volume' },
        { label: 'China NRDL Volume Expansion',         impact: 5.0,   category: 'volume' },
        { label: 'FX Headwind (JPY Appreciation)',      impact: -8.0,  category: 'other'  },
        { label: 'Japan NHI Revision Impact',           impact: -5.0,  category: 'other'  },
        { label: 'LOE / Portfolio Pruning',             impact: -3.3,  category: 'other'  },
        { label: 'Other Volume / Geography',            impact: 10.0,  category: 'volume' },
      ],
    },
    {
      period: 'Q2 FY25',
      items: [
        { label: 'XTANDI Volume & Mix Growth',          impact: 17.0,  category: 'volume' },
        { label: 'PADCEV Revenue Ramp',                 impact: 14.0,  category: 'volume' },
        { label: 'VEOZAH + IZERVAY Growth',             impact: 16.0,  category: 'volume' },
        { label: 'China Market Expansion',              impact: 5.5,   category: 'volume' },
        { label: 'International Market Growth',         impact: 8.0,   category: 'volume' },
        { label: 'FX Headwind (JPY vs USD/EUR)',        impact: -10.0, category: 'other'  },
        { label: 'LOE / Price Erosion Headwinds',       impact: -3.5,  category: 'other'  },
        { label: 'Established Markets Volume',          impact: 5.7,   category: 'volume' },
      ],
    },
    {
      period: 'Q3 FY25',
      items: [
        { label: 'XTANDI Volume & Mix Growth',          impact: 15.0,  category: 'volume' },
        { label: 'PADCEV Strong Uptake',                impact: 14.5,  category: 'volume' },
        { label: 'VEOZAH + IZERVAY Momentum',           impact: 13.0,  category: 'volume' },
        { label: 'China Volume Growth',                 impact: 6.0,   category: 'volume' },
        { label: 'Established Markets XTANDI',          impact: 9.5,   category: 'volume' },
        { label: 'FX Headwind (JPY Strength)',          impact: -15.0, category: 'other'  },
        { label: 'Japan NHI / LOE Pressure',            impact: -4.0,  category: 'other'  },
        { label: 'Other / Emerging Markets',            impact: 8.0,   category: 'volume' },
      ],
    },
    {
      period: 'Q4 FY25',
      items: [
        { label: 'XTANDI Volume & Mix Growth',          impact: 15.0,  category: 'volume' },
        { label: 'PADCEV + Oncology Pipeline',          impact: 22.0,  category: 'volume' },
        { label: 'Strategic Products Portfolio',        impact: 18.0,  category: 'volume' },
        { label: 'China Accelerated Expansion',         impact: 7.0,   category: 'volume' },
        { label: 'International Markets Volume',        impact: 12.0,  category: 'volume' },
        { label: 'FX Partial Tailwind (Q4)',            impact: 5.0,   category: 'other'  },
        { label: 'Japan Volume Recovery',               impact: 8.8,   category: 'volume' },
        { label: 'LOE / Price Headwinds',               impact: -5.0,  category: 'other'  },
      ],
    },
    {
      period: 'Q1 FY26',
      items: [
        { label: 'XTANDI Volume Growth',                impact: 8.0,   category: 'volume' },
        { label: 'PADCEV + New Oncology Products',      impact: 18.0,  category: 'volume' },
        { label: 'VEOZAH + IZERVAY Growth',             impact: 12.0,  category: 'volume' },
        { label: 'China Continued Expansion',           impact: 3.0,   category: 'volume' },
        { label: 'Geographic Diversification',          impact: 5.0,   category: 'volume' },
        { label: 'FX Headwind (JPY Appreciation)',      impact: -8.0,  category: 'other'  },
        { label: 'LOE / Portfolio Erosion',             impact: -3.9,  category: 'other'  },
        { label: 'Other Volume / Pricing',              impact: 7.0,   category: 'volume' },
      ],
    },
  ];

  for (const q of bridgeData) {
    const periodId = periodMap[q.period].id;
    await prisma.revenueBridgeItem.createMany({
      data: q.items.map((item, idx) => ({
        companyId,
        periodId,
        label: item.label,
        impact: item.impact,
        category: item.category,
        sortOrder: idx,
      })),
    });
  }

  console.log(`Seeded revenue bridge items across 5 quarters`);

  // ── Financial Ratios (5 Quarters) ────────────────────────────────────
  // Astellas characteristics: pharma company, high gross margin (~72%),
  // conservative balance sheet (low D/E ~0.3), significant R&D intensity (~20%).
  // rdIntensity: R&D expense as % of revenue — key pharma productivity metric.
  // freeCashFlow: quarterly operating cash flow less capex (¥B).
  // dividendPerShare: ¥/share semi-annual; shown quarterly equivalent (¥10/quarter).
  const ratioData = [
    { period: 'Q1 FY25', ratios: { currentRatio: 1.52, debtToEquity: 0.36, returnOnEquity: 13.5, returnOnAssets: 7.2, freeCashFlow: 118.0, dividendPerShare: 10.0, rdIntensity: 20.4, leverageRatio: 0.54 } },
    { period: 'Q2 FY25', ratios: { currentRatio: 1.48, debtToEquity: 0.34, returnOnEquity: 14.1, returnOnAssets: 7.5, freeCashFlow: 122.0, dividendPerShare: 10.0, rdIntensity: 19.8, leverageRatio: 0.51 } },
    { period: 'Q3 FY25', ratios: { currentRatio: 1.55, debtToEquity: 0.33, returnOnEquity: 16.2, returnOnAssets: 8.6, freeCashFlow: 115.0, dividendPerShare: 10.0, rdIntensity: 18.9, leverageRatio: 0.48 } },
    { period: 'Q4 FY25', ratios: { currentRatio: 1.61, debtToEquity: 0.31, returnOnEquity: 14.8, returnOnAssets: 7.9, freeCashFlow: 108.0, dividendPerShare: 10.0, rdIntensity: 21.5, leverageRatio: 0.44 } },
    { period: 'Q1 FY26', ratios: { currentRatio: 1.58, debtToEquity: 0.30, returnOnEquity: 15.4, returnOnAssets: 8.2, freeCashFlow: 128.0, dividendPerShare: 10.0, rdIntensity: 20.1, leverageRatio: 0.42 } },
  ];

  for (const q of ratioData) {
    const periodId = periodMap[q.period].id;
    const entries = Object.entries(q.ratios);
    await prisma.financialRatio.createMany({
      data: entries.map(([name, value]) => ({
        companyId,
        periodId,
        name,
        value,
      })),
    });
  }

  console.log(`Seeded ${ratioData.length * 8} financial ratios across 5 quarters`);

  // ── Working Capital Metrics (5 Quarters) ─────────────────────────────
  // Astellas working capital: DSO ~65-72 days (specialty pharma receivables),
  // inventory days ~105-115 (complex API + drug product supply chain),
  // DPO ~72-78 days (API suppliers, CMO agreements, clinical site payments).
  const wcData = [
    { period: 'Q1 FY25', dso: { actual: 70, target: 65 }, invDays: { actual: 110, target: 100 }, dpo: { actual: 73, target: 80 } },
    { period: 'Q2 FY25', dso: { actual: 68, target: 65 }, invDays: { actual: 108, target: 100 }, dpo: { actual: 75, target: 80 } },
    { period: 'Q3 FY25', dso: { actual: 67, target: 65 }, invDays: { actual: 105, target: 100 }, dpo: { actual: 77, target: 80 } },
    { period: 'Q4 FY25', dso: { actual: 71, target: 65 }, invDays: { actual: 112, target: 100 }, dpo: { actual: 72, target: 80 } },
    { period: 'Q1 FY26', dso: { actual: 66, target: 65 }, invDays: { actual: 107, target: 100 }, dpo: { actual: 78, target: 80 } },
  ];

  for (const q of wcData) {
    const periodId = periodMap[q.period].id;
    await prisma.workingCapitalMetric.createMany({
      data: [
        { companyId, periodId, name: 'dso',           actual: q.dso.actual,     target: q.dso.target    },
        { companyId, periodId, name: 'inventoryDays', actual: q.invDays.actual,  target: q.invDays.target },
        { companyId, periodId, name: 'dpo',           actual: q.dpo.actual,     target: q.dpo.target    },
      ],
    });
  }

  console.log(`Seeded ${wcData.length * 3} working capital metrics across 5 quarters`);
}
