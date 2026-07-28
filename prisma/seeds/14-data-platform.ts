import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed Data Platform: Data Sources, Data Flows, DQ Checks, MDM Entities
// Layer 1 (Data Inputs) + Layer 2 (Finance Data Lake)
// Astellas Pharma Inc. (TSE: 4503 / OTC: ALPMY) — Finance360 platform
// =============================================================================

export async function seedDataPlatform(prisma: PrismaClient, companyId: number) {
  // ── Layer 1: Data Sources ──────────────────────────────────────────────

  console.log('  Seeding data sources...');

  const sources = await Promise.all([
    prisma.dataSource.create({
      data: {
        companyId,
        externalId: 'sap-s4hana',
        name: 'SAP S/4HANA (Finance & Accounting)',
        type: 'ERP',
        category: 'Financial',
        description: 'Core financial system for Astellas Pharma Inc. Covers ¥2,139.2B annual revenue (FY2025), JPY-denominated primary reporting currency with April-March fiscal year convention. Manages five geographic segments: US, Established Markets (EM), Japan, International, and China. Source of record for consolidated P&L, balance sheet, Core Operating Profit (¥555.7B FY2025, 26.0% margin), General Ledger, Accounts Payable, Accounts Receivable, and segment cost allocation. Tracks amortisation of intangible assets (acquired product rights), R&D expense, and Pfizer PADCEV co-promotion expense splits. FX translation to JPY from USD, EUR, CNY, and GBP is applied at average period rates. Source for Core EPS calculation (¥237.01 FY2025) and FX sensitivity modelling (+¥1 USD/JPY = +¥2.1B revenue).',
        connectionType: 'Direct API',
        refreshFrequency: 'Daily',
        lastSyncAt: '2025-08-17T06:00:00Z',
        status: 'active',
        recordCount: 3200000,
        owner: 'Finance IT',
      },
    }),
    prisma.dataSource.create({
      data: {
        companyId,
        externalId: 'veeva-crm',
        name: 'Veeva CRM (Pharmaceutical Sales Operations)',
        type: 'CRM',
        category: 'Operational',
        description: 'Veeva CRM platform for Astellas pharmaceutical sales operations. Tracks US oncology and urology sales force activity across XTANDI (enzalutamide), PADCEV (enfortumab vedotin-ejfv), IZERVAY (avacincaptad pegol), XOSPATA (gilteritinib), VYLOY (zolbetuximab), and VEOZAH (fezolinetant). Manages Pfizer PADCEV co-promotion contact data, managed care account targeting, key account management (KAM) activity for payer and GPO accounts, and territory-level rep call coverage. Feeds sales force effectiveness KPIs, XTANDI call share vs PADCEV first-line urothelial carcinoma ramp, IZERVAY ophthalmologist engagement for geographic atrophy launch support, and VYLOY oncology HCP targeting. Data partitioned by therapeutic area (oncology, urology, women\'s health) and brand.',
        connectionType: 'Direct API',
        refreshFrequency: 'Daily',
        lastSyncAt: '2025-08-17T07:30:00Z',
        status: 'active',
        recordCount: 8500000,
        owner: 'Commercial Operations IT',
      },
    }),
    prisma.dataSource.create({
      data: {
        companyId,
        externalId: 'jnda-pmda-regulatory',
        name: 'PMDA / FDA / EMA Regulatory Submissions Platform',
        type: 'Regulatory',
        category: 'Operational',
        description: 'Regulatory submission tracking system integrating PMDA (Japan Pharmaceuticals and Medical Devices Agency), FDA (US Food and Drug Administration), EMA (European Medicines Agency), and CFDA (China National Medical Products Administration) filing status. Monitors drug approval timelines, label updates, and post-marketing commitment tracking for all Astellas marketed products. Tracks IRA (Inflation Reduction Act) data for XTANDI — CMS Medicare Drug Price Negotiation Program (MPCP) timeline, XTANDI Medicare Part D utilisation data, and CMS MPCP filing deadlines. Monitors CFDA submissions for VYLOY and IZERVAY China expansion programmes. Feeds regulatory risk register, IRA price negotiation risk quantification, and approval milestone tracking across 30+ regulatory submissions globally.',
        connectionType: 'File Upload',
        refreshFrequency: 'Weekly',
        lastSyncAt: '2025-08-11T00:00:00Z',
        status: 'active',
        recordCount: 125000,
        owner: 'Regulatory Affairs IT',
      },
    }),
    prisma.dataSource.create({
      data: {
        companyId,
        externalId: 'clinical-trials-platform',
        name: 'Clinical Trial Management System (CTMS)',
        type: 'Operational',
        category: 'Operational',
        description: 'Enterprise clinical trial management system covering Astellas\' portfolio of 30+ active development programmes. Tracks Phase 1, 2, and 3 trials across oncology, urology, and immunology therapeutic areas. Key Phase 3 programmes: PADCEV EV-302 (urothelial carcinoma, enfortumab vedotin + pembrolizumab first-line UC), IZERVAY GATHER3 (geographic atrophy next indication), VYLOY GLOW2 (advanced gastric cancer expansion), and VEOZAH long-term safety extension. Manages 500+ global investigator sites, patient enrollment timelines, interim analysis milestones, and POC (proof-of-concept) programme portfolio management. Integrates regulatory submission data (PMDA, FDA, EMA) for milestone tracking. Feeds pipeline progression KPIs, Phase 3 milestone dates, POC programme advancement rates, and R&D investment efficiency metrics.',
        connectionType: 'Batch ETL',
        refreshFrequency: 'Daily',
        lastSyncAt: '2025-08-17T05:00:00Z',
        status: 'active',
        recordCount: 2400000,
        owner: 'R&D IT / Medical Affairs',
      },
    }),
    prisma.dataSource.create({
      data: {
        companyId,
        externalId: 'ims-health-rx-data',
        name: 'IQVIA / IMS Health Market Data',
        type: '3rd Party',
        category: 'Market',
        description: 'IQVIA (formerly IMS Health) market data subscription covering US and global pharmaceutical prescription data. Key datasets: XTANDI market share in US metastatic castration-resistant prostate cancer (mCRPC) and non-metastatic CRPC (nmCRPC) — primary driver of ¥960.8B FY2025 revenue (+5.3% YoY). PADCEV US urothelial carcinoma (UC) market share vs competitors — ¥221.2B FY2025 (+34.8%). IZERVAY geographic atrophy (GA) market share vs Syfovre (Apellis) — ¥77.6B FY2025 (+226%). VYLOY and VEOZAH launch tracking data by channel. Prostate cancer market volume growth rates and competitive share dynamics across five geographic segments. Used for XTANDI IRA impact simulation: +1pp price reduction → -¥9.6B revenue sensitivity.',
        connectionType: 'Direct API',
        refreshFrequency: 'Monthly',
        lastSyncAt: '2025-08-01T00:00:00Z',
        status: 'active',
        recordCount: 18000000,
        owner: 'Market Analytics',
      },
    }),
    prisma.dataSource.create({
      data: {
        companyId,
        externalId: 'cms-ira-negotiation',
        name: 'CMS IRA Drug Price Negotiation Data Feed',
        type: 'Regulatory',
        category: 'Financial',
        description: 'CMS (Centers for Medicare & Medicaid Services) data feeds for IRA (Inflation Reduction Act) Medicare Drug Price Negotiation Program (MPCP). Tracks XTANDI negotiation timeline — CMS MPCP list status, negotiation timetable, and Maximum Fair Price (MFP) calculation inputs including Medicare Part D utilisation volumes. Provides CMS MPCP filing deadline calendar, IRA small molecule exclusivity clock data, and Medicare Part D XTANDI dispensing volume breakdown (used to size IRA revenue impact: +1pp price cut → -¥9.6B). Also tracks VYLOY and future products\' CMS Part B utilisation data. Feeds IRA risk quantification models, revenue downside scenario analysis across base/bear/bull cases, and regulatory compliance milestone tracking for CFO and investor disclosure.',
        connectionType: 'File Upload',
        refreshFrequency: 'Monthly',
        lastSyncAt: '2025-08-01T00:00:00Z',
        status: 'active',
        recordCount: 450000,
        owner: 'Government Affairs Finance',
      },
    }),
    prisma.dataSource.create({
      data: {
        companyId,
        externalId: 'bloomberg-market',
        name: 'Bloomberg / Market Data',
        type: '3rd Party',
        category: 'Market',
        description: 'Real-time and historical market data for ALPMY equity price (OTC: ALPMY / TSE: 4503), pharma peer comparisons (MRK, AZN, JNJ, BMY, NVS, PFE), and FX rates. Primary FX: USD/JPY (¥151 planning baseline; Q1 FY25 average ¥152, Q2 FY25 average ¥150). Tracks ALPMY ADR premium/discount vs TSE-listed share price. Pharma peer benchmarking: oncology revenue multiples, prostate cancer franchise comps (MRK enzalutamide market, AZN olaparib), and Strategic Brands growth comps (BMY Eliquis, NVS Cosentyx). Feeds competitive benchmarking, relative ALPMY valuation, FX sensitivity dashboard (+¥1 USD/JPY = +¥2.1B revenue translation), and analyst consensus Core EPS tracking vs FY2026 guidance ¥256.77.',
        connectionType: 'Direct API',
        refreshFrequency: 'Real-time',
        lastSyncAt: '2025-08-17T07:00:00Z',
        status: 'active',
        recordCount: 1200000,
        owner: 'Treasury / Investor Relations',
      },
    }),
    prisma.dataSource.create({
      data: {
        companyId,
        externalId: 'pfizer-copromote',
        name: 'Pfizer PADCEV Co-Promotion Data System',
        type: 'Operational',
        category: 'Financial',
        description: 'Data system managing the Astellas–Pfizer PADCEV (enfortumab vedotin-ejfv) co-promotion agreement for the US market. Tracks US PADCEV gross sales split between Astellas and Pfizer, shared marketing expense allocations, gross-to-net adjustments (rebates, chargebacks, co-pay assistance), joint MSL (Medical Science Liaison) activity records, and PADCEV net revenue attribution for Astellas segment reporting. PADCEV FY2025 revenue ¥221.2B (+34.8% YoY) driven by EV-302 Phase 3 first-line UC approval data. Pfizer co-promotion covers US oncology sales forces with joint PADCEV promotion in urothelial carcinoma. Feeds PADCEV revenue reconciliation (Astellas share vs total partnership gross sales), co-promotion cost sharing P&L, and PADCEV royalty/profit-share calculations under collaboration agreement.',
        connectionType: 'Batch ETL',
        refreshFrequency: 'Monthly',
        lastSyncAt: '2025-08-01T04:00:00Z',
        status: 'active',
        recordCount: 3200000,
        owner: 'Alliance Management / Commercial Finance',
      },
    }),
    prisma.dataSource.create({
      data: {
        companyId,
        externalId: 'smt-program-office',
        name: 'SMT Programme Management Office (PMO)',
        type: 'Operational',
        category: 'Financial',
        description: 'Sustainable Margin Transformation (SMT) programme management data system. Tracks initiative-level savings delivery across all SMT workstreams: procurement/COGS efficiency, SG&A optimisation (headcount rationalisation, vendor contracts, T&E), R&D operational efficiency, and manufacturing network rationalisation. FY2025 actual SMT savings: ¥21B (vs ¥18B original plan — ¥3B ahead). FY2026 target: ¥40B SMT savings. Cumulative FY2025–FY2030 target: ¥65B+. Tracks initiative-level milestones, savings attribution by geography and function, and realised vs plan variance by workstream. Sensitivity: +¥1B SMT savings → +¥1B Core OP direct flow-through. Feeds SMT dashboard KPIs, Core OP bridge attribution, and long-range planning cost efficiency assumptions.',
        connectionType: 'Direct API',
        refreshFrequency: 'Weekly',
        lastSyncAt: '2025-08-15T06:00:00Z',
        status: 'active',
        recordCount: 85000,
        owner: 'SMT Programme Office / Strategy Finance',
      },
    }),
    prisma.dataSource.create({
      data: {
        companyId,
        externalId: 'geo-segmental-erp',
        name: 'Geographic Segment Reporting (ERP)',
        type: 'ERP',
        category: 'Financial',
        description: 'Geographic segment reporting module integrated with SAP S/4HANA, providing local-currency and JPY-translated financial results for Astellas\' five reportable geographic segments: (1) US — XTANDI primary market, PADCEV, IZERVAY; (2) Established Markets (EM) — Europe, Canada, Australia; (3) Japan — domestic JPY-denominated operations; (4) International — Latin America, Middle East, Southeast Asia; (5) China — VYLOY launch market (Q2 FY25 forecast ¥52.5B, +33% growth Q4 FY25). FX translation rates applied per period: USD/JPY, EUR/JPY, CNY/JPY, GBP/JPY at quarterly averages. China sensitivity: +1pp growth → +¥1.0B revenue. Feeds geographic revenue mix reporting, FX translation impact analysis, local-currency growth decomposition, and segment profitability analytics by geography.',
        connectionType: 'Batch ETL',
        refreshFrequency: 'Daily',
        lastSyncAt: '2025-08-17T05:30:00Z',
        status: 'active',
        recordCount: 1850000,
        owner: 'Global Finance / FP&A',
      },
    }),
  ]);

  console.log(`  Created ${sources.length} data sources`);

  // ── Layer 2: Data Flows (Bronze → Silver → Gold) ────────────────────

  console.log('  Seeding data flows...');

  const sourceMap: Record<string, number> = {};
  for (const s of sources) {
    sourceMap[s.externalId] = s.id;
  }

  const flowData = [
    // SAP S/4HANA flows
    { sourceId: sourceMap['sap-s4hana'], targetLayer: 'bronze', targetEntity: 'raw_gl_transactions', transformations: ['Extract via SAP OData REST API', 'Load to landing zone as-is', 'Partition by company code and geographic segment (US, EM, Japan, International, China)'], recordsProcessed: 3200000, recordsRejected: 0, avgLatencyMs: 52000 },
    { sourceId: sourceMap['sap-s4hana'], targetLayer: 'silver', targetEntity: 'cleansed_financials', transformations: ['Deduplicate journal entries', 'Validate against Astellas Global Chart of Accounts', 'Apply FX translation (USD, EUR, CNY, GBP → JPY at average period rates)', 'Apply April-March fiscal period mapping (Astellas FY convention)', 'Segment allocation (US / EM / Japan / International / China / Corporate)', 'Amortisation of acquired product rights and R&D capitalisation', 'Pfizer PADCEV co-promotion expense split reconciliation', 'Intercompany elimination across five geographic entities'], recordsProcessed: 3188000, recordsRejected: 12000, avgLatencyMs: 185000 },
    { sourceId: sourceMap['sap-s4hana'], targetLayer: 'gold', targetEntity: 'financial_statements', transformations: ['Aggregate by line item and period', 'Calculate variances vs plan and prior year', 'Generate P&L summary by geographic segment (US, EM, Japan, International, China)', 'Compute consolidated revenue (¥537.9B Q1 FY25) and Core OP (¥130.8B Q1 FY25)', 'Generate Core EPS from Core OP after tax and share count'], recordsProcessed: 480, recordsRejected: 0, avgLatencyMs: 11000 },
    { sourceId: sourceMap['sap-s4hana'], targetLayer: 'gold', targetEntity: 'financial_ratios', transformations: ['Calculate Core OP margin (Core OP ÷ Revenue; FY2025: 26.0%)', 'Compute FX translation sensitivity (+¥1 USD/JPY = +¥2.1B revenue)', 'Derive Core EPS from Core OP after effective tax rate and diluted share count', 'Compute YoY growth rates by segment and product line (FY2025 total +11.9%)'], recordsProcessed: 48, recordsRejected: 0, avgLatencyMs: 5000 },

    // Veeva CRM flows
    { sourceId: sourceMap['veeva-crm'], targetLayer: 'bronze', targetEntity: 'raw_crm_activity', transformations: ['Extract sales rep call and activity records via Veeva API', 'Partition by brand (XTANDI, PADCEV, IZERVAY, XOSPATA, VYLOY, VEOZAH), territory, and date'], recordsProcessed: 8500000, recordsRejected: 0, avgLatencyMs: 42000 },
    { sourceId: sourceMap['veeva-crm'], targetLayer: 'silver', targetEntity: 'cleansed_crm_data', transformations: ['Deduplicate sales rep activity records', 'Classify Pfizer vs Astellas rep activity for PADCEV co-promotion split', 'Apply managed care account and GPO segment tagging', 'Validate HCP-level call data against prescriber registry', 'Calculate call frequency and share of voice by brand and territory', 'Mask physician PII per Sunshine Act and applicable compliance requirements'], recordsProcessed: 8485000, recordsRejected: 15000, avgLatencyMs: 165000 },
    { sourceId: sourceMap['veeva-crm'], targetLayer: 'gold', targetEntity: 'kpi_values', transformations: ['Calculate XTANDI and PADCEV sales force call coverage rates by territory', 'Compute PADCEV Pfizer co-promotion activity split vs Astellas-only rep calls', 'Derive IZERVAY ophthalmology specialist engagement rate (geographic atrophy launch)', 'Generate sales force effectiveness KPIs by brand and geographic region'], recordsProcessed: 32, recordsRejected: 0, avgLatencyMs: 6000 },

    // PMDA/FDA/EMA Regulatory flows
    { sourceId: sourceMap['jnda-pmda-regulatory'], targetLayer: 'silver', targetEntity: 'cleansed_regulatory_data', transformations: ['Parse PMDA/FDA/EMA/CFDA submission status files', 'Map regulatory milestones to pipeline programme codes', 'Extract XTANDI CMS MPCP filing status and IRA negotiation timeline', 'Classify approval vs pending vs withdrawn regulatory events by market', 'Validate submission dates against CTMS milestone calendar'], recordsProcessed: 124500, recordsRejected: 500, avgLatencyMs: 28000 },
    { sourceId: sourceMap['jnda-pmda-regulatory'], targetLayer: 'gold', targetEntity: 'kpi_values', transformations: ['Calculate pending regulatory approvals by programme across 30+ submissions', 'Compute IRA negotiation timeline risk flags for XTANDI CMS MPCP', 'Derive approval-to-launch conversion rate by therapeutic area (oncology, urology, ophthalmology)', 'Generate regulatory filing completeness score by market (Japan, US, EU, China)'], recordsProcessed: 14, recordsRejected: 0, avgLatencyMs: 3500 },

    // Clinical Trials Platform flows
    { sourceId: sourceMap['clinical-trials-platform'], targetLayer: 'bronze', targetEntity: 'raw_trial_data', transformations: ['Extract clinical trial records via CTMS REST API', 'Partition by programme, phase, therapeutic area, and investigator site'], recordsProcessed: 2400000, recordsRejected: 0, avgLatencyMs: 32000 },
    { sourceId: sourceMap['clinical-trials-platform'], targetLayer: 'silver', targetEntity: 'cleansed_trial_data', transformations: ['Deduplicate patient enrollment records across multi-site trials', 'Validate enrollment vs target per protocol and trial version', 'Apply POC programme classification (Phase 1 early signal / Phase 2 / Phase 3)', 'Flag interim analysis milestone dates for dashboard alerting', 'Calculate site activation rates (target: 500+ active global sites FY25)', 'Pseudonymise patient identifiers per GCP ICH E6 R2 and regional regulations'], recordsProcessed: 2392000, recordsRejected: 8000, avgLatencyMs: 145000 },
    { sourceId: sourceMap['clinical-trials-platform'], targetLayer: 'gold', targetEntity: 'kpi_values', transformations: ['Calculate POC programme advancement rate (Phase 1 → 2 → 3 transitions)', 'Compute Phase 3 enrollment completion % vs target by programme (EV-302, GATHER3, GLOW2)', 'Derive R&D productivity index (NME approvals per ¥100B R&D investment)', 'Generate pipeline milestone calendar for investor disclosure and R&D Day preparation'], recordsProcessed: 18, recordsRejected: 0, avgLatencyMs: 4000 },

    // IQVIA/IMS Health flows
    { sourceId: sourceMap['ims-health-rx-data'], targetLayer: 'bronze', targetEntity: 'raw_iqvia_data', transformations: ['Ingest IQVIA NSP/NPA prescription data via monthly file transfer', 'Partition by therapeutic area (oncology, urology, ophthalmology, women\'s health), product, and geography'], recordsProcessed: 18000000, recordsRejected: 0, avgLatencyMs: 38000 },
    { sourceId: sourceMap['ims-health-rx-data'], targetLayer: 'silver', targetEntity: 'cleansed_market_data', transformations: ['Validate IQVIA prescription counts against internal Astellas demand data', 'Apply market definition for XTANDI (mCRPC + nmCRPC combined market)', 'Calculate PADCEV share in first-line urothelial carcinoma (EV-302 approval gain)', 'Compute IZERVAY share in geographic atrophy market vs Syfovre (Apellis) competitor', 'Apply VYLOY gastric cancer launch trajectory modelling vs analogous products', 'Reconcile IQVIA volumes to Astellas net sales within ±3% quarterly tolerance'], recordsProcessed: 17980000, recordsRejected: 20000, avgLatencyMs: 210000 },
    { sourceId: sourceMap['ims-health-rx-data'], targetLayer: 'gold', targetEntity: 'market_data', transformations: ['Calculate XTANDI US market share in mCRPC + nmCRPC combined market', 'Compute PADCEV urothelial carcinoma market share (first-line and second-line combined)', 'Derive IZERVAY geographic atrophy share vs Syfovre competitive benchmarks', 'Generate VYLOY gastric cancer launch curve trajectory vs plan'], recordsProcessed: 28, recordsRejected: 0, avgLatencyMs: 5000 },

    // CMS IRA Negotiation flows
    { sourceId: sourceMap['cms-ira-negotiation'], targetLayer: 'bronze', targetEntity: 'raw_ira_data', transformations: ['Ingest CMS MPCP files and Part D utilisation data via monthly file upload', 'Partition by drug (XTANDI, VYLOY), negotiation round, and Medicare Part D plan type'], recordsProcessed: 450000, recordsRejected: 0, avgLatencyMs: 8500 },
    { sourceId: sourceMap['cms-ira-negotiation'], targetLayer: 'silver', targetEntity: 'cleansed_ira_data', transformations: ['Map CMS XTANDI Medicare Part D utilisation to Astellas revenue attribution', 'Calculate IRA price impact scenarios (+1pp price cut → -¥9.6B revenue sensitivity)', 'Validate MFP negotiation timeline milestones vs CMS published calendar', 'Apply small-molecule exclusivity clock analysis for XTANDI IRA eligibility determination', 'Cross-reference XTANDI net price data vs MFP negotiation offer history'], recordsProcessed: 449000, recordsRejected: 1000, avgLatencyMs: 28000 },
    { sourceId: sourceMap['cms-ira-negotiation'], targetLayer: 'gold', targetEntity: 'kpi_values', transformations: ['Calculate XTANDI IRA revenue downside scenarios (base / bear / bull case over 3-year horizon)', 'Compute XTANDI Medicare Part D revenue as share of total XTANDI revenue (IRA exposure quantification)', 'Derive cumulative IRA impact trajectory for CFO and investor relations disclosure', 'Generate IRA timeline risk scorecard with milestone dates for CFO monitoring dashboard'], recordsProcessed: 12, recordsRejected: 0, avgLatencyMs: 3000 },

    // Bloomberg Market Data flows
    { sourceId: sourceMap['bloomberg-market'], targetLayer: 'bronze', targetEntity: 'raw_market_data', transformations: ['Fetch ALPMY ADR (OTC) and TSE 4503 equity price via Bloomberg API', 'Store with UTC timestamp, exchange session flag, and USD/JPY spot rate'], recordsProcessed: 1200000, recordsRejected: 0, avgLatencyMs: 2800 },
    { sourceId: sourceMap['bloomberg-market'], targetLayer: 'silver', targetEntity: 'cleansed_market', transformations: ['Validate ALPMY price against both OTC (US) and TSE (Japan) feeds for ADR premium/discount', 'Forward-fill missing data for Tokyo/US market session time gaps', 'Calculate rolling USD/JPY quarterly average for revenue translation modelling', 'Compute pharma peer (MRK, AZN, JNJ, BMY, NVS, PFE) EV/Revenue and P/E multiples from Bloomberg'], recordsProcessed: 1198500, recordsRejected: 1500, avgLatencyMs: 14000 },
    { sourceId: sourceMap['bloomberg-market'], targetLayer: 'gold', targetEntity: 'market_data', transformations: ['Calculate ALPMY P/E and EV/EBITDA vs pharma peers (MRK, AZN, JNJ, BMY, NVS, PFE)', 'Derive FX translation sensitivity model (+¥1 USD/JPY = +¥2.1B revenue, +¥0.43 Core EPS equivalent)', 'Generate ALPMY relative performance vs MSCI pharma index and Nikkei 225'], recordsProcessed: 40, recordsRejected: 0, avgLatencyMs: 5000 },

    // Pfizer Co-Promotion flows
    { sourceId: sourceMap['pfizer-copromote'], targetLayer: 'bronze', targetEntity: 'raw_copromote_data', transformations: ['Extract PADCEV co-promotion data via monthly batch file transfer from Pfizer', 'Partition by market (US co-promotion scope), sales channel, and co-promote reporting period'], recordsProcessed: 3200000, recordsRejected: 0, avgLatencyMs: 35000 },
    { sourceId: sourceMap['pfizer-copromote'], targetLayer: 'silver', targetEntity: 'cleansed_copromote_data', transformations: ['Reconcile Astellas vs Pfizer PADCEV gross sales split per collaboration agreement terms', 'Apply gross-to-net adjustments (rebates, chargebacks, co-pay assistance) by channel', 'Validate shared marketing expense allocations vs agreed cost-sharing ratios', 'Classify Pfizer-originating vs Astellas-originating PADCEV sales force calls', 'Reconcile PADCEV net revenues to SAP S/4HANA co-promotion payable/receivable balance', 'Mask counterparty pricing data per collaboration agreement confidentiality provisions'], recordsProcessed: 3196000, recordsRejected: 4000, avgLatencyMs: 128000 },
    { sourceId: sourceMap['pfizer-copromote'], targetLayer: 'gold', targetEntity: 'kpi_values', transformations: ['Calculate PADCEV net revenue (Astellas attributable share) from collaboration gross sales', 'Compute co-promotion cost ratio (shared marketing cost ÷ PADCEV net revenue)', 'Derive PADCEV YoY growth rate (¥221.2B FY2025, +34.8% YoY)', 'Generate PADCEV channel mix reporting (US co-promote vs ex-US Astellas standalone)'], recordsProcessed: 16, recordsRejected: 0, avgLatencyMs: 4000 },

    // SMT Programme Office flows
    { sourceId: sourceMap['smt-program-office'], targetLayer: 'bronze', targetEntity: 'raw_smt_data', transformations: ['Extract SMT initiative records via PMO system API', 'Partition by workstream (procurement, SG&A, R&D efficiency, manufacturing) and fiscal period'], recordsProcessed: 85000, recordsRejected: 0, avgLatencyMs: 4200 },
    { sourceId: sourceMap['smt-program-office'], targetLayer: 'silver', targetEntity: 'cleansed_smt_data', transformations: ['Reconcile initiative-level savings to SAP cost centre actuals by workstream', 'Validate SMT savings attribution (net of reinvestment) per FY2026 planning policy', 'Apply run-rate vs one-time savings classification for LRP modelling', 'Cross-check cumulative ¥21B FY2025 against initiative-level delivery records', 'Flag at-risk initiatives (plan vs forecast gap >¥1B) for CFO escalation review'], recordsProcessed: 84800, recordsRejected: 200, avgLatencyMs: 18000 },
    { sourceId: sourceMap['smt-program-office'], targetLayer: 'gold', targetEntity: 'kpi_values', transformations: ['Calculate SMT cumulative savings YTD vs ¥40B FY2026 annual target', 'Compute SMT savings quarterly pace and FY2026 full-year landing estimate', 'Derive Core OP bridge contribution from SMT programme (+¥1B savings = +¥1B Core OP)', 'Generate SMT workstream scorecard (procurement, SG&A, R&D efficiency, manufacturing)'], recordsProcessed: 14, recordsRejected: 0, avgLatencyMs: 2500 },

    // Geo-Segmental ERP flows
    { sourceId: sourceMap['geo-segmental-erp'], targetLayer: 'bronze', targetEntity: 'raw_segment_data', transformations: ['Extract geographic segment financial data via ERP reporting module', 'Partition by geographic segment (US, EM, Japan, International, China) and fiscal period'], recordsProcessed: 1850000, recordsRejected: 0, avgLatencyMs: 28000 },
    { sourceId: sourceMap['geo-segmental-erp'], targetLayer: 'silver', targetEntity: 'cleansed_segment_data', transformations: ['Apply quarterly average FX rates for USD, EUR, CNY, GBP → JPY translation', 'Decompose reported revenue into FX translation and local-currency growth components', 'Validate China revenue growth rate (+33% Q4 FY25 vs +25% plan) against VYLOY market data', 'Reconcile geographic segment totals to SAP GL consolidated revenue', 'Flag FX translation headwind/tailwind vs prior-year average rates by currency', 'Apply China VYLOY launch revenue attribution by SKU and distribution channel'], recordsProcessed: 1847000, recordsRejected: 3000, avgLatencyMs: 95000 },
    { sourceId: sourceMap['geo-segmental-erp'], targetLayer: 'gold', targetEntity: 'kpi_values', transformations: ['Calculate revenue by geographic segment in JPY and local currency', 'Compute FX translation impact vs prior year (total +¥2.1B per ¥1 USD/JPY move)', 'Derive local-currency growth rate by segment (US, EM, Japan, International, China)', 'Generate China growth sensitivity model (+1pp China growth = +¥1.0B revenue)'], recordsProcessed: 24, recordsRejected: 0, avgLatencyMs: 5000 },
  ];

  const flows = [];
  for (const fd of flowData) {
    const flow = await prisma.dataFlow.create({
      data: {
        companyId,
        sourceId: fd.sourceId,
        targetLayer: fd.targetLayer,
        targetEntity: fd.targetEntity,
        transformations: fd.transformations,
        lastRunAt: '2025-08-17T06:30:00Z',
        lastRunStatus: (fd as { lastRunStatus?: string }).lastRunStatus || 'success',
        recordsProcessed: fd.recordsProcessed,
        recordsRejected: fd.recordsRejected,
        avgLatencyMs: fd.avgLatencyMs,
      },
    });
    flows.push(flow);
  }

  console.log(`  Created ${flows.length} data flows`);

  // ── Layer 2: Data Quality Checks ───────────────────────────────────────

  console.log('  Seeding data quality checks...');

  const dqChecks = [
    // Revenue completeness and accuracy
    { checkName: 'Revenue by Geography Completeness', checkType: 'completeness', targetEntity: 'financial_statements', rule: 'All five geographic segments (US, EM, Japan, International, China) must have non-null revenue values for each quarter; consolidated total must equal sum of geographic segments ±¥0.1B; Q1 FY25 baseline ¥537.9B', status: 'pass', score: 100, totalRecords: 5, failedRecords: 0 },
    { checkName: 'Revenue Timing Completeness', checkType: 'timeliness', targetEntity: 'cleansed_financials', rule: 'SAP GL monthly close data must be available in silver layer within 3 business days of month-end close; quarterly consolidated revenue must reconcile to SAP trial balance within ¥0.1B before IR disclosure', status: 'pass', score: 99.4, totalRecords: 12, failedRecords: 0 },

    // XTANDI revenue validation
    { checkName: 'XTANDI Revenue Validation vs IQVIA', checkType: 'accuracy', targetEntity: 'kpi_values', rule: 'Astellas XTANDI net revenue must reconcile to IQVIA prescription volume × average net price within ±3%; Q1 FY25 actual ¥249.3B and Q2 FY25 ¥238.7B must be verifiable against US mCRPC + nmCRPC IQVIA demand data', status: 'pass', score: 99.2, totalRecords: 4, failedRecords: 0 },
    { checkName: 'XTANDI IRA Risk Data Freshness', checkType: 'timeliness', targetEntity: 'kpi_values', rule: 'CMS XTANDI MPCP negotiation status must be refreshed within 5 business days of any CMS publication; IRA timeline milestones must be current; XTANDI MFP negotiation status stale >30 days triggers escalation to CFO risk dashboard', status: 'pass', score: 100, totalRecords: 6, failedRecords: 0 },

    // Core metrics accuracy
    { checkName: 'Core OP Margin Calculation Accuracy', checkType: 'accuracy', targetEntity: 'financial_statements', rule: 'Core OP Margin = Core Operating Profit ÷ Revenue; FY2025 validation: ¥555.7B ÷ ¥2,139.2B = 26.0% ±0.1pp; quarterly checks must reconcile to SAP S/4HANA segment P&L within ¥0.1B; Q1 FY25: 24.3%, Q2 FY25: 25.8%', status: 'pass', score: 100, totalRecords: 6, failedRecords: 0 },
    { checkName: 'YoY Revenue Growth Calculation Accuracy', checkType: 'accuracy', targetEntity: 'quarterly_results', rule: 'YoY revenue growth = (current quarter - prior year quarter) ÷ prior year quarter × 100; FY2025 consolidated +11.9% must reconcile within ±0.1pp; XTANDI +5.3% and Strategic Brands +43% must be verifiable from segment data', status: 'pass', score: 100, totalRecords: 6, failedRecords: 0 },
    { checkName: 'Core EPS Bridge Balance Check', checkType: 'consistency', targetEntity: 'revenue_bridge_items', rule: 'Sum of Core EPS bridge items (XTANDI volume, Strategic Brands growth, SMT savings, FX translation, R&D investment, other) must equal actual Core EPS minus prior year ±¥0.5; FY25 bridge must reconcile to ¥237.01 Core EPS', status: 'pass', score: 100, totalRecords: 8, failedRecords: 0 },
    { checkName: 'Budget vs Actual Completeness', checkType: 'completeness', targetEntity: 'financial_statements', rule: 'All actual Core EPS, Revenue, and Core OP line items must have corresponding FY2026 budget/guidance values; annual guidance (¥256.77 Core EPS, ¥2,220B revenue, ¥620B Core OP) must be present for all top-level metrics', status: 'pass', score: 100, totalRecords: 52, failedRecords: 0 },

    // FX and geographic accuracy
    { checkName: 'FX Translation Completeness (5 Currencies)', checkType: 'completeness', targetEntity: 'financial_statements', rule: 'FX translation rates must be applied to all five currencies (USD, EUR, CNY, GBP; JPY is domestic) for each quarterly period; missing FX rates must trigger immediate alert; +¥1 USD/JPY sensitivity (+¥2.1B revenue) must be verifiable from segment data', status: 'pass', score: 100, totalRecords: 20, failedRecords: 0 },
    { checkName: 'China Revenue Local Currency Conversion', checkType: 'accuracy', targetEntity: 'cleansed_segment_data', rule: 'China revenue CNY → JPY conversion must use CNY/JPY average period rate from Bloomberg; reported CNY local-currency growth must be calculable separately from FX translation; Q4 FY25 China +33% growth must reconcile to VYLOY approval and market uptake data', status: 'pass', score: 99.8, totalRecords: 4, failedRecords: 0 },

    // Strategic Brands and product tracking
    { checkName: 'Strategic Brands Revenue Completeness', checkType: 'completeness', targetEntity: 'financial_statements', rule: 'Strategic Brands total (¥480.3B FY2025) must be calculable as sum of PADCEV + IZERVAY + VYLOY + VEOZAH + XOSPATA + other strategic products; no strategic brand product line may have missing quarterly revenue values', status: 'pass', score: 100, totalRecords: 6, failedRecords: 0 },
    { checkName: 'PADCEV Co-Promotion Revenue Reconciliation', checkType: 'accuracy', targetEntity: 'kpi_values', rule: 'PADCEV net revenue (Astellas share) must reconcile to Pfizer co-promotion gross sales via Astellas collaboration agreement split; gross-to-net adjustments must be consistent with channel mix and payer rebate rates within ±2% of expected range', status: 'pass', score: 99.7, totalRecords: 4, failedRecords: 0 },
    { checkName: 'IZERVAY Revenue Growth Validation', checkType: 'accuracy', targetEntity: 'kpi_values', rule: 'IZERVAY revenue growth (+226% FY2025 to ¥77.6B) must be consistent with IQVIA geographic atrophy market data and Syfovre competitive market share; quarterly IZERVAY revenue must reconcile to script-level IQVIA demand data within ±4%', status: 'pass', score: 99.5, totalRecords: 4, failedRecords: 0 },
    { checkName: 'VYLOY Launch Performance Tracking', checkType: 'completeness', targetEntity: 'kpi_values', rule: 'VYLOY quarterly revenue must be available for all quarters post-China approval; launch curve trajectory must be benchmarked against analogous gastric cancer launch data; China VYLOY contribution must be isolable from total China revenue', status: 'pass', score: 100, totalRecords: 3, failedRecords: 0 },

    // SMT savings validation
    { checkName: 'SMT Savings Attribution Validation', checkType: 'accuracy', targetEntity: 'kpi_values', rule: 'SMT savings must be attributable to specific initiatives in the PMO system; FY2025 ¥21B total must reconcile across workstreams (procurement, SG&A, R&D, manufacturing) within ¥0.2B; savings not attributable to PMO initiative codes must be flagged for Controller review', status: 'pass', score: 99.4, totalRecords: 42, failedRecords: 0 },
    { checkName: 'SMT Core OP Flow-Through Verification', checkType: 'consistency', targetEntity: 'kpi_values', rule: 'SMT savings contribution to Core OP must be calculable and directionally consistent; +¥1B SMT savings → +¥1B Core OP (direct flow-through); SMT savings must not be double-counted with underlying COGS and SG&A line item variances in segment P&L', status: 'pass', score: 100, totalRecords: 6, failedRecords: 0 },

    // Regulatory data freshness
    { checkName: 'PMDA/FDA Regulatory Filing Status Freshness', checkType: 'timeliness', targetEntity: 'kpi_values', rule: 'Regulatory submission status for all 30+ Astellas programmes must be updated within 5 business days of any agency action (PMDA, FDA, EMA, CFDA); approval milestones must feed pipeline KPI dashboard within 24 hours of agency communication', status: 'pass', score: 99.5, totalRecords: 32, failedRecords: 0 },

    // Market and equity data
    { checkName: 'ALPMY Equity Price Freshness', checkType: 'timeliness', targetEntity: 'market_data', rule: 'ALPMY ADR (OTC) price must be < 4 hours old during US market hours; TSE 4503 price must be refreshed post-Tokyo session close; stale price (>6 hours) blocks FX-adjusted peer benchmarking and investor relations dashboard update', status: 'pass', score: 100, totalRecords: 5, failedRecords: 0 },
    { checkName: 'Pharma Peer Benchmarking Data Freshness', checkType: 'timeliness', targetEntity: 'market_data', rule: 'MRK, AZN, JNJ, BMY, NVS, PFE financial metrics must reflect most recent quarterly earnings; revenue, EPS, and oncology segment data must be updated within 5 business days of each peer earnings release for competitive benchmarking accuracy', status: 'pass', score: 100, totalRecords: 6, failedRecords: 0 },

    // GxP and data compliance
    { checkName: 'Clinical Data GxP Compliance Check', checkType: 'validity', targetEntity: 'raw_trial_data', rule: 'All clinical trial data exported to Finance360 must comply with GxP (Good Clinical Practice) ICH E6 R2 guidelines; patient identifiers must be pseudonymised before analytics gold layer; CTMS data must contain only aggregate programme-level data with no patient-level PHI', status: 'pass', score: 100, totalRecords: 2400000, failedRecords: 0 },
    { checkName: 'IQVIA Market Data Reconciliation', checkType: 'validity', targetEntity: 'cleansed_market_data', rule: 'IQVIA prescription volume data must reconcile to Astellas net sales within ±3% quarterly; XTANDI IQVIA demand vs net sales variance must be explained by inventory stocking/destocking adjustments; persistent gap >5% triggers IQVIA data quality review', status: 'pass', score: 99.1, totalRecords: 18000000, failedRecords: 162000 },

    // KPI and driver checks
    { checkName: 'KPI Trend Consistency', checkType: 'consistency', targetEntity: 'kpi_values', rule: 'Trend direction must match sign of trendValue percentage; flat trend requires trendValue within ±0.5pp; XTANDI quarterly trend must be consistent with IRA risk narrative and IQVIA market share data; Strategic Brands trend must reflect PADCEV/IZERVAY/VYLOY ramp trajectories', status: 'warn', score: 95.3, totalRecords: 72, failedRecords: 4, details: '4 KPIs have mismatched trend direction — XTANDI Q4 FY25 seasonality pattern (Q4 typically lower than Q3), IZERVAY coverage-expansion lag, and 2 China regional sub-metrics pending VYLOY approval reclassification' },
    { checkName: 'Driver Metric Coverage', checkType: 'completeness', targetEntity: 'driver_metrics', rule: 'All leaf-level Finance360 drivers must have at least one metric value with current and target populated; drivers without values cannot appear in the strategy console; IRA risk and SMT savings drivers require current and scenario values', status: 'warn', score: 92.5, totalRecords: 185, failedRecords: 14, details: '14 leaf drivers in China geographic sub-tree (VYLOY city-level launch data) and regulatory filing sub-tree (CFDA-specific milestones) do not yet have current metric values populated' },
  ];

  await prisma.dataQualityCheck.createMany({
    data: dqChecks.map((dq) => ({
      companyId,
      flowId: null,
      checkName: dq.checkName,
      checkType: dq.checkType,
      targetEntity: dq.targetEntity,
      rule: dq.rule,
      status: dq.status,
      score: dq.score,
      lastRunAt: '2025-08-17T07:00:00Z',
      failedRecords: dq.failedRecords,
      totalRecords: dq.totalRecords,
      details: dq.details || '',
    })),
  });

  console.log(`  Created ${dqChecks.length} data quality checks`);

  // ── Layer 2: Master Data Management ────────────────────────────────────

  console.log('  Seeding master data entities...');

  await prisma.masterDataEntity.createMany({
    data: [
      {
        companyId,
        domain: 'Astellas Global Chart of Accounts',
        entityCount: 4200,
        lastUpdated: '2025-04-01T00:00:00Z',
        steward: 'Corporate Controller / Global Finance',
        goldenRecordPct: 99.6,
        duplicateCount: 17,
        status: 'active',
      },
      {
        companyId,
        domain: 'Product Registry (XTANDI, PADCEV, IZERVAY, XOSPATA, VYLOY, VEOZAH)',
        entityCount: 6,
        lastUpdated: '2025-08-01T00:00:00Z',
        steward: 'Commercial Finance / Product Management',
        goldenRecordPct: 100.0,
        duplicateCount: 0,
        status: 'active',
      },
      {
        companyId,
        domain: 'Geographic Market Registry (5 Segments)',
        entityCount: 5,
        lastUpdated: '2025-04-01T00:00:00Z',
        steward: 'Global Finance / FP&A',
        goldenRecordPct: 100.0,
        duplicateCount: 0,
        status: 'active',
      },
      {
        companyId,
        domain: 'Clinical Trial Registry',
        entityCount: 32,
        lastUpdated: '2025-08-10T00:00:00Z',
        steward: 'R&D IT / Clinical Operations',
        goldenRecordPct: 99.9,
        duplicateCount: 0,
        status: 'active',
      },
      {
        companyId,
        domain: 'Partner & Co-Promotion Registry',
        entityCount: 12,
        lastUpdated: '2025-07-15T00:00:00Z',
        steward: 'Alliance Management',
        goldenRecordPct: 100.0,
        duplicateCount: 0,
        status: 'active',
      },
      {
        companyId,
        domain: 'Regulatory Filing Registry (PMDA / FDA / EMA / CFDA)',
        entityCount: 38,
        lastUpdated: '2025-08-11T00:00:00Z',
        steward: 'Regulatory Affairs IT',
        goldenRecordPct: 99.7,
        duplicateCount: 1,
        status: 'active',
      },
    ],
  });

  console.log('  Created 6 master data entities');
  console.log('Data Platform seed complete');
}
