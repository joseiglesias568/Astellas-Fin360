'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BarChart3, TrendingUp, Database, Cpu, Shield, Users, Globe,
  ChevronLeft, ArrowRight, Star, CheckCircle2, AlertCircle,
  Zap, FileText, DollarSign, Calendar,
} from 'lucide-react';

interface UseCase {
  id: string; title: string; domain: string; description: string;
  value: 1 | 2 | 3; feasibility: 1 | 2 | 3;
  phase: 'poc' | 'pilot' | 'production'; dataSources: string[];
  icon: React.ElementType; starter?: boolean;
}

const USE_CASES: UseCase[] = [
  // XTANDI Franchise
  { id: 'uc-1', domain: 'XTANDI Franchise', title: 'XTANDI Revenue & IRA Pricing Dashboard', description: 'Real-time XTANDI US revenue, TRx volume, and IRA Medicare price discount tracking. AI-driven variance explanation vs. FY26 plan with early-warning alerts for IRA volume mix shifts above baseline.', value: 3, feasibility: 3, phase: 'poc', starter: true, dataSources: ['SAP S/4HANA (ERP)', 'IQVIA TRx Data'], icon: TrendingUp },
  { id: 'uc-2', domain: 'XTANDI Franchise', title: 'PADCEV Launch Momentum Monitor', description: 'Real-time PADCEV 1L urothelial cancer market share, revenue trajectory by geography, and launch plan vs. actuals. Tracks EV+pembrolizumab adoption, ENHERTU competitive pressure, and geographic expansion milestones.', value: 3, feasibility: 3, phase: 'poc', starter: true, dataSources: ['SAP S/4HANA (ERP)', 'IQVIA TRx Data', 'Veeva CRM'], icon: BarChart3 },
  { id: 'uc-3', domain: 'XTANDI Franchise', title: 'Core EPS Bridge & Segment Margin Decomposition', description: 'Automated waterfall from prior-period Core EPS to current — broken down by XTANDI IRA impact, PADCEV revenue, SMT savings, FX, SG&A, and R&D. Highlights over/under vs. FY26 plan by segment.', value: 3, feasibility: 2, phase: 'poc', starter: true, dataSources: ['SAP S/4HANA (ERP)', 'Planning Tool (Anaplan)'], icon: DollarSign },
  { id: 'uc-4', domain: 'XTANDI Franchise', title: 'XTANDI IRA Scenario & MFP Sensitivity', description: 'Model financial sensitivity of XTANDI Maximum Fair Price at ±5% from CMS negotiated level. Shows Medicare volume mix shift, gross-to-net impact, and Core OP sensitivity per ¥10B revenue change.', value: 2, feasibility: 2, phase: 'pilot', dataSources: ['SAP S/4HANA (ERP)', 'Planning Tool', 'CMS Reference Data'], icon: Shield },
  // Strategic Brands
  { id: 'uc-5', domain: 'Strategic Brands', title: 'VEOZAH & IZERVAY Launch Dashboard', description: 'Revenue ramp, NRx trend, market access coverage by payer, and launch plan vs. actuals for VEOZAH (VMS) and IZERVAY (GA). AI-driven alerts for markets tracking below launch curve trajectory.', value: 3, feasibility: 2, phase: 'poc', starter: true, dataSources: ['SAP S/4HANA (ERP)', 'Veeva CRM', 'IQVIA TRx Data'], icon: TrendingUp },
  { id: 'uc-6', domain: 'Strategic Brands', title: 'VYLOY Market Penetration Monitor', description: 'Track VYLOY gastric cancer market share by geography, revenue vs. launch model, and competitive positioning vs. Keytruda and ENHERTU in HER2+ gastric. Geographic ramp and payer access milestones.', value: 2, feasibility: 2, phase: 'pilot', dataSources: ['SAP S/4HANA (ERP)', 'IQVIA Market Share Data'], icon: BarChart3 },
  // Cost & Operations
  { id: 'uc-7', domain: 'Cost & Operations', title: 'SMT Cost Savings & Productivity Tracker', description: 'Track SMT initiative delivery vs. ¥40B FY26 target: headcount savings, procurement efficiency, R&D externalization, and G&A reduction. Surface at-risk initiatives and model Core OP impact of delivery gaps.', value: 3, feasibility: 2, phase: 'poc', starter: true, dataSources: ['SAP S/4HANA (ERP)', 'HRIS (Workday)', 'Planning Tool'], icon: Shield },
  { id: 'uc-8', domain: 'Cost & Operations', title: 'R&D Portfolio ROI & Pipeline Investment Tracking', description: 'Track R&D investment by therapeutic area and phase, success probability-weighted NPV, and portfolio rebalancing options. Model Core OP impact of pipeline acceleration or termination decisions.', value: 2, feasibility: 2, phase: 'pilot', dataSources: ['SAP S/4HANA (ERP)', 'R&D Portfolio System', 'Planning Tool'], icon: Globe },
  // Financial Planning
  { id: 'uc-9', domain: 'Financial Planning', title: '18-Month Rolling Core OP Forecast', description: 'ML-powered Core OP forecast rolling 18 months forward. Decomposes into XTANDI IRA trajectory, PADCEV/VEOZAH ramp, SMT savings delivery, FX translation, and R&D investment phasing.', value: 3, feasibility: 2, phase: 'pilot', dataSources: ['SAP S/4HANA', 'Planning Tool', 'IQVIA Data', 'Treasury System'], icon: BarChart3 },
  { id: 'uc-10', domain: 'Financial Planning', title: 'Scenario Modeling: XTANDI IRA & FX Cycles', description: 'What-if analysis: XTANDI IRA discount ±5%, USD/JPY ±10¥, SMT delivery shortfall, and PADCEV ramp upside. Shows Core OP, Core EPS, and guidance corridor impact per scenario.', value: 3, feasibility: 3, phase: 'poc', dataSources: ['SAP S/4HANA', 'Planning Tool', 'Treasury System'], icon: Shield },
  { id: 'uc-11', domain: 'Financial Planning', title: 'FX Exposure & Hedge Portfolio Dashboard', description: 'Track USD/JPY and EUR/JPY translation exposure by segment, hedge portfolio MTM, and effective FX P&L impact on Core OP. Model hedge coverage ratio sensitivity at ±5pp around 55% base.', value: 2, feasibility: 2, phase: 'pilot', dataSources: ['Treasury System', 'SAP S/4HANA', 'FX Rate Feeds'], icon: DollarSign },
  // Executive Reporting
  { id: 'uc-12', domain: 'Executive Reporting', title: 'Automated Monthly Operating Report (MOR)', description: 'AI-generated MOR deck: CFO narrative, segment performance (US/EM/Japan/Intl/China), Core OP variance analysis, risks & opportunities, and forward outlook — assembled from live data in minutes, not days.', value: 3, feasibility: 2, phase: 'pilot', dataSources: ['All financial data sources', 'Planning Tool', 'IQVIA TRx Data'], icon: FileText },
  { id: 'uc-13', domain: 'Executive Reporting', title: 'Earnings Call Preparation & Guidance Variance', description: 'Pre-earnings package: Core EPS guidance vs. consensus gap analysis, XTANDI IRA Q&A prep, investor talking points, and analyst sentiment tracking against Astellas disclosures.', value: 2, feasibility: 2, phase: 'pilot', dataSources: ['SAP S/4HANA', 'IR Data', 'Consensus Estimates API'], icon: TrendingUp },
  // AI & Agentic
  { id: 'uc-14', domain: 'AI & Agentic', title: 'Natural Language Financial Q&A', description: '"What drove Core OP margin compression in US in Q3 vs. plan?" — AI-grounded answers with citations, drill-down links, and suggested follow-up questions. Reduces analyst queue by 60%+.', value: 3, feasibility: 3, phase: 'poc', starter: true, dataSources: ['SAP S/4HANA', 'IQVIA TRx Data', 'Semantic Layer'], icon: Zap },
  { id: 'uc-15', domain: 'AI & Agentic', title: 'AI-Driven Variance Commentary Generation', description: 'Automated, plain-English commentary for every material variance in the MOR — using AI grounded in prior-period language, Astellas management guidance, and current pharma market context.', value: 3, feasibility: 2, phase: 'pilot', dataSources: ['SAP S/4HANA', 'Planning Tool', 'Historical Commentary Corpus'], icon: Cpu },
  { id: 'uc-16', domain: 'AI & Agentic', title: 'Anomaly Detection & Proactive Alerts', description: 'AI monitors 500+ KPI time series for statistical anomalies, XTANDI revenue drop signals, and SMT delivery early warnings. Routes prioritized alerts to relevant FP&A and segment finance teams.', value: 3, feasibility: 2, phase: 'pilot', dataSources: ['All operational and financial data sources'], icon: AlertCircle },
  { id: 'uc-17', domain: 'AI & Agentic', title: 'Financial Close Tracker & Agentic Escalation', description: 'Agentic financial close workflow: milestone tracking, automated status pings, escalation routing for overdue items, and sign-off gate management across US, EM, Japan, Intl, and China close teams.', value: 2, feasibility: 2, phase: 'pilot', dataSources: ['SAP S/4HANA Close Modules', 'HRIS', 'Task Management'], icon: CheckCircle2 },
  // Production
  { id: 'uc-18', domain: 'Executive Reporting', title: 'Board-Level Reporting Automation', description: 'Auto-assembled board package: QoQ performance by segment, pipeline milestones, risk register, ESG/patient access metrics, and capital allocation — board-ready in 2 hours vs. 2 weeks.', value: 2, feasibility: 1, phase: 'production', dataSources: ['All sources + GRC + ESG Data'], icon: FileText },
  { id: 'uc-19', domain: 'Strategic Brands', title: 'Global Market Access & Commercial Excellence', description: 'Track market access coverage by product and country, payer formulary wins/losses, HCP reach, and pricing corridor compliance. AI-driven alerts for markets at risk of access gap vs. launch model.', value: 2, feasibility: 1, phase: 'production', dataSources: ['Veeva CRM', 'Market Access System', 'SAP S/4HANA'], icon: TrendingUp },
  { id: 'uc-20', domain: 'Cost & Operations', title: 'Manufacturing & Supply Chain Optimization', description: 'Track API procurement costs, CMO performance vs. SLAs, batch yield efficiency, and supply chain resilience KPIs. AI-driven clustering to identify cost reduction and dual-sourcing opportunities.', value: 2, feasibility: 1, phase: 'production', dataSources: ['SAP Ariba', 'SAP S/4HANA MM', 'CMO Performance Data'], icon: Cpu },
];

const DOMAINS = ['All', ...Array.from(new Set(USE_CASES.map(u => u.domain)))];
const VALUE_LABEL = { 1: 'Medium', 2: 'High', 3: 'Very High' } as const;
const FEAS_LABEL  = { 1: 'Complex', 2: 'Moderate', 3: 'Quick Win' } as const;
const PHASE_STYLE = { poc: 'bg-amber-50 text-amber-700', pilot: 'bg-blue-50 text-blue-700', production: 'bg-gray-800 text-white' };
const PHASE_LABEL = { poc: 'POC', pilot: 'Pilot', production: 'Production' } as const;

export default function UseCasePrioritiesClient() {
  const [selected, setSelected] = useState<Set<string>>(new Set(USE_CASES.filter(u => u.starter).map(u => u.id)));
  const [domain, setDomain] = useState('All');

  const toggle = (id: string) => {
    setSelected(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const visible = domain === 'All' ? USE_CASES : USE_CASES.filter(u => u.domain === domain);
  const selectedItems = USE_CASES.filter(u => selected.has(u.id));

  return (
    <div className="space-y-7 pb-12">
      <Link href="/implementation-roadmap" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors">
        <ChevronLeft className="h-3.5 w-3.5" /> Back to Roadmap
      </Link>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <Star className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Step 2 of 4</span>
            <h1 className="text-xl font-bold text-gray-900">Define Use Case Priorities</h1>
            <p className="text-xs text-gray-500 mt-0.5">Select the Finance360 use cases that map to your highest-value opportunities — recommended starter set pre-selected for Astellas</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Selected',              value: selected.size,                                              note: 'of 20 use cases' },
          { label: 'POC-Ready',             value: selectedItems.filter(u => u.phase === 'poc').length,        note: 'quick-start candidates' },
          { label: 'High / Very High Value', value: selectedItems.filter(u => u.value >= 2).length,           note: 'value score ≥ High' },
          { label: 'Quick Wins',            value: selectedItems.filter(u => u.feasibility === 3).length,      note: 'fast-to-implement' },
        ].map(({ label, value, note }, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-black text-gray-900">{value}</p>
            <p className="text-[10px] text-gray-500">{note}</p>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-1">Prioritization Matrix — Value vs. Feasibility</h2>
        <p className="text-xs text-gray-500 mb-5">Use cases plotted by business value and implementation complexity. Click a tile to toggle selection.</p>
        <div className="relative">
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap origin-center" style={{ left: '-28px' }}>Business Value →</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap" style={{ bottom: '-20px' }}>Implementation Speed →</div>
          <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-lg overflow-hidden ml-2">
            {(['Complex', 'Moderate', 'Quick Win'] as const).map((fLabel, fi) => (
              <div key={fi} className="bg-white px-3 py-1.5 text-center"><span className="text-[9px] font-bold uppercase tracking-wide text-gray-400">{fLabel}</span></div>
            ))}
            {([3, 2, 1] as const).map(v => ([1, 2, 3] as const).map(f => {
              const cellUCs = USE_CASES.filter(u => u.value === v && u.feasibility === f);
              const isHot = v >= 2 && f >= 2;
              return (
                <div key={`${v}-${f}`} className={`bg-white min-h-[90px] p-2 ${isHot ? 'bg-emerald-50/40' : ''}`}>
                  {cellUCs.map(uc => {
                    const Icon = uc.icon;
                    const isSelected = selected.has(uc.id);
                    return (
                      <button key={uc.id} onClick={() => toggle(uc.id)}
                        className={`w-full text-left text-[9px] p-1.5 rounded mb-1 flex items-center gap-1.5 transition-all border ${isSelected ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
                        <Icon className="h-2.5 w-2.5 flex-shrink-0" />
                        <span className="leading-tight">{uc.title.split(':')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              );
            }))}
          </div>
        </div>
        <div className="mt-8 flex items-center gap-4 text-[10px] text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-800 inline-block" /> Selected</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border border-gray-300 inline-block" /> Not selected</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-100 inline-block" /> Sweet spot (high value + fast)</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-sm font-bold text-gray-900">Use Case Library</h2>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 flex-wrap">
            {DOMAINS.map(d => (
              <button key={d} onClick={() => setDomain(d)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${domain === d ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {visible.map(uc => {
            const Icon = uc.icon;
            const isSelected = selected.has(uc.id);
            return (
              <button key={uc.id} onClick={() => toggle(uc.id)}
                className={`text-left rounded-lg border p-3 transition-all ${isSelected ? 'border-gray-800 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="text-xs font-semibold text-gray-900">{uc.title}</p>
                      {uc.starter && <span className="text-[9px] bg-amber-50 text-amber-600 font-semibold px-1.5 py-0.5 rounded">Starter</span>}
                    </div>
                    <p className="text-[10px] text-gray-500 leading-snug mb-2">{uc.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${PHASE_STYLE[uc.phase]}`}>{PHASE_LABEL[uc.phase]}</span>
                      <span className="text-[9px] text-gray-500">Value: <strong>{VALUE_LABEL[uc.value]}</strong></span>
                      <span className="text-[9px] text-gray-500">Speed: <strong>{FEAS_LABEL[uc.feasibility]}</strong></span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {uc.dataSources.map((ds, j) => <span key={j} className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{ds}</span>)}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {selectedItems.filter(u => u.phase === 'poc').length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" /> Your Recommended POC Starter Set
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {selectedItems.filter(u => u.phase === 'poc').map(uc => {
              const Icon = uc.icon;
              return (
                <div key={uc.id} className="bg-white rounded-lg border border-amber-100 p-3 flex items-start gap-2">
                  <Icon className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{uc.title}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Sources: {uc.dataSources.slice(0, 2).join(', ')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gray-900 rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-sm">{selected.size} use cases selected</p>
          <p className="text-gray-400 text-xs mt-0.5">Now identify the data sources and owners needed to support your priority use cases.</p>
        </div>
        <Link href="/implementation-roadmap/data-readiness"
          className="flex items-center gap-2 bg-white text-gray-900 text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0">
          Next: Data Readiness <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </motion.div>
    </div>
  );
}
