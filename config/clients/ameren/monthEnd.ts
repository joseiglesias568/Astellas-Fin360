// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/month-end.ts
//
// Close-process tasks aligned to Astellas Pharma Inc.'s accounting model:
// pharmaceutical revenue gross-to-net adjustments, collaboration revenue recognition,
// R&D expense accruals, Japan NHI price revision adjustments, FX revaluation,
// and segment P&L consolidation.
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
    { id: 'mc-1', phase: 'Pre-Close', name: 'U.S. revenue data cutoff — XTANDI, PADCEV, VEOZAH, IZERVAY, VYLOY net revenue feeds from specialty distributors and wholesalers; verify IRA price adjustment effective dates', status: 'completed', owner: 'U.S. Revenue Accounting', dueDate: 'Day 1' },
    { id: 'mc-2', phase: 'Pre-Close', name: 'Japan NHI revenue cutoff — verify post-NHI revision price points applied to all products; reconcile April 2026 biennial price adjustment vs prior-period accruals', status: 'completed', owner: 'Japan Revenue Accounting', dueDate: 'Day 1' },
    { id: 'mc-3', phase: 'Pre-Close', name: 'International and Established Markets revenue cutoff — confirm local affiliate submissions; currency rates for USD/EUR/GBP/CNY at period-end spot', status: 'completed', owner: 'International Revenue Accounting', dueDate: 'Day 1' },
    { id: 'mc-4', phase: 'Pre-Close', name: 'Pfizer XTANDI/PADCEV collaboration data cutoff — verify gross sales submissions from Pfizer; agree on profit split calculation basis', status: 'in-progress', owner: 'Alliance Finance', dueDate: 'Day 2' },

    // Revenue Recognition
    { id: 'mc-5', phase: 'Revenue Recognition', name: 'XTANDI global net revenue recognition — IRA price adjustment, Pfizer co-promotion split, chargebacks, Medicaid rebates, GPO discounts; gross-to-net deductions for all markets', status: 'completed', owner: 'U.S. Revenue Accounting', dueDate: 'Day 2' },
    { id: 'mc-6', phase: 'Revenue Recognition', name: 'PADCEV collaboration revenue recognition — Astellas/Pfizer EV collaboration agreement: shared U.S. profit/loss; ex-U.S. Astellas royalty income from Pfizer license', status: 'in-progress', owner: 'Alliance Revenue Accounting', dueDate: 'Day 2' },
    { id: 'mc-7', phase: 'Revenue Recognition', name: 'VEOZAH net revenue — U.S. co-pay assistance liabilities, managed care rebates, specialty pharmacy chargebacks; new DTC channel revenue treatment', status: 'in-progress', owner: 'U.S. Revenue Accounting', dueDate: 'Day 3' },
    { id: 'mc-8', phase: 'Revenue Recognition', name: 'Japan NHI price adjustment — April 2026 biennial revision accrual true-up; verify post-revision pricing applied to all NHI-reimbursed products vs pre-revision invoiced amounts', status: 'in-progress', owner: 'Japan Revenue Accounting', dueDate: 'Day 3' },
    { id: 'mc-9', phase: 'Revenue Recognition', name: 'VYLOY and IZERVAY revenue recognition — launch-stage gross-to-net reserves; VYLOY gastric cancer stocking orders vs depletion timing', status: 'completed', owner: 'Launch Products Revenue Accounting', dueDate: 'Day 2' },

    // Journal Processing
    { id: 'mc-10', phase: 'Journal Processing', name: 'Cost of product sales — manufacturing cost by product; royalties owed to Pfizer (XTANDI collaboration); supply chain FX impact on COGS', status: 'in-progress', owner: 'COGS / Manufacturing Accounting', dueDate: 'Day 3' },
    { id: 'mc-11', phase: 'Journal Processing', name: 'R&D expense accrual — CRO invoices, clinical trial cost completions, licensing milestones; verify R&D phasing vs annual budget ¥360B plan', status: 'in-progress', owner: 'R&D Finance', dueDate: 'Day 3' },
    { id: 'mc-12', phase: 'Journal Processing', name: 'Intangible asset amortization — PADCEV/EV collaboration rights; NUVATION acquisition intangibles; other licensed rights; goodwill impairment test if required', status: 'pending', owner: 'Corporate Accounting', dueDate: 'Day 4' },
    { id: 'mc-13', phase: 'Journal Processing', name: 'FX revaluation — USD/EUR/GBP-denominated monetary assets and liabilities revalued at period-end spot rate; forward contract mark-to-market', status: 'pending', owner: 'Treasury', dueDate: 'Day 4' },
    { id: 'mc-14', phase: 'Journal Processing', name: 'Dividend payable accrual — ¥17.5/share quarterly declared; ex-dividend date and record date verification; total payout ~¥17.5B', status: 'pending', owner: 'Treasury', dueDate: 'Day 4' },

    // Review & Analysis
    { id: 'mc-15', phase: 'Review & Analysis', name: 'Core vs GAAP reconciliation — amortization of intangibles, impairment charges, restructuring costs; verify non-Core items vs prior quarters for consistency', status: 'pending', owner: 'FP&A / External Reporting', dueDate: 'Day 5' },
    { id: 'mc-16', phase: 'Review & Analysis', name: 'SMT savings bridge vs ¥40B FY2026 plan — Q1 FY2026 savings by workstream: procurement, manufacturing, commercial SG&A, G&A; YTD vs target', status: 'pending', owner: 'SMT Finance / FP&A', dueDate: 'Day 5' },
    { id: 'mc-17', phase: 'Review & Analysis', name: 'XTANDI IRA pricing analysis — effective pricing vs pre-IRA gross price; volume trend analysis by payer channel (Medicare Part D vs commercial vs VA)', status: 'pending', owner: 'U.S. Commercial Finance', dueDate: 'Day 6' },
    { id: 'mc-18', phase: 'Review & Analysis', name: 'FX sensitivity update — USD/JPY actual vs planning rate; ¥2.1B Core OP sensitivity × spot-vs-plan difference; update hedging effectiveness assessment', status: 'pending', owner: 'Treasury / FP&A', dueDate: 'Day 6' },

    // Consolidation
    { id: 'mc-19', phase: 'Consolidation', name: 'Five-segment P&L consolidation — United States + Established Markets + Japan + International Markets + China; inter-company elimination', status: 'pending', owner: 'Corporate Accounting', dueDate: 'Day 7' },
    { id: 'mc-20', phase: 'Consolidation', name: 'Pfizer collaboration elimination — Astellas revenues from Pfizer (ex-U.S. XTANDI royalties, PADCEV collaboration income) vs cost of revenues; net collaboration P&L', status: 'pending', owner: 'Alliance Finance / Corporate Consolidation', dueDate: 'Day 7' },
    { id: 'mc-21', phase: 'Consolidation', name: 'Core Operating Income vs GAAP Operating Income reconciliation — non-Core adjustments (amortization, impairment, restructuring) sign-off by CFO', status: 'pending', owner: 'External Reporting / Tax', dueDate: 'Day 8' },

    // Reporting
    { id: 'mc-22', phase: 'Reporting', name: 'Quarterly earnings press release preparation — consolidated Core P&L, segment revenues, Core EPS ¥67, FY2026 guidance reaffirmation', status: 'pending', owner: 'IR / External Reporting', dueDate: 'Day 10' },
    { id: 'mc-23', phase: 'Reporting', name: 'TSE / OTC (ALPMY) regulatory filing preparation — Japanese GAAP (J-GAAP) quarterly report and IFRS-based disclosures; OTC Form 20-F semiannual obligations', status: 'pending', owner: 'SEC / TSE Reporting', dueDate: 'Day 12' },
    { id: 'mc-24', phase: 'Reporting', name: 'Earnings call presentation materials — IR slide deck (English/Japanese bilingual); CFO and CEO talking points; XTANDI IRA impact disclosure; SMT savings progress', status: 'pending', owner: 'IR', dueDate: 'Day 11' },
  ],

  financialResults: {
    revenue: { label: 'Total Revenues', actual: 552800, plan: 545000, priorYear: 536300, variance: 7800, variancePercent: 1.4 },
    cogs: { label: 'Cost of Product Sales + Royalties', actual: 118000, plan: 116500, priorYear: 114200, variance: 1500, variancePercent: 1.3 },
    grossProfit: { label: 'Gross Profit', actual: 434800, plan: 428500, priorYear: 422100, variance: 6300, variancePercent: 1.5 },
    operatingExpenses: { label: 'R&D Expense + SG&A + Other Operating', actual: 281800, plan: 286000, priorYear: 276300, variance: -4200, variancePercent: -1.5 },
    operatingIncome: { label: 'Core Operating Income', actual: 153000, plan: 142500, priorYear: 145800, variance: 10500, variancePercent: 7.4 },
    netIncome: { label: 'Core Net Income', actual: 67000, plan: 62500, priorYear: 63000, variance: 4000, variancePercent: 6.3 },
  },
};
