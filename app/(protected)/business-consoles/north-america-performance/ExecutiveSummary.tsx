import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowUpRight,
    BarChart3,
    ChevronDown,
    ChevronRight,
    ExternalLink,
    FileText,
    Grid,
    Lightbulb,
    Minus,
    Sparkles,
    Target,
    TrendingDown,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ConsolePageData } from './types';

interface ExecutiveSummaryProps {
    filters?: {
        selectedRegion: string;
        selectedSite: string;
        selectedDivision: string;
        selectedProduct: string;
        selectedFunction: string;
        selectedPeriod: string;
        selectedComparison: string;
        selectedTimeToggle: string;
        selectedValueView: string;
    };
    dbData?: ConsolePageData;
}

export default function ExecutiveSummary({ filters, dbData }: ExecutiveSummaryProps) {
    const {
        selectedRegion = 'North America',
        selectedDivision = 'All',
        selectedPeriod = 'Q',
        selectedComparison = 'YoY',
        selectedValueView = 'Total ¥'
    } = filters || {};

    const [expandedDrivers, setExpandedDrivers] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<'insight' | 'heatmap'>('insight');

    // Build key metrics from DB data
    const keyMetrics = useMemo(() => {
        const allKPIs = dbData?.kpis
            ? [
                ...dbData.kpis.primaryKPIs,
                ...dbData.kpis.operationalKPIs,
                ...dbData.kpis.digitalKPIs,
                ...dbData.kpis.financialKPIs,
              ]
            : [];

        const findKPI = (label: string) => allKPIs.find(
            (k) => k.label.toLowerCase().includes(label.toLowerCase())
        );

        const marketShareKPI = findKPI('market share');
        const rewardsKPI = findKPI('rewards') || findKPI('loyalty');
        const compSalesKPI = findKPI('organic revenue') ?? findKPI('revenue');

        const mktShare = dbData?.market?.companyMarketShare ?? (marketShareKPI ? parseFloat(String(marketShareKPI.value)) : 8.5);
        const mktShareTarget = dbData?.market?.marketShareTarget ?? 10.0;
        const mktShareYoY = dbData?.market?.marketShareYoY ?? -0.2;
        const segGrowth = dbData?.market?.segmentGrowth ?? (dbData?.financials?.latestQuarter?.revenueYoY ?? 5.2);

        return [
            {
                label: 'Market Share',
                value: marketShareKPI?.value ?? `${mktShare}%`,
                change: mktShareYoY,
                target: mktShareTarget,
                vsTarget: parseFloat((mktShare - mktShareTarget).toFixed(1)),
                trend: [mktShare + 0.3, mktShare + 0.2, mktShare + 0.1, mktShare, mktShare - 0.1, mktShare - 0.2, mktShare],
                status: marketShareKPI?.status ?? (mktShare >= mktShareTarget ? 'good' : 'warning'),
                driverCategory: 'market-position'
            },
            {
                label: 'Segment Growth',
                value: `${segGrowth}%`,
                change: segGrowth,
                target: 6.0,
                vsTarget: parseFloat((segGrowth - 6.0).toFixed(1)),
                trend: dbData?.financials?.quarters?.map(q => q.revenueYoY) ?? [3.1, 3.5, 4.0, 4.3, 4.8, 5.0, segGrowth],
                status: segGrowth >= 6 ? 'good' : segGrowth >= 3 ? 'warning' : 'critical' as 'good' | 'warning' | 'critical',
                driverCategory: 'growth'
            },
            {
                label: 'AUM',
                value: selectedValueView === 'Per Unit' ? '¥2.1B' : (rewardsKPI?.value ?? '¥960B'),
                subLabel: selectedValueView === 'Per Unit' ? 'per product avg' : 'XTANDI global revenue',
                change: rewardsKPI ? parseFloat(rewardsKPI.trendValue) || 4.0 : 4.0,
                target: selectedValueView === 'Per Unit' ? 2500 : 170,
                vsTarget: selectedValueView === 'Per Unit' ? -400 : -15,
                trend: [880, 900, 920, 935, 948, 958, 960],
                status: rewardsKPI?.status ?? 'good',
                driverCategory: 'customer'
            },
            {
                label: 'Adjusted Revenue Growth',
                value: compSalesKPI?.value ?? '6.8%',
                change: compSalesKPI ? parseFloat(compSalesKPI.trendValue) || 6.8 : 6.8,
                target: 8.0,
                vsTarget: -1.2,
                trend: [3.5, 4.2, 4.8, 5.5, 6.0, 6.4, 6.8],
                status: compSalesKPI?.status ?? 'warning',
                driverCategory: 'demand'
            }
        ];
    }, [dbData, selectedValueView]);

    // Market Share drivers — sourced from DB console driver tree when available
    const marketDrivers = useMemo(() => {
        const naDrivers = dbData?.naConsole?.keyDrivers;
        if (naDrivers && naDrivers.length > 0) {
            return naDrivers.map((driver, idx) => {
                // Convert DB metrics into the breakdown format
                const breakdown = driver.metrics.map((m) => {
                    const actual = parseFloat(m.currentValue) || 0;
                    const target = parseFloat(m.target) || 0;
                    const variance = actual - target;
                    const isLowerBetter = m.direction === 'down';
                    const absVar = Math.abs(variance);
                    let status: string = 'good';
                    if (isLowerBetter) {
                        status = variance <= 0 ? 'good' : absVar > 10 ? 'poor' : 'warning';
                    } else {
                        status = variance >= 0 ? 'good' : absVar > 5 ? 'poor' : 'warning';
                    }
                    return { name: m.name, actual, target, variance, status };
                });

                // Compute gauge from average target attainment
                const gauge = breakdown.length > 0
                    ? Math.round(breakdown.reduce((sum, b) => {
                        const pct = b.target !== 0 ? (b.actual / b.target) * 100 : 100;
                        return sum + Math.min(pct, 100);
                    }, 0) / breakdown.length)
                    : 70;

                const avgVar = breakdown.length > 0
                    ? breakdown.reduce((s, b) => s + b.variance, 0) / breakdown.length
                    : 0;

                return {
                    id: `driver-${idx}`,
                    category: driver.name,
                    value: breakdown[0]?.actual?.toString() ?? '–',
                    performance: avgVar,
                    gauge,
                    status: gauge >= 85 ? 'good' : gauge >= 70 ? 'warning' : 'poor',
                    keyDrivers: driver.subDrivers,
                    detailedBreakdown: breakdown,
                };
            });
        }

        // Fallback: Astellas Americas pharmaceutical market drivers
        return [
            {
                id: 'xtandi-market',
                category: 'XTANDI US Market Position & IRA Risk',
                value: '¥510B',
                performance: 4.0,
                gauge: 78,
                status: 'warning',
                keyDrivers: ['mCSPC Volume Growth +8% YoY', 'XTANDI US Net Price +4% (pre-IRA)', 'IRA MFP Negotiation Active (FY2026 effective)'],
                detailedBreakdown: [
                    { name: 'XTANDI US Net Revenue (¥B)', actual: 510, target: 520, variance: -10, status: 'warning' },
                    { name: 'XTANDI US Net Price YoY (%)', actual: 4.0, target: 4.0, variance: 0, status: 'good' },
                    { name: 'mCSPC New Patient Volume Growth (%)', actual: 8.0, target: 5.0, variance: 3.0, status: 'good' },
                    { name: 'IRA Price Sensitivity (¥B per 1pp reduction)', actual: 9.6, target: 0, variance: -9.6, status: 'poor' },
                    { name: 'XTANDI US Market Share (mCSPC, %)', actual: 52, target: 50, variance: 2, status: 'good' }
                ]
            },
            {
                id: 'padcev-growth',
                category: 'PADCEV US Commercial Acceleration',
                value: '¥221B',
                performance: 55.0,
                gauge: 92,
                status: 'good',
                keyDrivers: ['EV+pembro 1L urothelial standard-of-care', '+55% US revenue YoY', '>45% 1L urothelial market share'],
                detailedBreakdown: [
                    { name: 'PADCEV US Net Revenue (¥B)', actual: 221, target: 185, variance: 36, status: 'good' },
                    { name: 'PADCEV US Revenue Growth YoY (%)', actual: 55, target: 40, variance: 15, status: 'good' },
                    { name: '1L Urothelial Market Share (%)', actual: 47, target: 40, variance: 7, status: 'good' },
                    { name: 'EV+pembro New Patient Starts YoY (%)', actual: 62, target: 40, variance: 22, status: 'good' },
                    { name: 'PADCEV Gross-to-Net (%)', actual: 28, target: 30, variance: 2, status: 'good' }
                ]
            },
            {
                id: 'launch-brands',
                category: 'VEOZAH & IZERVAY Launch Performance',
                value: '¥42B',
                performance: 12.0,
                gauge: 68,
                status: 'warning',
                keyDrivers: ['VEOZAH 14.5K unique prescribers (target 25K)', 'IZERVAY 12% GA market share (target 20%)', 'PSP enrollment: 15.4K combined (launch)'],
                detailedBreakdown: [
                    { name: 'VEOZAH US Net Revenue (¥B)', actual: 28, target: 32, variance: -4, status: 'warning' },
                    { name: 'VEOZAH Unique Prescribers (000s)', actual: 14.5, target: 25, variance: -10.5, status: 'poor' },
                    { name: 'IZERVAY US Net Revenue (¥B)', actual: 14, target: 18, variance: -4, status: 'warning' },
                    { name: 'IZERVAY GA Market Share (%)', actual: 12, target: 20, variance: -8, status: 'poor' },
                    { name: 'Combined Launch PSP Enrollment (K)', actual: 15.4, target: 20, variance: -4.6, status: 'warning' }
                ]
            }
        ];
    }, [dbData]);

    // AI-Generated Market Opportunities — built from DB strategic data
    const marketOpportunities = useMemo(() => {
        const opps = dbData?.strategic?.keyOpportunities;
        const risks = dbData?.strategic?.risks;

        const items: Array<{
            id: number;
            type: string;
            priority: string;
            urgency: string;
            title: string;
            insight: string;
            impact: string;
            proposedAction: string;
            drivers: string[];
        }> = [];

        // Map key opportunities
        if (opps && opps.length > 0) {
            opps.forEach((opp, idx) => {
                items.push({
                    id: idx + 1,
                    type: 'opportunity',
                    priority: idx === 0 ? 'high' : 'medium',
                    urgency: idx === 0 ? 'immediate' : 'planned',
                    title: opp.title,
                    insight: opp.description,
                    impact: opp.revenueImpact,
                    proposedAction: `Timeline: ${opp.timeline}`,
                    drivers: [opp.timeline],
                });
            });
        }

        // Map risks as risk-type items
        if (risks && risks.length > 0) {
            risks.filter(r => r.severity === 'high').slice(0, 2).forEach((risk, idx) => {
                items.push({
                    id: 100 + idx,
                    type: 'risk',
                    priority: risk.severity,
                    urgency: risk.likelihood === 'high' ? 'urgent' : 'planned',
                    title: risk.title,
                    insight: risk.description,
                    impact: risk.impact,
                    proposedAction: risk.mitigation,
                    drivers: [risk.category, risk.owner],
                });
            });
        }

        // Sort: risks first when urgent, then opportunities by priority
        items.sort((a, b) => {
            if (a.urgency === 'urgent' && b.urgency !== 'urgent') return -1;
            if (b.urgency === 'urgent' && a.urgency !== 'urgent') return 1;
            if (a.priority === 'high' && b.priority !== 'high') return -1;
            if (b.priority === 'high' && a.priority !== 'high') return 1;
            return 0;
        });

        if (items.length > 0) return items;

        // Fallback: Astellas Pharma strategic opportunities and risks
        return [
            {
                id: 1,
                type: 'opportunity',
                priority: 'high',
                urgency: 'immediate',
                title: 'PADCEV EV+pembro 1L Penetration — 2L-to-1L Prescriber Conversion Acceleration',
                insight: 'PADCEV 1L urothelial carcinoma market share now >45% with EV+pembro NCCN Category 1 status established. Americas revenue growing +55% YoY. Opportunity to accelerate 2L-treating oncologists converting to 1L EV+pembro — a further 15-20% of still-unconverted oncologists represents ¥30-45B additional annual PADCEV revenue.',
                impact: '+¥30-45B incremental Americas revenue (FY26)',
                proposedAction: 'Deploy dedicated PADCEV medical education team to the top 200 2L-still-treating oncologists. Leverage 2-year OS data from EV-302 (65% mOS) vs cisplatin-gem as the primary conversion message. Co-promote with Merck field force.',
                drivers: ['PADCEV Field Force', 'Medical Affairs', 'Merck Co-Promotion']
            },
            {
                id: 2,
                type: 'risk',
                priority: 'high',
                urgency: 'urgent',
                title: 'XTANDI IRA MFP Negotiation — FY2026 Net Price Reduction Risk',
                insight: 'CMS has selected XTANDI (enzalutamide) for IRA Maximum Fair Price negotiation effective January 2026. Each 1pp net price reduction = ¥9.6B Core OP headwind. Analyst consensus range: 20-35% net price reduction. Base case: 25% net price reduction = ¥240B Core OP headwind — partially offset by volume growth and SMT savings.',
                impact: '-¥96-336B Core OP risk (FY2026, at 10-35% price reduction range)',
                proposedAction: 'Execute three parallel mitigation tracks: (1) mCSPC volume acceleration to offset unit price reduction — target +10% new patient starts; (2) SMT Americas savings of ¥8B FY26 to partially fund the headwind; (3) PADCEV/VEOZAH revenue acceleration to rebalance portfolio away from XTANDI concentration.',
                drivers: ['IRA Risk', 'Market Access', 'CFO Atsushi Kitamura']
            },
            {
                id: 3,
                type: 'opportunity',
                priority: 'medium',
                urgency: 'planned',
                title: 'VEOZAH Prescriber Base Expansion — OB/GYN Activation Beyond Early Adopters',
                insight: 'VEOZAH unique prescribers at 14.5K (57% of 25K FY26 target) after 18 months of commercialization. Awareness among OB/GYNs is high (>80% VMS indication awareness); the conversion gap is HCP comfort with prescribing a new non-hormonal mechanism. Prescribers who prescribe once continue (low abandonment rate post-first Rx).',
                impact: '+¥15-25B FY26 VEOZAH revenue (25K prescriber target achievement)',
                proposedAction: 'Scale VEOZAH commercial field force by 20% focused on mid-tier OB/GYN practices. Deploy clinical education program featuring patient case studies from early-adopter OB/GYNs. Expand formulary access (target 2 additional major PBM preferred tier wins by Q3 FY26).',
                drivers: ['VEOZAH Commercial', 'Formulary Access', 'Market Access']
            }
        ];
    }, [dbData]);

    const toggleDriverExpansion = (driverId: string) => {
        const newExpanded = new Set(expandedDrivers);
        if (newExpanded.has(driverId)) {
            newExpanded.delete(driverId);
        } else {
            newExpanded.add(driverId);
        }
        setExpandedDrivers(newExpanded);
    };

    const renderSparkline = (data: number[]) => {
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min;
        const width = 80;
        const height = 24;

        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - ((value - min) / range) * height;
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg width={width} height={height} className="inline-block">
                <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    points={points}
                    className="text-[#000000]"
                />
            </svg>
        );
    };

    const renderGauge = (value: number, status: string) => {
        const radius = 20;
        const circumference = 2 * Math.PI * radius;
        const strokeDasharray = `${(value / 100) * circumference} ${circumference}`;

        const color = status === 'good' ? '#10b981' : status === 'warning' ? '#f59e0b' : '#ef4444';

        return (
            <svg width="50" height="50" className="transform -rotate-90">
                <circle
                    cx="25"
                    cy="25"
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth="4"
                    fill="none"
                />
                <circle
                    cx="25"
                    cy="25"
                    r={radius}
                    stroke={color}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeLinecap="round"
                />
            </svg>
        );
    };

    return (
        <div className="space-y-6">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Executive Summary</h2>
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('insight')}
                        className={`px-4 py-2 text-sm font-medium rounded transition-colors ${viewMode === 'insight'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <div className="flex items-center">
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Insight
                        </div>
                    </button>
                    <button
                        onClick={() => setViewMode('heatmap')}
                        className={`px-4 py-2 text-sm font-medium rounded transition-colors ${viewMode === 'heatmap'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <div className="flex items-center">
                            <Grid className="w-4 h-4 mr-2" />
                            Heatmap
                        </div>
                    </button>
                </div>
            </div>

            {/* Key Metrics with Targets */}
            <div className="grid grid-cols-4 gap-4">
                {keyMetrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm p-5 hover:shadow-lg transition-all border border-gray-100"
                    >
                        <div className="space-y-3">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
                                <div className={`p-1.5 rounded-lg ${metric.status === 'good' ? 'bg-green-100' :
                                        metric.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                                    }`}>
                                    {metric.change > 0 ? (
                                        <TrendingUp className={`w-4 h-4 ${metric.status === 'good' ? 'text-green-600' :
                                                metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                            }`} />
                                    ) : metric.change < 0 ? (
                                        <TrendingDown className={`w-4 h-4 ${metric.status === 'good' ? 'text-green-600' :
                                                metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                            }`} />
                                    ) : (
                                        <Minus className="w-4 h-4 text-gray-600" />
                                    )}
                                </div>
                            </div>

                            {/* Value and Change */}
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {metric.value}
                                    {metric.subLabel && (
                                        <span className="text-sm font-normal text-gray-500 ml-1">{metric.subLabel}</span>
                                    )}
                                </p>
                                <p className={`text-sm font-medium mt-1 ${metric.change > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {metric.change > 0 ? '+' : ''}{metric.change}% {selectedComparison}
                                </p>
                            </div>

                            {/* Sparkline */}
                            <div className="pt-2">
                                {renderSparkline(metric.trend)}
                            </div>

                            {/* Target Comparison */}
                            <div className="pt-3 border-t border-gray-100 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Target</span>
                                    <span className="font-medium text-gray-700">
                                        {metric.target}{metric.subLabel ? ` ${metric.subLabel.split('/')[0]}` : '%'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Gap to Target</span>
                                    <span className={`font-medium ${metric.vsTarget >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {metric.vsTarget > 0 ? '+' : ''}{metric.vsTarget}
                                        {metric.subLabel ? (selectedValueView === 'Per Unit' ? '' : 'M') : 'pp'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Market Share Drivers Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-[#000000]" />
                        Market Share can be influenced through these areas:
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Key drivers impacting Astellas Americas market performance and strategic opportunities
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {marketDrivers.map((driver, index) => (
                        <motion.div
                            key={driver.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-lg border-2 ${driver.status === 'good' ? 'border-green-200 bg-green-50' :
                                    driver.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                                        'border-red-200 bg-red-50'
                                }`}
                        >
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{driver.category}</h4>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{driver.value}</p>
                                        <p className={`text-sm font-medium ${driver.performance > 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {driver.performance > 0 ? '+' : ''}{driver.performance}%
                                        </p>
                                    </div>
                                    <div className="transform rotate-90">
                                        {renderGauge(driver.gauge, driver.status)}
                                    </div>
                                </div>

                                <div className="space-y-1 mb-4">
                                    <p className="text-xs font-medium text-gray-700">Key Drivers:</p>
                                    {driver.keyDrivers.map((kd) => (
                                        <p key={kd} className="text-xs text-gray-600 pl-2">&#8226; {kd}</p>
                                    ))}
                                </div>

                                <button
                                    onClick={() => toggleDriverExpansion(driver.id)}
                                    className="w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                                >
                                    Review
                                    {expandedDrivers.has(driver.id) ? (
                                        <ChevronDown className="w-4 h-4 ml-1" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    )}
                                </button>
                            </div>

                            {/* Expanded Breakdown */}
                            <AnimatePresence>
                                {expandedDrivers.has(driver.id) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 pt-0">
                                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                <h5 className="text-sm font-semibold text-gray-900 mb-3">Detailed Breakdown</h5>
                                                <div className="space-y-2">
                                                    {driver.detailedBreakdown.map((item, idx) => (
                                                        <div key={idx} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                                                            <span className="text-xs text-gray-700">{item.name}</span>
                                                            <div className="flex items-center space-x-3">
                                                                <span className="text-xs font-medium text-gray-900">
                                                                    {item.actual}{typeof item.actual === 'number' && item.actual < 100 ? '%' : ''}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    vs {item.target}
                                                                </span>
                                                                <span className={`text-xs font-medium ${item.status === 'good' ? 'text-green-600' :
                                                                        item.status === 'warning' ? 'text-yellow-600' :
                                                                            'text-red-600'
                                                                    }`}>
                                                                    {item.variance > 0 ? '+' : ''}{item.variance}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* AI-Powered Market Opportunities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-[#000000]" />
                        Opportunities to improve Market Share
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        AI-identified opportunities sorted by urgency and impact
                    </p>
                </div>

                <div className="space-y-4">
                    {marketOpportunities.map((opp) => (
                        <motion.div
                            key={opp.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`relative p-5 rounded-lg border ${opp.type === 'opportunity' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start space-x-3">
                                    {opp.type === 'opportunity' ? (
                                        <div className="p-2 bg-emerald-100 rounded-lg">
                                            <Lightbulb className="w-5 h-5 text-[#000000]" />
                                        </div>
                                    ) : (
                                        <div className="p-2 bg-red-100 rounded-lg">
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{opp.title}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{opp.insight}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${opp.priority === 'high' ? 'bg-red-100 text-red-700' :
                                            opp.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700'
                                        }`}>
                                        {opp.priority}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${opp.urgency === 'immediate' ? 'bg-emerald-100 text-[#000000]' :
                                            opp.urgency === 'urgent' ? 'bg-orange-100 text-orange-700' :
                                                'bg-[#F0F0F0] text-[#000000]'
                                        }`}>
                                        {opp.urgency}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-3 mb-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">Proposed Action:</p>
                                <p className="text-sm text-gray-600">{opp.proposedAction}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Expected Impact</p>
                                        <p className="text-sm font-semibold text-gray-900">{opp.impact}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Related Drivers</p>
                                        <p className="text-xs text-gray-700">{opp.drivers.join(', ')}</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-[#000000] text-white rounded-lg text-sm font-medium hover:bg-[#1A1A1A] transition-colors flex items-center">
                                    Take Action
                                    <ArrowUpRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>


            {/* Related Reports — depth for analysts */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-[#000000]" />
                        <h3 className="text-lg font-semibold text-gray-900">Related Reports</h3>
                    </div>
                    <Link href="/report-hub" className="text-sm text-[#000000] hover:underline flex items-center">
                        View All Reports <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                        { id: 'fin-2', name: 'Americas Revenue by Product', freq: 'Weekly', desc: 'XTANDI, PADCEV, VEOZAH, IZERVAY Americas net revenue breakdown with IRA sensitivity waterfall' },
                        { id: 'fin-3', name: 'Net Price Realization Report', freq: 'Weekly', desc: 'Gross-to-net by product, gross price vs net price trends, IRA impact scenarios' },
                        { id: 'daily-sales-flash', name: 'Weekly Prescription Flash', freq: 'Weekly', desc: 'TRx/NRx summary across XTANDI/PADCEV/VEOZAH/IZERVAY with prescriber-level market share' },
                        { id: 'pricing-promo', name: 'IRA Scenario Analysis Report', freq: 'Monthly', desc: 'XTANDI MFP negotiation scenarios: 10-35% net price reduction Core OP sensitivity and mitigation offset tracking' },
                    ].map(report => (
                        <Link
                            key={report.id}
                            href={`/report-hub/${report.id}`}
                            className="group bg-gray-50 hover:bg-[#F0F0F0]/30 border border-gray-200 hover:border-[#000000]/30 rounded-lg p-4 transition-all"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#000000] line-clamp-2">
                                    {report.name}
                                </h4>
                                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#000000] flex-shrink-0 mt-0.5" />
                            </div>
                            <p className="text-xs text-gray-500 mb-2 line-clamp-2">{report.desc}</p>
                            <span className="inline-block px-2 py-0.5 bg-emerald-100 text-[#000000] text-xs font-medium rounded-full">
                                {report.freq}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}
