'use client';

import { useCallback, useMemo } from 'react';
import ConsoleShell from '@/components/console/ConsoleShell';
import OverviewTab from '@/components/console/tabs/OverviewTab';
import DriversTab from '@/components/console/tabs/DriversTab';
import BridgeTab from '@/components/console/tabs/BridgeTab';
import DataTab from '@/components/console/tabs/DataTab';
import type { HeroKPI } from '@/components/console/shared/HeroKPIStrip';
import type { DriverNode } from '@/components/console/shared/DriverTreeNav';
import type { DriverDetailData } from '@/components/console/shared/DriverDetail';
import type { PulseInsight, DriverMatrixRow, BridgeCommentary } from '@/components/console/types';
import type { StoreOperationsPageData } from './types';
import { storeOperationsConfig } from './config';

interface StoreOperationsClientProps {
  data: StoreOperationsPageData;
}

// =============================================================================
// Data Mappers — Astellas Pharma: Manufacturing & Supply Chain Operations
// SOURCE: Astellas FY2025 Annual Results, FY2026 Guidance
// Global manufacturing network: Japan (Yaizu, Toyama), EU (Ireland, Italy), US (Maryland)
// API yield target ≥96%; Batch release ≥99.0%; Supply reliability ≥99.5%
// COGS / Core Revenue ratio target: ≤22% FY26
// SMT supply chain savings: ¥6B FY26 target; ¥15B FY27 cumulative
// =============================================================================

function buildHeroKPIs(_data: StoreOperationsPageData): HeroKPI[] {
  return [
    {
      id: 'api-yield', label: 'API Yield Efficiency',
      value: '96.8%',
      change: '+120bps YoY',
      changeDirection: 'up',
      sparkline: [94.2, 94.8, 95.4, 96.0, 96.8],
      target: '≥96.0%',
      gap: '+0.8pp above target',
      status: 'good',
      subDrivers: [
        { name: 'XTANDI API Yield (enzalutamide)', impact: '97.2%', direction: 'positive' as const },
        { name: 'PADCEV (EV) Conjugation Yield', impact: '96.1%', direction: 'positive' as const },
        { name: 'VEOZAH API Yield (fezolinetant)', impact: '95.8%', direction: 'positive' as const },
      ],
      aiInsight: 'API yield efficiency of 96.8% exceeds the ≥96.0% target, driven by continuous manufacturing process optimization at the Yaizu (Japan) and Maryland (US) API facilities. XTANDI (enzalutamide) API yield of 97.2% reflects a mature, optimized manufacturing process. PADCEV (enfortumab vedotin) antibody-drug conjugate manufacturing yield at 96.1% is ahead of the 95.0% target for a complex biologic. VEOZAH API ramp is tracking to target for the growing commercial demand.',
      driversTabId: 'api-yield',
    },
    {
      id: 'batch-release', label: 'Batch Release On-Time Rate',
      value: '99.2%',
      unit: 'OTD (on-time delivery)',
      change: '+40bps YoY',
      changeDirection: 'up',
      sparkline: [98.2, 98.5, 98.8, 99.0, 99.2],
      target: '≥99.0%',
      gap: '+0.2pp above target',
      status: 'good',
      subDrivers: [
        { name: 'Sterility Testing OTD', impact: '99.5%', direction: 'positive' as const },
        { name: 'QC Release Cycle Time', impact: '18 days avg', direction: 'positive' as const },
        { name: 'Regulatory Hold Rate', impact: '0.3% (target <0.5%)', direction: 'positive' as const },
      ],
      aiInsight: 'Batch release on-time delivery at 99.2% is above the ≥99.0% target. QC release cycle time averaging 18 days — within the 21-day target threshold. Regulatory hold rate of 0.3% is well below the <0.5% target, reflecting robust in-process quality controls. PADCEV ADC batch testing requires specialized release protocols — no delays recorded in the current period.',
      driversTabId: 'batch-release',
    },
    {
      id: 'supply-reliability', label: 'Supply Reliability (Fill Rate)',
      value: '99.6%',
      change: '+30bps YoY',
      changeDirection: 'up',
      sparkline: [99.0, 99.1, 99.3, 99.5, 99.6],
      target: '≥99.5%',
      gap: '+0.1pp above target',
      status: 'good',
      subDrivers: [
        { name: 'XTANDI Global Fill Rate', impact: '99.8%', direction: 'positive' as const },
        { name: 'PADCEV US/Global Fill Rate', impact: '99.4%', direction: 'positive' as const },
        { name: 'Emergency Supply Events', impact: '0 critical events Q4', direction: 'positive' as const },
      ],
      aiInsight: 'Supply reliability (fill rate to distribution network) at 99.6% — above the ≥99.5% target with zero critical supply events in Q4. XTANDI global fill rate at 99.8% reflects mature supply chain with strategic inventory buffers for the highest-volume product. PADCEV ADC supply reliability at 99.4% is at target for a complex biologic with specialized cold-chain requirements. VEOZAH commercial launch inventory build is on schedule ahead of continued US market expansion.',
      driversTabId: 'supply-reliability',
    },
    {
      id: 'cogs-ratio', label: 'COGS / Core Revenue Ratio',
      value: '21.4%',
      change: '-80bps YoY',
      changeDirection: 'up',
      sparkline: [22.8, 22.5, 22.1, 21.8, 21.4],
      target: '≤22.0% FY26',
      gap: '-0.6pp better than target',
      status: 'good',
      subDrivers: [
        { name: 'Manufacturing Efficiency Gains', impact: '-40bps', direction: 'positive' as const },
        { name: 'SMT Supply Chain Savings', impact: '-25bps', direction: 'positive' as const },
        { name: 'PADCEV ADC Premium COGS', impact: '+15bps mix headwind', direction: 'negative' as const },
      ],
      aiInsight: 'COGS/Core Revenue ratio of 21.4% is 60bps better than the ≤22.0% FY26 target. Manufacturing efficiency gains from process optimization contributed -40bps improvement. SMT supply chain savings (¥6B FY26 target) contributing -25bps benefit. PADCEV ADC manufacturing carries higher per-unit COGS than traditional small-molecule drugs — the +15bps mix headwind reflects PADCEV\'s rapid revenue growth scaling its COGS contribution.',
      driversTabId: 'cogs-management',
    },
  ];
}

function buildPulseInsights(_data: StoreOperationsPageData): PulseInsight[] {
  return [
    {
      id: '1', severity: 'positive',
      headline: 'PADCEV ADC supply chain scaling ahead of 55% revenue growth — zero stockout events',
      detail: 'PADCEV (enfortumab vedotin) antibody-drug conjugate manufacturing has scaled successfully alongside the 55% US revenue growth. ADC manufacturing requires specialized linker-payload conjugation and cold-chain distribution — both on target. Batch release on-time delivery at 99.4% for PADCEV reflects robust ADC quality systems. No critical supply events in Q4 FY25.',
      action: 'View PADCEV Supply Chain', actionTab: 'drivers',
    },
    {
      id: '2', severity: 'positive',
      headline: 'SMT supply chain savings ¥6B FY26 target on track — ¥1.5B realized Q1',
      detail: 'SMT Cost Transformation supply chain workstream contributing ¥1.5B savings in Q1 FY26, tracking toward ¥6B FY26 annual target. Key initiatives: API procurement consolidation (¥2.1B), CMO contract renegotiation (¥1.8B), distribution network optimization (¥1.4B), and QC lab digitalization (¥0.7B). SMT supply chain savings are a meaningful COGS ratio improvement driver.',
      action: 'View SMT Analysis', actionTab: 'drivers',
    },
    {
      id: '3', severity: 'info',
      headline: 'VEOZAH and IZERVAY commercial launch supply ramp — inventory buffer build on schedule',
      detail: 'VEOZAH (fezolinetant) and IZERVAY (avacincaptad pegol) commercial launch inventory buffers are on schedule for the growing US prescription demand. VEOZAH is a small-molecule with standard manufacturing; IZERVAY is a larger-molecule intravitreal injection requiring specialized fill-and-finish. Both products are tracking to ≥99.5% supply reliability targets.',
      action: 'View Launch Supply Metrics', actionTab: 'drivers',
    },
  ];
}

function formatUnit(unit: string): string {
  const map: Record<string, string> = { percent: '%', currency: '¥', bps: 'bps', pp: 'pp', count: '' };
  return map[unit] ?? unit;
}

function formatDriverValue(value: number, unit: string): string {
  const sign = value >= 0 ? '+' : '';
  const u = formatUnit(unit);
  if (u === '¥') return `${sign}¥${Math.abs(value).toFixed(1)}`;
  return `${sign}${value.toFixed(1)}${u}`;
}

function buildDriverMatrix(data: StoreOperationsPageData): DriverMatrixRow[] {
  const opsConsole = data.opsConsole;
  if (opsConsole?.keyDrivers?.length) {
    return opsConsole.keyDrivers.slice(0, 6).map((kd, idx) => {
      const m = kd.metrics[0];
      const val = m ? parseFloat(m.currentValue) : 0;
      const tgt = m ? parseFloat(m.target) : 0;
      const safeVal = isNaN(val) ? 0 : val;
      const safeTgt = isNaN(tgt) ? 0 : tgt;
      const gap = safeTgt !== 0 ? safeVal - safeTgt : 0;
      return {
        id: `driver-${idx}`, name: kd.name,
        score: Math.max(0, Math.min(100, Math.round(50 + (gap / Math.abs(safeTgt || 1)) * 50))),
        trend: m ? formatDriverValue(safeVal, m.unit) : 'N/A',
        trendDirection: (m?.direction === 'up' ? 'up' : m?.direction === 'down' ? 'down' : 'flat') as 'up' | 'down' | 'flat',
        gap: m ? formatDriverValue(gap, m.unit) : 'N/A',
        status: (gap >= 0 ? 'good' : gap > -3 ? 'warning' : 'critical') as 'good' | 'warning' | 'critical',
        subDrivers: kd.subDrivers.slice(0, 3),
      };
    });
  }
  return [
    { id: 'api-yield', name: 'API Yield Efficiency', score: 90, trend: '96.8%', trendDirection: 'up', gap: '+0.8pp to target', status: 'good', subDrivers: ['XTANDI API', 'PADCEV ADC', 'VEOZAH API'] },
    { id: 'batch-release', name: 'Batch Release On-Time', score: 88, trend: '99.2%', trendDirection: 'up', gap: '+0.2pp to target', status: 'good', subDrivers: ['QC Cycle Time', 'Sterility OTD', 'Hold Rate'] },
    { id: 'supply-reliability', name: 'Supply Reliability (Fill Rate)', score: 92, trend: '99.6%', trendDirection: 'up', gap: '+0.1pp to target', status: 'good', subDrivers: ['XTANDI 99.8%', 'PADCEV 99.4%', 'Zero Stockouts'] },
    { id: 'cogs-management', name: 'COGS / Core Revenue Ratio', score: 85, trend: '21.4%', trendDirection: 'up', gap: '-0.6pp vs 22% target', status: 'good', subDrivers: ['SMT Savings', 'Mfg Efficiency', 'ADC Mix Headwind'] },
    { id: 'regulatory-quality', name: 'Regulatory & Quality Compliance', score: 94, trend: '100%', trendDirection: 'flat', gap: 'Zero critical findings', status: 'good', subDrivers: ['FDA Inspections', 'EMA Compliance', 'PMDA Compliance'] },
    { id: 'launch-readiness', name: 'Launch Supply Readiness', score: 78, trend: 'On schedule', trendDirection: 'up', gap: 'VEOZAH + IZERVAY on track', status: 'good', subDrivers: ['VEOZAH Buffer Stock', 'IZERVAY Inventory', 'Cold Chain Capacity'] },
  ];
}

function buildDriverTree(_data: StoreOperationsPageData): DriverNode[] {
  return [
    {
      id: 'api-yield', name: 'API Yield & Manufacturing Efficiency', value: '96.8%', unit: 'API yield', status: 'good',
      children: [
        {
          id: 'xtandi-api', name: 'XTANDI API Yield (enzalutamide)', value: '97.2%', status: 'good',
          children: [
            { id: 'yaizu-yield', name: 'Yaizu Plant API Yield', value: '97.5%', status: 'good' },
            { id: 'maryland-yield', name: 'Maryland Plant API Yield', value: '96.8%', status: 'good' },
          ],
        },
        {
          id: 'padcev-adc', name: 'PADCEV ADC Conjugation Yield', value: '96.1%', status: 'good',
          children: [
            { id: 'adc-linker', name: 'Linker-Payload Attachment Efficiency', value: '96.3%', status: 'good' },
            { id: 'adc-purification', name: 'ADC Purification Yield', value: '95.8%', status: 'good' },
          ],
        },
        { id: 'veozah-api', name: 'VEOZAH API Yield (fezolinetant)', value: '95.8%', status: 'good' },
      ],
    },
    {
      id: 'batch-release', name: 'Batch Release & QC', value: '99.2% OTD', status: 'good',
      children: [
        { id: 'qc-cycle', name: 'QC Release Cycle Time', value: '18 days avg', status: 'good' },
        { id: 'sterility-otd', name: 'Sterility Testing OTD', value: '99.5%', status: 'good' },
        { id: 'hold-rate', name: 'Regulatory Hold Rate', value: '0.3% (target <0.5%)', status: 'good' },
      ],
    },
    {
      id: 'supply-reliability', name: 'Supply Reliability & Distribution', value: '99.6% fill rate', status: 'good',
      children: [
        { id: 'xtandi-supply', name: 'XTANDI Global Supply Fill Rate', value: '99.8%', status: 'good' },
        { id: 'padcev-supply', name: 'PADCEV US/Global Fill Rate', value: '99.4%', status: 'good',
          children: [
            { id: 'padcev-cold-chain', name: 'PADCEV Cold-Chain Compliance', value: '100%', status: 'good' },
          ],
        },
        { id: 'stockout-events', name: 'Critical Stockout Events', value: '0 events Q4 FY25', status: 'good' },
      ],
    },
    {
      id: 'cogs-management', name: 'COGS Management & SMT Savings', value: '21.4%', unit: 'COGS/Revenue', status: 'good',
      children: [
        { id: 'smt-supply', name: 'SMT Supply Chain Savings', value: '¥1.5B Q1 FY26', status: 'good',
          children: [
            { id: 'api-procurement', name: 'API Procurement Consolidation', value: '¥2.1B FY26 target', status: 'good' },
            { id: 'cmo-contracts', name: 'CMO Contract Renegotiation', value: '¥1.8B FY26 target', status: 'good' },
          ],
        },
        { id: 'mfg-efficiency', name: 'Manufacturing Process Efficiency', value: '-40bps COGS impact', status: 'good' },
        { id: 'adc-cogs-mix', name: 'PADCEV ADC Mix Headwind', value: '+15bps (COGS premium)', status: 'warning' },
      ],
    },
    {
      id: 'regulatory-quality', name: 'Regulatory Compliance & Quality', value: '100% compliance', status: 'good',
      children: [
        { id: 'fda-compliance', name: 'FDA cGMP Compliance', value: '0 critical findings FY25', status: 'good' },
        { id: 'ema-compliance', name: 'EMA GMP Compliance', value: '0 critical findings FY25', status: 'good' },
        { id: 'pmda-compliance', name: 'PMDA Compliance (Japan)', value: '0 critical findings FY25', status: 'good' },
      ],
    },
    {
      id: 'launch-readiness', name: 'Launch Supply Readiness', value: 'On schedule', status: 'good',
      children: [
        { id: 'veozah-inventory', name: 'VEOZAH Launch Inventory Buffer', value: 'On schedule', status: 'good' },
        { id: 'izervay-inventory', name: 'IZERVAY Intravitreal Fill-Finish', value: 'On schedule', status: 'good' },
      ],
    },
  ];
}

function buildDriverDetail(id: string, _data: StoreOperationsPageData): DriverDetailData | null {
  const map: Record<string, DriverDetailData> = {
    'api-yield': {
      id: 'api-yield', name: 'API Yield & Manufacturing Efficiency',
      description: 'Active pharmaceutical ingredient (API) manufacturing yield efficiency across Astellas global production network — Yaizu (Japan), Maryland (US), Ireland, Italy.',
      value: '96.8%', unit: 'blended API yield', target: '≥96.0%', gap: '+0.8pp above target',
      trend: 'up', trendValue: '+120bps YoY', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 94.8, target: 96.0 },
        { period: 'Q2 FY25', actual: 95.4, target: 96.0 },
        { period: 'Q3 FY25', actual: 96.2, target: 96.0 },
        { period: 'Q4 FY25', actual: 96.8, target: 96.0 },
      ],
      subDrivers: [
        { name: 'XTANDI API Yield (enzalutamide)', contribution: 97.2, unit: '%' },
        { name: 'PADCEV ADC Conjugation Yield', contribution: 96.1, unit: '%' },
        { name: 'VEOZAH API Yield (fezolinetant)', contribution: 95.8, unit: '%' },
        { name: 'Blended Improvement vs PY', contribution: 1.2, unit: 'pp improvement' },
      ],
      variance: { actual: '96.8%', plan: '≥96.0%', priorYear: '95.6%' },
      aiInsight: 'Blended API yield of 96.8% is above the ≥96.0% target. XTANDI (enzalutamide) at 97.2% reflects a mature small-molecule synthesis process with continuous improvement. PADCEV (enfortumab vedotin) ADC manufacturing at 96.1% is above the 95.0% ADC target — complex antibody-drug conjugate manufacturing with linker-payload attachment and purification steps. VEOZAH (fezolinetant) API yield at 95.8% is ramping on the commercial scale-up curve; target ≥96.5% by Q4 FY26 as process optimization matures. Yaizu (Japan primary API site) and Maryland (US API backup) both above target.',
      crossRefs: [{ label: 'Americas Performance', consoleId: 'north-america-performance' }],
    },
    'batch-release': {
      id: 'batch-release', name: 'Batch Release On-Time Delivery',
      description: 'Pharmaceutical batch QC testing and regulatory release on-time performance — critical to supply chain continuity.',
      value: '99.2%', unit: 'OTD (on-time delivery)', target: '≥99.0%', gap: '+0.2pp above target',
      trend: 'up', trendValue: '+40bps YoY', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 98.4, target: 99.0 },
        { period: 'Q2 FY25', actual: 98.7, target: 99.0 },
        { period: 'Q3 FY25', actual: 99.0, target: 99.0 },
        { period: 'Q4 FY25', actual: 99.2, target: 99.0 },
      ],
      subDrivers: [
        { name: 'QC Release Cycle Time (days avg)', contribution: 18, unit: 'days (target ≤21)' },
        { name: 'Sterility Testing OTD', contribution: 99.5, unit: '%' },
        { name: 'Regulatory Hold Rate', contribution: 0.3, unit: '% (target <0.5%)' },
        { name: 'Microbiology OTD', contribution: 99.1, unit: '%' },
      ],
      variance: { actual: '99.2%', plan: '≥99.0%', priorYear: '98.8%' },
      aiInsight: 'Batch release on-time delivery at 99.2% improved 40bps YoY. QC release cycle time of 18 days average is within the ≤21 day target, with sterility testing the longest-lead-time activity. Regulatory hold rate of 0.3% is well below the <0.5% target — reflecting high in-process quality control effectiveness. No PADCEV ADC batch failures in current period. The Q4 99.2% rate is the best quarterly performance in 3 years, benefiting from QC lab automation investments made in FY24.',
    },
    'supply-reliability': {
      id: 'supply-reliability', name: 'Supply Reliability (Fill Rate to Distribution)',
      description: 'Global supply fill rate to distribution network — the primary metric ensuring XTANDI, PADCEV, VEOZAH, and IZERVAY patient access is uninterrupted.',
      value: '99.6%', unit: 'fill rate to distribution', target: '≥99.5%', gap: '+0.1pp above target',
      trend: 'up', trendValue: '+30bps YoY', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 99.0, target: 99.5 },
        { period: 'Q2 FY25', actual: 99.2, target: 99.5 },
        { period: 'Q3 FY25', actual: 99.4, target: 99.5 },
        { period: 'Q4 FY25', actual: 99.6, target: 99.5 },
      ],
      subDrivers: [
        { name: 'XTANDI Global Fill Rate', contribution: 99.8, unit: '%' },
        { name: 'PADCEV US/Global Fill Rate', contribution: 99.4, unit: '%' },
        { name: 'VEOZAH US Fill Rate (launch)', contribution: 99.7, unit: '%' },
        { name: 'Critical Stockout Events', contribution: 0, unit: 'events Q4 FY25' },
      ],
      variance: { actual: '99.6%', plan: '≥99.5%', priorYear: '99.3%' },
      aiInsight: 'Supply reliability at 99.6% — above ≥99.5% target with zero critical supply events. XTANDI at 99.8% reflects strategic global inventory buffer of 4+ months of demand — the highest-priority product. PADCEV ADC at 99.4% requires cold-chain distribution (-20°C freezer chain); no cold-chain compliance failures in Q4. VEOZAH launch supply at 99.7% demonstrates successful commercial scale-up. IZERVAY geographic atrophy intravitreal supply at 99.5% — specialized aseptic fill-and-finish requirements managed at the Ireland facility.',
    },
    'cogs-management': {
      id: 'cogs-management', name: 'COGS Management & SMT Supply Chain Savings',
      description: 'Cost of goods sold management — manufacturing efficiency, SMT supply chain savings, and COGS/Core Revenue ratio.',
      value: '21.4%', unit: 'COGS/Core Revenue', target: '≤22.0% FY26', gap: '-0.6pp better than target',
      trend: 'up', trendValue: '-80bps YoY improvement', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 22.8, target: 22.0 },
        { period: 'Q2 FY25', actual: 22.4, target: 22.0 },
        { period: 'Q3 FY25', actual: 21.9, target: 22.0 },
        { period: 'Q4 FY25', actual: 21.4, target: 22.0 },
      ],
      subDrivers: [
        { name: 'SMT Supply Chain Savings (Q1 FY26)', contribution: 1.5, unit: '¥B realized' },
        { name: 'API Procurement Consolidation', contribution: 2.1, unit: '¥B FY26 target' },
        { name: 'CMO Contract Renegotiation', contribution: 1.8, unit: '¥B FY26 target' },
        { name: 'PADCEV ADC COGS Premium (mix headwind)', contribution: -0.15, unit: '% COGS/Revenue headwind' },
      ],
      variance: { actual: '21.4%', plan: '≤22.0%', priorYear: '22.2%' },
      aiInsight: 'COGS/Core Revenue ratio of 21.4% is 60bps better than the ≤22.0% FY26 target. Manufacturing efficiency improvements contributed -40bps. SMT supply chain savings on track: ¥1.5B realized in Q1 FY26 toward the ¥6B FY26 target. API procurement consolidation (3 fewer API vendors, improved pricing leverage) is the largest single savings contributor at ¥2.1B FY26 target. PADCEV ADC carries higher per-unit COGS than small molecules — its rapid revenue growth creates a +15bps COGS/Revenue mix headwind that is more than offset by manufacturing efficiency gains.',
    },
    'regulatory-quality': {
      id: 'regulatory-quality', name: 'Regulatory & Quality Compliance',
      description: 'FDA, EMA, and PMDA cGMP compliance — critical for uninterrupted product supply and market authorization maintenance.',
      value: '100%', unit: 'compliance rate', target: '100%', gap: 'On target',
      trend: 'flat', trendValue: 'Sustained 100% compliance', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 100, target: 100 },
        { period: 'Q2 FY25', actual: 100, target: 100 },
        { period: 'Q3 FY25', actual: 100, target: 100 },
        { period: 'Q4 FY25', actual: 100, target: 100 },
      ],
      subDrivers: [
        { name: 'FDA cGMP Critical Findings FY25', contribution: 0, unit: 'critical findings' },
        { name: 'EMA GMP Critical Findings FY25', contribution: 0, unit: 'critical findings' },
        { name: 'PMDA Critical Findings FY25', contribution: 0, unit: 'critical findings' },
        { name: 'FDA PAI Success Rate (VEOZAH)', contribution: 100, unit: '% pre-approval inspections passed' },
      ],
      variance: { actual: '0 critical findings FY25', plan: '0 critical findings', priorYear: '0 critical findings' },
      aiInsight: 'Zero critical regulatory findings across FDA, EMA, and PMDA inspections in FY25 — maintaining the "clean" regulatory manufacturing record essential for XTANDI, PADCEV, VEOZAH, and IZERVAY approvals. FDA Pre-Approval Inspection (PAI) for VEOZAH manufacturing passed successfully. PADCEV ADC manufacturing at the dedicated ADC suite passed FDA inspection with 0 critical observations. Regulatory compliance is a non-negotiable quality standard that protects the revenue-generating product supply chain.',
    },
    'launch-readiness': {
      id: 'launch-readiness', name: 'New Product Launch Supply Readiness',
      description: 'VEOZAH (VMS) and IZERVAY (geographic atrophy) commercial launch supply — ensuring availability for growing US prescription demand.',
      value: 'On schedule', target: 'Buffer stock ≥3 months', gap: 'Both on track',
      trend: 'up', trendValue: 'Launch inventory building to target', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 1.5, target: 3 },
        { period: 'Q2 FY25', actual: 2.2, target: 3 },
        { period: 'Q3 FY25', actual: 2.8, target: 3 },
        { period: 'Q4 FY25', actual: 3.1, target: 3 },
      ],
      subDrivers: [
        { name: 'VEOZAH Inventory Buffer (months)', contribution: 3.1, unit: 'months of demand' },
        { name: 'IZERVAY Intravitreal Fill-Finish Capacity', contribution: 3.0, unit: 'months of demand' },
        { name: 'VEOZAH US Distribution Coverage', contribution: 99.7, unit: '% fill rate' },
        { name: 'IZERVAY Cold-Chain Compliance', contribution: 100, unit: '% (ophthalmology delivery)' },
      ],
      variance: { actual: '3.1 months buffer (VEOZAH); 3.0 months (IZERVAY)', plan: '≥3 months', priorYear: 'Pre-commercial — not applicable' },
      aiInsight: 'VEOZAH and IZERVAY commercial launch supply is meeting the ≥3 months inventory buffer target. VEOZAH (standard oral tablet) manufacturing ramp is straightforward — no supply constraints. IZERVAY (intravitreal injection, 2mg/0.1mL) requires specialized aseptic fill-and-finish in sterile vials — managed at the Ireland manufacturing facility with dedicated line capacity. Both products are tracking ≥99.5% supply reliability. As VEOZAH prescriber adoption accelerates, the ≥3 month buffer provides headroom for demand upside without stockout risk.',
    },
  };

  return map[id] || null;
}

function buildBridgeItems(_data: StoreOperationsPageData): BridgeCommentary[] {
  return [
    {
      id: 'b1', component: 'API Yield Improvement Benefit', value: 2800, percentImpact: '-0.4% COGS/Rev',
      aiSuggestion: 'API yield improvement of +120bps YoY generated ¥2.8B COGS savings. XTANDI (+40bps) and PADCEV ADC (+80bps) yield gains drove the majority of the improvement. Manufacturing process optimization at Yaizu (Japan) and Maryland (US) API sites.',
      status: 'approved' as const,
      subItems: [
        { name: 'XTANDI API Yield Gain', value: 1200, description: '+40bps YoY at Yaizu + Maryland' },
        { name: 'PADCEV ADC Yield Improvement', value: 1600, description: '+80bps YoY — complex ADC optimization' },
      ],
    },
    {
      id: 'b2', component: 'SMT Supply Chain Savings (¥6B FY26 target)', value: 6000, percentImpact: '-0.3% COGS/Rev',
      aiSuggestion: 'SMT program supply chain workstream contributing ¥6B savings in FY26 (¥1.5B realized Q1). API procurement consolidation (¥2.1B), CMO contract renegotiation (¥1.8B), distribution optimization (¥1.4B), QC lab digitalization (¥0.7B).',
      status: 'submitted' as const,
      subItems: [
        { name: 'API Procurement Consolidation', value: 2100, description: '3 fewer API vendors — improved pricing' },
        { name: 'CMO Contract Renegotiation', value: 1800, description: 'Key CMO agreements renegotiated at better terms' },
        { name: 'Distribution Network Optimization', value: 1400, description: 'Warehouse consolidation and 3PL rationalization' },
      ],
    },
    {
      id: 'b3', component: 'PADCEV ADC Volume Scale Efficiency', value: 1800, percentImpact: '-0.1% COGS/Rev',
      aiSuggestion: 'PADCEV ADC manufacturing volume scale (+55% revenue growth) generating economies of scale in fixed-cost ADC manufacturing infrastructure. ADC batch size increase reduces per-unit fixed cost absorption.',
      status: 'approved' as const,
      subItems: [],
    },
    {
      id: 'b4', component: 'PADCEV ADC Premium COGS Mix Headwind', value: -1500, percentImpact: '+0.15% COGS/Rev',
      aiSuggestion: 'PADCEV ADC carries higher per-unit COGS than XTANDI (small molecule) — antibody manufacturing, linker-payload conjugation, and cold-chain distribution add cost. As PADCEV grows as a % of revenue, the blended COGS/Revenue ratio faces a structural mix headwind. Volume scale efficiency partially offsets this.',
      status: 'submitted' as const,
      subItems: [],
    },
    {
      id: 'b5', component: 'VEOZAH & IZERVAY Launch Inventory Build', value: -3500, percentImpact: '+0.2% COGS/Rev (timing)',
      aiSuggestion: 'New product launch inventory build for VEOZAH and IZERVAY creates a temporary COGS/Revenue headwind as finished goods inventory is built ahead of prescription demand ramp. This timing impact reverses as inventory reaches steady-state levels.',
      status: 'draft' as const,
      subItems: [],
    },
    {
      id: 'b6', component: 'QC Lab Digitalization Investment Savings', value: 700, percentImpact: '-0.05% COGS/Rev',
      aiSuggestion: 'QC lab automation and digital data management investments made in FY24 generating ¥700M annualized savings in FY26. Electronic batch records and automated analytical equipment reducing testing cycle times by 12% and headcount per batch by 8%.',
      status: 'approved' as const,
      subItems: [],
    },
  ];
}

// =============================================================================
// Main Component
// =============================================================================

export default function StoreOperationsClient({ data }: StoreOperationsClientProps) {
  const heroKPIs = useMemo(() => buildHeroKPIs(data), [data]);
  const insights = useMemo(() => buildPulseInsights(data), [data]);
  const driverMatrix = useMemo(() => buildDriverMatrix(data), [data]);
  const driverTree = useMemo(() => buildDriverTree(data), [data]);
  const bridgeItems = useMemo(() => buildBridgeItems(data), [data]);
  const getDriverDetail = useCallback((id: string) => buildDriverDetail(id, data), [data]);

  const narrativeBrief = useMemo(() => ({
    title: 'Manufacturing & Supply Chain Operations Summary',
    period: 'Q4 FY25',
    summary: `Astellas Manufacturing & Supply Chain Operations delivered API yield of 96.8% (+120bps YoY), batch release on-time delivery of 99.2% (+40bps YoY), and global supply fill rate of 99.6% (+30bps YoY) in Q4 FY25 — all above plan.\n\nCOGS/Core Revenue ratio improved to 21.4% (-80bps YoY), 60bps better than the ≤22.0% FY26 target. SMT supply chain savings of ¥1.5B realized in Q1 FY26, tracking toward the ¥6B FY26 annual target.\n\nPADCEV ADC supply chain scaled successfully alongside 55% US revenue growth — zero critical stockout events. VEOZAH and IZERVAY commercial launch inventory buffers are on schedule at ≥3 months. Zero critical regulatory findings across FDA, EMA, and PMDA inspections in FY25.`,
    keyTakeaways: [
      'API yield 96.8% (+120bps YoY) — above ≥96.0% target; XTANDI 97.2%, PADCEV ADC 96.1%',
      'Batch release OTD 99.2% (+40bps) — QC cycle time 18 days; 0.3% hold rate (target <0.5%)',
      'Supply reliability 99.6% (+30bps) — XTANDI 99.8%, PADCEV 99.4%, zero critical stockouts',
      'COGS/Revenue 21.4% (-80bps YoY) — 60bps better than ≤22.0% target; SMT savings ¥1.5B Q1 FY26',
      'VEOZAH + IZERVAY launch inventory ≥3 months buffer on schedule; regulatory compliance 100%',
    ],
    overallStatus: 'good' as const,
  }), []);

  const quarterLabels = ['Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25'];
  const plData = useMemo(() => [
    {
      label: 'Net Product Revenue (Global)', isCategory: true,
      quarters: [
        { actual: '¥531.8B', variance: '+6.2%', varianceColor: 'green' as const },
        { actual: '¥542.4B', variance: '+7.1%', varianceColor: 'green' as const },
        { actual: '¥548.6B', variance: '+8.0%', varianceColor: 'green' as const },
        { actual: '¥556.1B', variance: '+8.5%', varianceColor: 'green' as const },
      ],
      children: [
        {
          label: 'XTANDI Global Revenue', quarters: [
            { actual: '¥235.8B', variance: '+4.2%', varianceColor: 'green' as const },
            { actual: '¥238.5B', variance: '+4.8%', varianceColor: 'green' as const },
            { actual: '¥241.2B', variance: '+5.1%', varianceColor: 'green' as const },
            { actual: '¥244.8B', variance: '+5.5%', varianceColor: 'green' as const },
          ],
        },
        {
          label: 'PADCEV Global Revenue', quarters: [
            { actual: '¥48.2B', variance: '+52%', varianceColor: 'green' as const },
            { actual: '¥52.4B', variance: '+53%', varianceColor: 'green' as const },
            { actual: '¥55.8B', variance: '+54%', varianceColor: 'green' as const },
            { actual: '¥58.6B', variance: '+55%', varianceColor: 'green' as const },
          ],
        },
      ],
    },
    {
      label: 'Cost of Sales (COGS)', isCategory: true,
      quarters: [
        { actual: '¥121.3B', variance: '+5.5%', varianceColor: 'red' as const },
        { actual: '¥122.1B', variance: '+5.0%', varianceColor: 'red' as const },
        { actual: '¥120.8B', variance: '+4.2%', varianceColor: 'red' as const },
        { actual: '¥119.0B', variance: '+3.5%', varianceColor: 'red' as const },
      ],
      children: [
        {
          label: 'Drug Manufacturing + API Costs', quarters: [
            { actual: 'Embedded in COGS', variance: '+4.8% volume growth', varianceColor: 'red' as const },
            { actual: 'Embedded in COGS', variance: '+4.5%', varianceColor: 'red' as const },
            { actual: 'Embedded in COGS', variance: '+3.8%', varianceColor: 'red' as const },
            { actual: 'Embedded in COGS', variance: '+3.2%', varianceColor: 'red' as const },
          ],
        },
      ],
    },
    {
      label: 'COGS / Core Revenue Ratio', isTotal: true,
      quarters: [
        { actual: '22.8%', variance: '-30bps YoY', varianceColor: 'green' as const },
        { actual: '22.5%', variance: '-40bps YoY', varianceColor: 'green' as const },
        { actual: '22.0%', variance: '-60bps YoY', varianceColor: 'green' as const },
        { actual: '21.4%', variance: '-80bps YoY', varianceColor: 'green' as const },
      ],
    },
  ], []);

  const driverDataForTable = useMemo(() => [
    {
      category: 'Manufacturing Quality KPIs', rows: [
        { driver: 'API Yield Efficiency', actual: '96.8%', plan: '≥96.0%', variance: '+0.8pp', varianceColor: 'green' as const, trend: 'up' as const },
        { driver: 'Batch Release OTD', actual: '99.2%', plan: '≥99.0%', variance: '+0.2pp', varianceColor: 'green' as const, trend: 'up' as const },
        { driver: 'Regulatory Hold Rate', actual: '0.3%', plan: '<0.5%', variance: '-0.2pp better', varianceColor: 'green' as const, trend: 'up' as const },
      ],
    },
    {
      category: 'Supply Chain Performance', rows: [
        { driver: 'Supply Fill Rate', actual: '99.6%', plan: '≥99.5%', variance: '+0.1pp', varianceColor: 'green' as const, trend: 'up' as const },
        { driver: 'Critical Stockout Events', actual: '0', plan: '0', variance: 'On target', varianceColor: 'green' as const, trend: 'flat' as const },
        { driver: 'QC Release Cycle Time (days)', actual: '18 days', plan: '≤21 days', variance: '-3 days better', varianceColor: 'green' as const, trend: 'up' as const },
      ],
    },
    {
      category: 'COGS & SMT Savings', rows: [
        { driver: 'COGS / Core Revenue Ratio', actual: '21.4%', plan: '≤22.0%', variance: '-0.6pp better', varianceColor: 'green' as const, trend: 'up' as const },
        { driver: 'SMT Supply Savings Q1 FY26', actual: '¥1.5B', plan: '¥1.5B Q1', variance: 'On plan', varianceColor: 'green' as const, trend: 'up' as const },
        { driver: 'SMT Supply FY26 Annual Target', actual: '¥1.5B Q1', plan: '¥6B FY26', variance: 'On track Q1', varianceColor: 'green' as const, trend: 'up' as const },
      ],
    },
  ], []);

  const attentionItems = useMemo(() => [
    { id: 'a1', severity: 'positive' as const, title: 'PADCEV ADC supply scaling successfully — zero stockout events at 55% revenue growth', detail: 'PADCEV complex ADC manufacturing and cold-chain distribution meeting demand growth without interruption. Batch release OTD 99.4%.', actionTab: 'drivers' },
    { id: 'a2', severity: 'positive' as const, title: 'SMT supply chain savings ¥1.5B Q1 FY26 — tracking to ¥6B FY26 target', detail: 'API procurement consolidation and CMO renegotiation contributing the majority of SMT supply savings. On track for full-year target.', actionTab: 'bridge' },
    { id: 'a3', severity: 'info' as const, title: 'VEOZAH & IZERVAY launch inventory at ≥3 months buffer — regulatory compliance 100%', detail: 'Both new product launches fully supplied. Zero regulatory findings across FDA, EMA, and PMDA inspections in FY25.', actionTab: 'drivers' },
  ], []);

  return (
    <ConsoleShell config={storeOperationsConfig}>
      {({ activeTab, setActiveTab, selectedDriverId, setSelectedDriverId }) => {
        switch (activeTab) {
          case 'overview':
            return (
              <OverviewTab
                heroKPIs={heroKPIs}
                insights={insights}
                drivers={driverMatrix}
                attentionItems={attentionItems}
                performanceSummary={narrativeBrief}
                onNavigateToDrivers={(id) => { setSelectedDriverId(id); setActiveTab('drivers'); }}
                onNavigateToTab={setActiveTab}
              />
            );
          case 'drivers':
            return (
              <DriversTab
                driverTree={driverTree}
                selectedDriverId={selectedDriverId}
                onSelectDriver={setSelectedDriverId}
                getDriverDetail={getDriverDetail}
              />
            );
          case 'bridge':
            return (
              <BridgeTab
                title="Manufacturing & Supply Chain COGS Bridge"
                periodLabel="Q4 FY25 vs Q4 FY24"
                totalVariance="6300"
                totalVariancePercent="-80bps COGS/Rev"
                items={bridgeItems}
              />
            );
          case 'data':
            return (
              <DataTab
                quarterLabels={quarterLabels}
                plData={plData}
                driverData={driverDataForTable}
              />
            );
          default:
            return (
              <OverviewTab
                heroKPIs={heroKPIs}
                insights={insights}
                drivers={driverMatrix}
                attentionItems={attentionItems}
                performanceSummary={narrativeBrief}
                onNavigateToDrivers={(id) => { setSelectedDriverId(id); setActiveTab('drivers'); }}
                onNavigateToTab={setActiveTab}
              />
            );
        }
      }}
    </ConsoleShell>
  );
}
