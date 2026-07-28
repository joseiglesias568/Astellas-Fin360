// =============================================================================
// Risks & Opportunities Adjustment Engine
// Calculates probability-weighted forecast adjustments from R&O register
// Astellas Pharma Inc. — pharmaceutical, oncology, and women's health context
// FX baseline ¥151/USD; ¥2.1B Core OP per ¥1 move
// =============================================================================

export interface ROItem {
  id: string;
  type: 'risk' | 'opportunity';
  title: string;
  probabilityPct: number;     // 0-100
  impactAmount: number;       // ¥B (positive = increase forecast, negative = decrease)
  expectedValue: number;      // probability x impact
  category: string;           // "Revenue", "Cost", "Operational", "Market"
  owner: string;              // "CFO", "VP Oncology", etc.
  plLineAffected: string;     // "Revenue", "Cost of Sales", "Operating Expenses"
  trend: 'increasing' | 'stable' | 'decreasing';
  description: string;
}

export interface ROAdjustmentResult {
  mlForecast: number;         // ¥B annual Core OP baseline
  totalRiskImpact: number;    // ¥B total expected downside
  totalOppImpact: number;     // ¥B total expected upside
  adjustedForecast: number;   // ML + risks + opportunities
  bestCase: number;           // ML + all opportunities at 100%
  worstCase: number;          // ML - all risks at 100%
  expectedCase: number;       // ML + probability-weighted net
  waterfall: { label: string; impact: number; type: 'risk' | 'opportunity' }[];
}

// =============================================================================
// MOCK R&O DATA — Astellas Pharma Inc.
// =============================================================================

const RISK_ITEMS: ROItem[] = [
  {
    id: 'r1', type: 'risk', title: 'XTANDI IRA Price Negotiation Outcome',
    probabilityPct: 75, impactAmount: -48.0, expectedValue: -36.0,
    category: 'Revenue', owner: 'Chief Commercial Officer', plLineAffected: 'Revenue',
    trend: 'increasing', description: 'IRA Medicare drug price negotiation for XTANDI effective 2026 — each 1pp price cut ≈ –¥9.6B Core OP. Base scenario: 5pp cut (–¥48B). High uncertainty on final negotiated price vs. Pfizer/Astellas joint defense.',
  },
  {
    id: 'r2', type: 'risk', title: 'FX Adverse Move (Yen Appreciation)',
    probabilityPct: 55, impactAmount: -42.0, expectedValue: -23.1,
    category: 'Market', owner: 'CFO / Treasury', plLineAffected: 'Revenue',
    trend: 'stable', description: 'Yen appreciation vs. ¥151/USD baseline — each ¥1 yen strengthening = –¥2.1B Core OP. Scenario: ¥141/USD (–¥10 adverse) = –¥21B Core OP × 2 scenarios = –¥42B downside at max adverse rate.',
  },
  {
    id: 'r3', type: 'risk', title: 'XTANDI Competitor Approval (ARPi Pipeline)',
    probabilityPct: 40, impactAmount: -32.5, expectedValue: -13.0,
    category: 'Revenue', owner: 'VP Oncology Commercial', plLineAffected: 'Revenue',
    trend: 'stable', description: 'Emerging AR pathway inhibitor (ARPi) pipeline competitor approval could erode XTANDI market share in mHSPC and nmCRPC. Each 5% US share loss ≈ –¥6.5B annual revenue.',
  },
  {
    id: 'r4', type: 'risk', title: 'PADCEV Safety Signal or Label Restriction',
    probabilityPct: 20, impactAmount: -85.0, expectedValue: -17.0,
    category: 'Revenue', owner: 'Chief Medical Officer', plLineAffected: 'Revenue',
    trend: 'stable', description: 'Post-market safety signal requiring black box warning update or label restriction would significantly reduce PADCEV uptake. PADCEV is the primary growth driver (¥266B FY26E → ¥320B+ peak); label restriction risk is low but high impact.',
  },
  {
    id: 'r5', type: 'risk', title: 'Japan NHI Price Revision Severity',
    probabilityPct: 80, impactAmount: -18.0, expectedValue: -14.4,
    category: 'Revenue', owner: 'VP Japan Commercial', plLineAffected: 'Revenue',
    trend: 'stable', description: 'Japan NHI biennial price revision (next: April 2026) — base revision –8%; adverse scenario –12%. Japan segment revenue ~¥590B/yr; each –1pp revision ≈ –¥5.9B Japan revenue / –¥3.8B Core OP.',
  },
  {
    id: 'r6', type: 'risk', title: 'SMT Transformation Execution Risk',
    probabilityPct: 35, impactAmount: -15.0, expectedValue: -5.25,
    category: 'Cost', owner: 'COO', plLineAffected: 'Operating Expenses',
    trend: 'decreasing', description: 'SMT program (¥40B FY26 run-rate target) may fall short due to restructuring execution delays, higher-than-planned severance costs, or regulatory complications in key markets.',
  },
];

const OPPORTUNITY_ITEMS: ROItem[] = [
  {
    id: 'o1', type: 'opportunity', title: 'PADCEV Label Expansion (Additional Indications)',
    probabilityPct: 70, impactAmount: 55.0, expectedValue: 38.5,
    category: 'Revenue', owner: 'VP Oncology Commercial', plLineAffected: 'Revenue',
    trend: 'increasing', description: 'PADCEV (enfortumab vedotin) label expansion beyond urothelial carcinoma — potential approvals in muscle-invasive bladder cancer (MIBC) neoadjuvant setting or non-urothelial ADC applications. Each new indication ≈ +¥20-35B annual revenue.',
  },
  {
    id: 'o2', type: 'opportunity', title: 'VEOZAH Launch Outperformance',
    probabilityPct: 60, impactAmount: 28.0, expectedValue: 16.8,
    category: 'Revenue', owner: 'VP Women\'s Health Commercial', plLineAffected: 'Revenue',
    trend: 'increasing', description: 'VEOZAH (fezolinetant) vasomotor symptom launch trajectory above plan — women\'s health market underserved, prescriber adoption faster than forecast. ¥28B upside scenario vs plan reflects peak 3yr trajectory acceleration.',
  },
  {
    id: 'o3', type: 'opportunity', title: 'FX Tailwind (Yen Depreciation)',
    probabilityPct: 45, impactAmount: 42.0, expectedValue: 18.9,
    category: 'Market', owner: 'CFO / Treasury', plLineAffected: 'Revenue',
    trend: 'stable', description: 'Further yen depreciation vs ¥151 baseline — ¥161/USD scenario (+¥10) = +¥21B Core OP. Astellas is a net USD earner; yen depreciation is favorable vs plan (opposite of appreciation risk).',
  },
  {
    id: 'o4', type: 'opportunity', title: 'VYLOY (Zolbetuximab) Global Approval Ramp',
    probabilityPct: 65, impactAmount: 22.0, expectedValue: 14.3,
    category: 'Revenue', owner: 'VP Oncology Commercial', plLineAffected: 'Revenue',
    trend: 'increasing', description: 'VYLOY approval and market uptake in Japan, EU, and US for CLDN18.2-positive gastric/GEJ cancer. Ex-Japan approval timeline and reimbursement decisions are key upside triggers vs current plan.',
  },
  {
    id: 'o5', type: 'opportunity', title: 'IZERVAY (Avacincaptad Pegol) Geographic Expansion',
    probabilityPct: 55, impactAmount: 18.5, expectedValue: 10.2,
    category: 'Revenue', owner: 'VP Retinal Commercial', plLineAffected: 'Revenue',
    trend: 'increasing', description: 'IZERVAY geographic expansion beyond initial US approval — EU reimbursement and Japan approval of complement pathway retinal therapy creates ¥18.5B revenue upside above current plan assumptions.',
  },
  {
    id: 'o6', type: 'opportunity', title: 'SMT Savings Over-Delivery',
    probabilityPct: 45, impactAmount: 12.0, expectedValue: 5.4,
    category: 'Cost', owner: 'COO', plLineAffected: 'Operating Expenses',
    trend: 'increasing', description: 'SMT transformation program over-delivers vs ¥40B run-rate plan — accelerated procurement savings, additional headcount optimization, and digital process automation could deliver ¥52B+ savings in FY27 ahead of schedule.',
  },
];

// =============================================================================
// PUBLIC API
// =============================================================================

export function getROItems(): ROItem[] {
  return [...RISK_ITEMS, ...OPPORTUNITY_ITEMS];
}

export function getRisks(): ROItem[] {
  return [...RISK_ITEMS].sort((a, b) => b.probabilityPct - a.probabilityPct);
}

export function getOpportunities(): ROItem[] {
  return [...OPPORTUNITY_ITEMS].sort((a, b) => b.probabilityPct - a.probabilityPct);
}

export function calculateROAdjustment(mlForecastRevenue: number = 580.0): ROAdjustmentResult {
  const risks = getRisks();
  const opportunities = getOpportunities();

  const totalRiskImpact = risks.reduce((sum, r) => sum + r.expectedValue, 0);
  const totalOppImpact = opportunities.reduce((sum, o) => sum + o.expectedValue, 0);

  // Build waterfall items (sorted by absolute expected value)
  const waterfall: ROAdjustmentResult['waterfall'] = [];

  // Add risks (largest expected impact first)
  for (const r of risks.sort((a, b) => a.expectedValue - b.expectedValue)) {
    waterfall.push({ label: r.title, impact: r.expectedValue, type: 'risk' });
  }

  // Add opportunities (largest expected impact first)
  for (const o of opportunities.sort((a, b) => b.expectedValue - a.expectedValue)) {
    waterfall.push({ label: o.title, impact: o.expectedValue, type: 'opportunity' });
  }

  const adjustedForecast = mlForecastRevenue + totalRiskImpact + totalOppImpact;
  const bestCase = mlForecastRevenue + opportunities.reduce((sum, o) => sum + o.impactAmount, 0);
  const worstCase = mlForecastRevenue + risks.reduce((sum, r) => sum + r.impactAmount, 0);

  return {
    mlForecast: mlForecastRevenue,
    totalRiskImpact,
    totalOppImpact,
    adjustedForecast,
    bestCase,
    worstCase,
    expectedCase: adjustedForecast,
    waterfall,
  };
}

export function getTornadoData(): { label: string; low: number; high: number; expected: number }[] {
  const items = getROItems();

  return items
    .map(item => ({
      label: item.title,
      low: item.type === 'risk' ? item.impactAmount : 0,
      high: item.type === 'opportunity' ? item.impactAmount : 0,
      expected: item.expectedValue,
    }))
    .sort((a, b) => Math.abs(b.high - b.low + Math.abs(b.expected)) - Math.abs(a.high - a.low + Math.abs(a.expected)));
}
