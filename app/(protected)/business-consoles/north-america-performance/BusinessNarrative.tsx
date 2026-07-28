import { motion } from 'framer-motion';
import {
    AlertCircle,
    BarChart3,
    Brain,
    Calendar,
    ChevronRight,
    Clock,
    Lightbulb,
    MessageSquare,
    Target,
    Users,
    Zap
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ConsolePageData } from './types';

interface BusinessNarrativeProps {
    dbData?: ConsolePageData;
}

export default function BusinessNarrative({ dbData }: BusinessNarrativeProps) {
    const [selectedPeriod, setSelectedPeriod] = useState('current-quarter');
    const [commentaryMode, setCommentaryMode] = useState<'analytics' | 'user'>('analytics');

    // Market Story Chapters - Analytics Based (built from DB data)
    const analyticsStory = useMemo(() => {
        const narrative = dbData?.narrative;
        const market = dbData?.market;
        const financials = dbData?.financials;
        const strategic = dbData?.strategic;
        const quarters = financials?.quarters ?? [];
        const latestQ = financials?.latestQuarter;

        // Executive summary
        const executiveSummary = {
            title: "Astellas Pharma Americas Performance — Financial Executive Overview",
            period: latestQ?.quarter ?? "Q4 FY2025",
            narrative: narrative?.narrative ??
                `Astellas Pharma is a leading pure-play pharmaceutical company focused on oncology, urology, and specialty therapeutics. ` +
                `Americas revenue of ¥${latestQ?.revenue?.toFixed(0) ?? '272.8'}B in ${latestQ?.quarter ?? 'Q4 FY25'}, driven by XTANDI US net price realization (+4%) and PADCEV US growth (+55% YoY). ` +
                `IRA XTANDI price negotiation (¥9.6B Core OP per 1pp net price reduction, effective January 2026) is the dominant forward-looking risk.`,
            keyTakeaways: narrative?.keyAchievements?.length
                ? narrative.keyAchievements
                : [
                    `Americas revenue growth at ${latestQ?.revenueYoY ?? 8.7}% YoY in ${latestQ?.quarter ?? 'Q4 FY25'}`,
                    `XTANDI US net price +4% YoY — positive pre-IRA; IRA MFP effective January 2026`,
                    `PADCEV US +55% YoY — EV+pembro 1L standard-of-care; >45% bladder cancer market share`,
                    `Americas Core OP margin ${latestQ?.operatingMargin ?? 28.4}% (+120bps YoY) — XTANDI leverage + PADCEV mix`,
                    ...(narrative?.concerns ?? []).slice(0, 1)
                ]
        };

        // Market evolution timeline from quarterly data
        const timeline = quarters.length > 0
            ? quarters.map((q) => ({
                period: q.quarter,
                event: `Americas Revenue: ¥${q.revenue.toFixed(0)}B | Revenue Growth: ${q.revenueYoY >= 0 ? '+' : ''}${q.revenueYoY}% | Core OP Margin: ${q.operatingMargin}%`,
                impact: `${q.revenueYoY >= 0 ? '+' : ''}${q.revenueYoY}% YoY Americas revenue growth`,
                status: q.revenueYoY >= 0 ? 'positive' : 'negative'
            }))
            : [
                { period: "Q1 FY25", event: "Astellas Finance360 platform launched — integrated pharmaceutical management reporting", impact: "Strategic analytics platform operational", status: "positive" },
                { period: "Q2 FY25", event: "SMT Cost Transformation program announced — ¥40B FY26 cumulative savings target", impact: "Core OP margins expand as SMT savings realized", status: "positive" },
                { period: "Q3 FY25", event: "PADCEV EV+pembro 1L FDA approval — first-line urothelial carcinoma standard of care", impact: "PADCEV US revenue growth accelerating >50% YoY", status: "positive" },
                { period: "Q4 FY25", event: "IRA XTANDI MFP negotiation initiated — ¥9.6B Core OP per 1pp net price reduction effective Jan 2026", impact: "+8.7% Americas revenue; IRA negotiation the dominant FY26 risk", status: "negative" }
            ];

        // Competitive landscape from market data
        const strengths = market?.marketDrivers?.length
            ? market.marketDrivers
            : ["XTANDI US market leadership — ~55% share among AR agents in mCSPC", "PADCEV EV+pembro 1L urothelial — NCCN Category 1, >45% new patient share", "Merck (Keytruda) PADCEV collaboration — 50/50 US economics, 3,800+ oncology reps", "VEOZAH & IZERVAY launch diversification — women's health + geographic atrophy"];
        const weaknesses = market?.marketChallenges?.length
            ? market.marketChallenges
            : ["IRA XTANDI MFP concentration risk — ¥9.6B/1pp net price reduction", "XTANDI revenue concentration (>58% Americas revenue)", "ERLEADA (J&J/Pfizer) nmCRPC share pressure", "VEOZAH women's health ramp below 25,000 prescriber YE2026 target"];
        const competitorMoves = market?.competitors?.length
            ? market.competitors.slice(0, 3).map((c) => ({
                competitor: c.name,
                recentAction: c.strengths?.[0] ?? 'Competitive expansion',
                marketImpact: `${c.marketShare}% market share (${c.yoyChange >= 0 ? '+' : ''}${c.yoyChange}% YoY)`,
                ourResponse: c.strengths?.[1] ?? 'Strategic response in progress'
            }))
            : [
                { competitor: "AstraZeneca / Merck (LYNPARZA)", recentAction: "LYNPARZA PARP inhibitor expansion into prostate cancer (BRCAm) — competing with XTANDI in molecularly selected mCRPC", marketImpact: "Molecular testing penetration expanding PARP inhibitor use in BRCA-mutated prostate cancer", ourResponse: "XTANDI broad-spectrum AR inhibition covers both BRCAm and non-BRCAm patients; XTANDI MFP IRA negotiation does not apply to LYNPARZA" },
                { competitor: "J&J / Pfizer (ERLEADA)", recentAction: "ERLEADA nmCRPC label — competing directly with XTANDI in non-metastatic castration-resistant prostate cancer", marketImpact: "nmCRPC segment ERLEADA share pressure on XTANDI (-2pp market share YoY in nmCRPC)", ourResponse: "XTANDI maintains overall AR-agent leadership in mCSPC and mCRPC; ERLEADA nmCRPC competition is contained to one indication" },
                { competitor: "Apellis Pharmaceuticals (SYFOVRE)", recentAction: "SYFOVRE geographic atrophy (monthly intravitreal injection) competing with IZERVAY in GA retinal disease", marketImpact: "GA duopoly forming between SYFOVRE and IZERVAY — dosing differentiation is the commercial battleground", ourResponse: "IZERVAY monthly dosing vs SYFOVRE bimonthly — access and formulary selection is key differentiator in GA market" }
            ];

        // Future outlook from strategic forward outlook
        const scenarios = strategic?.forwardOutlook?.length
            ? strategic.forwardOutlook.map((fo, idx) => ({
                name: fo.period,
                probability: idx === 0 ? 60 : idx === 1 ? 25 : 15,
                marketShare: `${market?.marketShareTarget ?? 55.0}% XTANDI AR-agent share`,
                revenue: `¥${fo.revenuePlan.toFixed(0)}B`,
                keyAssumptions: fo.keyAssumptions
            }))
            : [
                { name: "Base Case", probability: 60, marketShare: "~55% XTANDI AR-agent share (mCSPC)", revenue: "≥¥1,100B Americas FY26", keyAssumptions: ["IRA XTANDI MFP 15-25% net price reduction (¥144-240B Core OP headwind)", "PADCEV US +35-40% YoY FY26", "VEOZAH 20,000+ prescribers YE2026", "SMT Americas savings ¥8B FY26"] },
                { name: "Optimistic", probability: 25, marketShare: "~57% XTANDI AR-agent share", revenue: "¥1,150B+ Americas FY26", keyAssumptions: ["IRA MFP <15% net price reduction — lower end of CMS range", "PADCEV +45%+ YoY — 1L penetration exceeds expectations", "VEOZAH VMS conversion rate accelerates — non-HRT market penetration breakthrough", "SMT savings ahead of plan — ¥10B Americas"] },
                { name: "Pessimistic", probability: 15, marketShare: "~52% XTANDI AR-agent share", revenue: "¥1,000-1,050B Americas FY26", keyAssumptions: ["IRA MFP >30% net price reduction — >¥288B annual Core OP headwind", "ERLEADA/darolutamide gain additional mCSPC share", "VEOZAH slow penetration — prescriber-to-prescription conversion lags", "IRA chilling effect on other Astellas drug pricing"] }
            ];

        return {
            executiveSummary,
            marketEvolution: { title: "How We Got Here", timeline },
            competitiveLandscape: {
                title: "Competitive Dynamics",
                ourPosition: { strengths, weaknesses },
                competitorMoves
            },
            futureOutlook: { title: "Where We're Heading", scenarios }
        };
    }, [dbData]);

    // Market Story Chapters - User Commentary Based
    const userCommentaryStory = {
        executiveSummary: {
            title: "Astellas Americas Performance — Enhanced with Field Context",
            period: "Q4 FY2025",
            narrative: "Based on Americas market leadership insights, the +8.7% Americas revenue growth reflects strong XTANDI net price realization (+4%) and accelerating PADCEV adoption (+55% YoY). XTANDI US remains the dominant revenue driver. The IRA XTANDI price negotiation is the most critical near-term risk: CMS is in active negotiation; each 1pp net price reduction equals ¥9.6B Core OP impact effective January 2026. PADCEV EV+pembro has established 1L standard-of-care status in urothelial carcinoma — >45% new patient share in eligible bladder cancer patients.",
            keyTakeaways: [
                "XTANDI US +4% net price realization — positive pre-IRA; IRA MFP negotiation outcome is the dominant FY26 risk (¥9.6B/1pp)",
                "PADCEV US +55% YoY — EV+pembro 1L standard-of-care; >45% bladder cancer market share established",
                "Americas Core OP margin +120bps YoY — XTANDI leverage + PADCEV high-margin contribution",
                "VEOZAH 14,500+ prescribers (12 months); IZERVAY geographic atrophy contributing incremental revenue",
                "SMT Americas savings ¥8B FY26 target — partially mitigating IRA price negotiation downside"
            ],
            userInsights: [
                { contributor: "US Oncology Finance VP", insight: "IRA XTANDI negotiation is the single most watched number in Americas finance. We've stress-tested scenarios from 10pp to 40pp net price reduction. SMT savings are real mitigation but they're not a full offset at the upper end of the range." },
                { contributor: "Americas Commercial Finance Director", insight: "PADCEV is the brightest spot. EV+pembro has genuinely become standard of care — Merck's Keytruda sales force is a massive multiplier. If PADCEV sustains >40% growth into FY26-27, it becomes a meaningful IRA hedge." },
                { contributor: "Market Access Finance SVP", insight: "VEOZAH launch prescriber-to-prescription conversion is the lever. We've reached 14,500 prescribers but active prescribing is lower than we'd like. The women's health market is real — we need to close the conversion gap." }
            ]
        },
        marketEvolution: {
            title: "The Real Story Behind the Numbers",
            timeline: [
                {
                    period: "Q1 FY25",
                    event: "CEO Naoki Okamura and CFO Atsushi Kitamura outline SMT Cost Transformation strategy — ¥40B FY26, ¥65B cumulative target",
                    impact: "Americas SG&A efficiency focus; SMT savings program operational",
                    status: "positive",
                    context: "SMT program is ahead of schedule. Americas teams report strong engagement with the commercial operations optimization workstream. ¥8B Americas FY26 target is credible based on Q1 trajectory."
                },
                {
                    period: "Q2 FY25",
                    event: "PADCEV EV+pembro 1L FDA approval — first-line urothelial carcinoma label expansion",
                    impact: "PADCEV US revenue growth accelerates to >50% YoY; standard-of-care adoption rapid",
                    status: "positive",
                    context: "The EV-302/KEYNOTE-869 data is compelling — NCCN moved quickly to Category 1 recommendation. Merck's 3,800+ oncology reps are driving access across academic and community oncology centers simultaneously. The 50/50 US economics split makes this collaboration uniquely valuable for Astellas."
                },
                {
                    period: "Q3 FY25",
                    event: "CMS selects XTANDI for IRA drug price negotiation — FY2026 negotiation cohort announcement",
                    impact: "Americas earnings risk materialized: ¥9.6B Core OP per 1pp net price reduction from January 2026",
                    status: "negative",
                    context: "IRA XTANDI selection was expected but still represents the most material single near-term financial risk facing Astellas. Management is engaging CMS constructively. Internally, scenario planning has been completed for 10pp to 40pp net price reduction outcomes."
                },
                {
                    period: "Q4 FY25",
                    event: "VEOZAH US women's health launch — 14,500+ prescribers reached in 12 months",
                    impact: "+8.7% Americas revenue; VEOZAH VMS launch contributing ¥8B incremental",
                    status: "positive",
                    context: "VEOZAH launch is building momentum. 14,500+ prescribers represents strong awareness, but prescriber-to-prescribing conversion needs acceleration. The non-HRT VMS patient population is genuinely large (~40% of 10M annual VMS patients). This is a multi-year story."
                }
            ]
        },
        regionalDynamics: {
            title: "Ground Truth from Segment Leaders",
            regions: [
                {
                    region: "XTANDI US & IRA Risk",
                    performance: "+4% net price YoY (pre-IRA)",
                    marketShare: 55,
                    narrative: "XTANDI is performing well on net price (+4%) and mCSPC volume (+8% new patient starts) ahead of IRA implementation. The MFP negotiation is in progress. Internal teams have stress-tested 10-40pp net price reduction scenarios. The central question is whether volume growth can partially offset price reduction — early evidence from other IRA negotiated drugs suggests volume impact is modest, making price the dominant driver.",
                    challenges: ["IRA MFP negotiation outcome — ¥9.6B/1pp; analyst consensus 20-35% reduction range", "ERLEADA nmCRPC share pressure (-2pp nmCRPC market share)"],
                    opportunities: ["mCSPC volume growth from AR-agent penetration in guideline-eligible patients", "Gross-to-net optimization — +180bps YoY improvement demonstrating pricing power pre-IRA"]
                },
                {
                    region: "PADCEV US",
                    performance: "+55% YoY revenue growth",
                    marketShare: 45,
                    narrative: "PADCEV is the highest-growth Astellas product globally and in the Americas. EV+pembro has achieved genuine standard-of-care status in 1L urothelial carcinoma — >45% new patient capture. The Merck collaboration is performing above plan. 92% of PADCEV prescriptions are written as the EV+pembro combination, cementing the Merck economics and co-promotional commitment.",
                    challenges: ["Penetration still below theoretical peak market share — additional 1L conversion opportunity remaining", "Second-line/beyond market dynamics evolving with new competitive entrants"],
                    opportunities: ["Ongoing bladder cancer patient population expansion as early diagnosis improves", "PADCEV potentially surpassing ¥300B US revenue by FY27 at current trajectory"]
                },
                {
                    region: "VEOZAH & IZERVAY Launches",
                    performance: "14,500+ VEOZAH prescribers; IZERVAY 12% GA market share",
                    marketShare: 12,
                    narrative: "Both new launches contributing incremental Americas revenue beyond oncology. VEOZAH VMS launch is building the prescriber base (14,500+) but prescriber-to-prescribing conversion remains the gap to close. IZERVAY geographic atrophy is competing in a duopoly with Apellis SYFOVRE — monthly dosing differentiation is the key commercial lever for formulary access.",
                    challenges: ["VEOZAH prescriber-to-prescription conversion below internal targets", "IZERVAY vs SYFOVRE formulary competition — payer decisions driven by comparable efficacy, diverging on dosing convenience"],
                    opportunities: ["VMS non-HRT market is genuinely underserved — ~4M eligible patients not currently treated", "IZERVAY geographic atrophy diagnosis rates improving — growing addressable market"]
                }
            ]
        },
        competitiveLandscape: {
            title: "Competitive Intelligence from the Field",
            strengths: [
                "XTANDI AR-agent leadership — ~55% mCSPC share, durable oncology brand with 10+ years of prostate cancer prescribing history",
                "PADCEV-Merck collaboration — 50/50 US economics, Keytruda sales force co-promotion, NCCN Category 1 standard-of-care positioning",
                "Portfolio diversification across oncology, urology, and women's health — VEOZAH and IZERVAY reducing XTANDI revenue concentration",
                "SMT Cost Transformation — ¥40B FY26 savings target creating structural cost advantage offsetting IRA headwinds"
            ],
            weaknesses: [
                "IRA XTANDI concentration risk — ¥9.6B Core OP per 1pp net price reduction; XTANDI represents >58% Americas revenue",
                "VEOZAH women's health launch ramp below prescriber target — prescriber-to-prescribing conversion needs acceleration",
                "ERLEADA (J&J/Pfizer) nmCRPC share pressure — 2pp YoY market share headwind in non-metastatic indication",
                "Americas revenue concentration in two products (XTANDI + PADCEV ~73% of Americas) creates portfolio concentration risk"
            ],
            competitiveIntel: [
                "AstraZeneca/Merck LYNPARZA expanding into BRCAm-selected mCRPC — targeting XTANDI patients with BRCA mutations",
                "J&J ERLEADA nmCRPC share gains — 2pp share pressure in non-metastatic castration-resistant indication",
                "Apellis SYFOVRE competing with IZERVAY in geographic atrophy — dosing interval differentiation the battleground",
                "Pfizer darolutamide (Nubeqa) mCSPC label — three-way AR-agent competition in the largest XTANDI volume segment"
            ],
            competitorMoves: [
                {
                    competitor: "AstraZeneca / Merck (LYNPARZA)",
                    recentAction: "LYNPARZA BRCAm mCRPC label expansion — targeting genetically selected prostate cancer population",
                    marketImpact: "Molecular testing penetration growing in prostate cancer — BRCA-mutated patients represent ~12% of mCRPC",
                    ourResponse: "XTANDI broad-spectrum AR inhibition covers both BRCAm and non-BRCAm patients. LYNPARZA competes for a targeted subset; XTANDI maintains dominant position in the broader AR-pathway mCRPC market.",
                    insiderContext: "LYNPARZA in prostate cancer is less threatening than initially feared — penetration is limited to the ~12% BRCA-mutated patient subset. Our XTANDI patient base is defended by broad AR-pathway coverage. XTANDI combination regimens with PARP inhibitors are a potential future opportunity."
                },
                {
                    competitor: "J&J / Pfizer (ERLEADA)",
                    recentAction: "ERLEADA marketing investment in nmCRPC — second-line nmCRPC positioning versus XTANDI",
                    marketImpact: "nmCRPC segment ERLEADA share pressure: 2pp YoY market share headwind for XTANDI in non-metastatic indication",
                    ourResponse: "XTANDI nmCRPC overall survival data remains differentiated; IRA negotiation does not help ERLEADA's competitive positioning since ERLEADA is also at risk for future IRA cycles. mCSPC is the growth story and XTANDI leads there.",
                    insiderContext: "ERLEADA nmCRPC pressure is real but contained to one indication. The bigger competitive risk is darolutamide (Nubeqa) entering mCSPC — that's a three-way fight we need to monitor carefully in FY26."
                },
                {
                    competitor: "Apellis Pharmaceuticals (SYFOVRE)",
                    recentAction: "SYFOVRE geographic atrophy launch — bimonthly intravitreal injection competing with IZERVAY's monthly dosing",
                    marketImpact: "GA duopoly — both products sharing the newly diagnosed geographic atrophy treatment market (~800K US prevalent patients)",
                    ourResponse: "IZERVAY monthly dosing vs SYFOVRE bimonthly — payer formulary decisions are the battleground. IZERVAY's dosing schedule aligns with standard ophthalmology visit frequency. Formulary wins with major vision plans are the critical near-term commercial metric.",
                    insiderContext: "The GA duopoly is actually a good outcome — two products legitimizing and growing the treated GA market. Our challenge is formulary wins with major vision insurance plans. Monthly vs bimonthly dosing convenience is a genuine differentiator for retina specialists."
                }
            ]
        },
        futureOutlook: {
            title: "The View from the Trenches",
            scenarios: [
                {
                    name: "Base Case (Field Adjusted)",
                    probability: 60,
                    marketShare: "~55% XTANDI AR-agent share",
                    revenue: "≥¥1,100B Americas FY26",
                    keyAssumptions: [
                        "IRA XTANDI MFP 15-25% net price reduction (¥144-240B Core OP headwind)",
                        "PADCEV US +35-40% YoY — EV+pembro 1L adoption sustains strong trajectory",
                        "VEOZAH 20,000+ prescribers YE2026 — conversion improving in H2",
                        "SMT Americas savings ¥8B FY26 — partial IRA offset"
                    ],
                    fieldInsights: "Americas finance teams cautiously optimistic on PADCEV and VEOZAH trajectory. IRA outcome is the dominant unknown variable — base case assumes a moderate price reduction consistent with analyst consensus."
                },
                {
                    name: "Optimistic (If We Execute)",
                    probability: 25,
                    marketShare: "~57% XTANDI AR-agent share",
                    revenue: "¥1,150B+ Americas FY26",
                    keyAssumptions: [
                        "IRA MFP <15% net price reduction — lower end of CMS negotiation range",
                        "PADCEV +45%+ YoY — 1L penetration beyond >50% of eligible patients",
                        "VEOZAH VMS non-HRT market breakthrough — 25,000+ prescribers YE2026",
                        "SMT savings ¥10B Americas — ahead of plan"
                    ],
                    fieldInsights: "Achievable if IRA price outcome is at the lower end of analyst estimates and PADCEV continues to outperform. VEOZAH prescriber conversion acceleration is the swing factor for the upside case."
                },
                {
                    name: "Pessimistic (Risk Case)",
                    probability: 15,
                    marketShare: "~52% XTANDI AR-agent share",
                    revenue: "¥1,000-1,050B Americas FY26",
                    keyAssumptions: [
                        "IRA MFP >30% net price reduction — >¥288B annual Core OP headwind",
                        "ERLEADA/darolutamide mCSPC share gains accelerate — XTANDI volume offset insufficient",
                        "VEOZAH slow conversion — prescriber-to-prescribing gap persists",
                        "IRA chilling effect broader than XTANDI — payer formulary restrictions expand"
                    ],
                    fieldInsights: "Finance teams flagging IRA negotiation outcome announcement (September 2025 target) as the key binary event. If the MFP reduction is >30%, Americas EPS guidance downside revision becomes likely. Volume offset strategy is the key mitigation lever management is actively pursuing."
                }
            ]
        }
    };

    const marketStory = commentaryMode === 'analytics' ? analyticsStory : userCommentaryStory;

    // Strategic Themes — from DB strategic initiatives when available
    const strategicThemes = useMemo(() => {
        const initiatives = dbData?.strategic?.initiatives;
        if (initiatives && initiatives.length > 0) {
            return initiatives.map((init) => ({
                theme: init.name,
                description: init.description,
                progress: init.progress,
                initiatives: init.milestones?.map(m => m.name) ?? [],
                metrics: {
                    current: init.kpis?.[0]
                        ? `${init.kpis[0].actual} ${init.kpis[0].label}`
                        : `${init.progress}% complete`,
                    target: init.kpis?.[0]
                        ? `${init.kpis[0].target} ${init.kpis[0].label}`
                        : `¥${init.budget}M budget`,
                    trend: init.status === 'on-track' || init.status === 'completed' ? 'positive' : 'negative'
                }
            }));
        }
        // Fallback
        return [
            {
                theme: "IRA XTANDI Risk Management & Price Mitigation",
                description: "Manage IRA Maximum Fair Price negotiation impact and mitigate ¥9.6B/1pp Core OP sensitivity through volume growth, SMT savings, and diversification",
                progress: 45,
                initiatives: ["CMS engagement in IRA MFP negotiation process", "XTANDI volume growth strategies to partially offset price reduction", "SMT Americas savings ¥8B FY26 — structural cost offset to IRA headwinds"],
                metrics: { current: "¥9.6B/1pp sensitivity quantified; negotiation active", target: "Minimize net price reduction vs current net pricing", trend: "negative" }
            },
            {
                theme: "PADCEV US Growth Acceleration",
                description: "Sustain PADCEV US revenue growth above 40% YoY through EV+pembro 1L adoption and Merck collaboration optimization",
                progress: 82,
                initiatives: ["EV+pembro 1L penetration in guideline-eligible urothelial carcinoma", "Merck Keytruda sales force co-promotion optimization", "PADCEV market share expansion in 1L bladder cancer (current >45%)"],
                metrics: { current: "+55% YoY PADCEV US revenue growth", target: ">40% YoY growth FY26 sustained", trend: "positive" }
            },
            {
                theme: "Portfolio Diversification — VEOZAH & IZERVAY Launches",
                description: "Accelerate VEOZAH women's health and IZERVAY geographic atrophy US launches to reduce XTANDI revenue concentration",
                progress: 58,
                initiatives: ["VEOZAH VMS OB/GYN prescriber conversion acceleration", "IZERVAY GA formulary positioning vs SYFOVRE (Apellis)", "Combined women's health + ophthalmology launch revenue targeting ¥35B annualized FY26"],
                metrics: { current: "VEOZAH: 14,500 prescribers; IZERVAY: 12% GA share", target: "VEOZAH: 25,000 prescribers YE2026; IZERVAY: >20% GA share", trend: "positive" }
            }
        ];
    }, [dbData]);

    return (
        <div className="space-y-6">
            {/* Header with Period Selector */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Business Narrative</h2>
                <div className="flex items-center space-x-4">
                    {/* Commentary Mode Toggle */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setCommentaryMode('analytics')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${commentaryMode === 'analytics'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <Brain className="w-4 h-4" />
                                <span>AI Analytics Commentary</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setCommentaryMode('user')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${commentaryMode === 'user'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <MessageSquare className="w-4 h-4" />
                                <span>AI User Commentary</span>
                            </div>
                        </button>
                    </div>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="text-sm bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#000000]"
                    >
                        <option value="current-quarter">Current Quarter (Q4 FY25)</option>
                        <option value="ytd">Year to Date</option>
                        <option value="last-year">Last 12 Months</option>
                    </select>
                </div>
            </div>

            {/* Executive Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{marketStory.executiveSummary.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{marketStory.executiveSummary.period}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">Updated 2 hours ago</span>
                    </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                    {marketStory.executiveSummary.narrative}
                </p>

                <div className="bg-[#F0F0F0] rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2 text-[#000000]" />
                        Key Takeaways
                    </h4>
                    <ul className="space-y-2">
                        {marketStory.executiveSummary.keyTakeaways.map((takeaway, index) => (
                            <li key={index} className="flex items-start">
                                <ChevronRight className="w-4 h-4 text-[#000000] mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{takeaway}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User Insights - Only show in user commentary mode */}
                {commentaryMode === 'user' && 'userInsights' in marketStory.executiveSummary && (
                    <div className="mt-4 bg-yellow-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                            <Users className="w-4 h-4 mr-2 text-yellow-600" />
                            Direct Insights from the Field
                        </h4>
                        <ul className="space-y-2">
                            {(marketStory.executiveSummary as any).userInsights.map((insight: any, index: number) => (
                                <li key={index} className="text-sm">
                                    <span className="font-medium text-gray-700">{insight.contributor}:</span>
                                    <span className="text-gray-600 ml-2">&ldquo;{insight.insight}&rdquo;</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </motion.div>

            {/* Market Evolution Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-[#000000]" />
                    {marketStory.marketEvolution.title}
                </h3>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                    {/* Timeline events */}
                    <div className="space-y-6">
                        {marketStory.marketEvolution.timeline.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex items-start"
                            >
                                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${event.status === 'positive' ? 'bg-emerald-100' : 'bg-red-100'
                                    }`}>
                                    <div className={`w-3 h-3 rounded-full ${event.status === 'positive' ? 'bg-[#000000]' : 'bg-red-500'
                                        }`}></div>
                                </div>
                                <div className="ml-6 flex-1">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-semibold text-gray-900">{event.period}</h4>
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${event.status === 'positive'
                                                ? 'bg-emerald-100 text-[#000000]'
                                                : 'bg-red-100 text-red-700'
                                                }`}>
                                                {event.impact}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700">{event.event}</p>
                                        {/* Show context in user commentary mode */}
                                        {'context' in event && event.context && (
                                            <div className="mt-2 pt-2 border-t border-gray-200">
                                                <p className="text-xs text-gray-600 italic">
                                                    <MessageSquare className="w-3 h-3 inline mr-1" />
                                                    {event.context}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Competitive Landscape */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-[#000000]" />
                    {marketStory.competitiveLandscape.title}
                </h3>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Our Strengths</h4>
                        <ul className="space-y-2">
                            {('ourPosition' in marketStory.competitiveLandscape
                                ? marketStory.competitiveLandscape.ourPosition.strengths
                                : marketStory.competitiveLandscape.strengths
                            ).map((strength: string, index: number) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#000000] mt-1.5 mr-2 flex-shrink-0"></div>
                                    <span className="text-sm text-gray-700">{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Areas for Improvement</h4>
                        <ul className="space-y-2">
                            {('ourPosition' in marketStory.competitiveLandscape
                                ? marketStory.competitiveLandscape.ourPosition.weaknesses
                                : marketStory.competitiveLandscape.weaknesses
                            ).map((weakness: string, index: number) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-2 flex-shrink-0"></div>
                                    <span className="text-sm text-gray-700">{weakness}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Competitor Moves */}
                <div className="border-t pt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Recent Competitor Actions</h4>
                    <div className="space-y-4">
                        {marketStory.competitiveLandscape.competitorMoves.map((move, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h5 className="text-sm font-semibold text-gray-900">{move.competitor}</h5>
                                    <AlertCircle className="w-4 h-4 text-amber-500" />
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{move.recentAction}</p>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <span className="text-gray-500">Market Impact:</span>
                                        <p className="text-gray-700 mt-1">{move.marketImpact}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Our Response:</span>
                                        <p className="text-[#000000] font-medium mt-1">{move.ourResponse}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Strategic Themes */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-[#000000]" />
                    Strategic Themes & Progress
                </h3>

                <div className="space-y-6">
                    {strategicThemes.map((theme, index) => (
                        <div key={index} className="border rounded-lg p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="text-base font-semibold text-gray-900">{theme.theme}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{theme.progress}%</span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div
                                    className="bg-[#000000] h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${theme.progress}%` }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-gray-700 mb-2">Key Initiatives</p>
                                    <ul className="space-y-1">
                                        {theme.initiatives.map((initiative, idx) => (
                                            <li key={idx} className="text-xs text-gray-600 flex items-start">
                                                <ChevronRight className="w-3 h-3 mt-0.5 mr-1 flex-shrink-0" />
                                                {initiative}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-700 mb-2">Performance Metrics</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">Current:</span>
                                            <span className="text-xs font-medium text-gray-900">{theme.metrics.current}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">Target:</span>
                                            <span className="text-xs font-medium text-[#000000]">{theme.metrics.target}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">Trend:</span>
                                            <span className={`text-xs font-medium ${theme.metrics.trend === 'positive' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {theme.metrics.trend === 'positive' ? 'Improving' : 'Declining'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Future Outlook Scenarios */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-[#000000]" />
                    {marketStory.futureOutlook.title}
                </h3>

                <div className="grid grid-cols-3 gap-4">
                    {marketStory.futureOutlook.scenarios.map((scenario, index) => (
                        <div
                            key={index}
                            className={`border rounded-lg p-4 ${scenario.name.includes('Base') ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-semibold text-gray-900">{scenario.name}</h4>
                                <span className="text-xs font-medium text-gray-600">{scenario.probability}% probability</span>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div>
                                    <p className="text-xs text-gray-500">Market Position</p>
                                    <p className="text-lg font-bold text-gray-900">{scenario.marketShare}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Americas Revenue Forecast</p>
                                    <p className="text-lg font-bold text-gray-900">{scenario.revenue}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-700 mb-2">Key Assumptions</p>
                                <ul className="space-y-1">
                                    {scenario.keyAssumptions.map((assumption, idx) => (
                                        <li key={idx} className="text-xs text-gray-600">&#8226; {assumption}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
