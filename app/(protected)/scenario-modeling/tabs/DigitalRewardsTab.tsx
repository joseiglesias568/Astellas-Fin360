'use client';

import { CHART_COLORS, CHART_TOOLTIP_DARK, CHART_GRID_STYLE, CHART_AXIS_STYLE } from '@/lib/chart-theme';
import { motion } from 'framer-motion';
import {
    Smartphone,
    Sparkles,
    ArrowRight,
    Cpu,
    Zap,
    BarChart3,
    FlaskConical,
} from 'lucide-react';
import { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, ComposedChart, Line, Area,
} from 'recharts';

interface DigitalPlatformTabProps {
    leverValues: Record<string, number>;
    onLeverChange: (id: string, value: number) => void;
}

// Astellas SMT & Digital KPIs (FY2025 baseline)
const ASTELLAS_DIGITAL_METRICS = [
    { label: 'SMT Savings Delivered FY25', value: '¥21B', description: 'Cumulative savings toward ¥65B 2-year target' },
    { label: 'Finance360 FP&A Adoption', value: '~65%', description: 'FP&A team active on Finance360 platform' },
    { label: 'AI Clinical Trial Sites', value: '~30%', description: 'Trials using AI-enabled patient recruitment' },
    { label: 'Manufacturing Yield Improvement', value: '~+3%', description: 'Process efficiency vs FY24 baseline' },
    { label: 'Digital Health Partnerships', value: '4 active', description: 'CDx, digital Rx adherence, remote monitoring' },
    { label: 'R&D Portfolio Analytics Coverage', value: '~70%', description: 'Programs with real-time cost tracking' },
];

// ─── Calculation Engine ─────────────────────────────────────────────────────
function calculateSMTDigitalImpact(values: Record<string, number>) {
    // SMT annual savings: direct Core OP benefit; delta vs ¥40B FY26 target
    const smtSavings     = values['smt-annual-savings'] ?? 40;
    const smtDelta       = smtSavings - 40;
    const smtCopDelta    = smtDelta;  // 1:1 savings → Core OP flow-through

    // R&D portfolio optimization savings: each ¥10B → +0.5pp Core OP margin
    const rdOptimization = values['rd-portfolio-optimization'] ?? 12;
    const rdDelta        = rdOptimization - 12;
    const rdCopDelta     = rdDelta;  // direct Core OP benefit

    // Manufacturing footprint savings: direct Core OP benefit
    const mfgSavings     = values['manufacturing-footprint-savings'] ?? 10;
    const mfgDelta       = mfgSavings - 10;
    const mfgCopDelta    = mfgDelta;

    // AI clinical trial efficiency: each 10pp time reduction ≈ +¥15B pipeline NPV acceleration
    // More tangible Core OP proxy: each 10pp reduction ≈ ¥3B R&D cost avoidance per year
    const aiEfficiency   = values['ai-clinical-trial-efficiency'] ?? 10;
    const aiDelta        = aiEfficiency - 10;
    const aiCopDelta     = aiDelta * 0.3;  // ¥0.3B per 1pp improvement in trial efficiency

    // Digital health partnership revenue: high-margin incremental
    const digitalRev     = values['digital-health-partnership-revenue'] ?? 5;
    const digitalRevDelta = digitalRev - 5;
    const digitalCopDelta = digitalRevDelta * 0.65;  // ~65% Core OP margin on digital

    // Procurement savings: direct Core OP benefit
    const procSavings    = values['procurement-savings'] ?? 10;
    const procDelta      = procSavings - 10;
    const procCopDelta   = procDelta;

    const totalCoreOpDelta  = smtCopDelta + rdCopDelta + mfgCopDelta + aiCopDelta + digitalCopDelta + procCopDelta;
    const totalRevenueDelta = digitalRevDelta;  // only digital health adds revenue
    const baseRevenue       = 2210.0;
    const marginImpactBps   = Math.round((totalCoreOpDelta / baseRevenue) * 10000);

    const totalSavings = smtSavings + rdOptimization + mfgSavings + procSavings;
    const investment   = 5.0 + (aiEfficiency - 10) * 0.2 + digitalRev * 0.3;  // ¥B invested
    const roi          = investment > 0 ? Math.round((totalCoreOpDelta / investment) * 100) : 0;

    return {
        totalCoreOpDelta:  parseFloat(totalCoreOpDelta.toFixed(1)),
        totalRevenueDelta: parseFloat(totalRevenueDelta.toFixed(1)),
        marginImpactBps,
        smtSavings,
        rdOptimization,
        mfgSavings,
        aiEfficiency,
        totalSavings: parseFloat(totalSavings.toFixed(1)),
        components: {
            smtCopDelta:      parseFloat(smtCopDelta.toFixed(1)),
            rdCopDelta:       parseFloat(rdCopDelta.toFixed(1)),
            mfgCopDelta:      parseFloat(mfgCopDelta.toFixed(1)),
            aiCopDelta:       parseFloat(aiCopDelta.toFixed(1)),
            digitalCopDelta:  parseFloat(digitalCopDelta.toFixed(1)),
            procCopDelta:     parseFloat(procCopDelta.toFixed(1)),
        },
        investment: { total: parseFloat(investment.toFixed(1)), roi },
    };
}

export default function DigitalPlatformTab({ leverValues, onLeverChange }: DigitalPlatformTabProps) {
    const impact = useMemo(() => calculateSMTDigitalImpact(leverValues), [leverValues]);

    // SMT savings trajectory (FY25–FY27E)
    const savingsTrend = useMemo(() => {
        const smtTarget = leverValues['smt-annual-savings'] ?? 40;
        const rdTarget  = leverValues['rd-portfolio-optimization'] ?? 12;
        return [
            { quarter: 'Q1 FY25', smt: 3.5, rdOpt: 1.5 },
            { quarter: 'Q2 FY25', smt: 4.8, rdOpt: 2.5 },
            { quarter: 'Q3 FY25', smt: 6.2, rdOpt: 3.8 },
            { quarter: 'Q4 FY25', smt: 6.5, rdOpt: 4.2 },
            { quarter: 'Q1 FY26E', smt: smtTarget * 0.22, rdOpt: rdTarget * 0.22 },
            { quarter: 'Q2 FY26E', smt: smtTarget * 0.24, rdOpt: rdTarget * 0.25 },
            { quarter: 'Q3 FY26E', smt: smtTarget * 0.26, rdOpt: rdTarget * 0.27 },
            { quarter: 'Q4 FY26E', smt: smtTarget * 0.28, rdOpt: rdTarget * 0.26 },
        ];
    }, [leverValues]);

    // Core OP driver waterfall by SMT workstream
    const valueWaterfall = useMemo(() => [
        { name: 'SMT Savings', value: impact.components.smtCopDelta, fill: CHART_COLORS.green },
        { name: 'R&D Optimization', value: impact.components.rdCopDelta, fill: CHART_COLORS.blue },
        { name: 'Manufacturing', value: impact.components.mfgCopDelta, fill: CHART_COLORS.teal },
        { name: 'Procurement', value: impact.components.procCopDelta, fill: CHART_COLORS.amber },
        { name: 'AI Trials', value: impact.components.aiCopDelta, fill: CHART_COLORS.purple },
        { name: 'Digital Rev.', value: impact.components.digitalCopDelta, fill: CHART_COLORS.gray },
    ], [impact]);

    // SMT initiative economics table
    const smtEconomics = useMemo(() => [
        {
            initiative: 'SMT SG&A & Headcount',
            icon: <Sparkles className="w-4 h-4 text-green-600" />,
            investment: '¥2.5B',
            impact: `¥${Math.abs(impact.components.smtCopDelta)}B`,
            type: 'Direct savings',
            payback: '0.8 yrs',
            color: CHART_COLORS.green,
        },
        {
            initiative: 'R&D Portfolio Pruning',
            icon: <FlaskConical className="w-4 h-4 text-blue-500" />,
            investment: '¥0.8B',
            impact: `¥${Math.abs(impact.components.rdCopDelta)}B`,
            type: 'Cost avoidance',
            payback: '0.5 yrs',
            color: CHART_COLORS.blue,
        },
        {
            initiative: 'AI Clinical Efficiency',
            icon: <Cpu className="w-4 h-4 text-teal-500" />,
            investment: '¥1.2B',
            impact: `¥${Math.abs(impact.components.aiCopDelta).toFixed(1)}B`,
            type: 'Timeline acceleration',
            payback: '2.5 yrs',
            color: CHART_COLORS.teal,
        },
        {
            initiative: 'Digital Health Platform',
            icon: <BarChart3 className="w-4 h-4 text-amber-500" />,
            investment: '¥0.6B',
            impact: `¥${Math.abs(impact.components.digitalCopDelta).toFixed(1)}B`,
            type: 'New revenue',
            payback: '3.0 yrs',
            color: CHART_COLORS.amber,
        },
    ], [impact]);

    const flywheelSteps = [
        { label: 'SMT', value: `¥${impact.smtSavings}B`, icon: Sparkles, sublabel: 'savings target' },
        { label: 'R&D Opt.', value: `¥${impact.rdOptimization}B`, icon: FlaskConical, sublabel: 'rationalized' },
        { label: 'AI Trials', value: `${impact.aiEfficiency}%`, icon: Cpu, sublabel: 'time reduction' },
        { label: 'Core OP', value: `${impact.totalCoreOpDelta >= 0 ? '+' : ''}¥${impact.totalCoreOpDelta}B`, icon: Zap, sublabel: 'delta vs plan' },
    ];

    return (
        <motion.div
            key="digital-platform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            {/* Summary Cards */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SMT & Digital Innovation — Core OP Impact</h3>
                <div className="grid grid-cols-5 gap-3 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Core OP Delta (¥B)</p>
                        <p className={`text-xl font-bold ${impact.totalCoreOpDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.totalCoreOpDelta >= 0 ? '+' : ''}¥{impact.totalCoreOpDelta}B
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Total Savings (¥B)</p>
                        <p className="text-xl font-bold text-green-600">
                            ¥{impact.totalSavings}B
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">SMT Target (¥B)</p>
                        <p className="text-xl font-bold text-[#000000]">
                            ¥{impact.smtSavings}B
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Investment ROI</p>
                        <p className="text-xl font-bold text-gray-900">
                            {impact.investment.roi}%
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Margin Impact</p>
                        <p className={`text-xl font-bold ${impact.marginImpactBps >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.marginImpactBps >= 0 ? '+' : ''}{impact.marginImpactBps}bps
                        </p>
                    </div>
                </div>

                {/* SMT Value Chain */}
                <div className="bg-[#000000] rounded-xl p-6">
                    <h4 className="text-sm font-semibold text-white mb-4">SMT Value Chain</h4>
                    <div className="flex items-center justify-between">
                        {flywheelSteps.map((step, idx) => (
                            <div key={idx} className="flex items-center">
                                <motion.div
                                    className="text-center"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: idx * 0.15 }}
                                >
                                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                                        <step.icon className="w-6 h-6 text-[#F0F0F0]" />
                                    </div>
                                    <p className="text-white font-bold text-sm">{step.value}</p>
                                    <p className="text-[#F0F0F0] text-xs">{step.label}</p>
                                    <p className="text-gray-400 text-[10px]">{step.sublabel}</p>
                                </motion.div>
                                {idx < flywheelSteps.length - 1 && (
                                    <ArrowRight className="w-5 h-5 text-[#F0F0F0]/50 mx-3" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SMT Savings Trend + Initiative Economics */}
            <div className="grid grid-cols-2 gap-6">
                {/* SMT Savings Trend Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">SMT Savings & R&D Optimization Trajectory</h3>
                    <p className="text-xs text-gray-500 mb-4">Quarterly savings run-rate (¥B)</p>
                    <ResponsiveContainer width="100%" height={240}>
                        <ComposedChart data={savingsTrend}>
                            <CartesianGrid {...CHART_GRID_STYLE} />
                            <XAxis dataKey="quarter" tick={{ ...CHART_AXIS_STYLE, fontSize: 8 }} />
                            <YAxis
                                tick={CHART_AXIS_STYLE}
                                tickFormatter={(v) => `¥${v}B`}
                            />
                            <Tooltip
                                {...CHART_TOOLTIP_DARK}
                                formatter={(value: number, name: string) => [
                                    `¥${(value as number).toFixed(1)}B`,
                                    name === 'smt' ? 'SMT Savings' : 'R&D Optimization'
                                ]}
                            />
                            <Area
                                type="monotone"
                                dataKey="smt"
                                fill={CHART_COLORS.greenSoft}
                                stroke={CHART_COLORS.green}
                                strokeWidth={2}
                                name="smt"
                            />
                            <Line
                                type="monotone"
                                dataKey="rdOpt"
                                stroke={CHART_COLORS.blue}
                                strokeWidth={2}
                                dot={{ r: 3, fill: CHART_COLORS.blue }}
                                name="rdOpt"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                    <div className="flex items-center justify-center space-x-6 mt-2 text-xs">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: CHART_COLORS.greenSoft }} />
                            <span className="text-gray-600">SMT Savings</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <span className="w-4 h-0.5 rounded" style={{ backgroundColor: CHART_COLORS.blue }} />
                            <span className="text-gray-600">R&D Optimization</span>
                        </div>
                    </div>
                </div>

                {/* SMT Initiative Economics Table */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">SMT Initiative Economics</h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 text-xs font-medium text-gray-500">Initiative</th>
                                <th className="text-right py-2 text-xs font-medium text-gray-500">Invest</th>
                                <th className="text-right py-2 text-xs font-medium text-gray-500">Core OP</th>
                                <th className="text-right py-2 text-xs font-medium text-gray-500">Type</th>
                                <th className="text-right py-2 text-xs font-medium text-gray-500">Payback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {smtEconomics.map((item) => (
                                <tr key={item.initiative} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="py-3 flex items-center space-x-2">
                                        {item.icon}
                                        <span className="font-medium text-gray-900">{item.initiative}</span>
                                    </td>
                                    <td className="py-3 text-right text-gray-700">{item.investment}</td>
                                    <td className="py-3 text-right text-gray-700">{item.impact}</td>
                                    <td className="py-3 text-right text-gray-700">{item.type}</td>
                                    <td className="py-3 text-right font-semibold" style={{ color: item.color }}>{item.payback}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-sm">
                        <span className="text-gray-600">Total Digital Investment:</span>
                        <span className="font-bold text-[#000000]">¥{impact.investment.total}B ({impact.investment.roi}% ROI)</span>
                    </div>
                </div>
            </div>

            {/* Value Driver Waterfall + Astellas Digital KPIs */}
            <div className="grid grid-cols-2 gap-6">
                {/* Core OP Driver Waterfall */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Core OP Drivers (¥B Impact)</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={valueWaterfall} layout="vertical">
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
                                width={110}
                            />
                            <Tooltip
                                {...CHART_TOOLTIP_DARK}
                                formatter={(value: number) => [`${value >= 0 ? '+' : ''}¥${value}B`, 'Core OP Delta']}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {valueWaterfall.map((entry, index) => (
                                    <Cell key={index} fill={entry.value >= 0 ? entry.fill : CHART_COLORS.red} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Astellas Digital KPIs (inlined) */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Astellas Digital & SMT KPIs</h3>
                    <div className="space-y-3">
                        {ASTELLAS_DIGITAL_METRICS.map((metric, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{metric.label}</p>
                                    <p className="text-xs text-gray-500">{metric.description}</p>
                                </div>
                                <p className="text-sm font-bold text-[#000000]">{metric.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Insight */}
            <div className="bg-[#F0F0F0] rounded-lg p-4 flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-[#000000] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-[#000000]">
                    <span className="font-semibold">AI Insight:</span>{' '}
                    {impact.smtSavings > 50
                        ? `SMT outperformance at ¥${impact.smtSavings}B drives ¥${impact.components.smtCopDelta.toFixed(1)}B Core OP uplift vs ¥40B target. R&D portfolio optimization at ¥${impact.rdOptimization}B adds ¥${impact.components.rdCopDelta.toFixed(1)}B. Combined SMT & digital efficiency: ¥${impact.totalCoreOpDelta.toFixed(1)}B Core OP improvement — ¥${impact.totalCoreOpDelta.toFixed(1)}B above FY2026 guidance baseline.`
                        : impact.smtSavings < 30
                        ? `SMT shortfall: ¥${impact.smtSavings}B vs ¥40B target — ¥${Math.abs(impact.components.smtCopDelta).toFixed(1)}B Core OP headwind. R&D optimization (¥${impact.rdOptimization}B) and procurement savings (¥${leverValues['procurement-savings'] ?? 10}B) are the primary controllable offsets. Net impact: ¥${impact.totalCoreOpDelta.toFixed(1)}B vs FY2026 guidance.`
                        : `SMT base case delivering ¥${impact.smtSavings}B savings. Key opportunity: each ¥5B additional SMT outperformance → +0.23pp Core OP margin. AI clinical efficiency at ${impact.aiEfficiency}% trial time reduction generates ¥${impact.components.aiCopDelta.toFixed(1)}B R&D cost avoidance annually. Digital health platform revenue at ¥${leverValues['digital-health-partnership-revenue'] ?? 5}B (65% Core OP margin) is the highest-ROI incremental lever.`
                    }
                </div>
            </div>
        </motion.div>
    );
}
