import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 23: Cost Driver Decomposition — Astellas Pharma Inc. (TYO: 4503 / OTC: ALPMY)
//
// ASTELLAS COST STRUCTURE (% of total revenue approximately, FY2025):
//   Cost of Sales:       ~19.1%  — drug manufacturing COGS; API procurement,
//     fill & finish, packaging, contract manufacturing (CMO/CDMO);
//     XTANDI royalties; specialty biologics COGS for PADCEV/IZERVAY
//   SG&A:                ~40.2%  — global sales force (US oncology, EU hospital,
//     Japan MR), medical affairs, brand marketing, G&A;
//     SMT transformation driving structural efficiency
//   R&D Expense:         ~14.7%  — Phase 3 clinical trials (XTANDI IRA pipeline,
//     PADCEV label expansion, VYLOY gastric cancer);
//     POC programs; regulatory; post-marketing studies
//   SMT Program Savings: ~-0.98% — Strategic Management Transformation savings
//     embedded within COGS/SG&A/R&D; ¥21B FY25 achieved; ¥40B FY26 target
//   FX Translation:      ~-1.8%  — USD/JPY and EUR/JPY translation impact on
//     overseas revenue/cost; ¥151/USD baseline; ±¥2.1B per ¥1 move
//   Amortization & D&A:  ~2.0%   — intangible amortization from Agios acquisition
//     (XOSPATA rights); PP&E depreciation; software & license amortization
//   Interest & Other:    ~1.5%   — net interest expense; royalty income/expense;
//     JV equity income; other non-operating items
//
// COVERAGE: 13 quarters × 7 cost lines × 1 segment (Consolidated) = 91 records
// Q1 FY24 → Q1 FY27 (actual through Q4 FY25; forecast Q1-Q4 FY26; projected Q1 FY27)
// Astellas fiscal year: April–March  (Q1 FY25 = Apr–Jun 2025)
//
// NARRATIVE ARC:
//   FY2024: Base year; XTANDI growth offsetting legacy product decline; SG&A
//     elevated from international commercial build-out; R&D ramping on Phase 3s
//   FY2025: Revenue +11.9% to ¥2,139.2B; PADCEV/IZERVAY/VYLOY scale-up
//     driving COGS mix shift; SMT delivering ¥21B; FX broadly favorable;
//     Core OP margin 26.0%
//   FY2026 (target ¥2,220B): XTANDI IRA price cut headwind (-¥9.6B per 1pp);
//     Strategic Brands ¥480.3B → ¥610B; SMT ¥40B; Core OP margin 27.9%
//   FY2027: VYLOY China ramp; POC pipeline readouts; SMT ¥65B cumulative;
//     PADCEV potential new indications; margin expansion toward 30%
// =============================================================================

interface QuarterMeta {
  label: string;
  revenue: number; // ¥M total revenue
}

const QUARTERS: QuarterMeta[] = [
  // FY24 — ¥1,913.0B full year (April 2023 – March 2024)
  { label: 'Q1 FY24', revenue: 494200 },
  { label: 'Q2 FY24', revenue: 484300 },
  { label: 'Q3 FY24', revenue: 480100 },
  { label: 'Q4 FY24', revenue: 454400 },

  // FY25 — ¥2,139.2B full year (April 2025 – March 2026)
  { label: 'Q1 FY25', revenue: 537900 },
  { label: 'Q2 FY25', revenue: 537000 },
  { label: 'Q3 FY25', revenue: 527100 },
  { label: 'Q4 FY25', revenue: 537200 },

  // FY26 — Q1 forecast ¥558B; Q2-Q4 guided targets (¥2,220B full year)
  { label: 'Q1 FY26', revenue: 558000 },
  { label: 'Q2 FY26', revenue: 545000 },
  { label: 'Q3 FY26', revenue: 578000 },
  { label: 'Q4 FY26', revenue: 539000 },

  // FY27 — projection (~¥2,350B full year; VYLOY China ramp + PADCEV expansion)
  { label: 'Q1 FY27', revenue: 572000 },
];

interface SubcategoryDef {
  costCategory: string;
  costSubcategory: string;
  pctOfRevenue: number[];        // 13 values, one per quarter
  budgetPctOfRevenue: number[];  // original plan/budget
  drivers: string[];             // 13 narrative drivers
}

function r1(n: number): number { return Math.round(n * 10) / 10; }
function r2(n: number): number { return Math.round(n * 100) / 100; }

const SUBCATEGORIES: SubcategoryDef[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // COST OF SALES — drug manufacturing COGS; ~19% of revenue
  // API procurement, CMO/CDMO fill & finish, royalty payments, specialty biologics
  // PADCEV/IZERVAY/VYLOY scale-up driving mix toward higher-cost biologics
  // XTANDI royalty to Pfizer remains a significant COGS component
  // ═══════════════════════════════════════════════════════════════════════════
  {
    costCategory: 'Cost of Sales',
    costSubcategory: 'Cost of Sales',
    // FY24 ~20% (pre-SMT, higher biologic COGS before volume scale)
    // FY25 ~19.1% (improving on XTANDI volume leverage and SMT manufacturing savings)
    // FY26 ~18.7% (further leverage as Strategic Brands volumes scale; CMO efficiencies)
    pctOfRevenue:       [20.2, 19.8, 19.5, 20.1, 19.4, 19.2, 18.9, 18.9, 18.7, 18.8, 18.5, 18.8, 18.5],
    budgetPctOfRevenue: [20.0, 19.6, 19.3, 19.8, 19.2, 19.0, 18.7, 18.7, 18.9, 18.9, 18.6, 18.9, 18.6],
    drivers: [
      'Q1 FY24: Cost of Sales ¥99.6B (20.2%); XTANDI API procurement and Pfizer royalty dominant; PADCEV external manufacturing ramp in US market adding CMO cost; generic erosion pressure on VESICARE/BETANIS legacy COGS offset by volume decline',
      'Q2 FY24: COGS ¥96.0B (19.8%); summer quarter seasonality — XTANDI refill volumes stable; IZERVAY NDA preparation costs reflected in regulatory COGS; ADC linker-payload manufacturing for PADCEV scaling with Seagen technology transfer',
      'Q3 FY24: COGS ¥93.6B (19.5%); PADCEV CMO production efficiency improving on higher batch runs; VYLOY (zolbetuximab) drug substance production ahead of Japan/Asia launch; XTANDI API unit cost flat on long-term Catalent supply agreement',
      'Q4 FY24: COGS ¥91.4B (20.1%); year-end true-up on CMO reconciliations; PADCEV ADC manufacturing step-up costs for label expansion batches; biologic cold-chain logistics cost elevated on global supply network expansion',
      'Q1 FY25: COGS ¥104.4B (19.4%); Strategic Brands revenue scaling faster than COGS — XTANDI royalty fixed-rate structure favorable; IZERVAY launch batch costs one-time; SMT manufacturing workstream delivering ¥2B+ COGS savings in Q1 FY25',
      'Q2 FY25: COGS ¥103.1B (19.2%); PADCEV +34.8% YoY revenue growth with improving ADC manufacturing yields reducing per-unit COGS; VYLOY EU/US launch batches partially expensed; XTANDI transfer price to co-promotion partner favorable',
      'Q3 FY25: COGS ¥99.6B (18.9%); SMT manufacturing efficiencies accelerating — CMO contract renegotiations delivering ¥1.2B savings in H1 FY25; biologic fill-finish in-house capability reducing external CMO spend; IZERVAY scale-up economics improving',
      'Q4 FY25: COGS ¥101.5B (18.9%); full-year FY25 COGS ¥408.4B (19.1% — at plan); PADCEV COGS improving on Seagen-technology ADC manufacturing maturation; SMT COGS workstream ¥7B cumulative savings embedded in FY25 actual',
      'Q1 FY26: COGS ¥104.3B (18.7%); Strategic Brands scale-up driving COGS leverage — PADCEV/IZERVAY blended COGS improving 150bps YoY; XTANDI IRA price cut (-¥9.6B per 1pp) modestly affecting royalty COGS structure; on plan',
      'Q2 FY26: COGS ¥102.5B (18.8%, est.); VYLOY China launch batches expensing into H1 FY26 COGS; PADCEV ADC manufacturing scale fully optimized; SMT COGS savings ¥4B+ in Q2 contributing to below-FY24 COGS ratio',
      'Q3 FY26: COGS ¥106.9B (18.5%, est.); Q3 revenue peak (¥578B) drives strong COGS leverage; biologic manufacturing utilization at capacity — favorable per-unit economics; new VYLOY indications adding volume with improving COGS absorption',
      'Q4 FY26: COGS ¥101.3B (18.8%, est.); full-year FY26 COGS targeting ¥415B (~18.7% on ¥2,220B revenue); SMT manufacturing workstream ¥12B cumulative FY26; PADCEV global supply chain optimization complete',
      'Q1 FY27: COGS ¥105.8B (18.5%, proj.); structural COGS improvement from biologic manufacturing scale and CMO efficiencies; VYLOY China volumes adding revenue with local manufacturing partnership improving COGS; PADCEV indication expansion fully absorbed into optimized ADC supply chain',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SG&A — global sales force, medical affairs, brand marketing, G&A
  // ~40% of revenue; largest cost category; SMT driving structural efficiency
  // US oncology specialists (XTANDI, PADCEV, IZERVAY), EU hospital-based sales,
  // Japan MR network, G&A overhead; Health100-equivalent is SMT program
  // ═══════════════════════════════════════════════════════════════════════════
  {
    costCategory: 'SG&A',
    costSubcategory: 'SG&A',
    // FY24 ~41-42% (pre-SMT; US commercial build-out for PADCEV/IZERVAY)
    // FY25 ~40.2% (SMT delivering; US oncology productivity improving)
    // FY26 ~39.5% (SMT ¥40B target; leverage on higher revenue base)
    pctOfRevenue:       [42.1, 41.5, 40.8, 42.2, 40.6, 40.3, 39.8, 40.1, 39.5, 39.8, 39.0, 39.3, 38.5],
    budgetPctOfRevenue: [41.8, 41.2, 40.5, 41.8, 40.3, 40.0, 39.5, 39.8, 39.7, 40.0, 39.2, 39.5, 38.7],
    drivers: [
      'Q1 FY24: SG&A ¥208.1B (42.1%); PADCEV US commercial ramp — additional oncology sales specialists hired ahead of urothelial cancer label expansion; IZERVAY NDA filing pre-launch preparation costs; EU hospital-based market access for VYLOY ahead of approval',
      'Q2 FY24: SG&A ¥201.1B (41.5%); US oncology detailing investment for XTANDI in early-stage prostate cancer (nmCRPC + nmHSPC); PADCEV physician education spend scaling; SMT program formally launched — initial organizational design announcements',
      'Q3 FY24: SG&A ¥195.9B (40.8%); Q3 seasonally lower marketing spend (Japan summer conference cycle minimal); SMT early savings emerging — corporate G&A headcount reduction in APAC support functions; EU medical affairs investment for VYLOY regulatory submission',
      'Q4 FY24: SG&A ¥191.7B (42.2%); year-end true-up on incentive compensation; IZERVAY US pre-launch speaker programs and medical education investment; SMT Phase 1 organizational restructuring charges (non-recurring) recognized; FY24 SG&A ¥796.8B (41.6%)',
      'Q1 FY25: SG&A ¥218.2B (40.6%); IZERVAY US commercial launch investment — direct-to-retina-specialist detailing and payer access programs; SMT SG&A savings ¥5B Q1 FY25 on track; corporate G&A reduction and shared services consolidation delivering early results',
      'Q2 FY25: SG&A ¥216.4B (40.3%); XTANDI co-promotion agreement optimization reducing net SG&A burden; PADCEV medical affairs efficiency — consolidated oncology medical education program reducing per-reach cost; SMT H1 FY25 savings ¥10B cumulative',
      'Q3 FY25: SG&A ¥209.8B (39.8%); Q3 strongest SMT delivery quarter — Japan MR productivity optimization and non-core geographic exits; VYLOY EU market access investment partially offset by legacy product SG&A reductions; US oncology detailing efficiency improving on higher rep productivity',
      'Q4 FY25: SG&A ¥215.9B (40.1%); FY25 SG&A ¥860.3B (40.2% — at plan); SMT SG&A component ¥14B FY25 cumulative; year-end compensation and talent investment in pipeline-critical roles; FY26 detailing build-out for VYLOY US launch preparation',
      'Q1 FY26: SG&A ¥220.4B (39.5%); SMT delivering ¥10B SG&A savings in Q1 FY26 (tracking toward ¥25B FY26 target); IZERVAY market share building above plan — sales efficiency improving vs. launch quarter; US oncology productivity metrics above target',
      'Q2 FY26: SG&A ¥216.9B (39.8%, est.); VYLOY US launch investment — ophthalmology/gastroenterology specialist expansion; XTANDI IRA risk awareness driving proactive managed care SG&A investment; SMT continuing to deliver corporate overhead reduction',
      'Q3 FY26: SG&A ¥225.4B (39.0%, est.); Q3 revenue leverage on strong Strategic Brands performance; SMT SG&A workstream ¥30B+ cumulative by Q3 FY26; PADCEV global medical affairs optimization; Japan NHI pricing negotiation cycle creating temporary SG&A variability',
      'Q4 FY26: SG&A ¥212.0B (39.3%, est.); full-year FY26 SG&A targeting ¥875B (~39.4% on ¥2,220B); SMT ¥40B target delivery confirmation; year-end compensation; FY27 China commercial expansion investment beginning',
      'Q1 FY27: SG&A ¥220.2B (38.5%, proj.); structural SG&A efficiency embedded from SMT; China commercial infrastructure generating SG&A leverage on ¥150B+ revenue target; VYLOY multiple indication commercial efficiency; XTANDI lifecycle management commercial efficiency',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // R&D EXPENSE — Phase 3 clinical trials, POC programs, regulatory costs
  // ~14.7% of revenue FY25; declining as % on revenue leverage but growing ¥B
  // Key investments: XTANDI label maintenance, PADCEV Phase 3s, VYLOY HER2+,
  // VEOZAH VMS, POC programs (oncology immuno-oncology combinations)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    costCategory: 'R&D Expense',
    costSubcategory: 'R&D Expense',
    // FY24 ~15.5-16% (elevated Phase 3 activity for PADCEV NMIBC, VYLOY)
    // FY25 ~14.7% (revenue leverage; PADCEV Phase 3s completing enrollment)
    // FY26 ~14.3% (POC portfolio expansion offset by completed Phase 3s)
    pctOfRevenue:       [16.2, 15.8, 15.4, 16.0, 15.1, 14.8, 14.5, 14.4, 14.2, 14.5, 14.1, 14.2, 14.0],
    budgetPctOfRevenue: [16.0, 15.6, 15.2, 15.8, 14.9, 14.6, 14.3, 14.2, 14.4, 14.6, 14.2, 14.4, 14.2],
    drivers: [
      'Q1 FY24: R&D ¥80.1B (16.2%); PADCEV NMIBC Phase 3 (JAVELIN Bladder Medley) peak enrollment cost; VYLOY gastric cancer pivotal GLOW trial completing enrollment; VEOZAH vasomotor symptoms Phase 3 completed — data readout preparation',
      'Q2 FY24: R&D ¥76.5B (15.8%); IZERVAY Phase 3 GATHER2 data readout preparation; XTANDI early-stage hormone-sensitive prostate cancer Phase 3 enrollment ongoing; POC oncology programs Phase 2 escalation for 2 novel IO combinations',
      'Q3 FY24: R&D ¥74.0B (15.4%); IZERVAY FDA advisory committee preparation costs; VYLOY NDA filing preparation in Japan; post-marketing studies for approved products; R&D headcount optimization from SMT program beginning to offset new program investment',
      'Q4 FY24: R&D ¥72.7B (16.0%); year-end true-up on clinical trial milestone accruals; PADCEV NMIBC Phase 3 data analysis costs; new Phase 2 POC program initiations for FY25 pipeline replenishment; FY24 R&D ¥303.3B (15.8%)',
      'Q1 FY25: R&D ¥81.2B (15.1%); IZERVAY US launch support studies; VYLOY Japanese approval and EU regulatory submission investment; XTANDI nmHSPC Phase 3 China bridging study enrollment; R&D revenue leverage improving as revenue outpaces new program initiation',
      'Q2 FY25: R&D ¥79.5B (14.8%); PADCEV NMIBC sNDA preparation and FDA submission costs; VEOZAH post-marketing bone density safety study; VYLOY HER2+ gastric cancer Phase 3 enrollment beginning; POC programs Phase 2 readouts generating pipeline clarity',
      'Q3 FY25: R&D ¥76.5B (14.5%); VYLOY EU Phase 3 complete — H2 FY25 regulatory submission costs; PADCEV NMIBC FDA review-related costs; SMT R&D efficiency workstream: shared global clinical operations infrastructure reducing cost per patient enrolled by 12%',
      'Q4 FY25: R&D ¥77.4B (14.4%); FY25 R&D ¥314.8B (14.7% — in line with guidance); XTANDI next-generation POC program initiating Phase 2; VYLOY China NDA preparation costs; full-year SMT R&D savings ¥3B+ on clinical operations efficiency',
      'Q1 FY26: R&D ¥79.2B (14.2%); VYLOY HER2+ Phase 3 China enrolment peak spend; PADCEV new indication Phase 3 (cervical cancer) mid-enrollment; SMT R&D workstream delivering; XTANDI IRA risk driving label protection research investment',
      'Q2 FY26: R&D ¥79.0B (14.5%, est.); VEOZAH bone density post-marketing study data readout; POC portfolio Phase 2 readouts — 2-3 programs expected to progress or discontinue; VYLOY EU label expansion studies; R&D investment discipline maintained at <15% guidance',
      'Q3 FY26: R&D ¥81.5B (14.1%, est.); Q3 revenue peak driving favorable R&D % leverage; PADCEV Phase 3 enrollment completions reducing per-quarter cash burn; XTANDI lifecycle clinical investment protecting IRA-era market position; new POC Phase 2 initiations',
      'Q4 FY26: R&D ¥76.5B (14.2%, est.); full-year FY26 R&D targeting ¥316B (~14.2% on ¥2,220B); SMT R&D efficiency cumulative ¥8B FY26; pipeline productivity metric (NPV per R&D dollar) improving on higher Phase 3 success rates',
      'Q1 FY27: R&D ¥80.1B (14.0%, proj.); structural R&D efficiency from SMT program embedded; PADCEV next-indication Phase 3 mid-enrollment; VYLOY multi-indication Phase 3 portfolio active; POC programs 5-7 active Phase 2 studies; R&D as % below 14% for first time',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SMT PROGRAM SAVINGS — Strategic Management Transformation
  // Negative % = cost reduction embedded in COGS/SG&A/R&D above
  // Shown separately for analytical transparency; ¥21B FY25, ¥40B FY26 target
  // FY27 target: ¥65B cumulative from FY25
  // ═══════════════════════════════════════════════════════════════════════════
  {
    costCategory: 'SMT Program Savings',
    costSubcategory: 'SMT Program Savings',
    // Negative values = favorable cost reduction; ¥21B FY25 = ~0.98% of revenue
    // FY24: early program ramp ~¥4B total (0.2-0.35% per quarter)
    // FY25: ¥21B total = ~¥5.25B/quarter = ~0.98% of ~¥534B avg quarterly revenue
    // FY26: ¥40B total = ~¥10B/quarter = ~1.82% of ~¥555B avg quarterly revenue
    pctOfRevenue:       [-0.20, -0.22, -0.25, -0.35, -0.95, -0.98, -1.00, -1.05, -1.72, -1.78, -1.82, -1.90, -2.20],
    budgetPctOfRevenue: [-0.18, -0.20, -0.22, -0.30, -0.90, -0.95, -0.98, -1.00, -1.70, -1.75, -1.80, -1.88, -2.15],
    drivers: [
      'Q1 FY24: SMT savings ¥1.0B (0.20% of revenue); program launch phase — organizational design assessment; early procurement quick-wins in Japan G&A and APAC shared services; management consulting firm engaged for transformation design',
      'Q2 FY24: SMT ¥1.1B (0.22%); procurement savings on IT vendor contracts and clinical trial CRO renegotiations; G&A headcount reduction in legacy product support functions; facility consolidation in EMEA — net 3 sites closed',
      'Q3 FY24: SMT ¥1.2B (0.25%); manufacturing efficiency workstream activated — CMO contract renegotiations underway; Japan MR route optimization reducing per-call cost; corporate real estate portfolio rationalization initiated',
      'Q4 FY24: SMT ¥1.6B (0.35%); Q4 acceleration as year-end efficiency measures implemented; total FY24 SMT savings ¥4.9B vs ¥5.0B target (98% achievement); SG&A workstream delivering largest contribution; R&D operations efficiency program contributing',
      'Q1 FY25: SMT ¥5.1B (0.95%); significant step-up — Phase 2 SMT initiatives active across all workstreams; global SG&A restructuring contributing ¥2.8B Q1; manufacturing efficiency ¥1.5B Q1; corporate G&A ¥0.8B Q1; all on plan',
      'Q2 FY25: SMT ¥5.3B (0.98%); H1 FY25 cumulative ¥10.4B — on track for ¥21B full-year target; Japan MR network optimization (15% productivity improvement) generating structural SG&A savings; R&D CRO consolidation delivering ¥0.9B quarterly savings',
      'Q3 FY25: SMT ¥5.3B (1.00%); Q3 SMT delivery consistent; APAC commercial operations consolidation generating savings ahead of plan; IT platform rationalization: 3 legacy ERP systems decommissioned reducing run-rate costs ¥0.4B/quarter; global procurement centralization delivering',
      'Q4 FY25: SMT ¥5.6B (1.05%); FY25 total SMT savings ¥21.0B — exactly on ¥21B full-year target; FY26 SMT plan approved at ¥40B with 3 new workstreams: digital detailing efficiency, supply chain network optimization, and R&D operations consolidation',
      'Q1 FY26: SMT ¥9.6B (1.72%); material step-up from FY25 as new FY26 workstreams activate; digital detailing replacing in-person for lower-value targets saving ¥3B Q1; supply chain savings ¥2.8B Q1; R&D operations ¥1.5B Q1; above Q1 plan of ¥9.4B',
      'Q2 FY26: SMT ¥9.7B (1.78%, est.); H1 FY26 ¥19.3B cumulative — on track for ¥40B full-year target; Japan MR digital transformation fully implemented; supply chain network optimization delivering CMO consolidation savings; corporate G&A target structure achieved',
      'Q3 FY26: SMT ¥10.5B (1.82%, est.); Q3 SMT delivery strongest of FY26 — all workstreams at full run-rate; cumulative FY26 savings ¥29.8B through Q3; digital commercial model generating above-plan SG&A savings; R&D clinical operations efficiency at target',
      'Q4 FY26: SMT ¥10.2B (1.90%, est.); FY26 total SMT savings ¥40.0B — meeting ¥40B target; cumulative FY25+FY26 savings ¥61B toward ¥65B cumulative target; FY27 SMT plan adds ¥25B incremental for ¥65B cumulative from FY25',
      'Q1 FY27: SMT ¥12.6B (2.20%, proj.); structural savings fully embedded; incremental FY27 programs target supply chain regionalization (China local manufacturing) and AI-enabled clinical trial design efficiency; SMT now a permanent efficiency culture vs. time-limited program',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FX TRANSLATION IMPACT — USD/JPY and EUR/JPY impact on P&L
  // Astellas: 80%+ revenues outside Japan; ¥151/USD baseline FY25
  // ±¥2.1B operating profit per ¥1 USD/JPY move
  // Tracked as % of revenue impact from FX vs. prior-year / vs. budget rate
  // ═══════════════════════════════════════════════════════════════════════════
  {
    costCategory: 'FX Translation Impact',
    costSubcategory: 'FX Translation Impact',
    // Positive % = FX headwind (yen appreciation reduces translated profit)
    // Negative % = FX tailwind (yen depreciation boosts translated profit)
    // FY24: yen weak (¥145-155/USD range) — tailwind for Astellas
    // FY25: ¥151/USD baseline — modest tailwind vs FY24 base
    // FY26: yen uncertainty; using conservative flat rate assumption
    pctOfRevenue:       [-1.8, -2.0, -1.5, -1.2, -1.8, -2.1, -1.5, -1.0, 0.5, 0.3, 0.2, 0.4, 0.8],
    budgetPctOfRevenue: [-1.5, -1.8, -1.3, -1.0, -1.6, -1.8, -1.3, -0.8, 0.2, 0.1, 0.0, 0.2, 0.5],
    drivers: [
      'Q1 FY24: FX tailwind ¥8.9B (1.8% of revenue); USD/JPY ~¥147 vs ¥132 prior year = significant translation gain on XTANDI/PADCEV US revenues; EUR/JPY also favorable; FX tailwind partially embedded in reported ¥/USD of overseas product revenues',
      'Q2 FY24: FX tailwind ¥9.7B (2.0%); Q2 USD/JPY ~¥155 peak — largest FX translation gain of FY24; XTANDI US quarterly revenue translated at above-baseline yen rate; Astellas FX sensitivity: ¥2.1B operating profit per ¥1 USD move confirmed',
      'Q3 FY24: FX tailwind ¥7.2B (1.5%); USD/JPY moderating toward ¥150 from Q2 peak; EUR/JPY favorable on European product revenues (XOSPATA, BETMIGA); FX hedging program limiting volatility — 60% of USD/EUR exposure hedged for 6-12 months',
      'Q4 FY24: FX tailwind ¥5.5B (1.2%); year-end FX rate ¥151/USD; full-year FY24 FX tailwind ¥31.3B — significant contributor to FY24 revenue growth; management note: FX impact excluded from Core OP guidance to improve transparency',
      'Q1 FY25: FX tailwind ¥9.7B (1.8%); FY25 budget rate ¥145/USD; actual rate ¥150/USD = ¥5 favorable vs. budget = ¥10.5B above-budget FX tailwind; USD strength vs budget is primary FX driver; Q1 FY25 FX impact within guidance corridor',
      'Q2 FY25: FX tailwind ¥11.3B (2.1%); Q2 FY25 peak FX tailwind — USD/JPY ~¥155+ during summer 2025; XTANDI and PADCEV US Q2 revenues benefit most from translation; above budget by ¥1.3B; management maintains budget rate ¥145 for rest of year guidance',
      'Q3 FY25: FX tailwind ¥7.9B (1.5%); USD/JPY moderated toward ¥150; FX benefit declining from Q2 peak; EUR/JPY modestly favorable for European revenues; hedging gains partially offsetting spot rate moderation; Core OP FX sensitivity confirmed at ¥2.1B per ¥1',
      'Q4 FY25: FX tailwind ¥5.4B (1.0%); year-end yen strengthened toward ¥149/USD — FX tailwind declining; full-year FY25 FX impact ~¥34.3B vs ¥145 budget rate; actual rate ¥151 vs ¥145 budget = ¥6 × ¥2.1B = ¥12.6B above-budget FX benefit embedded in FY25 results',
      'Q1 FY26: FX headwind ¥2.8B (0.5%); budget rate ¥150/USD; actual rate ~¥145/USD = ¥5 adverse vs. budget; yen strength in early FY26 from BOJ rate normalization; FX headwind partially offsetting Strategic Brands revenue growth; management flagged as risk to FY26 guidance',
      'Q2 FY26: FX headwind ¥1.6B (0.3%, est.); FX headwind moderating; USD/JPY stabilizing around ¥147-150 corridor; sensitivity guidance maintained at ¥2.1B per ¥1 USD move; hedging program at 60% cover protecting H2 FY26 from spot rate volatility',
      'Q3 FY26: FX headwind ¥1.2B (0.2%, est.); FX largely neutral vs. FY26 budget; Q3 USD/JPY near budget rate ¥150; EUR/JPY favorable offsets USD headwind; Core OP FX impact well within guidance range; no FX guidance revision needed',
      'Q4 FY26: FX headwind ¥2.2B (0.4%, est.); year-end yen modestly above ¥150 budget rate; full-year FY26 FX headwind approximately ¥7.8B vs. FY25 — headwind from comparative base (FY25 had large ¥34B tailwind); this comparative headwind embedded in Core OP margin target',
      'Q1 FY27: FX headwind ¥4.6B (0.8%, proj.); scenario: BOJ normalization continues; ¥140-145/USD potential represents material headwind vs. FY26 baseline; each ¥1 yen appreciation = -¥2.1B operating profit; FY27 planning rate ¥143 to reflect realistic scenario',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMORTIZATION & D&A — intangible amortization from acquisitions, PP&E
  // Astellas: XOSPATA (gilteritinib) rights from Agios, Kotobuki Pharmaceutical
  // manufacturing assets, software and clinical data platform investments
  // ~2% of revenue; moderately declining as older acquisitions amortize
  // ═══════════════════════════════════════════════════════════════════════════
  {
    costCategory: 'Amortization & D&A',
    costSubcategory: 'Amortization & D&A',
    // ~¥9-11B per quarter; ~2% of revenue
    pctOfRevenue:       [2.20, 2.10, 2.10, 2.20, 2.05, 2.00, 2.00, 1.95, 1.90, 1.88, 1.85, 1.88, 1.82],
    budgetPctOfRevenue: [2.18, 2.08, 2.08, 2.18, 2.02, 1.98, 1.98, 1.92, 1.92, 1.90, 1.87, 1.90, 1.84],
    drivers: [
      'Q1 FY24: Amortization ¥10.9B; XOSPATA intangible amortization from Agios collaboration rights (15-year schedule); Japanese manufacturing PP&E depreciation; SAP enterprise platform amortization following FY22 implementation; Kotobuki manufacturing JV PP&E',
      'Q2 FY24: Amortization ¥10.2B; stable quarterly; XOSPATA rights most significant intangible; PADCEV collaboration rights (Seagen) amortizing on 10-year schedule from FY22 agreement; PP&E for new Osaka R&D center beginning depreciation',
      'Q3 FY24: Amortization ¥10.1B; intangibles on schedule; VYLOY collaboration rights (Zymeworks licensing) beginning amortization on FDA approval filing; digital R&D platform investment entering amortization; stable quarter',
      'Q4 FY24: Amortization ¥10.0B; year-end intangible impairment review — no impairment indicators; FY24 total D&A ¥41.2B (2.2% of ¥1,913B revenue); legacy BETANIS intangibles approaching end of schedule — accelerating amortization',
      'Q1 FY25: Amortization ¥11.0B; step-up in D&A on VYLOY sNDA approval in Japan (amortization of ¥25B regulatory milestone payment); IZERVAY US launch amortization from FDA approval costs; XOSPATA schedule continuing; quarterly tracking to FY25 plan',
      'Q2 FY25: Amortization ¥10.7B; VYLOY and IZERVAY intangibles now in amortization run-rate; BETANIS legacy intangibles partially written off as product approaches LOE; net D&A stable quarter-on-quarter; non-cash item adds back to operating cash flow',
      'Q3 FY25: Amortization ¥10.5B; stable; Q3 seasonally lower capex conversion (Japan fiscal year midpoint); PP&E depreciation stable; clinical data management platform (CDM) amortization adding; XOSPATA intangibles declining per schedule toward FY30 completion',
      'Q4 FY25: Amortization ¥10.5B; FY25 total D&A ¥42.7B (2.0% of ¥2,139.2B); IZERVAY and VYLOY approval milestones amortizing in run-rate; intangible portfolio well-disclosed — investor note: D&A add-back to net income is ¥42.7B annually = material non-cash item',
      'Q1 FY26: Amortization ¥10.6B (1.90%); XOSPATA schedule continuing — approximately 8 years remaining; IZERVAY and VYLOY intangibles most recent additions; PP&E for VYLOY manufacturing scale-up beginning; new Tsukuba research campus PP&E entering depreciation',
      'Q2 FY26: Amortization ¥10.2B (1.88%, est.); gradual decline as older intangibles (BETANIS, VESICARE) approach end of amortization schedule; new intangibles (VYLOY HER2+ milestone) may partially offset; quarterly tracking in line with FY26 plan',
      'Q3 FY26: Amortization ¥10.7B (1.85%, est.); Q3 higher PP&E depreciation from capital investments earlier in year entering service; XOSPATA intangibles on declining schedule; cumulative D&A savings from legacy asset run-offs modestly improving metric',
      'Q4 FY26: Amortization ¥10.1B (1.88%, est.); full-year FY26 D&A ~¥41.5B — modestly below FY25 on legacy asset runoffs; FY27 guidance: further decline as BETANIS and VESICARE intangibles fully amortize in FY27; structural improvement visible',
      'Q1 FY27: Amortization ¥10.4B (1.82%, proj.); D&A trending structurally lower; BETANIS intangibles complete FY27 — ¥1.2B annual savings embedded; XOSPATA continues to FY30; new VYLOY HER2+ milestone amortization if approval received; net decline continues',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INTEREST & OTHER — net interest expense, JV equity income, royalties
  // ~1.5% of revenue; below Core OP line; net interest expense on yen bonds
  // XTANDI royalty income from co-promotion partner (Pfizer); JV income
  // ═══════════════════════════════════════════════════════════════════════════
  {
    costCategory: 'Interest & Other',
    costSubcategory: 'Interest & Other',
    // ~¥6-9B per quarter; ~1.3-1.7% of revenue
    pctOfRevenue:       [1.7, 1.5, 1.4, 1.8, 1.6, 1.5, 1.4, 1.7, 1.5, 1.4, 1.3, 1.5, 1.4],
    budgetPctOfRevenue: [1.6, 1.4, 1.3, 1.6, 1.5, 1.4, 1.3, 1.5, 1.4, 1.3, 1.2, 1.4, 1.3],
    drivers: [
      'Q1 FY24: Interest & Other ¥8.4B; net interest expense on ¥200B+ yen-denominated bond portfolio (avg 0.4% coupon — low-rate issuance era); JV equity income from Agios collaboration; XTANDI co-promotion economics providing royalty inflow; other financial income',
      'Q2 FY24: Interest & Other ¥7.3B; stable interest expense; BOJ interest rate environment beginning to shift — watching JGB yield impact on future bond refinancing; royalty income from Pfizer XTANDI co-promotion confirming above plan',
      'Q3 FY24: Interest & Other ¥6.7B; Q3 lower other income (JV distributions typically H2-weighted); interest income on cash and deposits modestly positive (BOJ rate lift to 0.1%); FX gains/losses below Core OP handled in FX Translation line',
      'Q4 FY24: Interest & Other ¥8.2B; year-end JV income from Agios and China JV distributions; bond maturity ¥30B refinanced at higher market rate (1.2% vs. 0.3% prior) — modest step-up in annual interest cost; FY24 total ¥30.6B (1.6%)',
      'Q1 FY25: Interest & Other ¥8.6B; BOJ rate normalization adding modest interest cost on floating-rate instruments; XTANDI Pfizer co-promotion fee revision effective Q1 FY25 — favorable structure change; China JV income growing as VYLOY approval approaches',
      'Q2 FY25: Interest & Other ¥8.1B; stable quarter; interest income on yen cash balances improving modestly (BOJ 0.25% rate); Pfizer XTANDI royalty income ahead of plan on strong US volumes; other income stable; Q2 below Q1 on lower JV distributions',
      'Q3 FY25: Interest & Other ¥7.4B; Q3 interest income improving (BOJ 0.5% rate effective Aug 2025); other income from technology licensing fees; XTANDI co-promotion economics stable; net interest expense on bonds ~¥4B/quarter at current portfolio',
      'Q4 FY25: Interest & Other ¥9.1B; year-end JV distributions from China JV (Astellas Pharma China); XTANDI milestone payment received from Pfizer on US volume threshold achievement; FY25 total ¥33.2B (1.55% of ¥2,139.2B); above plan on JV income',
      'Q1 FY26: Interest & Other ¥8.4B (1.5%); BOJ continuing rate normalization — interest income on cash improving; XTANDI US volume uncertainty from IRA affecting royalty income planning; China JV income growing on VYLOY approval; tracking to plan',
      'Q2 FY26: Interest & Other ¥7.6B (1.4%, est.); interest income continuing to improve on BOJ policy normalization; Pfizer co-promotion fee received on Q1 US XTANDI volumes; China JV equity income ¥1.5B as VYLOY launch accelerates; below-plan on IRA royalty uncertainty',
      'Q3 FY26: Interest & Other ¥7.5B (1.3%, est.); Q3 cleanest quarter — lower year-end adjustments; interest income benefiting from higher deposit rates; XTANDI IRA price cut monitoring — Pfizer royalty income recalibration in progress for FY27 planning',
      'Q4 FY26: Interest & Other ¥8.1B (1.5%, est.); full-year FY26 Interest & Other ~¥31.6B (~1.4%); China JV income ¥6B+ FY26 growing strongly; BOJ rate normalization fully reflected; FY27 guidance: interest income improvement from higher rates partially offsets potential IRA royalty impact',
      'Q1 FY27: Interest & Other ¥8.0B (1.4%, proj.); structural other income improvement from China JV scale; BOJ rate normalization improving deposit income; XTANDI IRA royalty structure renegotiation with Pfizer expected FY27 — outcome uncertain but management has flagged proactive engagement',
    ],
  },
];

// =============================================================================
// Main seed function
// =============================================================================

export async function seedCostDrivers(
  prisma: PrismaClient,
  companyId: number,
  allPeriods: Record<string, { id: number }>,
) {
  console.log('  Seeding Astellas Pharma cost drivers (13 quarters x 7 cost lines)...');

  const records: Array<{
    companyId: number;
    periodId: number;
    segment: string;
    costCategory: string;
    costSubcategory: string;
    amount: number;
    percentOfRevenue: number;
    budget: number;
    varianceToBudget: number;
    yoyChange: number;
    driver: string;
  }> = [];

  for (let qi = 0; qi < QUARTERS.length; qi++) {
    const q = QUARTERS[qi];
    const periodId = allPeriods[q.label]?.id;
    if (!periodId) {
      console.log(`  Skipping ${q.label} — not in periodMap`);
      continue;
    }

    // Revenue from prior year quarter (4 back)
    const priorYearRevenue = qi >= 4 ? QUARTERS[qi - 4].revenue : q.revenue * 0.90;

    for (const sub of SUBCATEGORIES) {
      const pct = sub.pctOfRevenue[qi];
      const budgetPct = sub.budgetPctOfRevenue[qi];
      const costAmount = r1(q.revenue * pct / 100);
      const planAmount = r1(q.revenue * budgetPct / 100);
      const variance = r1(costAmount - planAmount);
      const variancePct = r2(planAmount !== 0 ? (variance / Math.abs(planAmount)) * 100 : 0);

      const priorPct = sub.pctOfRevenue[qi >= 4 ? qi - 4 : qi];
      const priorYearAmount = r1(priorYearRevenue * priorPct / 100);
      const yoyChange = r1(costAmount - priorYearAmount);
      const yoyChangePct = r2(priorYearAmount !== 0 ? (yoyChange / Math.abs(priorYearAmount)) * 100 : 0);

      // Trend determination
      let trend: string;
      if (yoyChange > 0 && pct > budgetPct) {
        trend = 'unfavorable';
      } else if (yoyChange < 0 || pct < budgetPct) {
        trend = 'favorable';
      } else {
        trend = 'stable';
      }
      void trend; // used for future display logic

      // For forecast quarters (Q2-Q4 FY26, Q1 FY27), actual = plan (no actuals yet)
      const isForecast = qi >= 9; // Q2 FY26 onward
      const actualCostAmount = isForecast ? planAmount : costAmount;
      const actualVariance = isForecast ? 0 : variance;
      const actualVariancePct = isForecast ? 0 : variancePct;
      void actualVariancePct;
      const actualYoyChange = isForecast ? r1(planAmount - priorYearAmount) : yoyChange;
      const actualYoyChangePct = isForecast
        ? r2(priorYearAmount !== 0 ? (actualYoyChange / Math.abs(priorYearAmount)) * 100 : 0)
        : yoyChangePct;

      records.push({
        companyId,
        periodId,
        segment: 'Consolidated',
        costCategory: sub.costCategory,
        costSubcategory: sub.costSubcategory,
        amount: actualCostAmount,
        percentOfRevenue: isForecast ? budgetPct : pct,
        budget: planAmount,
        varianceToBudget: actualVariance,
        yoyChange: actualYoyChangePct,
        driver: sub.drivers[qi] ?? '',
      });
    }
  }

  if (records.length > 0) {
    // Insert in batches of 20 to avoid hitting Prisma limits
    const batchSize = 20;
    for (let i = 0; i < records.length; i += batchSize) {
      await prisma.costDriverDetail.createMany({
        data: records.slice(i, i + batchSize),
      });
    }
  }

  console.log(
    `  Seeded ${records.length} Astellas Pharma cost driver records ` +
    `(${QUARTERS.length} quarters x ${SUBCATEGORIES.length} cost lines)`,
  );
}
