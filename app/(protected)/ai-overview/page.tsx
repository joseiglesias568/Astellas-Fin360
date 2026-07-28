'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertTriangle,
    ArrowRight,
    BarChart2,
    BookOpen,
    Brain,
    CalendarDays,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    Clock,
    Database,
    Eye,
    FileText,
    Flame,
    GitMerge,
    Lock,
    MapPin,
    MessageSquare,
    MousePointerClick,
    RefreshCw,
    Search,
    Shield,
    Sparkles,
    TrendingDown,
    TrendingUp,
    Users,
    X,
    Zap,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const agents = [
    {
        id: 'orchestrator',
        name: 'The Team Lead',
        role: 'Orchestrator Agent',
        color: '#000000',
        bg: '#F0F0F0',
        icon: Brain,
        plain: 'Reads your request, decides which specialists to call, and assembles the final answer — like a project manager who never sleeps.',
        handles: ['Executive Summary', 'Scenario Modeling', 'Monthly Report'],
    },
    {
        id: 'analyst',
        name: 'The Number Cruncher',
        role: 'Financial Analysis Agent',
        color: '#0070C0',
        bg: '#EFF6FF',
        icon: BarChart2,
        plain: 'Digs into the quarterly figures, spots trends across revenue, margin, and cost — and flags anything that moved more than expected.',
        handles: ['Revenue bridge', 'Variance analysis', 'KPI trends'],
    },
    {
        id: 'storyteller',
        name: 'The Storyteller',
        role: 'Commentary Agent',
        color: '#7C3AED',
        bg: '#F5F3FF',
        icon: MessageSquare,
        plain: 'Turns numbers into plain-English narratives. Writes the briefing text, insight cards, and executive summaries you read on each dashboard.',
        handles: ['AI Financial Snapshot', 'Insight cards', 'Briefing narrative'],
    },
    {
        id: 'watchdog',
        name: 'The Watchdog',
        role: 'Anomaly Detection Agent',
        color: '#B45309',
        bg: '#FFFBEB',
        icon: AlertTriangle,
        plain: 'Monitors every metric continuously. When something falls outside its normal range — XTANDI IRA price cut risk, Core OP margin below guidance, or FX adverse vs. ¥151 baseline — it fires an alert immediately.',
        handles: ['AI Alerts', 'Risk flags', 'Threshold monitoring'],
    },
    {
        id: 'researcher',
        name: 'The Researcher',
        role: 'Semantic Search Agent',
        color: '#065F46',
        bg: '#ECFDF5',
        icon: Search,
        plain: 'Powers the AI Search bar. Understands questions in plain English and finds the right figures, narratives, and supporting data instantly.',
        handles: ['AI Search', 'Data retrieval', 'Document lookup'],
    },
    {
        id: 'guardian',
        name: 'The Gatekeeper',
        role: 'Data Integrity Agent',
        color: '#9F1239',
        bg: '#FFF1F2',
        icon: Shield,
        plain: 'Every piece of data gets a source tag before it leaves the pipeline. This agent verifies citations trace back to a 10-K, 10-Q, or earnings release — never thin air.',
        handles: ['Provenance tagging', 'Source validation', 'Audit trail'],
    },
];

const workflowSteps = [
    { icon: Database, label: 'Source Data Arrives', sub: '10-K · 10-Q · Earnings releases · Internal metrics', color: '#000000' },
    { icon: Shield, label: 'Guardian validates & tags', sub: 'Every value gets a [CITED] or [DERIVED] label', color: '#9F1239' },
    { icon: Brain, label: 'Team Lead routes the request', sub: 'Decides which specialists are needed', color: '#000000' },
    { icon: BarChart2, label: 'Specialists do the work', sub: 'Crunch numbers · Write narrative · Detect anomalies', color: '#0070C0' },
    { icon: Eye, label: 'Human checkpoint', sub: 'Finance team reviews, edits, and approves', color: '#065F46' },
    { icon: Sparkles, label: 'Output to dashboard', sub: 'Insight cards · Charts · Alerts · Briefings', color: '#7C3AED' },
];

const appSpotlights = [
    {
        page: 'Executive Summary',
        href: '/executive-summary',
        color: '#000000',
        bg: '#F0F0F0',
        icon: TrendingUp,
        aiFeatures: [
            { label: 'AI Financial Snapshot', desc: 'Storyteller agent writes the hero briefing text from live quarterly data' },
            { label: 'Insight cards', desc: 'Each lane (Commercial, Ops, Financial, Risk) surfaces 2-5 AI-tagged insights' },
            { label: 'Revenue & margin charts', desc: 'Number Cruncher populates from 10-K/10-Q seed with automatic fallback' },
        ],
    },
    {
        page: 'Commentary & Insights',
        href: '/commentary',
        color: '#7C3AED',
        bg: '#F5F3FF',
        icon: MessageSquare,
        aiFeatures: [
            { label: '800+ AI-generated entries', desc: 'Storyteller created narratives across 7 business outcome categories' },
            { label: 'Executive attribution', desc: 'Key quotes tied to Naoki Okamura, Tadaaki Taniguchi, and other Astellas leadership team members' },
            { label: 'Human-editable', desc: 'Finance team can flag, edit, or add commentary directly' },
        ],
    },
    {
        page: 'AI Alerts',
        href: '/ai-alerts',
        color: '#B45309',
        bg: '#FFFBEB',
        icon: AlertTriangle,
        aiFeatures: [
            { label: '25 live anomaly monitors', desc: 'Watchdog tracks XTANDI IRA price risk, Core OP margin deviation, FX vs. ¥151 baseline, PADCEV launch ramp, and SMT savings pacing in real time' },
            { label: 'Severity tiers', desc: 'Critical · High · Medium thresholds tuned to health care industry benchmarks' },
            { label: 'Auto-routed to owner', desc: 'Each alert tagged with the responsible business function' },
        ],
    },
    {
        page: 'Scenario Modeling',
        href: '/scenario-modeling',
        color: '#0070C0',
        bg: '#EFF6FF',
        icon: GitMerge,
        aiFeatures: [
            { label: 'Driver analytics', desc: 'Number Cruncher models XTANDI IRA price cut EPS impact, FX yen/USD sensitivity on Core OP, and PADCEV label expansion revenue simultaneously' },
            { label: 'AI narrative summary', desc: 'Storyteller writes a plain-English read-out of each scenario result' },
            { label: 'External signals', desc: 'Industry news and macro indicators surface inside the modeling workspace' },
        ],
    },
];

// ── Scenario 1: XTANDI IRA Price Cut Sensitivity ─────────────────────────────

const fuelShockScenario = {
    id: 'fuel',
    label: 'XTANDI IRA Price Cut Sensitivity',
    tagline: 'IRA Medicare negotiation outcome pending — three-scenario Core EPS impact for the CFO',
    triggerIcon: Flame,
    triggerIconColor: '#B45309',
    scenario: 'XTANDI IRA Price Negotiation — Revised Core EPS Sensitivity Analysis',
    trigger: {
        time: '9:47 AM',
        who: 'Kenji Watanabe, Senior Director FP&A — US Commercial',
        message: '"FDA has released the IRA negotiated price for XTANDI — the final cut vs. list price is still uncertain but our base case is 5pp. Can you re-run the Core OP and Core EPS sensitivity model under a favorable (3pp), base (5pp), and adverse (8pp) outcome? I need the full read-out with SMT offset for the CFO before the Pfizer commercial call at noon. FX baseline ¥151/USD."',
    },
    steps: [
        {
            time: '9:47:01',
            agent: 'The Team Lead',
            agentColor: '#000000',
            agentBg: '#F0F0F0',
            icon: Brain,
            action: 'Reads & routes the request',
            detail: 'Parses Kenji\'s message. Identifies three tasks: (1) retrieve current XTANDI net sales baseline, Q1 FY26 Core OP actuals, and FY26 Core EPS guidance, (2) run three-scenario IRA price cut model (3pp, 5pp, 8pp) with Core OP and Core EPS impacts, (3) draft CFO-ready narrative with SMT savings as partial offset. Assigns each to the right specialist.',
            output: null,
        },
        {
            time: '9:47:03',
            agent: 'The Gatekeeper',
            agentColor: '#9F1239',
            agentBg: '#FFF1F2',
            icon: Shield,
            action: 'Validates source data',
            detail: 'Pulls current Astellas XTANDI metrics: Q1 FY26 XTANDI net sales ¥246.0B [CITED: ALPMY-IR-Q1-26]; FY25 XTANDI net sales ¥960.8B [CITED: ALPMY-AR-FY25]; Core OP sensitivity ¥9.6B per 1pp IRA price cut [CITED: ALPMY-IR-FY25]; FY26 Core EPS guidance ¥250 [CITED: ALPMY-GD-FY26]; ~4,400M diluted shares [CITED: ALPMY-AR-FY25]. Tags each value before passing downstream.',
            output: '5 values cited · 0 gaps · SMT savings ¥40B FY26 target confirmed as partial offset',
        },
        {
            time: '9:47:06',
            agent: 'The Number Cruncher',
            agentColor: '#0070C0',
            agentBg: '#EFF6FF',
            icon: BarChart2,
            action: 'Runs the IRA price cut sensitivity model',
            detail: 'Applies Astellas disclosed IRA sensitivity: each 1pp price cut ≈ –¥9.6B Core OP annually (derived from XTANDI US revenue share and gross margin structure). Builds three scenarios: (A) Favorable (3pp cut — light negotiation outcome, formulary maintained), (B) Base case (5pp cut — aligned to management guidance scenario), (C) Adverse (8pp cut — maximum negotiated price reduction). SMT savings ¥40B FY26 run-rate applied as structural partial offset across all scenarios.',
            output: null,
        },
        {
            time: '9:47:11',
            agent: 'The Number Cruncher',
            agentColor: '#0070C0',
            agentBg: '#EFF6FF',
            icon: RefreshCw,
            action: 'Data science layer — Monte Carlo simulation',
            detail: 'Runs 10,000 iterations randomising IRA negotiated price outcome, FY26 XTANDI volume trajectory, yen/USD rate vs. ¥151 baseline (±¥5 range), and SMT savings realization rate. Surfaces probability distribution for FY26 and FY27 Core EPS under each scenario — not just a single-point estimate.',
            output: 'Favorable (3pp cut): FY26 Core EPS –¥4.9 vs. plan · Core OP –¥28.8B · Above guidance midpoint\nBase case (5pp cut): FY26 Core EPS –¥8.2 vs. plan · Core OP –¥48.0B · Near guidance floor\nAdverse (8pp cut): FY26 Core EPS –¥13.1 vs. plan · Core OP –¥76.8B · Below guidance floor',
        },
        {
            time: '9:47:18',
            agent: 'The Watchdog',
            agentColor: '#B45309',
            agentBg: '#FFFBEB',
            icon: AlertTriangle,
            action: 'Flags three threshold breaches',
            detail: 'Compares model outputs against Astellas FY26 Core EPS guidance ¥250 and Core OP guidance ¥580B. The base case 5pp scenario approaches the Core EPS guidance floor; the 8pp adverse scenario breaches it and pushes Core OP below ¥500B. Watchdog logs three severity flags and prepares alert payloads.',
            output: '⚠ Base case (5pp): Core OP approaches ¥532B — guidance floor monitoring activated\n🔴 Adverse (8pp): Core EPS falls to ¥237 — below FY26 guidance ¥250\n⚠ Adverse (8pp): Core OP –¥76.8B — exceeds SMT offset capacity; CFO escalation triggered',
        },
        {
            time: '9:47:21',
            agent: 'The Storyteller',
            agentColor: '#7C3AED',
            agentBg: '#F5F3FF',
            icon: MessageSquare,
            action: 'Writes the CFO briefing narrative',
            detail: 'Drafts three scenario summaries in plain English, an exec headline, a risk call-out, and a recommended action sentence — all anchored to the cited source values. No invented numbers. No vague hedging.',
            output: '"Under an adverse 8pp IRA cut, FY26 Core EPS falls to ¥237 (–5.2% vs. guidance), partially offset by SMT ¥40B savings. Pfizer/Astellas joint defense targeting ≤5pp cut. Recommend reaffirming defense strategy and modeling FX tailwind scenarios as natural hedge against IRA headwind."',
        },
        {
            time: '9:47:24',
            agent: 'The Team Lead',
            agentColor: '#000000',
            agentBg: '#F0F0F0',
            icon: Sparkles,
            action: 'Assembles and publishes the full output',
            detail: 'Combines model results, alert flags, and narrative into a structured response. Pushes updated projections to the Scenario Modeling dashboard, populates the EPM bridge walk with Core OP deltas by IRA scenario, and queues the narrative for the Executive Summary.',
            output: null,
        },
        {
            time: '9:47:26',
            agent: 'Dashboards update',
            agentColor: '#065F46',
            agentBg: '#ECFDF5',
            icon: RefreshCw,
            action: 'Three pages refresh automatically',
            detail: 'Scenario Modeling → three IRA scenario tabs populated with Core OP and Core EPS probability ranges. EPM Bridge Walk → XTANDI IRA bar re-drawn with price cut sensitivity delta. Executive Summary → XTANDI franchise section refreshes with updated Core EPS projections.',
            output: null,
        },
        {
            time: '9:47:28',
            agent: 'Alert fires',
            agentColor: '#B45309',
            agentBg: '#FFFBEB',
            icon: Zap,
            action: 'Kenji receives the notification',
            detail: '"Scenario analysis complete — XTANDI IRA sensitivity model updated. 3 attention flags raised (2 Core EPS threshold, 1 Core OP risk). Narrative ready for CFO review. Dashboards live." Total elapsed: 27 seconds.',
            output: null,
        },
        {
            time: '9:51 AM',
            agent: 'Kenji Watanabe, Senior Director FP&A',
            agentColor: '#374151',
            agentBg: '#F3F4F6',
            icon: Eye,
            action: 'Human review — 4 minutes',
            detail: 'Kenji opens the Scenario Modeling page. Adjusts one assumption: the SMT savings offset should reflect a 90-day implementation lag for the Q2 FY26 tranche, not the full run-rate from Q1. He edits that input, the model re-runs in seconds, narratives update. He approves the output and forwards the briefing to the CFO.',
            output: 'CFO briefing delivered by 9:55 AM — 65 minutes ahead of Pfizer commercial call.',
        },
    ],
    outcomes: [
        { icon: Clock, label: 'Agent work time', value: '27 seconds', sub: 'From request to published output', color: '#000000' },
        { icon: TrendingDown, label: 'Scenarios modeled', value: '3 outcomes × 10,000 simulations', sub: 'Favorable (3pp), base (5pp), adverse (8pp) — probabilistic', color: '#0070C0' },
        { icon: CheckCircle, label: 'Delivered to CFO', value: '65 min early', sub: 'Human review took 4 minutes', color: '#065F46' },
    ],
    analysisSummary: {
        headline: 'XTANDI IRA Price Cut Sensitivity — AI Briefing',
        generated: 'Generated 9:47:28 AM · 27-second agent run',
        sections: [
            {
                title: 'Request Overview',
                items: [
                    { label: 'Requested by', value: 'Kenji Watanabe, Senior Director FP&A US Commercial — 9:47 AM' },
                    { label: 'Trigger event', value: 'IRA Medicare negotiated price for XTANDI — final cut vs. list price pending' },
                    { label: 'Scope', value: 'Core OP and Core EPS impact under 3 IRA price cut outcomes (3pp, 5pp, 8pp)' },
                    { label: 'Sensitivity applied', value: 'Each 1pp IRA cut ≈ –¥9.6B Core OP annually · SMT ¥40B FY26 run-rate applied as partial offset [CITED: ALPMY-IR-FY25]' },
                ],
            },
            {
                title: 'Scenario Results (10,000-Iteration Monte Carlo)',
                items: [
                    { label: 'Favorable (3pp cut)', value: 'Core OP –¥28.8B · Core EPS –¥4.9 vs. guidance · Above ¥245 plan floor' },
                    { label: 'Base case (5pp cut)', value: 'Core OP –¥48.0B · Core EPS –¥8.2 vs. guidance · Near guidance floor' },
                    { label: 'Adverse (8pp cut)', value: 'Core OP –¥76.8B · Core EPS –¥13.1 vs. guidance · Below ¥250 guidance' },
                    { label: 'SMT offset', value: 'SMT ¥40B savings program provides ~¥6.8 Core EPS buffer in adverse scenario [CITED: ALPMY-IR-FY25]' },
                ],
            },
            {
                title: 'Watchdog Alert Flags',
                items: [
                    { label: '⚠ Base case (5pp)', value: 'Core OP approaches guidance floor — monitoring activated' },
                    { label: '🔴 Adverse (8pp)', value: 'Core EPS falls to ¥237 — below FY26 guidance ¥250' },
                    { label: '⚠ Core OP (8pp)', value: 'Adverse Core OP –¥76.8B exceeds SMT offset capacity — CFO escalation triggered' },
                ],
            },
            {
                title: 'CFO Briefing Narrative (Storyteller)',
                items: [
                    { label: 'Key finding', value: 'Under 8pp adverse IRA cut, FY26 Core EPS falls to ¥237 (–5.2% vs. ¥250 guidance), partially offset by SMT ¥40B savings' },
                    { label: 'Partial offset', value: 'SMT savings ¥40B + potential FX tailwind (¥161/USD scenario: +¥21B Core OP) as natural hedge' },
                    { label: 'Recommendation', value: 'Reaffirm Pfizer/Astellas joint IRA defense strategy targeting ≤5pp; model FX tailwind as partial hedge' },
                    { label: 'Delivered to CFO', value: '9:55 AM — 65 minutes ahead of Pfizer commercial call' },
                ],
            },
        ],
    },
};

// ── Scenario 2: FX Adverse Move — Core EPS Impact ───────────────────────────

const hubDisruptionScenario = {
    id: 'disruption',
    label: 'FX Adverse Move — Core EPS Impact',
    tagline: 'Yen appreciation from ¥151 to ¥141/USD — three-magnitude scenario for Core OP and Core EPS',
    triggerIcon: Zap,
    triggerIconColor: '#065F46',
    scenario: 'FX Adverse Move — Core OP & Core EPS Impact Analysis',
    trigger: {
        time: '11:23 AM',
        who: 'Yuki Mori, Director Treasury & FX Risk',
        message: '"USD/JPY spot has moved to ¥141 intraday — 10 yen stronger than our ¥151 plan. Most of our revenue is USD-denominated (US segment >40% of revenue) and we hedge only 50% of near-term exposure. Can you model the Core OP and Core EPS impact under –5 yen (¥146), –10 yen (¥141), and –15 yen (¥136) adverse FX scenarios, netting our hedge position? I need the full read-out with PADCEV volume offset potential for the Treasurer before the Tokyo FX desk call at noon."',
    },
    steps: [
        {
            time: '11:23:01',
            agent: 'The Team Lead',
            agentColor: '#000000',
            agentBg: '#F0F0F0',
            icon: Brain,
            action: 'Reads & routes the request',
            detail: 'Parses Yuki\'s message. Identifies four tasks: (1) retrieve FX sensitivity baseline and hedge coverage ratios, (2) model Core OP and Core EPS under three adverse FX scenarios, (3) evaluate PADCEV volume upside as a structural offset narrative, (4) draft Treasurer-ready FX impact brief. Assigns each to the right specialist.',
            output: null,
        },
        {
            time: '11:23:03',
            agent: 'The Gatekeeper',
            agentColor: '#9F1239',
            agentBg: '#FFF1F2',
            icon: Shield,
            action: 'Validates source data',
            detail: 'Pulls current Astellas FX baseline and sensitivity: FY26 plan FX rate ¥151/USD [CITED: ALPMY-GD-FY26]; Core OP sensitivity ¥2.1B per ¥1 yen appreciation [CITED: ALPMY-IR-FY25]; US segment FY25 revenue ¥940.2B (~44% of total) [CITED: ALPMY-AR-FY25]; hedge coverage ratio 50% of USD near-term exposure [CITED: ALPMY-IR-FY25]; FY26 Core EPS guidance ¥250; ~4,400M diluted shares [CITED: ALPMY-AR-FY25]. Tags each value before passing downstream.',
            output: '5 values cited · 0 gaps · Hedge coverage ratio confirmed · Net (unhedged) sensitivity: ¥1.05B Core OP per ¥1 move',
        },
        {
            time: '11:23:07',
            agent: 'The Number Cruncher',
            agentColor: '#0070C0',
            agentBg: '#EFF6FF',
            icon: BarChart2,
            action: 'Builds the FX adverse impact model',
            detail: 'Applies Astellas disclosed FX sensitivity: ¥2.1B Core OP per ¥1 yen appreciation (gross), then applies 50% hedge coverage to compute the net unhedged sensitivity of ¥1.05B Core OP per ¥1. Builds three scenarios: (A) Mild adverse move (¥146 — 5 yen appreciation), (B) Base adverse (¥141 — 10 yen appreciation, current spot), (C) Severe adverse (¥136 — 15 yen appreciation). Converts Core OP impact to Core EPS using 4,400M diluted shares.',
            output: null,
        },
        {
            time: '11:23:12',
            agent: 'The Number Cruncher',
            agentColor: '#0070C0',
            agentBg: '#EFF6FF',
            icon: RefreshCw,
            action: 'Models three FX scenarios with hedge netting',
            detail: 'Runs three-scenario model. Net Core OP exposure (unhedged portion) = ¥1.05B per ¥1. Calculates Core EPS impact: Core OP delta (¥B) × 1,000 ÷ 4,400M shares. Layers PADCEV volume upside scenario as partial structural offset — PADCEV +34.8% growth trajectory could provide +¥33.0B Core OP buffer if sustained through FY26.',
            output: 'Mild (¥146, –5 yen): Core OP –¥5.25B · Core EPS –¥1.2 vs. plan · Guidance maintained\nBase (¥141, –10 yen): Core OP –¥10.5B · Core EPS –¥2.4 vs. plan · Guidance floor approached\nSevere (¥136, –15 yen): Core OP –¥15.75B · Core EPS –¥3.6 vs. plan · Below guidance floor ¥250',
        },
        {
            time: '11:23:18',
            agent: 'The Watchdog',
            agentColor: '#B45309',
            agentBg: '#FFFBEB',
            icon: AlertTriangle,
            action: 'Flags three threshold breaches',
            detail: 'Compares scenario outputs against FY26 Core EPS guidance ¥250 and Core OP guidance ¥580B. The base ¥141 scenario pushes Core EPS to ¥247.6 (below guidance ¥250). The severe ¥136 scenario breaches Core OP guidance floor. Watchdog logs three severity flags and prepares alert payloads.',
            output: '⚠ Base (¥141): Core EPS ¥247.6 — falls below FY26 guidance ¥250 · Guidance risk activated\n🔴 Severe (¥136): Core EPS ¥246.4 · Core OP –¥15.75B — Core OP guidance floor at risk\n⚠ Severe (¥136): PADCEV volume offset required ≥¥15.75B Core OP — execution dependency elevated',
        },
        {
            time: '11:23:22',
            agent: 'The Number Cruncher',
            agentColor: '#0070C0',
            agentBg: '#EFF6FF',
            icon: GitMerge,
            action: 'Evaluates three mitigation paths',
            detail: 'Models three response strategies with quantified Core OP recovery. Path A — extend hedge coverage from 50% to 75% for Q3–Q4 FY26 USD receivables: reduces net ¥1.05B sensitivity to ~¥0.53B per ¥1, effective within 10-day treasury execution window. Path B — accelerate PADCEV US formulary wins to capture additional ~¥8B Core OP upside in H2 FY26. Path C — invoke SMT contingency tranche: ¥5B discretionary SG&A deferral, executable within one quarter if FX sustained.',
            output: 'Path A (Hedge Extension): reduces FX sensitivity by ~50% · 10-day execution · Treasurer approval required\nPath B (PADCEV Volume Pull-Forward): +¥8B Core OP recovery · Requires commercial plan update · Q3 execution\nPath C (SMT Contingency Tranche): +¥5B Core OP offset · 1-quarter execution · CFO approval required\nRecommended: Path A immediately + Path C if ¥136 sustained >30 days',
        },
        {
            time: '11:23:26',
            agent: 'The Storyteller',
            agentColor: '#7C3AED',
            agentBg: '#F5F3FF',
            icon: MessageSquare,
            action: 'Drafts the FX impact & mitigation brief',
            detail: 'Writes a structured executive narrative: scenario summary, quantified Core OP and Core EPS impact by FX level, hedge position and extension option, PADCEV and SMT offsets, and the recommended mitigation sequence — all anchored to cited source values.',
            output: '"At ¥141/USD (current spot), unhedged Core OP exposure is –¥10.5B, reducing Core EPS to ¥247.6 — modestly below FY26 guidance ¥250. Extending hedge coverage from 50% to 75% within 10 days halves net sensitivity. PADCEV volume trajectory and ¥5B SMT contingency tranche provide structural offsets if yen remains adverse through H2."',
        },
        {
            time: '11:23:29',
            agent: 'The Team Lead',
            agentColor: '#000000',
            agentBg: '#F0F0F0',
            icon: Sparkles,
            action: 'Assembles and publishes full output',
            detail: 'Combines impact model, mitigation analysis, and narrative. Routes updated projections to Scenario Modeling (three FX scenario tabs with Core OP and Core EPS bands), pushes three threshold flags to AI Alerts, and queues the impact brief for Executive Summary risk-section review.',
            output: null,
        },
        {
            time: '11:23:31',
            agent: 'Dashboards update',
            agentColor: '#065F46',
            agentBg: '#ECFDF5',
            icon: RefreshCw,
            action: 'Three pages refresh automatically',
            detail: 'Scenario Modeling → three FX scenario tabs with Core OP, Core EPS, and hedge coverage sensitivity ranges. AI Alerts → three new threshold flags (Core EPS guidance, Core OP floor, PADCEV execution dependency). Executive Summary → FX risk section updated with adverse move model and mitigation paths.',
            output: null,
        },
        {
            time: '11:23:33',
            agent: 'Alert fires',
            agentColor: '#B45309',
            agentBg: '#FFFBEB',
            icon: Zap,
            action: 'Yuki receives the notification',
            detail: '"FX impact model complete — adverse move analyzed across 3 scenarios with 3 mitigation paths. 3 attention flags raised. Hedge extension, PADCEV offset, and SMT contingency paths ranked by Core OP recovery and execution speed. Dashboards live." Total elapsed: 30 seconds.',
            output: null,
        },
        {
            time: '11:27 AM',
            agent: 'Yuki Mori, Director Treasury & FX Risk',
            agentColor: '#374151',
            agentBg: '#F3F4F6',
            icon: Eye,
            action: 'Human review — 4 minutes',
            detail: 'Yuki opens the Scenario Modeling page. Reviews the three FX scenario tabs. Adjusts one assumption: the hedge extension cost (option premium) should be factored into the Path A Core OP recovery estimate — adds ¥0.3B option cost to reduce net recovery to ¥5.25B at full extension. He edits the input, model re-runs in seconds. Approves output and forwards the brief to the Treasurer for the Tokyo FX desk call.',
            output: 'Hedge extension cost incorporated · Model updated · Treasurer brief forwarded — 38 minutes ahead of Tokyo FX desk call.',
        },
    ],
    outcomes: [
        { icon: Clock, label: 'Agent work time', value: '30 seconds', sub: 'From request to published dashboards', color: '#000000' },
        { icon: TrendingDown, label: 'Scenarios modeled', value: '3 FX levels × 3 mitigation paths', sub: '–¥1.2 Core EPS (mild) to –¥3.6 (severe)', color: '#065F46' },
        { icon: CheckCircle, label: 'Alerts surfaced', value: '3 flags raised', sub: 'Core EPS guidance, Core OP floor, PADCEV dependency', color: '#0070C0' },
    ],
    analysisSummary: {
        headline: 'FX Adverse Move — Core OP & Core EPS Impact Brief',
        generated: 'Generated 11:23:33 AM · 30-second agent run',
        sections: [
            {
                title: 'Scenario Overview',
                items: [
                    { label: 'Event', value: 'USD/JPY spot at ¥141 — 10 yen adverse vs. ¥151/USD plan baseline' },
                    { label: 'Gross sensitivity', value: '¥2.1B Core OP per ¥1 yen appreciation [CITED: ALPMY-IR-FY25]' },
                    { label: 'Net sensitivity (50% hedged)', value: '¥1.05B Core OP per ¥1 net exposure · Core EPS ¥0.24 per ¥1 move' },
                    { label: 'Partial offset', value: 'PADCEV +34.8% growth trajectory: potential +¥8B Core OP structural offset' },
                ],
            },
            {
                title: 'Impact by FX Level',
                items: [
                    { label: 'Mild (¥146, –5 yen)', value: 'Core OP –¥5.25B · Core EPS –¥1.2 vs. plan · Guidance maintained' },
                    { label: 'Base (¥141, –10 yen)', value: 'Core OP –¥10.5B · Core EPS –¥2.4 vs. plan · Below guidance ¥250' },
                    { label: 'Severe (¥136, –15 yen)', value: 'Core OP –¥15.75B · Core EPS –¥3.6 vs. plan · Core OP guidance floor at risk' },
                ],
            },
            {
                title: 'Mitigation Path Summary',
                items: [
                    { label: 'Path A — Hedge Extension (50%→75%)', value: 'Halves net sensitivity · –¥0.3B option cost · 10-day execution · Treasurer approval required' },
                    { label: 'Path B — PADCEV Volume Pull-Forward', value: '+¥8B Core OP recovery · Commercial plan update · Q3 FY26 execution' },
                    { label: 'Path C — SMT Contingency Tranche', value: '+¥5B Core OP offset · 1-quarter execution · CFO approval required' },
                    { label: 'Recommended', value: 'Path A immediately + Path C if ¥136 sustained >30 days' },
                ],
            },
            {
                title: 'Alert Flags',
                items: [
                    { label: '⚠ Base (¥141)', value: 'Core EPS ¥247.6 — below FY26 guidance ¥250 · Guidance risk activated' },
                    { label: '🔴 Severe (¥136)', value: 'Core OP –¥15.75B · Core EPS ¥246.4 — Core OP guidance floor at risk' },
                    { label: '⚠ PADCEV dependency', value: 'Severe scenario requires ≥¥15.75B volume offset — execution dependency elevated' },
                ],
            },
        ],
    },
};

// ── Scenario 3: Month-End Close ──────────────────────────────────────────────

const monthEndScenario = {
    id: 'monthend',
    label: 'Month-End Close & Variance Escalation',
    tagline: 'Agentic close automates reconciliation, escalates policy breaches, and routes human approvals',
    triggerIcon: CalendarDays,
    triggerIconColor: '#065F46',
    scenario: 'Month-End Close — Variance Reconciliation & Approval Workflow',
    trigger: {
        time: 'Day 1, 7:00 AM',
        who: 'Jordan Walsh, Controller',
        message: '"It\'s the first business day of close. Pull actuals from the sub-ledgers, reconcile against March plan, flag anything that breaches our variance policy (>¥5B or >5% on any P&L line), and get me a draft close commentary package by end of day. Anything over threshold needs a finance owner assigned before I can sign off."',
    },
    steps: [
        {
            time: 'Day 1, 7:00:01',
            agent: 'The Team Lead',
            agentColor: '#000000',
            agentBg: '#F0F0F0',
            icon: Brain,
            action: 'Reads & structures the close workflow',
            detail: 'Parses the close brief. Decomposes into four concurrent workstreams: (1) ingest and validate March actuals, (2) reconcile P&L actuals vs. plan across all 18 line items, (3) identify policy-breach variances and assign owners, (4) draft close commentary package. Sequences tasks to minimise elapsed time — validation runs first.',
            output: null,
        },
        {
            time: 'Day 1, 7:00:04',
            agent: 'The Gatekeeper',
            agentColor: '#9F1239',
            agentBg: '#FFF1F2',
            icon: Shield,
            action: 'Ingests & validates trial balance data',
            detail: 'Pulls March actuals from the GL trial balance, accounts payable sub-ledger, and payroll system. Validates: (a) all accounts roll up to the control total, (b) intercompany eliminations net to zero, (c) prior-month closing entries are posted. Tags every value [CITED: GL-March-26] or [DERIVED] before passing to the reconciliation layer.',
            output: '18 P&L lines ingested · 0 out-of-balance conditions · 2 intercompany entries flagged for verification · All values cited',
        },
        {
            time: 'Day 1, 7:00:09',
            agent: 'The Number Cruncher',
            agentColor: '#0070C0',
            agentBg: '#EFF6FF',
            icon: BarChart2,
            action: 'Reconciles actuals vs. plan across all 18 P&L lines',
            detail: 'Computes variance (¥B and %) for each line item: total revenue, US net sales, Established Markets net sales, Japan net sales, International Markets net sales, China net sales, XTANDI net sales, PADCEV net sales, cost of sales (3 sub-lines), R&D expense (4 sub-lines), SG&A (4 sub-lines), D&A, and Core operating income. Applies the policy matrix: absolute threshold ¥5B, percentage threshold 5%, with a combined test for lines with a base below ¥20B.',
            output: null,
        },
        {
            time: 'Day 1, 7:00:14',
            agent: 'The Watchdog',
            agentColor: '#B45309',
            agentBg: '#FFFBEB',
            icon: AlertTriangle,
            action: 'Applies variance policy — flags 4 breach items',
            detail: 'Evaluates each variance against policy thresholds. Identifies 4 lines that exceed escalation criteria. Scores each by severity (dollar magnitude × strategic significance). Prepares structured escalation payloads — each includes the line item, actual vs. plan, variance $M and %, the prior-period comparable, and a suggested finance owner from org-chart mapping.',
            output: '🔴 R&D Expense: +¥8.2B vs. plan (+5.6%) — accelerated VYLOY Phase 3 enrollment and PADCEV MIBC study\n🔴 XTANDI US Net Sales: -¥6.5B vs. plan (-2.8%) — channel inventory destocking in Q-end\n⚠ SG&A: +¥5.3B vs. plan (+6.1%) — PADCEV EU launch costs above plan\n⚠ Japan Net Sales: -¥5.1B vs. plan (-5.5%) — NHI revision timing vs. plan assumption\n4 items require finance owner assignment before close sign-off',
        },
        {
            time: 'Day 1, 7:00:19',
            agent: 'The Team Lead',
            agentColor: '#000000',
            agentBg: '#F0F0F0',
            icon: Users,
            action: 'Routes escalations to finance owners',
            detail: 'Sends structured escalation notifications to the responsible finance owners: R&D Finance (accelerated enrollment costs), US Commercial Finance (XTANDI channel inventory), International Finance (PADCEV EU launch SG&A), Japan Finance (NHI revision timing). Each owner receives: variance detail, policy threshold exceeded, commentary draft due time, and a direct link to the EPM variance bridge in Finance360.',
            output: '4 escalations routed · Response SLA: 4 hours · EPM bridge links pre-populated in each notification',
        },
        {
            time: 'Day 1, 7:00:22',
            agent: 'The Storyteller',
            agentColor: '#7C3AED',
            agentBg: '#F5F3FF',
            icon: MessageSquare,
            action: 'Drafts close commentary for all 18 lines',
            detail: 'Writes variance explanations for every P&L line — brief factual narratives for in-policy lines, extended causal-chain explanations with a forward look for the 4 escalated items. For escalated lines, inserts a [PENDING OWNER REVIEW] placeholder so the package is structurally complete and awaiting human input before sign-off.',
            output: '14 lines: commentary drafted and ready for Controller review\n4 lines: draft commentary with [PENDING OWNER REVIEW] placeholder\nAll values anchored to cited GL actuals — no estimated figures',
        },
        {
            time: 'Day 1, 11:34 AM',
            agent: 'Finance Owners',
            agentColor: '#374151',
            agentBg: '#F3F4F6',
            icon: Eye,
            action: 'Finance owners provide input — 4.5 hrs',
            detail: 'Three of four finance owners submit commentary directly in Finance360. The R&D Finance owner requests a change: the R&D expense overrun should be split into two sub-components — accelerated VYLOY Phase 3 enrollment (¥5.1B) vs. PADCEV MIBC study start-up costs (¥3.1B) — to give the CFO a cleaner picture. The revised breakdown is entered in the tool and triggers a commentary revision request back to the agents.',
            output: null,
        },
        {
            time: 'Day 1, 11:35:02',
            agent: 'The Number Cruncher',
            agentColor: '#0070C0',
            agentBg: '#EFF6FF',
            icon: RefreshCw,
            action: 'Incorporates human feedback — re-splits variance bridge',
            detail: 'Receives the sub-component breakdown from the finance owner: ¥5.1B VYLOY Phase 3 enrollment acceleration + ¥3.1B PADCEV MIBC study start-up = ¥8.2B total (validates against trial balance). Re-draws the EPM bridge walk to show the two bars separately. Propagates the split to the variance reconciliation table, the close report, and the bridge commentary simultaneously.',
            output: 'Bridge re-drawn: VYLOY Phase 3 Enrollment +¥5.1B · PADCEV MIBC Study Start-Up +¥3.1B\nReconciliation table updated · Close commentary flagged for revision · 3 surfaces synced in under 2 seconds',
        },
        {
            time: 'Day 1, 11:35:05',
            agent: 'The Storyteller',
            agentColor: '#7C3AED',
            agentBg: '#F5F3FF',
            icon: MessageSquare,
            action: 'Revises medical cost commentary with the owner\'s sub-split',
            detail: 'Replaces the [PENDING OWNER REVIEW] placeholder with a final narrative incorporating the owner\'s sub-component framing. Adds a forward-look sentence reflecting the owner\'s input on the non-recurring nature of the Phase 3 enrollment acceleration and the Q3 normalization expectation as VYLOY enrollment completes. Flags the revised line for Controller sign-off.',
            output: '"R&D Expense exceeded plan by ¥8.2B: ¥5.1B reflects accelerated VYLOY Phase 3 enrollment (non-recurring, enrollment completion expected Q2); ¥3.1B reflects PADCEV MIBC neoadjuvant Phase 3 study start-up costs ahead of original schedule — aligned to pipeline acceleration strategy." [READY FOR SIGN-OFF]',
        },
        {
            time: 'Day 1, 4:18 PM',
            agent: 'Jordan Walsh, Controller',
            agentColor: '#374151',
            agentBg: '#F3F4F6',
            icon: CheckCircle,
            action: 'Controller review & sign-off — 12 minutes',
            detail: 'Jordan opens the close package in Finance360. Reviews all 18 commentary lines — 14 pre-cleared from the standard reconciliation, 4 escalated lines now showing owner-reviewed commentary. Approves 3 of the 4 escalated items. For XTANDI US Net Sales, edits one phrase in-line: "channel mix" → "channel inventory destocking" for precision. Clicks "Approve & Sign Off" — the system writes an audit log with a timestamp, approver identity, and the exact version string of each approved commentary line.',
            output: 'Close package approved · Audit log written · All 18 lines signed off · In-line edit preserved in version history · Delivered 5:53 PM — ahead of 6:00 PM close deadline',
        },
    ],
    outcomes: [
        { icon: Clock, label: 'Agent work time', value: 'Under 25 seconds', sub: 'Full 18-line reconciliation + 4 escalations routed', color: '#000000' },
        { icon: AlertTriangle, label: 'Policy breaches surfaced', value: '4 items escalated', sub: '¥25.1B combined — all cleared with owner sign-off', color: '#B45309' },
        { icon: CheckCircle, label: 'Close package signed off', value: 'Ahead of deadline', sub: 'Audit trail written · Human edits preserved in log', color: '#065F46' },
    ],
    analysisSummary: {
        headline: 'Month-End Close — Variance Reconciliation Brief',
        generated: 'Generated Day 1, 7:00:22 AM · Under 25-second agent run',
        sections: [
            {
                title: 'Close Overview',
                items: [
                    { label: 'Close period', value: 'March 2026 — first business day of close cycle' },
                    { label: 'P&L lines reconciled', value: '18 lines · 100% coverage · 0 out-of-balance conditions' },
                    { label: 'Variance policy', value: '>¥5B absolute or >5% relative triggers finance owner escalation' },
                    { label: 'Data sourced', value: 'GL trial balance, AP sub-ledger, payroll system [CITED: GL-March-26]' },
                ],
            },
            {
                title: 'Policy Breach Items — Escalated to Finance Owners',
                items: [
                    { label: '🔴 R&D Expense', value: '+¥8.2B vs. plan (+5.6%) — accelerated VYLOY Phase 3 enrollment and PADCEV MIBC study start-up' },
                    { label: '🔴 XTANDI US Net Sales', value: '-¥6.5B vs. plan (-2.8%) — channel inventory destocking at quarter-end' },
                    { label: '⚠ SG&A', value: '+¥5.3B vs. plan (+6.1%) — PADCEV EU launch costs above plan' },
                    { label: '⚠ Japan Net Sales', value: '-¥5.1B vs. plan (-5.5%) — NHI revision timing vs. plan assumption' },
                ],
            },
            {
                title: 'Commentary & Owner Review Status',
                items: [
                    { label: 'In-policy lines (14)', value: 'Commentary drafted and staged for Controller review' },
                    { label: 'Escalated lines (4)', value: '[PENDING OWNER REVIEW] placeholder — owner SLA: 4 hours' },
                    { label: 'R&D cost sub-split (Day 1 revision)', value: 'VYLOY Phase 3 enrollment acceleration ¥5.1B + PADCEV MIBC study start-up ¥3.1B = ¥8.2B total — bridge re-drawn' },
                    { label: '3 surfaces synced', value: 'Bridge walk, reconciliation table, and commentary updated simultaneously in <2 seconds' },
                ],
            },
            {
                title: 'Controller Sign-Off Gate',
                items: [
                    { label: 'Sign-off status', value: 'All 18 lines approved — close package locked' },
                    { label: 'Signed off by', value: 'Jordan Walsh, Controller — Day 4, 4:18 PM (12 min review)' },
                    { label: 'Audit trail', value: 'Approver identity, timestamp, and exact commentary version logged for all 18 lines' },
                    { label: 'Delivered', value: '5:53 PM — 7 minutes ahead of 6:00 PM close deadline' },
                ],
            },
        ],
    },
};

const allScenarios = { fuel: fuelShockScenario, disruption: hubDisruptionScenario, monthend: monthEndScenario } as const;
type ScenarioKey = keyof typeof allScenarios;

const guardrails = [
    {
        icon: BookOpen,
        title: 'Every value has a source',
        desc: 'Numbers on this platform are tagged [CITED], [DERIVED], [INTERPOLATED], or [ASSUMED]. Cited values trace to a filed SEC document. Assumed values are clearly marked.',
        color: '#000000',
    },
    {
        icon: Eye,
        title: 'Humans stay in the loop',
        desc: 'AI generates; finance professionals approve. Commentary can be edited, flagged, or overridden at any time. No AI output goes to a meeting without a human sign-off.',
        color: '#065F46',
    },
    {
        icon: Lock,
        title: 'Confidence thresholds',
        desc: 'The Watchdog only fires an alert when a metric crosses a statistically meaningful threshold, not a rounding error. Low-confidence results surface as "estimated" not "actual."',
        color: '#9F1239',
    },
    {
        icon: FileText,
        title: 'Full audit trail',
        desc: 'Every AI-generated output logs which agent produced it, when, from which source data version. Finance teams can replay and re-generate any analysis.',
        color: '#7C3AED',
    },
    {
        icon: Users,
        title: 'Peer review before publish',
        desc: 'High-impact outputs (executive briefings, board-ready slides) go through a two-step review: AI draft → finance review → approval — matching existing governance workflows.',
        color: '#B45309',
    },
    {
        icon: Zap,
        title: 'Scope-limited agents',
        desc: 'Each agent is constrained to its own domain. The Storyteller writes narratives but cannot edit source data. The Watchdog flags but cannot change thresholds without human approval.',
        color: '#0070C0',
    },
];

// ─── Component ───────────────────────────────────────────────────────────────

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AIOverviewPage() {
    const [activeScenario, setActiveScenario] = useState<ScenarioKey>('fuel');
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
    const scenario = allScenarios[activeScenario];

    const toggleStep = (i: number) =>
        setExpandedSteps(prev => {
            const next = new Set(prev);
            next.has(i) ? next.delete(i) : next.add(i);
            return next;
        });

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* ── Hero ── */}
            <div className="bg-gradient-to-br from-[#000000] to-[#000000] text-white">
                <div className="max-w-6xl mx-auto px-6 py-14">
                    <motion.div initial="hidden" animate="show" variants={fade} transition={{ duration: 0.5 }}>
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-[#009AC7]" />
                            <span className="text-sm font-medium text-[#009AC7] uppercase tracking-widest">AI &amp; Agentic Capabilities</span>
                        </div>
                        <h1 className="text-4xl font-extrabold mb-4 leading-tight">
                            Meet the AI team<br />
                            <span className="text-[#009AC7]">working inside Astellas Finance360.</span>
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                            Behind every insight card, alert, and narrative on this platform, a team of specialised AI agents is doing the heavy lifting — reading filings, crunching numbers, writing plain-English summaries, and flagging anomalies — so your finance team can focus on decisions, not data prep.
                        </p>
                    </motion.div>

                    {/* Quick-stat bar */}
                    <motion.div
                        initial="hidden" animate="show" variants={fade} transition={{ duration: 0.5, delay: 0.15 }}
                        className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {[
                            { value: '6', label: 'Specialised agents' },
                            { value: '800+', label: 'AI-generated insights' },
                            { value: '25', label: 'Live anomaly monitors' },
                            { value: '100%', label: 'Source-cited outputs' },
                        ].map(s => (
                            <div key={s.label} className="bg-white/10 rounded-xl p-4 border border-white/10">
                                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                                <p className="text-xs text-white/50 mt-1">{s.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12 space-y-20">

                {/* ── Section 1: The Team ── */}
                <section>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} transition={{ duration: 0.4 }}>
                        <p className="text-xs font-bold text-[#000000] uppercase tracking-widest mb-1">Section 1</p>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">The AI team — six roles, one goal.</h2>
                        <p className="text-gray-500 text-sm max-w-2xl mb-8">Think of these agents like specialist team members. Each has a defined job, clear boundaries, and reports back to the orchestrator who coordinates the whole effort.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {agents.map((a, i) => {
                            const Icon = a.icon;
                            return (
                                <motion.div
                                    key={a.id}
                                    initial="hidden" whileInView="show" viewport={{ once: true }}
                                    variants={fade} transition={{ duration: 0.35, delay: i * 0.06 }}
                                    className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: a.bg }}>
                                            <Icon className="w-5 h-5" style={{ color: a.color }} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{a.name}</p>
                                            <p className="text-[11px] text-gray-400 font-medium">{a.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{a.plain}</p>
                                    <div className="mt-auto pt-3 border-t border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Powers</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {a.handles.map(h => (
                                                <span key={h} className="text-[10px] font-medium px-2 py-0.5 rounded-full border" style={{ color: a.color, borderColor: a.bg, backgroundColor: a.bg }}>
                                                    {h}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ── Section 2: How They Work Together ── */}
                <section>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} transition={{ duration: 0.4 }}>
                        <p className="text-xs font-bold text-[#000000] uppercase tracking-widest mb-1">Section 2</p>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">How a request moves through the team.</h2>
                        <p className="text-gray-500 text-sm max-w-2xl mb-8">Every time you load a dashboard or ask a question, this six-step sequence runs in the background — in seconds.</p>
                    </motion.div>

                    <div className="relative">
                        {/* connecting line */}
                        <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#000000] to-[#7C3AED] hidden md:block" />

                        <div className="space-y-4">
                            {workflowSteps.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial="hidden" whileInView="show" viewport={{ once: true }}
                                        variants={fade} transition={{ duration: 0.35, delay: i * 0.08 }}
                                        className="flex items-start gap-5 bg-white rounded-2xl border border-gray-200 p-5 md:ml-0"
                                    >
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-2 border-white shadow-sm" style={{ backgroundColor: step.color }}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-gray-400">STEP {i + 1}</span>
                                            </div>
                                            <p className="text-base font-bold text-gray-900">{step.label}</p>
                                            <p className="text-sm text-gray-500 mt-0.5">{step.sub}</p>
                                        </div>
                                        {i < workflowSteps.length - 1 && (
                                            <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-5 hidden md:block rotate-90" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Section 3: AI in the App ── */}
                <section>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} transition={{ duration: 0.4 }}>
                        <p className="text-xs font-bold text-[#000000] uppercase tracking-widest mb-1">Section 3</p>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Where AI shows up — right now.</h2>
                        <p className="text-gray-500 text-sm max-w-2xl mb-8">Every highlighted feature below is live and powered by the agent team. Click any card to go directly to that part of the app.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {appSpotlights.map((spot, i) => {
                            const Icon = spot.icon;
                            return (
                                <motion.a
                                    key={spot.page}
                                    href={spot.href}
                                    initial="hidden" whileInView="show" viewport={{ once: true }}
                                    variants={fade} transition={{ duration: 0.35, delay: i * 0.08 }}
                                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group block"
                                >
                                    {/* page header mock */}
                                    <div className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: spot.bg }}>
                                        <div className="flex items-center gap-2.5">
                                            <Icon className="w-5 h-5" style={{ color: spot.color }} />
                                            <span className="text-sm font-bold" style={{ color: spot.color }}>{spot.page}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: spot.color }}>
                                            <span>Open page</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>

                                    {/* mock content strip */}
                                    <div className="px-5 py-1 bg-gray-50 border-b border-gray-100 flex gap-1.5">
                                        {[60, 80, 55, 90].map((w, j) => (
                                            <div key={j} className="h-1.5 rounded-full bg-gray-200" style={{ width: `${w}px` }} />
                                        ))}
                                    </div>

                                    {/* AI feature list */}
                                    <div className="p-5 space-y-3">
                                        {spot.aiFeatures.map(f => (
                                            <div key={f.label} className="flex items-start gap-3">
                                                <div className="mt-0.5 shrink-0">
                                                    <CheckCircle className="w-4 h-4" style={{ color: spot.color }} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">{f.label}</p>
                                                    <p className="text-xs text-gray-500 leading-snug">{f.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* AI badge */}
                                    <div className="px-5 pb-4">
                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: spot.bg, color: spot.color }}>
                                            <Sparkles className="w-3 h-3" /> AI-powered
                                        </span>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>
                </section>

                {/* ── Section 4: Day in the Life ── */}
                <section>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} transition={{ duration: 0.4 }}>
                        <p className="text-xs font-bold text-[#000000] uppercase tracking-widest mb-1">Section 4 — AI in Action</p>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">A day in the life.</h2>
                        <p className="text-gray-500 text-sm max-w-2xl mb-6">
                            Follow a real request through the agent pipeline — from the first message to an executive-ready briefing. Choose a scenario to see how the team handles it.
                        </p>
                    </motion.div>

                    {/* ── Scenario Selector ── */}
                    <motion.div
                        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} transition={{ duration: 0.35 }}
                        className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
                    >
                        {(Object.values(allScenarios) as typeof fuelShockScenario[]).map(s => {
                            const TriggerIcon = s.triggerIcon;
                            const isActive = activeScenario === s.id;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => { setActiveScenario(s.id as ScenarioKey); setShowSummaryModal(false); setExpandedSteps(new Set()); }}
                                    className={`text-left rounded-2xl border-2 p-4 transition-all ${
                                        isActive
                                            ? 'border-[#000000] bg-[#F0F0F0] shadow-sm'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                                            style={{ backgroundColor: isActive ? `${s.triggerIconColor}20` : '#F3F4F6' }}
                                        >
                                            <TriggerIcon className="w-4 h-4" style={{ color: isActive ? s.triggerIconColor : '#9CA3AF' }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <p className={`text-sm font-bold truncate ${isActive ? 'text-[#000000]' : 'text-gray-700'}`}>
                                                    {s.label}
                                                </p>
                                                {isActive && (
                                                    <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#000000] text-white">
                                                        Viewing
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 leading-snug">{s.tagline}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Trigger card */}
                    <motion.div
                        key={`trigger-${activeScenario}`}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                        className="mb-6 bg-gradient-to-r from-[#000000] to-[#000000] rounded-2xl p-6 text-white"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                                <MousePointerClick className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Human trigger</span>
                                    <span className="text-xs font-mono text-white/40">{scenario.trigger.time}</span>
                                    <span className="text-xs font-medium text-[#009AC7]">{scenario.trigger.who}</span>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                                    <p className="text-sm text-white/90 leading-relaxed italic">{scenario.trigger.message}</p>
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                    {(() => { const TI = scenario.triggerIcon; return <TI className="w-3.5 h-3.5 text-amber-400" />; })()}
                                    <span className="text-xs text-amber-300 font-medium">Scenario: {scenario.scenario}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Timeline steps */}
                    <motion.div
                        key={`steps-${activeScenario}`}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.05 }}
                    >
                        <div className="relative">
                            <div className="absolute left-[31px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#000000] via-[#7C3AED] to-[#065F46]" />
                            <div className="space-y-2">
                                {scenario.steps.map((step, i) => {
                                    const Icon = step.icon;
                                    const isHuman = step.agent.includes('Sarah') || step.agent.includes('Marcus') || step.agent.includes('Priya') || step.agent.includes('Jordan') || step.agent === 'Finance Owners' || step.agent === 'Dashboards update' || step.agent === 'Alert fires';
                                    const isExpanded = expandedSteps.has(i);
                                    const hasOutput = !!step.output;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial="hidden" whileInView="show" viewport={{ once: true }}
                                            variants={fade} transition={{ duration: 0.3, delay: i * 0.04 }}
                                            className="flex gap-4"
                                        >
                                            {/* timeline dot */}
                                            <div className="w-16 shrink-0 flex flex-col items-center pt-3">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-white z-10 shrink-0" style={{ backgroundColor: step.agentColor }}>
                                                    <Icon className="w-3.5 h-3.5 text-white" />
                                                </div>
                                            </div>

                                            {/* accordion card */}
                                            <div className={`flex-1 mb-1 rounded-2xl border overflow-hidden transition-shadow ${isExpanded ? 'shadow-sm' : ''} ${isHuman ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'}`}>
                                                {/* header row — always visible, clickable */}
                                                <button
                                                    onClick={() => toggleStep(i)}
                                                    className={`w-full flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 text-left transition-colors ${isHuman ? 'hover:bg-gray-100/70' : 'hover:bg-gray-50'}`}
                                                >
                                                    <span className="text-[10px] font-mono text-gray-400 shrink-0">{step.time}</span>
                                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: step.agentBg, color: step.agentColor }}>
                                                        {step.agent}
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-700 flex-1 min-w-0">{step.action}</span>
                                                    <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                                                        {hasOutput && !isExpanded && (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Has output" />
                                                        )}
                                                        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                                                    </div>
                                                </button>

                                                {/* expandable body */}
                                                <AnimatePresence initial={false}>
                                                    {isExpanded && (
                                                        <motion.div
                                                            key="body"
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.22, ease: 'easeInOut' }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className={`px-4 pb-4 border-t ${isHuman ? 'border-gray-200' : 'border-gray-100'}`}>
                                                                <p className="text-sm text-gray-600 leading-relaxed pt-3">{step.detail}</p>
                                                                {step.output && (
                                                                    <div className="mt-3 bg-gray-900 rounded-lg px-3 py-2">
                                                                        <p className="text-[11px] font-mono text-emerald-400 whitespace-pre-line leading-relaxed">{step.output}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Outcome summary */}
                    <motion.div
                        key={`outcomes-${activeScenario}`}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
                        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        {scenario.outcomes.map(s => {
                            const Icon = s.icon;
                            return (
                                <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.color}15` }}>
                                        <Icon className="w-5 h-5" style={{ color: s.color }} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{s.label}</p>
                                        <p className="text-sm font-bold text-gray-900">{s.value}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Analysis Summary button — shown for all scenarios */}
                    <motion.div
                        key={`summary-btn-${activeScenario}`}
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.2 }}
                        className="mt-5 flex justify-center"
                    >
                        <button
                            onClick={() => setShowSummaryModal(true)}
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#000000] text-white text-sm font-semibold shadow-md hover:bg-[#1A1A1A] transition-all"
                        >
                            <FileText className="w-4 h-4" />
                            View AI Analysis Brief
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </section>

                {/* ── Analysis Summary Modal ── */}
                {showSummaryModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowSummaryModal(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal header */}
                            <div className="sticky top-0 bg-gradient-to-r from-[#000000] to-[#000000] text-white rounded-t-2xl px-6 py-5 flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Sparkles className="w-4 h-4 text-[#009AC7]" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#009AC7]">AI Analysis Brief</span>
                                    </div>
                                    <h3 className="text-base font-bold leading-snug">{scenario.analysisSummary.headline}</h3>
                                    <p className="text-xs text-white/50 mt-0.5">{scenario.analysisSummary.generated}</p>
                                </div>
                                <button onClick={() => setShowSummaryModal(false)} className="ml-4 p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0">
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className="p-6 space-y-5">
                                {scenario.analysisSummary.sections.map((section, si) => (
                                    <div key={si}>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{section.title}</h4>
                                        <div className="rounded-xl border border-gray-200 overflow-hidden">
                                            {section.items.map((item, ii) => (
                                                <div key={ii} className={`flex items-start gap-3 px-4 py-3 ${ii < section.items.length - 1 ? 'border-b border-gray-100' : ''} ${ii % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}>
                                                    <span className="text-xs font-semibold text-gray-500 w-44 shrink-0 pt-0.5">{item.label}</span>
                                                    <span className="text-sm text-gray-800 leading-snug">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-100">
                                    All values tagged [CITED], [DERIVED], or [ASSUMED]. {scenario.analysisSummary.generated}. Generated by the Astellas Finance360 agentic team.
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* ── Section 5: Guardrails ── */}
                <section>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} transition={{ duration: 0.4 }}>
                        <p className="text-xs font-bold text-[#000000] uppercase tracking-widest mb-1">Section 5</p>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Six guardrails keeping the data honest.</h2>
                        <p className="text-gray-500 text-sm max-w-2xl mb-8">AI moves fast. These controls make sure it moves accurately — and that your finance team stays in charge.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {guardrails.map((g, i) => {
                            const Icon = g.icon;
                            return (
                                <motion.div
                                    key={g.title}
                                    initial="hidden" whileInView="show" viewport={{ once: true }}
                                    variants={fade} transition={{ duration: 0.35, delay: i * 0.06 }}
                                    className="bg-white rounded-2xl border border-gray-200 p-5"
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${g.color}15` }}>
                                        <Icon className="w-5 h-5" style={{ color: g.color }} />
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 mb-2">{g.title}</p>
                                    <p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ── Closing CTA ── */}
                <motion.section
                    initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} transition={{ duration: 0.4 }}
                    className="bg-gradient-to-br from-[#000000] to-[#000000] rounded-3xl p-10 text-white text-center"
                >
                    <Sparkles className="w-8 h-8 text-[#009AC7] mx-auto mb-4" />
                    <h3 className="text-2xl font-extrabold mb-3">The agents work. You decide.</h3>
                    <p className="text-white/70 max-w-xl mx-auto text-sm leading-relaxed mb-8">
                        Every AI output in Finance360 is a starting point, not a final answer. The system surfaces what matters; your finance team determines what it means and what to do about it.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {[
                            { label: 'Executive Summary', href: '/executive-summary' },
                            { label: 'Commentary', href: '/commentary' },
                            { label: 'AI Alerts', href: '/ai-alerts' },
                            { label: 'AI Search', href: '/ai-search' },
                        ].map(l => (
                            <a
                                key={l.label}
                                href={l.href}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-medium transition-colors"
                            >
                                {l.label}
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        ))}
                    </div>
                </motion.section>

            </div>
        </div>
    );
}
