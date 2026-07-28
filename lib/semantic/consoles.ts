// ════════════════════════════════════════════════════════════════════════════
// Astellas Pharma Inc. (ALPMY) — BUSINESS ARCHITECTURE — CONSOLE DATA
// ════════════════════════════════════════════════════════════════════════════
// 5 MECE business console definitions with Astellas-relevant driver trees.
// FY 2025 reference (April 2025 – March 2026): ¥2,139.2B total revenue (+11.9%),
// Core Operating Profit ¥555.7B (26.0% margin), Core EPS ¥237.01.
// Key franchises: XTANDI ¥960.8B, PADCEV ¥221.2B, Strategic Brands +43% YoY.
// FY2026 Guidance: Revenue ¥2,220B, Core OP ¥620B (27.9% margin).
//
// Export names are preserved from the template architecture so consumer imports
// remain stable. Each export's content has been redefined for Astellas Pharma. Mapping:
//   northAmericaPerformance → Oncology & XTANDI Performance
//   internationalPerformance → Strategic Brands Growth
//   channelDevelopment      → Americas Performance
//   competitiveIntelligence → International & Asia Performance
//   storeOperations         → Enterprise & Pipeline Performance
//
// SOURCES: Astellas FY2025 Annual Results (May 2025); FY2026 Guidance;
// SMT (Sustainable Margin Transformation) progress report; Pipeline update.
// All monetary values in JPY billions (¥B) unless otherwise noted.
// ════════════════════════════════════════════════════════════════════════════

import type { SemanticConsole } from './types';

// ════════════════════════════════════════════════════════════════════════════
// CONSOLE 1: ONCOLOGY & XTANDI PERFORMANCE
// XTANDI ¥960.8B (+5.3%); PADCEV ¥221.2B (+34.8%); XOSPATA ¥71.8B (+5.7%)
// ════════════════════════════════════════════════════════════════════════════
export const northAmericaPerformance: SemanticConsole = {
    id: 'oncology-xtandi-performance',
    title: 'Oncology & XTANDI Performance',
    category: 'revenue-market',
    segment: 'consumer',
    objective: 'Monitor Astellas core oncology franchise performance. XTANDI (enzalutamide) at ¥960.8B represents ~45% of total revenue and the financial backbone of the company. Track XTANDI volume and pricing trends, PADCEV (enfortumab vedotin) accelerating growth as a new standard of care in urothelial cancer, XOSPATA (gilteritinib) in AML, and the mounting IRA drug pricing headwind that threatens XTANDI\'s US revenue base from FY2026 onward.',
    drivers: [
        {
            id: 'xtandi-revenue-position',
            name: 'XTANDI Revenue & Market Position',
            description: 'XTANDI (enzalutamide) delivered ¥960.8B in FY2025 (+5.3% YoY), representing approximately 45% of Astellas total revenue. Co-promoted with Pfizer in the United States, XTANDI holds leading market share across metastatic castration-resistant prostate cancer (mCRPC), metastatic castration-sensitive prostate cancer (mCSPC), and non-metastatic castration-resistant prostate cancer (nmCRPC) indications. Growth moderated from prior years as competition intensifies from darolutamide (Nubeqa, Bayer) and apalutamide (Erleada, J&J), but XTANDI maintains label and guideline leadership. US revenue (~50% of XTANDI total) faces material IRA drug price negotiation risk beginning FY2026, with Astellas guiding to an approximate ¥50B annual headwind.',
            crossReferences: ['ira-pricing-risk', 'us-commercial-operations'],
            metrics: [
                {
                    id: 'xtandi-revenue',
                    name: 'XTANDI Annual Revenue (¥B)',
                    description: 'Total global XTANDI (enzalutamide) net sales across all indications and geographies. Includes US (co-promoted with Pfizer), Europe, Japan, and ROW.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥960.8B FY2025 (+5.3% YoY)',
                    target: 'Sustain ¥960B+ through IRA transition; capture mCSPC label expansion share',
                    direction: 'higher_is_better',
                },
                {
                    id: 'xtandi-yoy-growth',
                    name: 'XTANDI Revenue Growth Rate (%)',
                    description: 'Year-over-year percentage change in XTANDI net sales. Growth decelerating as franchise matures — monitoring whether IRA negotiation and competitive share loss accelerates decline from FY2026.',
                    unit: 'percent',
                    frequency: 'quarterly',
                    currentValue: '+5.3% FY2025 (vs +10.1% FY2024)',
                    target: 'Maintain positive growth pre-IRA impact; manage decline trajectory post-FY2026',
                    direction: 'higher_is_better',
                },
            ],
            children: [
                {
                    id: 'xtandi-us-volume',
                    name: 'XTANDI US Demand & Market Share',
                    description: 'US XTANDI prescription volume and market share across three approved indications (mCRPC, mCSPC, nmCRPC). Pfizer co-promotion drives field force scale. Monitoring share versus darolutamide and apalutamide in the mCSPC and nmCRPC segments where competition is sharpest.',
                    metrics: [
                        {
                            id: 'xtandi-us-share',
                            name: 'XTANDI US Prostate Cancer Market Share (%)',
                            description: 'Combined new-to-brand market share across CRPC and CSPC indications in the US oral androgen receptor signaling inhibitor (ARSI) class.',
                            unit: 'percent',
                            frequency: 'quarterly',
                            currentValue: 'Market leader (est. ~40–45% combined ARSI share)',
                            target: 'Defend leadership position through FY2026 IRA transition',
                            direction: 'higher_is_better',
                        },
                    ],
                },
                {
                    id: 'xtandi-ex-us-growth',
                    name: 'XTANDI Ex-US Revenue Performance',
                    description: 'XTANDI revenue outside the United States — primarily Europe (Germany, France, UK, Italy, Spain) and Japan where Astellas retains full profit. Ex-US revenues partially offset US IRA headwind as indication breadth expands to earlier lines of therapy.',
                    metrics: [
                        {
                            id: 'xtandi-exus-revenue',
                            name: 'XTANDI Ex-US Revenue (¥B)',
                            description: 'XTANDI net sales across European established markets and Japan. Europe HTA reimbursements and Japan NHI pricing drive trajectory.',
                            unit: 'currency',
                            frequency: 'quarterly',
                            currentValue: 'est. ~¥480B (50% of ¥960.8B total)',
                            target: 'Mid-single-digit growth ex-US, partially offsetting IRA-driven US headwind',
                            direction: 'higher_is_better',
                        },
                    ],
                },
            ],
        },
        {
            id: 'padcev-urothelial-growth',
            name: 'PADCEV Urothelial Cancer Growth',
            description: 'PADCEV (enfortumab vedotin, EV), co-developed with Pfizer, delivered ¥221.2B in FY2025 (+34.8% YoY) — the fastest-growing product in the core portfolio. EV+pembrolizumab (EV+P) combination approval in frontline cisplatin-ineligible urothelial carcinoma (UC) and expanding 1L label positions PADCEV as the new standard of care in UC. With an addressable UC market of ~80,000 new US diagnoses annually and peak sales potential commonly estimated at $5–7B globally, PADCEV is the primary near-term growth engine replacing XTANDI volume loss. Pfizer co-development and co-commercialization structure splits global costs and profits.',
            crossReferences: ['strategic-brands-growth'],
            metrics: [
                {
                    id: 'padcev-revenue',
                    name: 'PADCEV Annual Revenue (¥B)',
                    description: 'Total global PADCEV (enfortumab vedotin) net sales. Reflects co-commercialization with Pfizer. Revenue recognition reflects Astellas global profit-sharing arrangement.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥221.2B FY2025 (+34.8% YoY)',
                    target: 'Sustain 20–30% growth trajectory as 1L label penetration deepens',
                    direction: 'higher_is_better',
                },
                {
                    id: 'padcev-indication-expansion',
                    name: 'PADCEV Indication & Label Breadth',
                    description: 'PADCEV approval status across UC lines of therapy: 1L cisplatin-ineligible (EV+P), 2L+ monotherapy and combinations. Monitoring FDA/EMA applications for earlier-line expansion and potential muscle-invasive bladder cancer (MIBC) indication.',
                    unit: 'text',
                    frequency: 'quarterly',
                    currentValue: '1L cisplatin-ineligible UC (EV+P) + 2L+ approved; MIBC trial ongoing',
                    target: 'Additional 1L label expansions and MIBC approval by FY2027',
                    direction: 'higher_is_better',
                },
            ],
        },
        {
            id: 'ira-pricing-risk',
            name: 'IRA Drug Price Negotiation — XTANDI Headwind',
            description: 'The US Inflation Reduction Act (IRA) Medicare Drug Price Negotiation Program selected XTANDI for negotiation with implementation effective FY2026. Astellas has guided to an approximate ¥50B annual revenue headwind from IRA-negotiated pricing, representing the single largest financial risk to the FY2025–2027 operating plan. The negotiated price represents a >50% reduction from the current WAC. The magnitude of the XTANDI IRA impact tests whether PADCEV, Strategic Brands, and SMT savings can collectively absorb the headwind and sustain the Core Operating Profit margin trajectory toward the FY2026 guidance of 27.9%.',
            metrics: [
                {
                    id: 'ira-xtandi-headwind',
                    name: 'IRA XTANDI Revenue Headwind (¥B)',
                    description: 'Annual XTANDI net revenue reduction attributable to IRA Medicare negotiated pricing, effective FY2026. Key risk to consolidated revenue guidance of ¥2,220B.',
                    unit: 'currency',
                    frequency: 'annual',
                    currentValue: 'Guided ~¥50B annual headwind effective FY2026',
                    target: 'Offset through PADCEV growth (+¥50B+), VYLOY ramp, and SMT savings',
                    direction: 'lower_is_better',
                },
                {
                    id: 'ira-offset-coverage',
                    name: 'IRA Headwind Offset Coverage Ratio',
                    description: 'Ratio of incremental growth from PADCEV + Strategic Brands + SMT savings versus IRA XTANDI headwind. Coverage ratio above 1.0x signals net positive impact on Core Operating Profit despite XTANDI pricing pressure.',
                    unit: 'ratio',
                    frequency: 'annual',
                    currentValue: 'FY2026 coverage: PADCEV growth ~¥45B + SMT ¥40B vs ¥50B headwind = >1.5x',
                    target: '>1.5x offset coverage through FY2027 to protect operating margin expansion',
                    direction: 'higher_is_better',
                },
            ],
        },
    ],
};

// ════════════════════════════════════════════════════════════════════════════
// CONSOLE 2: STRATEGIC BRANDS GROWTH
// Combined: ¥480.3B (+43% YoY); VYLOY +415.6%; IZERVAY +33.2%; VEOZAH +37.7%
// ════════════════════════════════════════════════════════════════════════════
export const internationalPerformance: SemanticConsole = {
    id: 'strategic-brands-growth',
    title: 'Strategic Brands Growth',
    category: 'revenue-market',
    segment: 'business',
    objective: 'Monitor the performance of Astellas\'s five Strategic Brands: VYLOY (zolbetuximab, gastric/GEJ cancer), IZERVAY (avacincaptad pegol, geographic atrophy), VEOZAH (fezolinetant, vasomotor symptoms), PADCEV (enfortumab vedotin, urothelial cancer), and XOSPATA (gilteritinib, AML). Combined FY2025 revenues reached ¥480.3B (+43% YoY), and this portfolio is expected to become the primary revenue driver as XTANDI enters the IRA headwind period from FY2026. Each brand represents a differentiated mechanism in a high-value specialty category with substantial growth runway.',
    drivers: [
        {
            id: 'vyloy-global-launch',
            name: 'VYLOY Global Launch Trajectory',
            description: 'VYLOY (zolbetuximab), a Claudin 18.2-targeting monoclonal antibody for HER2-negative, Claudin 18.2-positive gastric and gastroesophageal junction (GEJ) adenocarcinoma, delivered ¥63.1B in FY2025 (+415.6% YoY) — the highest growth rate in the portfolio as it entered its first full commercial year. Approved in the US (November 2023), Japan, and Europe as 1L combination with FOLFOX/CAPOX chemotherapy, VYLOY addresses an estimated 15–25% of gastric cancer patients who are Claudin 18.2-positive. The global gastric cancer market is particularly large in Asia (Japan, China, Korea), positioning VYLOY for multi-year double-digit volume growth as real-world evidence matures and physician adoption broadens. Peak sales consensus estimates range ¥200–400B.',
            metrics: [
                {
                    id: 'vyloy-revenue',
                    name: 'VYLOY Annual Revenue (¥B)',
                    description: 'Global VYLOY (zolbetuximab) net sales across US, Europe, Japan, and Asia. FY2025 represents early commercialization phase with substantial uptake ramp ahead.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥63.1B FY2025 (+415.6% YoY from minimal base)',
                    target: 'Sustain high double/triple-digit growth through FY2027 as awareness and diagnosis rates build',
                    direction: 'higher_is_better',
                },
                {
                    id: 'vyloy-market-penetration',
                    name: 'VYLOY Market Penetration Rate (%)',
                    description: 'Estimated share of Claudin 18.2-positive gastric/GEJ cancer 1L-eligible patients initiated on VYLOY-containing regimens. Key leading indicator for revenue trajectory and guideline adoption.',
                    unit: 'percent',
                    frequency: 'quarterly',
                    currentValue: 'Early penetration — est. <20% of eligible US/EU patients reached (FY2025)',
                    target: '>40% penetration in Claudin 18.2+ gastric cancer 1L within 3 years',
                    direction: 'higher_is_better',
                },
            ],
            children: [
                {
                    id: 'vyloy-asia-opportunity',
                    name: 'VYLOY Asia — Japan & China Opportunity',
                    description: 'Japan and China represent the highest-volume gastric cancer markets globally (~550,000 combined new diagnoses annually). VYLOY approved in Japan (2024); China regulatory pathway active. Asia revenues expected to become the largest VYLOY geography by FY2028 given disease prevalence.',
                    metrics: [
                        {
                            id: 'vyloy-japan-revenue',
                            name: 'VYLOY Japan Revenue (¥B)',
                            description: 'VYLOY net sales in Japan — critical given Japan gastric cancer incidence rates and NHI pricing structure.',
                            unit: 'currency',
                            frequency: 'quarterly',
                            currentValue: 'Ramping since Japan approval (2024)',
                            target: 'Japan to represent ~30% of global VYLOY revenue by FY2027',
                            direction: 'higher_is_better',
                        },
                    ],
                },
            ],
        },
        {
            id: 'izervay-geographic-atrophy',
            name: 'IZERVAY Geographic Atrophy Platform',
            description: 'IZERVAY (avacincaptad pegol, ACP), a complement C5 inhibitor for geographic atrophy (GA) secondary to age-related macular degeneration (AMD), delivered ¥77.6B in FY2025 (+33.2% YoY). IZERVAY is one of only two approved therapies for GA in the US (alongside pegcetacoplan/Syfovre from Apellis), addressing an estimated 1 million US patients with limited treatment options. Monthly or bi-monthly intravitreal injections administered in retinal specialty practices. Competitive dynamics with Apellis\'s Syfovre are a key monitoring variable, as both drugs compete for the same retinal specialist patient base and ophthalmology formulary positioning. Long-term differentiation depends on durability data and complement pathway sequencing options.',
            metrics: [
                {
                    id: 'izervay-revenue',
                    name: 'IZERVAY Annual Revenue (¥B)',
                    description: 'Global IZERVAY (avacincaptad pegol) net sales. Primarily US-driven, with ex-US approvals progressing. Reflects market share within the nascent GA treatment category.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥77.6B FY2025 (+33.2% YoY)',
                    target: 'Sustain 25–35% annual growth as GA category expands and retinal practice adoption broadens',
                    direction: 'higher_is_better',
                },
                {
                    id: 'izervay-vs-syfovre',
                    name: 'IZERVAY vs Syfovre Market Share (%)',
                    description: 'IZERVAY share of total GA therapy market relative to Apellis Syfovre (pegcetacoplan). Monitoring whether durability claims, dosing frequency (monthly vs bi-monthly), and retinal specialist preference shift over time.',
                    unit: 'percent',
                    frequency: 'quarterly',
                    currentValue: 'est. ~40–45% GA market share (FY2025)',
                    target: 'Maintain ≥40% market share as clinical differentiation data matures',
                    direction: 'higher_is_better',
                },
            ],
        },
        {
            id: 'veozah-womens-health',
            name: "VEOZAH Women's Health Expansion",
            description: 'VEOZAH (fezolinetant), a selective neurokinin 3 receptor (NK3R) antagonist for moderate-to-severe vasomotor symptoms (VMS) associated with menopause, delivered ¥46.6B in FY2025 (+37.7% YoY). VEOZAH is the first non-hormonal, non-SSRI/SNRI oral therapy approved for VMS, addressing the approximately 20–30 million US women experiencing moderate-to-severe hot flashes who prefer or require a non-hormonal option. Primary care and OB/GYN physician adoption is the key ramp driver. Long-term, the VMS market is substantial — est. $2–3B US peak — but VEOZAH must compete against menopausal hormone therapy (MHT) habit and emerging NK3R competitors. FY2026 label expansion opportunities (sleep disturbance) are being investigated.',
            metrics: [
                {
                    id: 'veozah-revenue',
                    name: 'VEOZAH Annual Revenue (¥B)',
                    description: 'Global VEOZAH (fezolinetant) net sales. US-centric in FY2025; Europe approvals progressively adding contribution.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥46.6B FY2025 (+37.7% YoY)',
                    target: 'Sustain 35%+ growth as primary care physician prescribing broadens beyond early adopters',
                    direction: 'higher_is_better',
                },
                {
                    id: 'veozah-nrx-growth',
                    name: 'VEOZAH New-to-Brand Prescriptions (NRx) Growth',
                    description: 'Weekly/monthly new-to-brand prescription volume growth in the US. NRx is the lead indicator for VEOZAH commercial traction ahead of IMS revenue recognition.',
                    unit: 'percent',
                    frequency: 'monthly',
                    currentValue: 'Positive NRx trend — gradual primary care ramp',
                    target: '>20% quarterly NRx growth through FY2026 as awareness programs scale',
                    direction: 'higher_is_better',
                },
            ],
        },
    ],
};

// ════════════════════════════════════════════════════════════════════════════
// CONSOLE 3: AMERICAS PERFORMANCE
// US ¥940.2B (+est. 8% YoY); dominant in oncology; Pfizer co-promotion economics
// ════════════════════════════════════════════════════════════════════════════
export const channelDevelopment: SemanticConsole = {
    id: 'americas-performance',
    title: 'Americas Performance',
    category: 'capacity-operations',
    segment: 'network',
    objective: 'Monitor Astellas United States and Americas revenue performance, which at ¥940.2B represents approximately 44% of total global revenues. The Americas segment is dominated by XTANDI (co-promoted with Pfizer) and PADCEV (co-developed with Pfizer), making Pfizer co-commercialization economics and US oncology market dynamics the primary performance drivers. Track US revenue by product, commercial operational efficiency, SG&A spend against co-promotion economics, and SMT-driven cost savings in the Americas commercial organization.',
    drivers: [
        {
            id: 'us-revenue-mix',
            name: 'US Revenue Growth & Product Mix',
            description: 'United States revenues of ¥940.2B in FY2025 span XTANDI (~¥480B est.), PADCEV (~¥200B est.), IZERVAY (~¥75B est.), VEOZAH (~¥45B est.), and XOSPATA (~¥35B est.). Revenue mix is shifting from XTANDI-dominated to a more diversified oncology and specialty portfolio — a structurally important transition as IRA pricing pressure on XTANDI materializes in FY2026. The aggregate US growth rate in FY2026 will depend on whether PADCEV and Strategic Brands collective growth of ~¥60–70B overcomes the ¥50B XTANDI IRA headwind.',
            crossReferences: ['xtandi-revenue-position', 'ira-pricing-risk'],
            metrics: [
                {
                    id: 'us-total-revenue',
                    name: 'US Total Revenue (¥B)',
                    description: 'Total Astellas net revenues generated in the United States across all marketed products.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥940.2B FY2025',
                    target: '¥950–970B FY2026 (navigating IRA headwind through portfolio diversification)',
                    direction: 'higher_is_better',
                },
                {
                    id: 'us-revenue-diversification',
                    name: 'US Revenue Concentration (XTANDI % of Total)',
                    description: 'XTANDI as a percentage of total US revenues. Tracking reduction in single-product concentration risk as Strategic Brands scale. Lower concentration signals healthier portfolio diversification.',
                    unit: 'percent',
                    frequency: 'annual',
                    currentValue: 'est. ~51% XTANDI share of US revenues (FY2025)',
                    target: '<45% XTANDI concentration in US by FY2027 as PADCEV and VYLOY scale',
                    direction: 'lower_is_better',
                },
            ],
        },
        {
            id: 'pfizer-co-promotion-economics',
            name: 'Pfizer Co-Promotion & Co-Development Economics',
            description: 'Both XTANDI and PADCEV are governed by co-promotion/co-development agreements with Pfizer. For XTANDI, Astellas and Pfizer share US promotion costs and profits under a collaboration agreement where Astellas recognizes its share of gross profits. For PADCEV, the global collaboration agreement covers development costs, commercialization, and profit-sharing across all markets. These arrangements reduce Astellas\'s effective US SG&A burden relative to a standalone commercial model, but also limit upside to the profit-sharing percentage. Monitoring collaboration settlement payments, cost-sharing adjustments, and Pfizer sales force integration effectiveness.',
            metrics: [
                {
                    id: 'xtandi-pfizer-collaboration-revenue',
                    name: 'XTANDI Collaboration Revenue Recognition (¥B)',
                    description: 'Astellas portion of XTANDI collaboration profits recognized in P&L per the Pfizer agreement — after deducting co-promotion costs, royalties, and manufacturing costs.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: 'Core driver of US P&L contribution (est. ¥200–250B net contribution)',
                    target: 'Protect collaboration economics through IRA transition; minimize margin dilution',
                    direction: 'higher_is_better',
                },
                {
                    id: 'padcev-collaboration-profit-share',
                    name: 'PADCEV Global Collaboration Profit Share (¥B)',
                    description: 'Astellas recognized profit from the PADCEV global Pfizer collaboration, reflecting rapid revenue ramp and favorable cost-sharing split during high-growth phase.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: 'Growing strongly with ¥221.2B revenue base and +34.8% growth',
                    target: 'PADCEV collaboration to become largest profit contributor by FY2027',
                    direction: 'higher_is_better',
                },
            ],
        },
        {
            id: 'americas-sga-efficiency',
            name: 'Americas Commercial SG&A Efficiency',
            description: 'Total group SG&A reached ¥860.3B in FY2025, a significant portion attributable to US commercial operations — oncology field forces, medical affairs, patient support programs, and managed care. The SMT (Sustainable Margin Transformation) program targets ¥11B in SG&A savings in FY2025 (achieved) and ¥40B total in FY2026, with the Americas commercial organization a key savings lever through organizational redesign, reduced non-promotional spend, and digital channel shift. SG&A as a percentage of revenue is the primary operating leverage metric.',
            metrics: [
                {
                    id: 'group-sga-total',
                    name: 'Group SG&A (¥B)',
                    description: 'Total Astellas selling, general and administrative expenses. Americas commercial costs are the largest single component. Reducing SG&A intensity (SG&A/Revenue ratio) is central to the FY2026 margin expansion guidance.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥860.3B FY2025',
                    target: 'Reduce SG&A intensity (SG&A/Revenue) toward 38% by FY2026 via SMT savings',
                    direction: 'lower_is_better',
                },
                {
                    id: 'sga-to-revenue-ratio',
                    name: 'SG&A as % of Revenue',
                    description: 'Group SG&A divided by total revenue — measures commercial cost efficiency. Declining ratio is the financial proof-point of SMT transformation delivering operating leverage.',
                    unit: 'percent',
                    frequency: 'annual',
                    currentValue: 'est. ~40.2% (¥860.3B / ¥2,139.2B) FY2025',
                    target: '<39% by FY2026 as SMT savings and revenue growth combine',
                    direction: 'lower_is_better',
                },
            ],
        },
    ],
};

// ════════════════════════════════════════════════════════════════════════════
// CONSOLE 4: INTERNATIONAL & ASIA PERFORMANCE
// EU ¥563.6B; Japan ¥289.0B; EM ¥230.7B; China ¥101.5B (+29.6%)
// ════════════════════════════════════════════════════════════════════════════
export const competitiveIntelligence: SemanticConsole = {
    id: 'international-asia-performance',
    title: 'International & Asia Performance',
    category: 'revenue-market',
    segment: 'strategy',
    objective: 'Monitor Astellas\'s revenue performance across established European markets (¥563.6B), Japan domestic operations (¥289.0B), International Markets (¥230.7B), and China (¥101.5B, +29.6%). Ex-US revenues constitute approximately 56% of total group revenues and provide geographic diversification against US IRA pricing risk. Key dynamics include XTANDI pricing under HTA frameworks in Europe, Japan NHI price revision cycles, VYLOY ramp in Asia\'s high-incidence gastric cancer markets, and China specialty pharma growth through co-promotion partnerships.',
    drivers: [
        {
            id: 'established-markets-europe',
            name: 'Established Markets (Europe) Revenue',
            description: 'European Established Markets revenue of ¥563.6B in FY2025 encompasses the five major markets (Germany, France, UK, Italy, Spain) plus other European markets. XTANDI is the dominant revenue contributor in Europe, where it holds reimbursement across all approved indications following HTA assessments. PADCEV and VYLOY are at earlier launch stages in Europe, with reimbursement negotiations progressing through country-specific HTA processes (AMNOG in Germany, prix/remboursement in France, NICE in UK). European pricing is structurally lower than US on a per-unit basis but volume and LOE (loss of exclusivity) protection provide multi-year revenue visibility for XTANDI.',
            metrics: [
                {
                    id: 'europe-revenue',
                    name: 'Established Markets Revenue (¥B)',
                    description: 'Total Astellas net revenues from European Established Markets (EU5 + other European countries).',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥563.6B FY2025',
                    target: 'Low single-digit growth as PADCEV and VYLOY reimbursements add to XTANDI base',
                    direction: 'higher_is_better',
                },
                {
                    id: 'europe-new-product-reimbursements',
                    name: 'EU Strategic Brand Reimbursement Milestones',
                    description: 'Tracking national reimbursement decisions for PADCEV (1L UC) and VYLOY (gastric cancer) across EU5 markets. HTA timelines typically 12–24 months post-EMA approval, creating a multi-year revenue ramp opportunity.',
                    unit: 'text',
                    frequency: 'quarterly',
                    currentValue: 'PADCEV EU reimbursements progressing; VYLOY EMA approval received 2024',
                    target: 'PADCEV in all EU5 markets by FY2026; VYLOY EU5 reimbursements by FY2027',
                    direction: 'higher_is_better',
                },
            ],
            children: [
                {
                    id: 'europe-xtandi-pricing',
                    name: 'Europe XTANDI Pricing & AMNOG Outcomes',
                    description: 'German AMNOG annual re-assessment and price negotiations for XTANDI across its three indications. AMNOG benchmarks German pricing and influences other EU5 markets through international reference pricing. Sustained pricing above negotiated AMNOG floor is critical to European operating margin.',
                    metrics: [
                        {
                            id: 'xtandi-eu-net-price',
                            name: 'XTANDI EU Average Net Price (index)',
                            description: 'Average net realized price for XTANDI across EU5 markets indexed to prior year. Measures HTA and rebate pressure.',
                            unit: 'index',
                            frequency: 'annual',
                            currentValue: 'Stable — AMNOG negotiations complete for mCRPC/mCSPC/nmCRPC',
                            target: 'Protect net price within ±5% of current levels',
                            direction: 'on_target',
                        },
                    ],
                },
            ],
        },
        {
            id: 'japan-domestic-performance',
            name: 'Japan Domestic Performance',
            description: 'Japan revenue of ¥289.0B in FY2025 reflects Astellas\'s strong home market position. Japan NHI biennial price revisions (April 2024 completed; next April 2026) create structured pricing headwinds of typically 5–10% on established products, moderated by volume expansion in new indications and the VYLOY launch in a high-prevalence gastric cancer market. XTANDI and XOSPATA are core Japan revenue contributors. Japan strategic importance extends beyond revenue — local clinical trial and regulatory capabilities support Asia-wide development strategy, and NHI approval is typically required before China and Korea submissions.',
            metrics: [
                {
                    id: 'japan-revenue',
                    name: 'Japan Revenue (¥B)',
                    description: 'Total Astellas net revenues in Japan across all marketed products, net of NHI price revision impacts.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥289.0B FY2025',
                    target: 'Stabilize at ¥285–300B through NHI revision cycles; VYLOY adds incremental volume',
                    direction: 'higher_is_better',
                },
                {
                    id: 'japan-nhi-price-impact',
                    name: 'Japan NHI Biennial Price Revision Impact (¥B)',
                    description: 'Estimated revenue impact from Japan NHI biennial price revision cycles on Astellas\'s Japan product portfolio. April 2026 revision is the next event to monitor.',
                    unit: 'currency',
                    frequency: 'semi-annual',
                    currentValue: 'April 2024 revision absorbed; April 2026 revision pending',
                    target: 'Limit NHI revision headwind to <¥15B through volume and new product offsets',
                    direction: 'lower_is_better',
                },
            ],
        },
        {
            id: 'china-emerging-markets',
            name: 'China & Emerging Markets Growth',
            description: 'China revenues reached ¥101.5B in FY2025 (+29.6% YoY), the fastest-growing major geography, driven by XTANDI volume growth following NRDL (National Reimbursement Drug List) inclusion and specialty oncology market expansion. International Markets (excl. China) of ¥230.7B span Southeast Asia, Middle East, Latin America, and other emerging economies. The China VRDL dynamics are critical — NRDL inclusion of XTANDI delivered substantial volume at materially reduced net price, and VYLOY\'s China regulatory pathway (Claudin 18.2-targeted therapy in the world\'s highest-gastric-cancer-burden market) represents one of the most significant unpriced pipeline value opportunities in the portfolio.',
            metrics: [
                {
                    id: 'china-revenue',
                    name: 'China Revenue (¥B)',
                    description: 'Total Astellas net revenues in China, reflecting NRDL-driven XTANDI volume ramp and nascent Strategic Brands launches.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥101.5B FY2025 (+29.6% YoY)',
                    target: 'Sustain 20–25% growth; VYLOY China approval adds ¥20–30B by FY2028',
                    direction: 'higher_is_better',
                },
                {
                    id: 'international-markets-revenue',
                    name: 'International Markets Revenue (¥B)',
                    description: 'Revenue from International Markets excluding China (Southeast Asia, LatAm, Middle East, Australasia). Growing as specialty oncology infrastructure develops in key emerging economies.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥230.7B FY2025',
                    target: 'Mid-single-digit growth; selective Strategic Brand launches in priority markets',
                    direction: 'higher_is_better',
                },
            ],
        },
    ],
};

// ════════════════════════════════════════════════════════════════════════════
// CONSOLE 5: ENTERPRISE & PIPELINE PERFORMANCE
// Core OP ¥555.7B (26.0%); R&D ¥314.8B; SMT ¥65B cumulative; 3 POCs FY2025
// ════════════════════════════════════════════════════════════════════════════
export const storeOperations: SemanticConsole = {
    id: 'enterprise-pipeline-performance',
    title: 'Enterprise & Pipeline Performance',
    category: 'financial',
    segment: 'finance',
    objective: 'Monitor Astellas enterprise-level financial performance and R&D pipeline progress. Core Operating Profit of ¥555.7B (26.0% margin) in FY2025 underpins FY2026 guidance of ¥620B Core OP (27.9% margin) — a 190bps margin expansion target that depends on SMT savings (¥40B target), revenue mix shift to higher-margin Strategic Brands, and controlled R&D investment growth to ¥355B. Track SMT transformation milestones, pipeline advancement (3 Phase 3 initiations planned in FY2026), and Core EPS trajectory from ¥237.01 to the guided ¥256.77.',
    drivers: [
        {
            id: 'core-financial-performance',
            name: 'Core Financial Performance & FY2026 Guidance',
            description: 'Astellas measures performance on a "core basis" — excluding one-time items, intangible amortization, and impairments — to isolate sustainable operating profitability. FY2025 Core Operating Profit of ¥555.7B (26.0% margin) and Core EPS of ¥237.01 form the base for FY2026 guidance: Revenue ¥2,220B (+3.8%), Core OP ¥620B (+11.6%), Core OP Margin 27.9% (+190bps), Core EPS ¥256.77 (+8.3%). The margin expansion story hinges on (1) SMT delivering ¥40B in savings, (2) higher-margin Strategic Brands growing as a share of total, and (3) IRA headwind of ~¥50B being absorbed. The FY2026 guidance implicitly requires ¥70B of year-on-year Core OP growth despite the XTANDI IRA headwind — a substantial operational challenge.',
            metrics: [
                {
                    id: 'core-operating-profit',
                    name: 'Core Operating Profit (¥B)',
                    description: 'Astellas Core Operating Profit — primary P&L performance indicator on a normalized basis, excluding non-recurring items, amortization of intangibles, and restructuring.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥555.7B FY2025',
                    target: '¥620B FY2026 (+11.6% YoY)',
                    direction: 'higher_is_better',
                },
                {
                    id: 'core-operating-margin',
                    name: 'Core Operating Profit Margin (%)',
                    description: 'Core Operating Profit as a percentage of total revenue. Margin expansion is the primary financial discipline metric — demonstrates that revenue growth translates to more than proportional profit growth through SG&A and R&D efficiency.',
                    unit: 'percent',
                    frequency: 'quarterly',
                    currentValue: '26.0% FY2025',
                    target: '27.9% FY2026 (+190bps YoY)',
                    direction: 'higher_is_better',
                },
                {
                    id: 'core-eps',
                    name: 'Core EPS (¥)',
                    description: 'Core earnings per share — used by Astellas for incentive compensation and investor guidance. Reflects core operating profit after tax and share count.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥237.01 FY2025',
                    target: '¥256.77 FY2026 (+8.3% YoY)',
                    direction: 'higher_is_better',
                },
            ],
            children: [
                {
                    id: 'total-revenue-guidance',
                    name: 'Total Revenue vs FY2026 Guidance',
                    description: 'FY2026 revenue guidance of ¥2,220B represents +3.8% growth over FY2025 ¥2,139.2B. This implies that PADCEV, VYLOY, IZERVAY, and VEOZAH growth (~+¥120B combined) must more than offset the XTANDI IRA headwind (~¥50B) and Japan NHI revision impact.',
                    metrics: [
                        {
                            id: 'total-revenue',
                            name: 'Total Revenue (¥B)',
                            description: 'Consolidated Astellas total net revenues across all products and geographies.',
                            unit: 'currency',
                            frequency: 'quarterly',
                            currentValue: '¥2,139.2B FY2025 (+11.9% YoY)',
                            target: '¥2,220B FY2026 (+3.8% YoY)',
                            direction: 'higher_is_better',
                        },
                    ],
                },
            ],
        },
        {
            id: 'smt-transformation-program',
            name: 'SMT (Sustainable Margin Transformation) Program',
            description: 'The Sustainable Margin Transformation (SMT) program is Astellas\'s multi-year operating cost reduction initiative targeting structural SG&A and R&D savings without compromising pipeline investment capacity or commercial effectiveness. FY2025 achieved ¥21B (¥11B SG&A + ¥10B R&D savings), bringing cumulative SMT savings to ¥65B since program inception. FY2026 target of ¥40B (nearly 2x FY2025 achievement) is ambitious and requires delivery of organizational redesign, vendor consolidation, digital transformation of commercial processes, and clinical trial operational efficiency improvements. SMT savings are the primary bridge to the FY2026 Core OP margin expansion of 190bps — without full ¥40B delivery, the margin guidance is at risk.',
            metrics: [
                {
                    id: 'smt-annual-savings',
                    name: 'SMT Annual Savings Achieved (¥B)',
                    description: 'Annual gross savings delivered through SMT program initiatives across SG&A and R&D cost lines. Year-on-year acceleration is required to meet FY2026 ¥40B target.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥21B FY2025 (¥11B SG&A + ¥10B R&D)',
                    target: '¥40B FY2026 (+90% vs FY2025 achievement)',
                    direction: 'higher_is_better',
                },
                {
                    id: 'smt-cumulative-savings',
                    name: 'SMT Cumulative Savings (¥B)',
                    description: 'Cumulative SMT gross savings since program inception. At ¥65B cumulative through FY2025, the program has reset structural cost levels. FY2026 ¥40B target would bring cumulative to ¥105B.',
                    unit: 'currency',
                    frequency: 'annual',
                    currentValue: '¥65B cumulative through FY2025',
                    target: '¥105B cumulative by end of FY2026',
                    direction: 'higher_is_better',
                },
            ],
            children: [
                {
                    id: 'smt-sga-savings',
                    name: 'SMT SG&A Component Savings',
                    description: 'SMT savings allocated to the SG&A cost base — primarily commercial organizational redesign, non-personal promotion efficiency, reduced agency spend, and digital channel shift reducing field force duplication.',
                    metrics: [
                        {
                            id: 'smt-sga-annual',
                            name: 'SMT SG&A Savings (¥B)',
                            description: 'Annual SG&A savings component of SMT program.',
                            unit: 'currency',
                            frequency: 'annual',
                            currentValue: '¥11B FY2025',
                            target: '~¥22–25B FY2026 SG&A component',
                            direction: 'higher_is_better',
                        },
                    ],
                },
                {
                    id: 'smt-rd-savings',
                    name: 'SMT R&D Component Savings',
                    description: 'SMT savings allocated to R&D — achieved through clinical trial operational efficiency, CRO contracting renegotiations, deprioritization of lower-probability pipeline assets, and reduced early-discovery overhead. Achieved alongside increasing absolute R&D investment from ¥314.8B to ¥355B in FY2026.',
                    metrics: [
                        {
                            id: 'smt-rd-annual',
                            name: 'SMT R&D Savings (¥B)',
                            description: 'Annual R&D savings component of SMT program. Realized against a growing absolute R&D spend base.',
                            unit: 'currency',
                            frequency: 'annual',
                            currentValue: '¥10B FY2025',
                            target: '~¥15–18B FY2026 R&D component',
                            direction: 'higher_is_better',
                        },
                    ],
                },
            ],
        },
        {
            id: 'rd-pipeline-progress',
            name: 'R&D Investment & Pipeline Advancement',
            description: 'Astellas invested ¥314.8B in R&D in FY2025, rising to a guided ¥355B in FY2026 (+12.8%) — signaling conviction that pipeline investment is the long-term answer to XTANDI loss of exclusivity and IRA pricing pressure beyond FY2027. FY2025 delivered 3 Proof of Concept (POC) achievements — critical binary value-creation events confirming mechanism-of-action in humans. FY2026 plans multiple Phase 3 initiations that will define the next wave of potential NMEs reaching commercialization by the 2030s. Pipeline focus areas: oncology (solid tumors, hematology), ophthalmology (geographic atrophy follow-ons), and immunology. The balance between SMT cost discipline and preserving R&D productivity capacity is the central strategic tension management must navigate.',
            metrics: [
                {
                    id: 'rd-investment',
                    name: 'R&D Investment (¥B)',
                    description: 'Total Astellas R&D expenditure. Increasing investment signals pipeline-building conviction; must be balanced against SMT savings delivery and Core OP margin guidance.',
                    unit: 'currency',
                    frequency: 'quarterly',
                    currentValue: '¥314.8B FY2025',
                    target: '¥355B FY2026 (+12.8% YoY)',
                    direction: 'higher_is_better',
                },
                {
                    id: 'poc-achievements',
                    name: 'Proof of Concept (POC) Achievements',
                    description: 'Number of pipeline programs achieving POC (Phase 1b/2 evidence of efficacy in target indication). POCs are Astellas\'s primary pipeline productivity KPI — each POC is a decision gate for Phase 3 advancement and represents realized R&D investment value.',
                    unit: 'count',
                    frequency: 'annual',
                    currentValue: '3 POCs achieved in FY2025',
                    target: '3+ POCs annually; Phase 3 initiations from FY2025 POC cohort in FY2026',
                    direction: 'higher_is_better',
                },
                {
                    id: 'phase3-initiations',
                    name: 'Phase 3 Trial Initiations (FY2026)',
                    description: 'Number of new Phase 3 clinical trial initiations planned for FY2026. Phase 3 starts are the downstream output of FY2025 POC success and set the timeline for potential NDA/BLA submissions in 2028–2030.',
                    unit: 'count',
                    frequency: 'annual',
                    currentValue: 'Multiple Phase 3 initiations planned in FY2026 (from FY2025 POC cohort)',
                    target: '3+ Phase 3 starts in FY2026 across oncology and specialty franchises',
                    direction: 'higher_is_better',
                },
            ],
        },
    ],
};

// ════════════════════════════════════════════════════════════════════════════
// AGGREGATION ARRAY — all 5 Astellas Pharma business consoles
// ════════════════════════════════════════════════════════════════════════════
export const allSemanticConsoles = [
    northAmericaPerformance,
    internationalPerformance,
    channelDevelopment,
    competitiveIntelligence,
    storeOperations,
];
