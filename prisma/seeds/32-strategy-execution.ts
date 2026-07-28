import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed 32: Strategy Execution — Astellas Pharma Inc. (TSE: 4503 / OTC: ALPMY)
//
// 5 pillars × 4 KPIs × 3 quarters = 60 records
// Quarters: Q4 FY24, Q1 FY25, Q2 FY25
//
// Pillars:
//   1. XTANDI IRA Risk Management
//   2. Strategic Brands Acceleration (¥480.3B → ¥610B)
//   3. SMT Cost Transformation
//   4. China Market Expansion
//   5. R&D Pipeline Value Creation
// =============================================================================

export async function seedStrategyExecution(prisma: PrismaClient, companyId: number) {
    console.log('Seeding Astellas Pharma strategy execution KPIs...');

    type Status = 'on-track' | 'at-risk' | 'warning' | 'complete';

    interface StrategyKPI {
        pillar: string;
        kpiName: string;
        baseline: number;
        target: number;
        unit: string;
        quarters: Array<{
            quarterLabel: string;
            current: number;
            status: Status;
            commentary: string;
        }>;
    }

    const kpis: StrategyKPI[] = [

        // =====================================================================
        // PILLAR 1: XTANDI IRA Risk Management
        // =====================================================================
        {
            pillar: 'XTANDI IRA Risk Management',
            kpiName: 'IRA Negotiation Preparation Score (% readiness)',
            baseline: 45,
            target: 100,
            unit: '%',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 55,
                    status: 'on-track',
                    commentary: 'Astellas IRA negotiation readiness score 55% at Q4 FY24 baseline. The Inflation Reduction Act designates XTANDI (enzalutamide) as a subject drug for CMS Medicare Part D price negotiation, with negotiated price effective January 2026. Astellas has established a cross-functional IRA response team spanning commercial, regulatory affairs, health economics, legal, and government affairs. Key milestones: submission of initial data package to CMS, engagement of external health economics consultants, and initiation of payer communication strategy. Management has guided potential revenue impact of -¥50B+ from IRA pricing pressure in FY2026, with ¥9.6B sensitivity per 1 percentage point shift in effective negotiated discount.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 72,
                    status: 'on-track',
                    commentary: 'IRA preparation score advanced to 72% in Q1 FY25 as Astellas completed its formal response to CMS evidence package requests. The company submitted XTANDI health outcomes data, real-world evidence studies, and pharmacoeconomic analyses supporting XTANDI\'s clinical value in mCRPC, nmCSPC, and mCSPC indications. Parallel track: Astellas engaged with patient advocacy organizations (Prostate Cancer Foundation, ZERO) to provide CMS stakeholder testimony on patient access implications of aggressive price negotiation. Management has incorporated IRA scenario modeling into FY2026 guidance range; worst-case scenario (-¥80B) and base-case scenario (-¥50B) both factored into investor communications.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 88,
                    status: 'on-track',
                    commentary: 'IRA preparation score 88% in Q2 FY25; final negotiation position materials submitted to CMS. Astellas received CMS counteroffer and is in active negotiation phase. Internal modeling confirms ¥9.6B Core OP sensitivity per 1pp of effective price reduction versus pre-IRA levels. Commercial response strategy finalized: volume acceleration programs in non-Part D (commercial insurance, VA/DoD) markets to offset Part D volume impact. XTANDI lifecycle management — additional indications (muscle-invasive bladder cancer, adjuvant prostate) — being advanced to sustain revenue post-IRA. Final negotiated price expected to be published by CMS in September 2025 per statutory timeline.',
                },
            ],
        },
        {
            pillar: 'XTANDI IRA Risk Management',
            kpiName: 'XTANDI US Market Share (% of ARSi class)',
            baseline: 49.5,
            target: 52.0,
            unit: '%',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 49.5,
                    status: 'on-track',
                    commentary: 'XTANDI US market share 49.5% of androgen receptor signaling inhibitor (ARSi) class at Q4 FY24 baseline. XTANDI competes against darolutamide (Nubeqa, Bayer/Pfizer) and apalutamide (Erleada, J&J) in mCRPC and non-metastatic settings. XTANDI\'s multi-indication advantage (mCRPC, nmCRPC, mCSPC, nmCSPC — four approved indications across the prostate cancer treatment continuum) provides prescriber familiarity and formulary breadth that single-indication competitors cannot match. XTANDI FY24 global revenue ¥960.8B remains the company\'s largest product, representing 44.9% of group revenue.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 50.8,
                    status: 'on-track',
                    commentary: 'XTANDI US ARSi share increased to 50.8% in Q1 FY25, reflecting strength in the mCSPC indication following updated NCCN guideline preference and strong commercial execution. MSL field force engagement with community oncology practices — where 60%+ of prostate cancer treatment decisions are made — driving incremental share gains versus hospital-based competitors. IRA uncertainty has not yet impacted prescribing patterns; HCPs surveyed indicate patient access concerns have not changed prescribing as commercial/VA coverage remains unaffected. Q1 FY25 US XTANDI revenue ¥252.4B (+6.8% YoY in constant currency).',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 51.5,
                    status: 'on-track',
                    commentary: 'XTANDI US share 51.5% in Q2 FY25, approaching 52% target ahead of IRA implementation. Share gains driven by strong performance in nmCSPC and mCSPC settings where XTANDI has the most robust survival data. Proactive patient assistance programs for Part D enrollees — XTANDI Copay Assistance program expanded to cover cost-sharing under IRA redesigned Part D — supporting continuity of care and patient retention. Volume acceleration program in VA/DoD healthcare system contributing incremental scripts not subject to IRA negotiated pricing. Management confident 52% market share target achievable and sustainable post-IRA.',
                },
            ],
        },
        {
            pillar: 'XTANDI IRA Risk Management',
            kpiName: 'ARSi Competition Monitor — Competitor Class Share (%)',
            baseline: 38.2,
            target: 35.0,
            unit: '%',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 38.2,
                    status: 'warning',
                    commentary: 'Combined darolutamide (Nubeqa) + apalutamide (Erleada) ARSi class share 38.2% at Q4 FY24 — above the 35.0% competitive ceiling target. Nubeqa (darolutamide) gaining share in nmCRPC and mHSPC (ARANOTE trial data) following updated label. XTANDI and Nubeqa both have strong data in mHSPC, creating a competitive battleground in this fastest-growing prostate cancer segment. Apalutamide (Erleada) market share relatively stable at ~8% — primarily community oncology residual loyalty. Monitoring IRA-related formulary strategy: Nubeqa manufacturer (Bayer) not in FY2026 IRA negotiation cycle, creating potential formulary advantage window if payers prefer non-IRA-subject drugs.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 37.1,
                    status: 'warning',
                    commentary: 'Competitor ARSi share declined to 37.1% in Q1 FY25 as XTANDI mCSPC and nmCSPC volume accelerated. Nubeqa share growth moderating following XTANDI commercial response including updated clinical messaging on ARCHES and EMBARK trial superiority data. XTANDI\'s four-indication breadth remains a key competitive advantage versus Nubeqa\'s two approved indications. Payer formulary analysis confirms XTANDI maintains preferred or co-preferred status on >85% of commercial formularies. IRA risk remains: if CMS negotiates a >25% effective price reduction, Nubeqa formulary positioning could improve at XTANDI\'s expense starting January 2026.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 36.2,
                    status: 'on-track',
                    commentary: 'Competitor ARSi share 36.2% in Q2 FY25, trending toward 35.0% target. Astellas commercial execution — MSL engagement, medical education on multi-indication data, and expanded patient support programs — has improved XTANDI competitive positioning. XTANDI EU continued to gain share versus competitors in the European market where IRA does not apply; strong ESMO and EAU congress presentations in Q2 reinforcing clinical differentiation. Combined competitor share trajectory suggests 35.0% target achievable by Q3 FY25 absent IRA-driven formulary disruption.',
                },
            ],
        },
        {
            pillar: 'XTANDI IRA Risk Management',
            kpiName: 'XTANDI Volume Growth — Global (% YoY units)',
            baseline: 4.2,
            target: 3.0,
            unit: '%',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 4.2,
                    status: 'complete',
                    commentary: 'XTANDI global volume growth 4.2% YoY in Q4 FY24, exceeding the 3.0% minimum target. Volume growth driven by continued penetration in mCSPC (metastatic castration-sensitive prostate cancer) — the largest untreated patient segment. Japan and EU volume contributions growing as XTANDI becomes standard of care across all prostate cancer castration-sensitive stages. Note: reported revenue growth in yen exceeded volume growth due to FX tailwind from yen depreciation (¥151/USD FY25 average). FY25 XTANDI revenue guidance ¥960-980B; FY24 actual ¥960.8B.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 5.1,
                    status: 'complete',
                    commentary: 'XTANDI volume growth accelerated to 5.1% YoY in Q1 FY25, above 3.0% target. Volume acceleration driven by US mCSPC new patient starts following updated NCCN guidelines recommending ARSi combination for all mCSPC patients. International volume: EU XTANDI prescriptions +8.2% YoY as reimbursement in Tier 3 EU markets (Eastern Europe, Southern Europe) expands. China XTANDI volume +18.5% YoY as NRDL listing in prior year drives hospital penetration. Volume growth provides buffer against IRA price negotiation impact — higher volume can partially offset price reduction on revenue line.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 4.8,
                    status: 'complete',
                    commentary: 'XTANDI global volume growth 4.8% YoY in Q2 FY25, well above 3.0% minimum. Volume growth trajectory is critical to management\'s IRA mitigation strategy: absorbing IRA price impact through volume acceleration in non-IRA segments (commercial insurance, EU, Japan, China). US volume +3.2% YoY; ex-US volume +7.5% YoY reflecting faster growth in international markets. Japan NHI price revision (April 2025: -5.2%) partially offset by volume growth. Management modeling that +5% volume growth globally can offset approximately -15% US Part D price negotiation impact on total XTANDI revenue.',
                },
            ],
        },

        // =====================================================================
        // PILLAR 2: Strategic Brands Acceleration
        // =====================================================================
        {
            pillar: 'Strategic Brands Acceleration',
            kpiName: 'Strategic Brands Revenue (¥B quarterly)',
            baseline: 118.5,
            target: 152.5,
            unit: '¥B',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 118.5,
                    status: 'on-track',
                    commentary: 'Strategic Brands (PADCEV, IZERVAY, XOSPATA, VYLOY, VEOZAH) combined quarterly revenue ¥118.5B at Q4 FY24 baseline. These five products represent Astellas\'s next wave of revenue growth as the company reduces XTANDI concentration risk. PADCEV (enfortumab vedotin-ejfv, partnered with Seagen/Pfizer) is the largest contributor following first-line urothelial carcinoma FDA approval with pembrolizumab (EV+P combination). IZERVAY (avacincaptad pegol) launched for geographic atrophy in August 2023 — the first treatment approved for this leading cause of blindness. Target: ¥610B annual Strategic Brands revenue by FY2026 end, requiring ¥152.5B/quarter run-rate.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 132.8,
                    status: 'on-track',
                    commentary: 'Strategic Brands quarterly revenue ¥132.8B in Q1 FY25, +12.1% sequentially from Q4 FY24 baseline. PADCEV revenue ¥55.3B in the quarter (+42% YoY) as EV+P combination protocol adoption expands beyond academic centers to community oncology — 65% of urothelial carcinoma patients are now treated in community settings. IZERVAY new patient starts accelerating as ophthalmologist awareness and patient identification programs mature. VYLOY (zolbetuximab) received PMDA approval for gastric/GEJ cancer in Japan Q1 FY25, adding a significant new launch in the world\'s second-largest oncology market. VEOZAH (fezolinetant) US retail pharmacy adoption growing among gynecologists and primary care physicians.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 145.2,
                    status: 'on-track',
                    commentary: 'Strategic Brands quarterly revenue ¥145.2B in Q2 FY25, +9.3% sequentially, approaching ¥152.5B quarterly target. PADCEV ¥58.8B (+46% YoY) as EV+P becomes the dominant first-line standard of care for cisplatin-ineligible urothelial carcinoma; market penetration growing from 38% to 44% of eligible patients. VYLOY US launch initiated following FDA approval; gastric cancer HCP awareness campaigns driving initial prescriptions at NCI-designated cancer centers. IZERVAY ¥20.1B; Year 2 treatment continuation rates above forecast (72% vs. 65% expected). XOSPATA ¥18.2B in AML; VEOZAH ¥12.5B growing in women\'s health.',
                },
            ],
        },
        {
            pillar: 'Strategic Brands Acceleration',
            kpiName: 'PADCEV Market Share — 1L Urothelial Carcinoma (%)',
            baseline: 28.5,
            target: 38.0,
            unit: '%',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 28.5,
                    status: 'on-track',
                    commentary: 'PADCEV (enfortumab vedotin) first-line urothelial carcinoma (UC) market share 28.5% at Q4 FY24 baseline, following April 2024 FDA approval of EV+pembrolizumab combination. First-line UC was historically dominated by cisplatin-based chemotherapy; the EV+P combination demonstrated superior OS and PFS in ESNM33 trial across all comers including cisplatin-eligible patients. Competitive context: atezolizumab (Tecentriq, Roche) and pembrolizumab monotherapy are comparators, but EV+P combination has demonstrated statistically superior outcomes. Astellas co-promotes PADCEV in the US and EU with Pfizer (following Pfizer\'s acquisition of Seagen); co-promotion agreement ensures strong commercial reach and MSL support.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 34.2,
                    status: 'on-track',
                    commentary: 'PADCEV 1L UC market share 34.2% in Q1 FY25, +570bps from baseline in three quarters. Rapid adoption driven by NCCN Category 1 preferred recommendation for EV+P in cisplatin-ineligible patients and guideline inclusion for cisplatin-eligible as well. Academic medical centers (AMCs) reached >55% EV+P penetration; community oncology rising from 18% to 28% market share as MSL education programs expand. Japan PADCEV reimbursement secured Q4 FY24 with PMDA approval; Japanese hospital listing process underway for 1,200 oncology-capable hospitals. FY25 PADCEV global revenue guidance ¥220-240B; tracking ahead of guidance at ¥221.2B actual FY25.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 37.5,
                    status: 'on-track',
                    commentary: 'PADCEV 1L UC share 37.5% in Q2 FY25, approaching 38% target. Community oncology penetration the key growth driver — reaching the 60%+ of UC patients treated outside academic centers. Astellas field oncology specialist (FOS) program: 280 field-based oncology specialists supporting community oncologists with protocol implementation, patient identification (biomarker testing), and treatment planning. EV+P reimbursement secured across all major EU5 payers; European rollout accelerating. Bladder cancer tumor board program expanded to 320 community oncology sites, driving PADCEV adoption at point of treatment decision.',
                },
            ],
        },
        {
            pillar: 'Strategic Brands Acceleration',
            kpiName: 'VYLOY Penetration — Gastric Cancer 1L (%)',
            baseline: 3.5,
            target: 12.0,
            unit: '%',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 3.5,
                    status: 'on-track',
                    commentary: 'VYLOY (zolbetuximab) first-line gastric/GEJ cancer market penetration 3.5% at Q4 FY24 baseline, reflecting the early US launch phase (FDA approval August 2024). VYLOY targets CLDN18.2-positive gastric cancer — approximately 38% of gastric/GEJ adenocarcinoma patients are CLDN18.2-positive and eligible for VYLOY therapy. First-line gastric cancer in CLDN18.2+ patients: VYLOY + FOLFOX (SPOTLIGHT trial) and VYLOY + CAPOX (GLOW trial) both demonstrated OS benefit. Key launch barriers: CLDN18.2 biomarker testing is not yet standard-of-care; Astellas deploying tumor board programs and pathology lab partnerships to accelerate testing adoption. Japan approval (PMDA) received Q1 FY25.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 6.8,
                    status: 'on-track',
                    commentary: 'VYLOY 1L gastric penetration 6.8% in Q1 FY25, nearly doubling from Q4 FY24 baseline. Growth driven by CLDN18.2 testing uptake — partnerships with Foundation Medicine and Guardant Health to include CLDN18.2 IHC in standard comprehensive genomic profiling panels. VYLOY gastric cancer HCP awareness programs at ASCO 2025 (May) demonstrated strong conference engagement, with over 1,200 gastroenterologists and oncologists attending VYLOY-focused symposia. Japan reimbursement secured under NHI; hospital listing campaigns initiated at 580 Japan gastric cancer specialist centers. US Q1 FY25 VYLOY revenue ¥8.2B (early ramp); China NMPA approval anticipated Q4 FY25.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 9.5,
                    status: 'on-track',
                    commentary: 'VYLOY 1L gastric penetration 9.5% in Q2 FY25, tracking toward 12% target. CLDN18.2 testing rates at NCI-designated cancer centers now 68% (up from 32% at VYLOY launch), with community oncology testing at 28% and rising. US VYLOY quarterly revenue ¥14.5B; Japan launch contributing ¥5.8B in first full quarter. ESMO 2025 (September) SPOTLIGHT/GLOW long-term data presentations expected to reinforce OS benefit and drive additional guideline recognition. China NMPA approval received Q4 FY25; hospital formulary listing campaigns underway across 200 priority hospitals. Management raised VYLOY FY26 guidance to ¥90-100B.',
                },
            ],
        },
        {
            pillar: 'Strategic Brands Acceleration',
            kpiName: 'IZERVAY New Patient Starts (monthly, US)',
            baseline: 520,
            target: 800,
            unit: 'patients/month',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 520,
                    status: 'on-track',
                    commentary: 'IZERVAY (avacincaptad pegol) US monthly new patient starts 520 at Q4 FY24 baseline. IZERVAY is the second approved treatment for geographic atrophy (GA) — a progressive, blinding retinal disease affecting ~1M Americans — following pegcetacoplan (Syfovre, Apellis). IZERVAY monthly intravitreal injections administered by retinal specialists; addressable patient population estimated 160,000 treatment-eligible GA patients in the US. Key adoption drivers: retinal specialist education on patient selection criteria, injection training programs, and insurance coverage/prior authorization support. Phase 3 GATHER1/GATHER2 data demonstrated 14-36% reduction in GA progression rate versus sham. Competitive positioning vs. Syfovre: monthly vs. monthly/bimonthly dosing differentiation and different complement pathway mechanisms (C5 vs C3 inhibition).',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 648,
                    status: 'on-track',
                    commentary: 'IZERVAY monthly new patient starts 648 in Q1 FY25, +24.6% from baseline. Growth driven by expanded retinal specialist access — now available at 2,850 retinal specialty practices (up from 2,200 at launch). Year 2 treatment continuation rates better than expected: 72% of Year 1 patients continuing therapy (vs. 65% forecast), reflecting patient satisfaction with injection experience and visual acuity stability. Insurance coverage improving: 88% of commercial plans and 92% of Medicare Part B fee schedules covering IZERVAY. IZERVAY Q1 FY25 revenue ¥19.5B (+8% sequentially); annual run-rate ~¥78B.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 748,
                    status: 'on-track',
                    commentary: 'IZERVAY monthly new patient starts 748 in Q2 FY25, approaching 800 target. Patient identification programs — genetic testing for complement pathway risk factors, retinal photography screening at community optometry practices — driving patient funnel. Referral pathways from optometrists to retinal specialists strengthened through Astellas GA awareness campaign reaching 8,500 US optometry practices. New IZERVAY data at ASRS 2025 (July): long-term GATHER extension data confirming sustained benefit through 36 months strengthening physician confidence in long-term value. 800 monthly new patient start target expected achieved by Q3 FY25 based on current trajectory.',
                },
            ],
        },

        // =====================================================================
        // PILLAR 3: SMT Cost Transformation
        // =====================================================================
        {
            pillar: 'SMT Cost Transformation',
            kpiName: 'SMT Savings YTD (¥B cumulative, FY2026 target ¥40B)',
            baseline: 0,
            target: 40.0,
            unit: '¥B',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 8.5,
                    status: 'on-track',
                    commentary: 'Sustainable Margin Transformation (SMT) program delivered ¥8.5B cumulative savings through Q4 FY24 as the first full year of execution. SMT is Astellas\'s structural cost transformation initiative targeting ¥65B cumulative savings by FY2027 (¥21B FY25, ¥40B FY26). FY24 savings driven by: SG&A streamlining (consolidated regional commercial organizations), manufacturing footprint rationalization (site consolidation in Japan and EU), and R&D portfolio prioritization (terminated 4 pre-clinical programs). Headcount reduction: ~2,200 positions eliminated from peak ~18,000 toward ~16,000 target, predominantly in non-core commercial markets and administrative functions. SMT FY26 annualized run-rate ¥40B provides Core OP margin expansion from 24.7% (FY24) toward 27.9% target.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 13.8,
                    status: 'on-track',
                    commentary: 'SMT cumulative savings ¥13.8B through Q1 FY25, tracking toward ¥21B FY25 target. Q1 FY25 incremental savings ¥5.3B: manufacturing efficiency (ADC process optimization at PADCEV production facilities), procurement transformation (API supplier consolidation), and SG&A reduction (shared services migration for finance, HR, and legal functions). SMT organizational structure: dedicated program office with quarterly CEO review and function-level accountability metrics. Key Q1 milestone: Japan head office consolidation completed, reducing Japan G&A by ¥2.1B annualized. Next major milestone: US commercial organization restructuring (Q2 FY25) targeting ¥4.8B annualized SG&A reduction while preserving oncology field force capabilities.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 19.2,
                    status: 'on-track',
                    commentary: 'SMT cumulative savings ¥19.2B through Q2 FY25; on track to achieve ¥21B FY25 target. Q2 FY25 incremental ¥5.4B includes US commercial restructuring (¥3.2B annualized), manufacturing site consolidation completion at two European secondary packaging facilities (¥1.1B annualized), and digital/IT procurement savings (¥1.1B). SMT initiatives have reduced core SG&A as percentage of revenue from 38.5% (FY24) to 37.2% (Q2 FY25) — significant progress toward <39% target. Astellas confirmed ¥21B FY25 achievement at Q2 FY25 earnings; FY26 target raised confidence with ¥40B cumulative confirmed as "deliverable with high confidence" by CFO Masafumi Nogimori.',
                },
            ],
        },
        {
            pillar: 'SMT Cost Transformation',
            kpiName: 'Core Operating Profit Margin (%)',
            baseline: 24.7,
            target: 27.9,
            unit: '%',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 24.7,
                    status: 'on-track',
                    commentary: 'Core OP margin 24.7% at FY24 baseline, representing the starting point for SMT-driven margin expansion. Core OP margin was constrained by elevated R&D spend (¥285B, 13.3% of revenue), SG&A investment ahead of PADCEV and VYLOY launches, and manufacturing cost inflation. FY25 target 26.0% and FY26 target 27.9% represent a 320bps cumulative expansion — one of the largest pharmaceutical margin expansion programs in the industry. Astellas has committed to this margin trajectory in long-term financial targets disclosed at February 2024 R&D Day and reaffirmed at May 2024 earnings. Key enablers: SMT savings (¥40B FY26), revenue mix shift toward higher-margin specialty products, and PADCEV/VYLOY launch leverage on existing infrastructure.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 25.4,
                    status: 'on-track',
                    commentary: 'Core OP margin 25.4% in Q1 FY25, +70bps from FY24 baseline. Margin improvement driven by revenue growth (+12.8% YoY in Q1 FY25) outpacing cost growth, with SMT savings flowing through P&L. PADCEV rapid revenue ramp contributing high-margin incremental revenue — PADCEV gross margin approximately 75% given favorable manufacturing scale-up at Pfizer ADC facilities. SG&A ratio 37.8% in Q1 FY25 vs. 39.2% in Q1 FY24 — favorable. COGS ratio 17.2% in Q1 FY25 vs. 18.1% in Q1 FY24 — favorable from mix improvement. R&D spend maintained at ¥70-72B/quarter as pipeline investment continues; management committed to maintaining R&D intensity while expanding margin through operating leverage.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 26.2,
                    status: 'on-track',
                    commentary: 'Core OP margin 26.2% in Q2 FY25, exceeding 26.0% FY25 annual target by mid-year — indicating stronger than expected margin progression. Q2 FY25 Core OP ¥145.8B on revenue ¥556.8B. SMT savings in COGS (manufacturing efficiency, procurement) and SG&A (US restructuring, shared services) both tracking ahead of plan. FX tailwind (¥151.8/USD Q2 average vs. ¥143.5 prior year) contributing approximately ¥5.2B incremental Core OP. Management raised FY25 Core OP guidance at Q2 earnings: revised Core OP target ¥555-560B (vs. ¥545B original). FY26 27.9% target increasingly achievable given Q2 trajectory and ¥40B SMT FY26 commitment.',
                },
            ],
        },
        {
            pillar: 'SMT Cost Transformation',
            kpiName: 'SG&A as % of Revenue',
            baseline: 39.2,
            target: 37.5,
            unit: '%',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 39.2,
                    status: 'on-track',
                    commentary: 'SG&A as % of revenue 39.2% at FY24 baseline. Astellas carries a relatively high SG&A ratio reflecting: (1) global commercial infrastructure for 40+ product lines across 47 countries; (2) MSL field force build-out for PADCEV and VYLOY launches; (3) legacy commercial presence in non-strategic markets targeted for SMT rationalization. SMT commercial transformation initiatives: consolidation of country commercial organizations from 40 to 30 markets with Astellas direct presence, partnership/distributor model for remaining markets. Estimated SG&A reduction from commercial footprint optimization: ¥12B annualized by FY26.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 37.8,
                    status: 'on-track',
                    commentary: 'SG&A ratio 37.8% in Q1 FY25, -140bps from baseline. US commercial restructuring (completed Q1 FY25) eliminated 380 commercial positions while maintaining oncology field force and MSL headcount. Japan commercial organization: 180 positions eliminated in non-oncology/urology therapeutic areas. Shared services migration (HR, legal, finance to Manila and Krakow centers): estimated ¥3.5B annualized SG&A reduction at full implementation by Q4 FY25. Revenue growth denominator effect: +12.8% revenue growth with flat-to-declining SG&A spend creates favorable ratio compression. SG&A target 37.5% achievable by FY26 exit rate.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 37.2,
                    status: 'on-track',
                    commentary: 'SG&A ratio 37.2% in Q2 FY25, already below 37.5% target. Q2 FY25 SG&A ¥207.1B on revenue ¥556.8B. US commercial restructuring and Japan consolidation both delivering savings on schedule. Shared services migration on track: Manila center handling 65% of planned transaction volumes, Krakow 45%. Marketing spend rationalization: digital-first promotional strategies for VEOZAH and IZERVAY reducing per-patient promotional cost by 22% vs. traditional detailing. On current trajectory, SG&A ratio could reach 36.5% by FY26 exit — below target, providing additional margin upside. Management cautioned that VYLOY US launch ramp will require incremental SG&A investment in H2 FY25.',
                },
            ],
        },
        {
            pillar: 'SMT Cost Transformation',
            kpiName: 'COGS as % of Revenue',
            baseline: 18.1,
            target: 17.5,
            unit: '%',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 18.1,
                    status: 'on-track',
                    commentary: 'COGS ratio 18.1% at FY24 baseline. Astellas COGS is driven by: ADC manufacturing (PADCEV enfortumab vedotin ADC linker-payload complexity), API procurement for XTANDI (synthetic organic process, largely outsourced), biologics manufacturing for IZERVAY, and Japan-market COGS for branded hospital products. COGS ratio improvement target 17.5% requires: (1) manufacturing scale efficiencies as PADCEV volumes increase; (2) ADC process optimization reducing cost per batch; (3) API procurement savings through dual-source supplier programs; (4) Japan manufacturing rationalization under SMT. CMO (contract manufacturing organization) relationships being optimized under SMT procurement transformation.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 17.2,
                    status: 'complete',
                    commentary: 'COGS ratio 17.2% in Q1 FY25, already below 17.5% target — ahead of FY26 plan. Favorable drivers: PADCEV manufacturing scale-up achieving economies of scale as batch sizes increase with volume ramp; XTANDI API procurement savings from renegotiated long-term supply agreements (3-year contracts at fixed-price); product mix shift toward PADCEV (higher gross margin than legacy products). Japan COGS improving as manufacturing sites consolidated; secondary packaging automation reducing variable manufacturing cost. Q1 FY25 favorable COGS performance contributing +50bps to Core OP margin versus Q4 FY24 baseline.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 17.0,
                    status: 'complete',
                    commentary: 'COGS ratio 17.0% in Q2 FY25, 50bps below target — indicating significant manufacturing efficiency improvement ahead of plan. PADCEV ADC manufacturing cost per unit declining as Astellas/Pfizer jointly invest in dedicated manufacturing capacity at Pfizer\'s McPherson, Kansas ADC facility (capacity expansion completed Q1 FY25). VYLOY launch batches beginning at Astellas Toyama manufacturing — early production runs above standard yield targets. XTANDI dual-source API program complete: second approved API supplier providing 20% cost reduction versus prior single-source arrangement. Q2 COGS outperformance expected to sustain; full-year FY25 COGS guidance revised downward to 17.0-17.2% from 17.5-18.0% original.',
                },
            ],
        },

        // =====================================================================
        // PILLAR 4: China Market Expansion
        // =====================================================================
        {
            pillar: 'China Market Expansion',
            kpiName: 'China Revenue (¥B quarterly)',
            baseline: 22.5,
            target: 37.5,
            unit: '¥B',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 22.5,
                    status: 'on-track',
                    commentary: 'Astellas China quarterly revenue ¥22.5B at Q4 FY24 baseline, representing approximately 4.2% of group revenue. China (¥101.5B FY25 actual) is the fastest-growing geographic segment. China XTANDI performance: NRDL (National Reimbursement Drug List) listing in 2023 dramatically expanded patient access — NRDL price negotiated at approximately -70% versus pre-listing price, with volume increase more than compensating for price reduction. VYLOY China NMPA approval anticipated Q4 FY25; PADCEV China NMPA application submitted Q3 FY24 for priority review. FY26 China target ¥150B (¥37.5B/quarter) requires: VYLOY launch (estimated ¥30-40B annualized), continued XTANDI volume growth, and PADCEV approval and launch.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 27.8,
                    status: 'on-track',
                    commentary: 'China quarterly revenue ¥27.8B in Q1 FY25, +23.6% YoY — fastest-growing segment. XTANDI China volume +18.5% YoY as NRDL hospital listing expansion continues; now listed at 3,820 hospitals (up from 2,950 at NRDL listing date). XOSPATA (gilteritinib) China revenue growing in AML market; NRDL listing and hospital formulary penetration continuing. China commercial organization: 320 medical sales representatives, 85 MSLs covering tier-1 to tier-2 cities. VYLOY China regulatory timeline: NMPA review underway, on track for Q4 FY25 approval. China PADCEV regulatory strategy: joint review program with NMPA following Phase III SPOTLIGHT data submission. VBP (volume-based procurement) risk monitoring: XTANDI not yet included in national VBP rounds.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 32.5,
                    status: 'on-track',
                    commentary: 'China quarterly revenue ¥32.5B in Q2 FY25, +18.9% YoY — tracking toward ¥37.5B quarterly target. XTANDI China +22% YoY volume in Q2; expanded hospital reach to 4,200 hospitals now dispensing XTANDI. XOSPATA China performing ahead of internal plan in AML — AML third-line market where gilteritinib is standard of care growing with improved leukemia diagnostics. VYLOY China NMPA approval received Q4 FY25 (ahead of original timeline); hospital listing campaign launched at 150 priority hospitals in tier-1 cities. China VYLOY market access strategy: priority listing at NCI-equivalent comprehensive cancer centers, followed by tier-2 hospital expansion. Management raised China FY25 revenue guidance to ¥108-112B.',
                },
            ],
        },
        {
            pillar: 'China Market Expansion',
            kpiName: 'VYLOY China Penetration — Gastric Cancer (%)',
            baseline: 0,
            target: 15.0,
            unit: '%',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 0,
                    status: 'on-track',
                    commentary: 'VYLOY China penetration 0% at Q4 FY24 baseline — NMPA approval not yet received at this date. China has the highest global incidence of gastric cancer: approximately 390,000 new cases annually (44% of world total). CLDN18.2-positive gastric cancer proportion in Chinese patients estimated 40-45% — slightly higher than Western populations. China VYLOY market opportunity: if 15% penetration achieved in CLDN18.2+ first-line gastric cancer, estimated peak annual revenue ¥35-45B. Astellas is building CLDN18.2 testing infrastructure in China through partnerships with Berry Genomics and Burning Rock diagnostics. Pre-launch HCP education: medical education programs reaching 1,200 Chinese gastric oncologists ahead of anticipated NMPA approval.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 1.8,
                    status: 'on-track',
                    commentary: 'VYLOY China penetration 1.8% in Q1 FY25 — NMPA approval received Q4 FY25, initial hospital listing and prescription commenced. First prescriptions at 85 tier-1 hospital cancer centers in Beijing, Shanghai, Guangzhou, and Chengdu. CLDN18.2 testing rate at top-tier cancer hospitals already at 45% for newly diagnosed gastric cancer — Astellas testing partnerships delivering pre-launch infrastructure benefit. China launch sequencing: comprehensive cancer centers first (Q4 FY25-Q1 FY26), followed by tier-2 hospital expansion (Q2-Q4 FY26), then provincial hospital listing (FY27). Competition: no currently approved CLDN18.2-targeted therapy in China; VYLOY has first-mover advantage in this biomarker-selected patient population.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 5.2,
                    status: 'on-track',
                    commentary: 'VYLOY China penetration 5.2% in Q2 FY25, accelerating as hospital formulary listings expand from 85 to 210 hospitals. CLDN18.2 testing rate improving at tier-1 and tier-2 hospitals; Astellas pathology lab partnership program now covering 380 hospitals with IHC staining capability. Provincial hospital listing applications submitted in Jiangsu, Zhejiang, Guangdong, Shandong, and Sichuan — collectively 35% of China gastric cancer incidence. China oncology congress (CSCO, September 2025) VYLOY data presentations expected to accelerate HCP adoption. 15% target represents steady-state penetration; management modeling 12-18 months to reach this level from current 5.2%.',
                },
            ],
        },
        {
            pillar: 'China Market Expansion',
            kpiName: 'XTANDI China Growth (% YoY volume)',
            baseline: 15.2,
            target: 25.0,
            unit: '%',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 15.2,
                    status: 'on-track',
                    commentary: 'XTANDI China volume growth 15.2% YoY in Q4 FY24, reflecting the ongoing NRDL listing-driven volume ramp. Post-NRDL listing penetration continues to expand as hospitals in tier-2 and tier-3 cities add XTANDI to formulary. China XTANDI patient population: estimated 180,000 CRPC/CSPC patients eligible for ARSi therapy in China, with current XTANDI penetration ~28% of eligible patients. VBP monitoring: XTANDI has not been included in national VBP rounds through FY24; Astellas is engaging with NHSA to navigate potential VBP inclusion in FY26 (enzalutamide patent in China expires 2027). VBP inclusion could drive volume acceleration at significant price reduction — management monitoring closely.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 18.5,
                    status: 'on-track',
                    commentary: 'XTANDI China volume growth 18.5% YoY in Q1 FY25, accelerating from Q4 FY24 baseline. Hospital reach expanded to 3,820 institutions dispensing XTANDI (up from 3,200 in Q1 FY24). China prostate cancer incidence growing: estimated 150,000 new diagnoses FY25 (+5% YoY), driven by PSA screening adoption and population aging. Market development initiatives: Chinese prostate cancer diagnosis rate still <40% vs. global average of >60%; Astellas public health campaigns partnering with Chinese Urological Association to improve early detection — creates long-term patient funnel. XOSPATA China performance strong: AML new patient enrollment +25% YoY as FLT3 testing becomes standard of care at comprehensive cancer centers.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 22.0,
                    status: 'on-track',
                    commentary: 'XTANDI China volume growth 22.0% YoY in Q2 FY25, within reach of 25% target. Hospital reach 4,200 institutions; tier-3 city penetration program initiated (targeting 800 additional hospitals in prefecture-level cities). China commercial team expanded from 280 to 340 MSRs to support tier-3 expansion. NRDL price vs. volume trade-off confirmed positive: -68% NRDL price reduction offset by +340% volume increase since listing — net revenue contribution growing. Astellas China VBP response plan: if XTANDI included in future VBP round, Astellas strategy is to maintain volume while accepting further price reduction, given fixed-cost infrastructure is largely amortized at current scale.',
                },
            ],
        },
        {
            pillar: 'China Market Expansion',
            kpiName: 'New Hospital Accounts China (count per year)',
            baseline: 120,
            target: 200,
            unit: 'hospitals/year',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 42,
                    status: 'on-track',
                    commentary: 'New hospital accounts added in China: 42 in Q4 FY24 quarter (annualizing to ~168/year from this pace). Hospital listing in China requires: NMPA approval, provincial drug catalog inclusion, hospital formulary committee approval, and pharmacoeconomic dossier submission. Average listing timeline from approval to first prescription: 8-14 months for tier-1 hospitals, 12-18 months for tier-2/tier-3. Astellas China hospital development team: 45 dedicated market access managers covering all 31 provinces. Priority listing strategy: 800 NCI-equivalent cancer centers and comprehensive cancer hospitals first, representing ~65% of oncology prescription volume despite being <5% of total hospital count.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 55,
                    status: 'on-track',
                    commentary: 'New hospital accounts 55 in Q1 FY25 — above 50/quarter pace needed to hit 200/year target. VYLOY listing program accelerating overall hospital development activity: VYLOY and XTANDI are co-promoted at newly listed hospitals, improving account efficiency. Tier-2 hospital listing program: targeting 450 hospitals across 15 provinces not yet listing any Astellas oncology products. Co-listing efficiency: hospitals adding VYLOY to formulary simultaneously listing or re-evaluating XTANDI and PADCEV (when approved). Estimated 12-month pipeline of hospital accounts in listing process: 280, of which ~180 expected to complete listing within the year — providing forward visibility on account additions.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 62,
                    status: 'on-track',
                    commentary: 'New hospital accounts 62 in Q2 FY25 (cumulative YTD 117; annualized ~248/year exceeding target). Strong quarterly account additions driven by VYLOY launch momentum and co-listing synergies with XTANDI. Tier-2 hospital expansion in Jiangsu, Zhejiang, and Guangdong provinces performing ahead of plan; provincial NHSA formulary inclusions in these three provinces (combined 45M cancer-incidence-relevant population) creating systemic access improvements. China hospital account quality: 35% of new accounts in FY25 YTD are tier-2A hospitals with >500 oncology beds — higher-quality accounts than prior year additions. Management raised China new account target to 250/year for FY26 given strong pipeline.',
                },
            ],
        },

        // =====================================================================
        // PILLAR 5: R&D Pipeline Value Creation
        // =====================================================================
        {
            pillar: 'R&D Pipeline Value Creation',
            kpiName: 'POC (Proof of Concept) Programs Active (count)',
            baseline: 2,
            target: 3,
            unit: 'programs',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 2,
                    status: 'on-track',
                    commentary: 'Two active Proof of Concept programs at Q4 FY24 baseline, reflecting Astellas\'s focused R&D portfolio strategy following FY24 pipeline rationalization. POC programs are defined as Phase 1b/2 studies with biomarker-driven patient selection designed to generate rapid go/no-go decisions in 18-24 months. Astellas R&D strategy (Focus Area Approach): concentrated investment in three therapeutic areas — oncology/hematology, immunology, and urology/women\'s health — where Astellas has differentiated assets and MSL infrastructure. POC program #1: ASP-2138 (next-generation CLDN18.2 bispecific antibody) in gastric cancer following VYLOY launch. POC program #2: ASP-3107 (FGFR inhibitor) in urothelial carcinoma as PADCEV combination candidate. Both programs targeting 2026 Phase 2 data readouts.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 2,
                    status: 'on-track',
                    commentary: 'Two POC programs maintained in Q1 FY25 as existing programs advance toward Phase 2 data readouts. No new POC initiations in Q1 due to R&D portfolio committee review cycle (annual review Q2). Astellas R&D investment: ¥285B FY25 (~13.3% of revenue), maintained at industry-competitive levels despite SMT savings initiatives. POC program philosophy: rapid biomarker enrichment, adaptive design, early stopping rules for futility. ASP-2138 Phase 1b enrollment completed; Phase 2 expansion cohort initiating Q2 FY25. ASP-3107 early Phase 2 cohorts showing preliminary efficacy signals in FGFR2-amplified bladder cancer; Phase 2 expansion cohort designs finalized. Target 3 active POC programs by Q2 FY25 with new oncology asset initiation planned.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 3,
                    status: 'on-track',
                    commentary: 'Three active POC programs achieved in Q2 FY25 — at target. New initiation: ASP-4780 (ROR1-targeted antibody-drug conjugate) Phase 1b POC in hematological malignancies, leveraging Astellas ADC platform capabilities developed through PADCEV partnership. This program exemplifies Astellas\'s internal ADC capability build: proprietary linker-payload technology developed to reduce Pfizer dependency for future ADC programs. Total active early pipeline: 8 Phase 1 programs, 3 POC Phase 1b/2 programs, 6 Phase 2 programs, and 4 Phase 3 programs — most productive pipeline in Astellas history by program count. R&D productivity metric: average time from IND to POC decision 28 months (vs. industry median 36 months).',
                },
            ],
        },
        {
            pillar: 'R&D Pipeline Value Creation',
            kpiName: 'Phase 3 Programs Active (count)',
            baseline: 6,
            target: 8,
            unit: 'programs',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 6,
                    status: 'on-track',
                    commentary: 'Six Phase 3 programs active at Q4 FY24 baseline, representing Astellas\'s late-stage pipeline investments. Active Phase 3 programs: (1) PADCEV + pembrolizumab muscle-invasive bladder cancer (MIBC) neoadjuvant/adjuvant; (2) XTANDI adjuvant prostate cancer (post-radical prostatectomy); (3) IZERVAY 36-month long-term extension and bilateral GA study; (4) VYLOY CLDN18.2+ esophageal cancer (GLOW-ESOPH); (5) ASP-3550 (next-gen FGFR inhibitor, bladder cancer); (6) XOSPATA (gilteritinib) frontline AML combination with azacitidine. Target 8 active Phase 3 programs represents meaningful pipeline expansion, requiring 2 new Phase 3 initiations from POC/Phase 2 successes.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 7,
                    status: 'on-track',
                    commentary: 'Seven Phase 3 programs active in Q1 FY25 as ASP-2138 (CLDN18.2 bispecific) Phase 3 initiation triggered by positive POC Phase 2 data in gastric cancer. Phase 3 program update: PADCEV MIBC neoadjuvant study enrollment 68% complete; XTANDI adjuvant prostate cancer study 55% enrolled; IZERVAY 36-month extension enrolling on schedule; VYLOY GLOW-ESOPH Phase 3 enrollment at 42%. New Phase 3 initiation in Q1: ASP-2138 Phase 3 GASTRIC (CLDN18.2+ gastric cancer, 3rd line following VYLOY 1st line — positioning for full treatment continuum strategy). R&D expense guidance maintained at ¥280-290B FY25; Phase 3 expansion adding incremental trial costs offset by SMT savings in non-strategic R&D spend.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 8,
                    status: 'on-track',
                    commentary: 'Eight Phase 3 programs active in Q2 FY25 — at target. Eighth program initiated: VEOZAH Phase 3b in VMS long-term safety study required by FDA as post-marketing commitment. Phase 3 program portfolio high-priority data readouts: XTANDI adjuvant prostate cancer (EMBARK-2, Phase 3 data expected Q3 FY26) and PADCEV MIBC neoadjuvant (Phase 3 data expected Q1 FY27). Both data readouts could drive significant new indication approvals. Pipeline R&D productivity: Astellas R&D Day (February 2025) disclosed probability-of-technical-success (POTS) weighted pipeline value of ¥2.8T — up from ¥2.2T at February 2024 R&D Day. POTS improvement driven by PADCEV and VYLOY Phase 3 progress and new Phase 1 POC initiations.',
                },
            ],
        },
        {
            pillar: 'R&D Pipeline Value Creation',
            kpiName: 'Pipeline NDA Submissions YTD (count)',
            baseline: 0,
            target: 2,
            unit: 'submissions',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 0,
                    status: 'on-track',
                    commentary: 'Zero new NDA/sBLA submissions at Q4 FY24 baseline — a trough year for new regulatory filings following the major submission cycle in FY23-FY24 (IZERVAY, VYLOY, PADCEV first-line UC sNDA). FY25-FY26 submission pipeline is robust, with 2 planned submissions to FDA by end of FY25 and 3 additional submissions projected for FY26. Regulatory strategy: Astellas is pursuing breakthrough therapy designation, priority review, and accelerated approval pathways where available to compress time-to-approval. PADCEV sNDA for MIBC neoadjuvant indication in pre-submission meeting with FDA (Q4 FY24); Phase 3 enrollment on track for Q1 FY26 data package. XTANDI sNDA for additional prostate cancer indication in final Phase 3 data collection.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 1,
                    status: 'on-track',
                    commentary: 'One NDA submission filed in Q1 FY25: VYLOY sNDA to FDA for CLDN18.2+ esophageal/GEJ cancer indication (GLOW-ESOPH Phase 3 data submitted). This follows VYLOY\'s initial gastric cancer approval and represents expansion of the CLDN18.2-targeted therapy across upper GI malignancies. FDA has assigned priority review designation; PDUFA date expected Q4 FY25. Second Q1 FY25 regulatory milestone: PADCEV (enfortumab vedotin) EU Marketing Authorization Application (MAA) submitted to EMA for muscle-invasive bladder cancer neoadjuvant setting — European regulatory filing tracking ahead of plan. Target 2 US NDA submissions by year-end FY25; one submitted, one (XTANDI adjuvant) planned for Q3 FY25.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 2,
                    status: 'on-track',
                    commentary: 'Two NDA submissions achieved in Q2 FY25 — at target. Second submission: XTANDI sBLA for adjuvant treatment of high-risk localized prostate cancer following radical prostatectomy — a large new indication that could expand XTANDI-addressable patient population by approximately 40,000 patients/year in the US alone. FDA Priority Review designation requested; PDUFA target action date expected Q1 FY26. Regulatory pipeline FY26: 3 additional planned submissions — PADCEV MIBC neoadjuvant (Phase 3 data Q1 FY26), ASP-2138 (CLDN18.2 bispecific Phase 3 data Q4 FY26), and IZERVAY bilateral GA expanded indication. Successful NDA submissions underscore Astellas\'s transition from a single-product company toward a diversified oncology portfolio.',
                },
            ],
        },
        {
            pillar: 'R&D Pipeline Value Creation',
            kpiName: 'R&D ROI (¥B revenue per ¥B R&D spend)',
            baseline: 2.8,
            target: 3.5,
            unit: '¥B revenue / ¥B R&D',
            quarters: [
                {
                    quarterLabel: 'Q4 FY24',
                    current: 2.8,
                    status: 'on-track',
                    commentary: 'R&D ROI 2.8x at Q4 FY24 baseline, calculated as LTM revenue (¥2,140B) divided by cumulative R&D spend over prior 5-year period (¥762B) — reflecting current portfolio value derived from past research investment. Astellas R&D ROI framework: 5-year cumulative R&D investment vs. current revenue run-rate from products emerging from that investment cycle. PADCEV, IZERVAY, and VYLOY are all products of Astellas\'s 2018-2022 R&D vintage — ¥245B invested in these three programs; combined FY25 revenue ¥362B — a 1.48x direct ROI from these three products alone in their first years of commercialization. Target 3.5x requires PADCEV peak revenue growth and VYLOY ramp to materialize as expected.',
                },
                {
                    quarterLabel: 'Q1 FY25',
                    current: 3.0,
                    status: 'on-track',
                    commentary: 'R&D ROI 3.0x in Q1 FY25, reflecting PADCEV and VYLOY revenue ramp increasing the returns on prior R&D investment. PADCEV contribution growing rapidly: FY25 annualized revenue ¥884B (¥221.2B quarterly run-rate) against ¥95B total Astellas direct investment in PADCEV Phase 2/3 development costs — a 9.3x return on direct program investment. Portfolio-level ROI improvement: SMT R&D efficiency gains are reducing cost per Phase advancement milestone by estimated 15%, improving the denominator of the ROI calculation without sacrificing pipeline quality. Astellas R&D productivity benchmarking: 3.0x compares favorably to large pharma average of 2.5x per GlobalData 2025 analysis.',
                },
                {
                    quarterLabel: 'Q2 FY25',
                    current: 3.2,
                    status: 'on-track',
                    commentary: 'R&D ROI 3.2x in Q2 FY25, continuing steady improvement toward 3.5x target. Revenue growth (+11.9% FY25 YoY) outpacing R&D spend growth (+3.2% YoY) is the primary driver of ROI improvement. VYLOY Japan and US revenue ramp contributing incrementally. XOSPATA (gilteritinib) maintaining ¥71.8B FY25 revenue despite competitive entry — AML FLT3-inhibitor market holding share against midostaurin combination. R&D prioritization under SMT: 4 pre-clinical programs terminated in FY25, 2 Phase 1 programs discontinued based on POC futility criteria — improving R&D capital efficiency. 3.5x target requires both VYLOY China ramp and PADCEV MIBC indication approval materializing on schedule; on current trajectory, achievable by FY26 exit rate.',
                },
            ],
        },
    ];

    const records = [];
    for (const kpi of kpis) {
        for (const qtr of kpi.quarters) {
            records.push({
                companyId,
                pillar: kpi.pillar,
                kpiName: kpi.kpiName,
                baseline: kpi.baseline,
                target: kpi.target,
                current: qtr.current,
                unit: kpi.unit,
                status: qtr.status,
                commentary: qtr.commentary,
                quarterLabel: qtr.quarterLabel,
            });
        }
    }

    await prisma.strategyExecution.createMany({ data: records });
    console.log(`  ✓ ${records.length} StrategyExecution records seeded for Astellas Pharma`);
}
