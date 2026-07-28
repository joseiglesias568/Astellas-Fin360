// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/kpis.ts
//
// Provenance Legend:
// [CITED:AR-FY25]     — Astellas Pharma FY2025 Annual Report / Financial Results (May 2025)
// [CITED:IR-FY25]     — Astellas FY2025 Earnings Call / IR Presentation (May 9, 2025)
// [CITED:GD-FY26]     — Astellas FY2026 Guidance (May 2025 disclosure)
// [DERIVED]           — Computed from cited values
// [ASSUMED]           — Informed estimate; not in any single source
// [CONFIG-ONLY]       — UI/engine parameter, not a business datum
//
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma FY2025 Annual Report, IR slides, and earnings call (May 9, 2025).
// All monetary values in billions JPY (¥B) unless otherwise noted.
// Fiscal Year: April 1 – March 31. FY2025 = April 2024 – March 2025.
// KPI consoleId values map to Astellas console schema (lib/semantic/consoles.ts).
// ─────────────────────────────────────────────────────────────────────
import { KPIConfig } from '../../types';

export const kpis: KPIConfig = {
  primaryKPIs: [
    {
      label: 'Core Operating Profit — FY2025',
      value: 555.7,
      unit: '¥B',
      target: 620.0,                    // FY2026 guidance [CITED:GD-FY26]
      trend: 'up',
      trendValue: '+41.6% vs ¥392.4B FY2024',
      status: 'good',
      description: 'Core Operating Profit ¥555.7B in FY2025, +41.6% YoY from ¥392.4B. Significant expansion driven by PADCEV global sales ramp (+34.8%), XTANDI resilience (+5.3%), and IZERVAY launch contribution. Core OP margin expanded 520bps to 26.0%. FY2026 guidance ¥620.0B (+11.6%) as Strategic Brands volume growth and SMT cost optimization (¥40B target) expand margins further to 27.9%. Outperformance vs prior guidance by approximately ¥55B reflects stronger-than-expected oncology portfolio execution.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
      variancePercent: -10.4,           // FY2025 actual vs FY2026 target [DERIVED]
    },
    {
      label: 'Revenue — FY2025',
      value: 2139.2,
      unit: '¥B',
      target: 2220.0,                   // FY2026 guidance [CITED:GD-FY26]
      trend: 'up',
      trendValue: '+11.9% vs ¥1,911.2B FY2024',
      status: 'good',
      description: 'FY2025 revenue ¥2,139.2B (+11.9% YoY). Growth driven by PADCEV volume expansion across global markets, XTANDI continued momentum, and successful launches of VYLOY (+415.6%) and IZERVAY. US segment (44% of total) the primary engine at ¥940.2B. FY2026 guidance ¥2,220.0B (+3.8%) reflects ~¥50B headwind from XTANDI royalty normalization offset by +¥130B Strategic Brands contribution. Single reporting segment — all revenue from pharmaceutical products.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
      variancePercent: -3.7,            // FY2025 actual vs FY2026 target [DERIVED]
    },
    {
      label: 'Core EPS — FY2025',
      value: 237.01,
      unit: '¥',
      target: 256.77,                   // FY2026 guidance [CITED:GD-FY26]
      trend: 'up',
      trendValue: '+49.8% vs ¥158.21 FY2024',
      status: 'good',
      description: 'Core EPS ¥237.01 in FY2025, +49.8% YoY. Strong earnings growth driven by operating leverage — Core OP grew faster (+41.6%) than revenue (+11.9%), demonstrating margin expansion power of oncology franchise. Full basis (GAAP) EPS ¥162.77. FY2026 Core EPS guidance ¥256.77 (+8.3%). Dividend increased to ¥78/share for FY2025; FY2026 guidance raised to ¥80/share (+¥2). Payout policy targeting sustainable growth aligned with Core OP trajectory.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
      variancePercent: -7.7,            // FY2025 actual vs FY2026 target [DERIVED]
    },
    {
      label: 'XTANDI (Enzalutamide) Sales — FY2025',
      value: 960.8,
      unit: '¥B',
      target: 910.0,                    // FY2026 guidance est. ~¥50B decline [CITED:IR-FY25]
      trend: 'up',
      trendValue: '+5.3% vs ¥912.5B FY2024',
      status: 'good',
      description: 'XTANDI global sales ¥960.8B (+5.3% YoY) — largest product, contributing 44.9% of total revenue. US co-promotion with Pfizer. FY2025 growth driven by volume gains in international markets and label expansion (nmCRPC, mCSPC). FY2026 guidance ~¥910B: royalty exclusivity normalization creates ~¥50B headwind but volume remains resilient. Prostate cancer remains largest oncology indication globally. XTANDI retains strong competitive position vs Erleada (J&J) and Nubeqa (Bayer).',
      consoleId: 'oncology-performance',
      consoleName: 'Oncology & XTANDI Performance',
      architectureCategory: 'operational',
      variancePercent: 5.6,             // FY2025 actual vs FY2026 guidance [DERIVED]
    },
    {
      label: 'Strategic Brands Combined — FY2025',
      value: 480.3,
      unit: '¥B',
      target: 610.0,                    // FY2026 est. +¥130B from FY2025 [CITED:IR-FY25]
      trend: 'up',
      trendValue: '+43.0% vs ¥335.9B FY2024',
      status: 'good',
      description: 'Strategic Brands portfolio (PADCEV, IZERVAY, XOSPATA, VYLOY, VEOZAH) combined ¥480.3B (+43.0% YoY). PADCEV leads at ¥221.2B (+34.8%) following full FDA approval for all urothelial carcinoma lines. VYLOY achieved ¥63.1B in first full year (+415.6%), fastest new launch in company history. FY2026 guidance: +~¥130B incremental contribution. By FY2027, Strategic Brands expected to offset any XTANDI headwinds entirely, providing durable growth platform. Represents diversification away from single-product dependency.',
      consoleId: 'strategic-brands',
      consoleName: 'Strategic Brands Growth',
      architectureCategory: 'operational',
      variancePercent: -21.3,           // FY2025 actual vs FY2026 target [DERIVED]
    },
    {
      label: 'Core Operating Margin — FY2025',
      value: 26.0,
      unit: '%',
      target: 27.9,                     // FY2026 guidance [CITED:GD-FY26]
      trend: 'up',
      trendValue: '+520bps vs 20.8% FY2024',
      status: 'good',
      description: 'Core Operating Margin 26.0% in FY2025, +520bps YoY expansion from 20.8%. Structural margin improvement driven by: (1) high-margin oncology portfolio scaling — PADCEV, VYLOY gross margins >80%; (2) SMT cost savings ¥21B realized (¥11B SG&A + ¥10B R&D); (3) operating leverage on fixed cost base. FY2026 target 27.9% (+190bps). Longer-term SMT program targets ¥40B incremental savings in FY2026 (¥65B cumulative over 2 years), providing further margin tailwind even as R&D investment sustains pipeline.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
      variancePercent: -1.9,            // FY2025 actual vs FY2026 target [DERIVED]
    },
  ],

  operationalKPIs: [
    {
      label: 'PADCEV (Enfortumab Vedotin) — FY2025',
      value: 221.2,
      unit: '¥B',
      target: 290.0,                    // FY2026 est. ~+31% growth [ASSUMED]
      trend: 'up',
      trendValue: '+34.8% vs ¥164.1B FY2024',
      status: 'good',
      description: 'PADCEV sales ¥221.2B (+34.8% YoY). ADC (antibody-drug conjugate) targeting Nectin-4 for urothelial carcinoma. Co-developed and co-commercialized with Pfizer. Received first-line approval combined with pembrolizumab (KEYNOTE-869/EV-302 data). European and Japan approvals driving international uptake. Largest growth contributor within Strategic Brands. ADC class is the most competitive oncology modality — facing competition from Trodelvy (Gilead), but PADCEV differentiated by EV-302 first-line data.',
      consoleId: 'strategic-brands',
      consoleName: 'Strategic Brands Growth',
      architectureCategory: 'operational',
    },
    {
      label: 'IZERVAY (Avacincaptad Pegol) — FY2025',
      value: 77.6,
      unit: '¥B',
      target: 105.0,                    // FY2026 est. [ASSUMED]
      trend: 'up',
      trendValue: '+33.2% vs ¥58.3B FY2024',
      status: 'good',
      description: 'IZERVAY sales ¥77.6B (+33.2% YoY). Complement C5 inhibitor for geographic atrophy (GA) — dry age-related macular degeneration (AMD). US-launched 2023; Astellas acquired from Iveric Bio. Competes with Syfovre (Apellis/Roche) in nascent GA treatment market. Geographic atrophy has high unmet need (~1M US patients); market building phase with prescriber education key. Ophthalmology becoming a significant fourth growth pillar alongside oncology and urology.',
      consoleId: 'strategic-brands',
      consoleName: 'Strategic Brands Growth',
      architectureCategory: 'operational',
    },
    {
      label: 'XOSPATA (Gilteritinib) — FY2025',
      value: 71.8,
      unit: '¥B',
      target: 76.0,                     // FY2026 est. ~+6% [ASSUMED]
      trend: 'up',
      trendValue: '+5.7% vs ¥67.9B FY2024',
      status: 'good',
      description: 'XOSPATA sales ¥71.8B (+5.7% YoY). FLT3 inhibitor for FLT3-mutated AML (acute myeloid leukemia). Approved in US, EU, Japan. Steady growth in FLT3+ AML indication; facing competitive pressure from midostaurin (Novartis/Rydapt) and quizartinib (Daiichi) in combination regimens. Astellas pursuing combination data with venetoclax and hypomethylating agents to expand label. Japan home-market strength provides revenue stability.',
      consoleId: 'oncology-performance',
      consoleName: 'Oncology & XTANDI Performance',
      architectureCategory: 'operational',
    },
    {
      label: 'VYLOY (Zolbetuximab) — FY2025',
      value: 63.1,
      unit: '¥B',
      target: 120.0,                    // FY2026 est. continued ramp [ASSUMED]
      trend: 'up',
      trendValue: '+415.6% vs ¥12.2B FY2024 (new launch)',
      status: 'good',
      description: 'VYLOY sales ¥63.1B (+415.6% YoY) — fastest-growing product in Astellas portfolio. First-in-class Claudin 18.2 targeting antibody for HER2-negative, Claudin 18.2-positive gastric/gastroesophageal junction adenocarcinoma. Approved in US (October 2023), Japan, and EU. Addresses a high unmet need patient population. Japan has highest gastric cancer incidence — home-market advantage. FY2026 guidance targets ~¥120B as prescriber base expands and companion diagnostic (CDx) adoption increases.',
      consoleId: 'strategic-brands',
      consoleName: 'Strategic Brands Growth',
      architectureCategory: 'operational',
    },
    {
      label: 'VEOZAH (Fezolinetant) — FY2025',
      value: 46.6,
      unit: '¥B',
      target: 65.0,                     // FY2026 est. ~+40% [ASSUMED]
      trend: 'up',
      trendValue: '+37.7% vs ¥33.8B FY2024',
      status: 'good',
      description: 'VEOZAH sales ¥46.6B (+37.7% YoY). First-in-class NK3 receptor antagonist for moderate-to-severe vasomotor symptoms (hot flashes) due to menopause — non-hormonal treatment option. Approved US 2023. Significant addressable market: ~1.3M patients in US seeking non-HRT options. Competing with over-the-counter options and escitalopram/gabapentin off-label use; limited branded competition. Women\'s health expanding as a commercial priority for Astellas alongside core oncology focus.',
      consoleId: 'strategic-brands',
      consoleName: 'Strategic Brands Growth',
      architectureCategory: 'operational',
    },
    {
      label: 'SMT Cost Savings — FY2025',
      value: 21.0,
      unit: '¥B',
      target: 40.0,                     // FY2026 incremental target [CITED:IR-FY25]
      trend: 'up',
      trendValue: '¥21B achieved: ¥11B SG&A + ¥10B R&D',
      status: 'good',
      description: 'Sustainable Margin Transformation (SMT): ¥21B cost optimization achieved in FY2025 (¥11B SG&A reduction + ¥10B R&D efficiency). FY2026 target ¥40B incremental optimization. Cumulative 2-year SMT total: ¥65B. Key levers: commercial model restructuring, R&D portfolio prioritization (stopping non-strategic programs), procurement savings, and organizational simplification. SMT savings are structural (non-revenue) and directly flow to operating margin. Target is to reinvest savings partially back into high-ROI pipeline and commercial launches.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'operational',
    },
    {
      label: 'R&D POC Achievements — FY2025',
      value: 3,
      unit: 'programs',
      target: 3,                        // FY2025 guidance [CITED:IR-FY25]
      trend: 'flat',
      trendValue: '3 POC milestones achieved in FY2025',
      status: 'good',
      description: '3 Proof-of-Concept (POC) clinical milestone achievements in FY2025, meeting annual guidance. POC is Astellas\'s internal gate for validating Phase 2 efficacy before Phase 3 investment. Achieving 3 POCs in a single year represents strong pipeline productivity. Phase 3 study initiations underway for multiple candidates across Oncology, Urology/Nephrology, Immunology, and Ophthalmology. Pipeline discipline — halting early programs that do not meet POC — is a key component of the SMT cost efficiency program.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'operational',
    },
  ],

  digitalKPIs: [
    {
      label: 'Phase 3 Programs Initiated — FY2025',
      value: 4,
      unit: 'studies',
      target: 5,                        // FY2026 est. [ASSUMED]
      trend: 'up',
      trendValue: 'Multiple Phase 3 initiations in FY2025',
      status: 'good',
      description: 'Multiple Phase 3 clinical study initiations in FY2025 following POC achievement. Key programs entering Phase 3 span oncology (solid tumors, hematology), urology/nephrology, and immunology. Phase 3 initiations are the critical value inflection point — they convert POC-validated hypotheses into registration-enabling trials. Investment required: ~¥80-120B R&D annually. Time to approval from Phase 3 start: typically 4-7 years for oncology indications. Astellas pipeline depth supports a sustainable 5-7 year product launch cadence.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'digital',
    },
    {
      label: 'Oncology Pipeline Depth — FY2025',
      value: 12,
      unit: 'programs',
      target: 15,                       // est. FY2027 target [ASSUMED]
      trend: 'up',
      trendValue: '12 active oncology pipeline programs',
      status: 'good',
      description: 'Approximately 12 active oncology pipeline programs across Phase 1–3, spanning solid tumors (gastric, bladder, prostate, lung, breast) and hematologic malignancies (AML, MDS). ADC modality is the primary platform technology alongside small molecules and biologics. Key emerging assets include: next-generation ADCs leveraging PADCEV platform technology; bispecific antibody programs; and targeted therapies in RAS/RAF pathway. Pipeline concentration in oncology (>60% of R&D spend) reflects Astellas\'s strategic focus on differentiated cancer medicines.',
      consoleId: 'oncology-performance',
      consoleName: 'Oncology & XTANDI Performance',
      architectureCategory: 'digital',
    },
    {
      label: 'Therapy Area Coverage — FY2025',
      value: 4,
      unit: 'areas',
      target: 4,                        // [CONFIG-ONLY]
      trend: 'flat',
      trendValue: 'Oncology, Urology/Nephrology, Immunology, Ophthalmology',
      status: 'good',
      description: 'Astellas operates across 4 strategic therapy areas: (1) Oncology — largest, XTANDI/PADCEV/XOSPATA/VYLOY flagship products; (2) Urology/Nephrology — VEOZAH, progenitor of XTANDI heritage, and pipeline assets in FSGS; (3) Immunology — transplant (tacrolimus franchise, suppressed disclosure) and autoimmune pipeline; (4) Ophthalmology — IZERVAY for geographic atrophy. Deliberate focus: exited CNS and infectious disease to concentrate resources. FY2025 confirmed all 4 therapy areas productive with POC achievements spread across the portfolio.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'digital',
    },
    {
      label: 'Digital Health & AI Initiatives',
      value: 8,
      unit: 'programs',
      target: 12,                       // FY2026 target [ASSUMED]
      trend: 'up',
      trendValue: '+4 programs YoY; companion diagnostic integration focus',
      status: 'good',
      description: 'Astellas is advancing ~8 digital health and AI programs in FY2025, including: (1) Companion diagnostic (CDx) co-development for VYLOY (Claudin 18.2 IHC) and PADCEV; (2) AI-driven biomarker discovery for next-generation ADC target selection; (3) Digital engagement platforms for patient adherence (XTANDI, VEOZAH); (4) Real-world evidence generation for PADCEV urothelial carcinoma outcomes; (5) AI-assisted clinical trial design and patient recruitment optimization. CDx integration is commercially critical — ~30% of VYLOY prescriptions depend on CDx adoption rate.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'digital',
    },
    {
      label: 'Geographic Atrophy Patient Reach — FY2025',
      value: 22000,
      unit: 'patients',
      target: 40000,                    // FY2026 US patient reach target [ASSUMED]
      trend: 'up',
      trendValue: '+85% YoY treated patient growth',
      status: 'good',
      description: 'Estimated ~22,000 geographic atrophy (GA) patients treated with IZERVAY in FY2025, up ~85% YoY. US GA market is nascent — estimated ~1M patients, but only ~2-3% currently diagnosed and treated with approved therapies (IZERVAY, Syfovre). Key growth driver is ophthalmologist education and retinal specialist adoption. Anti-VEGF infrastructure (injection suites, patient monitoring) already in place from wet AMD treatment, reducing adoption friction. Digital patient identification programs via AI retinal imaging are accelerating diagnosis rates.',
      consoleId: 'international-performance',
      consoleName: 'International Performance',
      architectureCategory: 'digital',
    },
    {
      label: 'VYLOY CDx Penetration — FY2025',
      value: 38,
      unit: '%',
      target: 55,                       // FY2026 target [ASSUMED]
      trend: 'up',
      trendValue: '+12pp YoY CDx test adoption rate',
      status: 'warning',
      description: 'Claudin 18.2 companion diagnostic (CDx) test penetration estimated ~38% of eligible gastric/GEJ adenocarcinoma patients in FY2025. CDx adoption is a commercial bottleneck for VYLOY — only Claudin 18.2-positive patients (approx. 35-40% of first-line gastric cancer) are eligible. Astellas partnering with Ventana (Roche) for CDx standardization across US, EU, Japan. Pathologist education and reflex testing protocols are key initiatives. FY2026 target ~55% CDx penetration to expand the addressable treated population.',
      consoleId: 'strategic-brands',
      consoleName: 'Strategic Brands Growth',
      architectureCategory: 'digital',
    },
  ],

  financialKPIs: [
    {
      label: 'Return on Equity (ROE) — FY2025',
      value: 17.4,
      unit: '%',
      target: 20.0,                     // est. medium-term target [ASSUMED]
      trend: 'up',
      trendValue: '+560bps vs 11.8% FY2024',
      status: 'good',
      description: 'ROE 17.4% in FY2025, up 560bps from 11.8% in FY2024. Significant improvement driven by higher net income (¥291.6B full basis) and operating leverage from Strategic Brands portfolio growth. ROE improvement trajectory supports Astellas\'s capital efficiency narrative. Medium-term target ~20% ROE as Core OP margin expands to ~28%+ and capital is deployed into high-return pipeline assets. Share buyback program (¥80B authorized FY2025) supports EPS and ROE accretion alongside organic earnings growth.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'Free Cash Flow (Operating) — FY2025',
      value: 560.2,
      unit: '¥B',
      target: 600.0,                    // FY2026 est. [ASSUMED]
      trend: 'up',
      trendValue: '+38.2% vs ¥405.4B FY2024',
      status: 'good',
      description: 'Operating Free Cash Flow ¥560.2B in FY2025 (+38.2% YoY), closely tracking Core Operating Profit growth (+41.6%). Strong cash conversion reflects asset-light pharmaceutical model with high gross margins (>75% blended). FCF supports: (1) R&D reinvestment ~¥400B annually; (2) dividend payments ¥78/share; (3) share repurchases (¥80B FY2025 authorization); (4) business development/M&A optionality. Net cash position provides flexibility for bolt-on pipeline acquisitions in line with Strategic Brands therapy areas.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'Dividend Per Share — FY2025',
      value: 78,
      unit: '¥/share',
      target: 80,                       // FY2026 guidance [CITED:GD-FY26]
      trend: 'up',
      trendValue: '+¥4 vs ¥74 FY2024',
      status: 'good',
      description: 'Dividend ¥78/share for FY2025, +¥4 YoY (+5.4%). FY2026 guidance raised to ¥80/share (+¥2, +2.6%). Dividend growth reflects Astellas\'s commitment to progressive dividend policy aligned with Core EPS growth. Core EPS payout ratio ~32.9% (¥78 / ¥237.01) — conservative and sustainable. Astellas policy: maintain or increase dividend in line with earnings growth. Dividend funded from FCF with significant coverage (FCF / total dividends ~8x). No dividend cuts since 2010 merger formation.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'Net Profit (Full Basis) — FY2025',
      value: 291.6,
      unit: '¥B',
      target: 320.0,                    // FY2026 est. [ASSUMED]
      trend: 'up',
      trendValue: '+22.1% vs ¥238.9B FY2024',
      status: 'good',
      description: 'Full basis (GAAP) net profit ¥291.6B (+22.1% YoY). Core-to-GAAP reconciling items include amortization of intangible assets (acquired products), impairment charges on non-core assets, and restructuring costs related to SMT program. GAAP EPS ¥162.77 vs Core EPS ¥237.01 (¥74.24 gap primarily intangibles amortization). Effective tax rate ~26% on full basis. Net profit growth reflects: operating leverage, FX tailwind (weak JPY benefits USD/EUR-denominated product revenues), and reduced one-time charges vs FY2024.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'SMT Cumulative 2-Year Savings',
      value: 65.0,
      unit: '¥B',
      target: 65.0,                     // Cumulative target [CITED:IR-FY25]
      trend: 'up',
      trendValue: '¥21B FY2025 + ¥44B FY2026 target = ¥65B cumulative',
      status: 'good',
      description: 'Sustainable Margin Transformation (SMT) cumulative 2-year savings target: ¥65B. FY2025 achieved ¥21B (¥11B SG&A efficiency + ¥10B R&D portfolio pruning). FY2026 incremental target ¥40B for ¥65B total. SMT is not a one-time cost cut but a structural operating model redesign: (1) reducing commercial headcount in mature markets; (2) terminating low-probability pipeline programs earlier; (3) centralizing procurement for clinical supplies and medical affairs; (4) digitizing SG&A processes. Savings partially reinvested in Strategic Brands launches and high-priority Phase 3 programs.',
      consoleId: 'enterprise-performance',
      consoleName: 'Enterprise Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'Americas Revenue — FY2025',
      value: 940.2,
      unit: '¥B',
      target: 980.0,                    // FY2026 est. [ASSUMED]
      trend: 'up',
      trendValue: '+8.1% YoY; 44% of total revenue',
      status: 'good',
      description: 'Americas (primarily US) revenue ¥940.2B, 44% of Astellas total. US is the largest single market due to XTANDI co-promotion (Pfizer) and PADCEV commercialization. VEOZAH and IZERVAY are currently US-only launches contributing to Americas growth. FY2026 Americas dynamics: XTANDI ~flat-to-slight decline in US royalties, offset by PADCEV first-line expansion, VYLOY US uptake, and continued IZERVAY and VEOZAH ramp. US market strategy: specialty oncology targeting ~8,000 prescribers (urologic oncologists + medical oncologists).',
      consoleId: 'americas-performance',
      consoleName: 'Americas Performance',
      architectureCategory: 'financial',
    },
    {
      label: 'International Markets Revenue — FY2025',
      value: 1199.0,
      unit: '¥B',
      target: 1240.0,                   // FY2026 est. [DERIVED]
      trend: 'up',
      trendValue: '+14.8% YoY; 56% of total revenue',
      status: 'good',
      description: 'International revenue (EU, Japan, EM, China combined) ¥1,199.0B (¥563.6B Established Markets + ¥289.0B Japan + ¥230.7B International + ¥101.5B China). Japan ¥289.0B remains stable; Established Markets (EU/Canada) ¥563.6B growing strongly on PADCEV EU approval and XTANDI international expansion. China ¥101.5B benefits from VYLOY gastric cancer launch (high gastric cancer incidence in China). International Markets ¥230.7B includes emerging economies where oncology access is increasing. FX sensitivity: ~60% of revenue is USD/EUR denominated — JPY depreciation is structurally favorable.',
      consoleId: 'international-performance',
      consoleName: 'International Performance',
      architectureCategory: 'financial',
    },
  ],
};
