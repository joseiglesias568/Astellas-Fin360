// v2
// SEED REFERENCE ONLY — runtime data derived from DB via lib/db/repositories/month-end.ts deriveMonthEndExtra()
//
// P&L and balance-sheet figures use Astellas Pharma Inc. Q1 FY2026 estimated financials.
// Amounts in JPY (raw yen). FY2026 = April 2026 – March 2027.
// ─────────────────────────────────────────────────────────────────────
import { MonthEndExtraConfig } from '../../types';

export const monthEndExtra: MonthEndExtraConfig = {
  phaseDisplayMap: {
    'Pre-Close': { id: 'pre-close', days: '1-2', status: 'completed', progress: 100 },
    'Revenue Recognition': { id: 'revenue-recognition', days: '2-3', status: 'completed', progress: 100 },
    'Journal Processing': { id: 'journals', days: '3-4', status: 'in-progress', progress: 60 },
    'Review & Analysis': { id: 'review', days: '5-6', status: 'pending', progress: 0 },
    'Consolidation': { id: 'consolidation', days: '7-8', status: 'pending', progress: 0 },
    'Reporting': { id: 'reporting', days: '9-12', status: 'pending', progress: 0 },
  },

  recentEntries: [
    {
      id: 'JE-2026-001',
      description: 'XTANDI Product Net Sales — Q1 FY2026 US and Ex-US Net Sales Recognition; IRA-adjusted Medicare pricing effective January 2026',
      type: 'Recurring',
      amount: 230000000000,
      status: 'Posted',
      preparer: 'System',
      approver: 'US Revenue Accounting Manager',
      postDate: '2026-07-03',
    },
    {
      id: 'JE-2026-002',
      description: 'Strategic Brands Revenue Accrual — PADCEV/IZERVAY/VYLOY/VEOZAH/XOSPATA Q1 FY2026 Net Sales; gross-to-net adjustments applied',
      type: 'Accrual',
      amount: 130000000000,
      status: 'Posted',
      preparer: 'Global Revenue Accounting',
      approver: 'Chief Revenue Officer',
      postDate: '2026-07-04',
    },
    {
      id: 'JE-2026-003',
      description: 'R&D Expense Accrual — Q1 FY2026 Clinical Trial Costs, CRO Invoices, Milestone Obligations, and Internal Preclinical Program Costs',
      type: 'Accrual',
      amount: -120000000000,
      status: 'Posted',
      preparer: 'R&D Finance',
      approver: 'Chief Scientific Officer',
      postDate: '2026-07-03',
    },
    {
      id: 'JE-2026-004',
      description: 'SMT Savings Recognition — Q1 FY2026 Sustainable Margin Transformation program savings: SG&A efficiency, manufacturing footprint, and procurement',
      type: 'Accrual',
      amount: 10000000000,
      status: 'Posted',
      preparer: 'SMT Program Office',
      approver: 'CFO Atsushi Kitamura',
      postDate: '2026-07-05',
    },
    {
      id: 'JE-2026-005',
      description: 'FX Translation & Revaluation — Q1 FY2026 USD/JPY translation of US and international subsidiary P&L at ¥148 avg. rate (vs ¥151 plan)',
      type: 'Recurring',
      amount: -18000000000,
      status: 'Posted',
      preparer: 'Treasury / FX Accounting',
      approver: 'Treasurer',
      postDate: '2026-07-03',
    },
    {
      id: 'JE-2026-006',
      description: 'Acquired Intangible Asset Amortization — Product rights and pipeline assets from Agensys, Mirabegron, and other in-licensed/acquired programs (Q1 FY2026)',
      type: 'Recurring',
      amount: -35000000000,
      status: 'In-Review',
      preparer: 'Corporate Accounting',
      approver: 'Corporate Controller',
      postDate: '2026-07-06',
    },
    {
      id: 'JE-2026-007',
      description: 'Quarterly Dividend Payable — ¥28B declared for Q1 FY2026 payment (¥28 per share × ~1,000M diluted shares)',
      type: 'Non-Recurring',
      amount: -28000000000,
      status: 'In-Review',
      preparer: 'Treasury',
      approver: 'CFO',
      postDate: '2026-07-07',
    },
    {
      id: 'JE-2026-008',
      description: 'Inter-Regional Transfer Pricing Elimination — Intercompany product sales and royalty flows between Astellas US, EU, Japan, and international affiliates',
      type: 'Elimination',
      amount: -12000000000,
      status: 'Pending',
      preparer: 'Corporate Consolidation',
      approver: 'Corporate Controller',
      postDate: '2026-07-08',
    },
  ],

  adjustmentItems: [
    {
      category: 'XTANDI IRA Price Impact',
      description: 'Q1 FY2026 XTANDI US revenue reflects first full quarter of IRA-negotiated Medicare price. Revenue ¥230B vs ¥259B Q4 FY2025. Impact tracked separately from underlying volume trend. Full-year guidance incorporates estimated ¥80–100B annual IRA price headwind.',
      amount: -22000000000,
      type: 'unfavorable',
    },
    {
      category: 'SMT Savings Delivery — On Track',
      description: 'Q1 FY2026 SMT savings ¥10B recognized — on track toward ¥40B annual target. Savings from SG&A headcount reduction, procurement renegotiation, and manufacturing efficiency. FY2026 guidance Core OP margin ~27.9% requires sustained ¥10B+ quarterly delivery.',
      amount: 10000000000,
      type: 'favorable',
    },
    {
      category: 'FX Translation Headwind',
      description: 'Q1 FY2026 impacted by stronger-than-planned JPY (¥148 avg. vs ¥151 plan). Approximately −¥18B revenue headwind and −¥7B Core OP vs plan. H2 FX trajectory is a key swing factor for full-year guidance achievement.',
      amount: -18000000000,
      type: 'unfavorable',
    },
    {
      category: 'VYLOY Launch Execution — Above Internal Model',
      description: 'VYLOY (zolbetuximab) Q1 FY2026 launch tracking above internal model in US gastric and gastroesophageal junction cancer. Physician adoption progressing well. Supports ¥63.1B FY2025 baseline with growth potential as label expansion discussions progress.',
      amount: 3000000000,
      type: 'favorable',
    },
  ],

  balanceSheetHighlights: [
    { label: 'Cash and Cash Equivalents', value: '¥385B', status: 'good', note: 'As of Q1 FY2026 end; net cash position' },
    { label: 'Quarterly Dividend (per share)', value: '¥28', status: 'good', note: 'Stable; total ~¥28B/quarter' },
    { label: 'Net Debt / (Cash) Position', value: '−¥52B', status: 'good', note: 'Net cash; strong balance sheet' },
    { label: 'USD FX Hedge Coverage', value: '~55%', status: 'good', note: 'Rolling 12M; USD exposure hedged' },
    { label: 'R&D Investment Rate', value: '~22%', status: 'warning', note: '% of revenue; above industry average' },
    { label: 'Core OP FY2026 Guidance', value: '¥620B', status: 'good', note: 'FY2026 full-year guidance' },
  ],
};
