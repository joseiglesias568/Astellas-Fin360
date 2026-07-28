'use client';

import { motion } from 'framer-motion';
import {
    ArrowRight,
    BarChart3,
    Building2,
    Clock,
    DollarSign,
    Globe,
    Landmark,
    Minus,
    PieChart,
    Scale,
    Target,
    TrendingDown,
    TrendingUp,
    Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import type { FinancialConfig, KPIConfig, KPIMetric } from '@/config/types';

// ── Types ────────────────────────────────────────────────────────────────────

type TileStatus = 'good' | 'warning' | 'critical';

export interface CFOTileData {
    id: string;
    insightId: number;
    categoryLabel: string;
    headlineValue: string;
    headlineLabel: string;
    trendDirection: 'up' | 'down' | 'flat';
    trendValue: string;
    status: TileStatus;
    contextLine: string;
    targetPercent?: number;
    targetLabel?: string;
    sparkline?: number[];
    href: string;
    icon: LucideIcon;
}

interface HomeTileSectionProps {
    sectionTitle: string;
    sectionSubtitle?: string;
    linkHref?: string;
    linkLabel?: string;
    tiles: CFOTileData[];
    variant: 'hero' | 'white';
    onTileClick: (tile: CFOTileData) => void;
}

// ── Status display helpers ───────────────────────────────────────────────────

const statusConfig = {
    good:     { bar: 'bg-[#000000]', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'On Track' },
    warning:  { bar: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Monitor' },
    critical: { bar: 'bg-red-500',   badge: 'bg-red-50 text-red-700 border-red-200', label: 'Below Target' },
};

const trendColor = {
    good: 'text-emerald-600',
    warning: 'text-amber-600',
    critical: 'text-red-600',
};

// ── Sparkline SVGs ──────────────────────────────────────────────────────────

function SparklineSVG({ points, status }: { points: number[]; status: TileStatus }) {
    if (points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const w = 80, h = 24, pad = 2;
    const coords = points.map((v, i) => {
        const x = pad + (i / (points.length - 1)) * (w - pad * 2);
        const y = pad + (1 - (v - min) / range) * (h - pad * 2);
        return `${x},${y}`;
    }).join(' ');
    const stroke = status === 'good' ? '#000000' : status === 'critical' ? '#ef4444' : '#f59e0b';
    return (
        <svg className="w-full h-6" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
            <polyline points={coords} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function HeroSparklineSVG({ points }: { points: number[] }) {
    if (points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const w = 80, h = 24, pad = 2;
    const coords = points.map((v, i) => {
        const x = pad + (i / (points.length - 1)) * (w - pad * 2);
        const y = pad + (1 - (v - min) / range) * (h - pad * 2);
        return `${x},${y}`;
    }).join(' ');
    return (
        <svg className="w-full h-6" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
            <polyline points={coords} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ── Hero Tile Card (glassmorphism on dark green) ─────────────────────────────

function HeroTileCard({ tile, onClick }: { tile: CFOTileData; onClick: () => void }) {
    const TileIcon = tile.icon;
    const statusDot = tile.status === 'good' ? 'bg-emerald-400'
        : tile.status === 'warning' ? 'bg-amber-400'
        : 'bg-red-400';

    return (
        <motion.div
            whileHover={{ y: -6, transition: { duration: 0.15 } }}
            onClick={onClick}
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all cursor-pointer overflow-hidden group"
        >
            <div className="p-5">
                {/* Status dot + Category */}
                <div className="flex items-center space-x-2 mb-3">
                    <div className={`w-2 h-2 rounded-full ${statusDot}`} />
                    <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
                        {tile.categoryLabel}
                    </span>
                    <div className="flex-1" />
                    <TileIcon className="w-4 h-4 text-white/30" />
                </div>

                {/* Headline number */}
                <div className="flex items-baseline space-x-2 mb-1">
                    <span className="text-2xl font-bold text-white">
                        {tile.headlineValue}
                    </span>
                </div>

                {/* KPI name */}
                <p className="text-xs font-medium text-white/70 mb-2">{tile.headlineLabel}</p>

                {/* Trend */}
                <div className="flex items-center space-x-1.5 mb-3">
                    {tile.trendDirection === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                    {tile.trendDirection === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-400" />}
                    {tile.trendDirection === 'flat' && <Minus className="w-3.5 h-3.5 text-white/40" />}
                    <span className={`text-xs font-medium ${
                        tile.status === 'good' ? 'text-emerald-400' :
                        tile.status === 'critical' ? 'text-red-400' :
                        'text-amber-400'
                    }`}>
                        {tile.trendValue}
                    </span>
                </div>

                {/* Sparkline */}
                {tile.sparkline && (
                    <div className="mb-3">
                        <HeroSparklineSVG points={tile.sparkline} />
                    </div>
                )}

                {/* Context line */}
                <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed">
                    {tile.contextLine}
                </p>
            </div>
        </motion.div>
    );
}

// ── White Tile Card (standard cards for white sections) ─────────────────────

function WhiteTileCard({ tile, onClick }: { tile: CFOTileData; onClick: () => void }) {
    const TileIcon = tile.icon;
    const sc = statusConfig[tile.status];

    return (
        <motion.div
            whileHover={{ y: -4, transition: { duration: 0.15 } }}
            onClick={onClick}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#000000]/20 transition-all cursor-pointer overflow-hidden group"
        >
            {/* Status accent bar */}
            <div className={`h-1 ${sc.bar}`} />

            <div className="p-5">
                {/* Category + Icon */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                        {tile.categoryLabel}
                    </span>
                    <TileIcon className="w-4 h-4 text-gray-300" />
                </div>

                {/* Headline number + status badge */}
                <div className="flex items-start justify-between mb-1">
                    <span className="text-2xl font-bold text-[#000000]">
                        {tile.headlineValue}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${sc.badge}`}>
                        {sc.label}
                    </span>
                </div>

                {/* KPI name */}
                <p className="text-xs font-medium text-gray-500 mb-2">{tile.headlineLabel}</p>

                {/* Trend */}
                <div className="flex items-center space-x-1.5 mb-3">
                    {tile.trendDirection === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />}
                    {tile.trendDirection === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
                    {tile.trendDirection === 'flat' && <Minus className="w-3.5 h-3.5 text-gray-400" />}
                    <span className={`text-xs font-medium ${trendColor[tile.status]}`}>
                        {tile.trendValue}
                    </span>
                </div>

                {/* Visual: Progress bar OR Sparkline */}
                {tile.targetPercent !== undefined && (
                    <div className="mb-3">
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${sc.bar}`}
                                style={{ width: `${Math.min(tile.targetPercent, 100)}%` }}
                            />
                        </div>
                        {tile.targetLabel && (
                            <p className="text-[10px] text-gray-400 mt-1">{tile.targetLabel}</p>
                        )}
                    </div>
                )}

                {tile.sparkline && !tile.targetPercent && (
                    <div className="mb-3">
                        <SparklineSVG points={tile.sparkline} status={tile.status} />
                    </div>
                )}

                {/* Context line */}
                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                    {tile.contextLine}
                </p>
            </div>
        </motion.div>
    );
}

// ── Build tile data from config ──────────────────────────────────────────────

function findKPI(kpis: KPIMetric[], substr: string): KPIMetric | undefined {
    return kpis.find(k => k.label.toLowerCase().includes(substr.toLowerCase()));
}

function formatKpiHeadline(m: KPIMetric | undefined, fallback: string): string {
    if (!m) return fallback;
    const v = String(m.value);
    if (m.unit === '¥B') return `¥${v}B`;
    if (m.unit === '¥' || m.unit === '¥/share') return `¥${v}`;
    if (m.unit === '$') return `$${v}`;
    if (m.unit === 'B') return `$${v}${m.unit}`;
    if (m.unit === 'x') return `${v}${m.unit}`;
    if (m.unit === '%' || m.unit === '¢') return `${v}${m.unit}`;
    return v + (m.unit ? ` ${m.unit}` : '');
}

const FY25_CORE_EPS_DISPLAY = 237;

export function buildHomeTiles(kpis: KPIConfig, fin: FinancialConfig) {
    const coreOP        = findKPI(kpis.primaryKPIs, 'Core Operating Profit');
    const revenue       = findKPI(kpis.primaryKPIs, 'Revenue');
    const coreEPS       = findKPI(kpis.primaryKPIs, 'Core EPS');
    const xtandi        = findKPI(kpis.primaryKPIs, 'XTANDI');
    const coreMargin    = findKPI(kpis.primaryKPIs, 'Core Operating Margin');

    const padcev        = findKPI(kpis.operationalKPIs, 'PADCEV');
    const veozah        = findKPI(kpis.operationalKPIs, 'VEOZAH');
    const vyloy         = findKPI(kpis.operationalKPIs, 'VYLOY');
    const smt           = findKPI(kpis.operationalKPIs, 'SMT Cost Savings');

    const fcf           = findKPI(kpis.financialKPIs, 'Free Cash Flow');
    const dividend      = findKPI(kpis.financialKPIs, 'Dividend Per Share');

    const epsTrend = fin.quarters.map(q => q.eps);

    const coreEPSNum = coreEPS ? Number(String(coreEPS.value).replace(/,/g, '')) : NaN;
    const earningsHeadline = Number.isFinite(coreEPSNum) && coreEPSNum >= 0
        ? `¥${coreEPS!.value}`
        : `¥${FY25_CORE_EPS_DISPLAY}`;
    const earningsLabel = Number.isFinite(coreEPSNum) && coreEPSNum >= 0
        ? 'Core EPS (FY25 actual)'
        : 'Core EPS (FY25)';
    const earningsTrend = coreEPS?.trendValue || '+49.8% vs ¥158.21 FY2024 (Core OP margin +520bps to 26.0%)';

    const fcfHeadline = formatKpiHeadline(fcf, '¥560B');

    // ── Section 1: CFO Financial Scorecard (Hero) — Core EPS, FCF, margin, XTANDI, revenue, dividend ──
    const heroTiles: CFOTileData[] = [
        {
            id: 'earnings-profitability',
            insightId: 15,
            categoryLabel: 'Core earnings',
            headlineValue: earningsHeadline,
            headlineLabel: earningsLabel,
            trendDirection: coreEPS?.trend ?? 'up',
            trendValue: earningsTrend,
            status: coreEPS?.status ?? 'good',
            contextLine: `Core OP ¥${coreOP?.value ?? 555.7}B (${coreMargin?.value ?? 26.0}% margin) FY25; FY26 guidance ¥580B Core OP and ¥250 Core EPS; SMT savings ¥40B FY26 run-rate driving further margin expansion to ~27.9%.`,
            sparkline: epsTrend.length >= 3 ? epsTrend : undefined,
            href: '/executive-summary',
            icon: BarChart3,
        },
        {
            id: 'free-cash-flow',
            insightId: 11,
            categoryLabel: 'Free cash flow',
            headlineValue: fcfHeadline,
            headlineLabel: 'Operating FCF (FY25)',
            trendDirection: fcf?.trend ?? 'up',
            trendValue: fcf?.trendValue ?? '+38.2% vs ¥405.4B FY2024',
            status: fcf?.status ?? 'good',
            contextLine: 'FY25 operating FCF ¥560.2B supports R&D investment (¥400B+/yr), ¥78/share dividend, and ¥80B share buyback authorization. Net cash position provides M&A optionality for bolt-on pipeline assets. FY26E FCF ≥¥600B.',
            href: '/executive-summary',
            icon: DollarSign,
        },
        {
            id: 'core-op-margin',
            insightId: 12,
            categoryLabel: 'Core OP Margin',
            headlineValue: formatKpiHeadline(coreMargin, '26.0%'),
            headlineLabel: 'Core Operating Margin (FY25)',
            trendDirection: coreMargin?.trend ?? 'up',
            trendValue: coreMargin?.trendValue ?? '+520bps vs 20.8% FY2024',
            status: coreMargin?.status ?? 'good',
            contextLine: 'Core OP margin 26.0% FY25; FY26 target 27.9% (+190bps). SMT program ¥21B FY25 → ¥40B FY26 run-rate is primary driver. High-margin oncology portfolio (PADCEV, VYLOY gross margins >80%) is structural tailwind.',
            href: '/executive-summary',
            icon: Scale,
        },
        {
            id: 'xtandi-franchise',
            insightId: 10,
            categoryLabel: 'XTANDI franchise',
            headlineValue: formatKpiHeadline(xtandi, '¥960.8B'),
            headlineLabel: 'XTANDI Net Sales (FY25 actual)',
            trendDirection: xtandi?.trend ?? 'up',
            trendValue: xtandi?.trendValue ?? '+5.3% vs ¥912.5B FY2024',
            status: xtandi?.status ?? 'good',
            contextLine: 'XTANDI global sales ¥960.8B (44.9% of revenue); US co-promotion with Pfizer. FY26E ~¥910B: royalty normalization headwind offset by volume resilience in mHSPC/nmCRPC. Each 1pp IRA price cut ≈ –¥9.6B Core OP.',
            href: '/executive-summary',
            icon: Target,
        },
        {
            id: 'revenue-capacity',
            insightId: 3,
            categoryLabel: 'Total revenue',
            headlineValue: formatKpiHeadline(revenue, '¥2,139B'),
            headlineLabel: 'Revenue (FY25 actual)',
            trendDirection: revenue?.trend ?? 'up',
            trendValue: revenue?.trendValue ?? '+11.9% vs ¥1,911.2B FY2024',
            status: revenue?.status ?? 'good',
            contextLine: 'FY25 revenue ¥2,139.2B (+11.9% YoY); US segment ¥940.2B (44%) the primary growth engine. FY26 guidance ¥2,210B (+3.3%). PADCEV and Strategic Brands portfolio (+¥130B) are primary incremental contributors.',
            href: '/executive-summary',
            icon: TrendingUp,
        },
        {
            id: 'capital-allocation',
            insightId: 8,
            categoryLabel: 'Dividend & capital return',
            headlineValue: formatKpiHeadline(dividend, '¥78'),
            headlineLabel: 'Annual dividend (FY25)',
            trendDirection: 'up',
            trendValue: dividend?.trendValue ?? '+¥4 vs ¥74 FY2024 · FY26 guidance ¥80/share',
            status: 'good',
            contextLine: 'Dividend ¥78/share FY25 (+¥4 YoY); FY26 guidance raised to ¥80/share. Payout ratio ~32.9% (Core EPS ¥237). ¥80B share buyback authorized FY25. Progressive dividend policy: maintain or increase aligned with Core EPS growth; no cuts since 2010 merger.',
            href: '/executive-summary',
            icon: PieChart,
        },
    ];

    // ── Section 2: Strategic Execution (White) ────────────────────────
    const strategicTiles: CFOTileData[] = [
        {
            id: 'padcev-launch',
            insightId: 4,
            categoryLabel: 'PADCEV — Oncology ADC',
            headlineValue: formatKpiHeadline(padcev, '¥221.2B'),
            headlineLabel: 'PADCEV Net Sales (FY25 actual)',
            trendDirection: padcev?.trend ?? 'up',
            trendValue: padcev?.trendValue ?? '+34.8% vs ¥164.1B FY2024',
            status: padcev?.status ?? 'good',
            contextLine: 'PADCEV (enfortumab vedotin) ¥221.2B FY25; FY26E ¥290B (+31%). First-line urothelial carcinoma approval with pembrolizumab (EV-302 data) is primary growth driver. Co-commercialized with Pfizer. ADC platform creating multiple indication expansion opportunities.',
            sparkline: [120, 140, 164, 195, 221, 250],
            href: '/executive-summary',
            icon: Users,
        },
        {
            id: 'veozah-launch',
            insightId: 5,
            categoryLabel: "VEOZAH — Women's Health",
            headlineValue: formatKpiHeadline(veozah, '¥46.6B'),
            headlineLabel: "VEOZAH Net Sales (FY25 actual)",
            trendDirection: veozah?.trend ?? 'up',
            trendValue: veozah?.trendValue ?? '+37.7% vs ¥33.8B FY2024',
            status: veozah?.status ?? 'good',
            contextLine: "VEOZAH (fezolinetant) ¥46.6B FY25; FY26E ¥65B (+40%). First-in-class NK3R antagonist for menopausal vasomotor symptoms — non-hormonal treatment. ~1.3M addressable US patients. Women's health expanding as a fourth commercial pillar alongside oncology, urology, and ophthalmology.",
            sparkline: [18, 25, 34, 41, 47, 55],
            href: '/executive-summary',
            icon: Building2,
        },
        {
            id: 'smt-savings',
            insightId: 8,
            categoryLabel: 'SMT Transformation',
            headlineValue: formatKpiHeadline(smt, '¥21B'),
            headlineLabel: 'SMT Savings Realized (FY25)',
            trendDirection: smt?.trend ?? 'up',
            trendValue: smt?.trendValue ?? '¥21B achieved: ¥11B SG&A + ¥10B R&D',
            status: smt?.status ?? 'good',
            contextLine: 'SMT program ¥21B FY25; FY26 incremental target ¥40B (¥65B cumulative 2-year total). Key levers: commercial model restructuring, R&D portfolio pruning, procurement savings, org simplification. Savings flow structurally to Core OP margin.',
            sparkline: [0, 5, 10, 15, 18, 21],
            href: '/executive-summary',
            icon: DollarSign,
        },
        {
            id: 'vyloy-pipeline',
            insightId: 10,
            categoryLabel: 'VYLOY — Gastric Cancer',
            headlineValue: formatKpiHeadline(vyloy, '¥63.1B'),
            headlineLabel: 'VYLOY Net Sales (FY25 actual)',
            trendDirection: vyloy?.trend ?? 'up',
            trendValue: vyloy?.trendValue ?? '+415.6% vs ¥12.2B FY2024 (new launch)',
            status: vyloy?.status ?? 'good',
            contextLine: 'VYLOY (zolbetuximab) ¥63.1B FY25 — fastest-growing product in Astellas portfolio. First-in-class CLDN18.2 antibody for HER2-negative gastric cancer. FY26E ¥120B as CDx penetration (38% → 55% target) and global reimbursement expand. Japan/China high gastric cancer incidence drives home-market advantage.',
            sparkline: [3, 8, 12, 30, 50, 63],
            href: '/executive-summary',
            icon: Target,
        },
    ];

    // ── Section 3: Risk & Growth Radar — Astellas pharmaceutical and market risks ──
    const riskTiles: CFOTileData[] = [
        {
            id: 'xtandi-ira-risk',
            insightId: 1,
            categoryLabel: 'XTANDI IRA Price Risk',
            headlineValue: '–¥9.6B/pp',
            headlineLabel: 'Core OP Impact per 1pp IRA Price Cut',
            trendDirection: 'down',
            trendValue: 'FY26 effective — Medicare negotiation outcome pending',
            status: 'warning',
            contextLine: 'XTANDI subject to IRA Medicare drug price negotiation effective 2026. Each 1pp price cut ≈ –¥9.6B Core OP. Base scenario: 5pp cut (–¥48B). Pfizer/Astellas joint defense in place. High uncertainty on final negotiated price relative to list price.',
            sparkline: [0, -9.6, -19.2, -28.8, -38.4, -48.0],
            href: '/business-consoles/north-america-performance',
            icon: Globe,
        },
        {
            id: 'fx-adverse-risk',
            insightId: 6,
            categoryLabel: 'FX Sensitivity (Yen)',
            headlineValue: '¥2.1B/¥1',
            headlineLabel: 'Core OP Sensitivity per ¥1 USD/JPY Move',
            trendDirection: 'flat',
            trendValue: 'Baseline ¥151/USD — yen appreciation = headwind',
            status: 'warning',
            contextLine: 'Each ¥1 yen appreciation vs USD = –¥2.1B Core OP. Adverse scenario ¥141/USD = –¥21B Core OP headwind. ~60% of revenue USD/EUR denominated; Astellas is a structural net USD earner. Treasury manages via natural hedges and FX forwards.',
            sparkline: [151, 152, 150, 148, 146, 143],
            href: '/business-consoles/north-america-performance',
            icon: Globe,
        },
        {
            id: 'japan-nhi-risk',
            insightId: 7,
            categoryLabel: 'Japan NHI Pricing',
            headlineValue: '¥289B',
            headlineLabel: 'Japan Segment Revenue (FY25)',
            trendDirection: 'flat',
            trendValue: 'Biennial NHI revision April 2026 — base –8% scenario',
            status: 'warning',
            contextLine: 'Japan NHI biennial price revision next: April 2026. Base revision scenario –8%; adverse –12%. Japan segment ¥289B (13.5% of total); each –1pp NHI revision ≈ –¥2.9B Japan revenue. Astellas pursuing smaller-than-average revision given XTANDI/VYLOY innovation value.',
            sparkline: [280, 282, 285, 287, 289, 286],
            href: '/executive-summary',
            icon: TrendingDown,
        },
        {
            id: 'rd-pipeline-risk',
            insightId: 14,
            categoryLabel: 'R&D Intensity & Pipeline',
            headlineValue: '20.7%',
            headlineLabel: 'R&D / Revenue Ratio (FY25)',
            trendDirection: 'up',
            trendValue: '3 POC milestones FY25 — 12 active oncology programs',
            status: 'good',
            contextLine: 'R&D intensity 20.7% (¥443B FY25); FY26 plan ¥457B. 3 POC milestones achieved FY25 (vs guidance). 12 active oncology pipeline programs. R&D execution risk: Phase 3 failures in core oncology indications could delay next-gen product cycle beyond FY28.',
            sparkline: [19.5, 20.0, 20.3, 20.5, 20.7, 20.7],
            href: '/executive-summary',
            icon: Clock,
        },
    ];

    return { heroTiles, strategicTiles, riskTiles };
}

// ── Main Section Component ──────────────────────────────────────────────────

export default function HomeTileSection({
    sectionTitle,
    sectionSubtitle,
    linkHref,
    linkLabel,
    tiles,
    variant,
    onTileClick,
}: HomeTileSectionProps) {
    const TileComponent = variant === 'hero' ? HeroTileCard : WhiteTileCard;

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className={`text-lg font-bold ${variant === 'hero' ? 'text-white' : 'text-gray-900'}`}>
                        {sectionTitle}
                    </h2>
                    {sectionSubtitle && (
                        <p className={`text-xs mt-0.5 ${variant === 'hero' ? 'text-white/50' : 'text-gray-500'}`}>
                            {sectionSubtitle}
                        </p>
                    )}
                </div>
                {linkHref && linkLabel && (
                    <Link
                        href={linkHref}
                        className={`inline-flex items-center text-sm font-medium transition-colors ${
                            variant === 'hero'
                                ? 'text-white/70 hover:text-white'
                                : 'text-[#000000] hover:text-[#000000]'
                        }`}
                    >
                        {linkLabel} <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                )}
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${(tiles?.length ?? 0) > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
                {(tiles ?? []).map(tile => (
                    <TileComponent
                        key={tile.id}
                        tile={tile}
                        onClick={() => onTileClick(tile)}
                    />
                ))}
            </div>
        </div>
    );
}
