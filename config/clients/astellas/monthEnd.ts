// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/month-end.ts
//
// Close-process tasks aligned to Astellas Pharma Inc.'s accounting model:
// pharmaceutical product net sales recognition, R&D milestone accruals,
// FX translation and hedging, SMT savings recognition, inter-regional
// transfer pricing eliminations, and segment P&L consolidation.
// FY2026 = April 2026 – March 2027. financialResults in ¥B (billions JPY).
// ─────────────────────────────────────────────────────────────────────
import { MonthEndConfig } from '../../types';

export const monthEnd: MonthEndConfig = {
  phases: [
    'Pre-Close',
    'Revenue Recognition',
    'Journal Processing',
    'Review & Analysis',
    'Consolidation',
    'Reporting',
  ],

  tasks: [
    // Pre-Close
    { id: 'mc-1', phase: 'Pre-Close', name: 'XTANDI global net sales cutoff — US and ex-US product shipment data; IRA-adjusted Medicare pricing effective January 2026; Pfizer collaboration allocation', status: 'completed', owner: 'US Revenue Accounting', dueDate: 'Day 1' },
    { id: 'mc-2', phase: 'Pre-Close', name: 'Strategic Brands product cutoff — PADCEV, IZERVAY, VYLOY, VEOZAH, XOSPATA net sales data; gross-to-net adjustments; chargebacks and rebate provisions', status: 'completed', owner: 'Global Revenue Accounting', dueDate: 'Day 1' },
    { id: 'mc-3', phase: 'Pre-Close', name: 'FX rates and hedging cutoff — USD/JPY, EUR/JPY, and other currency spot rates; mark-to-market of FX hedging instruments; hedge effectiveness assessment', status: 'completed', owner: 'Treasury / FX Accounting', dueDate: 'Day 1' },
    { id: 'mc-4', phase: 'Pre-Close', name: 'R&D accruals and milestone cutoff — clinical trial CRO invoices; milestone payment triggers; internal discovery program resource allocation update', status: 'in-progress', owner: 'R&D Finance', dueDate: 'Day 2' },

    // Revenue Recognition
    { id: 'mc-5', phase: 'Revenue Recognition', name: 'XTANDI net product sales recognition — US net sales (IRA Medicare price); ex-US sales; Pfizer co-promotion collaboration revenue allocation per ASC 808', status: 'completed', owner: 'US Revenue Accounting', dueDate: 'Day 2' },
    { id: 'mc-6', phase: 'Revenue Recognition', name: 'Strategic Brands net sales — PADCEV/IZERVAY/VYLOY/VEOZAH/XOSPATA gross-to-net adjustments; government rebates; patient assistance program provisions', status: 'in-progress', owner: 'Global Revenue Accounting', dueDate: 'Day 2' },
    { id: 'mc-7', phase: 'Revenue Recognition', name: 'License, royalty, and collaboration revenue — milestone payments per ASC 606; running royalty accruals from out-licensing agreements; contract asset/liability movements', status: 'in-progress', owner: 'Business Development Finance', dueDate: 'Day 3' },
    { id: 'mc-8', phase: 'Revenue Recognition', name: 'Japan domestic product revenue — NHI reimbursement price adjustments; biennial pricing revision impacts; co-promotion and co-detail revenue recognition', status: 'in-progress', owner: 'Japan Finance', dueDate: 'Day 3' },
    { id: 'mc-9', phase: 'Revenue Recognition', name: 'China and International Markets revenue — VBP-adjusted pricing recognition; inter-company transfer pricing alignment; local GAAP to IFRS/J-GAAP conversion', status: 'completed', owner: 'International Revenue Accounting', dueDate: 'Day 2' },

    // Journal Processing
    { id: 'mc-10', phase: 'Journal Processing', name: 'Cost of product sales — manufacturing cost of goods sold; royalty cost allocations; inventory write-downs; standard cost vs actual variance analysis', status: 'in-progress', owner: 'Manufacturing Finance', dueDate: 'Day 3' },
    { id: 'mc-11', phase: 'Journal Processing', name: 'R&D expense — clinical trial CRO accruals; milestone payment recognition; in-licensing asset expense; preclinical and discovery program costs', status: 'in-progress', owner: 'R&D Finance', dueDate: 'Day 3' },
    { id: 'mc-12', phase: 'Journal Processing', name: 'SMT savings recognition — Sustainable Margin Transformation program savings booking; SG&A efficiency gains; manufacturing footprint restructuring charges and savings netting', status: 'pending', owner: 'SMT Program Office / Corporate Accounting', dueDate: 'Day 4' },
    { id: 'mc-13', phase: 'Journal Processing', name: 'Acquired intangible asset amortization — product rights and pipeline assets; goodwill impairment testing; in-process R&D write-offs as applicable', status: 'pending', owner: 'Corporate Accounting', dueDate: 'Day 4' },
    { id: 'mc-14', phase: 'Journal Processing', name: 'Dividend payable accrual — ~¥28B quarterly dividend; ex-dividend date and record date verification; distribution to Astellas Pharma Inc. shareholders', status: 'pending', owner: 'Treasury', dueDate: 'Day 4' },

    // Review & Analysis
    { id: 'mc-15', phase: 'Review & Analysis', name: 'Core OP margin analysis vs ¥620B FY2026 guidance — SMT savings delivery tracking; XTANDI IRA revenue impact quantification; FX sensitivity bridge', status: 'pending', owner: 'Corporate FP&A', dueDate: 'Day 5' },
    { id: 'mc-16', phase: 'Review & Analysis', name: 'XTANDI revenue bridge vs guidance — IRA Medicare price impact; volume vs price decomposition; US vs ex-US geographic mix; Pfizer collaboration revenue split', status: 'pending', owner: 'US FP&A', dueDate: 'Day 5' },
    { id: 'mc-17', phase: 'Review & Analysis', name: 'Strategic Brands individual performance analysis — PADCEV/IZERVAY/VYLOY/VEOZAH/XOSPATA vs targets; launch KPIs; competitive market share data', status: 'pending', owner: 'Commercial Finance', dueDate: 'Day 6' },
    { id: 'mc-18', phase: 'Review & Analysis', name: 'FX impact analysis — USD/JPY translation effect on each segment; hedging gain/loss recognition; actual vs ¥151 planning rate variance; forward rate guidance sensitivity', status: 'pending', owner: 'Treasury / FP&A', dueDate: 'Day 6' },

    // Consolidation
    { id: 'mc-19', phase: 'Consolidation', name: 'Five-region P&L consolidation — United States + Established Markets + Japan + International Markets + China + Corporate/Other', status: 'pending', owner: 'Corporate Accounting', dueDate: 'Day 7' },
    { id: 'mc-20', phase: 'Consolidation', name: 'Inter-regional elimination — transfer pricing on intercompany product sales; royalty flows between Astellas affiliates; management fee allocations', status: 'pending', owner: 'Corporate Consolidation', dueDate: 'Day 7' },
    { id: 'mc-21', phase: 'Consolidation', name: 'J-GAAP to Core basis reconciliation — amortization of acquired intangibles; restructuring charges; impairment losses; non-cash and one-time items excluded from Core metrics', status: 'pending', owner: 'External Reporting', dueDate: 'Day 8' },

    // Reporting
    { id: 'mc-22', phase: 'Reporting', name: 'Quarterly/half-year earnings press release preparation — consolidated P&L, segment results, Core EPS, FY2026 guidance reaffirmation or revision', status: 'pending', owner: 'IR / External Reporting', dueDate: 'Day 10' },
    { id: 'mc-23', phase: 'Reporting', name: 'Form 20-F / half-year report preparation — MD&A, segment financials, risk factors (IRA, FX, competition), pipeline disclosures', status: 'pending', owner: 'SEC / External Reporting', dueDate: 'Day 12' },
    { id: 'mc-24', phase: 'Reporting', name: 'Earnings call presentation materials — IR slide deck; CFO Atsushi Kitamura and CEO Naoki Okamura talking points; segment deep-dive slides; pipeline update', status: 'pending', owner: 'IR', dueDate: 'Day 11' },
  ],

  financialResults: {
    revenue:           { label: 'Total Revenue (¥B)',          actual: 542,  plan: 555,  priorYear: 505,  variance: -13, variancePercent: -2.3 },
    cogs:              { label: 'Cost of Product Sales (¥B)',  actual: 82,   plan: 84,   priorYear: 76,   variance: -2,  variancePercent: -2.4 },
    grossProfit:       { label: 'Gross Profit (¥B)',           actual: 460,  plan: 471,  priorYear: 429,  variance: -11, variancePercent: -2.3 },
    operatingExpenses: { label: 'R&D + SG&A + D&A (¥B)',      actual: 322,  plan: 316,  priorYear: 309,  variance: 6,   variancePercent:  1.9 },
    operatingIncome:   { label: 'Core Operating Profit (¥B)', actual: 138,  plan: 155,  priorYear: 120,  variance: -17, variancePercent: -11.0 },
    netIncome:         { label: 'Core Net Income (¥B)',        actual: 100,  plan: 115,  priorYear: 88,   variance: -15, variancePercent: -13.0 },
  },
};
