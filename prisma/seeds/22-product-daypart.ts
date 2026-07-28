import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 22: Therapeutic Area Revenue Mix & Prescribing Occasion Profile
//
// Part 1 — ProductCategoryPerformance (Astellas Pharma Therapeutic Area Revenue Mix)
//   6 therapeutic areas x 3 channels (Direct/Commercial, Specialty/Oncology, Consolidated) x 11 quarters
//   Key narrative: Strategic Brands (PADCEV/XOSPATA) fastest growing; XTANDI dominant revenue driver;
//   VYLOY rapid ramp FY24-FY26 (NMPA/EMA approvals); Japan/Legacy declining (NHI price cuts).
//
// Part 2 — DaypartPerformance (Astellas Pharma Prescribing Occasion Profile)
//   4 prescribing occasion types x 2 channels (Direct/Commercial, Specialty/Oncology) x 11 quarters
//   Key narrative: Continuing/Maintenance dominates (XTANDI adherent patients);
//   Physician Referral/HCP-Driven growing fastest (PADCEV + VYLOY IV oncology);
//   New Patient Initiation accelerating with VEOZAH and IZERVAY launches.
//
// Quarters: Q1-Q4 FY24, Q1-Q4 FY25, Q1-Q3 FY26  (11 total)
// Astellas fiscal year: Q1=Apr-Jun, Q2=Jul-Sep, Q3=Oct-Dec, Q4=Jan-Mar
// Revenue in ¥M (millions of yen)
// =============================================================================

const ALL_QUARTERS = [
  'Q1 FY24', 'Q2 FY24', 'Q3 FY24', 'Q4 FY24',
  'Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25',
  'Q1 FY26', 'Q2 FY26', 'Q3 FY26',
];

// Astellas Pharma consolidated revenue (¥M) by quarter
const QUARTERLY_REVENUE: Record<string, number> = {
  'Q1 FY24': 494200, 'Q2 FY24': 484300, 'Q3 FY24': 480100, 'Q4 FY24': 454400,
  'Q1 FY25': 537900, 'Q2 FY25': 537000, 'Q3 FY25': 527100, 'Q4 FY25': 537200,
  'Q1 FY26': 558000, 'Q2 FY26': 562000, 'Q3 FY26': 572000,
};

// Direct/Commercial channel (~40% of revenue) — branded sales force, hospital direct, physician offices
// Specialty/Oncology Channel (~60% of revenue) — specialty pharmacy network, oncology specialty distribution
// Q1/Q4 seasonal shift: Q1 (Japan fiscal year start) and Q4 (China pre-LNY) see elevated specialty ordering
function channelShare(quarter: string): { retail: number; mail: number } {
  // Specialty/oncology channel slightly elevated Q1/Q4 (Japan annual specialty stocking; China pre-LNY)
  const q = ALL_QUARTERS.indexOf(quarter);
  const qNum = (q % 4) + 1;
  if (qNum === 1 || qNum === 4) return { retail: 0.38, mail: 0.62 };
  return { retail: 0.40, mail: 0.60 };
}

function qi(quarter: string): number {
  return ALL_QUARTERS.indexOf(quarter);
}

function lerp(startVal: number, endVal: number, q: number, maxQ: number = 10): number {
  return startVal + (endVal - startVal) * (q / maxQ);
}

function jitter(value: number, seed: number, magnitude: number = 0.008): number {
  const hash = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  const noise = (hash - Math.floor(hash)) * 2 - 1;
  return +(value * (1 + noise * magnitude)).toFixed(2);
}

// =============================================================================
// PART 1: Astellas Pharma Therapeutic Area Revenue Mix
// =============================================================================

interface DrugCategoryDef {
  name: string;
  retailMix: [number, number];       // % of Direct/Commercial channel revenue [start Q1 FY24, end Q3 FY26]
  mailMix: [number, number];         // % of Specialty/Oncology channel revenue
  retailYoY: [number, number];       // YoY revenue growth % — Direct/Commercial channel
  mailYoY: [number, number];         // YoY revenue growth % — Specialty/Oncology channel
  retailTicket: [number, number];    // avg revenue per patient-month — Direct channel (¥k)
  mailTicket: [number, number];      // avg revenue per patient-month — Specialty channel (¥k)
  retailGrossMargin: [number, number]; // Direct channel gross margin % (ex-R&D)
  mailGrossMargin: [number, number];   // Specialty channel gross margin % (ex-R&D)
  retailCustomization: [number, number] | null;  // % patients enrolled in Astellas support program (Direct)
  mailCustomization: [number, number] | null;    // % patients enrolled in Astellas support program (Specialty)
  retailUnitsPerTxn: [number, number] | null;    // treatment-months per dispense cycle (Direct)
  mailUnitsPerTxn: [number, number] | null;      // treatment-months per dispense cycle (Specialty)
}

const DRUG_CATEGORIES: DrugCategoryDef[] = [
  // 1. XTANDI / Oncology-Prostate — dominant revenue driver (~44.9% of revenue)
  //    Enzalutamide (prostate cancer; mCRPC + nmCRPC + mCSPC indications)
  //    IRA headwinds monitoring; specialty pharmacy dominant dispensing channel
  //    Pfizer co-promote in US; global royalties via Astellas license origination
  {
    name: 'XTANDI / Oncology-Prostate',
    retailMix: [38.0, 39.5],      // Direct channel: stable core (US oncology offices + hospital)
    mailMix: [46.0, 47.5],        // Specialty/Oncology channel dominant (oral onco specialty)
    retailYoY: [-3.0, 5.0],       // IRA headwinds early; modest recovery as certainty improves
    mailYoY: [-2.0, 5.0],         // Specialty channel: similar trajectory
    retailTicket: [850, 940],     // ¥k/patient-month; Direct channel (community oncology ASP)
    mailTicket: [1350, 1480],     // Specialty pharmacy 30-day XTANDI supply (higher ASP)
    retailGrossMargin: [71.0, 73.0], // High-margin branded oral oncology
    mailGrossMargin: [67.0, 69.0],   // Specialty channel slightly lower (distributor margin)
    retailCustomization: [55.0, 68.0], // Astellas patient support program — Direct channel enrollment
    mailCustomization: [72.0, 82.0],   // Astellas specialty support — Specialty channel enrollment
    retailUnitsPerTxn: [1.0, 1.0],    // 30-day monthly supply standard
    mailUnitsPerTxn: [1.0, 1.0],      // Specialty: 30-day supply for XTANDI clinical monitoring
  },
  // 2. Strategic Brands-Oncology — fastest growing established brands (~22.4% of revenue)
  //    PADCEV (enfortumab vedotin; bladder/urothelial cancer; co-develop with Seagen/Pfizer)
  //    XOSPATA (gilteritinib; FLT3+ AML; Astellas sole ownership)
  //    IV/injectable dominant; specialty pharmacy channel for home infusion
  {
    name: 'Strategic Brands-Oncology',
    retailMix: [4.5, 7.5],        // Direct (hospital/oncology center IV administration)
    mailMix: [28.0, 35.0],        // Specialty/Oncology dominant (IV biologics specialty distribution)
    retailYoY: [55.0, 28.0],      // Hypergrowth FY24 (new indications); normalizing FY26
    mailYoY: [60.0, 30.0],        // Specialty channel growing faster (broader distribution)
    retailTicket: [2200, 2600],   // IV drug per cycle/month equiv (hospital direct billing)
    mailTicket: [3800, 4200],     // Specialty billing ASP for IV oncology; higher net realization
    retailGrossMargin: [63.0, 66.0], // IV oncology branded gross margin
    mailGrossMargin: [58.0, 62.0],
    retailCustomization: [68.0, 80.0], // Astellas Oncology Connect patient support (PADCEV)
    mailCustomization: [78.0, 88.0],   // Specialty nurse navigator enrollment
    retailUnitsPerTxn: [0.8, 1.0],    // IV cycle frequency (every 3 weeks = ~1.3/month; blended ~0.8)
    mailUnitsPerTxn: [1.0, 1.0],
  },
  // 3. VYLOY / Gastric Cancer — launch-phase, rapidly ramping (~2.9% FY25; ~5% FY26)
  //    Zolbetuximab (CLDN18.2+ gastric/GEJ cancer); Astellas global rights
  //    NMPA China approval Q3 FY24; EMA EU approval FY25; Japan PMDA FY25
  //    IV monoclonal antibody; exclusively specialty/oncology channel distribution
  {
    name: 'VYLOY / Gastric Cancer',
    retailMix: [0.2, 1.0],        // Direct minimal (hospital direct only, small volumes)
    mailMix: [2.5, 6.5],          // Specialty/Oncology channel: primary distribution vehicle
    retailYoY: [100.0, 50.0],     // Hypergrowth from near-zero base; rapid launch trajectory
    mailYoY: [120.0, 60.0],       // Specialty channel launches faster with oncology networks
    retailTicket: [1800, 2000],   // Hospital IV billing per treatment cycle
    mailTicket: [3500, 3800],     // Specialty billing per treatment cycle (30-day equiv)
    retailGrossMargin: [62.0, 68.0], // Improving as manufacturing scales
    mailGrossMargin: [58.0, 64.0],
    retailCustomization: [60.0, 78.0], // Astellas GI Oncology patient support
    mailCustomization: [72.0, 85.0],
    retailUnitsPerTxn: [0.5, 1.0],    // IV Q3W infusion cycles
    mailUnitsPerTxn: [0.8, 1.0],
  },
  // 4. IZERVAY / VEOZAH — Specialty launches (~5.8% of revenue; growing)
  //    IZERVAY (avacincaptad pegol; geographic atrophy; intravitreal injection; ophthalmology)
  //    VEOZAH (fezolinetant; vasomotor symptoms/menopause; oral; primary care/OB-GYN)
  //    Two distinct patient populations; different channel profiles
  {
    name: 'IZERVAY / VEOZAH-Specialty',
    retailMix: [7.0, 10.5],       // Direct/Commercial: VEOZAH (oral; primary care prescription)
    mailMix: [2.8, 5.0],          // Specialty: IZERVAY (intravitreal injection; specialty pharmacy)
    retailYoY: [80.0, 35.0],      // Strong launch growth decelerating as market matures
    mailYoY: [90.0, 40.0],
    retailTicket: [650, 720],     // VEOZAH branded oral ASP; lower than oncology
    mailTicket: [980, 1100],      // IZERVAY intravitreal injection specialty billing
    retailGrossMargin: [68.0, 71.0], // Premium specialty branded gross margin
    mailGrossMargin: [64.0, 67.0],
    retailCustomization: [45.0, 60.0], // Astellas menopause support (VEOZAH)
    mailCustomization: [55.0, 70.0],   // Ophthalmology patient support (IZERVAY)
    retailUnitsPerTxn: [1.0, 1.0],    // Monthly oral (VEOZAH)
    mailUnitsPerTxn: [0.5, 0.5],      // Injection every 2 months (IZERVAY bimonthly)
  },
  // 5. Japan / Legacy Portfolio — mature domestic products (~16.3% of revenue; declining)
  //    Japan established products with NHI reimbursement; biennial price revisions
  //    Includes mature agents with limited global growth (patent expiry, generics)
  //    MR-driven direct channel dominates Japan; NHI April 2024 price cut ~7.5%
  {
    name: 'Japan / Legacy Portfolio',
    retailMix: [36.0, 28.0],      // Direct/Commercial (Japan MR field force) — declining share
    mailMix: [8.0, 5.5],          // Specialty/Oncology lower share for legacy Japan products
    retailYoY: [-2.0, -5.0],      // Declining: NHI price cuts + market maturation
    mailYoY: [-1.0, -3.0],
    retailTicket: [420, 390],     // NHI-regulated pricing; price erosion over time
    mailTicket: [680, 640],       // Specialty channel Japan; slight discount to direct
    retailGrossMargin: [52.0, 48.0], // Declining margins: NHI price cuts reducing gross spread
    mailGrossMargin: [48.0, 44.0],
    retailCustomization: [25.0, 28.0], // Patient adherence programs Japan (limited vs. Western mkt)
    mailCustomization: [20.0, 24.0],
    retailUnitsPerTxn: [1.0, 1.0],
    mailUnitsPerTxn: [1.0, 1.0],
  },
  // 6. Other International / Royalties — partnership revenues, royalties, milestones (~7.7%)
  //    Royalties: Pfizer pays Astellas royalties on XTANDI ex-US sales beyond certain threshold
  //    Astellas receives milestone/royalty revenue from out-licensed compounds
  //    International markets outside primary segments; partner-promoted products
  {
    name: 'Other International / Royalties',
    retailMix: [10.0, 9.5],       // Direct international (partner-promoted in smaller markets)
    mailMix: [7.0, 6.5],          // Royalty / milestone revenue (recorded in specialty channel)
    retailYoY: [1.0, 4.0],        // Stable; modest growth with international expansion
    mailYoY: [2.0, 5.0],          // Royalty milestones grow as XTANDI/PADCEV global penetrates
    retailTicket: [280, 310],     // Partner-promoted product ASP equivalent
    mailTicket: [450, 490],       // Royalty revenue per unit equivalent
    retailGrossMargin: [82.0, 84.0], // Very high gross margin for royalty/milestone income
    mailGrossMargin: [80.0, 82.0],
    retailCustomization: null,
    mailCustomization: null,
    retailUnitsPerTxn: null,
    mailUnitsPerTxn: null,
  },
];

function buildProductCategoryRecords(
  companyId: number,
  periodMap: Record<string, { id: number }>,
) {
  const records: Array<{
    companyId: number;
    periodId: number;
    category: string;
    segment: string;
    revenue: number;
    revenueYoY: number;
    mixPercent: number;
    mixChange: number;
    averageTicket: number;
    grossMarginPct: number;
    customizationRate: number | null;
    unitsPerTransaction: number | null;
  }> = [];

  const availableQuarters = ALL_QUARTERS.filter((q) => periodMap[q]);

  for (const quarter of availableQuarters) {
    const periodId = periodMap[quarter].id;
    const q = qi(quarter);
    const totalRev = QUARTERLY_REVENUE[quarter];
    const shares = channelShare(quarter);
    // All Astellas revenue is pharmaceutical — no pharmacy vs non-pharmacy split
    const pharmacyRev = totalRev * 1.0;
    const retailRev = pharmacyRev * shares.retail; // Direct/Commercial channel
    const mailRev = pharmacyRev * shares.mail;     // Specialty/Oncology channel
    const seed = q * 1000;

    for (let ci = 0; ci < DRUG_CATEGORIES.length; ci++) {
      const dc = DRUG_CATEGORIES[ci];

      // Direct / Commercial channel
      const rMixPct = lerp(dc.retailMix[0], dc.retailMix[1], q);
      const rCatRev = jitter(retailRev * rMixPct / 100, seed + ci * 100 + 1);
      const rYoY = +lerp(dc.retailYoY[0], dc.retailYoY[1], q).toFixed(1);
      const rTicket = +lerp(dc.retailTicket[0], dc.retailTicket[1], q).toFixed(2);
      const rGM = +lerp(dc.retailGrossMargin[0], dc.retailGrossMargin[1], q).toFixed(1);
      const rCustom = dc.retailCustomization
        ? +lerp(dc.retailCustomization[0], dc.retailCustomization[1], q).toFixed(1)
        : null;
      const rUnits = dc.retailUnitsPerTxn
        ? +lerp(dc.retailUnitsPerTxn[0], dc.retailUnitsPerTxn[1], q).toFixed(2)
        : null;

      const rMixPrev = q > 0 ? lerp(dc.retailMix[0], dc.retailMix[1], q - 4 < 0 ? 0 : q - 4) : dc.retailMix[0];
      const rMixChangeBps = +((rMixPct - rMixPrev) * 100).toFixed(0);

      records.push({
        companyId, periodId, category: dc.name, segment: 'Direct/Commercial',
        revenue: rCatRev, revenueYoY: rYoY, mixPercent: +rMixPct.toFixed(1),
        mixChange: rMixChangeBps, averageTicket: rTicket, grossMarginPct: rGM,
        customizationRate: rCustom, unitsPerTransaction: rUnits,
      });

      // Specialty / Oncology Channel
      const mMixPct = lerp(dc.mailMix[0], dc.mailMix[1], q);
      const mCatRev = jitter(mailRev * mMixPct / 100, seed + ci * 100 + 2);
      const mYoY = +lerp(dc.mailYoY[0], dc.mailYoY[1], q).toFixed(1);
      const mTicket = +lerp(dc.mailTicket[0], dc.mailTicket[1], q).toFixed(2);
      const mGM = +lerp(dc.mailGrossMargin[0], dc.mailGrossMargin[1], q).toFixed(1);
      const mCustom = dc.mailCustomization
        ? +lerp(dc.mailCustomization[0], dc.mailCustomization[1], q).toFixed(1)
        : null;
      const mUnits = dc.mailUnitsPerTxn
        ? +lerp(dc.mailUnitsPerTxn[0], dc.mailUnitsPerTxn[1], q).toFixed(2)
        : null;

      const mMixPrev = q > 0 ? lerp(dc.mailMix[0], dc.mailMix[1], q - 4 < 0 ? 0 : q - 4) : dc.mailMix[0];
      const mMixChangeBps = +((mMixPct - mMixPrev) * 100).toFixed(0);

      records.push({
        companyId, periodId, category: dc.name, segment: 'Specialty/Oncology Channel',
        revenue: mCatRev, revenueYoY: mYoY, mixPercent: +mMixPct.toFixed(1),
        mixChange: mMixChangeBps, averageTicket: mTicket, grossMarginPct: mGM,
        customizationRate: mCustom, unitsPerTransaction: mUnits,
      });

      // Consolidated (blend direct + specialty)
      const consRev = +(rCatRev + mCatRev).toFixed(2);
      const totalPharmRev = retailRev + mailRev;
      const consMixPct = totalPharmRev > 0 ? +(consRev / totalPharmRev * 100).toFixed(1) : 0;
      const rWt = retailRev / totalPharmRev;
      const mWt = mailRev / totalPharmRev;
      const consYoY = +(rWt * rYoY + mWt * mYoY).toFixed(1);
      const consTicket = +(rWt * rTicket + mWt * mTicket).toFixed(2);
      const consGM = +(rWt * rGM + mWt * mGM).toFixed(1);
      const consMixChange = +(rWt * rMixChangeBps + mWt * mMixChangeBps).toFixed(0);

      let consCustom: number | null = null;
      if (rCustom !== null && mCustom !== null) {
        consCustom = +(rWt * rCustom + mWt * mCustom).toFixed(1);
      } else if (rCustom !== null) {
        consCustom = rCustom;
      } else if (mCustom !== null) {
        consCustom = mCustom;
      }

      let consUnits: number | null = null;
      if (rUnits !== null) {
        consUnits = rUnits; // use direct channel supply cycle as primary metric
      }

      records.push({
        companyId, periodId, category: dc.name, segment: 'Consolidated',
        revenue: consRev, revenueYoY: consYoY, mixPercent: consMixPct,
        mixChange: +consMixChange, averageTicket: consTicket, grossMarginPct: consGM,
        customizationRate: consCustom, unitsPerTransaction: consUnits,
      });
    }
  }
  return records;
}

// =============================================================================
// PART 2: Astellas Pharma Prescribing Occasion Profile
// 4 oncology/pharma prescribing occasions x 2 channel segments x 11 quarters
// Direct/Commercial Channel = Astellas field force + hospital direct
// Specialty/Oncology Channel = specialty pharmacy network + oncology distribution
// =============================================================================

interface PrescribingOccasionDef {
  name: string;
  // Direct/Commercial Channel prescribing occasion metrics
  pcwTxnPct: [number, number];    // % of Direct channel patient treatment volume in this occasion
  pcwRevPct: [number, number];    // % of Direct channel revenue
  pcwCompSales: [number, number]; // YoY treatment growth % — Direct channel
  pcwTicket: [number, number];    // avg revenue per treatment (¥k) — Direct channel
  pcwLaborPct: [number, number];  // medical affairs / field force cost as % of segment revenue
  pcwThroughput: [number, number]; // patient initiations per field force FTE per quarter
  pcwFoodAttach: [number, number]; // % of patients enrolled in Astellas patient support program
  // Specialty/Oncology Channel metrics
  hssTxnPct: [number, number];
  hssRevPct: [number, number];
  hssCompSales: [number, number];
  hssTicket: [number, number];
  hssLaborPct: [number, number];
  hssThroughput: [number, number];
  hssFoodAttach: [number, number];
}

const PRESCRIBING_OCCASIONS: PrescribingOccasionDef[] = [
  // 1. New Patient Initiation — first prescription for Astellas therapies
  //    Driven by physician education, XTANDI new mCSPC indication, PADCEV bladder expansion
  //    Pipeline launches (VEOZAH, IZERVAY) add new initiation cohorts each quarter
  //    Requires HCP engagement, patient support program onboarding, PAP evaluation
  {
    name: 'New Patient Initiation',
    pcwTxnPct: [20.0, 22.5],     // ~20% of direct channel volume = new patient starts
    pcwRevPct: [25.0, 28.0],     // higher revenue share: new-starts often higher ASP (brand)
    pcwCompSales: [15.0, 22.0],  // new patient starts accelerating with pipeline launches
    pcwTicket: [950, 1050],      // ¥k/patient-month; new start often includes starter pack
    pcwLaborPct: [22.0, 20.5],   // HCP detailing + patient support onboarding = higher cost
    pcwThroughput: [8, 12],      // patient starts per field force FTE per quarter
    pcwFoodAttach: [55.0, 68.0], // Astellas patient support program enrollment at initiation
    hssTxnPct: [15.0, 18.0],    // Specialty channel: ~15% of specialty volume = new starts
    hssRevPct: [20.0, 24.5],
    hssCompSales: [18.0, 25.0],
    hssTicket: [1600, 1800],     // Specialty new start: higher ASP (IV oncology premium)
    hssLaborPct: [12.0, 11.0],
    hssThroughput: [280, 420],   // Specialty pharmacy new patient onboardings per quarter
    hssFoodAttach: [72.0, 82.0], // Specialty nurse navigator program enrollment
  },
  // 2. Continuing / Maintenance — largest category by volume; adherent patients
  //    XTANDI maintenance dominant (monthly refills; oral oncology high adherence)
  //    XOSPATA AML patients on ongoing maintenance protocol
  //    Specialty auto-supply for IV oncology (PADCEV every-3-week cycles tracked)
  {
    name: 'Continuing / Maintenance',
    pcwTxnPct: [46.0, 44.5],    // largest occasion type; declining slightly as new starts accelerate
    pcwRevPct: [50.0, 48.0],    // highest revenue share — sustained revenue base
    pcwCompSales: [3.0, 5.0],   // steady growth; adherent patient base expanding
    pcwTicket: [820, 900],       // maintenance ASP: branded oral oncology monthly supply
    pcwLaborPct: [12.0, 11.5],  // efficient: routine interactions; lower per-patient cost
    pcwThroughput: [45, 55],     // ongoing patients per field force FTE per quarter
    pcwFoodAttach: [48.0, 62.0], // adherence program: auto-refill + adherence coaching
    hssTxnPct: [58.0, 56.0],    // Specialty channel maintenance dominant (monthly supply)
    hssRevPct: [52.0, 50.0],
    hssCompSales: [4.0, 6.0],
    hssTicket: [1250, 1380],     // Specialty 30-day oral oncology supply; IV cycle billing
    hssLaborPct: [6.0, 5.5],    // Low per-patient specialty cost for established patients
    hssThroughput: [8500, 9500], // Specialty pharmacy high-volume ongoing supply throughput
    hssFoodAttach: [72.0, 82.0], // Auto-refill + digital adherence in specialty program
  },
  // 3. Physician Referral / HCP-Driven — oncologist specialist-initiated prescriptions
  //    Second opinion referrals; PADCEV (IV oncology; requires infusion center)
  //    VYLOY (gastric cancer; multidisciplinary tumor board referral driven)
  //    Tumor board consultations driving late-line therapy switches
  //    Fastest growing occasion type as PADCEV/VYLOY gain oncologist adoption
  {
    name: 'Physician Referral / HCP-Driven',
    pcwTxnPct: [21.0, 22.5],    // referral-driven: growing as PADCEV oncologist adoption widens
    pcwRevPct: [18.0, 21.0],    // High ASP per case (IV oncology; complex cases)
    pcwCompSales: [12.0, 22.0], // Driven by PADCEV + VYLOY adoption; tumor board expansions
    pcwTicket: [1800, 2100],     // IV oncology consultation + drug billing (hospital referral)
    pcwLaborPct: [28.0, 25.0],  // Medical science liaison + specialist support = high cost
    pcwThroughput: [3, 5],       // Few high-value specialist referrals per FTE (complex cases)
    pcwFoodAttach: [72.0, 85.0], // Specialist patients near-universal support enrollment
    hssTxnPct: [20.0, 21.5],    // Specialty channel: IV oncology referral dominant
    hssRevPct: [22.0, 24.0],
    hssCompSales: [14.0, 25.0],
    hssTicket: [2800, 3200],     // Specialty IV oncology: high ASP per cycle
    hssLaborPct: [14.0, 12.0],
    hssThroughput: [220, 300],   // Oncology infusion center referral throughput
    hssFoodAttach: [80.0, 90.0], // Oncology Connect specialist patient support
  },
  // 4. Compassionate Use / Trial Access — clinical access, expanded access, MSL-driven
  //    Expanded Access Programs (EAP) for pipeline drugs (pre-approval compassionate use)
  //    Named patient programs in markets before formal approval (International, China)
  //    VYLOY pre-NRDL compassionate use in China; pipeline Phase III run-in patients
  //    Small volume but critical for KOL relationship and pipeline data collection
  {
    name: 'Compassionate Use / Trial',
    pcwTxnPct: [13.0, 10.5],    // Declining share: formal launches replace EAP as products launch
    pcwRevPct: [7.0, 3.0],      // Low revenue % (EAP is often at cost or reduced price)
    pcwCompSales: [25.0, 42.0], // Growing in absolute terms as pipeline expands
    pcwTicket: [280, 320],       // EAP pricing: cost basis, significantly below commercial price
    pcwLaborPct: [32.0, 28.0],  // Medical safety + regulatory documentation = high FTE cost
    pcwThroughput: [2, 4],       // Very few EAP patients per FTE (documentation-intensive)
    pcwFoodAttach: [85.0, 92.0], // Near-universal support (EAP patients require close follow-up)
    hssTxnPct: [7.0, 4.5],      // Specialty compassionate use declining as products launch formally
    hssRevPct: [6.0, 1.5],
    hssCompSales: [20.0, 35.0],
    hssTicket: [480, 520],       // Named patient program pricing (above EAP but below commercial)
    hssLaborPct: [18.0, 14.0],
    hssThroughput: [80, 140],    // Named patient program specialty pharmacy throughput
    hssFoodAttach: [88.0, 95.0], // Full support program for named patient / compassionate use
  },
];

function buildDaypartRecords(
  companyId: number,
  periodMap: Record<string, { id: number }>,
) {
  const records: Array<{
    companyId: number;
    periodId: number;
    daypart: string;
    segment: string;
    transactionPct: number;
    revenuePct: number;
    compSales: number;
    averageTicket: number;
    laborCostPct: number;
    throughputMinutes: number | null;
    foodAttachRate: number | null;
  }> = [];

  const availableQuarters = ALL_QUARTERS.filter((q) => periodMap[q]);

  for (const quarter of availableQuarters) {
    const periodId = periodMap[quarter].id;
    const q = qi(quarter);
    const seed = q * 2000;

    for (let di = 0; di < PRESCRIBING_OCCASIONS.length; di++) {
      const po = PRESCRIBING_OCCASIONS[di];

      // Direct / Commercial Channel
      const pcwTxnPct = +lerp(po.pcwTxnPct[0], po.pcwTxnPct[1], q).toFixed(1);
      const pcwRevPct = +lerp(po.pcwRevPct[0], po.pcwRevPct[1], q).toFixed(1);
      const pcwComp = +lerp(po.pcwCompSales[0], po.pcwCompSales[1], q).toFixed(1);
      const pcwTicket = +lerp(po.pcwTicket[0], po.pcwTicket[1], q).toFixed(0);
      const pcwLabor = +lerp(po.pcwLaborPct[0], po.pcwLaborPct[1], q).toFixed(1);
      const pcwThru = +lerp(po.pcwThroughput[0], po.pcwThroughput[1], q).toFixed(0);
      const pcwAttach = +lerp(po.pcwFoodAttach[0], po.pcwFoodAttach[1], q).toFixed(1);

      records.push({
        companyId, periodId, daypart: po.name, segment: 'Direct/Commercial Channel',
        transactionPct: jitter(pcwTxnPct, seed + di * 50 + 1, 0.005),
        revenuePct: jitter(pcwRevPct, seed + di * 50 + 2, 0.005),
        compSales: pcwComp, averageTicket: +pcwTicket,
        laborCostPct: pcwLabor, throughputMinutes: +pcwThru, foodAttachRate: pcwAttach,
      });

      // Specialty / Oncology Channel
      const hssTxnPct = +lerp(po.hssTxnPct[0], po.hssTxnPct[1], q).toFixed(1);
      const hssRevPct = +lerp(po.hssRevPct[0], po.hssRevPct[1], q).toFixed(1);
      const hssComp = +lerp(po.hssCompSales[0], po.hssCompSales[1], q).toFixed(1);
      const hssTicket = +lerp(po.hssTicket[0], po.hssTicket[1], q).toFixed(0);
      const hssLabor = +lerp(po.hssLaborPct[0], po.hssLaborPct[1], q).toFixed(1);
      const hssThru = +lerp(po.hssThroughput[0], po.hssThroughput[1], q).toFixed(0);
      const hssAttach = +lerp(po.hssFoodAttach[0], po.hssFoodAttach[1], q).toFixed(1);

      records.push({
        companyId, periodId, daypart: po.name, segment: 'Specialty/Oncology Channel',
        transactionPct: jitter(hssTxnPct, seed + di * 50 + 3, 0.005),
        revenuePct: jitter(hssRevPct, seed + di * 50 + 4, 0.005),
        compSales: hssComp, averageTicket: +hssTicket,
        laborCostPct: hssLabor, throughputMinutes: +hssThru, foodAttachRate: hssAttach,
      });
    }
  }
  return records;
}

// =============================================================================
// Main seed function
// =============================================================================

export async function seedProductAndDaypart(
  prisma: PrismaClient,
  companyId: number,
  periodMap: Record<string, { id: number }>,
) {
  const productRecords = buildProductCategoryRecords(companyId, periodMap);
  if (productRecords.length > 0) {
    await prisma.productCategoryPerformance.createMany({ data: productRecords });
  }
  console.log(
    `Seeded ${productRecords.length} Astellas Pharma therapeutic area revenue records ` +
    `(${ALL_QUARTERS.filter((q) => periodMap[q]).length} quarters x 6 therapeutic areas x 3 segments)`,
  );

  const daypartRecords = buildDaypartRecords(companyId, periodMap);
  if (daypartRecords.length > 0) {
    await prisma.daypartPerformance.createMany({ data: daypartRecords });
  }
  console.log(
    `Seeded ${daypartRecords.length} Astellas Pharma prescribing occasion records ` +
    `(${ALL_QUARTERS.filter((q) => periodMap[q]).length} quarters x 4 occasion types x 2 channels)`,
  );
}
