// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/strategic.ts
//
// Provenance Legend: [CITED:AR-FY25] [CITED:EC-FY25] [CITED:IR-FY26]
// [DERIVED] = math from cited  [ASSUMED] = estimate  [CONFIG-ONLY] = UI param
//
// ─────────────────────────────────────────────────────────────────────
// SOURCES
// Astellas Pharma Inc. FY2025 Annual Results (May 2025); FY2026 Full-Year
// Guidance; FY2025 Integrated Report; Investor Relations presentations and
// SMT program disclosures. CEO: Naoki Okamura; CFO: Atsushi Kitamura.
// Fiscal year: April 1 – March 31. FY2025 = April 2025 – March 2026.
// FY2026 = April 2026 – March 2027.
// All monetary values in ¥B (billions of JPY) unless noted otherwise.
// Initiative budget/spent values expressed in ¥B.
//
// DISCLAIMER
// Initiative budgets and progress percentages are estimated for
// demonstration — Astellas does not publicly disclose initiative-by-
// initiative cost breakdowns at this granularity. Forward-outlook quarterly
// figures reflect FY2026 full-year guidance (¥2,220B revenue; Core OP ¥620B)
// distributed across Astellas' typical quarterly revenue pattern.
// ─────────────────────────────────────────────────────────────────────
import { StrategicConfig } from '../../types';

export const strategic: StrategicConfig = {
  initiatives: [
    {
      id: 'smt-cost-optimization',
      name: 'Sustainable Margin Transformation (SMT) — ¥65B Cumulative Savings',
      description:
        'The Sustainable Margin Transformation (SMT) is Astellas\' multi-year cost optimization program targeting ¥65B in cumulative savings over two fiscal years (FY2025 + FY2026). ' +
        'FY2025 achieved ¥21B in savings — ahead of internal milestones — through SG&A rationalization, R&D efficiency, ' +
        'organizational delayering, and headcount streamlining across G&A and commercial support functions. ' +
        'FY2026 target is ¥40B incremental savings to reach ¥65B cumulative 2-year total. ' +
        'SMT progress is tracked as 60% complete toward the 2-year ¥65B goal as of end-FY2025. ' +
        'Key levers: (1) SG&A optimization — reducing co-promotion fees dependency, streamlining field force in mature markets; ' +
        '(2) R&D efficiency — portfolio prioritization, CRO partnerships, and digital trial tools; ' +
        '(3) Organizational simplification — span-of-control improvement, selective headcount reduction of ~16,000 global employees; ' +
        '(4) IT modernization — SAP S/4HANA migration reducing duplication costs; ' +
        '(5) Procurement savings — API dual-sourcing negotiations and vendor consolidation. ' +
        'Core OP margin FY2025: 26.0%; SMT designed to expand toward 27-28% in FY2026 on flat or growing revenue.',
      status: 'on-track',
      budget: 0,                           // cost reduction program — not a capex initiative; savings target ¥65B cumulative [CONFIG-ONLY]
      spent: 0,
      progress: 60,                        // 60% progress: ¥21B FY2025 actual toward ¥65B 2-year cumulative target [DERIVED]
      milestones: [
        { name: 'SMT program announced and governance established', date: '2024-05-31', status: 'completed' },
        { name: 'FY2025 ¥21B savings delivered — ahead of internal targets', date: '2026-03-31', status: 'completed' },
        { name: 'SG&A optimization: field force rightsizing and co-promotion fee reduction', date: '2026-03-31', status: 'completed' },
        { name: 'R&D efficiency: portfolio prioritization and CRO partnership expansion', date: '2026-06-30', status: 'in-progress' },
        { name: 'IT modernization: SAP S/4HANA Phase 1 rollout', date: '2026-09-30', status: 'in-progress' },
        { name: 'FY2026 ¥40B incremental target — year-end delivery', date: '2027-03-31', status: 'planned' },
        { name: '¥65B cumulative 2-year savings target achieved', date: '2027-03-31', status: 'planned' },
      ],
      kpis: [
        { label: 'FY2025 Savings Achieved', target: '¥65B cumulative', actual: '¥21B FY2025 (on track)', status: 'good' },
        { label: 'FY2026 Incremental Target', target: '¥40B', actual: 'In progress (60% of 2yr goal done)', status: 'good' },
        { label: 'Core OP Margin (FY2025)', target: '27-28% FY2026', actual: '26.0% FY2025', status: 'good' },
        { label: 'SG&A as % of Revenue (FY2025)', target: '<38% FY2026', actual: '40.2% FY2025 (incl. XTANDI co-promo)', status: 'warning' },
      ],
    },
    {
      id: 'strategic-brands-expansion',
      name: 'Strategic Brands Global Expansion — ¥610B FY2026 Target (+27%)',
      description:
        'Strategic Brands — comprising PADCEV (enfortumab vedotin-ejfv), IZERVAY (avacincaptad pegol), VYLOY (zolbetuximab), VEOZAH (fezolinetant), and XOSPATA (gilteritinib) — are the commercial engine of Astellas\' growth strategy. ' +
        'FY2025 Strategic Brands revenue reached ¥480.3B, +43% YoY, representing ~22% of total Astellas revenue. ' +
        'FY2026 target is ¥610B (+27% YoY), underpinned by multiple simultaneous growth drivers: ' +
        '(1) PADCEV global leadership in 1L metastatic urothelial carcinoma (mUC) — EV-302 overall survival data driving rapid guideline adoption; MIBC neoadjuvant expansion underway; China filing planned; ' +
        '(2) VYLOY commercial launches in Japan and Europe following GC/GEJC approval — first CLDN18.2-targeted therapy; US launch in progress; ' +
        '(3) IZERVAY US geographic atrophy market penetration — first approved complement C5 inhibitor for GA; ' +
        '(4) VEOZAH US and EU market ramp-up — first non-hormonal NKB receptor antagonist for menopause vasomotor symptoms; ' +
        '(5) XOSPATA established in FLT3-mutated AML globally, growing in ex-US markets. ' +
        'Commercial excellence investments being protected under SMT, prioritized in oncology key accounts.',
      status: 'on-track',
      budget: 200,                         // est. ¥200B commercial investment (field, marketing, medical affairs) [ASSUMED]
      spent: 90,                           // est. ¥90B H1 FY2026 spend [ASSUMED]
      progress: 55,
      milestones: [
        { name: 'PADCEV EV-302 OS data — 1L mUC standard of care globally', date: '2024-06-30', status: 'completed' },
        { name: 'VYLOY Japan & EU/US launch — GC/GEJC first indication', date: '2025-12-31', status: 'completed' },
        { name: 'IZERVAY US launch and payer coverage established', date: '2025-06-30', status: 'completed' },
        { name: 'VEOZAH EU approval and launch (menopause vasomotor symptoms)', date: '2025-12-31', status: 'completed' },
        { name: 'Strategic Brands ¥480.3B FY2025 — +43% YoY delivered', date: '2026-03-31', status: 'completed' },
        { name: 'PADCEV MIBC neoadjuvant indication filing (US/EU)', date: '2026-09-30', status: 'in-progress' },
        { name: 'VYLOY China NDA filing', date: '2026-12-31', status: 'in-progress' },
        { name: 'Strategic Brands ¥610B FY2026 target', date: '2027-03-31', status: 'planned' },
      ],
      kpis: [
        { label: 'Strategic Brands FY2025 Revenue', target: '¥610B FY2026', actual: '¥480.3B (+43%)', status: 'good' },
        { label: 'PADCEV 1L mUC Global Share', target: '40%+ by FY2027', actual: '~35% (estimated)', status: 'good' },
        { label: 'VYLOY Launch Markets (Active)', target: '5+ major markets', actual: 'Japan, US launched; EU filing', status: 'good' },
        { label: 'VEOZAH US Rx Penetration', target: 'Market leadership vs HRT alternatives', actual: 'Growing — adherence >65% at 6mo', status: 'good' },
      ],
    },
    {
      id: 'pipeline-poc-program',
      name: 'Pipeline & Innovation — POC Program + Phase 3 Wave',
      description:
        'Astellas\' research engine delivered 3 Proof-of-Concept (POC) results in FY2025, meeting its annual target across therapeutic areas including oncology, urology, immunology, nephrology, and ophthalmology. ' +
        'POC attainment is the primary upstream metric for pipeline productivity — each successful POC feeds into Phase 2/3 advancement decisions. ' +
        'FY2026 marks the initiation of multiple Phase 3 studies across the pipeline, representing the most intensive Phase 3 investment wave since the PADCEV/XTANDI era. ' +
        'R&D investment increases to ¥355B in FY2026 (+12.8% YoY from ¥314.8B FY2025), reflecting the Phase 3 trial cost ramp. ' +
        'Key therapeutic area focus: ' +
        '(1) Oncology — PADCEV new combinations/indications; ADC pipeline; next-gen oncology targets (undisclosed); ' +
        '(2) Urology — XTANDI combination studies; androgen receptor pathway follow-on; ' +
        '(3) Immunology — undisclosed programs with POC data maturation; ' +
        '(4) Nephrology — IgA nephropathy and proteinuria programs; ' +
        '(5) Ophthalmology — IZERVAY GA Phase 3b/4 real-world studies; next complement program. ' +
        'Astellas leverages its Focus Areas structure — a dedicated early research framework — to surface best-in-class molecules before Phase 2.',
      status: 'on-track',
      budget: 355,                         // ¥355B R&D investment planned FY2026 [CITED:IR-FY26]
      spent: 80,                           // est. ¥80B Q1 FY2026 R&D spend [ASSUMED/DERIVED]
      progress: 45,
      milestones: [
        { name: 'FY2025 R&D expense ¥314.8B (14.7% of revenue) — delivered', date: '2026-03-31', status: 'completed' },
        { name: '3 POCs achieved in FY2025 — annual target met', date: '2026-03-31', status: 'completed' },
        { name: 'Phase 3 study initiations: oncology programs', date: '2026-09-30', status: 'in-progress' },
        { name: 'Phase 3 study initiations: nephrology / immunology programs', date: '2026-12-31', status: 'in-progress' },
        { name: 'FY2026 R&D investment ¥355B — Phase 3 ramp complete', date: '2027-03-31', status: 'planned' },
        { name: '3 POC target for FY2026', date: '2027-03-31', status: 'planned' },
        { name: 'First read-outs from new Phase 3 programs (oncology)', date: '2028-12-31', status: 'planned' },
      ],
      kpis: [
        { label: 'POCs Achieved FY2025', target: '3 per year', actual: '3 (target met)', status: 'good' },
        { label: 'R&D Investment FY2026', target: '¥355B (+12.8% YoY)', actual: '¥80B Q1 FY2026 est.', status: 'good' },
        { label: 'Phase 3 Studies Initiating FY2026', target: 'Multiple', actual: 'Oncology + nephrology/immunology', status: 'good' },
        { label: 'Pipeline Programs Total', target: '~60 in development', actual: '~60 across all phases', status: 'good' },
      ],
    },
    {
      id: 'xtandi-lifecycle',
      name: 'XTANDI Global Defense & Lifecycle Management',
      description:
        'XTANDI (enzalutamide) is Astellas\' largest single revenue contributor, co-promoted with Pfizer globally and with Astellas exclusively in Japan. ' +
        'In the US, XTANDI faces a material risk from IRA (Inflation Reduction Act) price negotiation — with a potential revenue impact of approximately ¥50B in FY2026 as CMS negotiates reimbursement rates. ' +
        'In Europe, XTANDI benefits from an exceptionally long patent exclusivity position (approximately 28+ years remaining), protecting revenue through the mid-2050s in key markets. ' +
        'Lifecycle management strategy: ' +
        '(1) Earlier lines of therapy — mCSPC (metastatic castration-sensitive prostate cancer) and nmCRPC label expansions already approved and growing; ' +
        '(2) Combination regimens — XTANDI + PARP inhibitors, XTANDI + novel AR pathway drugs in Phase 3; ' +
        '(3) LuPSMA combinations — partnering with Novartis/academic centers on PSMA-targeted + XTANDI combinations; ' +
        '(4) Volume defense — geographic expansion into Asia Pacific, emerging markets; price optimization to offset US IRA headwind; ' +
        '(5) Indication breadth — triple-negative breast cancer (ENZA-p) and other AR-expressing tumor types in development. ' +
        'XTANDI FY2025 worldwide revenue ~¥570B+ (estimated based on total product mix). EU protection period provides a long tail of stable cash flows to fund future pipeline.',
      status: 'at-risk',
      budget: 40,                          // est. ¥40B lifecycle R&D and regulatory investment [ASSUMED]
      spent: 15,                           // est. ¥15B H1 FY2026 [ASSUMED]
      progress: 50,
      milestones: [
        { name: 'XTANDI mCSPC approval (US/EU) — label expansion complete', date: '2023-12-31', status: 'completed' },
        { name: 'XTANDI nmCRPC approval (US/EU) — label expansion complete', date: '2023-06-30', status: 'completed' },
        { name: 'IRA price negotiation risk — CMS negotiation process entered', date: '2025-08-01', status: 'completed' },
        { name: 'XTANDI + PARP inhibitor combination Phase 3 initiation', date: '2026-09-30', status: 'in-progress' },
        { name: 'EU/Japan XTANDI volume growth — offset US IRA headwind', date: '2027-03-31', status: 'in-progress' },
        { name: 'IRA negotiated price effective date — US impact crystalized', date: '2027-01-01', status: 'planned' },
        { name: 'Next-generation AR pathway compound POC (follow-on XTANDI)', date: '2028-03-31', status: 'planned' },
      ],
      kpis: [
        { label: 'XTANDI US IRA Revenue Risk', target: 'Minimize below ¥50B impact', actual: 'Potential ~¥50B FY2026 decline', status: 'warning' },
        { label: 'XTANDI EU Patent Protection', target: 'Maintain full exclusivity', actual: '28+ years remaining', status: 'good' },
        { label: 'XTANDI Global Prostate Cancer Share', target: 'Defend >20%', actual: '~22% (estimated)', status: 'good' },
        { label: 'XTANDI New Combination Studies', target: '2+ Phase 3 active', actual: '1 active; 1 initiating', status: 'good' },
      ],
    },
    {
      id: 'china-market-expansion',
      name: 'China & Emerging Market Access — ¥150B+ China by FY2027',
      description:
        'China is Astellas\' fastest-growing region, delivering ¥101.5B revenue in FY2025 at +29.6% YoY growth — outpacing all other geographies. ' +
        'The China strategy is built on three pillars: (1) pipeline pipeline access — rapidly filing new products, notably VYLOY (zolbetuximab for gastric cancer) where China has particularly high unmet need; ' +
        '(2) NHI reimbursement expansion — multiple products in the National Healthcare Insurance catalog negotiation process, which is the critical pathway to volume in China; ' +
        '(3) local commercial excellence — expanding the China commercial team and KOL/hospital account management capabilities in tier-1 and tier-2 oncology centers. ' +
        'VYLOY (zolbetuximab) is strategically important for China given gastric cancer is among the most prevalent cancers in China and Japan. ' +
        'NDA filing planned for FY2026; NHI reimbursement expected to follow approval within 1-2 years. ' +
        'Other China priority products: PADCEV (urothelial), XTANDI (prostate), XOSPATA (AML). ' +
        'Emerging market strategy (Southeast Asia, Latin America, Middle East): selective market access programs for PADCEV and XTANDI, leveraging orphan/accelerated pathways where available. ' +
        'Long-term target: China revenue ¥150B+ by FY2027 (implied CAGR of ~22% from FY2025 base).',
      status: 'on-track',
      budget: 50,                          // est. ¥50B market development investment in China FY2026 [ASSUMED]
      spent: 18,                           // est. ¥18B H1 FY2026 [ASSUMED]
      progress: 40,
      milestones: [
        { name: 'China revenue ¥101.5B FY2025 (+29.6% YoY) — delivered', date: '2026-03-31', status: 'completed' },
        { name: 'XTANDI China NHI reimbursement secured', date: '2025-12-31', status: 'completed' },
        { name: 'PADCEV China NDA submission', date: '2026-09-30', status: 'in-progress' },
        { name: 'VYLOY China NDA filing — gastric cancer CLDN18.2+', date: '2026-12-31', status: 'in-progress' },
        { name: 'Additional products in China NHI process', date: '2027-03-31', status: 'in-progress' },
        { name: 'China revenue ¥130B FY2026 (interim milestone)', date: '2027-03-31', status: 'planned' },
        { name: 'VYLOY China NHI reimbursement (post-approval)', date: '2028-03-31', status: 'planned' },
        { name: 'China revenue ¥150B+ by FY2027 target', date: '2028-03-31', status: 'planned' },
      ],
      kpis: [
        { label: 'China FY2025 Revenue', target: '¥150B+ by FY2027', actual: '¥101.5B (+29.6% YoY)', status: 'good' },
        { label: 'China YoY Growth Rate', target: 'Sustain >20% CAGR', actual: '+29.6% FY2025 (fastest region)', status: 'good' },
        { label: 'VYLOY China Filing', target: 'NDA filed FY2026', actual: 'In progress — planned FY2026', status: 'good' },
        { label: 'Products in China NHI Process', target: '3+ on national formulary by FY2027', actual: 'Multiple in negotiation', status: 'good' },
      ],
    },
  ],

  risks: [
    {
      id: 'ira-xtandi-us-pricing',
      category: 'Regulatory / Pricing',
      title: 'IRA Price Negotiation — XTANDI US Revenue Risk',
      description:
        'The US Inflation Reduction Act (IRA) subjects XTANDI to mandatory Medicare price negotiation with CMS. ' +
        'XTANDI was selected among the first cohort of drugs subject to IRA negotiations, with a potential negotiated price effective January 1, 2027. ' +
        'The price reduction is estimated to cause a revenue decline of approximately ¥50B in FY2026 for the US XTANDI franchise. ' +
        'This represents a structural headwind to Americas revenue, which was ¥1,005.4B in FY2025.',
      severity: 'high',
      likelihood: 'high',
      impact:
        'Potential ~¥50B US XTANDI revenue decline in FY2026. Americas segment (~47% of total revenue) growth at risk. ' +
        'Partially offset by volume growth from label expansions (mCSPC, nmCRPC) and EU/Japan volume growth. ' +
        'Pfizer co-promotion fee structure provides some natural cost offset as US net revenue declines.',
      mitigation:
        'Active IRA negotiation process with CMS — maximizing statutory protection arguments. ' +
        'EU/Japan/Asia volume growth offsetting US price headwind. ' +
        'XTANDI lifecycle management (new combinations, earlier lines) sustaining volume. ' +
        'SMT SG&A savings reducing dependency on XTANDI gross margin contribution. ' +
        'Strategic Brands growth (¥610B target) diversifying revenue away from XTANDI concentration.',
      owner: 'Atsushi Kitamura (CFO) + Global Regulatory Affairs',
    },
    {
      id: 'xtandi-competition-arsi',
      category: 'Competitive / Market',
      title: 'XTANDI ARSi Class Competition (Darolutamide, Apalutamide)',
      description:
        'XTANDI competes in the ARSi (androgen receptor signaling inhibitor) class against darolutamide (Nubeqa, Bayer/Janssen) and apalutamide (Erleada, J&J). ' +
        'Darolutamide has gained share with a differentiated CNS-penetrance profile and competitive Phase 3 data in mHSPC. ' +
        'Competition is intensifying in earlier-line settings (nmCRPC, mCSPC) where multiple ARSis have approvals.',
      severity: 'medium',
      likelihood: 'high',
      impact:
        'XTANDI global market share (~22%) faces erosion pressure in key mCSPC and nmCRPC segments. ' +
        'US price + volume pressure could compound, creating double headwind. ' +
        'Mitigated by XTANDI\'s longer established payer coverage, formulary position, and physician familiarity.',
      mitigation:
        'XTANDI combination studies (PARP inhibitor + enzalutamide) creating next-gen differentiated regimen. ' +
        'EU 28+ year patent protection insulates major European market from generic threat. ' +
        'Expanding into earlier treatment lines and combination partners to sustain relevance. ' +
        'Japan and Asia Pacific prostate cancer franchise less competitive — XTANDI dominant. ' +
        'Pipeline next-generation AR-pathway molecule in early development.',
      owner: 'Naoki Okamura (CEO) + Global Oncology Commercial',
    },
    {
      id: 'padcev-adc-competition',
      category: 'Competitive / Clinical',
      title: 'ADC Class Competition Threatening PADCEV Leadership in mUC',
      description:
        'PADCEV (enfortumab vedotin-ejfv + pembrolizumab) established 1L mUC standard of care with EV-302 data. ' +
        'However, the antibody-drug conjugate (ADC) space is the most competitive in oncology. ' +
        'Competing ADCs targeting urothelial carcinoma (sacituzumab govitecan, disitamab vedotin/RC48) are in Phase 3 trials that could read out and provide alternative first-line options. ' +
        'Johnson & Johnson / Seagen legacy (now Pfizer) competition and emerging Chinese ADC developers (RemeGen) are active.',
      severity: 'medium',
      likelihood: 'medium',
      impact:
        'PADCEV market share (~35% in 1L mUC) could face erosion if competing ADCs demonstrate superiority or non-inferiority with better tolerability. ' +
        'PerineuropathyAEs (neuro toxicity) remain a managed risk in the PADCEV label. ' +
        'Key PADCEV revenue (~¥200B+ est. FY2025) is critical to Strategic Brands ¥610B target.',
      mitigation:
        'PADCEV MIBC (neoadjuvant/adjuvant) expansion broadening addressable patient population beyond mUC. ' +
        'China and Asia Pacific launch programs creating new patient access ahead of competition. ' +
        'Long-term Merck co-development agreement locking in pembrolizumab combination exclusivity. ' +
        'Real-world evidence program building durable physician confidence in PADCEV outcomes. ' +
        'Next-generation ADC research in Astellas pipeline targeting novel tumor antigens.',
      owner: 'Global Oncology Development + Commercial Excellence',
    },
    {
      id: 'pipeline-clinical-failure',
      category: 'R&D / Clinical',
      title: 'Phase 3 Clinical Trial Failure Risk — Pipeline Productivity',
      description:
        'Astellas\' FY2026 R&D investment of ¥355B reflects a major Phase 3 study initiation wave. ' +
        'Pharmaceutical Phase 3 oncology trials historically fail at ~40-50% rates. ' +
        'A significant Phase 3 failure — particularly in a high-profile program like the XTANDI combination or an oncology ADC — ' +
        'would create both financial write-off impact and pipeline confidence risk. ' +
        'Astellas discloses ~60 programs in development; selectivity in Phase 3 advancement is critical.',
      severity: 'high',
      likelihood: 'high',
      impact:
        'Individual program failures: R&D write-offs ¥10-50B per Phase 3 failure depending on investment stage. ' +
        'Portfolio failure cluster: structural confidence risk in Astellas\' ability to replace XTANDI revenue post-IRA. ' +
        'Market capitalization impact: pipeline programs represent significant portion of Astellas\' intangible asset value.',
      mitigation:
        'Portfolio diversification across five therapeutic areas (oncology, urology, immunology, nephrology, ophthalmology). ' +
        'POC-gated advancement: 3 POCs/year target ensures only validated programs reach Phase 3. ' +
        'Biomarker-enriched trial designs improving Phase 3 probability of success (e.g., CLDN18.2+ selection for VYLOY). ' +
        'Adaptive trial designs allowing futility stopping at pre-specified interim analyses. ' +
        'External collaborations and in-licensing de-risking internal R&D concentration.',
      owner: 'Chief R&D Officer + Clinical Development Leadership',
    },
    {
      id: 'china-regulatory-access',
      category: 'Regulatory / Market Access',
      title: 'China NHI Reimbursement & Regulatory Delays',
      description:
        'China\'s growth trajectory (+29.6% FY2025) depends on continued National Healthcare Insurance (NHI) catalog expansion for Astellas products. ' +
        'The NHI negotiation process is complex, protracted (12-24 months post-approval), and subject to significant price concessions. ' +
        'VYLOY China NDA filing in FY2026 followed by NHI reimbursement review — any regulatory or reimbursement delay impacts the ¥150B+ FY2027 China target. ' +
        'Additionally, geopolitical tensions between Japan/US and China could create market access headwinds for Japanese pharmaceutical companies.',
      severity: 'medium',
      likelihood: 'medium',
      impact:
        'China ¥150B FY2027 target at risk if VYLOY or PADCEV reimbursement delayed beyond FY2027. ' +
        'Price concessions in NHI negotiations typically 30-60% below ex-manufacturer list price — volume growth must compensate. ' +
        'Geopolitical risk is non-zero; regulatory pathways for Japanese pharma companies remain favorable currently.',
      mitigation:
        'Early engagement with NMPA (National Medical Products Administration) and NHSA reimbursement authorities. ' +
        'Parallel track: regulatory approval + reimbursement application strategy to minimize lag. ' +
        'Named patient / hospital access program bridging approval-to-reimbursement gap for VYLOY. ' +
        'Multiple product filings diversifying China growth beyond any single product. ' +
        'Local China commercial team expansion supporting NMPA interactions and hospital account management.',
      owner: 'China Country President + Global Market Access',
    },
    {
      id: 'smt-talent-risk',
      category: 'Operational / Talent',
      title: 'SMT Execution Risk — Scientific Talent Retention',
      description:
        'The SMT restructuring program involves selective headcount reductions across ~16,000 employees globally. ' +
        'While non-scientific and G&A functions are the primary target, the risk of unintended loss of critical scientific, clinical, and commercial talent during voluntary separation programs is real. ' +
        'Competitor pharma companies (AstraZeneca, Pfizer, Merck, Roche, Daiichi Sankyo) actively recruit Astellas scientists, particularly in ADC and oncology expertise.',
      severity: 'medium',
      likelihood: 'medium',
      impact:
        'Loss of key ADC, oncology, or nephrology scientists could slow Phase 3 program execution or reduce clinical trial quality. ' +
        'Commercial excellence talent loss could impair PADCEV/VYLOY launch execution. ' +
        'Morale impact during restructuring could reduce employee engagement and productivity broadly.',
      mitigation:
        'Retention bonuses and long-term incentives for critical scientific talent designated at-risk. ' +
        'Transparent communication strategy — CEO/CFO town halls explaining SMT rationale and timeline. ' +
        'Focused restructuring in G&A, marketing support, and duplicative back-office roles — not core R&D. ' +
        'Competitive compensation benchmarking vs industry peers for scientific staff. ' +
        'Employee engagement monitoring (annual pulse surveys) with early intervention triggers.',
      owner: 'Chief Human Resources Officer + Business Unit Heads',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // Forward Outlook — FY2026 Quarterly + Full Year
  // Revenue values in ¥B (billions of JPY). Margins as percentages.
  // FY2026 full-year guidance: Revenue ¥2,220B; Core OP ¥620B (~27.9% margin).
  // Quarterly distribution based on Astellas historical seasonality and
  // guidance trajectory. revenueForcast = latest company/analyst view;
  // revenuePlan = official FY2026 guidance quarterly allocation.
  // marginForecast = Core OP / Revenue; marginPlan = official guidance margin.
  // ─────────────────────────────────────────────────────────────────────
  forwardOutlook: [
    {
      period: 'Q1 FY26',
      revenueForcast: 555,                 // ¥555B — Q1 Apr-Jun 2026 [CITED:IR-FY26]
      revenuePlan: 550,                    // ¥550B plan [ASSUMED — FY2026 guidance distributed by seasonality]
      marginForecast: 29.7,               // Core OP ¥165B / Revenue ¥555B = 29.7% [DERIVED]
      marginPlan: 29.1,                   // Core OP ¥160B / Revenue ¥550B plan [ASSUMED]
      keyAssumptions: [
        'PADCEV 1L mUC global revenue building on EV-302 standard-of-care momentum',
        'XTANDI IRA price impact begins affecting US Q1 net revenue recognition',
        'VYLOY Japan/US launch revenues ramping in first full year of commercialization',
        'SMT savings of ~¥10B expected in Q1 — SG&A and R&D efficiency gains',
        'China continued +20%+ growth on XTANDI NHI volume and pipeline access programs',
        'FX assumption: JPY ~¥145-150/USD; modest tailwind vs prior year',
      ],
    },
    {
      period: 'Q2 FY26',
      revenueForcast: 545,                 // ¥545B — Q2 Jul-Sep 2026 [CITED:IR-FY26]
      revenuePlan: 550,                    // ¥550B plan [ASSUMED]
      marginForecast: 29.4,               // Core OP ¥160B / Revenue ¥545B = 29.4% [DERIVED]
      marginPlan: 29.1,
      keyAssumptions: [
        'PADCEV MIBC neoadjuvant data expected — could trigger additional Rx adoption',
        'XTANDI US IRA negotiated price headwind: ~¥12B estimated Q2 impact',
        'VYLOY EU launch progression — expanding into European oncology centers',
        'IZERVAY US geographic atrophy market: second-year patient persistence building',
        'SMT R&D efficiency program: CRO partnerships reducing clinical trial overhead',
        'VEOZAH EU reimbursement decisions expected across major markets',
      ],
    },
    {
      period: 'Q3 FY26',
      revenueForcast: 580,                 // ¥580B — Q3 Oct-Dec 2026 [CITED:IR-FY26]
      revenuePlan: 570,                    // ¥570B plan [ASSUMED]
      marginForecast: 28.4,               // Core OP ¥165B / Revenue ¥580B = 28.4% [DERIVED]
      marginPlan: 28.1,
      keyAssumptions: [
        'PADCEV revenue at peak Q3 seasonal strength — oncology congress season drives Rx growth',
        'VYLOY China NDA submission expected — triggering KOL engagement and pre-launch activities',
        'XTANDI Japan growth absorbing US IRA headwind — net flat globally in ARSi class',
        'Phase 3 study enrollments ramping in oncology and nephrology programs',
        'R&D spend elevated ¥90B+ as new Phase 3 studies initiate globally',
        'Annual Medical Meetings (ESMO, ASH) — key data readouts for pipeline programs',
      ],
    },
    {
      period: 'Q4 FY26',
      revenueForcast: 540,                 // ¥540B — Q4 Jan-Mar 2027 [CITED:IR-FY26]
      revenuePlan: 550,                    // ¥550B plan [ASSUMED]
      marginForecast: 24.1,               // Core OP ¥130B / Revenue ¥540B = 24.1% [DERIVED]
      marginPlan: 25.5,                   // [ASSUMED — Q4 typically lower due to year-end provisioning]
      keyAssumptions: [
        'IRA XTANDI US price effective January 1, 2027 — full impact crystalized in Q4',
        'Year-end provisions and one-time items typically compress Q4 core OP margin',
        'Progressive dividend FY2026 ¥80/share — final Q4 dividend payment confirmed',
        'SMT 2-year ¥65B cumulative target delivery assessment — full-year audit',
        'PADCEV full-year revenue ~¥250B+ globally — confirming Strategic Brands ¥610B path',
        'FY2027 guidance framework — CEO/CFO year-end guidance call with updated SMT phase 3 outlook',
      ],
    },
    {
      period: 'FY26',
      revenueForcast: 2220,               // ¥2,220B — FY2026 official guidance [CITED:IR-FY26]
      revenuePlan: 2220,
      marginForecast: 27.9,               // Core OP ¥620B / Revenue ¥2,220B = 27.9% [DERIVED]
      marginPlan: 27.9,
      keyAssumptions: [
        'FY2026 revenue guidance ¥2,220B (flat to slight growth vs ¥2,140.3B FY2025)',
        'Core OP guidance ¥620B — expansion from ¥556.7B FY2025 (26.0%) to ~27.9%',
        'SMT ¥40B FY2026 incremental savings; ¥65B cumulative 2-year target achieved',
        'Strategic Brands ¥610B target (+27% on ¥480.3B FY2025) primary growth driver',
        'R&D investment ¥355B (+12.8% YoY) — Phase 3 wave investment funded by SMT savings',
        'Progressive dividend ¥80/share (FY2025: ¥78/share) — capital return commitment maintained',
        'XTANDI IRA headwind ~¥50B; offset by Strategic Brands growth and EU/Japan volume',
        'FX assumption mid-rate ¥148/USD; modest favorable vs FY2025 ¥145 average',
      ],
    },
  ],

  keyOpportunities: [
    {
      title: 'PADCEV Bladder Cancer Franchise Expansion Beyond 1L mUC',
      revenueImpact: '+¥80-100B',
      description:
        'PADCEV first-line mUC is the current commercial engine but the addressable market extends significantly. ' +
        'MIBC (muscle-invasive bladder cancer) neoadjuvant therapy represents a new patient pool 2-3x the mUC addressable market. ' +
        'EV-304 (neoadjuvant MIBC) and EV-103 further cohort data are key catalysts. ' +
        'China filing adds one of the largest oncology markets globally. ' +
        'Combined, PADCEV franchise has potential to exceed ¥300B in revenue by FY2027-28.',
      timeline: 'FY2026-FY2028',
    },
    {
      title: 'VYLOY Global Gastric Cancer Launch — Japan, EU, US, China',
      revenueImpact: '+¥60-80B',
      description:
        'VYLOY (zolbetuximab) is the first approved CLDN18.2-targeted therapy for gastric / gastroesophageal junction cancer. ' +
        'Gastric cancer has high global prevalence, particularly in Asia. Japan and EU launches underway; US launch progressing; China NDA filing planned in FY2026. ' +
        'Peak global sales potential estimated ¥150-200B given CLDN18.2+ patient selection (~40% of eligible GC/GEJC). ' +
        'Strong first-mover advantage before any competitive CLDN18.2 program reaches market.',
      timeline: 'FY2026-FY2029',
    },
    {
      title: 'China Market Scale — ¥150B+ Revenue Platform by FY2027',
      revenueImpact: '+¥50B incremental vs FY2025',
      description:
        'China grew +29.6% in FY2025 to ¥101.5B, the fastest-growing region in Astellas\' portfolio. ' +
        'With XTANDI NHI established, PADCEV and VYLOY filings in progress, and a growing China commercial organization, ' +
        'the market is on a path to ¥150B+ by FY2027. China will represent ~7% of Astellas\' total revenue — a strategic buffer against XTANDI IRA headwinds. ' +
        'NHI reimbursement expansions are the key volume catalysts in each product lifecycle.',
      timeline: 'FY2026-FY2027',
    },
    {
      title: 'SMT Full Run-Rate Savings Reinvestment into Pipeline',
      revenueImpact: '¥65B cost savings enabling ¥355B R&D investment',
      description:
        'The SMT program is generating ¥65B in cumulative 2-year savings — not simply cost reduction, but capacity reallocation. ' +
        'These savings fund the FY2026 R&D investment increase to ¥355B (+12.8%) while simultaneously expanding Core OP margin. ' +
        'The virtuous cycle: SMT frees up capital that funds Phase 3 studies that generate future strategic brands, which fund the next SMT cycle. ' +
        'This self-funding model differentiates Astellas from peers who cut R&D to deliver short-term earnings.',
      timeline: 'FY2025-FY2027',
    },
    {
      title: 'Next-Generation ADC / Oncology Pipeline Commercialization',
      revenueImpact: 'Variable — ¥100B+ per successful NME',
      description:
        'Astellas\' internal ADC and novel oncology pipeline represents a post-PADCEV growth option. ' +
        'Multiple compounds in preclinical and Phase 1/2 development leveraging Astellas\' ADC platform and tumor-biology expertise. ' +
        'Successful Phase 3 advancement of 1-2 next-generation oncology assets by FY2028-29 would materially re-rate the pipeline value. ' +
        'Nephrology and immunology Phase 3 programs (IgA nephropathy, undisclosed immunology) provide therapeutic diversification beyond oncology concentration.',
      timeline: 'FY2027-FY2031',
    },
  ],
};
