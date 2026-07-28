'use client';

import { CHART_COLORS, CHART_TOOLTIP_DARK, CHART_GRID_STYLE, CHART_AXIS_STYLE } from '@/lib/chart-theme';
import { motion } from 'framer-motion';
import {
    Sparkles,
} from 'lucide-react';
import { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, LineChart, Line,
} from 'recharts';

interface GlobalMarketsTabProps {
    leverValues: Record<string, number>;
    onLeverChange: (id: string, value: number) => void;
}

// ─── Calculation Engine ─────────────────────────────────────────────────────
function calculateGlobalMarketsFXImpact(values: Record<string, number>) {
    const usdJpy = values['usd-jpy-rate'] ?? 151;
    const eurJpy = values['eur-jpy-rate'] ?? 165;
    const chinaVbpPct = values['china-vbp-net-impact'] ?? -5;
    const emGrowth = values['established-markets-growth'] ?? 3;
    const hedgePct = values['fx-hedge-coverage-rate'] ?? 55;
    const intlGrowth = values['international-markets-growth'] ?? 8;

    const usdMove = usdJpy - 151;
    const eurMove = eurJpy - 165;

    // Hedge scale: base 55% coverage = 1.0; adjusts sensitivity proportionally
    const hedgeScale = (100 - hedgePct) / 45;

    // USD FX: ¥2.1B Core OP per ¥1 (net of 55% base hedge), ¥7.0B revenue per ¥1
    const usdCoreOpDelta = usdMove * 2.1 * hedgeScale;
    const usdRevDelta = usdMove * 7.0 * hedgeScale;

    // EUR FX: ¥1.3B Core OP per ¥1, ¥3.25B revenue per ¥1
    const eurCoreOpDelta = eurMove * 1.3 * hedgeScale;
    const eurRevDelta = eurMove * 3.25 * hedgeScale;

    // China VBP: ¥93B base. Each 1pp change from −5% baseline = ¥0.93B revenue
    const chinaRevDelta = 93.0 * (chinaVbpPct - (-5)) / 100;
    const chinaCoreOpDelta = chinaRevDelta * 0.30;

    // Established Markets: ¥391B base. Each 1pp above 3% = ¥3.91B revenue
    const emRevDelta = 391.0 * (emGrowth - 3) / 100;
    const emCoreOpDelta = emRevDelta * 0.35;

    // International Markets: ¥182B base. Each 1pp above 8% = ¥1.82B revenue
    const intlRevDelta = 182.0 * (intlGrowth - 8) / 100;
    const intlCoreOpDelta = intlRevDelta * 0.30;

    const totalRevDelta = usdRevDelta + eurRevDelta + chinaRevDelta + emRevDelta + intlRevDelta;
    const totalCoreOpDelta = usdCoreOpDelta + eurCoreOpDelta + chinaCoreOpDelta + emCoreOpDelta + intlCoreOpDelta;
    const marginImpactBps = Math.round((totalCoreOpDelta / 555.7) * 10000);

    return {
        totalRevDelta: parseFloat(totalRevDelta.toFixed(1)),
        totalCoreOpDelta: parseFloat(totalCoreOpDelta.toFixed(1)),
        marginImpactBps,
        usd: { revDelta: parseFloat(usdRevDelta.toFixed(1)), coreOpDelta: parseFloat(usdCoreOpDelta.toFixed(1)), move: usdMove, rate: usdJpy },
        eur: { revDelta: parseFloat(eurRevDelta.toFixed(1)), coreOpDelta: parseFloat(eurCoreOpDelta.toFixed(1)), move: eurMove, rate: eurJpy },
        china: { revDelta: parseFloat(chinaRevDelta.toFixed(1)), coreOpDelta: parseFloat(chinaCoreOpDelta.toFixed(1)), vbpPct: chinaVbpPct },
        em: { revDelta: parseFloat(emRevDelta.toFixed(1)), coreOpDelta: parseFloat(emCoreOpDelta.toFixed(1)), growth: emGrowth },
        intl: { revDelta: parseFloat(intlRevDelta.toFixed(1)), coreOpDelta: parseFloat(intlCoreOpDelta.toFixed(1)), growth: intlGrowth },
        hedgePct,
    };
}

export default function ChinaInternationalTab({ leverValues, onLeverChange }: GlobalMarketsTabProps) {
    void onLeverChange; // prop available for parent-driven lever updates
    const impact = useMemo(() => calculateGlobalMarketsFXImpact(leverValues), [leverValues]);

    // Geographic revenue trajectory (¥B) — US, EM, China, International
    const revenueGrowthData = useMemo(() => {
        const emG = leverValues['established-markets-growth'] ?? 3;
        const chinaVbp = leverValues['china-vbp-net-impact'] ?? -5;
        const intlG = leverValues['international-markets-growth'] ?? 8;
        const usdMove = (leverValues['usd-jpy-rate'] ?? 151) - 151;
        const hedgeScale = (100 - (leverValues['fx-hedge-coverage-rate'] ?? 55)) / 45;
        const usFy26 = Math.round(960 + usdMove * 7.0 * hedgeScale);
        const emFy26 = Math.round(391 * (1 + emG / 100));
        const chinaFy26 = Math.round(93 * (1 + chinaVbp / 100));
        const intlFy26 = Math.round(182 * (1 + intlG / 100));
        return [
            { year: 'FY23', us: 750, em: 330, china: 110, intl: 150 },
            { year: 'FY24', us: 860, em: 360, china: 102, intl: 165 },
            { year: 'FY25', us: 960, em: 391, china: 93, intl: 182 },
            { year: 'FY26E', us: usFy26, em: emFy26, china: chinaFy26, intl: intlFy26 },
            {
                year: 'FY27E',
                us: Math.round(usFy26 * 1.04),
                em: Math.round(emFy26 * (1 + emG / 100)),
                china: Math.round(chinaFy26 * (1 + chinaVbp / 100)),
                intl: Math.round(intlFy26 * (1 + intlG / 100)),
            },
        ];
    }, [leverValues]);

    // Core OP impact waterfall by driver
    const coreOpWaterfall = useMemo(() => [
        { name: 'USD/JPY FX', value: parseFloat(impact.usd.coreOpDelta.toFixed(1)), fill: impact.usd.coreOpDelta >= 0 ? CHART_COLORS.green : CHART_COLORS.red },
        { name: 'EUR/JPY FX', value: parseFloat(impact.eur.coreOpDelta.toFixed(1)), fill: impact.eur.coreOpDelta >= 0 ? CHART_COLORS.teal : CHART_COLORS.amber },
        { name: 'China VBP', value: parseFloat(impact.china.coreOpDelta.toFixed(1)), fill: impact.china.coreOpDelta >= 0 ? CHART_COLORS.blue : CHART_COLORS.red },
        { name: 'Est. Markets', value: parseFloat(impact.em.coreOpDelta.toFixed(1)), fill: CHART_COLORS.blue },
        { name: 'Intl Markets', value: parseFloat(impact.intl.coreOpDelta.toFixed(1)), fill: CHART_COLORS.purple },
    ], [impact]);

    // FX Sensitivity Matrix: USD/JPY rate scenarios × EM growth scenarios → Core OP delta (¥B)
    const fxSensitivityMatrix = useMemo(() => {
        const usdScenarios = [
            { label: '¥162 (weak ¥)', rate: 162 },
            { label: '¥151 (plan)', rate: 151 },
            { label: '¥140 (strong ¥)', rate: 140 },
        ];
        const emScenarios = [
            { label: 'EM +6%', growth: 6 },
            { label: 'EM +3%', growth: 3 },
            { label: 'EM +0%', growth: 0 },
        ];
        const hs = (100 - impact.hedgePct) / 45;
        return emScenarios.map(em =>
            usdScenarios.map(usd => ({
                emLabel: em.label,
                usdLabel: usd.label,
                value: parseFloat(((usd.rate - 151) * 2.1 * hs + 391 * (em.growth - 3) / 100 * 0.35).toFixed(1)),
            }))
        );
    }, [impact.hedgePct]);

    return (
        <motion.div
            key="global-markets"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            {/* Summary Impact Cards */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Markets & FX Sensitivity — Core OP Impact</h3>
                <div className="grid grid-cols-5 gap-3 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Total Revenue Delta</p>
                        <p className={`text-xl font-bold ${impact.totalRevDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.totalRevDelta >= 0 ? '+' : ''}¥{impact.totalRevDelta.toFixed(1)}B
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">USD/JPY Core OP</p>
                        <p className={`text-xl font-bold ${impact.usd.coreOpDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.usd.coreOpDelta >= 0 ? '+' : ''}¥{impact.usd.coreOpDelta.toFixed(1)}B
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            ¥{impact.usd.rate}/USD ({impact.usd.move >= 0 ? '+' : ''}{impact.usd.move}¥)
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">EUR/JPY Core OP</p>
                        <p className={`text-xl font-bold ${impact.eur.coreOpDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.eur.coreOpDelta >= 0 ? '+' : ''}¥{impact.eur.coreOpDelta.toFixed(1)}B
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            ¥{impact.eur.rate}/EUR ({impact.eur.move >= 0 ? '+' : ''}{impact.eur.move}¥)
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">China VBP Rev. Delta</p>
                        <p className={`text-xl font-bold ${impact.china.revDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.china.revDelta >= 0 ? '+' : ''}¥{impact.china.revDelta.toFixed(1)}B
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            VBP net {impact.china.vbpPct > 0 ? '+' : ''}{impact.china.vbpPct}%
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-600 mb-1">Total Core OP Delta</p>
                        <p className={`text-xl font-bold ${impact.totalCoreOpDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {impact.totalCoreOpDelta >= 0 ? '+' : ''}¥{impact.totalCoreOpDelta.toFixed(1)}B
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {impact.marginImpactBps >= 0 ? '+' : ''}{impact.marginImpactBps}bps margin
                        </p>
                    </div>
                </div>

                {/* AI Insight */}
                <div className="bg-[#F0F0F0] rounded-lg p-4 flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-[#000000] mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-[#000000]">
                        <span className="font-semibold">AI Insight:</span>{' '}
                        {impact.usd.move > 5
                            ? `JPY depreciation to ¥${impact.usd.rate}/USD drives ¥${impact.usd.revDelta.toFixed(1)}B revenue tailwind. At ${impact.hedgePct}% hedge coverage, unhedged USD exposure captures ¥${impact.usd.coreOpDelta.toFixed(1)}B Core OP upside. Established Markets +${impact.em.growth}% adds ¥${impact.em.revDelta.toFixed(1)}B revenue — combined FX and geographic growth supports FY2026 guidance confidence.`
                            : impact.usd.move < -5
                            ? `JPY appreciation to ¥${impact.usd.rate}/USD creates ¥${Math.abs(impact.usd.revDelta).toFixed(1)}B revenue headwind. Hedge book at ${impact.hedgePct}% coverage partially mitigates Core OP impact (¥${Math.abs(impact.usd.coreOpDelta).toFixed(1)}B net). China VBP net impact ${impact.china.vbpPct}%; consider rolling additional forward hedges to protect FY2026 Core OP margin guidance.`
                            : impact.china.vbpPct < -10
                            ? `China VBP headwind at ${impact.china.vbpPct}% creates ¥${Math.abs(impact.china.revDelta).toFixed(1)}B revenue drag. VYLOY launch volume is the primary offset. FX at near-plan rate (¥${impact.usd.rate}/USD); focus on accelerating China VYLOY CLDN18.2+ patient identification and hospital listings to neutralize VBP impact.`
                            : `Geographic mix broadly in-line with FY2026 plan at ¥${impact.usd.rate}/USD. Total Core OP delta ¥${impact.totalCoreOpDelta >= 0 ? '+' : ''}${impact.totalCoreOpDelta.toFixed(1)}B. Key risk: USD/JPY at ¥141 would erode ¥${((151 - 141) * 2.1 * (100 - impact.hedgePct) / 45).toFixed(1)}B Core OP vs plan. Maintaining ${impact.hedgePct}% hedge coverage is appropriate for the current rate environment.`
                        }
                    </div>
                </div>
            </div>

            {/* Revenue Trajectory + Core OP Waterfall */}
            <div className="grid grid-cols-2 gap-6">
                {/* Geographic Revenue Trajectory */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Geographic Revenue Trajectory (¥B)</h3>
                    <p className="text-xs text-gray-500 mb-4">US segment, Established Markets, China, International Markets</p>
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={revenueGrowthData}>
                            <CartesianGrid {...CHART_GRID_STYLE} />
                            <XAxis dataKey="year" tick={CHART_AXIS_STYLE} />
                            <YAxis
                                tick={CHART_AXIS_STYLE}
                                tickFormatter={(v) => `¥${v}B`}
                            />
                            <Tooltip
                                {...CHART_TOOLTIP_DARK}
                                formatter={(value: number, name: string) => [
                                    `¥${value}B`,
                                    name === 'us' ? 'United States' : name === 'em' ? 'Established Markets' : name === 'china' ? 'China' : 'International',
                                ]}
                            />
                            <Line type="monotone" dataKey="us" stroke={CHART_COLORS.blue} strokeWidth={2.5} dot={{ r: 4, fill: CHART_COLORS.blue }} name="us" />
                            <Line type="monotone" dataKey="em" stroke={CHART_COLORS.teal} strokeWidth={2.5} dot={{ r: 4, fill: CHART_COLORS.teal }} name="em" />
                            <Line type="monotone" dataKey="china" stroke={CHART_COLORS.amber} strokeWidth={2.5} dot={{ r: 4, fill: CHART_COLORS.amber }} name="china" />
                            <Line type="monotone" dataKey="intl" stroke={CHART_COLORS.purple} strokeWidth={2.5} dot={{ r: 4, fill: CHART_COLORS.purple }} name="intl" />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="flex items-center justify-center space-x-4 mt-2 text-xs flex-wrap gap-y-1">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-4 h-0.5 rounded" style={{ backgroundColor: CHART_COLORS.blue }} />
                            <span className="text-gray-600">United States</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <span className="w-4 h-0.5 rounded" style={{ backgroundColor: CHART_COLORS.teal }} />
                            <span className="text-gray-600">Established Markets</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <span className="w-4 h-0.5 rounded" style={{ backgroundColor: CHART_COLORS.amber }} />
                            <span className="text-gray-600">China</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <span className="w-4 h-0.5 rounded" style={{ backgroundColor: CHART_COLORS.purple }} />
                            <span className="text-gray-600">International</span>
                        </div>
                    </div>
                </div>

                {/* Core OP Impact Waterfall */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Core OP Impact by Driver (¥B)</h3>
                    <p className="text-xs text-gray-500 mb-4">Incremental Core OP delta from each geographic and FX lever</p>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={coreOpWaterfall}>
                            <CartesianGrid {...CHART_GRID_STYLE} />
                            <XAxis dataKey="name" tick={{ ...CHART_AXIS_STYLE, fontSize: 9 }} />
                            <YAxis tick={CHART_AXIS_STYLE} tickFormatter={(v) => `¥${v}B`} />
                            <Tooltip
                                {...CHART_TOOLTIP_DARK}
                                formatter={(value: number) => [
                                    `${value >= 0 ? '+' : ''}¥${value.toFixed(1)}B`,
                                    'Core OP Delta',
                                ]}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {coreOpWaterfall.map((entry, index) => (
                                    <Cell key={index} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* FX Sensitivity Matrix + Geographic Revenue Mix */}
            <div className="grid grid-cols-2 gap-6">
                {/* USD/JPY × EM Growth Sensitivity Matrix */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">USD/JPY × EM Growth Core OP Sensitivity (¥B)</h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                <th className="text-left py-2 text-xs font-medium text-gray-500"></th>
                                <th className="text-center py-2 text-xs font-medium text-gray-500">¥162 (weak ¥)</th>
                                <th className="text-center py-2 text-xs font-medium text-gray-500">¥151 (plan)</th>
                                <th className="text-center py-2 text-xs font-medium text-gray-500">¥140 (strong ¥)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fxSensitivityMatrix.map((row, rowIdx) => (
                                <tr key={rowIdx} className="border-t border-gray-100">
                                    <td className="py-3 text-xs font-medium text-gray-700">{row[0].emLabel}</td>
                                    {row.map((cell, cellIdx) => (
                                        <td key={cellIdx} className="py-3 text-center">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                cell.value > 20 ? 'bg-green-100 text-green-700' :
                                                cell.value > 0 ? 'bg-green-50 text-green-600' :
                                                cell.value > -20 ? 'bg-yellow-50 text-yellow-600' :
                                                'bg-red-50 text-red-600'
                                            }`}>
                                                {cell.value >= 0 ? '+' : ''}¥{cell.value.toFixed(1)}B
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-xs text-gray-500 mt-3">
                        Core OP delta vs plan (¥B) at {impact.hedgePct}% USD hedge coverage. USD: ¥2.1B Core OP per ¥1; EM: ¥3.91B revenue × 35% margin per 1pp growth.
                    </p>
                </div>

                {/* Astellas Geographic Revenue Mix */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Astellas Geographic Revenue Mix (FY25 ¥2,139B)</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-[#F0F0F0] rounded-lg border-2 border-[#000000]">
                            <p className="text-xs text-[#000000] font-medium mb-2">United States (~¥960B)</p>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between"><span className="text-gray-600">XTANDI</span><span className="font-semibold">~45%</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">PADCEV</span><span className="font-semibold">~10%</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">IZERVAY / VEOZAH</span><span className="font-semibold">~6%</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">Other US</span><span className="font-semibold">~39%</span></div>
                            </div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-600 mb-2">Established Markets (~¥391B)</p>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between"><span className="text-gray-600">XTANDI ex-US</span><span className="font-semibold">~35%</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">PADCEV EU</span><span className="font-semibold">~15%</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">IZERVAY / VYLOY EU</span><span className="font-semibold">~8%</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">Other EM</span><span className="font-semibold">~42%</span></div>
                            </div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-600 mb-2">China (~¥93B) + Intl (~¥182B)</p>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between"><span className="text-gray-600">XTANDI China</span><span className="font-semibold">~30%</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">VYLOY China launch</span><span className="font-semibold">~12%</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">PADCEV SE Asia</span><span className="font-semibold">~10%</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">Other Intl/China</span><span className="font-semibold">~48%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
