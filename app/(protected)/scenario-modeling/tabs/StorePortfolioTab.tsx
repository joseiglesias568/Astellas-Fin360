'use client';

import { market } from '@/config/clients/astellas/market';
import { CHART_COLORS, CHART_TOOLTIP_DARK, CHART_GRID_STYLE, CHART_AXIS_STYLE } from '@/lib/chart-theme';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    Sparkles,
    Target,
} from 'lucide-react';
import { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, ComposedChart,
} from 'recharts';

interface StorePortfolioTabProps {
    leverValues: Record<string, number>;
    onLeverChange: (id: string, value: number) => void;
}

// ─── Calculation Engine ─────────────────────────────────────────────────────
function calculateStrategicBrandsImpact(values: Record<string, number>) {
    // IZERVAY US geographic atrophy penetration: delta vs 18% default
    // Each +1pp on ~¥155B addressable market ≈ +¥7B revenue, +¥5.6B Core OP (80% GM)
    const izervayPen    = values['izervay-us-penetration'] ?? 18;
    const izervayDelta  = izervayPen - 18;
    const izervayRevDelta = izervayDelta * 7.0;
    const izervayCopDelta = izervayDelta * 5.6;

    // VYLOY peak sales achievement: delta vs 65% default
    // Internal peak sales model ~¥200B; each 1pp ≈ +¥2B revenue, +¥1.4B Core OP
    const vyloyAchieve  = values['vyloy-peak-sales-achievement'] ?? 65;
    const vyloyDelta    = vyloyAchieve - 65;
    const vyloyRevDelta = vyloyDelta * 2.0;
    const vyloyCopDelta = vyloyDelta * 1.4;

    // VEOZAH prescriber adoption: delta vs 28% default
    // Each +1pp on ~¥60B near-term peak ≈ +¥2.5B revenue, +¥1.8B Core OP (70% GM)
    const veozahAdopt   = values['veozah-prescriber-adoption'] ?? 28;
    const veozahDelta   = veozahAdopt - 28;
    const veozahRevDelta = veozahDelta * 2.5;
    const veozahCopDelta = veozahDelta * 1.8;

    // XOSPATA lifecycle extension revenue: direct ¥B value (default ¥72B)
    const xospataRev    = values['xospata-lifecycle-extension'] ?? 72;
    const xosDelta      = xospataRev - 72.0;
    const xosCopDelta   = xosDelta * 0.65;  // ~65% Core OP margin

    // Strategic Brands combined growth: delta vs 43% default
    // Benchmark check: each +1pp on ¥480B combined FY25 base ≈ +¥4.8B revenue
    const sbGrowth      = values['strategic-brands-combined-growth'] ?? 43;
    const sbGrowthDelta = sbGrowth - 43;
    const sbRevDelta    = sbGrowthDelta * 4.8;
    const sbCopDelta    = sbGrowthDelta * 3.4;

    // Next pipeline launch readiness: each 10 points above 55 base ≈ +¥3B NPV contribution
    const launchReady    = values['next-launch-readiness'] ?? 55;
    const launchDelta    = launchReady - 55;
    const launchCopDelta = launchDelta * 0.3;

    // Combine: use Strategic Brands growth as the primary signal, add individual brand deltas as incremental
    // Avoid double-counting — sbRevDelta captures portfolio growth; individual brand deltas are deviations within that
    const totalRevenueDelta = izervayRevDelta + vyloyRevDelta + veozahRevDelta + xosDelta + sbRevDelta * 0.4;
    const totalCoreOpDelta  = izervayCopDelta + vyloyCopDelta + veozahCopDelta + xosCopDelta + sbCopDelta * 0.4 + launchCopDelta;
    const baseRevenue       = 2210.0;
    const marginImpactBps   = Math.round((totalCoreOpDelta / baseRevenue) * 10000);

    return {
        totalRevenueDelta: parseFloat(totalRevenueDelta.toFixed(1)),
        totalCoreOpDelta:  parseFloat(totalCoreOpDelta.toFixed(1)),
        marginImpactBps,
        izervayPen,
        vyloyAchieve,
        veozahAdopt,
        xospataRev,
        components: {
            izervayRevDelta: parseFloat(izervayRevDelta.toFixed(1)),
            izervayCopDelta: parseFloat(izervayCopDelta.toFixed(1)),
            vyloyRevDelta:   parseFloat(vyloyRevDelta.toFixed(1)),
            vyloyCopDelta:   parseFloat(vyloyCopDelta.toFixed(1)),
            veozahRevDelta:  parseFloat(veozahRevDelta.toFixed(1)),
            veozahCopDelta:  parseFloat(veozahCopDelta.toFixed(1)),
            xosDelta:        parseFloat(xosDelta.toFixed(1)),
            xosCopDelta:     parseFloat(xosCopDelta.toFixed(1)),
            sbRevDelta:      parseFloat(sbRevDelta.toFixed(1)),
            launchCopDelta:  parseFloat(launchCopDelta.toFixed(1)),
        },
    };
}

export default function StorePortfolioTab({ leverValues, onLeverChange }: StorePortfolioTabProps) {
    const impact = useMemo(() => calculateStrategicBrandsImpact(leverValues), [leverValues]);

    // Competitors from Astellas config (peer pharma — shown for market context)
    const competitors = market.competitors;

    // Brand revenue waterfall: base vs delta
    const brandWaterfall = useMemo(() => [
        { name: 'IZERVAY', base: 77.6, delta: impact.components.izervayRevDelta, fill: CHART_COLORS.blue, type: 'brand' },
        { name: 'VYLOY', base: 63.1, delta: impact.components.vyloyRevDelta, fill: CHART_COLORS.green, type: 'brand' },
        { name: 'VEOZAH', base: 46.6, delta: impact.components.veozahRevDelta, fill: CHART_COLORS.teal, type: 'brand' },
        { name: 'XOSPATA', base: 71.8, delta: impact.components.xosDelta, fill: CHART_COLORS.amber, type: 'brand' },
    ], [impact]);

    // Brand quarterly trend (FY25)
    const brandTrendData = useMemo(() => {
        const vyloyTarget = leverValues['vyloy-peak-sales-achievement'] ?? 65;
        return [
            { quarter: 'Q1 FY25', izervay: 17.2, vyloy: 12.2, veozah: 9.8, xospata: 17.8 },
            { quarter: 'Q2 FY25', izervay: 18.8, vyloy: 14.3, veozah: 10.9, xospata: 17.5 },
            { quarter: 'Q3 FY25', izervay: 20.1, vyloy: 17.6, veozah: 12.4, xospata: 18.3 },
            { quarter: 'Q4 FY25', izervay: 21.5, vyloy: 19.0, veozah: 13.5, xospata: 18.2 },
            { quarter: 'Q1 FY26E', izervay: 21.5 * (1 + (leverValues['izervay-us-penetration'] ?? 18) / 18 * 0.05), vyloy: 19.0 * (1 + vyloyTarget / 65 * 0.10), veozah: 13.5 * (1 + (leverValues['veozah-prescriber-adoption'] ?? 28) / 28 * 0.08), xospata: (leverValues['xospata-lifecycle-extension'] ?? 72) * 0.25 },
        ];
    }, [leverValues]);

    // Brand economics table
    const brandEconomics = [
        {
            brand: 'IZERVAY (avacincaptad pegol)',
            revenue: `¥${(77.6 + impact.components.izervayRevDelta).toFixed(1)}B`,
            growth: `${impact.components.izervayRevDelta >= 0 ? '+' : ''}¥${impact.components.izervayRevDelta.toFixed(1)}B`,
            margin: '~80%',
            outlook: impact.izervayPen >= 20 ? 'Above Plan' : impact.izervayPen >= 15 ? 'On Track' : 'Below Plan',
            color: CHART_COLORS.blue,
        },
        {
            brand: 'VYLOY (zolbetuximab)',
            revenue: `¥${(63.1 + impact.components.vyloyRevDelta).toFixed(1)}B`,
            growth: `${impact.components.vyloyRevDelta >= 0 ? '+' : ''}¥${impact.components.vyloyRevDelta.toFixed(1)}B`,
            margin: '~70%',
            outlook: impact.vyloyAchieve >= 75 ? 'Outperforming' : impact.vyloyAchieve >= 60 ? 'On Track' : 'Below Plan',
            color: CHART_COLORS.green,
        },
        {
            brand: 'VEOZAH (fezolinetant)',
            revenue: `¥${(46.6 + impact.components.veozahRevDelta).toFixed(1)}B`,
            growth: `${impact.components.veozahRevDelta >= 0 ? '+' : ''}¥${impact.components.veozahRevDelta.toFixed(1)}B`,
            margin: '~72%',
            outlook: impact.veozahAdopt >= 32 ? 'Gaining' : impact.veozahAdopt >= 25 ? 'Steady' : 'Slow Adoption',
            color: CHART_COLORS.teal,
        },
        {
            brand: 'XOSPATA (gilteritinib)',
            revenue: `¥${impact.xospataRev.toFixed(1)}B`,
            growth: `${impact.components.xosDelta >= 0 ? '+' : ''}¥${impact.components.xosDelta.toFixed(1)}B`,
            margin: '~75%',
            outlook: impact.xospataRev >= 78 ? 'Lifecycle Active' : impact.xospataRev >= 68 ? 'Stable' : 'Pressure',
            color: CHART_COLORS.amber,
        },
    ];

    return (
        <motion.div
            key="pcw-portfolio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            {/* Summary Cards */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Brands Launch Portfolio Impact</h3>
                <div className="grid grid-cols-5 gap-3 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Revenue Impact (¥B)</p>
                        <p className={`text-xl font-bold ${impact.totalRevenueDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.totalRevenueDelta >= 0 ? '+' : ''}¥{impact.totalRevenueDelta}B
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">IZERVAY GA Penetration</p>
                        <p className="text-xl font-bold text-gray-900">
                            {impact.izervayPen}%
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Core OP Impact (¥B)</p>
                        <p className={`text-xl font-bold ${impact.totalCoreOpDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.totalCoreOpDelta >= 0 ? '+' : ''}¥{impact.totalCoreOpDelta}B
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">VYLOY Achievement</p>
                        <p className="text-xl font-bold text-[#000000]">
                            {impact.vyloyAchieve}%
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
                        {impact.components.vyloyRevDelta > 20
                            ? `VYLOY outperformance at ${impact.vyloyAchieve}% peak achievement drives +¥${impact.components.vyloyRevDelta.toFixed(1)}B revenue. IZERVAY at ${impact.izervayPen}% GA penetration adds +¥${impact.components.izervayRevDelta.toFixed(1)}B. Combined Strategic Brands Core OP uplift: +¥${impact.totalCoreOpDelta.toFixed(1)}B vs FY2026 guidance.`
                            : impact.components.izervayRevDelta < -10
                            ? `IZERVAY payer headwind: ${impact.izervayPen}% penetration vs 18% base case drives ¥${Math.abs(impact.components.izervayRevDelta).toFixed(1)}B revenue shortfall. VYLOY at ${impact.vyloyAchieve}% provides partial offset. Strategic Brands net Core OP impact: ¥${impact.totalCoreOpDelta.toFixed(1)}B.`
                            : `Strategic Brands delivering ¥${impact.totalRevenueDelta.toFixed(1)}B revenue delta vs plan. VYLOY CDx penetration (${impact.vyloyAchieve}% achievement) and VEOZAH prescriber adoption (${impact.veozahAdopt}%) are the primary upside levers. XOSPATA lifecycle extension at ¥${impact.xospataRev}B adds further support.`
                        }
                    </div>
                </div>
            </div>

            {/* Brand Revenue + Trend */}
            <div className="grid grid-cols-2 gap-6">
                {/* Brand Revenue Delta */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Strategic Brand Revenue Delta vs Base (¥B)</h3>
                    <div className="space-y-3">
                        {brandWaterfall.map((brand, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:border-[#000000]/20 transition-colors">
                                <Target className="w-4 h-4 text-[#000000]" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">{brand.name}</p>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xs text-gray-500">¥{brand.base.toFixed(1)}B base</span>
                                            <span className={`text-xs font-medium flex items-center ${brand.delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {brand.delta >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                                                {brand.delta >= 0 ? '+' : ''}¥{brand.delta.toFixed(1)}B
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                                        <div
                                            className="h-1.5 rounded-full"
                                            style={{ width: `${(brand.base / 80) * 100}%`, backgroundColor: brand.fill }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Brand Revenue Impact Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue Impact by Brand (¥B)</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={brandWaterfall}>
                            <CartesianGrid {...CHART_GRID_STYLE} />
                            <XAxis dataKey="name" tick={{ ...CHART_AXIS_STYLE, fontSize: 10 }} />
                            <YAxis
                                tick={CHART_AXIS_STYLE}
                                tickFormatter={(v) => `¥${v}B`}
                            />
                            <Tooltip
                                {...CHART_TOOLTIP_DARK}
                                formatter={(value: number, name: string, props: any) => {
                                    const item = props.payload;
                                    return [`¥${item.base.toFixed(1)}B base | ${item.delta >= 0 ? '+' : ''}¥${item.delta.toFixed(1)}B delta`, item.name];
                                }}
                            />
                            <Bar dataKey="delta" radius={[4, 4, 0, 0]}>
                                {brandWaterfall.map((entry, index) => (
                                    <Cell key={index} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Brand Economics Table + Core OP Bridge */}
            <div className="grid grid-cols-2 gap-6">
                {/* Brand Economics Table */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Strategic Brand Economics</h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 text-xs font-medium text-gray-500">Brand</th>
                                <th className="text-right py-2 text-xs font-medium text-gray-500">Revenue</th>
                                <th className="text-right py-2 text-xs font-medium text-gray-500">Delta</th>
                                <th className="text-right py-2 text-xs font-medium text-gray-500">GM</th>
                                <th className="text-right py-2 text-xs font-medium text-gray-500">Outlook</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brandEconomics.map((item) => (
                                <tr key={item.brand} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="py-2.5 flex items-center space-x-2">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="font-medium text-gray-900 text-xs">{item.brand}</span>
                                    </td>
                                    <td className="py-2.5 text-right text-gray-700 text-xs">{item.revenue}</td>
                                    <td className={`py-2.5 text-right font-medium text-xs ${parseFloat(item.growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>{item.growth}</td>
                                    <td className="py-2.5 text-right text-gray-700 text-xs">{item.margin}</td>
                                    <td className="py-2.5 text-right font-medium text-gray-900 text-xs">{item.outlook}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Core OP Bridge by Brand */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Core OP Driver Bridge (¥B)</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={[
                            { name: 'IZERVAY', value: impact.components.izervayCopDelta, fill: CHART_COLORS.blue },
                            { name: 'VYLOY', value: impact.components.vyloyCopDelta, fill: CHART_COLORS.green },
                            { name: 'VEOZAH', value: impact.components.veozahCopDelta, fill: CHART_COLORS.teal },
                            { name: 'XOSPATA', value: impact.components.xosCopDelta, fill: CHART_COLORS.amber },
                            { name: 'Launch Ready', value: impact.components.launchCopDelta, fill: CHART_COLORS.purple },
                        ]} layout="vertical">
                            <CartesianGrid {...CHART_GRID_STYLE} horizontal={false} vertical={true} />
                            <XAxis type="number" tick={CHART_AXIS_STYLE} tickFormatter={(v) => `¥${v}B`} />
                            <YAxis type="category" dataKey="name" tick={{ ...CHART_AXIS_STYLE, fontSize: 10 }} width={80} />
                            <Tooltip
                                {...CHART_TOOLTIP_DARK}
                                formatter={(value: number) => [`${value >= 0 ? '+' : ''}¥${value}B`, 'Core OP Delta']}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {[
                                    { value: impact.components.izervayCopDelta },
                                    { value: impact.components.vyloyCopDelta },
                                    { value: impact.components.veozahCopDelta },
                                    { value: impact.components.xosCopDelta },
                                    { value: impact.components.launchCopDelta },
                                ].map((entry, index) => (
                                    <Cell key={index} fill={entry.value >= 0 ? [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.teal, CHART_COLORS.amber, CHART_COLORS.purple][index] : CHART_COLORS.red} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Portfolio Summary Metrics */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Strategic Brands Portfolio Summary</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">FY25 Combined Revenue</p>
                        <p className="text-lg font-bold text-[#000000]">¥480.3B</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">VYLOY Launch Achievement</p>
                        <p className={`text-lg font-bold ${impact.vyloyAchieve >= 65 ? 'text-green-600' : 'text-amber-600'}`}>
                            {impact.vyloyAchieve}%
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">VEOZAH Prescriber Base</p>
                        <p className="text-lg font-bold text-gray-900">{impact.veozahAdopt}%</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">XOSPATA Revenue</p>
                        <p className={`text-lg font-bold ${impact.components.xosDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>¥{impact.xospataRev.toFixed(1)}B</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
