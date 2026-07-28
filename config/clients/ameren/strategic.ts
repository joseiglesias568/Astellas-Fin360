// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/strategic.ts
//
// Provenance Legend: [CITED:AR-FY25] [CITED:EC-Q1-FY26]
// [DERIVED] = math from cited  [ASSUMED] = estimate  [CONFIG-ONLY] = UI param
//
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma Q1 FY2026 earnings call, IR slides, and FY2025 Annual Report.
// Five strategic imperatives per CEO Naoki Okamura and CFO Atsushi Kitamura.
// ─────────────────────────────────────────────────────────────────────
import { StrategicConfig } from '../../types';

export const strategic: StrategicConfig = {
  initiatives: [
    {
      id: 'smt-cost-transformation',
      name: 'SMT — Sustainable Margin Transformation (¥40B FY2026 Target)',
      description:
        'The Sustainable Margin Transformation (SMT) is Astellas\'s enterprise-wide cost savings program. ' +
        'FY2025: ¥21B achieved. FY2026 target: ¥40B in-year savings. Cumulative target: ¥65B by FY2027. ' +
        'Four workstreams: (1) Procurement/external spend ¥15B — API, CMO, and indirect spend renegotiations. ' +
        '(2) Manufacturing efficiency ¥15B — batch optimization, Toyama plant yield improvement, CMO footprint rationalization. ' +
        '(3) Commercial SG&A ¥7B — digital-physical promotion mix, field force productivity, agency consolidation. ' +
        '(4) G&A/shared services ¥3B — finance, IT, HR efficiency. ' +
        'SMT is the primary lever for Core OP margin expansion from 26% (FY2025) toward 28%+ by FY2027. ' +
        'Each ¥10B incremental SMT savings ≈ +0.45ppt Core OP margin improvement. ' +
        'Program oversight: dedicated SMT Steering Committee chaired by CFO Atsushi Kitamura.',
      status: 'on-track',
      budget: 2500,                   // est. one-time program investment (restructuring, system upgrades) [ASSUMED]
      spent: 650,                     // est. Q1 FY2026 program costs [ASSUMED]
      progress: 55,
      milestones: [
        { name: 'SMT program launched — FY2025 ¥21B target set', date: '2025-04-01', status: 'completed' },
        { name: 'FY2025 ¥21B savings achieved — on target', date: '2026-03-31', status: 'completed' },
        { name: 'FY2026 ¥40B target finalized by workstream', date: '2026-04-01', status: 'completed' },
        { name: 'Procurement API renegotiations complete (major contracts)', date: '2026-06-30', status: 'completed' },
        { name: 'Manufacturing footprint rationalization — Japan site decisions', date: '2026-09-30', status: 'in-progress' },
        { name: 'Commercial SG&A digital transition fully executed', date: '2026-12-31', status: 'in-progress' },
        { name: 'FY2026 ¥40B savings confirmed in annual results', date: '2027-03-31', status: 'planned' },
        { name: 'Cumulative ¥65B target achieved by FY2027', date: '2028-03-31', status: 'planned' },
      ],
      kpis: [
        { label: 'FY2025 SMT Savings', target: '¥21B', actual: '¥21B achieved', status: 'good' },
        { label: 'FY2026 SMT Target', target: '¥40B', actual: '¥10.2B Q1 FY2026 (on track)', status: 'good' },
        { label: 'Core OP Margin Expansion', target: '26.4% FY2026', actual: '27.7% Q1 FY2026 (ahead)', status: 'good' },
      ],
    },
    {
      id: 'xtandi-ira-defense',
      name: 'XTANDI IRA Price Negotiation — Volume Offset & Portfolio Defense',
      description:
        'Astellas strategic response to XTANDI (enzalutamide) IRA Medicare price negotiation. ' +
        'CMS selected XTANDI for negotiation effective September 2026. ' +
        'Astellas sensitivity: ¥9.6B Core OP per 1 percentage-point reduction in CMS negotiated price. ' +
        'Three-pronged defense: (1) Volume growth in non-Part D populations (commercial, VA, state programs). ' +
        '(2) International market expansion — XTANDI approvals in Korea, Brazil, and MENA markets. ' +
        '(3) Pipeline diversification — PADCEV, VEOZAH, VYLOY offset XTANDI headwind with growing revenues. ' +
        'Prostate cancer market continues to grow: aging demographics, earlier screening, new indications. ' +
        'XTANDI mCSPC and nmCRPC labels create non-Part D eligible patient populations. ' +
        'Pfizer co-commercialization: Astellas and Pfizer jointly managing impact — shared profit model. ' +
        'Government affairs engagement: Astellas participating in industry IRA impact discussions in Washington. ' +
        '"XTANDI remains the global standard of care in prostate cancer regardless of pricing environment."',
      status: 'on-track',
      budget: 0,
      spent: 0,
      progress: 35,                   // CMS negotiation complete; volume offset strategies in execution
      milestones: [
        { name: 'CMS selected XTANDI for IRA price negotiation', date: '2026-01-01', status: 'completed' },
        { name: 'U.S. commercial channel shift strategy activated', date: '2026-04-01', status: 'completed' },
        { name: 'CMS negotiated price agreed and published', date: '2026-08-01', status: 'in-progress' },
        { name: 'CMS negotiated price effective date', date: '2026-09-01', status: 'in-progress' },
        { name: 'FY2026 XTANDI revenue within guidance — volume offset validated', date: '2027-03-31', status: 'planned' },
        { name: 'FY2027 XTANDI non-Part D volume baseline established', date: '2027-03-31', status: 'planned' },
      ],
      kpis: [
        { label: 'Q1 FY2026 XTANDI Revenue', target: '¥143B+ quarterly', actual: '¥146.5B (+0.5% YoY)', status: 'good' },
        { label: 'Non-Part D XTANDI Volume Share', target: 'Grow vs prior year', actual: 'Commercial + VA share growing', status: 'good' },
        { label: 'FY2026 XTANDI Annual Guidance', target: '¥572B', actual: 'Q1 on track', status: 'good' },
      ],
    },
    {
      id: 'padcev-global-expansion',
      name: 'PADCEV — Bladder Cancer 1L Standard of Care & Global Launch',
      description:
        'PADCEV (enfortumab vedotin + pembrolizumab) is Astellas\'s primary growth engine. ' +
        'KEYNOTE-869 Phase 3 data: OS HR ~0.47 vs cisplatin-based chemotherapy — >50% reduction in risk of death. ' +
        'Established as standard of care in 1L urothelial carcinoma (cisplatin-eligible and ineligible). ' +
        'Q1 FY2026: ¥65.2B (+22.1% YoY) — fastest-growing product in the Astellas portfolio. ' +
        'FY2026 guidance: ¥268B. Peak sales potential ¥400B+ with indication expansions. ' +
        'Global expansion priorities: EU reimbursement (country-by-country; NICE, G-BA, HAS submissions active). ' +
        'Japan PMDA submission filed; approval targeted FY2026. ' +
        'China NMPA review underway — approval expected FY2027. ' +
        'Pipeline expansions: adjuvant setting, MIBC (muscle-invasive bladder cancer), upper tract urothelial. ' +
        'Pfizer collaboration: PADCEV co-development and co-commercialization globally. ' +
        '"PADCEV defines the new standard of care in bladder cancer — a disease that was neglected for 30 years."',
      status: 'on-track',
      budget: 0,
      spent: 0,
      progress: 65,
      milestones: [
        { name: 'KEYNOTE-869 OS data (1L PADCEV+pembro) published', date: '2025-09-30', status: 'completed' },
        { name: 'EU EMA submission for 1L urothelial carcinoma — all cisplatin populations', date: '2025-12-31', status: 'completed' },
        { name: 'NICE (UK) positive recommendation for PADCEV+pembro', date: '2026-03-31', status: 'completed' },
        { name: 'Japan PMDA NDA submission for PADCEV 1L', date: '2026-06-30', status: 'completed' },
        { name: 'G-BA (Germany) and HAS (France) reimbursement decisions', date: '2026-09-30', status: 'in-progress' },
        { name: 'Japan PADCEV approval', date: '2026-12-31', status: 'planned' },
        { name: 'PADCEV adjuvant bladder cancer Phase 3 data read-out', date: '2027-06-30', status: 'planned' },
        { name: 'China NMPA approval for PADCEV', date: '2027-09-30', status: 'planned' },
      ],
      kpis: [
        { label: 'Q1 FY2026 PADCEV Revenue', target: '¥58B+ quarterly', actual: '¥65.2B (+22.1% YoY)', status: 'good' },
        { label: '1L Bladder Cancer Market Share', target: '>50%', actual: '~50% (on target)', status: 'good' },
        { label: 'EU Reimbursement Markets', target: '4 major markets by FY2026', actual: 'NICE positive; G-BA/HAS in-progress', status: 'good' },
      ],
    },
    {
      id: 'veozah-commercial-execution',
      name: 'VEOZAH — U.S. Commercial Execution & International Expansion',
      description:
        'VEOZAH (fezolinetant) is Astellas\'s first non-hormonal prescription treatment for vasomotor symptoms (hot flashes) of menopause. ' +
        'FDA-approved 2023 — first neurokinin B receptor antagonist for VMS. ' +
        'Differentiation: no hormones, no Black Box warning (unlike ospemifene/HRT), once-daily oral. ' +
        'Addressable market: ~38M U.S. women aged 45–60 with moderate-to-severe VMS; ~25% currently treated. ' +
        'Commercial execution: 1,200+ field force targeting OB/GYN, primary care, and internal medicine. ' +
        'DTC campaign: major TV/digital investment beginning Q2 FY2026 — "Feel Like You Again." ' +
        'Payer coverage: >85% commercial lives covered as of Q1 FY2026; expanding toward 90%+. ' +
        'Q1 FY2026: ¥26.8B (+38.1% YoY). FY2026 guidance ¥110B. ' +
        'International: EU EMA review; Japan PMDA NDA under review (largest VMS market ex-U.S.); Australia TGA approved. ' +
        'VEOZAH represents Astellas women\'s health franchise — a $1B+ peak sales candidate.',
      status: 'on-track',
      budget: 85000,                  // est. VEOZAH total SG&A investment FY2026 [ASSUMED]
      spent: 21250,                   // est. Q1 FY2026 VEOZAH commercial investment [ASSUMED]
      progress: 50,
      milestones: [
        { name: 'FDA approval for VEOZAH (fezolinetant) VMS', date: '2023-05-12', status: 'completed' },
        { name: 'Payer coverage >80% commercial lives achieved', date: '2025-12-31', status: 'completed' },
        { name: 'Japan PMDA NDA submission (VEOZAH VMS)', date: '2026-03-31', status: 'completed' },
        { name: 'DTC campaign major TV/digital launch', date: '2026-06-01', status: 'completed' },
        { name: 'EU EMA review ongoing — regulatory opinion', date: '2026-09-30', status: 'in-progress' },
        { name: 'Payer coverage >90% commercial lives', date: '2026-12-31', status: 'in-progress' },
        { name: 'Japan PMDA approval for VEOZAH', date: '2026-12-31', status: 'planned' },
        { name: 'VEOZAH Japan commercial launch', date: '2027-03-31', status: 'planned' },
        { name: 'VEOZAH ¥200B+ peak year revenue', date: '2028-03-31', status: 'planned' },
      ],
      kpis: [
        { label: 'Q1 FY2026 VEOZAH Revenue', target: '¥25B+ quarterly', actual: '¥26.8B (+38.1% YoY)', status: 'good' },
        { label: 'Payer Coverage Rate', target: '>90% commercial', actual: '>85% (on trajectory)', status: 'good' },
        { label: 'New Prescribers Q1 FY2026', target: '+2,500/quarter', actual: '+2,800 new prescribers', status: 'good' },
      ],
    },
    {
      id: 'japan-nhi-mitigation',
      name: 'Japan NHI Price Revision Mitigation — Volume & Pipeline Offset',
      description:
        'Japan National Health Insurance biennial price revision creates structural revenue headwind for Astellas Japan. ' +
        'April 2026 revision: average −3.5% across portfolio → ¥8–12B annual revenue headwind. ' +
        'Next revision: April 2028 (planning underway). ' +
        'Mitigation levers: (1) XTANDI mCSPC label expansion volume — broader prostate cancer indication. ' +
        '(2) VEOZAH Japan PMDA NDA under review — new product revenue upon approval. ' +
        '(3) Transplantation franchise defense — generic competition contained through physician loyalty and innovation. ' +
        '(4) Manufacturing SMT savings offset margin impact. ' +
        '(5) PADCEV Japan PMDA submission — major new revenue stream upon approval. ' +
        'Japan remains Astellas\'s home market and headquarters — a critical market for institutional credibility. ' +
        'MHLW drug pricing reform trends: larger cuts expected going forward. ' +
        'Astellas engages Japan Pharmaceutical Manufacturers Association (JPMA) on pricing reform advocacy.',
      status: 'on-track',
      budget: 0,
      spent: 0,
      progress: 45,
      milestones: [
        { name: 'April 2026 NHI price revision implemented — ¥4.6B Q1 revenue impact', date: '2026-04-01', status: 'completed' },
        { name: 'XTANDI mCSPC Japan label expansion prescription uptake tracking started', date: '2026-04-01', status: 'completed' },
        { name: 'VEOZAH Japan NDA under PMDA review', date: '2026-06-30', status: 'in-progress' },
        { name: 'PADCEV Japan PMDA NDA submission', date: '2026-06-30', status: 'completed' },
        { name: 'Japan segment revenue volume recovery back to pre-revision level', date: '2026-12-31', status: 'in-progress' },
        { name: 'FY2028 NHI revision scenario planning complete', date: '2026-12-31', status: 'planned' },
        { name: 'VEOZAH Japan commercial launch (upon PMDA approval)', date: '2027-03-31', status: 'planned' },
        { name: 'PADCEV Japan approval and commercial launch', date: '2027-03-31', status: 'planned' },
      ],
      kpis: [
        { label: 'Japan Q1 FY2026 Revenue', target: '¥85B+ (vs NHI headwind)', actual: '¥86.5B (−2.1% YoY, contained)', status: 'good' },
        { label: 'XTANDI Japan New Indication Volume', target: 'mCSPC/nmCRPC offset NHI', actual: 'Growing — on target', status: 'good' },
        { label: 'FY2026 Japan Annual Guidance', target: '~¥355B', actual: 'Q1 on track', status: 'good' },
      ],
    },
  ],

  risks: [
    {
      id: 'xtandi-ira-price',
      name: 'XTANDI IRA Medicare Price Negotiation Severity',
      description: 'CMS IRA price negotiation — effective September 2026. Astellas sensitivity ¥9.6B Core OP per 1pp cut. Base case: 15pp cut (¥144B headwind). Bear case: 25pp cut (¥240B headwind). Volume growth in non-Part D populations is primary offset lever. Risk is partially mitigated by Pfizer co-commercialization profit sharing and strong non-U.S. XTANDI revenues.',
      likelihood: 'high',
      impact: 'high',
      mitigations: [
        'U.S. commercial channel: shift eligible patients to commercial formulary (not Part D)',
        'VA and other government channel growth — not subject to IRA Medicare negotiation',
        'International volume expansion: Korea, Brazil, MENA XTANDI approvals ongoing',
        'XTANDI new indication labels (mCSPC, nmCRPC) expand non-Part D patient population',
        'Government affairs: JPMA + PhRMA advocacy on IRA implementation scope',
      ],
    },
    {
      id: 'fx-yen-appreciation',
      name: 'Japanese Yen Appreciation (USD/JPY Decline)',
      description: 'USD/JPY sensitivity: ¥2.1B Core OP per ¥1 move. Planning rate ~¥155. BoJ policy normalization risk: if BoJ raises rates further, yen may appreciate toward ¥145 or below — creating ¥21B+ Core OP headwind vs plan. ~70% of revenues are foreign-currency-denominated.',
      likelihood: 'medium',
      impact: 'high',
      mitigations: [
        'FX hedging program: ~40% of USD/EUR exposure hedged at 6–18 month horizon',
        'Natural hedge: USD-denominated procurement and manufacturing costs (~20% of revenue base)',
        'Active monitoring: ¥148 triggers formal hedging program review',
        'Guidance range incorporates ±¥5 USD/JPY sensitivity in published range',
        'Investor disclosure: FX sensitivity table published quarterly in IR materials',
      ],
    },
    {
      id: 'padcev-competition',
      name: 'PADCEV 1L Bladder Cancer Market Share Competition',
      description: 'PADCEV+pembro (KEYNOTE-869) 1L standard of care faces competition from BMS nivolumab+cabozantinib and Roche IMvigor combinations. Merck Keytruda biosimilar risk post-2028 could affect combination value. Each 5% market share loss ≈ −¥6.5B PADCEV annual revenue.',
      likelihood: 'medium',
      impact: 'high',
      mitigations: [
        'KEYNOTE-869 OS HR ~0.47 vs chemo — level of evidence difficult for competitors to match',
        'Real-world data collection: PADCEV durability of response data being compiled',
        'Indication expansion: adjuvant bladder cancer, MIBC, upper tract reduce competitor exposure',
        'Physician education: PADCEV-specific toxicity management expertise creates prescriber loyalty',
        'Pfizer co-commercialization: combined Astellas+Pfizer promotional firepower across urology/oncology',
      ],
    },
    {
      id: 'japan-nhi-escalation',
      name: 'Japan NHI Price Reform — Accelerating Price Reduction Trend',
      description: 'MHLW drug pricing reform trend: biennial NHI revisions becoming larger (2022: ~3%, 2024: ~3.5%). FY2028 revision could be 5–6%+ as government fiscal pressure intensifies. Each additional 1% NHI cut ≈ −¥2.5B Japan annual revenue. XTANDI Japan pricing is particularly exposed to cancer drug pricing scrutiny.',
      likelihood: 'medium',
      impact: 'medium',
      mitigations: [
        'JPMA engagement: industry advocacy for cost-effectiveness-based pricing reform rather than broad cuts',
        'Pipeline pipeline Japan approvals: PADCEV Japan, VEOZAH Japan — new revenues offset old-product cuts',
        'XTANDI lifecycle management: combination studies, earlier line use creates new pricing opportunities',
        'Manufacturing SMT: Japan cost base reduction makes lower prices more manageable',
        'FY2028 revision scenario planning: internal modeling for 3%, 5%, and 7% cut scenarios already underway',
      ],
    },
    {
      id: 'smt-execution-risk',
      name: 'SMT Savings Program Execution Shortfall',
      description: 'SMT FY2026 ¥40B target depends on concurrent procurement renegotiations, manufacturing footprint changes, and commercial model transformation. Each ¥10B shortfall ≈ −0.45ppt Core OP margin. Risk: procurement supplier pushback; manufacturing site closures meeting community/union resistance; SG&A cuts impacting VEOZAH/VYLOY launch investment.',
      likelihood: 'low',
      impact: 'medium',
      mitigations: [
        'SMT Steering Committee (CFO-chaired) with monthly go/no-go decision gates',
        'Workstream leads accountable to quarterly savings milestones with escalation triggers',
        'Independent Finance validation of savings claims — no self-reported "accounting savings"',
        'Phase-gated approach: procurement first (lower risk), manufacturing second, SG&A last',
        'Contingency: SMT shortfall scenario has defined response playbook (launch investment protection)',
      ],
    },
  ],
};
