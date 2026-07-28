'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import PillarCard from './PillarCard';
import type { PillarData, PillarKPI } from './PillarCard';
import type { KPIConfig, StrategicConfig, StrategicInitiative } from '@/config/types';

interface StrategyExecutionRecord {
  id: number;
  companyId: number;
  pillar: string;
  kpiName: string;
  baseline: number;
  target: number;
  current: number;
  unit: string;
  status: string;
  quarterLabel: string;
  commentary: string;
}

interface StoreRenovationRecord {
  id: number;
  companyId: number;
  renovationType: string;
  segment: string;
  storesComplete: number;
  storesInProgress: number;
  storesPlanned: number;
  totalTarget: number;
  completionPct: number;
  avgCost: number;
  avgRevenueUplift: number | null;
  avgThroughputImprovement: number | null;
  quarterLabel: string;
}

interface StrategyExecutionClientProps {
  kpis: KPIConfig;
  strategic: StrategicConfig;
  strategyExecution: StrategyExecutionRecord[];
  storeRenovations: StoreRenovationRecord[];
}

const PILLAR_ORDER = [
  'XTANDI IRA Risk Management',
  'Strategic Brands Acceleration',
  'SMT Cost Transformation',
  'Capital Allocation & Financial Discipline',
  'R&D Pipeline & Business Development',
];

const PILLAR_DISPLAY_NAMES: Record<string, string> = {
  'XTANDI IRA Risk Management': 'XTANDI IRA Risk Management & Price Mitigation',
  'Strategic Brands Acceleration': 'Strategic Brands Acceleration (PADCEV / VEOZAH / IZERVAY)',
  'SMT Cost Transformation': 'SMT Cost Transformation & Operational Efficiency',
  'Capital Allocation & Financial Discipline': 'Capital Allocation & Balance Sheet Strength',
  'R&D Pipeline & Business Development': 'R&D Pipeline Execution & Business Development',
};

const PILLAR_SPARKLINES: Record<string, number[]> = {
  'XTANDI IRA Risk Management': [55, 58, 60, 62, 64, 66],
  'Strategic Brands Acceleration': [52, 58, 65, 72, 78, 84],
  'SMT Cost Transformation': [35, 42, 52, 62, 70, 78],
  'Capital Allocation & Financial Discipline': [60, 63, 66, 70, 74, 78],
  'R&D Pipeline & Business Development': [45, 50, 55, 60, 65, 70],
};

function computeOverallStatus(kpis: PillarKPI[]): 'on-track' | 'at-risk' | 'behind' | 'ahead' {
  if (!kpis.length) return 'on-track';
  const behindCount = kpis.filter(k => k.status === 'behind').length;
  const atRiskCount = kpis.filter(k => k.status === 'at-risk').length;
  const aheadCount = kpis.filter(k => k.status === 'ahead').length;
  if (behindCount >= 2) return 'behind';
  if (behindCount >= 1 || atRiskCount >= 2) return 'at-risk';
  if (aheadCount >= kpis.length / 2) return 'ahead';
  return 'on-track';
}

function computeOnTrackPercent(kpis: PillarKPI[]): number {
  if (!kpis.length) return 0;
  const onTrack = kpis.filter(k => k.status === 'on-track' || k.status === 'ahead').length;
  return Math.round((onTrack / kpis.length) * 100);
}

const statusIcons = {
  'on-track': { Icon: CheckCircle2, color: 'text-[#000000]', bg: 'bg-[#F0F0F0]' },
  'ahead': { Icon: TrendingUp, color: 'text-[#000000]', bg: 'bg-[#F0F0F0]' },
  'at-risk': { Icon: AlertTriangle, color: 'text-amber-700', bg: 'bg-amber-50' },
  'behind': { Icon: XCircle, color: 'text-red-700', bg: 'bg-red-50' },
  'completed': { Icon: CheckCircle2, color: 'text-[#000000]', bg: 'bg-[#F0F0F0]' },
};

export default function StrategyExecutionClient({
  kpis: _kpis,
  strategic,
  strategyExecution,
  storeRenovations: _storeRenovations,
}: StrategyExecutionClientProps) {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  // Build pillar data from DB records
  const pillars: PillarData[] = useMemo(() => {
    // Group strategy execution records by pillar
    const pillarMap = new Map<string, StrategyExecutionRecord[]>();
    for (const record of strategyExecution) {
      const existing = pillarMap.get(record.pillar) || [];
      existing.push(record);
      pillarMap.set(record.pillar, existing);
    }

    return PILLAR_ORDER.map(pillarName => {
      const records = pillarMap.get(pillarName) || [];
      const kpis: PillarKPI[] = records.map(r => ({
        kpiName: r.kpiName,
        baseline: r.baseline,
        current: r.current,
        target: r.target,
        unit: r.unit,
        status: r.status,
        commentary: r.commentary,
      }));

      // If no DB records, provide fallback KPIs
      if (kpis.length === 0) {
        return createFallbackPillar(pillarName);
      }

      const overallStatus = computeOverallStatus(kpis);
      const onTrackPercent = computeOnTrackPercent(kpis);
      const keyMetric = kpis[0];
      const keyMetricValue = keyMetric
        ? `${keyMetric.current}${keyMetric.unit === '%' ? '%' : keyMetric.unit === 'min' ? ' min' : keyMetric.unit === '¥' ? '' : ''}`
        : '--';

      return {
        name: PILLAR_DISPLAY_NAMES[pillarName] || pillarName,
        overallStatus,
        kpis,
        onTrackPercent,
        keyMetricValue,
        sparkline: PILLAR_SPARKLINES[pillarName] || [50, 55, 60, 65, 70, 75],
      };
    });
  }, [strategyExecution]);

  // Aggregate stats
  const overallOnTrack = useMemo(() => {
    const totalKPIs = pillars.reduce((sum, p) => sum + p.kpis.length, 0);
    const onTrack = pillars.reduce((sum, p) => sum + p.kpis.filter(k => k.status === 'on-track' || k.status === 'ahead').length, 0);
    return totalKPIs > 0 ? Math.round((onTrack / totalKPIs) * 100) : 0;
  }, [pillars]);

  const pillarStatusCounts = useMemo(() => ({
    onTrack: pillars.filter(p => p.overallStatus === 'on-track' || p.overallStatus === 'ahead').length,
    atRisk: pillars.filter(p => p.overallStatus === 'at-risk').length,
    behind: pillars.filter(p => p.overallStatus === 'behind').length,
  }), [pillars]);

  // Strategic initiatives for timeline
  const initiatives: StrategicInitiative[] = useMemo(() => {
    if (strategic?.initiatives?.length) {
      return strategic.initiatives.slice(0, 8);
    }
    return [];
  }, [strategic]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/business-consoles" className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-4 h-4 text-gray-500" />
            </Link>
            <Target className="w-6 h-6 text-[#000000]" />
            <div>
              <h1 className="text-2xl font-bold text-[#000000]">Astellas Pharma Finance360 Pipeline &amp; R&amp;D Execution</h1>
              <p className="text-sm text-gray-500 mt-0.5">CEO Naoki Okamura&apos;s strategic framework: IRA risk mitigation, PADCEV/VEOZAH brand acceleration, SMT ¥40B savings, R&amp;D pipeline execution, disciplined capital allocation</p>
            </div>
          </div>

          {/* Overall Status Bar */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="bg-[#F0F0F0]/30 rounded-lg p-4 border border-[#000000]/10">
              <p className="text-xs text-gray-500 mb-1">Overall KPI Achievement</p>
              <p className="text-2xl font-bold text-[#000000]">{overallOnTrack}%</p>
              <p className="text-xs text-gray-500 mt-1">{pillars.reduce((s, p) => s + p.kpis.length, 0)} KPIs tracked</p>
            </div>
            <div className="bg-[#F0F0F0]/30 rounded-lg p-4 border border-[#000000]/10">
              <p className="text-xs text-gray-500 mb-1">Pillars On Track</p>
              <p className="text-2xl font-bold text-[#000000]">{pillarStatusCounts.onTrack} / {pillars.length}</p>
              <div className="flex gap-1 mt-2">
                {pillars.map((p, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      p.overallStatus === 'on-track' || p.overallStatus === 'ahead' ? 'bg-[#000000]' :
                      p.overallStatus === 'at-risk' ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-100">
              <p className="text-xs text-gray-500 mb-1">At Risk</p>
              <p className="text-2xl font-bold text-amber-700">{pillarStatusCounts.atRisk}</p>
              <p className="text-xs text-gray-500 mt-1">pillars requiring attention</p>
            </div>
            <div className="bg-red-50/50 rounded-lg p-4 border border-red-100">
              <p className="text-xs text-gray-500 mb-1">Behind Schedule</p>
              <p className="text-2xl font-bold text-red-700">{pillarStatusCounts.behind}</p>
              <p className="text-xs text-gray-500 mt-1">pillars needing intervention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1440px] mx-auto">
        {/* Pillar Cards Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#000000] mb-4">Strategy Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pillar) => (
              <PillarCard
                key={pillar.name}
                pillar={pillar}
                isExpanded={expandedPillar === pillar.name}
                onToggle={() => setExpandedPillar(expandedPillar === pillar.name ? null : pillar.name)}
              />
            ))}
          </div>
        </div>

        {/* Timeline View */}
        {initiatives.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-[#000000]" />
              <h2 className="text-lg font-bold text-[#000000]">Strategic Initiative Timeline</h2>
            </div>

            <div className="space-y-3">
              {initiatives.map((initiative, idx) => {
                const statusCfg = statusIcons[initiative.status as keyof typeof statusIcons] || statusIcons['on-track'];
                const StatusIcon = statusCfg.Icon;

                return (
                  <motion.div
                    key={initiative.id ?? idx}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    {/* Status Icon */}
                    <div className={`p-2 rounded-lg ${statusCfg.bg} flex-shrink-0`}>
                      <StatusIcon className={`w-4 h-4 ${statusCfg.color}`} />
                    </div>

                    {/* Initiative Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{initiative.name}</h4>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${statusCfg.bg} ${statusCfg.color}`}>
                          {initiative.status.replace('-', ' ')}
                        </span>
                      </div>
                      {initiative.description && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{initiative.description}</p>
                      )}
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="w-24">
                        <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                          <span>Progress</span>
                          <span className="font-medium">{initiative.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              initiative.status === 'on-track' || initiative.status === 'completed' ? 'bg-[#000000]' :
                              initiative.status === 'at-risk' ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${initiative.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right text-[10px] text-gray-500 w-16">
                        <p>¥{initiative.spent}M</p>
                        <p className="text-gray-400">of ¥{initiative.budget}M</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Fallback data when DB records are not available
// =============================================================================

function createFallbackPillar(pillarName: string): PillarData {
  const fallbacks: Record<string, PillarData> = {
    'XTANDI IRA Risk Management': {
      name: 'XTANDI IRA Risk Management & Price Mitigation',
      overallStatus: 'at-risk',
      onTrackPercent: 55,
      keyMetricValue: '¥9.6B/1pp',
      sparkline: [55, 58, 60, 62, 64, 66],
      kpis: [
        { kpiName: 'IRA XTANDI Net Price Sensitivity (¥B Core OP per 1pp reduction)', baseline: 0, current: 9.6, target: 0, unit: '¥B/1pp', status: 'at-risk', commentary: 'IRA Maximum Fair Price (MFP) negotiation active — CMS selected XTANDI for FY2026 negotiation cohort. Each 1pp net price reduction from MFP = ¥9.6B annual Core OP headwind effective January 2026. Analyst consensus: 20-35% net price reduction range.' },
        { kpiName: 'XTANDI US Net Price Realization YoY (%)', baseline: 2.5, current: 4.0, target: 4.0, unit: '%', status: 'on-track', commentary: 'Q4 FY25 XTANDI US net price +4.0% YoY — positive pre-IRA; gross-to-net improvement and mCSPC volume mix driving outperformance. Final IRA MFP replaces negotiated price from January 2026.' },
        { kpiName: 'mCSPC Volume Growth (new patient starts YoY %)', baseline: 5.5, current: 8.0, target: 5.0, unit: '%', status: 'ahead', commentary: 'mCSPC +8% new patient starts YoY — above +5% target. Volume growth is the primary mechanism to partially offset IRA net price reduction: each +1pp volume growth = ~¥5.3B revenue offset.' },
        { kpiName: 'SMT Americas Savings (IRA mitigation, ¥B FY26)', baseline: 0, current: 2.0, target: 8.0, unit: '¥B (FY26 target)', status: 'on-track', commentary: '¥2B Americas SMT savings realized in Q1 FY26, tracking toward ¥8B FY26 target. SMT savings partially offset IRA headwinds: ¥8B savings = ~0.83pp of ¥9.6B/1pp IRA sensitivity.' },
      ],
    },
    'Strategic Brands Acceleration': {
      name: 'Strategic Brands Acceleration (PADCEV / VEOZAH / IZERVAY)',
      overallStatus: 'ahead',
      onTrackPercent: 88,
      keyMetricValue: '+55%',
      sparkline: [52, 58, 65, 72, 78, 84],
      kpis: [
        { kpiName: 'PADCEV US Revenue Growth YoY (%)', baseline: 28, current: 55, target: 40, unit: '%', status: 'ahead', commentary: 'PADCEV US +55% YoY — substantially exceeds >40% target. EV+pembrolizumab 1L urothelial carcinoma standard-of-care established; >45% new patient market share. 50/50 Merck collaboration co-promotion driving access. Trajectory: ¥300B+ US by FY27.' },
        { kpiName: 'VEOZAH US Unique Prescribers (cumulative)', baseline: 0, current: 14500, target: 25000, unit: 'prescribers', status: 'at-risk', commentary: '14,500 unique prescribers in 12 months — building momentum but below YE2026 target of 25,000. Prescriber-to-prescribing conversion is the key gap: awareness is high but active prescribing rate needs acceleration. OB/GYN targeting is the primary lever.' },
        { kpiName: 'IZERVAY Geographic Atrophy US Market Share (%)', baseline: 0, current: 12, target: 20, unit: '% of treated patients', status: 'at-risk', commentary: 'IZERVAY 12% GA market share — below >20% FY26 target. Competing in duopoly with Apellis SYFOVRE. Monthly dosing differentiation (vs SYFOVRE bimonthly) the key commercial lever. Major vision plan formulary wins are the critical near-term milestone.' },
        { kpiName: 'EV+pembro 1L New Patient Starts YoY (%)', baseline: 28, current: 62, target: 40, unit: '%', status: 'ahead', commentary: 'EV+pembro 1L new patient starts +62% YoY — NCCN Category 1 guideline adoption driving rapid penetration. EV+pembro combination has >45% 1L urothelial carcinoma market share.' },
      ],
    },
    'SMT Cost Transformation': {
      name: 'SMT Cost Transformation & Operational Efficiency',
      overallStatus: 'on-track',
      onTrackPercent: 78,
      keyMetricValue: '¥21B',
      sparkline: [35, 42, 52, 62, 70, 78],
      kpis: [
        { kpiName: 'SMT Savings Realized FY25 (¥B)', baseline: 0, current: 21, target: 21, unit: '¥B cumulative', status: 'on-track', commentary: '¥21B SMT savings realized in FY25 — on target. Simplify (SG&A efficiency ¥8B), Maximize (portfolio optimization ¥7B), Transform (manufacturing/IT ¥6B). ¥40B FY26 annualized target = 2x FY25 run-rate.' },
        { kpiName: 'SMT FY26 Annualized Target (¥B)', baseline: 21, current: 8, target: 40, unit: '¥B (FY26 annualized)', status: 'on-track', commentary: '¥8B realized Q1 FY26, tracking toward ¥40B FY26 annualized target. Q2-Q4 FY26 requires ¥32B additional savings realization. Supply chain (¥6B), SG&A (¥18B), manufacturing (¥8B), and IT systems (¥8B) are the four workstreams.' },
        { kpiName: 'SG&A as % of Core Revenue', baseline: 28.5, current: 26.8, target: 25.0, unit: '%', status: 'on-track', commentary: 'SG&A/Core Revenue ratio 26.8%, improved 170bps vs FY24 baseline. FY26 target 25.0% — requires ¥18B SG&A savings from SMT program. Commercial field force optimization (XTANDI/PADCEV/VEOZAH rationalization) is the largest single contributor.' },
        { kpiName: 'Core OP Margin (FY25 actual, %)', baseline: 24.8, current: 26.0, target: 26.0, unit: '%', status: 'on-track', commentary: 'Core OP margin 26.0% FY25 — on target. SMT savings contribution +120bps. PADCEV revenue mix benefit +80bps. IRA XTANDI risk is the primary FY26 downside scenario — at ¥9.6B/1pp, a 25% net price reduction would reduce Core OP margin by ~4pp.' },
      ],
    },
    'Capital Allocation & Financial Discipline': {
      name: 'Capital Allocation & Balance Sheet Strength',
      overallStatus: 'on-track',
      onTrackPercent: 80,
      keyMetricValue: '¥237',
      sparkline: [60, 63, 66, 70, 74, 78],
      kpis: [
        { kpiName: 'Core EPS (¥, FY25)', baseline: 210, current: 237, target: 237, unit: '¥/share', status: 'on-track', commentary: 'Core EPS ¥237 FY25 — on target. Core EPS is the primary shareholder value metric for Astellas. FY26 Core EPS guidance ≥¥240. IRA XTANDI risk is the primary downside sensitivity: each 1pp net price reduction = ~¥3.4 Core EPS impact.' },
        { kpiName: 'Annual Dividend Per Share (¥)', baseline: 72, current: 74, target: 74, unit: '¥/share', status: 'on-track', commentary: '¥74/share annual dividend maintained. Astellas targets a progressive dividend policy — dividends increase with Core EPS growth. FY26 dividend guidance ≥¥74/share. IRA outcome will influence FY27 dividend guidance.' },
        { kpiName: 'Net Debt / Core EBITDA (×)', baseline: 1.8, current: 1.4, target: 1.5, unit: '×', status: 'ahead', commentary: 'Net Debt/Core EBITDA 1.4× — better than 1.5× target. Post-Iveric Bio acquisition leverage is reducing ahead of plan. Astellas maintains a conservative balance sheet vs pharma peers. Target: return to <1.0× post-IRA clarity.' },
        { kpiName: 'Free Cash Flow Conversion (% of Core OP)', baseline: 65, current: 72, target: 70, unit: '% FCF/Core OP', status: 'ahead', commentary: 'FCF/Core OP conversion 72% — above 70% target. Strong cash generation supporting dividend sustainability and R&D investment capacity. SMT cash savings are supporting FCF conversion improvement.' },
      ],
    },
    'R&D Pipeline & Business Development': {
      name: 'R&D Pipeline Execution & Business Development',
      overallStatus: 'on-track',
      onTrackPercent: 70,
      keyMetricValue: '2 NMEs',
      sparkline: [45, 50, 55, 60, 65, 70],
      kpis: [
        { kpiName: 'Phase 3 NMEs in Development (count)', baseline: 3, current: 5, target: 4, unit: 'Phase 3 assets', status: 'ahead', commentary: '5 NMEs in Phase 3 development — above 4-asset target. Key Phase 3 assets: zanidatamab (HER2+ biliary tract/gastric cancer, BD collaboration), fezolinetant prostate cancer indication (VEOZAH label expansion), and antibody-drug conjugate next-generation programs.' },
        { kpiName: 'Phase 2 NDA/BLA Submissions (FY25-26)', baseline: 0, current: 1, target: 2, unit: 'regulatory submissions', status: 'at-risk', commentary: '1 regulatory submission completed (IZERVAY GA BLA) vs 2-submission target. Second submission (zanidatamab NDA in HER2+ biliary tract cancer) tracking for Q2 FY26. BD-originated assets represent 40% of Phase 3 portfolio, demonstrating effective external innovation sourcing.' },
        { kpiName: 'R&D Spend as % of Core Revenue (%)', baseline: 18.2, current: 17.8, target: 18.0, unit: '%', status: 'on-track', commentary: 'R&D spend 17.8% of Core Revenue — slightly below 18% target. R&D investment is balanced with SMT cost discipline. FY26 R&D allocation ≥18% to sustain pipeline momentum, funded partially by SMT savings redirected from non-R&D SG&A.' },
        { kpiName: 'Business Development (BD) Deal Value Completed (¥B, FY25)', baseline: 50, current: 82, target: 80, unit: '¥B deal value', status: 'ahead', commentary: '¥82B BD deal value completed in FY25 — above ¥80B target. Iveric Bio (IZERVAY, avacincaptad pegol) acquisition is the largest completed deal. Focus on oncology and urology adjacencies where Astellas has commercial infrastructure. Pipeline: 2-3 BD partnerships in late-stage evaluation.' },
      ],
    },
  };

  return fallbacks[pillarName] || {
    name: pillarName,
    overallStatus: 'on-track',
    onTrackPercent: 50,
    keyMetricValue: '--',
    sparkline: [50, 55, 60, 65, 70, 75],
    kpis: [],
  };
}
