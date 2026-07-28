import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 35: Labor Metrics — Astellas Pharma Inc. (TSE: 4503 / OTC: ALPMY) Workforce by Function
//
// 6 workforce functions × 5 quarters (Q1 FY25 through Q1 FY26) = 30 records
//
// Astellas global workforce: ~16,000 (declining from ~18,000 under SMT restructuring)
//   R&D Scientists & Clinical:         ~3,500  (22% of headcount; critical retention priority)
//   Commercial/Sales (incl. MSLs):     ~5,200  (32%; MSLs ~1,200; oncology field force key)
//   Manufacturing & Supply Chain:      ~2,400  (15%; ADC manufacturing ramp for PADCEV)
//   Medical Affairs / Regulatory:      ~1,800  (11%; expanding for PADCEV/VYLOY launches)
//   Corporate & G&A:                   ~2,100  (13%; declining under SMT SG&A optimization)
//   Japan Operations:                  ~6,000  (38% of global headcount; NHI/hospital focus)
//
// Key Workforce Themes FY25-FY26:
//   - SMT headcount optimization: net ~2,000 reductions from peak ~18,000 to ~16,000 target
//   - R&D scientist retention: critical amid biotech/pharma talent competition; target <8% attrition
//   - MSL (Medical Science Liaison) headcount: 1,200 globally; expanding for VYLOY launch
//   - Japan consolidation: ~400 positions eliminated in non-oncology commercial and admin
//   - Employee Engagement Score target: >75% (current ~72-74% during SMT restructuring)
// =============================================================================

export async function seedLaborMetrics(
    prisma: PrismaClient,
    companyId: number,
    allPeriods: Record<string, { id: number }>,
) {
    console.log('Seeding Astellas Pharma labor metrics by workforce function...');

    const quarters = ['Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25', 'Q1 FY26'];

    // Per-quarter arrays: [Q1 FY25, Q2 FY25, Q3 FY25, Q4 FY25, Q1 FY26]
    const workforceFunctions = [
        {
            // ~3,500 R&D scientists, clinical researchers, and drug development specialists
            // Highest-priority retention segment: pipeline value depends on scientific talent
            // R&D locations: Tokyo (Tsukuba), San Francisco Bay Area (South San Francisco),
            // Leiden (Netherlands), and external innovation partnerships
            // Compensation: competitive vs. biotech/Big Pharma; equity (RSU/PSU) program critical
            // for retention at Bay Area and EU sites where biotech competition is intense
            // SMT R&D efficiency: eliminating administrative overhead, not scientific headcount
            // Key hiring: ADC chemistry (PADCEV next-gen platform), CLDN18.2 biology, AI/drug discovery
            storeId: 'rd-scientists',
            storeLabel: 'R&D Scientists & Clinical Development',
            region: 'Global R&D (Japan, US, Netherlands)',
            // Slight headcount decline reflects SMT pre-clinical program rationalization
            // (4 programs discontinued FY25); offset by ADC platform and AI/computational hires
            headcount:       [3580, 3550, 3520, 3490, 3500],
            // Blended rate: PhD scientists ($110-145K equivalent), Clinical scientists ($90-120K),
            // Research associates ($65-85K); all converted to ¥M annual equivalent / 2080 hrs
            avgWageRate:     [78.5, 79.2, 79.8, 80.5, 81.2],
            // Voluntary attrition target <8%; current pressure from Bay Area biotech market
            // Q3 FY25 slight uptick: 2 Phase 1 program terminations created role uncertainty
            turnoverRate:    [7.2, 7.0, 8.1, 7.5, 7.8],
            // Hours per R&D FTE per quarter; salaried professionals; standard 40-hr week
            hoursPerStore:   [490, 485, 488, 492, 490],
            // R&D OT: limited overtime policy for salaried staff; some clinical operation spikes
            // Q4 FY25 elevated: FDA submission package preparation for XTANDI adjuvant sBLA
            overtimePct:     [4.2, 3.8, 4.5, 6.8, 5.2],
            // CME, therapeutic area training, GCP/GLP recertification, ADC platform upskilling
            // High training investment reflects need to build CLDN18.2 and ADC competencies
            trainingHours:   [35, 30, 32, 28, 38],
            // Highest engagement of any function — mission alignment with cancer treatment
            // Q3 FY25 dip from program terminations and uncertainty; Q1 FY26 recovery
            partnerSatisfaction: [78, 80, 74, 76, 78],
        },
        {
            // ~5,200 commercial/sales including MSLs, field oncology specialists (FOS),
            // market access, and regional commercial management
            // MSLs (~1,200 globally): critical for PADCEV/VYLOY clinical adoption in oncology
            // Field Oncology Specialists (FOS): 280 US-based; support community oncology
            // SMT impact: 380 US commercial positions eliminated (non-oncology/urology); MSLs maintained
            // Japan commercial: 180 positions eliminated in non-oncology therapeutic areas
            // Global commercial headcount declining modestly as efficiency per rep improves
            storeId: 'commercial-sales',
            storeLabel: 'Commercial / Sales (incl. MSLs & Market Access)',
            region: 'Global Commercial (US 38%, Japan 28%, EU 22%, Int\'l 12%)',
            headcount:       [5480, 5380, 5300, 5220, 5200],
            // MSLs at higher comp: $130-180K base (US) for clinical PhDs/PharmDs
            // Sales representatives: $80-110K base + incentive comp
            // Blended rate reflects mix shift toward higher-value MSL/FOS roles
            avgWageRate:     [52.5, 53.0, 53.5, 54.0, 54.5],
            // Commercial turnover elevated during SMT restructuring as roles eliminated
            // Q1 FY25 peak: US restructuring completed; turnover normalizing by Q4 FY25
            turnoverRate:    [14.2, 12.8, 11.5, 10.2, 9.8],
            hoursPerStore:   [480, 475, 478, 482, 480],
            // Congress season OT: ASCO (May/June = Q2 FY25), ESMO (September = Q2 FY25),
            // EAU (March = Q4 FY24/Q1 FY25), ASH (December = Q3 FY25)
            overtimePct:     [7.5, 12.8, 9.2, 6.5, 8.8],
            // MSL training: product knowledge, medical congress preparation, HCP engagement skills
            // VYLOY US launch training program: 8-hour MSL certification course Q2 FY25
            // FDA compliance training: PDMA regulations, off-label communication guidelines
            trainingHours:   [28, 35, 25, 22, 30],
            // Q3 FY25 improvement from ASCO success (PADCEV/VYLOY strong data presentations)
            // Q1 FY25 lower: US restructuring communication creating uncertainty
            partnerSatisfaction: [68, 72, 76, 74, 75],
        },
        {
            // ~2,400 manufacturing, quality assurance, and supply chain professionals
            // ADC manufacturing (PADCEV): Astellas owns cytotoxin synthesis capability in Japan
            // Japan manufacturing sites: Yaizu (injectable), Toyama (oral solid dose, VYLOY)
            // CMO management: dedicated team managing outsourced manufacturing partners
            // SMT manufacturing: 2 secondary packaging sites consolidated in EU; 1 Japan site
            // repurposed from legacy product to VYLOY manufacturing
            // Quality/regulatory: critical manufacturing support for FDA/PMDA/EMA GMP compliance
            storeId: 'manufacturing-supply',
            storeLabel: 'Manufacturing & Supply Chain',
            region: 'Japan (Yaizu, Toyama), EU (Ireland, Netherlands), US (CMO Management)',
            headcount:       [2480, 2450, 2420, 2400, 2410],
            // Manufacturing professionals: quality engineers, validation specialists, production chemists
            // Japan manufacturing wages lower than US/EU equivalents on absolute basis
            // Blended global rate includes both Japan site workers and US/EU quality professionals
            avgWageRate:     [38.5, 38.8, 39.2, 39.5, 39.8],
            // Manufacturing turnover low — specialized skills, stable employment culture (Japan)
            // Slight uptick during SMT site consolidation: EU secondary packaging site closures
            turnoverRate:    [5.8, 6.2, 7.5, 6.8, 5.5],
            hoursPerStore:   [488, 482, 490, 495, 488],
            // Manufacturing OT: PADCEV demand surge driving incremental production runs
            // Q4 FY25 elevated: VYLOY Japan launch batch manufacturing preparation
            overtimePct:     [6.2, 5.8, 6.5, 8.2, 6.8],
            // GMP training: mandatory annual requalification; VYLOY new product training
            // ADC safety training: PADCEV cytotoxic handling protocols at Japanese facilities
            trainingHours:   [30, 28, 32, 35, 32],
            // Stable satisfaction: clear mission, Japanese manufacturing culture, job security
            // Slight dip during SMT site consolidation transitions
            partnerSatisfaction: [74, 75, 72, 73, 76],
        },
        {
            // ~1,800 medical affairs, regulatory affairs, and pharmacovigilance professionals
            // Medical Affairs: MSL management, medical information, publications, HEOR
            // Regulatory: FDA/PMDA/EMA submissions team for PADCEV, VYLOY, XTANDI new indications
            // Pharmacovigilance: global safety database management, adverse event reporting
            // HEOR: outcomes research supporting reimbursement (NICE, HAS, AMNOG, CMS)
            // Growing function: PADCEV/VYLOY launches require expanded regulatory and PV resources
            // SMT impact: minimal — medical/regulatory is investment area, not SMT optimization target
            storeId: 'medical-regulatory',
            storeLabel: 'Medical Affairs & Regulatory (incl. Pharmacovigilance)',
            region: 'Global (US 40%, Japan 25%, EU 25%, Int\'l 10%)',
            // Headcount growing modestly to support 4 major product launches and 8 Phase 3 programs
            headcount:       [1720, 1755, 1780, 1800, 1820],
            // Medical directors and clinical pharmacologists: $160-200K (US); PhDs/MDs at premium
            // Regulatory specialists: $95-130K (US); multilingual EU regulatory staff at premium
            avgWageRate:     [68.5, 69.2, 69.8, 70.5, 71.2],
            // Low voluntary turnover: specialized regulatory expertise hard to replace;
            // FDA relationships and agency interaction experience highly valued
            turnoverRate:    [4.8, 4.5, 5.2, 4.8, 5.5],
            hoursPerStore:   [490, 485, 492, 495, 490],
            // Regulatory submission periods drive elevated OT: XTANDI sBLA (Q2 FY25),
            // VYLOY sNDA esophageal (Q1 FY25 filing), PADCEV MIBC preparation
            overtimePct:     [8.5, 12.5, 7.8, 9.2, 11.5],
            // Therapeutic area training, regulatory guidance updates (FDA guidance documents),
            // EMA benefit-risk framework, MHLW GRAS guidelines; ICH harmonization updates
            trainingHours:   [32, 28, 30, 28, 35],
            // High satisfaction: mission-critical work, strong professional development,
            // direct engagement with product lifecycle management
            partnerSatisfaction: [76, 78, 77, 79, 78],
        },
        {
            // ~2,100 corporate and G&A: finance, HR, legal, IT, strategy, corporate communications
            // Primary SMT SG&A target: shared services migration reducing headcount and cost
            // Finance: investor relations, management accounting, treasury, tax
            // Legal/IP: patent prosecution (XTANDI, PADCEV, VYLOY patents); litigation support
            // IT/Digital: enterprise systems, clinical data infrastructure, digital health
            // SMT shared services: Manila center (finance, HR transactional) replacing Japan G&A roles
            // Headcount declining toward ~1,800 by FY27 target under SMT
            storeId: 'corporate-admin',
            storeLabel: 'Corporate & Administrative (G&A)',
            region: 'Tokyo (HQ), Northbrook IL (US HQ), Leiden (EU HQ), Manila (Shared Services)',
            // Declining with SMT shared services migration and management layer reduction
            headcount:       [2280, 2220, 2180, 2150, 2100],
            // Tokyo HQ staff on Japanese compensation scale; US/EU C-suite on international scale
            // Blended rate reflects mix of high-cost US/EU leaders and transitioning Japan G&A staff
            avgWageRate:     [62.5, 63.0, 63.5, 64.0, 64.5],
            // Elevated turnover during SMT restructuring: voluntary exits from uncertainty;
            // some involuntary reduction (SMT role eliminations) reflected in headcount decline
            turnoverRate:    [9.8, 11.5, 10.2, 9.5, 8.8],
            hoursPerStore:   [490, 485, 488, 495, 492],
            // Q4 FY25 OT elevated: year-end close, annual securities filings (TSE, SEC 20-F),
            // FY26 budget cycle, SMT year-end review and target-setting
            overtimePct:     [8.8, 7.5, 8.2, 12.5, 11.8],
            // Leadership development, SMT change management, ESG reporting (TCFD, CDP),
            // cybersecurity awareness, GDPR/data privacy compliance
            trainingHours:   [25, 22, 24, 20, 28],
            // Lowest satisfaction during SMT: restructuring uncertainty, role eliminations,
            // office consolidations. Q1 FY26 stabilizing as restructuring nears completion
            partnerSatisfaction: [65, 62, 64, 66, 68],
        },
        {
            // ~6,000 Japan-based employees across all functions (largest single country)
            // Japan is 14% of revenue but 38% of headcount — reflects Japan manufacturing base,
            // NHI hospital sales force, and Tokyo corporate HQ concentration
            // Japan-specific themes: NHI biannual price revisions driving revenue headwind;
            // hospital sales force evolution toward medical information model (MSL-equivalent);
            // Japan Manufacturing (Yaizu, Toyama): VYLOY production ramp, XTANDI oral tablets
            // Japan headcount declining under SMT: ~400 role eliminations in non-oncology
            // commercial and administrative functions; manufacturing maintained
            storeId: 'japan-operations',
            storeLabel: 'Japan Operations (All Functions)',
            region: 'Japan — Tokyo (HQ), Yaizu (Manufacturing), Toyama (Manufacturing), Tsukuba (R&D)',
            // Gradual decline from SMT Japan commercial and admin restructuring
            headcount:       [6180, 6120, 6060, 6010, 5980],
            // Japan average wage rate in ¥M/hr equivalent; reflects Japanese salary norms
            // Japan minimum wage increases (Tokyo: ¥1,113/hr FY25, up 5.1% YoY) affecting
            // manufacturing and administrative roles; professional staff on annual salary basis
            avgWageRate:     [28.5, 28.8, 29.1, 29.4, 29.8],
            // Japanese pharmaceutical industry voluntary turnover historically low (~5-7%)
            // Slight elevation during SMT: structural reorganization creating role uncertainty
            turnoverRate:    [5.8, 6.2, 7.0, 6.5, 6.2],
            hoursPerStore:   [488, 482, 490, 492, 488],
            // Japan working hours: "work style reform" (hataraki-kata kaikaku) limiting OT
            // NHI launch seasons (October NHI listings, April revision) drive spikes
            overtimePct:     [5.2, 4.8, 5.5, 7.8, 6.2],
            // Japanese GMP training, NHI regulatory compliance, PMDA submission protocols,
            // Astellas Group global compliance training (anti-bribery, data privacy)
            trainingHours:   [28, 25, 27, 24, 30],
            // Japanese workplace culture: stability-seeking; satisfaction relatively stable
            // SMT communication challenge: Japanese employees value job security; messaging
            // on SMT as capability investment (not just cost-cutting) critical for engagement
            partnerSatisfaction: [72, 73, 71, 72, 73],
        },
    ];

    const records = [];
    for (const fn of workforceFunctions) {
        for (let qi = 0; qi < quarters.length; qi++) {
            const periodRecord = allPeriods[quarters[qi]];
            if (!periodRecord) continue;
            records.push({
                companyId,
                periodId: periodRecord.id,
                region: fn.region,
                avgWageRate: fn.avgWageRate[qi],
                turnoverRate: fn.turnoverRate[qi],
                hoursPerStore: fn.hoursPerStore[qi],
                overtimePct: fn.overtimePct[qi],
                trainingHours: fn.trainingHours[qi],
                partnerSatisfaction: fn.partnerSatisfaction[qi],
            });
        }
    }

    await prisma.laborMetric.createMany({ data: records });
    console.log(`  ✓ ${records.length} LaborMetric records seeded for Astellas Pharma`);
}
