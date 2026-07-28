import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed Month-End Close Tasks, Journal Entry Stats, Trial Balance Items
//
// SOURCE: Astellas Pharma Inc. (ALPMY) — FY2025 Full-Year Results (May 2026),
// FY2025 Annual Report, Q3 FY2025 Quarterly Report.
//
// Close tasks reflect Astellas' global pharmaceutical accounting model:
// XTANDI net sales cutoff (Japan NHI pricing, US managed care rebate accruals),
// Strategic Brands revenue accrual (VYLOY/PADCEV/IZERVAY by geography),
// R&D expense booking (¥314.8B full-year / ~¥78.7B/quarter),
// SMT savings recognition (¥40B FY2026 target / ~¥10B/quarter),
// FX revaluation (USD/JPY ¥151 plan; EUR/JPY and multi-currency portfolio),
// inter-regional royalty and transfer pricing (XTANDI US→Japan royalties,
// PADCEV Astellas/Pfizer co-promotion settlement, manufacturing transfer prices),
// three-segment P&L consolidation (Oncology + Immunology + rx+ focused areas),
// goodwill and intangible amortisation (Agamatrix and minor acquisitions),
// Japan NHI biannual price revision accounting (April/October revisions),
// and IRA scenario reserve assessment (contingency disclosure monitoring).
// Trial balance values are FY2025 GAAP from the Annual Report (¥M).
// =============================================================================

export async function seedMonthEnd(prisma: PrismaClient, companyId: number) {
  // Close Tasks (26 tasks across 6 phases)

  await prisma.closeTask.createMany({
    data: [
      // Phase 1: Pre-Close (4 tasks)
      {
        companyId,
        externalId: 'mc-1',
        phase: 'Pre-Close',
        name: 'XTANDI net sales cutoff — Japan NHI prescription data reconciliation and US managed care rebate accrual finalisation for period-end',
        status: 'completed',
        owner: 'Revenue Accounting — Oncology (Japan + US)',
        dueDate: 'Day 1',
      },
      {
        companyId,
        externalId: 'mc-2',
        phase: 'Pre-Close',
        name: 'Strategic Brands revenue cutoff — VYLOY, PADCEV, and IZERVAY shipment-to-recognition timing verification across US, EU, Japan, and China affiliates',
        status: 'completed',
        owner: 'Strategic Brands Revenue Accounting',
        dueDate: 'Day 1',
      },
      {
        companyId,
        externalId: 'mc-3',
        phase: 'Pre-Close',
        name: 'PADCEV Pfizer co-promotion settlement cutoff — monthly revenue share and co-promotion expense true-up reconciliation with Pfizer for US and international markets',
        status: 'completed',
        owner: 'Alliance Finance — PADCEV / Pfizer',
        dueDate: 'Day 1',
      },
      {
        companyId,
        externalId: 'mc-4',
        phase: 'Pre-Close',
        name: 'Inter-regional royalty cutoff — XTANDI US-to-Japan royalty accrual, inter-affiliate API transfer pricing for manufacturing subsidiaries, and intra-group service fee reconciliation',
        status: 'completed',
        owner: 'Tax / Transfer Pricing / Treasury',
        dueDate: 'Day 1',
      },

      // Phase 2: Revenue Recognition (5 tasks)
      {
        companyId,
        externalId: 'mc-5',
        phase: 'Revenue Recognition',
        name: 'XTANDI net revenue recognition — US: gross-to-net deductions (managed care rebates, Medicaid best price, GPO fees, co-pay assistance); Japan: NHI net price post April/October biannual price revision; ex-US: affiliate reported net sales',
        status: 'completed',
        owner: 'Revenue Accounting — XTANDI',
        dueDate: 'Day 2',
      },
      {
        companyId,
        externalId: 'mc-6',
        phase: 'Revenue Recognition',
        name: 'VYLOY revenue recognition — US launch: gross-to-net (rebates, co-pay support, hospital chargebacks); Japan NHI net price recognition; EU affiliate net sales by member state with national HTA pricing adjustments',
        status: 'completed',
        owner: 'Revenue Accounting — VYLOY',
        dueDate: 'Day 2',
      },
      {
        companyId,
        externalId: 'mc-7',
        phase: 'Revenue Recognition',
        name: 'PADCEV and IZERVAY net revenue recognition — PADCEV: Pfizer co-promotion net revenue split per alliance agreement; IZERVAY: US ophthalmic channel gross-to-net including buy-and-bill hospital and retina specialist channel deductions',
        status: 'in-progress',
        owner: 'Revenue Accounting — PADCEV / IZERVAY',
        dueDate: 'Day 2',
      },
      {
        companyId,
        externalId: 'mc-8',
        phase: 'Revenue Recognition',
        name: 'China affiliate revenue recognition — XTANDI NRDL net pricing recognition; VYLOY early access programme revenue; NRDL renegotiation price revision accounting if applicable in current period',
        status: 'in-progress',
        owner: 'China Affiliate Revenue Accounting',
        dueDate: 'Day 3',
      },
      {
        companyId,
        externalId: 'mc-9',
        phase: 'Revenue Recognition',
        name: 'Milestones, royalties, and licensing income — R&D collaboration milestones earned in period; in-bound royalties from out-licensed assets; licence fee recognition under IFRS 15 performance obligation schedule',
        status: 'in-progress',
        owner: 'Business Development Finance / Revenue Accounting',
        dueDate: 'Day 3',
      },

      // Phase 3: Journal Processing (5 tasks)
      {
        companyId,
        externalId: 'mc-10',
        phase: 'Journal Processing',
        name: 'R&D expense booking — CRO and CMC invoices (~¥78.7B/quarter plan); internal FTE cost allocation to R&D projects; POC programme milestones; Phase 3 initiation costs; capitalisation vs expense determination under IFRS',
        status: 'in-progress',
        owner: 'R&D Finance / FP&A',
        dueDate: 'Day 3',
      },
      {
        companyId,
        externalId: 'mc-11',
        phase: 'Journal Processing',
        name: 'SMT savings recognition journal — confirmed SMT cost reductions booked to relevant cost lines (COGS, SG&A, R&D); one-time restructuring charge accruals for headcount reductions in scope for FY2026 programme; manufacturing asset impairment assessment if rationalisation decisions made',
        status: 'in-progress',
        owner: 'SMT Programme Office / Corporate Accounting',
        dueDate: 'Day 3',
      },
      {
        companyId,
        externalId: 'mc-12',
        phase: 'Journal Processing',
        name: 'FX revaluation journal — USD/JPY, EUR/JPY, and multi-currency monetary asset/liability revaluation at period-end spot rate; foreign currency translation adjustments for subsidiary balance sheets; FX hedging instrument fair value mark-to-market',
        status: 'pending',
        owner: 'Treasury / Corporate Accounting',
        dueDate: 'Day 4',
      },
      {
        companyId,
        externalId: 'mc-13',
        phase: 'Journal Processing',
        name: 'Interest expense and net finance cost journal — net interest on borrowings; interest income on cash and short-term investments; FX hedging cost allocation; fair value movement on financial instruments',
        status: 'pending',
        owner: 'Treasury',
        dueDate: 'Day 4',
      },
      {
        companyId,
        externalId: 'mc-14',
        phase: 'Journal Processing',
        name: 'Payroll, defined benefit pension, and equity compensation — global payroll close including Japan domestic and international payroll; IAS 19 pension and OPEB actuarial cost accrual; share-based compensation (restricted stock, performance shares) IFRS 2 charge',
        status: 'pending',
        owner: 'HR Finance / Corporate Accounting',
        dueDate: 'Day 4',
      },

      // Phase 4: Review & Analysis (4 tasks)
      {
        companyId,
        externalId: 'mc-15',
        phase: 'Review & Analysis',
        name: 'XTANDI gross-to-net deduction analysis — US managed care rebate accrual vs prior-period true-up; Medicaid best price calculation; co-pay assistance utilisation; net/gross ratio trend analysis for IRA pre-planning',
        status: 'pending',
        owner: 'Revenue Accounting / Commercial Finance — XTANDI',
        dueDate: 'Day 5',
      },
      {
        companyId,
        externalId: 'mc-16',
        phase: 'Review & Analysis',
        name: 'Strategic Brands revenue vs plan analysis — VYLOY/PADCEV/IZERVAY actual vs quarterly plan; PADCEV Pfizer co-promotion P&L reconciliation; VYLOY China revenue vs NRDL ramp assumption; Strategic Brands run-rate vs ¥610B FY2026 target',
        status: 'pending',
        owner: 'Commercial FP&A — Strategic Brands',
        dueDate: 'Day 5',
      },
      {
        companyId,
        externalId: 'mc-17',
        phase: 'Review & Analysis',
        name: 'SMT savings delivery review — actual savings booked in month vs ¥10B/quarter plan; workstream-level delivery tracking; restructuring charge vs savings recognition timing; SMT programme-to-date cumulative vs ¥61B total target',
        status: 'pending',
        owner: 'SMT Programme Office / CFO Office',
        dueDate: 'Day 6',
      },
      {
        companyId,
        externalId: 'mc-18',
        phase: 'Review & Analysis',
        name: 'FX sensitivity review — USD/JPY actual month-average vs ¥151 plan; Core OP translation impact; constant-currency revenue bridge preparation; hedging effectiveness assessment; FY2026 remaining period FX exposure quantification',
        status: 'pending',
        owner: 'Treasury / FP&A',
        dueDate: 'Day 6',
      },

      // Phase 5: Consolidation (4 tasks)
      {
        companyId,
        externalId: 'mc-19',
        phase: 'Consolidation',
        name: 'Global P&L consolidation — Japan parent + US affiliate (largest contributor, ~44% of revenue) + Europe affiliates + China affiliate + International markets; elimination of inter-affiliate revenues, expenses, and dividends to consolidated group P&L',
        status: 'pending',
        owner: 'Corporate Accounting / Controller',
        dueDate: 'Day 7',
      },
      {
        companyId,
        externalId: 'mc-20',
        phase: 'Consolidation',
        name: 'Inter-regional royalty and transfer pricing elimination — XTANDI US-to-Japan royalty elimination on consolidation; PADCEV manufacturing transfer price elimination; intra-group R&D recharge elimination; arm\'s-length pricing documentation',
        status: 'pending',
        owner: 'Tax / Transfer Pricing / Corporate Accounting',
        dueDate: 'Day 7',
      },
      {
        companyId,
        externalId: 'mc-21',
        phase: 'Consolidation',
        name: 'IRA contingency disclosure assessment — quarterly qualitative and quantitative assessment of XTANDI IRA MFP exposure for IFRS contingent liability disclosure requirements; legal team input on CMS negotiation status and materiality threshold',
        status: 'pending',
        owner: 'Legal / Corporate Accounting / CFO Office',
        dueDate: 'Day 8',
      },
      {
        companyId,
        externalId: 'mc-22',
        phase: 'Consolidation',
        name: 'Goodwill and intangible impairment assessment — quarterly qualitative review of goodwill from Agamatrix and other acquisitions; XTANDI and Strategic Brands CGU impairment indicators vs carrying value; IRA impact on XTANDI CGU value-in-use',
        status: 'pending',
        owner: 'Corporate Accounting / Valuation',
        dueDate: 'Day 8',
      },

      // Phase 6: Reporting (4 tasks)
      {
        companyId,
        externalId: 'mc-23',
        phase: 'Reporting',
        name: 'CFO flash report — Core OP vs guidance, Core EPS run-rate, XTANDI revenue vs plan, Strategic Brands vs ¥610B target, SMT savings delivery vs ¥10B/quarter milestone, FX impact vs ¥151 plan, R&D spend vs ¥314.8B budget',
        status: 'pending',
        owner: 'FP&A',
        dueDate: 'Day 9',
      },
      {
        companyId,
        externalId: 'mc-24',
        phase: 'Reporting',
        name: 'Core EPS bridge vs plan — Core OP waterfall: XTANDI + Strategic Brands + SMT + FX + R&D; amortisation; net interest expense (~¥45B annual); tax (~24%); ~1.32B weighted average shares; constant-currency reconciliation',
        status: 'pending',
        owner: 'Corporate FP&A / IR',
        dueDate: 'Day 9',
      },
      {
        companyId,
        externalId: 'mc-25',
        phase: 'Reporting',
        name: 'XTANDI IRA scenario update — monthly refresh of 0%/10%/15%/20% MFP scenario Core OP impact model; CMS negotiation status update from Government Affairs; FY2027–2028 IRA bridge for management review',
        status: 'pending',
        owner: 'CFO Office / Government Affairs / FP&A',
        dueDate: 'Day 10',
      },
      {
        companyId,
        externalId: 'mc-26',
        phase: 'Reporting',
        name: 'Board materials — Core OP vs ¥556.4B FY2025 base, Core EPS vs ¥115.26 FY2025 base, Strategic Brands ¥480.3B → ¥610B trajectory, SMT ¥21B FY2025 → ¥40B FY2026 delivery, XTANDI IRA MFP status, China ¥101.5B → ¥130B+ path, Pipeline POC and Phase 3 status',
        status: 'pending',
        owner: 'FP&A / IR',
        dueDate: 'Day 12',
      },
    ],
  });

  console.log('Seeded 26 close tasks across 6 phases');

  // Journal Entry Stats
  // Astellas scale: ~¥2,139.2B annual revenue (~¥535B/quarter), global pharma
  // company with Japan parent + US + EU + China affiliates + RoW.
  // Close complexity driven by: XTANDI gross-to-net (US managed care rebates,
  // Medicaid best price, co-pay assistance), PADCEV Pfizer co-promotion P&L,
  // VYLOY multi-market launch revenue recognition, FX revaluation across
  // USD/EUR/CNY/AUD, inter-affiliate royalty eliminations, R&D cost allocation,
  // SMT restructuring charges, Japan NHI price revision accounting.
  // Automated: standard sales recognition, payroll, depreciation, routine JEs.
  // Manual: XTANDI gross-to-net accruals, IRA contingency assessment, FX
  // hedging, SMT restructuring charges, PADCEV co-promotion settlement,
  // inter-affiliate transfer pricing elimination, impairment assessments.

  await prisma.journalEntryStats.create({
    data: {
      companyId,
      total: 620,
      totalAmount: 535000,
      automated: 460,
      manual: 160,
    },
  });

  console.log('Seeded journal entry stats');

  // Trial Balance Items (FY2025 GAAP, ¥M)
  // Source: Astellas Pharma FY2025 Annual Report
  // Group Revenue ¥2,139,245M; Core OP ¥556,408M (26.0% margin)
  // Core EPS ¥115.26; R&D ¥314,800M; SG&A ¥860,300M
  // Cost of Sales ¥408,410M; Interest Expense ¥45,000M
  // Net Income ¥284,000M (approx); Total Assets ~¥2,850,000M
  // Goodwill ~¥180,000M; Intangibles ~¥95,000M
  // Net Cash position (positive): ~¥300,000M

  await prisma.trialBalanceItem.createMany({
    data: [
      {
        companyId,
        label: 'Total Revenue (Net Sales + Other)',
        actual: 2139245,
        priorMonth: 178271,
        budget: 2110000,
      },
      {
        companyId,
        label: 'Cost of Sales',
        actual: 408410,
        priorMonth: 34034,
        budget: 402000,
      },
      {
        companyId,
        label: 'R&D Expense',
        actual: 314800,
        priorMonth: 26233,
        budget: 318000,
      },
      {
        companyId,
        label: 'SG&A Expense (incl. launch spend)',
        actual: 860300,
        priorMonth: 71692,
        budget: 870000,
      },
      {
        companyId,
        label: 'Total Operating Expenses',
        actual: 1582837,
        priorMonth: 131903,
        budget: 1590000,
      },
      {
        companyId,
        label: 'Core Operating Profit',
        actual: 556408,
        priorMonth: 46367,
        budget: 520000,
      },
      {
        companyId,
        label: 'Net Interest Expense',
        actual: 45000,
        priorMonth: 3750,
        budget: 46000,
      },
      {
        companyId,
        label: 'Other Income (JV / Royalties)',
        actual: 12000,
        priorMonth: 1000,
        budget: 11000,
      },
      {
        companyId,
        label: 'Net Income Attributable to Astellas',
        actual: 284000,
        priorMonth: 23667,
        budget: 265000,
      },
      {
        companyId,
        label: 'Total Assets',
        actual: 2850000,
        priorMonth: 2850000,
        budget: 2800000,
      },
      {
        companyId,
        label: 'Total Liabilities',
        actual: 1420000,
        priorMonth: 1420000,
        budget: 1410000,
      },
      {
        companyId,
        label: "Shareholders' Equity",
        actual: 1430000,
        priorMonth: 1430000,
        budget: 1390000,
      },
    ],
  });

  console.log('Seeded 12 trial balance items');
}
