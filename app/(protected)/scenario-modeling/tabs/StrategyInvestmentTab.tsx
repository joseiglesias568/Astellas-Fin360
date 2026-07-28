'use client';

import { strategic } from '@/config/clients/astellas/strategic';
import { CHART_COLORS, CHART_TOOLTIP_DARK, CHART_GRID_STYLE, CHART_AXIS_STYLE } from '@/lib/chart-theme';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle2,
    AlertTriangle,
    Clock,
    TrendingUp,
    Sparkles,
} from 'lucide-react';
import { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell,
    ComposedChart,
} from 'recharts';

interface StrategyInvestmentTabProps {
    leverValues: Record<string, number>;
    onLeverChange: (id: string, value: number) => void;
}

// ─── Calculation Engine ─────────────────────────────────────────────────────
function calculateXTANDIIRAImpact(values: Record<string, number>) {
    // IRA price discount: delta vs 25% base-case assumption
    // Each additional 1pp cut → –¥2.0B revenue, –¥1.4B Core OP (Medicare ~40% of US Rx at high margin)
    const iraDiscount    = values['xtandi-ira-discount-pct'] ?? 25;
    const iraDiscountDelta = iraDiscount - 25;
    const iraRevDelta    = -iraDiscountDelta * 2.0;  // ¥B; positive discount = adverse
    const iraCoreOpDelta = -iraDiscountDelta * 1.4;  // ¥B

    // XTANDI US TRx volume growth: delta vs 3% base
    // Each +1pp TRx growth on ~¥960B XTANDI base ≈ +¥8B revenue, +¥5.6B Core OP (70% margin)
    const trxGrowth    = values['xtandi-us-trx-growth'] ?? 3;
    const trxDelta     = trxGrowth - 3;
    const trxRevDelta  = trxDelta * 8.0;
    const trxCopDelta  = trxDelta * 5.6;

    // PADCEV 1L urothelial cancer penetration: delta vs 42% base
    // Each +1pp share on ~¥221B revenue base ≈ +¥3.4B revenue, +¥2.4B Core OP (70% GP margin)
    const padcevPenetration = values['padcev-market-penetration'] ?? 42;
    const padcevDelta       = padcevPenetration - 42;
    const padcevRevDelta    = padcevDelta * 3.4;
    const padcevCopDelta    = padcevDelta * 2.4;

    // Pfizer collaboration revenue: % of ~¥180B estimated collaboration base
    const pfizerAdj    = values['pfizer-collaboration-adjustment'] ?? 100;
    const pfizerBase   = 180.0;  // ¥B estimated annual Pfizer collaboration/royalty
    const pfizerRevDelta = pfizerBase * (pfizerAdj - 100) / 100;
    const pfizerCopDelta = pfizerRevDelta * 0.60;  // ~60% Core OP margin on collaboration

    // New indication revenue: delta vs ¥20B default
    const newIndRev      = values['new-indication-revenue'] ?? 20;
    const newIndRevDelta = newIndRev - 20.0;
    const newIndCopDelta = newIndRevDelta * 0.65;  // ~65% Core OP margin (high-margin new launches)

    // US Oncology SG&A efficiency: delta from –5% base; negative = favorable
    // Each –1pp improvement on ~¥200B US SG&A ≈ +¥2B Core OP
    const sgaEfficiency = values['us-oncology-sga-efficiency'] ?? -5;
    const sgaDelta      = sgaEfficiency - (-5);  // positive = worse than plan (more SG&A)
    const sgaCopDelta   = -sgaDelta * 2.0;       // negative sgaDelta = favorable to Core OP

    const totalRevenueDelta = iraRevDelta + trxRevDelta + padcevRevDelta + pfizerRevDelta + newIndRevDelta;
    const totalCoreOpDelta  = iraCopDelta + trxCopDelta + padcevCopDelta + pfizerCopDelta + newIndCopDelta + sgaCopDelta;
    const baseRevenue       = 2210.0;  // ¥B FY26 guidance
    const marginImpactBps   = Math.round((totalCoreOpDelta / baseRevenue) * 10000);

    return {
        totalRevenueDelta: parseFloat(totalRevenueDelta.toFixed(1)),
        totalCoreOpDelta:  parseFloat(totalCoreOpDelta.toFixed(1)),
        marginImpactBps,
        components: {
            iraRevDelta:    parseFloat(iraRevDelta.toFixed(1)),
            iraCoreOpDelta: parseFloat(iraCopDelta.toFixed(1)),
            trxRevDelta:    parseFloat(trxRevDelta.toFixed(1)),
            trxCopDelta:    parseFloat(trxCopDelta.toFixed(1)),
            padcevRevDelta: parseFloat(padcevRevDelta.toFixed(1)),
            padcevCopDelta: parseFloat(padcevCopDelta.toFixed(1)),
            pfizerRevDelta: parseFloat(pfizerRevDelta.toFixed(1)),
            pfizerCopDelta: parseFloat(pfizerCopDelta.toFixed(1)),
            newIndRevDelta: parseFloat(newIndRevDelta.toFixed(1)),
            newIndCopDelta: parseFloat(newIndCopDelta.toFixed(1)),
            sgaCopDelta:    parseFloat(sgaCopDelta.toFixed(1)),
        },
    };
}

export default function StrategyInvestmentTab({ leverValues, onLeverChange }: StrategyInvestmentTabProps) {
    const impact = useMemo(() => calculateXTANDIIRAImpact(leverValues), [leverValues]);

    // Strategic initiatives from Astellas config
    const initiatives = strategic.initiatives;

    // IRA discount bridge: show components contributing to Core OP delta
    const bridgeData = useMemo(() => [
        { name: 'IRA Discount', value: impact.components.iraCoreOpDelta, fill: impact.components.iraCoreOpDelta >= 0 ? CHART_COLORS.green : CHART_COLORS.red },
        { name: 'XTANDI TRx', value: impact.components.trxCopDelta, fill: impact.components.trxCopDelta >= 0 ? CHART_COLORS.green : CHART_COLORS.red },
        { name: 'PADCEV Share', value: impact.components.padcevCopDelta, fill: impact.components.padcevCopDelta >= 0 ? CHART_COLORS.green : CHART_COLORS.red },
        { name: 'Pfizer Collab', value: impact.components.pfizerCopDelta, fill: impact.components.pfizerCopDelta >= 0 ? CHART_COLORS.green : CHART_COLORS.red },
        { name: 'New Indications', value: impact.components.newIndCopDelta, fill: impact.components.newIndCopDelta >= 0 ? CHART_COLORS.green : CHART_COLORS.red },
        { name: 'SG&A Efficiency', value: impact.components.sgaCopDelta, fill: impact.components.sgaCopDelta >= 0 ? CHART_COLORS.green : CHART_COLORS.red },
    ], [impact]);

    // Investment allocation donut: US Oncology budget priorities
    const allocationData = useMemo(() => [
        { name: 'XTANDI IRA Defense', value: 40, spent: 24, color: CHART_COLORS.red },
        { name: 'PADCEV Launch (US/EU)', value: 35, spent: Math.round(35 * ((leverValues['padcev-market-penetration'] ?? 42) / 42) * 0.6), color: CHART_COLORS.blue },
        { name: 'Pfizer Co-Promotion', value: 15, spent: Math.round(15 * ((leverValues['pfizer-collaboration-adjustment'] ?? 100) / 100)), color: CHART_COLORS.teal },
        { name: 'New Indications', value: Math.round((leverValues['new-indication-revenue'] ?? 20) * 0.4), spent: Math.round((leverValues['new-indication-revenue'] ?? 20) * 0.2), color: CHART_COLORS.amber },
        { name: 'Field Force Efficiency', value: 20, spent: 12, color: CHART_COLORS.purple },
    ], [leverValues]);

    // XTANDI revenue projection FY24–FY28
    const projectionData = useMemo(() => {
        const xtandiFY25  = 960.8;
        const xtandiFY26E = xtandiFY25 + (impact.components.iraRevDelta + impact.components.trxRevDelta) * 0.5;
        return [
            { year: 'FY24', base: 912.0, incremental: 0 },
            { year: 'FY25', base: xtandiFY25, incremental: 0 },
            { year: 'FY26E', base: xtandiFY25, incremental: parseFloat(((impact.components.iraRevDelta + impact.components.trxRevDelta) * 0.5).toFixed(1)) },
            { year: 'FY27E', base: xtandiFY25, incremental: parseFloat(((impact.components.iraRevDelta + impact.components.trxRevDelta) * 0.8).toFixed(1)) },
            { year: 'FY28E', base: xtandiFY25, incremental: parseFloat((impact.components.iraRevDelta + impact.components.trxRevDelta).toFixed(1)) },
        ];
    }, [impact]);

    const statusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
            case 'on-track': return <TrendingUp className="w-4 h-4 text-green-600" />;
            case 'at-risk': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
            default: return <Clock className="w-4 h-4 text-gray-400" />;
        }
    };

    const statusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'on-track': return 'bg-green-100 text-green-700';
            case 'at-risk': return 'bg-amber-100 text-amber-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const iraDiscount = leverValues['xtandi-ira-discount-pct'] ?? 25;
    const trxGrowth   = leverValues['xtandi-us-trx-growth'] ?? 3;

    return (
        <motion.div
            key="strategy-investment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            {/* Summary Impact Cards */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">XTANDI IRA & US Oncology — Strategic Impact</h3>
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Revenue Impact (¥B)</p>
                        <p className={`text-xl font-bold ${impact.totalRevenueDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.totalRevenueDelta >= 0 ? '+' : ''}¥{impact.totalRevenueDelta}B
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Core OP Impact (¥B)</p>
                        <p className={`text-xl font-bold ${impact.totalCoreOpDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.totalCoreOpDelta >= 0 ? '+' : ''}¥{impact.totalCoreOpDelta}B
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">IRA Discount (vs plan)</p>
                        <p className={`text-xl font-bold ${iraDiscount <= 25 ? 'text-green-600' : 'text-red-600'}`}>
                            {iraDiscount}%
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Margin Impact</p>
                        <p className={`text-xl font-bold ${impact.marginImpactBps >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.marginImpactBps >= 0 ? '+' : ''}{impact.marginImpactBps}bps
                        </p>
                    </div>
                </div>

                {/* AI Insight */}
                <div className="bg-[#F0F0F0] rounded-lg p-4 flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-[#000000] mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-[#000000]">
                        <span className="font-semibold">AI Insight:</span>{' '}
                        {iraDiscount <= 20
                            ? `Favorable IRA scenario: ${iraDiscount}% Medicare discount vs 25% base case drives ¥${Math.abs(impact.components.iraRevDelta).toFixed(1)}B revenue tailwind. XTANDI TRx growth at ${trxGrowth}% adds ¥${Math.abs(impact.components.trxRevDelta).toFixed(1)}B. Combined XTANDI franchise upside: ¥${impact.totalCoreOpDelta.toFixed(1)}B Core OP delta vs guidance.`
                            : iraDiscount >= 35
                            ? `Adverse IRA scenario: ${iraDiscount}% Medicare discount drives ¥${Math.abs(impact.components.iraRevDelta).toFixed(1)}B revenue headwind — ¥${Math.abs(impact.components.iraCoreOpDelta).toFixed(1)}B Core OP adverse vs base. PADCEV penetration at ${leverValues['padcev-market-penetration'] ?? 42}% provides +¥${impact.components.padcevCopDelta.toFixed(1)}B Core OP partial offset. Net impact: ${impact.totalCoreOpDelta.toFixed(1)}B Core OP vs guidance.`
                            : `Base case scenario: XTANDI IRA discount at ${iraDiscount}% with ${trxGrowth}% TRx growth. PADCEV at ${leverValues['padcev-market-penetration'] ?? 42}% 1L penetration (+¥${impact.components.padcevCopDelta.toFixed(1)}B Core OP). Net US oncology Core OP delta: ¥${impact.totalCoreOpDelta.toFixed(1)}B vs FY2026 guidance of ¥580B.`
                        }
                    </div>
                </div>
            </div>

            {/* Initiative Scorecard Grid */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Initiative Scorecard</h3>
                <div className="grid grid-cols-2 gap-4">
                    {initiatives.slice(0, 4).map((initiative) => (
                        <div key={initiative.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#000000]/30 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-semibold text-gray-900 truncate flex-1 mr-2">{initiative.name}</h4>
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full flex items-center space-x-1 ${statusColor(initiative.status)}`}>
                                    {statusIcon(initiative.status)}
                                    <span className="ml-1">{initiative.status}</span>
                                </span>
                            </div>

                            {/* Budget Progress Bar */}
                            <div className="mb-3">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>¥{initiative.spent}B spent</span>
                                    <span>¥{initiative.budget}B budget</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-[#000000] h-2 rounded-full transition-all"
                                        style={{ width: `${Math.min(100, initiative.progress)}%` }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{initiative.progress}% complete</p>
                            </div>

                            {/* KPIs */}
                            <div className="space-y-1">
                                {initiative.kpis.slice(0, 2).map((kpi, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs">
                                        <span className="text-gray-600">{kpi.label}</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium text-gray-900">{kpi.actual}</span>
                                            <span className="text-gray-400">/</span>
                                            <span className="text-gray-500">{kpi.target}</span>
                                            <span className={`w-2 h-2 rounded-full ${
                                                kpi.status === 'good' ? 'bg-green-500' : kpi.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                                            }`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6">
                {/* Core OP Driver Bridge */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Core OP Driver Bridge (¥B)</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={bridgeData} layout="vertical">
                            <CartesianGrid {...CHART_GRID_STYLE} horizontal={false} vertical={true} />
                            <XAxis
                                type="number"
                                tick={CHART_AXIS_STYLE}
                                tickFormatter={(v) => `¥${v}B`}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                tick={{ ...CHART_AXIS_STYLE, fontSize: 10 }}
                                width={100}
                            />
                            <Tooltip
                                {...CHART_TOOLTIP_DARK}
                                formatter={(value: number) => [`${value >= 0 ? '+' : ''}¥${value}B`, 'Core OP Delta']}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {bridgeData.map((entry, index) => (
                                    <Cell key={index} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* XTANDI Revenue Projection */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">XTANDI Revenue Projection (¥B)</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <ComposedChart data={projectionData}>
                            <CartesianGrid {...CHART_GRID_STYLE} />
                            <XAxis dataKey="year" tick={CHART_AXIS_STYLE} />
                            <YAxis
                                tick={CHART_AXIS_STYLE}
                                domain={[800, 1100]}
                                tickFormatter={(v) => `¥${v}B`}
                            />
                            <Tooltip
                                {...CHART_TOOLTIP_DARK}
                                formatter={(value: number, name: string) => [
                                    `¥${(value).toFixed(0)}B`,
                                    name === 'base' ? 'Base Revenue' : 'Scenario Delta'
                                ]}
                            />
                            <Bar dataKey="base" stackId="a" fill={CHART_COLORS.gray} radius={[0, 0, 0, 0]} />
                            <Bar dataKey="incremental" stackId="a" fill={CHART_COLORS.green} radius={[4, 4, 0, 0]} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* XTANDI IRA Context Panel */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">XTANDI IRA Negotiation Context (FY2025 Actual → FY2026 Guidance)</h3>
                <p className="text-xs text-gray-500 mb-4">Pfizer/Astellas joint IRA defense ongoing; final Medicare negotiated price classified until implementation. Base case assumes ~25% discount vs prior manufacturer price.</p>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                        <p className="text-xs text-green-700 font-medium mb-1">FY25 XTANDI Net Sales</p>
                        <p className="text-2xl font-bold text-green-700">¥960.8B</p>
                        <p className="text-xs text-green-600 mt-1">+5.3% YoY — pre-IRA implementation</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                        <p className="text-xs text-gray-600 font-medium mb-1">IRA Sensitivity (Disclosed)</p>
                        <p className="text-2xl font-bold text-gray-900">¥9.6B/1pp</p>
                        <p className="text-xs text-gray-500 mt-1">Core OP per 1pp price cut</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4 text-center border border-amber-200">
                        <p className="text-xs text-amber-700 font-medium mb-1">Scenario Core OP Delta</p>
                        <p className={`text-2xl font-bold ${impact.totalCoreOpDelta >= 0 ? 'text-green-700' : 'text-amber-700'}`}>
                            {impact.totalCoreOpDelta >= 0 ? '+' : ''}¥{impact.totalCoreOpDelta}B
                        </p>
                        <p className="text-xs text-amber-600 mt-1">vs FY2026 guidance ¥580B</p>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-end text-sm">
                    <span className="text-gray-500 mr-2">Scenario PADCEV 1L penetration upside:</span>
                    <span className="font-bold text-[#000000]">
                        +¥{impact.components.padcevCopDelta.toFixed(1)}B Core OP @ {leverValues['padcev-market-penetration'] ?? 42}% share
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
