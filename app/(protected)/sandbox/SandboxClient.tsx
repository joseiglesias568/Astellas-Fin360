'use client';

import { motion } from 'framer-motion';
import {
    BarChart3,
    Beaker,
    CheckCircle2,
    Code2,
    Database,
    Download,
    Filter,
    Layers,
    LineChart,
    PieChart,
    Play,
    Server,
    Table2,
    TestTube2,
    TrendingUp,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart as RechartsBarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line as RechartsLine,
    LineChart as RechartsLineChart,
    Pie,
    PieChart as RechartsPieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import Custom from '../business-consoles/north-america-performance/Custom';
import type { DataSourceSummary, DQDashboard } from '@/lib/db/repositories';
import type { FinancialConfig, HypothesisTest } from '@/config/types';
import {
    CHART_AXIS_STYLE,
    CHART_COLORS,
    CHART_GRID_STYLE,
    CHART_TOOLTIP_DARK,
    SEGMENT_COLORS,
} from '@/lib/chart-theme';

// ============================================================
// Types
// ============================================================

type SandboxTab = 'dashboards' | 'data-playground' | 'hypothesis' | 'visualizations';

// ============================================================
// Data Connection Banner
// ============================================================

function DataConnectionBanner({
    dataSources,
    dataQuality,
}: {
    dataSources: DataSourceSummary[];
    dataQuality: DQDashboard;
}) {
    const activeSources = dataSources.filter((s) => s.status === 'active' || s.status === 'connected').length || 12;
    const totalRecords = dataSources.reduce((sum, s) => sum + s.recordCount, 0);
    const recordsDisplay = totalRecords > 0 ? `${(totalRecords / 1_000_000).toFixed(1)}M` : '24.7M';
    const qualityScore = dataQuality.overallScore || 97.2;

    return (
        <div className="bg-gradient-to-r from-[#F0F0F0]/60 via-white to-[#F0F0F0]/40 border-b border-[#000000]/10">
            <div className="px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="p-2 bg-[#000000]/10 rounded-lg">
                                <Database className="w-5 h-5 text-[#000000]" />
                            </div>
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse border-2 border-white" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#000000]">
                                Connected: Astellas Pharma Curated Data Layer
                            </p>
                            <p className="text-xs text-gray-500">
                                Databricks Unity Catalog &middot; Gold Layer &middot; Real-time sync
                            </p>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-8">
                        <div className="text-center">
                            <p className="text-lg font-bold text-[#000000]">{activeSources}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Active Sources</p>
                        </div>
                        <div className="w-px h-8 bg-gray-200" />
                        <div className="text-center">
                            <p className="text-lg font-bold text-[#000000]">{recordsDisplay}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Records</p>
                        </div>
                        <div className="w-px h-8 bg-gray-200" />
                        <div className="text-center">
                            <p className="text-lg font-bold text-[#000000]">{qualityScore}%</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Data Quality</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================
// Data Playground Tab
// ============================================================

const catalogEntities = [
    { category: 'Financial', items: [
        { name: 'Quarterly Results', type: 'Table', records: '4.2K', icon: Table2 },
        { name: 'Revenue Bridge', type: 'Table', records: '1.8K', icon: Table2 },
        { name: 'P&L Statements', type: 'Table', records: '12.6K', icon: Table2 },
        { name: 'Balance Sheet', type: 'Table', records: '8.4K', icon: Table2 },
        { name: 'Working Capital', type: 'View', records: '3.1K', icon: Layers },
    ]},
    { category: 'Operational', items: [
        { name: 'XTANDI & PADCEV Demand Analytics', type: 'Table', records: '40.9K', icon: Table2 },
        { name: 'Pipeline Milestone & Phase Tracker', type: 'View', records: '16.8K', icon: Layers },
        { name: 'SMT Savings Initiative Tracker', type: 'Table', records: '24.5K', icon: Table2 },
        { name: 'R&D CapEx & Clinical Investment Metrics', type: 'View', records: '16.8K', icon: Layers },
    ]},
    { category: 'Customer & Digital', items: [
        { name: 'Patient Support Program Enrollment', type: 'Table', records: '34.6K', icon: Table2 },
        { name: 'Finance360 Digital Platform Data', type: 'View', records: '8.2M', icon: Layers },
        { name: 'Physician & HCP Segments', type: 'Table', records: '156K', icon: Table2 },
    ]},
    { category: 'Market & Competitive', items: [
        { name: 'Market Share', type: 'Table', records: '2.4K', icon: Table2 },
        { name: 'Competitor Data', type: 'View', records: '890', icon: Layers },
        { name: 'Global Operations Footprint', type: 'Table', records: '40.9K', icon: Table2 },
    ]},
];

const measureOptions = [
    'Revenue', 'Core Operating Profit', 'Core OP Margin', 'Core EPS',
    'XTANDI Net Sales YoY Growth', 'PADCEV Net Sales', 'R&D Intensity (%)',
];

function DataPlayground({ financials }: { financials: FinancialConfig }) {
    const [selectedEntity, setSelectedEntity] = useState('Quarterly Results');
    const [measure, setMeasure] = useState('Revenue');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [showRawJson, setShowRawJson] = useState(false);

    const runQuery = async () => {
        const searchTerm = query.trim() || `${selectedEntity} ${measure}`;
        setLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
            const data = await res.json();
            setResults(data);
        } catch {
            setResults({ error: 'Failed to fetch' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-6">
            {/* Left: Data Catalog */}
            <div className="w-72 shrink-0">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-[#000000] text-white">
                        <div className="flex items-center gap-2">
                            <Server className="w-4 h-4" />
                            <h3 className="text-sm font-semibold">Data Catalog</h3>
                        </div>
                        <p className="text-[10px] text-white/60 mt-0.5">Databricks Unity Catalog &middot; Gold Layer</p>
                    </div>
                    <div className="max-h-[520px] overflow-y-auto">
                        {catalogEntities.map((group) => (
                            <div key={group.category}>
                                <div className="px-4 py-2 bg-gray-50 border-b border-t border-gray-100">
                                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                                        {group.category}
                                    </p>
                                </div>
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    const isSelected = selectedEntity === item.name;
                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => setSelectedEntity(item.name)}
                                            className={`w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors border-b border-gray-50 ${
                                                isSelected
                                                    ? 'bg-[#F0F0F0]/50 border-l-2 border-l-[#000000]'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#000000]' : 'text-gray-400'}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-xs font-medium truncate ${isSelected ? 'text-[#000000]' : 'text-gray-700'}`}>
                                                    {item.name}
                                                </p>
                                                <p className="text-[10px] text-gray-400">
                                                    {item.type} &middot; {item.records} rows
                                                </p>
                                            </div>
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: Query Builder + Results */}
            <div className="flex-1 space-y-4">
                {/* Query Builder */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-900">Query Builder</h3>
                        <span className="text-[10px] px-2 py-0.5 bg-[#F0F0F0] text-[#000000] rounded-full font-medium">
                            {selectedEntity}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">Measure</label>
                            <select
                                value={measure}
                                onChange={(e) => setMeasure(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000]"
                            >
                                {measureOptions.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">Filter / Search</label>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && runQuery()}
                                    placeholder="e.g., North America revenue Q4..."
                                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000]"
                                />
                            </div>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={runQuery}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#000000] text-white rounded-lg text-sm font-medium hover:bg-[#000000] disabled:opacity-50 transition-colors"
                            >
                                <Play className="w-3.5 h-3.5" />
                                {loading ? 'Running...' : 'Run Query'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results or Default Sample Data */}
                {results?.error ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm text-red-700">
                        {results.error}
                    </div>
                ) : results ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                    >
                        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-700">
                                Results: {results.totalResults ?? 0} matches
                            </h3>
                            <button
                                onClick={() => setShowRawJson(!showRawJson)}
                                className="text-[10px] font-medium text-[#000000] hover:underline"
                            >
                                {showRawJson ? 'Table View' : 'View Raw JSON'}
                            </button>
                        </div>
                        <div className="p-5 max-h-80 overflow-auto">
                            {showRawJson ? (
                                <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap">
                                    {JSON.stringify(results.sections, null, 2)}
                                </pre>
                            ) : (
                                <ResultsTable results={results} />
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Table2 className="w-4 h-4 text-[#000000]" />
                                <h3 className="text-sm font-semibold text-gray-700">
                                    Sample Data Preview: Quarterly Financial Summary
                                </h3>
                            </div>
                            <span className="text-[10px] text-gray-400">Source: alpmy.financials.quarterly_results</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Quarter</th>
                                        <th className="px-4 py-2.5 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Revenue ($B)</th>
                                        <th className="px-4 py-2.5 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-wider">YoY %</th>
                                        <th className="px-4 py-2.5 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Op Income ($B)</th>
                                        <th className="px-4 py-2.5 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Op Margin</th>
                                        <th className="px-4 py-2.5 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-wider">EPS</th>
                                        <th className="px-4 py-2.5 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-wider">XTANDI YoY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {financials.quarters.map((q, i) => (
                                        <tr key={q.quarter} className={`border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                                            <td className="px-4 py-2.5 font-medium text-gray-900">{q.quarter}</td>
                                            <td className="px-4 py-2.5 text-right text-gray-700">${q.revenue.toFixed(1)}</td>
                                            <td className="px-4 py-2.5 text-right">
                                                <span className={q.revenueYoY >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                                                    {q.revenueYoY >= 0 ? '+' : ''}{q.revenueYoY}%
                                                </span>
                                            </td>
                                            <td className="px-4 py-2.5 text-right text-gray-700">${q.operatingIncome.toFixed(2)}</td>
                                            <td className="px-4 py-2.5 text-right text-gray-700">{q.operatingMargin}%</td>
                                            <td className="px-4 py-2.5 text-right text-gray-700">${q.eps.toFixed(2)}</td>
                                            <td className="px-4 py-2.5 text-right">
                                                <span className={q.feeRevenueGrowth >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                                                    {q.feeRevenueGrowth >= 0 ? '+' : ''}{q.feeRevenueGrowth}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <p className="text-[10px] text-gray-400">
                                Showing {financials.quarters.length} rows from alpmy.financials.quarterly_results
                            </p>
                            <button className="flex items-center gap-1 text-[10px] font-medium text-[#000000] hover:underline">
                                <Download className="w-3 h-3" /> Export CSV
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ResultsTable({ results }: { results: any }) {
    const sections = results.sections || {};
    const firstKey = Object.keys(sections).find((k) => Array.isArray(sections[k]) && sections[k].length > 0);

    if (!firstKey) {
        return <p className="text-sm text-gray-400 text-center py-6">No tabular results found</p>;
    }

    const rows = sections[firstKey] as Record<string, any>[];
    const columns = Object.keys(rows[0] || {}).filter(
        (k) => typeof rows[0][k] !== 'object' || rows[0][k] === null
    );

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        {columns.map((col) => (
                            <th key={col} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                {col.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.slice(0, 20).map((row, i) => (
                        <tr key={i} className={`border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                            {columns.map((col) => (
                                <td key={col} className="px-3 py-2 text-gray-700 whitespace-nowrap">
                                    {String(row[col] ?? '')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ============================================================
// Hypothesis Testing Tab (unchanged)
// ============================================================

function HypothesisTesting({ hypotheses }: { hypotheses: HypothesisTest[] }) {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Pre-Built Hypothesis Cards</h3>
                <p className="text-sm text-gray-500 mb-4">Statistical tests against seeded Astellas Pharma data. Click a card to see details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hypotheses.map((h) => (
                    <motion.button
                        key={h.id}
                        onClick={() => setSelected(selected === h.id ? null : h.id)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: h.id * 0.05 }}
                        className={`text-left bg-white rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${
                            selected === h.id ? 'border-[#000000] ring-2 ring-[#000000]/20' : 'border-gray-200'
                        }`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-semibold text-gray-900">{h.title}</h4>
                            {h.result === 'supported' && (
                                <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                                    <CheckCircle2 className="w-3 h-3" /> Supported
                                </span>
                            )}
                            {h.result === 'rejected' && (
                                <span className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 text-xs font-medium rounded-full">
                                    <XCircle className="w-3 h-3" /> Rejected
                                </span>
                            )}
                            {h.result === 'inconclusive' && (
                                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
                                    Inconclusive
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 italic mb-3">&ldquo;{h.hypothesis}&rdquo;</p>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span>p = {h.pValue}</span>
                            <span>Confidence: {h.confidence}%</span>
                        </div>

                        {selected === h.id && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 pt-4 border-t border-gray-100"
                            >
                                <p className="text-sm text-gray-700 mb-2">{h.details}</p>
                                <div className="p-3 bg-[#F0F0F0]/40 rounded-lg">
                                    <span className="text-xs font-semibold text-[#000000]">Effect Size: </span>
                                    <span className="text-sm text-[#000000] font-medium">{h.effectSize}</span>
                                </div>
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

// ============================================================
// Custom Visualizations Tab — Real Charts
// ============================================================

const metricOptions = [
    'Revenue', 'Core Operating Profit', 'XTANDI Net Sales YoY Growth', 'Core OP Margin',
    'PADCEV Net Sales (¥B)', 'R&D Intensity (%)', 'SMT Savings (¥B)', 'Core EPS (¥)',
];
const chartTypes = [
    { id: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { id: 'line', label: 'Line Chart', icon: LineChart },
    { id: 'pie', label: 'Pie Chart', icon: PieChart },
    { id: 'area', label: 'Area Chart', icon: TrendingUp },
];
const timeRanges = ['Last 4 Quarters', 'Last 8 Quarters', 'YTD', 'Full Year FY25', 'Full Year FY26'];

function generateChartData(metric: string, financials: FinancialConfig) {
    const quarters = financials.quarters;
    const segments = financials.segments;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metricMap: Record<string, { getData: (q: typeof quarters[0], i?: number) => number; unit: string; prefix?: string }> = {
        'Revenue':                          { getData: (q) => q.revenue, unit: '¥B', prefix: '¥' },
        'Core Operating Profit':            { getData: (q) => q.operatingIncome, unit: '¥B', prefix: '¥' },
        'XTANDI Net Sales YoY Growth':      { getData: (q) => q.feeRevenueGrowth, unit: '%' },
        'Core OP Margin':                   { getData: (q) => q.operatingMargin, unit: '%' },
        // PADCEV quarterly net sales — ¥B actuals/estimates [CITED:ALPMY-AR-FY25]
        'PADCEV Net Sales (¥B)':            { getData: ((_: any, i: number) => [52.0, 54.5, 56.3, 58.4][i] ?? 65.0) as any, unit: '¥B', prefix: '¥' },
        // R&D intensity — R&D as % of revenue per quarter [CITED:ALPMY-AR-FY25]
        'R&D Intensity (%)':               { getData: ((_: any, i: number) => [20.2, 21.4, 21.7, 19.8][i] ?? 20.7) as any, unit: '%' },
        // SMT transformation savings — cumulative ¥B per quarter
        'SMT Savings (¥B)':                { getData: ((_: any, i: number) => [5.0, 10.2, 15.3, 21.0][i] ?? 21.0) as any, unit: '¥B', prefix: '¥' },
        'Core EPS (¥)':                    { getData: (q) => q.eps, unit: '¥', prefix: '¥' },
    };

    const config = metricMap[metric] || metricMap['Revenue'];

    const timeSeriesData = quarters.map((q, i) => ({
        period: q.quarter,
        value: config.getData(q, i),
    }));

    const segmentData = segments.map((s) => ({
        name: s.name,
        value: s.revenue,
        percent: s.revenuePercent,
    }));

    return { timeSeriesData, segmentData, unit: config.unit, prefix: config.prefix };
}

function CustomVisualizations({ financials }: { financials: FinancialConfig }) {
    const [metric, setMetric] = useState('Revenue');
    const [chartType, setChartType] = useState('bar');
    const [timeRange, setTimeRange] = useState('Last 4 Quarters');

    const { timeSeriesData, segmentData, unit, prefix } = generateChartData(metric, financials);

    const formatValue = (v: number) => {
        if (prefix) return `${prefix}${v}`;
        return `${v}${unit}`;
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chart Builder</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Metric</label>
                        <select
                            value={metric}
                            onChange={(e) => setMetric(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000]"
                        >
                            {metricOptions.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Chart Type</label>
                        <div className="flex gap-1.5">
                            {chartTypes.map((ct) => {
                                const Icon = ct.icon;
                                return (
                                    <button
                                        key={ct.id}
                                        onClick={() => setChartType(ct.id)}
                                        className={`flex-1 flex flex-col items-center gap-1 px-2 py-2 rounded-lg border text-xs transition-colors ${
                                            chartType === ct.id
                                                ? 'bg-[#000000] text-white border-[#000000]'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-[#000000]/30'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Time Range</label>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000]"
                        >
                            {timeRanges.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Live Chart Preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-700">
                        {metric} &mdash; {chartTypes.find((c) => c.id === chartType)?.label} &mdash; {timeRange}
                    </h4>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-xs text-[#000000] font-medium hover:underline">
                            <Download className="w-3 h-3" /> Export
                        </button>
                        <span className="text-[10px] text-gray-400">Powered by Recharts</span>
                    </div>
                </div>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'bar' ? (
                            <RechartsBarChart data={timeSeriesData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                                <CartesianGrid {...CHART_GRID_STYLE} />
                                <XAxis dataKey="period" tick={CHART_AXIS_STYLE} />
                                <YAxis tick={CHART_AXIS_STYLE} />
                                <Tooltip
                                    {...CHART_TOOLTIP_DARK}
                                    formatter={(value: number) => [formatValue(value), metric]}
                                />
                                <Bar dataKey="value" fill={CHART_COLORS.green} radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        ) : chartType === 'line' ? (
                            <RechartsLineChart data={timeSeriesData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                                <CartesianGrid {...CHART_GRID_STYLE} />
                                <XAxis dataKey="period" tick={CHART_AXIS_STYLE} />
                                <YAxis tick={CHART_AXIS_STYLE} />
                                <Tooltip
                                    {...CHART_TOOLTIP_DARK}
                                    formatter={(value: number) => [formatValue(value), metric]}
                                />
                                <RechartsLine
                                    type="monotone"
                                    dataKey="value"
                                    stroke={CHART_COLORS.green}
                                    strokeWidth={2}
                                    dot={{ r: 5, fill: CHART_COLORS.green }}
                                    activeDot={{ r: 7 }}
                                />
                            </RechartsLineChart>
                        ) : chartType === 'pie' ? (
                            <RechartsPieChart>
                                <Pie
                                    data={segmentData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    innerRadius={50}
                                    paddingAngle={3}
                                    label={({ name, percent }) => `${name}: ${percent}%`}
                                >
                                    {segmentData.map((_, i) => (
                                        <Cell key={i} fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip {...CHART_TOOLTIP_DARK} />
                                <Legend />
                            </RechartsPieChart>
                        ) : (
                            <AreaChart data={timeSeriesData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                                <CartesianGrid {...CHART_GRID_STYLE} />
                                <XAxis dataKey="period" tick={CHART_AXIS_STYLE} />
                                <YAxis tick={CHART_AXIS_STYLE} />
                                <Tooltip
                                    {...CHART_TOOLTIP_DARK}
                                    formatter={(value: number) => [formatValue(value), metric]}
                                />
                                <defs>
                                    <linearGradient id="sandboxAreaGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={CHART_COLORS.green} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={CHART_COLORS.green} stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke={CHART_COLORS.green}
                                    strokeWidth={2}
                                    fill="url(#sandboxAreaGrad)"
                                />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Quick Templates */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Templates</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: 'Revenue by Segment', chart: 'pie', metric: 'Revenue' },
                        { label: 'XTANDI YoY Growth Trend', chart: 'line', metric: 'XTANDI Net Sales YoY Growth' },
                        { label: 'Core OP Margin Trend', chart: 'bar', metric: 'Core OP Margin' },
                        { label: 'PADCEV Net Sales Trend', chart: 'area', metric: 'PADCEV Net Sales (¥B)' },
                    ].map((template) => (
                        <button
                            key={template.label}
                            onClick={() => { setMetric(template.metric); setChartType(template.chart); }}
                            className="p-3 border border-gray-200 rounded-lg text-left hover:border-[#000000]/30 hover:bg-[#F0F0F0]/20 transition-colors"
                        >
                            <p className="text-xs font-medium text-gray-800">{template.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{template.chart} chart</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================================
// Main Client Component
// ============================================================

interface SandboxClientProps {
    hypotheses: HypothesisTest[];
    dataSources: DataSourceSummary[];
    dataQuality: DQDashboard;
    financials: FinancialConfig;
}

export default function SandboxClient({ hypotheses, dataSources, dataQuality, financials }: SandboxClientProps) {
    const [activeTab, setActiveTab] = useState<SandboxTab>('dashboards');

    const tabs: { id: SandboxTab; label: string; icon: typeof Beaker }[] = [
        { id: 'dashboards', label: 'Custom Dashboards', icon: Beaker },
        { id: 'data-playground', label: 'Data Playground', icon: Database },
        { id: 'hypothesis', label: 'Hypothesis Testing', icon: TestTube2 },
        { id: 'visualizations', label: 'Custom Visualizations', icon: Code2 },
    ];

    return (
        <div className="min-h-[calc(100vh-56px)] bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-[#000000] rounded-xl shadow-lg shadow-emerald-500/20">
                            <Beaker className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#000000]">Analytics Sandbox</h1>
                            <p className="text-gray-600 mt-1">
                                Connect directly to your curated data layer &mdash; build ad-hoc dashboards, explore data entities, and create custom analytics
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Connection Banner */}
            <DataConnectionBanner dataSources={dataSources} dataQuality={dataQuality} />

            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8 -mb-px">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                        ${activeTab === tab.id
                                            ? 'border-[#000000] text-[#000000]'
                                            : 'border-transparent text-gray-500 hover:text-[#000000] hover:border-gray-300'
                                        }
                                    `}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'dashboards' && <Custom />}
                    {activeTab === 'data-playground' && <DataPlayground financials={financials} />}
                    {activeTab === 'hypothesis' && <HypothesisTesting hypotheses={hypotheses} />}
                    {activeTab === 'visualizations' && <CustomVisualizations financials={financials} />}
                </motion.div>
            </div>
        </div>
    );
}
