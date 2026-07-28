import type { AIResponse } from './search-types';

// ── AI Response Generator ──────────────────────────────────────────────────────

/**
 * @deprecated Use the AI Chat panel (/api/chat) powered by Vercel AI SDK instead.
 * This function returns hardcoded responses and will be removed in a future release.
 * The AI Chat panel provides real-time, context-aware responses from the database.
 */
export const generateAIResponse = (query: string): AIResponse => {
    const lowerQuery = query.toLowerCase();

    // Market share related queries
    if (lowerQuery.includes('market share') || lowerQuery.includes('losing share') || lowerQuery.includes('erleada') || lowerQuery.includes('lynparza')) {
        return {
            summary: 'Astellas XTANDI US prostate cancer market share ~40%; stable amid ERLEADA (apalutamide) and LYNPARZA (olaparib) competition across nmCSPC and BRCA-selected populations',
            keyFindings: [
                {
                    title: 'Primary Driver: ERLEADA nmCSPC Competition',
                    detail: 'J&J/Pfizer ERLEADA expanding nmCSPC label penetration, creating competitive overlap with XTANDI in non-metastatic castration-sensitive prostate cancer — key battleground is prescriber preference among urologists',
                    confidence: 94,
                },
                {
                    title: 'XTANDI US Share Resilience',
                    detail: 'XTANDI maintains ~40% total US prostate cancer therapy share (TRx basis) across mCRPC, nmCRPC, mCSPC, nmCSPC — broadest label coverage in class with real-world outcome data advantage',
                    confidence: 92,
                },
                {
                    title: 'PADCEV Bladder Cancer Share Leadership',
                    detail: 'PADCEV (enfortumab vedotin) ~40% first-line bladder cancer market share and growing — EV-302/KEYNOTE-A39 data supports standard-of-care positioning ahead of emerging ADC competitors',
                    confidence: 91,
                },
            ],
            visualizations: {
                marketShareTrend: {
                    type: 'line',
                    title: 'XTANDI US Prostate Cancer Market Share (12 Months, TRx %)',
                    data: [
                        { month: 'Jan', value: 38.5, benchmark: 37.0 },
                        { month: 'Feb', value: 38.8, benchmark: 37.2 },
                        { month: 'Mar', value: 39.0, benchmark: 37.5 },
                        { month: 'Apr', value: 39.2, benchmark: 37.8 },
                        { month: 'May', value: 39.5, benchmark: 38.0 },
                        { month: 'Jun', value: 39.8, benchmark: 38.2 },
                        { month: 'Jul', value: 40.0, benchmark: 38.5 },
                        { month: 'Aug', value: 40.2, benchmark: 38.8 },
                        { month: 'Sep', value: 40.5, benchmark: 39.0 },
                        { month: 'Oct', value: 40.8, benchmark: 39.2 },
                        { month: 'Nov', value: 41.0, benchmark: 39.5 },
                        { month: 'Dec', value: 40.8, benchmark: 39.5 },
                    ],
                },
                regionalBreakdown: {
                    type: 'bar',
                    title: 'Product Revenue Growth YoY (FY25)',
                    data: [
                        { region: 'XTANDI Global', change: 7.2, share: 45 },
                        { region: 'PADCEV Global', change: 40.0, share: 10 },
                        { region: 'VEOZAH US', change: 120.0, share: 2 },
                        { region: 'IZERVAY US', change: 85.0, share: 1 },
                    ],
                },
                competitorAnalysis: {
                    type: 'pie',
                    title: 'Prostate Cancer Competitive Attribution (XTANDI Share Change)',
                    data: [
                        { name: 'ERLEADA nmCSPC Pressure', value: 45, color: '#ef4444' },
                        { name: 'LYNPARZA BRCA-Selected Overlap', value: 25, color: '#f59e0b' },
                        { name: 'Other Competitive', value: 15, color: '#eab308' },
                        { name: 'Label Expansion Gains', value: 15, color: '#84cc16' },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'Market & Competitive',
                    drivers: ['XTANDI US Market Share', 'PADCEV First-Line Share', 'VEOZAH Prescriber Adoption'],
                    impact: 'High',
                },
                {
                    category: 'Competitive',
                    drivers: ['ERLEADA J&J Competition', 'LYNPARZA AstraZeneca Overlap', 'ADC Pipeline Competitors'],
                    impact: 'Medium',
                },
            ],
            recommendations: [
                'Defend XTANDI nmCSPC share through label-breadth differentiation and combination study data (TALAPRO-3)',
                'Accelerate PADCEV EU reimbursement rollout to expand first-line share in HTA-approved markets',
                'Leverage XTANDI BRCA-unselected label advantage vs LYNPARZA in community urology accounts',
                'Target PADCEV ADC manufacturing capacity expansion to defend against emerging ADC competitor supply',
            ],
            dataSource: 'Fin360 Data Platform + IQVIA Market Intelligence',
            lastUpdated: 'Real-time analysis',
            dataQuality: {
                completeness: 98,
                accuracy: 95,
                timeliness: 100,
                methodology: 'Combines internal commercial data with IQVIA prescription analytics',
            },
        };
    }

    // Capital markets / investment / pipeline / orders queries
    else if (lowerQuery.includes('capital markets') || lowerQuery.includes('pipeline') || lowerQuery.includes('backlog') || lowerQuery.includes('phase 3') || lowerQuery.includes('r&d')) {
        return {
            summary: 'Astellas R&D investment ~¥220B FY25 (~10% of revenue); 20+ Phase 2/3 assets; PADCEV combinations, XTANDI label expansions, gene therapy, and VYLOY Japan pipeline; Phase 3 success rate ~68%',
            keyFindings: [
                {
                    title: 'PADCEV Combination Pipeline Momentum',
                    detail: 'PADCEV combination studies in new indications and patient populations represent the highest near-term R&D value creation — EV-302 label established the foundation for expanding combination trials',
                    confidence: 96,
                },
                {
                    title: 'XTANDI Label Expansion Studies Active',
                    detail: 'XTANDI combination studies (TALAPRO-3 with talazoparib) extend product lifecycle into BRCA-selected/unselected populations — creating revenue diversification within the XTANDI franchise',
                    confidence: 94,
                },
                {
                    title: 'Gene Therapy Pipeline Value',
                    detail: 'Astellas gene therapy assets from Audentes/Ambys acquisition represent significant long-term option value; AT132 (X-linked myotubular myopathy) and other rare disease programs in advanced development',
                    confidence: 85,
                },
            ],
            visualizations: {
                coldMixProgress: {
                    type: 'gauge',
                    title: 'R&D Phase 3 Success Rate (%)',
                    data: {
                        current: 68,
                        target: 70,
                        benchmark: 65,
                    },
                },
                categoryBreakdown: {
                    type: 'bar',
                    title: 'R&D Investment by Therapeutic Area (FY25)',
                    data: [
                        { segment: 'Oncology', coverage: 55, demand: 60 },
                        { segment: 'Gene Therapy', coverage: 18, demand: 20 },
                        { segment: "Women's Health", coverage: 12, demand: 15 },
                        { segment: 'Other', coverage: 15, demand: 15 },
                    ],
                },
                daypartGrowth: {
                    type: 'comparison',
                    title: 'Pipeline Assets by Stage (FY25)',
                    data: [
                        { company: 'Phase 1', stations: 8, growth: 'Early' },
                        { company: 'Phase 2', stations: 12, growth: 'Mid' },
                        { company: 'Phase 3', stations: 8, growth: 'Late' },
                        { company: 'Regulatory Review', stations: 3, growth: 'Filing' },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'R&D Pipeline',
                    drivers: ['PADCEV Combination Studies', 'XTANDI Label Expansions', 'Gene Therapy Phase 3'],
                    impact: 'Critical',
                },
                {
                    category: 'Commercial Launch',
                    drivers: ['VYLOY Japan NHI Listing', 'IZERVAY Dry AMD Label', 'VEOZAH EU Approval'],
                    impact: 'High',
                },
            ],
            recommendations: [
                'Prioritize PADCEV combination studies as highest near-term R&D value — combinations in new indications extend lifecycle',
                'Accelerate VYLOY Japan NHI listing review engagement to achieve H2 FY26 commercial launch',
                'Advance FDA label expansion discussions for IZERVAY dry AMD — 5x patient population expansion opportunity',
                'Develop gene therapy commercial infrastructure investment plan aligned to AT132 Phase 3 completion timeline',
            ],
            dataSource: 'Astellas R&D Day + Annual Securities Report FY2025',
            lastUpdated: 'Updated 2 hours ago',
            dataQuality: {
                completeness: 96,
                accuracy: 94,
                timeliness: 95,
                methodology: 'Direct from Astellas investor relations and pipeline disclosure documents',
            },
        };
    }

    // FX / currency / JPY / USD queries
    else if (lowerQuery.includes('fx') || lowerQuery.includes('currency') || lowerQuery.includes('jpy') || lowerQuery.includes('usd') || lowerQuery.includes('yen') || lowerQuery.includes('foreign exchange')) {
        return {
            summary: 'Astellas FX sensitivity ¥2.1B Core OP per ¥1 USD/JPY move; USD/JPY ~¥150 in Q1 FY26; ~50% annual exposure hedged through forward contracts; BoJ rate normalization is primary JPY appreciation risk',
            keyFindings: [
                {
                    title: 'USD/JPY Core OP Sensitivity',
                    detail: 'Each ¥1 USD/JPY move = ¥2.1B Core OP annual impact on unhedged exposure; XTANDI US revenue ~¥570B annually is the largest single USD-denominated cash flow; USD/JPY at ¥150 vs ¥140 = ¥21B Core OP tailwind',
                    confidence: 96,
                },
                {
                    title: 'Hedging Coverage ~50%',
                    detail: 'Astellas hedges ~50% of annual FX exposure through rolling forward contracts — unhedged exposure of ~¥600B annually creates ~¥1.05B Core OP sensitivity per ¥1 USD/JPY move on net basis',
                    confidence: 94,
                },
                {
                    title: 'BoJ Rate Normalization Risk',
                    detail: 'Bank of Japan rate hike cycle driving JPY appreciation from ¥150+ toward ¥135 range — ¥15 move = ¥31.5B Core OP headwind on annualized unhedged exposure; primary macro risk for FY26-FY27',
                    confidence: 91,
                },
            ],
            visualizations: {
                commodityTrend: {
                    type: 'line',
                    title: 'USD/JPY Exchange Rate Trend (12 Months)',
                    data: [
                        { month: 'Jan', value: 148, benchmark: 148 },
                        { month: 'Feb', value: 150, benchmark: 149 },
                        { month: 'Mar', value: 152, benchmark: 150 },
                        { month: 'Apr', value: 153, benchmark: 151 },
                        { month: 'May', value: 155, benchmark: 152 },
                        { month: 'Jun', value: 152, benchmark: 151 },
                    ],
                },
                costBreakdown: {
                    type: 'bar',
                    title: 'Core OP FX Sensitivity by Segment',
                    data: [
                        { region: 'US (XTANDI/PADCEV)', change: 2.1, share: 60 },
                        { region: 'Established Markets (EUR)', change: 0.9, share: 25 },
                        { region: 'International Markets', change: 0.3, share: 10 },
                        { region: 'Hedged (offsetting)', change: -1.05, share: -50 },
                    ],
                },
                hedgingCoverage: {
                    type: 'pie',
                    title: 'FX Exposure by Currency (% of Total Foreign Revenue)',
                    data: [
                        { name: 'USD (US Segment)', value: 60, color: '#D91E49' },
                        { name: 'EUR (Established Markets)', value: 25, color: '#f59e0b' },
                        { name: 'Other', value: 15, color: '#10b981' },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'FX & Treasury',
                    drivers: ['USD/JPY Rate Sensitivity', 'EUR/JPY Hedging Program', 'BoJ Policy Risk'],
                    impact: 'Critical',
                },
                {
                    category: 'US Operations',
                    drivers: ['XTANDI US Revenue Translation', 'PADCEV USD Revenue', 'FX Hedge Ratio'],
                    impact: 'High',
                },
            ],
            recommendations: [
                'Evaluate FX hedging program extension to 18-month rolling coverage to reduce quarterly Core OP volatility',
                'Model BoJ rate normalization scenarios: USD/JPY ¥140 = ¥21B annual Core OP headwind at current hedge ratio',
                'Bridge USD/JPY sensitivity to Core EPS: each ¥1 move ≈ ¥0.3 Core EPS on current share count',
                'Develop investor communication framework for FX-adjusted vs reported Core OP growth narrative',
            ],
            dataSource: 'Astellas Annual Securities Report FY2025 + FX Sensitivity Disclosure',
            lastUpdated: 'Real-time monitoring',
            dataQuality: {
                completeness: 94,
                accuracy: 93,
                timeliness: 100,
                methodology: 'Astellas treasury FX model combined with BoJ rate forward curve data',
            },
        };
    }

    // Financial Performance queries — Core OP, margin, profitability
    else if (lowerQuery.includes('ebit') || lowerQuery.includes('margin') || lowerQuery.includes('profitability') || lowerQuery.includes('core op') || lowerQuery.includes('operating income')) {
        return {
            summary: 'Astellas Core OP ¥555.7B FY25, Core OP margin 26% — highest in company history; FY26 guidance ¥550-580B reflecting IRA XTANDI headwind and Japan NHI revision offset by PADCEV/VEOZAH growth and SMT savings',
            keyFindings: [
                {
                    title: 'Core OP Margin Record 26%',
                    detail: 'Core OP margin 26% in FY25 driven by XTANDI/PADCEV revenue volume leverage over SG&A and SMT ¥21B savings delivery ahead of ¥18B original target — highest Core OP margin in Astellas history',
                    confidence: 97,
                },
                {
                    title: 'FY26 Margin Defense Strategy',
                    detail: 'FY26 Core OP margin guidance 25-27% range: IRA XTANDI -¥55B base case + Japan NHI -¥26B offset by PADCEV/VEOZAH +¥45B growth + SMT savings ¥40B delivery = net margin resilience at ~25-26%',
                    confidence: 94,
                },
                {
                    title: 'US vs Japan Margin Divergence',
                    detail: 'US segment Core OP margin ~32% in FY25 driven by XTANDI/PADCEV commercial leverage; Japan segment margin ~18% facing NHI revision headwinds — US mix shift improving blended consolidated margin',
                    confidence: 91,
                },
            ],
            visualizations: {
                marginWaterfall: {
                    type: 'waterfall',
                    title: 'Core OP Margin Bridge YoY (FY25 vs FY24)',
                    data: [
                        { category: 'Prior Year', value: 24.0 },
                        { category: 'XTANDI Revenue Growth', value: 0.8 },
                        { category: 'PADCEV Volume Leverage', value: 0.7 },
                        { category: 'SMT Savings', value: 0.5 },
                        { category: 'Japan NHI Revision', value: -0.2 },
                        { category: 'R&D Investment', value: -0.3 },
                        { category: 'Other', value: 0.5 },
                        { category: 'Current Year', value: 26.0 },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'Financial Performance',
                    drivers: ['XTANDI Revenue Mix', 'PADCEV Operating Leverage', 'SMT Cost Transformation'],
                    impact: 'High',
                },
            ],
            recommendations: [
                'Close Japan NHI margin gap through VYLOY launch and volume growth offsetting per-unit price compression',
                'Drive US segment margin above 32% target via PADCEV/VEOZAH volume leverage improvement',
                'Quantify post-IRA XTANDI Core OP margin trajectory for FY26+ investor communications',
                'Bridge GAAP EPS vs Core EPS each quarter — FY25 Core EPS ¥237 demonstrates underlying profitability strength',
            ],
            dataSource: 'Astellas Q1 FY26 Earnings Supplement + Annual Securities Report',
            lastUpdated: 'Real-time',
            dataQuality: {
                completeness: 99,
                accuracy: 97,
                timeliness: 100,
                methodology: 'Automated financial consolidation with daily updates from ERP',
            },
        };
    }

    // Cash Flow queries
    else if (lowerQuery.includes('cash') || lowerQuery.includes('liquidity') || lowerQuery.includes('working capital') || lowerQuery.includes('fcf') || lowerQuery.includes('free cash')) {
        return {
            summary: 'Astellas operating free cash flow underpinned by Core OP ¥555.7B FY25; capex ~¥80B annually (manufacturing + R&D); dividend maintained; SMT ¥40B FY26 savings are the primary controllable FCF lever',
            keyFindings: [
                {
                    title: 'Core OP Cash Generation',
                    detail: 'Astellas Core OP ¥555.7B FY25 provides strong operating cash generation; after R&D ¥220B and capex ~¥80B, operating FCF remains robust supporting dividend and share repurchase programs',
                    confidence: 94,
                },
                {
                    title: 'PADCEV Manufacturing Investment',
                    detail: 'PADCEV biologics manufacturing capacity expansion is the largest single capital investment in FY26 capex program — each ¥10B manufacturing investment unlocks ¥15-20B incremental annual revenue potential',
                    confidence: 95,
                },
                {
                    title: 'Credit Metric and Dividend',
                    detail: 'Astellas maintains investment-grade credit rating with conservative leverage; dividend per share growing aligned with Core EPS trajectory; FY26 guidance ¥230-250 Core EPS supports sustained dividend growth',
                    confidence: 92,
                },
            ],
            visualizations: {
                cashFlowTrend: {
                    type: 'bar',
                    title: 'Quarterly Operating Cash Flow (¥B) — Astellas FY2026E',
                    data: [
                        { quarter: 'Q1 FY26', operating: 130, capex: -22, free: 108 },
                        { quarter: 'Q2 FY26E', operating: 145, capex: -20, free: 125 },
                        { quarter: 'Q3 FY26E', operating: 155, capex: -20, free: 135 },
                        { quarter: 'Q4 FY26E', operating: 165, capex: -18, free: 147 },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'Cash Management',
                    drivers: ['Core OP Generation', 'PADCEV Manufacturing Capex', 'SMT Working Capital Savings'],
                    impact: 'Critical',
                },
            ],
            recommendations: [
                'Model quarterly FCF bridge: Core OP → R&D → capex → interest → FCF per share',
                'Prioritize PADCEV manufacturing capex as highest-ROIC capital allocation decision in FY26 plan',
                'Maintain dividend growth consistent with Core EPS ¥230-250 FY26 guidance trajectory',
                'Track SMT savings delivery vs ¥40B target as primary controllable FCF catalyst',
            ],
            dataSource: 'Astellas Treasury Management + Q1 FY26 Cash Flow Statement',
            lastUpdated: 'Daily close',
            dataQuality: {
                completeness: 98,
                accuracy: 97,
                timeliness: 100,
                methodology: 'Real-time cash positioning with daily bank reconciliation',
            },
        };
    }

    // Operational Excellence queries
    else if (lowerQuery.includes('quality') || lowerQuery.includes('operations') || lowerQuery.includes('efficiency') || lowerQuery.includes('manufacturing') || lowerQuery.includes('smt')) {
        return {
            summary: 'Astellas SMT transformation delivering ¥21B FY25 savings ahead of ¥18B target; PADCEV manufacturing at 72% capacity utilization; digital HCP engagement at 36% of interactions; ¥40B FY26 target requires step-change acceleration',
            keyFindings: [
                {
                    title: 'PADCEV Manufacturing Execution',
                    detail: 'PADCEV ADC manufacturing capacity at 72% of demand — each 5% capacity improvement ≈ ¥3-5B incremental annual revenue opportunity; biologics process yield improvement is the primary technical lever',
                    confidence: 94,
                },
                {
                    title: 'SMT Savings FY25 ¥21B',
                    detail: 'SMT program delivered ¥21B in FY25 (ahead of ¥18B target) — commercial model transformation (digital HCP engagement), procurement savings, and shared services consolidation are the three primary workstreams',
                    confidence: 92,
                },
                {
                    title: 'Digital Commercial Adoption 36%',
                    detail: 'Digital HCP interaction rate at 36% of total commercial interactions — target 55-63% by FY27 as CRM-driven omnichannel engagement reduces cost-per-interaction vs field representative visits',
                    confidence: 90,
                },
            ],
            visualizations: {
                storeEfficiency: {
                    type: 'stacked',
                    title: 'Operational Excellence KPI Trend',
                    data: [
                        { month: 'Q4 FY24', availability: 68, performance: 72, quality: 95 },
                        { month: 'Q1 FY25', availability: 70, performance: 74, quality: 95 },
                        { month: 'Q2 FY25', availability: 72, performance: 75, quality: 96 },
                        { month: 'Q1 FY26', availability: 72, performance: 76, quality: 97 },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'SMT Transformation',
                    drivers: ['Digital Commercial Adoption', 'Procurement Savings', 'Shared Services Consolidation'],
                    impact: 'High',
                },
            ],
            recommendations: [
                'Accelerate PADCEV manufacturing yield improvement — target 85% capacity utilization by Q3 FY26',
                'Prioritize SMT digital HCP engagement deployment in top-50 XTANDI/PADCEV accounts to drive Q1 FY26 savings run-rate',
                'Expand digital commercial adoption from 36% to 50%+ in H1 FY26 — each 5% improvement = ~¥2B annual SG&A savings',
                'Drive procurement savings acceleration in biologics contract manufacturing — PADCEV unit COGS improvement is the fastest SMT lever',
            ],
            dataSource: 'Astellas SMT Program Update + Q1 FY26 Earnings Supplement',
            lastUpdated: 'Real-time',
            dataQuality: {
                completeness: 97,
                accuracy: 96,
                timeliness: 100,
                methodology: 'Real-time operational data from commercial analytics and manufacturing systems',
            },
        };
    }

    // Risk & Compliance queries
    else if (lowerQuery.includes('risk') || lowerQuery.includes('compliance') || lowerQuery.includes('audit') || lowerQuery.includes('ira') || lowerQuery.includes('nhi')) {
        return {
            summary: 'Astellas top 5 enterprise risks: XTANDI IRA MFP negotiation (¥30-80B range), Japan NHI revision -6.5% (¥26B headwind), PADCEV manufacturing supply constraints, USD/JPY FX risk (¥2.1B per ¥1 move), ERLEADA/LYNPARZA competitive pressure',
            keyFindings: [
                {
                    title: 'Top Risk: XTANDI IRA Maximum Fair Price',
                    detail: 'CMS MFP negotiation outcome for XTANDI — effective January 2026; ¥30B (favorable/85% WAC) to ¥80B (adverse/70% WAC) annual revenue headwind range; Medicare Part D ~35-40% of XTANDI US revenue',
                    confidence: 89,
                },
                {
                    title: 'Japan NHI Revision April 2026',
                    detail: 'Japan NHI biennial price revision -6.5% estimate applied to full Japan portfolio (XTANDI + PADCEV + legacy) — ¥26B annual Japan segment revenue headwind; VYLOY launch is primary offset',
                    confidence: 93,
                },
                {
                    title: 'PADCEV Manufacturing Supply Risk',
                    detail: 'PADCEV ADC production at 72% capacity utilization creates supply-constrained revenue risk — single-facility biologics concentration adds manufacturing disruption risk to already capacity-constrained commercial supply',
                    confidence: 91,
                },
            ],
            visualizations: {
                riskHeatmap: {
                    type: 'heatmap',
                    title: 'Astellas Enterprise Risk Matrix (Q2 FY26)',
                    data: [
                        { risk: 'XTANDI IRA MFP Negotiation Adverse Outcome', impact: 5, likelihood: 3, trend: 'stable' },
                        { risk: 'Japan NHI Revision -6.5% (April 2026)', impact: 4, likelihood: 5, trend: 'stable' },
                        { risk: 'PADCEV Manufacturing Supply Constraint', impact: 4, likelihood: 3, trend: 'improving' },
                        { risk: 'USD/JPY Appreciation to ¥135 (BoJ)', impact: 4, likelihood: 3, trend: 'stable' },
                        { risk: 'ERLEADA/LYNPARZA XTANDI Share Erosion', impact: 3, likelihood: 3, trend: 'stable' },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'Risk Management',
                    drivers: ['IRA MFP Negotiation Risk', 'Japan NHI Revision Timing', 'Manufacturing Concentration Risk'],
                    impact: 'Critical',
                },
            ],
            recommendations: [
                'Develop XTANDI IRA contingency plan — model scenario at ¥30B (best), ¥55B (base), ¥80B (adverse) MFP headwind',
                'Maintain Japan NHI -6.5% (base) and -8% (adverse) scenario for Board risk committee Q2 FY26 review',
                'Accelerate PADCEV dual-site manufacturing investment to reduce single-facility concentration risk',
                'Develop BoJ rate normalization hedge strategy — USD/JPY ¥135 scenario = ¥31.5B Core OP headwind at current hedge ratio',
            ],
            dataSource: 'Astellas GRC Platform + Enterprise Risk Register',
            lastUpdated: 'Weekly risk review',
            dataQuality: {
                completeness: 95,
                accuracy: 93,
                timeliness: 92,
                methodology: 'Integrated risk assessment with predictive scenario analytics',
            },
        };
    }

    // Segment / product mix queries
    else if (lowerQuery.includes('product mix') || lowerQuery.includes('segment') || lowerQuery.includes('service line') || lowerQuery.includes('xtandi') || lowerQuery.includes('padcev') || lowerQuery.includes('veozah') || lowerQuery.includes('japan')) {
        return {
            summary: 'Astellas FY25 revenue ¥2,139.2B: XTANDI ¥960.8B (45%), PADCEV ¥221.2B (10%), US segment ~45%, Japan ~18%, Established Markets ~13%; PADCEV fastest-growing franchise at ~+40% YoY',
            keyFindings: [
                {
                    title: 'XTANDI Revenue Composition',
                    detail: 'XTANDI ¥960.8B FY25: US ~¥570B (59%), Japan ~¥200B (21%), Established Markets/International ~¥190B (20%) — broadest prostate cancer label coverage (mCRPC, nmCRPC, mCSPC, nmCSPC) drives all disease state penetration',
                    confidence: 97,
                },
                {
                    title: 'PADCEV Revenue Composition',
                    detail: 'PADCEV ¥221.2B FY25 (+~40% YoY): US first-line bladder cancer standard of care EV-302 penetration driving growth; EU launch rollout beginning; manufacturing capacity 72% is the primary revenue ceiling',
                    confidence: 95,
                },
                {
                    title: 'Emerging Products Revenue Build',
                    detail: 'VEOZAH (~¥27B), IZERVAY (~¥15B), VYLOY (pre-NHI) combined represent early-stage launch assets; three-year trajectory to ¥100-150B combined by FY27 is the key revenue diversification thesis beyond XTANDI',
                    confidence: 90,
                },
            ],
            visualizations: {
                portfolioMix: {
                    type: 'donut',
                    title: 'Astellas Revenue by Product (FY25)',
                    data: [
                        { segment: 'XTANDI', value: 45, revenue: '¥960.8B' },
                        { segment: 'PADCEV', value: 10, revenue: '¥221.2B' },
                        { segment: 'VEOZAH + IZERVAY', value: 2, revenue: '~¥42B' },
                        { segment: 'Other/Japan Brands', value: 43, revenue: '~¥915B' },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'Revenue Mix',
                    drivers: ['XTANDI Franchise Revenue', 'PADCEV Volume Growth', 'Emerging Products Launch'],
                    impact: 'High',
                },
                {
                    category: 'Margin Impact',
                    drivers: ['XTANDI vs Japan Mix Shift', 'PADCEV Commercial Leverage', 'SMT Cost Savings'],
                    impact: 'Critical',
                },
            ],
            recommendations: [
                'Accelerate PADCEV manufacturing capacity — closing the 28% supply gap is the highest-ROIC near-term initiative',
                'Drive VEOZAH prescriber adoption from 19% to 35%+ in H1 FY26 — above-plan adoption = highest revenue surprise potential',
                'Develop combined segment reporting framework highlighting revenue diversification beyond XTANDI',
                'Highlight PADCEV-as-structural-growth-driver in investor communications — IRA impact on XTANDI makes PADCEV the growth story',
            ],
            dataSource: 'Astellas Segment Reporting + Q1 FY26 10-Q Equivalent',
            lastUpdated: 'Weekly refresh',
            dataQuality: {
                completeness: 97,
                accuracy: 96,
                timeliness: 96,
                methodology: 'Integrated segment revenue and margin data from financial consolidation',
            },
        };
    }

    // XTANDI IRA / regulatory queries
    else if (lowerQuery.includes('ira') || lowerQuery.includes('inflation reduction act') || lowerQuery.includes('medicare') || lowerQuery.includes('mfp') || lowerQuery.includes('cms')) {
        return {
            summary: 'XTANDI selected for IRA Medicare price negotiation; CMS MFP effective January 2026; ¥30-80B annual revenue headwind range (5-15% discount to WAC); non-Medicare US volume growth is the primary offset strategy',
            keyFindings: [
                {
                    title: 'IRA MFP Effective January 2026',
                    detail: 'CMS Maximum Fair Price for XTANDI effective January 1, 2026 — applies only to Medicare Part D (~35-40% of XTANDI US units); commercial, Medicaid, and VA channels are NOT subject to MFP, representing 60-65% of XTANDI US revenue',
                    confidence: 96,
                },
                {
                    title: 'MFP Negotiation Range ¥30-80B',
                    detail: 'Astellas management guidance: ¥30B (favorable/85% WAC) to ¥80B (adverse/70% WAC) annual revenue headwind — CMS statutory floor is 35% discount for small molecules with 12+ years post-approval; XTANDI qualifies for floor application',
                    confidence: 92,
                },
                {
                    title: 'Non-Medicare Volume Growth Offset',
                    detail: 'XTANDI non-Medicare US volume (commercial insurance, VA, Medicaid, younger patients) represents the primary revenue offset — each +1% non-Medicare patient volume growth ≈ +¥5B annual revenue insulated from IRA MFP',
                    confidence: 89,
                },
            ],
            visualizations: {
                storeGrowthTrend: {
                    type: 'area',
                    title: 'XTANDI US Revenue Trajectory Including IRA Impact (¥B)',
                    data: [
                        { month: 'Q1 FY25', actual: 145, plan: 140, capacity: 160 },
                        { month: 'Q2 FY25', actual: 148, plan: 143, capacity: 163 },
                        { month: 'Q3 FY25', actual: 150, plan: 145, capacity: 165 },
                        { month: 'Q4 FY25', actual: 152, plan: 148, capacity: 168 },
                        { month: 'Q1 FY26', actual: 138, plan: 135, capacity: 155 },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'US Regulatory',
                    drivers: ['IRA MFP Effective Date', 'Medicare Part D Share Management', 'Non-Medicare Volume Growth'],
                    impact: 'Critical',
                },
                {
                    category: 'Revenue Strategy',
                    drivers: ['XTANDI Label Expansion (nmCSPC)', 'Non-Medicare Channel Growth', 'XTANDI Combination Studies'],
                    impact: 'High',
                },
            ],
            recommendations: [
                'Build FY26 revenue model at ¥30B (best), ¥55B (base), ¥80B (adverse) IRA headwind scenarios for Board',
                'Track peer drug MFP negotiation outcomes (Eliquis, Jardiance) as XTANDI discount range benchmarks',
                'Accelerate XTANDI non-Medicare patient volume — earlier-stage nmCSPC patients are largely non-Medicare',
                'Develop investor IRA communication framework: post-MFP XTANDI is volume-growth driven, not price-driven',
            ],
            dataSource: 'CMS IRA Negotiation Program + Astellas Q1 FY26 Earnings Commentary',
            lastUpdated: 'Real-time',
            dataQuality: {
                completeness: 97,
                accuracy: 96,
                timeliness: 100,
                methodology: 'Direct from CMS IRA program disclosure and Astellas investor relations materials',
            },
        };
    }

    // Competitor / competitive queries
    else if (lowerQuery.includes('competitor') || lowerQuery.includes('competitive') || lowerQuery.includes('market position') || lowerQuery.includes('astrazeneca') || lowerQuery.includes('novartis') || lowerQuery.includes('roche') || lowerQuery.includes('pfizer')) {
        return {
            summary: 'Astellas leading oncology specialty pharma with XTANDI #1 global prostate cancer therapy; PADCEV ADC first-mover advantage in bladder cancer; AstraZeneca, J&J, Novartis, Roche are key benchmark peers',
            keyFindings: [
                {
                    title: 'XTANDI Global Prostate Cancer Leadership',
                    detail: 'XTANDI is the #1 global prostate cancer therapy by revenue — ¥960.8B FY25; vs ERLEADA (J&J/Pfizer) at ~¥400B; XTANDI label breadth (all 4 prostate cancer settings) creates competitive moat that ERLEADA (3 settings) does not replicate',
                    confidence: 95,
                },
                {
                    title: 'PADCEV ADC Competitive Position',
                    detail: 'PADCEV ~40% first-line bladder cancer share vs emerging ADC competitors (Gilead, others) — EV-302 OS data is the strongest clinical moat; ADC manufacturing scale-up creates a barrier to rapid competitive entry',
                    confidence: 93,
                },
                {
                    title: 'Peer Benchmark: AstraZeneca/Roche',
                    detail: 'AstraZeneca Core OP margin ~28%, Roche ~28%, J&J Pharma ~30% — Astellas 26% has margin expansion upside through SMT delivery and PADCEV scale; revenue growth trajectory favors Astellas on PADCEV vs AZ LYNPARZA',
                    confidence: 91,
                },
            ],
            visualizations: {
                competitiveShare: {
                    type: 'radar',
                    title: 'Competitive Position by Category (Illustrative)',
                    data: [
                        { segment: 'Prostate Cancer Revenue', companyA: 75, companyB: 35, companyC: 10, companyD: 8 },
                        { segment: 'Bladder Cancer ADC', companyA: 55, companyB: 25, companyC: 12, companyD: 8 },
                        { segment: 'Pipeline Advancement Rate', companyA: 40, companyB: 55, companyC: 35, companyD: 45 },
                        { segment: 'Core OP Margin', companyA: 35, companyB: 45, companyC: 45, companyD: 42 },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'Competitive Strategy',
                    drivers: ['XTANDI Franchise Defense', 'PADCEV ADC Leadership', 'SMT Cost Efficiency vs Peers'],
                    impact: 'High',
                },
                {
                    category: 'Market & Demand',
                    drivers: ['Prostate Cancer Market Growth', 'Bladder Cancer ADC Expansion', 'Women\'s Health Differentiation'],
                    impact: 'Critical',
                },
            ],
            recommendations: [
                'Defend XTANDI prostate cancer leadership through label breadth and BRCA-unselected TALAPRO-3 combination data',
                'Accelerate PADCEV EU reimbursement rollout to extend ADC first-mover advantage before biosimilar/competition',
                'Differentiate SMT cost transformation vs AstraZeneca and J&J — Astellas 26% margin has 200-400bps upside to peers',
                'Leverage Finance360 digital platform to increase XTANDI/PADCEV commercial engagement vs peer field force models',
            ],
            dataSource: 'Global Oncology Market Intelligence + Astellas Competitive Analysis',
            lastUpdated: 'Weekly',
            dataQuality: {
                completeness: 95,
                accuracy: 93,
                timeliness: 98,
                methodology: 'Third-party pharma market data combined with internal competitive intelligence',
            },
        };
    }

    // ESG / sustainability queries
    else if (lowerQuery.includes('sustainability') || lowerQuery.includes('esg') || lowerQuery.includes('carbon') || lowerQuery.includes('environment')) {
        return {
            summary: 'Astellas advancing ESG strategy through TCFD-aligned climate disclosures, responsible R&D practices, patient access programs, and workforce inclusion — ESG embedded in long-term value creation strategy',
            keyFindings: [
                {
                    title: 'Patient Access and Affordability',
                    detail: 'Astellas patient assistance programs across XTANDI, PADCEV, VEOZAH, IZERVAY — IRA negotiation outcome has implications for Medicare patient affordability (MFP limits out-of-pocket costs for patients)',
                    confidence: 91,
                },
                {
                    title: 'Manufacturing Sustainability',
                    detail: 'Astellas manufacturing sustainability programs: biologics production efficiency, waste reduction, water conservation across PADCEV ADC facilities — sustainability KPIs increasingly relevant to ESG-focused institutional investors',
                    confidence: 88,
                },
                {
                    title: 'TCFD Climate Disclosures',
                    detail: 'Astellas aligned TCFD climate risk disclosures including physical and transition risks — pharmaceutical supply chain resilience and API sourcing geography are key climate exposure areas',
                    confidence: 87,
                },
            ],
            visualizations: {
                carbonPath: {
                    type: 'pathway',
                    title: 'Astellas Scope 1+2 Emissions Reduction Pathway (% of 2018 Baseline)',
                    data: [
                        { year: 2018, emissions: 100, target: 100 },
                        { year: 2020, emissions: 90, target: 92 },
                        { year: 2022, emissions: 82, target: 85 },
                        { year: 2025, emissions: 72, target: 74 },
                        { year: 2028, emissions: 62, target: 63 },
                        { year: 2030, emissions: 55, target: 55 },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'ESG Strategy',
                    drivers: ['Patient Access Programs', 'Manufacturing Sustainability', 'Responsible R&D'],
                    impact: 'High',
                },
                {
                    category: 'Stakeholder Value',
                    drivers: ['ESG Ratings Improvement', 'TCFD Alignment', 'Workforce Inclusion'],
                    impact: 'Medium',
                },
            ],
            recommendations: [
                'Expand Astellas patient assistance programs: IRA MFP reduces XTANDI Medicare patient out-of-pocket — communicate patient affordability benefit',
                'Deploy PADCEV manufacturing sustainability KPIs to demonstrate biologics ADC production leadership in ESG reporting',
                'Develop sustainability-linked metrics for SMT transformation — energy efficiency and waste reduction in commercial operations',
                'Publish Astellas healthcare access contribution metrics as % of revenue invested in patient programs',
            ],
            dataSource: 'Astellas ESG Reporting Platform + CSR Report FY2025',
            lastUpdated: 'Quarterly',
            dataQuality: {
                completeness: 93,
                accuracy: 94,
                timeliness: 92,
                methodology: 'Third-party verified ESG metrics combined with Astellas corporate sustainability reporting',
            },
        };
    }

    // Digital / technology queries
    else if (lowerQuery.includes('digital') || lowerQuery.includes('technology') || lowerQuery.includes('platform') || lowerQuery.includes('hcp') || lowerQuery.includes('omnichannel')) {
        return {
            summary: 'Astellas digital commercial platform: 36% of HCP interactions digital (target 55-63% by FY27); Finance360 analytics dashboard; SMT commercial model transformation is the digital strategy — closing the SG&A gap to peers through digital HCP engagement',
            keyFindings: [
                {
                    title: 'Digital HCP Engagement 36%',
                    detail: 'Astellas digital HCP interaction rate at 36% of total commercial interactions — SMT target 55-63% by FY27; each 5% shift from field rep to digital saves ~¥2B annual SG&A; XTANDI/PADCEV accounts are the primary digital expansion target',
                    confidence: 93,
                },
                {
                    title: 'Finance360 Commercial Intelligence',
                    detail: 'Finance360 enables real-time commercial analytics and HCP engagement performance — prescriber adoption tracking for VEOZAH and IZERVAY launch management; XTANDI/PADCEV market share intelligence vs ERLEADA/Syfovre',
                    confidence: 90,
                },
                {
                    title: 'CRM-Driven Omnichannel Model',
                    detail: 'Astellas investing in CRM-driven omnichannel engagement combining field medical, virtual rep, approved email, and HCP portal — proven 30% reduction in cost-per-interaction vs. traditional field force model in pilot markets',
                    confidence: 88,
                },
            ],
            visualizations: {
                digitalGrowth: {
                    type: 'growth',
                    title: 'Astellas Digital HCP Interaction Rate (% of Total)',
                    data: [
                        { quarter: 'Q1 FY24', wellsCovered: 24, revenue: 180 },
                        { quarter: 'Q2 FY24', wellsCovered: 27, revenue: 210 },
                        { quarter: 'Q3 FY24', wellsCovered: 30, revenue: 240 },
                        { quarter: 'Q4 FY24', wellsCovered: 33, revenue: 270 },
                        { quarter: 'Q1 FY26', wellsCovered: 36, revenue: 300 },
                    ],
                },
            },
            relatedDrivers: [
                {
                    category: 'Digital Commercial',
                    drivers: ['HCP Digital Engagement Rate', 'Finance360 Analytics Adoption', 'CRM Omnichannel Coverage'],
                    impact: 'High',
                },
                {
                    category: 'SMT Transformation',
                    drivers: ['SG&A Digital Savings', 'Cost-per-Interaction Reduction', 'Prescriber Coverage Scale'],
                    impact: 'Critical',
                },
            ],
            recommendations: [
                'Accelerate digital HCP engagement deployment — target 50% by Q3 FY26 to unlock ¥5B incremental SMT savings ahead of plan',
                'Bundle Finance360 analytics with XTANDI/PADCEV commercial programs to increase prescriber engagement and insight generation',
                'Expand digital commercial model into Established Markets (EU) to replicate US digital SG&A savings in European HCP engagement',
                'Develop Finance360 integration showing digital channel ROI vs field rep investment for CFO cost transformation dashboard',
            ],
            dataSource: 'Astellas Digital Technology Platform Analytics',
            lastUpdated: 'Real-time',
            dataQuality: {
                completeness: 94,
                accuracy: 92,
                timeliness: 100,
                methodology: 'Real-time platform telemetry and commercial CRM analytics',
            },
        };
    }

    // Default intelligent response
    else {
        return {
            summary: 'I have analyzed your query across Astellas Pharma Inc. Finance360 business intelligence systems. Here are the most relevant insights:',
            keyFindings: [
                {
                    title: 'Business Performance FY25',
                    detail: 'Astellas FY25: Total revenue ¥2,139.2B, XTANDI ¥960.8B, PADCEV ¥221.2B, Core OP ¥555.7B (26% margin), Core EPS ¥237; SMT savings ¥21B delivered ahead of target',
                    confidence: 97,
                },
                {
                    title: 'XTANDI/PADCEV Franchise Strength',
                    detail: 'XTANDI US market share ~40% with IRA MFP effective January 2026 as primary FY26 headwind; PADCEV +~40% YoY growth with manufacturing capacity at 72% as the commercial ceiling; both franchises remain global leadership positions',
                    confidence: 95,
                },
                {
                    title: 'Strategic Milestones FY26',
                    detail: 'FY26 guidance: Revenue ¥2,150-2,250B, Core EPS ¥230-250; SMT ¥40B savings target; VYLOY Japan NHI listing H2 FY26; Japan NHI revision -6.5% effective April 2026; IRA MFP effective January 2026',
                    confidence: 93,
                },
            ],
            relatedDrivers: [
                {
                    category: 'Multiple Business Consoles',
                    drivers: ['XTANDI Franchise Console', 'PADCEV Commercial Console', 'Financial Performance Console'],
                    impact: 'Varies',
                },
            ],
            recommendations: [
                'Review XTANDI or PADCEV Business Console for product franchise-specific analysis',
                'Set up alerts for critical Astellas KPIs: XTANDI IRA MFP announcement, Japan NHI revision rate, PADCEV capacity utilization',
                'Schedule deep-dive analysis session with CFO (Atsushi Kitamura) priorities in mind',
            ],
            dataSource: 'Astellas Pharma Inc. Finance360 Integrated Business Intelligence Platform',
            lastUpdated: 'Real-time',
        };
    }
};
