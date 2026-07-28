// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/operations.ts
//
// Provenance Legend: [CITED:AR-FY25] [CITED:EC-Q1-FY26]
// [DERIVED] = math from cited  [ASSUMED] = estimate  [CONFIG-ONLY] = UI param
//
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma Q1 FY2026 earnings call, IR slides, and FY2025 Annual Report.
// Astellas operates across five geographic segments with ~10,000 employees globally.
// ─────────────────────────────────────────────────────────────────────
import { OperationsConfig } from '../../types';

export const operations: OperationsConfig = {
  totalLocations: 18,                  // Astellas manufacturing sites globally [ASSUMED]
  locationGrowth: 0,                   // No net new manufacturing sites planned [ASSUMED]
  locationGrowthPercent: 0.0,

  locations: [
    {
      name: 'United States',
      type: 'Commercial — Oncology, Women\'s Health, Ophthalmology',
      region: 'National (headquartered in Northbrook, IL)',
      metrics: [
        { label: 'Q1 FY2026 Revenue', value: '¥196.0B', target: '~¥800B FY2026', status: 'good' },
        { label: 'XTANDI Revenue Q1 FY2026', value: '¥146.5B', target: '¥572B FY2026', status: 'good' },
        { label: 'PADCEV Revenue Q1 FY2026', value: '¥65.2B', target: '¥268B FY2026', status: 'good' },
        { label: 'VEOZAH Payer Coverage', value: '>85% commercial lives', target: '>90%', status: 'good' },
        { label: 'XTANDI IRA Price Sensitivity', value: '¥9.6B/1pp cut', target: 'Manage via volume', status: 'warning' },
        { label: 'PADCEV 1L Bladder Cancer Share', value: 'Leading', target: 'Defend vs competition', status: 'good' },
      ],
    },
    {
      name: 'Japan',
      type: 'Commercial + Manufacturing — Oncology, Transplantation',
      region: 'National (headquartered in Kōtō, Tokyo)',
      metrics: [
        { label: 'Q1 FY2026 Revenue', value: '¥86.5B', target: '~¥355B FY2026', status: 'good' },
        { label: 'NHI Price Revision Impact', value: '−3.5% avg Apr 2026', target: '¥8–12B annual headwind', status: 'warning' },
        { label: 'XTANDI Japan New Indications', value: 'mCSPC/nmCRPC', target: 'Volume growth offset', status: 'good' },
        { label: 'VEOZAH Japan NDA Status', value: 'Under PMDA review', target: 'Approval FY2026', status: 'good' },
        { label: 'Transplantation Franchise', value: '¥85B annual (est.)', target: 'Stable with Prograf', status: 'good' },
        { label: 'Manufacturing Sites Japan', value: '6 sites', target: 'SMT efficiency program', status: 'good' },
      ],
    },
    {
      name: 'Established Markets',
      type: 'Commercial — Oncology, Transplantation (Europe, Australia, Canada)',
      region: 'Western Europe + Australia + Canada (HQ: Leiden, Netherlands)',
      metrics: [
        { label: 'Q1 FY2026 Revenue', value: '¥112.0B', target: '~¥450B FY2026', status: 'good' },
        { label: 'XTANDI EU Market Position', value: 'Leading in PCa', target: 'Defend vs J&J Nubeqa', status: 'good' },
        { label: 'PADCEV EU Reimbursement', value: 'Country-by-country', target: '5 major EU markets FY2026', status: 'good' },
        { label: 'VEOZAH EU Regulatory Status', value: 'EMA review ongoing', target: 'Approval FY2026', status: 'good' },
        { label: 'HTA Submissions', value: 'NICE/G-BA/HAS active', target: 'PADCEV positive HTA', status: 'good' },
        { label: 'EU Revenue Growth Q1 FY2026', value: '+2.5% YoY', target: '3%+ FY2026', status: 'good' },
      ],
    },
    {
      name: 'International Markets & China',
      type: 'Commercial — Oncology, Transplantation (Emerging Markets + Greater China)',
      region: 'Asia-Pacific (ex-Japan), MENA, Latin America, China (NMPA)',
      metrics: [
        { label: 'Q1 FY2026 Int\'l Revenue', value: '¥121.8B', target: '~¥445B FY2026', status: 'good' },
        { label: 'Q1 FY2026 China Revenue', value: '¥36.5B', target: '~¥150B FY2026', status: 'good' },
        { label: 'XTANDI NRDL Inclusion', value: 'China NRDL listed', target: 'Volume growth post-NRDL', status: 'good' },
        { label: 'PADCEV China NMPA Status', value: 'Under review', target: 'Approval FY2027', status: 'good' },
        { label: 'Int\'l Revenue Growth Q1', value: '+5.8% YoY', target: '5%+ FY2026', status: 'good' },
        { label: 'Emerging Market Access Programs', value: 'Active in 8 markets', target: 'Expand to 12 markets', status: 'good' },
      ],
    },
  ],

  supplyChainMetrics: [
    {
      label: 'Global Manufacturing Sites',
      value: 18,
      unit: 'sites',
      target: 18,
      status: 'good',
      description: 'Astellas operates 18 manufacturing and packaging sites globally, with primary pharmaceutical manufacturing in Japan (6 sites), U.S. (3 sites), and Europe (4 sites). SMT manufacturing efficiency program targeting ¥8B+ in manufacturing savings by FY2027.',
    },
    {
      label: 'XTANDI Annual Supply Volume',
      value: 146.5,
      unit: '¥B quarterly revenue',
      target: 143.0,
      status: 'good',
      description: 'XTANDI global supply chain managed through Astellas-Pfizer collaboration. Manufacturing at Astellas Toyama site (Japan) and contract manufacturers. Supply reliability is a key competitive factor — no material supply disruptions in trailing 8 quarters.',
    },
    {
      label: 'PADCEV Supply Chain Readiness',
      value: 65.2,
      unit: '¥B quarterly revenue',
      target: 58.0,
      status: 'good',
      description: 'PADCEV (enfortumab vedotin ADC) supply chain: ADC manufacturing at Pfizer sites (U.S.); Astellas manages API and finished dose for ex-U.S. markets. Growing demand from 1L bladder cancer uptake is being met — no supply constraints in Q1 FY2026. Capacity expansion planned for FY2027.',
    },
    {
      label: 'SMT Manufacturing Savings FY2025',
      value: 8.5,
      unit: '¥B saved',
      target: 8.0,
      status: 'good',
      description: 'Manufacturing workstream of SMT delivered ¥8.5B savings in FY2025, slightly above ¥8.0B target. Initiatives include batch size optimization at Toyama plant, CMO renegotiations, and API yield improvements. FY2026 manufacturing SMT target ¥15B — footprint rationalization underway.',
    },
  ],
};
