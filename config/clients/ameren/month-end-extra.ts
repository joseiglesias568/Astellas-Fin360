// v2
// SEED REFERENCE ONLY — runtime data derived from DB via lib/db/repositories/month-end.ts deriveMonthEndExtra()
//
// P&L and balance-sheet figures use Astellas Pharma Inc. Q1 FY2026 reported financials.
// All monetary values in JPY (¥).
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
      id: 'JE-FY26Q1-001',
      description: 'XTANDI Global Revenue Recognition — Q1 FY2026 Gross-to-Net (IRA Price Adjustment, Pfizer Co-Promotion Allocation)',
      type: 'Recurring',
      amount: 146500000000,
      status: 'Posted',
      preparer: 'U.S. Revenue Accounting',
      approver: 'U.S. Revenue Manager',
      postDate: '2026-07-03',
    },
    {
      id: 'JE-FY26Q1-002',
      description: 'PADCEV Revenue Recognition — Q1 FY2026 Astellas/Pfizer Collaboration Revenue (¥65.2B gross, collaboration split applied)',
      type: 'Recurring',
      amount: 65200000000,
      status: 'Posted',
      preparer: 'Collaboration Revenue Accounting',
      approver: 'Alliance Finance Manager',
      postDate: '2026-07-03',
    },
    {
      id: 'JE-FY26Q1-003',
      description: 'VEOZAH U.S. Net Revenue — Q1 FY2026 Gross Revenue ¥38.4B less Gross-to-Net Deductions (Chargebacks, Rebates, Returns)',
      type: 'Recurring',
      amount: 26800000000,
      status: 'Posted',
      preparer: 'U.S. Revenue Accounting',
      approver: 'Revenue Recognition Manager',
      postDate: '2026-07-03',
    },
    {
      id: 'JE-FY26Q1-004',
      description: 'Japan NHI Price Revision Adjustment — April 2026 Biennial Price Cut (avg −3.5%) Revenue Adjustment vs Pre-Revision Accrual',
      type: 'Accrual',
      amount: -4600000000,
      status: 'Posted',
      preparer: 'Japan Revenue Accounting',
      approver: 'Japan Finance Director',
      postDate: '2026-07-04',
    },
    {
      id: 'JE-FY26Q1-005',
      description: 'Pfizer Collaboration Royalty Accrual — XTANDI Co-Commercialization Profit Split Q1 FY2026',
      type: 'Accrual',
      amount: -38500000000,
      status: 'Posted',
      preparer: 'Alliance Accounting',
      approver: 'CFO / Alliance Finance VP',
      postDate: '2026-07-05',
    },
    {
      id: 'JE-FY26Q1-006',
      description: 'Intangible Asset Amortization — PADCEV/EV Collaboration Rights + Acquisition Intangibles Q1 FY2026',
      type: 'Recurring',
      amount: 15500000000,
      status: 'In-Review',
      preparer: 'Corporate Accounting',
      approver: 'Corporate Controller',
      postDate: '2026-07-06',
    },
    {
      id: 'JE-FY26Q1-007',
      description: 'Quarterly Dividend Payable — ¥17.5/share declared for Q1 FY2026 payment (~¥17.5B total)',
      type: 'Non-Recurring',
      amount: -17500000000,
      status: 'In-Review',
      preparer: 'Treasury',
      approver: 'CFO',
      postDate: '2026-07-07',
    },
    {
      id: 'JE-FY26Q1-008',
      description: 'FX Revaluation — USD/EUR-Denominated Receivables and Payables Mark-to-Market at June 30, 2026 Spot Rate',
      type: 'Elimination',
      amount: 8200000000,
      status: 'Pending',
      preparer: 'Treasury / Corporate Accounting',
      approver: 'Corporate Controller',
      postDate: '2026-07-08',
    },
  ],

  adjustmentItems: [
    {
      category: 'PADCEV Revenue Outperformance',
      description: 'Q1 FY2026 PADCEV ¥65.2B vs ¥58.0B plan — ¥7.2B favorable. 1L bladder cancer adoption ahead of launch curve assumptions. Pfizer co-commercialization execution exceeding expectations.',
      amount: 7200000000,
      type: 'favorable',
    },
    {
      category: 'Japan NHI April 2026 Price Revision Impact',
      description: 'April 2026 NHI biennial price revision impact: ¥4.6B revenue reduction in Q1 FY2026. Slightly worse than ¥4.0B Q1 plan (avg −3.5% cut, product mix worse than expected). Full-year Japan guidance under review.',
      amount: -600000000,
      type: 'unfavorable',
    },
    {
      category: 'SMT Q1 FY2026 Savings Realization',
      description: 'SMT Q1 FY2026 savings ¥10.2B — slightly ahead of ¥10.0B quarterly target. Procurement savings (API renegotiations) and G&A efficiency contributing. Manufacturing footprint optimization timeline confirmed for H2 FY2026.',
      amount: 200000000,
      type: 'favorable',
    },
    {
      category: 'FX USD/JPY Q1 FY2026 vs Plan',
      description: 'USD/JPY averaged ¥156.2 in Q1 FY2026 vs planning rate ¥155.0 — minor tailwind. ¥2.1B Core OP sensitivity × ¥1.2 move = +¥2.5B incremental Core OP vs plan. Hedging book offsets ~40% of spot exposure.',
      amount: 1500000000,
      type: 'favorable',
    },
  ],

  balanceSheetHighlights: [
    { label: 'Cash and Cash Equivalents', value: '¥289.3B', status: 'good', note: 'As of Q1 FY2026 end (June 30, 2026)' },
    { label: 'Quarterly Dividend per Share', value: '¥17.5/share', status: 'good', note: 'Maintained; ¥70/share annual FY2026' },
    { label: 'Net Debt Position', value: '¥82.4B', status: 'good', note: 'Conservative balance sheet; target net cash' },
    { label: 'Share Buyback Authorization', value: '¥100B FY2026', status: 'good', note: 'Board authorized; execution ongoing' },
    { label: 'Total Long-Term Debt (est.)', value: '~¥370B', status: 'good', note: 'Low leverage; no near-term maturities' },
    { label: 'FCF FY2026 Guidance', value: '¥400B+', status: 'good', note: 'Supports dividend, buyback, and BD' },
  ],
};
