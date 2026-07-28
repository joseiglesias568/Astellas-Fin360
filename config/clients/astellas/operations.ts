// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/operations.ts
//
// Provenance Legend: [CITED:AR-FY25] [CITED:EC-FY25] [CITED:IR-FY26]
// [DERIVED] = math from cited  [ASSUMED] = estimate  [CONFIG-ONLY] = UI param
//
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma Inc. FY2025 Annual Results (May 2025); FY2026 Full-Year
// Guidance; FY2025 Integrated Report; Investor Relations presentations.
// Fiscal year: April 1 – March 31. FY2025 = April 2025 – March 2026.
// All monetary values in ¥B (billions of JPY) unless noted otherwise.
// ─────────────────────────────────────────────────────────────────────
import { OperationsConfig } from '../../types';

export const operations: OperationsConfig = {
  totalLocations: 50,                // ~50 commercial offices, R&D sites, and GMP manufacturing facilities globally [CONFIG-ONLY]
  locationGrowth: 0,                 // stable footprint; SMT program reduces headcount not locations [CONFIG-ONLY]
  locationGrowthPercent: 0.0,

  locations: [
    {
      name: 'Japan — HQ + Tsukuba Research Center + Domestic Commercial',
      type: 'Global HQ + Primary R&D Hub + Commercial',
      region: 'Japan',
      metrics: [
        { label: 'Japan FY2025 Revenue', value: '¥620.7B', target: '¥650B FY2026', status: 'good' },
        { label: 'Tsukuba R&D Center (Discovery & Clinical)', value: 'Active — primary hub', target: 'Sustain capability', status: 'good' },
        { label: 'Key Japan Products', value: 'XTANDI, XOSPATA, VEOZAH', target: 'NHI listed; lifecycle management', status: 'good' },
        { label: 'VYLOY Japan NHI Submission', value: 'In process', target: 'Approval & reimbursement FY2026', status: 'good' },
        { label: 'HQ Location', value: 'Minato, Tokyo', target: 'CEO: Naoki Okamura; CFO: Atsushi Kitamura', status: 'good' },
      ],
    },
    {
      name: 'Americas — Commercial + San Francisco Bay Area R&D',
      type: 'Americas Commercial HQ + R&D Hub',
      region: 'Americas',
      metrics: [
        { label: 'Americas FY2025 Revenue', value: '¥1,005.4B', target: 'Defend post-IRA', status: 'warning' },
        { label: 'PADCEV US — 1L mUC Market Position', value: '~35% share', target: '40%+ by FY2027', status: 'good' },
        { label: 'XTANDI IRA Negotiation Exposure', value: 'Potential ~¥50B FY2026 decline', target: 'Mitigate via lifecycle', status: 'warning' },
        { label: 'VEOZAH US Launch Momentum', value: 'Penetration building', target: 'Grow Rx share in menopause', status: 'good' },
        { label: 'SF Bay Area R&D Employees (est.)', value: '~800', target: 'Stable per SMT', status: 'good' },
      ],
    },
    {
      name: 'Europe/Canada/Australia (ECA) — Commercial + Amsterdam R&D',
      type: 'Commercial Region + R&D Site',
      region: 'Europe / ECA',
      metrics: [
        { label: 'ECA FY2025 Revenue', value: '¥307.5B', target: '¥330B FY2026', status: 'good' },
        { label: 'XTANDI EU Patent Exclusivity', value: '28+ years remaining', target: 'Full protection maintained', status: 'good' },
        { label: 'VYLOY EU Launch Status', value: 'Regulatory filing in progress', target: 'Approval FY2026', status: 'good' },
        { label: 'PADCEV EU Uptake', value: 'Growing post-EMA approval', target: 'Match US trajectory', status: 'good' },
        { label: 'Amsterdam R&D Institute', value: 'Active — immunology focus', target: 'Innovation hub sustained', status: 'good' },
      ],
    },
    {
      name: 'China — Commercial (Beijing / Shanghai)',
      type: 'High-Growth Commercial Market',
      region: 'China',
      metrics: [
        { label: 'China FY2025 Revenue', value: '¥101.5B', target: '¥150B+ by FY2027', status: 'good' },
        { label: 'China Revenue Growth YoY', value: '+29.6% FY2025', target: 'Sustain >20% CAGR', status: 'good' },
        { label: 'VYLOY China Filing', value: 'Planned FY2026', target: 'Submission & review initiated', status: 'good' },
        { label: 'Products in NHI Process', value: 'Multiple', target: 'Expand reimbursement coverage', status: 'good' },
        { label: 'Fastest-Growing Region', value: '#1 in Astellas portfolio', target: 'Maintain regional momentum', status: 'good' },
      ],
    },
    {
      name: 'Asia/Pacific ex-Japan/China — Commercial',
      type: 'Commercial Region',
      region: 'Asia / Pacific',
      metrics: [
        { label: 'Asia/Pacific FY2025 Revenue', value: '¥107.4B', target: '¥120B FY2026', status: 'good' },
        { label: 'PADCEV Asia Launch Progression', value: 'Regulatory submissions ongoing', target: 'File in all major markets', status: 'good' },
        { label: 'IZERVAY Registration Progress', value: 'Filing in key Asia markets', target: 'Geographic expansion', status: 'good' },
        { label: 'XTANDI Asia Prostate Cancer Share', value: 'Established; growing', target: 'Defend against ARSi competition', status: 'good' },
      ],
    },
    {
      name: 'Global GMP Manufacturing — Japan, US, Europe',
      type: 'GMP Manufacturing Network',
      region: 'Global',
      metrics: [
        { label: 'Active GMP Manufacturing Sites', value: '6+', target: 'Zero critical disruptions', status: 'good' },
        { label: 'Annual Capital Expenditure', value: '~¥83B FY2025', target: '~¥85-90B FY2026', status: 'good' },
        { label: 'PADCEV Fill/Finish Capacity Utilization', value: 'Scaling to meet demand', target: 'Support ¥610B brand target', status: 'good' },
        { label: 'GMP Regulatory Inspection Record', value: 'No critical findings', target: 'Maintain clean record', status: 'good' },
        { label: 'Commercial Products Manufactured', value: '50+ countries', target: 'Maintain global supply chain', status: 'good' },
      ],
    },
  ],

  supplyChain: [
    {
      label: 'Clinical Trial Supply Chain On-Time Delivery',
      value: '98%',
      target: '99%',
      trend: 'up',
      status: 'good',
    },
    {
      label: 'PADCEV / ADC Manufacturing Batch Success Rate',
      value: '97%',
      target: '98%',
      trend: 'up',
      status: 'good',
    },
    {
      label: 'API Sourcing Redundancy (Critical Products)',
      value: 'Dual-sourced',
      target: '100% dual-sourced for critical APIs',
      trend: 'flat',
      status: 'good',
    },
    {
      label: 'Annual Capital Expenditure (FY2025)',
      value: '¥83B',
      target: '¥85-90B FY2026',
      trend: 'up',
      status: 'good',
    },
    {
      label: 'GMP Compliance Rate',
      value: '100%',
      target: 'Zero critical findings',
      trend: 'flat',
      status: 'good',
    },
    {
      label: 'Commercial Drug Supply Coverage',
      value: '6+ months',
      target: '6-month minimum inventory',
      trend: 'flat',
      status: 'good',
    },
    {
      label: 'Pipeline Drug Substance Readiness (Phase 3)',
      value: 'On schedule',
      target: 'All Phase 3 initiations supported',
      trend: 'up',
      status: 'good',
    },
  ],

  digitalMetrics: [
    {
      label: 'Digital Health Partnerships Active',
      value: '8+',
      description:
        'Active collaborations with digital health platforms for companion diagnostics, adherence monitoring, and patient-support programs across PADCEV, XTANDI, and VEOZAH franchises.',
    },
    {
      label: 'AI/ML-Assisted Drug Discovery Programs',
      value: '12',
      description:
        'Machine-learning-assisted target identification and lead optimization programs embedded across Tsukuba (Japan) and San Francisco Bay Area R&D sites, accelerating POC timelines.',
    },
    {
      label: 'Real-World Evidence Studies (Active)',
      value: '25+',
      description:
        'Post-approval real-world evidence studies generating label-expansion data and market-access evidence across oncology (PADCEV, XOSPATA), urology (XTANDI), and ophthalmology (IZERVAY) portfolios.',
    },
    {
      label: 'Phase 3 Trials with Digital / Wearable Endpoints',
      value: '6 trials',
      description:
        'FY2026 Phase 3 trials incorporating digital and wearable endpoints to accelerate enrollment and endpoint capture in oncology and nephrology programs, reducing time-to-data.',
    },
    {
      label: 'ERP / SAP S/4HANA Modernization',
      value: 'In progress',
      description:
        'Enterprise system modernization as part of the SMT operational efficiency program. Expected to deliver ¥3-5B annual IT infrastructure savings at full run-rate, consolidating global finance and supply chain platforms.',
    },
  ],

  industryKPIs: [
    {
      label: 'R&D Pipeline Depth (Phase 3 Assets)',
      value: 8,
      target: '10+',
      benchmark: '5-8 (mid-large pharma median)',
      description:
        'Number of compounds or indications in Phase 3 clinical development across oncology, urology, immunology, nephrology, and ophthalmology. Reflects near-term commercial pipeline robustness. FY2026: multiple new Phase 3 studies initiating.',
    },
    {
      label: 'Core Operating Profit Margin (%)',
      value: '26.0%',
      target: '27-28% FY2026',
      benchmark: '~24% (global pharma median)',
      description:
        'Core OP margin excludes non-recurring items, impairment charges, and special restructuring costs. FY2025 Core OP ¥556.7B on revenue ¥2,140.3B = 26.0%. SMT targets ¥40B incremental FY2026 savings to expand margin further.',
    },
    {
      label: 'R&D Spend as % of Revenue',
      value: '14.7%',
      target: '~16.6% FY2026 (¥355B planned)',
      benchmark: '15-20% (innovation pharma)',
      description:
        'FY2025 R&D expense ¥314.8B (14.7% of ¥2,140.3B revenue). FY2026 R&D investment planned at ¥355B (+12.8% YoY) to fund Phase 3 study initiations across five therapeutic areas and sustain 3 POC/year program cadence.',
    },
    {
      label: 'Time-to-Market (Phase 3 Initiation to Approval, avg)',
      value: '~4.5 years',
      target: '<4.0 years',
      benchmark: '4-6 years (industry average)',
      description:
        'Average time from Phase 3 initiation to first regulatory approval. Compressed timelines enabled by accelerated pathways — Breakthrough Therapy Designation (PADCEV), PRIME designation (VYLOY) — and experienced global regulatory affairs teams.',
    },
    {
      label: 'NME / Major New Indication Approvals (Last 3 Years)',
      value: 4,
      target: '2+ per year',
      benchmark: '1-3 (mid-pharma average)',
      description:
        'New Molecular Entity and major new indication approvals over the prior three fiscal years: VEOZAH (fezolinetant, menopause, 2023), IZERVAY (avacincaptad pegol, geographic atrophy, 2023), VYLOY (zolbetuximab, GC/GEJC, 2024-25), PADCEV 1L mUC (2023). Demonstrates consistent late-stage execution.',
    },
    {
      label: 'PADCEV Global Market Share (1L mUC)',
      value: '~35%',
      target: '40%+ by FY2027',
      benchmark: 'Leading in 1L metastatic urothelial carcinoma',
      description:
        'PADCEV+pembrolizumab estimated ~35% share of first-line metastatic urothelial carcinoma globally, following EV-302/KEYNOTE-869 approval. Muscle-invasive bladder cancer (MIBC) neoadjuvant expansion and China filing represent next incremental share opportunities.',
    },
    {
      label: 'XTANDI Global Prostate Cancer Market Share',
      value: '~22%',
      target: 'Defend >20% share',
      benchmark: 'Top 2 in ARSi class (vs darolutamide, apalutamide)',
      description:
        'XTANDI (enzalutamide) holds an estimated ~22% share of the global advanced prostate cancer market. Competes in the ARSi (androgen receptor signaling inhibitor) class. New combination studies in earlier lines and LuPSMA combinations underpin long-term share defense.',
    },
    {
      label: 'Strategic Brands FY2025 Revenue',
      value: '¥480.3B',
      target: '¥610B FY2026 (+27% YoY)',
      benchmark: 'Fastest-growing pharma franchise cluster in Astellas portfolio',
      description:
        'Strategic Brands (PADCEV, IZERVAY, VYLOY, VEOZAH, XOSPATA) combined FY2025 sales ¥480.3B, +43% YoY. FY2026 target ¥610B driven by PADCEV 1L mUC global penetration, VYLOY Japan/EU/US launches, and VEOZAH US/EU ramp-up.',
    },
  ],

  peopleMetrics: [
    {
      label: 'Total Global Employees',
      value: '~16,000',
      target: 'Optimize via SMT; protect scientific core',
      trend: 'down',
      status: 'good',
      description:
        'Approximately 16,000 employees globally across commercial, R&D, manufacturing, and G&A functions. Headcount being selectively reduced through SMT restructuring — voluntary programs and organizational simplification targeting SG&A savings of ¥15-20B annually.',
    },
    {
      label: 'R&D Employees (Global, est.)',
      value: '~5,500',
      target: 'Stable scientific core; optimize support functions',
      trend: 'flat',
      status: 'good',
      description:
        'Approximately 5,500 R&D scientists and clinical professionals at Tsukuba (Japan), San Francisco Bay Area (US), Amsterdam (Netherlands), and global network sites. Core discovery and clinical teams protected under SMT; back-office and support roles streamlined.',
    },
    {
      label: 'SMT Headcount Savings Progress',
      value: '¥21B achieved FY2025',
      target: '¥40B FY2026; ¥65B cumulative 2-year',
      trend: 'down',
      status: 'good',
      description:
        'Sustainable Margin Transformation (SMT) headcount and organizational efficiency program. FY2025 delivered ¥21B savings (60% toward ¥65B 2-year cumulative target). FY2026 targeting additional ¥44B to reach ¥65B cumulative. Includes selective position eliminations, span-of-control optimization, and vendor rationalization.',
    },
    {
      label: 'Employee Engagement (Amid Transformation)',
      value: '>70%',
      target: 'Maintain engagement through SMT restructuring',
      trend: 'flat',
      status: 'warning',
      description:
        'Astellas monitors employee engagement via annual pulse surveys during the SMT transformation period. Retention of key scientific and commercial talent is a stated priority. Communications strategy includes regular CEO/CFO town halls and transparent SMT progress reporting.',
    },
    {
      label: 'Commercial Excellence Training (Medical / Sales)',
      value: 'Ongoing — global rollout',
      target: 'All field force trained on new oncology brands',
      trend: 'up',
      status: 'good',
      description:
        'Systematic commercial excellence programs for PADCEV, VYLOY, IZERVAY, and VEOZAH field teams globally. Focus on MSL scientific engagement, key opinion leader development, and multi-channel marketing capability building.',
    },
  ],

  customerExperience: [
    {
      label: 'Oncologist Prescriber NPS (PADCEV in mUC)',
      value: 'Leading (est. top-2)',
      target: 'Maintain leading NPS in urothelial oncology',
      trend: 'up',
      status: 'good',
      description:
        'PADCEV+pembrolizumab holds strong physician promoter scores among oncologists treating metastatic urothelial carcinoma, driven by compelling EV-302 overall survival data. Medical affairs field-medical teams support rapid uptake of NCCN/EAU guideline recommendations.',
    },
    {
      label: 'Patient Support Program Coverage',
      value: '50+ countries',
      target: 'Expand in China and emerging markets',
      trend: 'up',
      status: 'good',
      description:
        'Astellas patient-access and co-pay assistance programs active across 50+ commercial markets. Programs cover co-pay assistance (US), named patient access (EU), compassionate use, and government reimbursement access programs in China and other emerging markets.',
    },
    {
      label: 'Medical Information Response Time',
      value: '<24 hours',
      target: '<24 hours globally (maintained)',
      trend: 'flat',
      status: 'good',
      description:
        'Global Medical Information function maintains a <24-hour response SLA for healthcare professional inquiries across all marketed products. Critical for physician confidence in complex ADC/combination regimens like PADCEV+pembro and XTANDI-based combinations.',
    },
    {
      label: 'VEOZAH US Patient 6-Month Adherence',
      value: '>65%',
      target: '>70% by FY2027',
      trend: 'up',
      status: 'good',
      description:
        'VEOZAH (fezolinetant) US patient persistence at 6 months estimated >65%, above typical benchmarks for oral menopause therapies. Digital adherence programs, pharmacy partnerships, and caregiver support initiatives being deployed to improve retention further.',
    },
    {
      label: 'VYLOY / XOSPATA Oncology Patient Reach',
      value: 'Expanding globally',
      target: 'Accelerate in EU, Japan, US, China',
      trend: 'up',
      status: 'good',
      description:
        'VYLOY (zolbetuximab) and XOSPATA (gilteritinib) patient access expanding as reimbursements and guideline inclusions are secured in major markets. Patient advocacy partnerships and early-access programs deployed in advance of full reimbursement decisions.',
    },
  ],
};
