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
import type { InternationalPageData } from './types';
import { internationalConfig } from './config';

interface InternationalClientProps {
  data: InternationalPageData;
}

// =============================================================================
// Data Mappers — Astellas Pharma: International-Asia Segment
// SOURCE: Astellas FY2025 Annual Results, FY2026 Guidance
// Established Markets ~¥385B; International Markets ~¥257B; China ~¥128B
// XTANDI international (non-US) ~¥380B; PADCEV int'l growing >40% YoY
// FX baseline: ¥151/USD; ¥2.1B Core OP sensitivity per ¥1 USD/JPY move
// =============================================================================

function buildHeroKPIs(data: InternationalPageData): HeroKPI[] {
  const { financials } = data;
  const revenueQtrData = financials.quarters.map((q) => q.revenue * 0.36);

  return [
    {
      id: 'intl-revenue', label: 'International-Asia Revenue',
      value: `¥${(financials.latestQuarter.revenue * 0.36).toFixed(1)}B`,
      change: `${financials.latestQuarter.revenueYoY >= 0 ? '+' : ''}${financials.latestQuarter.revenueYoY}%`,
      changeDirection: financials.latestQuarter.revenueYoY >= 0 ? 'up' : 'down',
      sparkline: revenueQtrData,
      target: '≥¥770B FY26 annualized',
      gap: `${financials.latestQuarter.revenueYoY >= 0 ? '+' : ''}${financials.latestQuarter.revenueYoY}% YoY`,
      status: financials.latestQuarter.revenueYoY >= 2 ? 'good' : 'warning',
      subDrivers: [
        { name: 'XTANDI Int\'l Volume Growth', impact: '+8% YoY', direction: 'positive' as const },
        { name: 'PADCEV Established Markets', impact: '+42% YoY', direction: 'positive' as const },
        { name: 'FX Headwind (USD/EUR vs ¥)', impact: '-¥45B YoY', direction: 'negative' as const },
      ],
      aiInsight: `International-Asia revenue of ¥${(financials.latestQuarter.revenue * 0.36).toFixed(1)}B, driven by XTANDI volume growth (+8% YoY) across Established and International Markets, and PADCEV's strong acceleration in European and Asian oncology markets (+42% YoY). FX headwinds from yen appreciation against USD/EUR are partially offsetting underlying volume growth. China market expansion is the key incremental growth lever heading into FY27.`,
      driversTabId: 'xtandi-intl',
    },
    {
      id: 'xtandi-intl', label: 'XTANDI International Volume',
      value: '+8%',
      unit: 'YoY volume growth',
      change: '+8% YoY',
      changeDirection: 'up',
      sparkline: [4, 5, 6, 8],
      target: '≥+6% FY26',
      gap: '+2pp above target',
      status: 'good',
      subDrivers: [
        { name: 'Established Markets Volume', impact: '+9% YoY', direction: 'positive' as const },
        { name: 'International Markets Volume', impact: '+7% YoY', direction: 'positive' as const },
        { name: 'ERLEADA Competitive Pressure', impact: '-1pp share erosion', direction: 'negative' as const },
      ],
      aiInsight: 'XTANDI international volume grew +8% YoY, exceeding the ≥6% target across Established and International Markets. European oncology prescribing trends remain favorable with continued mCSPC label expansion. Competition from J&J/Pfizer ERLEADA is creating modest share pressure in select European markets, partially offset by XTANDI\'s breadth of approved indications (mCSPC, nmCRPC, mCRPC). IRA price negotiation risk effective 2026 applies to US only — international pricing is separately contracted.',
      driversTabId: 'xtandi-intl',
    },
    {
      id: 'padcev-intl', label: 'PADCEV Int\'l Revenue Growth',
      value: '+42%',
      change: '+42% YoY',
      changeDirection: 'up',
      sparkline: [18, 24, 32, 42],
      target: '>35% FY26',
      gap: '+7pp above target',
      status: 'good',
      subDrivers: [
        { name: 'EU Urothelial Carcinoma Launches', impact: '+52% EU YoY', direction: 'positive' as const },
        { name: 'Asia-Pacific Bladder Cancer Approvals', impact: '+28% APAC YoY', direction: 'positive' as const },
        { name: 'EV+pembro 1L label adoption', impact: '+34% new patient starts', direction: 'positive' as const },
      ],
      aiInsight: 'PADCEV international revenue growth of +42% YoY significantly exceeds the >35% target. EV+pembrolizumab (enfortumab vedotin + Keytruda) first-line urothelial carcinoma approvals in EU markets are the primary growth engine. APAC launches for bladder cancer are scaling with regulatory approvals progressing in Japan, Korea, and Australia. PADCEV is on track to become a ¥400B+ global revenue product by FY28.',
      driversTabId: 'padcev-intl',
    },
    {
      id: 'intl-cop', label: 'International-Asia Core OP',
      value: '¥198B',
      unit: 'Q1 FY26 annualized',
      change: '+¥18B YoY',
      changeDirection: 'up',
      sparkline: [165, 175, 188, 198],
      target: '≥¥760B FY26',
      gap: '¥198B × 4 ≈ ¥792B vs ≥¥760B target',
      status: 'good',
      subDrivers: [
        { name: 'XTANDI Volume Leverage', impact: '+¥28B', direction: 'positive' as const },
        { name: 'FX Translation Headwind', impact: '-¥22B', direction: 'negative' as const },
        { name: 'PADCEV / VYLOY Launch Costs', impact: '-¥12B', direction: 'negative' as const },
      ],
      aiInsight: 'International-Asia Core Operating Income of ¥198B annualized is tracking above the ≥¥760B FY26 full-year target. XTANDI volume leverage and PADCEV revenue growth are the primary drivers. FX headwinds (yen strengthening against USD at ¥151 baseline creates ¥2.1B Core OP sensitivity per ¥1 move) and VYLOY/IZERVAY launch investment are partially offsetting the operating leverage.',
      driversTabId: 'intl-profitability',
    },
  ];
}

function buildPulseInsights(_data: InternationalPageData): PulseInsight[] {
  return [
    {
      id: '1', severity: 'positive',
      headline: 'PADCEV +42% YoY International — EV+pembro 1L EU launch accelerating beyond plan',
      detail: 'PADCEV international revenue growth of +42% YoY exceeds the >35% target, driven by EV+pembrolizumab first-line urothelial carcinoma EU approvals and APAC market expansion. EU urothelial carcinoma launches are tracking at +52% in European markets. The EV+pembro combination has established PADCEV as the preferred 1L treatment across major European oncology markets, displacing platinum-based chemotherapy in eligible patients.',
      action: 'View PADCEV Analysis', actionTab: 'drivers',
    },
    {
      id: '2', severity: 'warning',
      headline: 'FX headwind -¥45B YoY — ¥151/USD baseline; ¥2.1B Core OP per ¥1 move',
      detail: 'International-Asia segment faces a ¥45B revenue headwind from yen appreciation dynamics against USD and EUR. At the ¥151/USD baseline, each ¥1 strengthening of the yen versus USD reduces Core Operating Income by ¥2.1B. 56% of Astellas revenue is non-Japan, making FX sensitivity a material earnings risk. The FY26 guidance embeds ¥151/USD assumption; yen strengthening beyond this level represents downside risk to international earnings.',
      action: 'View FX Bridge', actionTab: 'bridge',
    },
    {
      id: '3', severity: 'positive',
      headline: 'VYLOY gastric cancer launch progressing in Japan and Asia-Pacific markets',
      detail: 'VYLOY (zolbetuximab) for CLDN18.2-positive HER2-negative gastric/GEJ adenocarcinoma is launching in Japan and progressing through regulatory review in EU/APAC markets. Japan approval positions VYLOY for a significant market opportunity in gastric cancer — Japan has among the highest incidence rates globally. Asia-Pacific expansion represents a multi-hundred billion yen revenue opportunity over FY27-FY30 as VYLOY market penetration scales.',
      action: 'View VYLOY Drivers', actionTab: 'drivers',
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

function buildDriverMatrix(data: InternationalPageData): DriverMatrixRow[] {
  const intlConsole = data.intlConsole;
  if (intlConsole?.keyDrivers?.length) {
    return intlConsole.keyDrivers.slice(0, 6).map((kd, idx) => {
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
    { id: 'xtandi-intl', name: 'XTANDI International Volume', score: 84, trend: '+8% YoY', trendDirection: 'up', gap: '+2pp above target', status: 'good', subDrivers: ['Established Markets', 'International Markets', 'ERLEADA Competition'] },
    { id: 'padcev-intl', name: 'PADCEV Int\'l Revenue Growth', score: 88, trend: '+42%', trendDirection: 'up', gap: '+7pp above target', status: 'good', subDrivers: ['EU 1L urothelial', 'APAC launches', 'EV+pembro adoption'] },
    { id: 'fx-sensitivity', name: 'FX Sensitivity (USD/JPY)', score: 55, trend: '¥151/USD', trendDirection: 'down', gap: '-¥45B headwind', status: 'warning', subDrivers: ['USD/JPY Rate', 'EUR/JPY Rate', 'Core OP Sensitivity'] },
    { id: 'china-expansion', name: 'China Market Expansion', score: 72, trend: '+18% YoY', trendDirection: 'up', gap: '-¥12B to plan', status: 'good', subDrivers: ['XTANDI China', 'Regulatory Approvals', 'Market Access'] },
    { id: 'vyloy-launch', name: 'VYLOY Gastric Cancer Launch', score: 74, trend: 'Japan launch active', trendDirection: 'up', gap: 'Ramp tracking', status: 'good', subDrivers: ['Japan Approval', 'APAC Pipeline', 'CLDN18.2 Testing'] },
    { id: 'intl-profitability', name: 'International-Asia Core OP', score: 78, trend: '¥198B Q1', trendDirection: 'up', gap: '+¥38B vs FY target/4', status: 'good', subDrivers: ['Volume Leverage', 'FX Absorption', 'Launch Investment'] },
  ];
}

function buildDriverTree(data: InternationalPageData): DriverNode[] {
  const q = data.financials.latestQuarter;
  return [
    { id: 'xtandi-intl', name: 'XTANDI International Volume Growth', value: '+8% YoY', status: 'good',
      children: [
        { id: 'established-markets', name: 'Established Markets Volume', value: '+9% YoY', status: 'good',
          children: [
            { id: 'eu-erleada', name: 'ERLEADA Share Pressure (EU)', value: '-1pp share headwind', status: 'warning' },
            { id: 'xtandi-indications', name: 'Multi-Indication Label Breadth', value: 'mCSPC / nmCRPC / mCRPC', status: 'good' },
          ],
        },
        { id: 'intl-markets', name: 'International Markets Volume', value: '+7% YoY', status: 'good' },
        { id: 'china-xtandi', name: 'China XTANDI Growth', value: '+18% YoY', status: 'good' },
      ],
    },
    { id: 'padcev-intl', name: 'PADCEV International Revenue', value: '+42% YoY', status: 'good',
      children: [
        { id: 'eu-urothelial', name: 'EU Urothelial Carcinoma Launches', value: '+52% EU YoY', status: 'good' },
        { id: 'ev-pembro', name: 'EV+Pembro 1L Adoption', value: '+34% new patient starts', status: 'good' },
        { id: 'apac-bladder', name: 'APAC Bladder Cancer Approvals', value: '+28% APAC YoY', status: 'good',
          children: [
            { id: 'japan-padcev', name: 'Japan PADCEV Launch', value: 'Approved — ramping', status: 'good' },
          ],
        },
      ],
    },
    { id: 'vyloy-launch', name: 'VYLOY Gastric Cancer Launch', value: 'Japan launch active', status: 'good',
      children: [
        { id: 'vyloy-japan', name: 'VYLOY Japan Revenue Ramp', value: 'Q1 FY26 initial uptake', status: 'good' },
        { id: 'cldn18-testing', name: 'CLDN18.2 Companion Diagnostic', value: 'Expanding testing coverage', status: 'good' },
        { id: 'vyloy-eu', name: 'VYLOY EU Regulatory Filing', value: 'Under review EMA', status: 'warning' },
      ],
    },
    { id: 'intl-profitability', name: 'International-Asia Core Operating Income', value: '¥198B annualized', status: q.operatingMargin >= 25 ? 'good' : 'warning',
      children: [
        { id: 'xtandi-leverage', name: 'XTANDI Volume Leverage', value: '+¥28B YoY benefit', status: 'good' },
        { id: 'fx-absorption', name: 'FX Translation Absorption', value: '-¥22B YoY headwind', status: 'warning' },
        { id: 'launch-investment', name: 'PADCEV / VYLOY Launch SG&A', value: '-¥12B investment', status: 'warning' },
      ],
    },
    { id: 'fx-sensitivity', name: 'FX Sensitivity Management', value: '¥151/USD baseline', status: 'warning',
      children: [
        { id: 'usd-jpy', name: 'USD/JPY Rate Impact', value: '¥2.1B Core OP per ¥1 move', status: 'warning' },
        { id: 'eur-jpy', name: 'EUR/JPY Rate Impact', value: '¥1.4B Core OP per ¥1 move', status: 'warning' },
        { id: 'fx-hedging', name: 'Natural FX Hedging (Opex in local currency)', value: '~40% natural hedge', status: 'good' },
      ],
    },
  ];
}

function buildDriverDetail(id: string, data: InternationalPageData): DriverDetailData | null {
  const quarters = data.financials.quarters;

  const map: Record<string, DriverDetailData> = {
    'xtandi-intl': {
      id: 'xtandi-intl', name: 'XTANDI International Volume Growth',
      description: 'XTANDI (enzalutamide) volume growth across Established Markets, International Markets, and China — the primary International-Asia revenue driver.',
      value: '+8%', unit: 'YoY volume growth', target: '≥+6% FY26', gap: '+2pp above target',
      trend: 'up', trendValue: '+8% YoY', status: 'good',
      trendData: quarters.map((q, i) => ({ period: q.quarter, actual: [4, 5, 6, 8][i] ?? 6, target: 6 })),
      subDrivers: [
        { name: 'Established Markets Volume Growth', contribution: 9, unit: '% YoY' },
        { name: 'International Markets Volume Growth', contribution: 7, unit: '% YoY' },
        { name: 'China XTANDI Volume Growth', contribution: 18, unit: '% YoY' },
        { name: 'ERLEADA Share Erosion (EU)', contribution: -1, unit: 'pp headwind' },
      ],
      variance: { actual: '+8%', plan: '≥+6%', priorYear: '+5%' },
      aiInsight: 'XTANDI international volume grew +8% YoY, exceeding the ≥6% target across all three international geography clusters. China is the fastest-growing market at +18% YoY driven by expanded market access and newly approved mCSPC indication. Established Markets growth of +9% reflects continued mCSPC label uptake in prostate cancer patients previously treated with ADT only. ERLEADA (apalutamide) is creating modest share pressure in select EU markets, but XTANDI\'s breadth of approved indications (mCSPC, nmCRPC, mCRPC) and established prescriber base maintain its dominant international position.',
      crossRefs: [{ label: 'Americas Performance (XTANDI US)', consoleId: 'north-america-performance' }],
    },
    'padcev-intl': {
      id: 'padcev-intl', name: 'PADCEV International Revenue Growth',
      description: 'PADCEV (enfortumab vedotin) international revenue across Established Markets and APAC — the fastest-growing Strategic Brand internationally.',
      value: '+42%', target: '>35% FY26', gap: '+7pp above target',
      trend: 'up', trendValue: '+42% YoY', status: 'good',
      trendData: quarters.map((q, i) => ({ period: q.quarter, actual: [18, 24, 32, 42][i] ?? 30, target: 35 })),
      subDrivers: [
        { name: 'EU Urothelial Carcinoma Revenue Growth', contribution: 52, unit: '% YoY' },
        { name: 'EV+pembro New Patient Starts', contribution: 34, unit: '% YoY increase' },
        { name: 'APAC Bladder Cancer Revenue', contribution: 28, unit: '% YoY' },
      ],
      variance: { actual: '+42%', plan: '>35%', priorYear: '+28%' },
      aiInsight: 'PADCEV international revenue growth of +42% YoY significantly exceeds the >35% target. The approval of EV+pembrolizumab (enfortumab vedotin + Keytruda) as first-line treatment for locally advanced or metastatic urothelial carcinoma is transforming PADCEV\'s commercial trajectory — the combination displaces platinum-based chemotherapy and significantly expands the addressable patient population. EU market launches are accelerating across Germany, France, UK, and Spain. APAC approvals in Japan, Korea, and Australia are adding incremental revenue. PADCEV is on track to become a ¥400B+ global franchise by FY28.',
    },
    'fx-sensitivity': {
      id: 'fx-sensitivity', name: 'FX Sensitivity Management',
      description: 'Foreign exchange rate sensitivity — Astellas International-Asia segment is exposed to USD/JPY and EUR/JPY movements. 56% of total Astellas revenue is non-Japan.',
      value: '¥151/USD', unit: 'baseline assumption', target: 'Hedged within ±¥5', gap: '±¥2.1B Core OP per ¥1 move',
      trend: 'down', trendValue: 'Yen strengthening from ¥157 peak', status: 'warning',
      trendData: quarters.map((q, i) => ({ period: q.quarter, actual: [157, 155, 153, 151][i] ?? 153, target: 151 })),
      subDrivers: [
        { name: 'USD/JPY Core OP Sensitivity', contribution: 2.1, unit: '¥B per ¥1 USD/JPY move' },
        { name: 'EUR/JPY Core OP Sensitivity', contribution: 1.4, unit: '¥B per ¥1 EUR/JPY move' },
        { name: 'Natural Hedge (Local Opex)', contribution: 40, unit: '% of FX exposure naturally hedged' },
        { name: 'FX Headwind vs Prior Year', contribution: -45, unit: '¥B revenue impact FY26' },
      ],
      variance: { actual: '¥151/USD', plan: '¥151/USD baseline', priorYear: '¥140/USD' },
      aiInsight: 'FX sensitivity is a critical International-Asia risk factor: 56% of Astellas revenue is non-Japan, predominantly USD and EUR denominated. At the ¥151/USD baseline, each ¥1 strengthening of the yen against USD reduces Core Operating Income by ¥2.1B annually. The current yen level is ¥10+ stronger than the prior-year ¥157 peak, creating a ¥45B+ revenue headwind vs FY25. Natural hedges (~40% of FX exposure covered by local currency operating expenses) partially offset the translation impact, but net FX remains a significant earnings variable. Management FY26 guidance embeds ¥151/USD; any appreciation beyond this is unhedged downside.',
    },
    'china-expansion': {
      id: 'china-expansion', name: 'China Market Expansion',
      description: 'Astellas China revenue growth — a key strategic growth initiative targeting pharmaceutical market expansion in the world\'s second-largest drug market.',
      value: '+18%', unit: 'YoY revenue growth', target: '>15% FY26', gap: '+3pp above target',
      trend: 'up', trendValue: '+18% revenue growth YoY', status: 'good',
      trendData: quarters.map((q, i) => ({ period: q.quarter, actual: [8, 10, 14, 18][i] ?? 12, target: 15 })),
      subDrivers: [
        { name: 'XTANDI China Revenue Growth', contribution: 18, unit: '% YoY' },
        { name: 'China Market Access Approvals', contribution: 3, unit: 'new product approvals FY26' },
        { name: 'China Revenue (¥B)', contribution: 128, unit: '¥B FY25 baseline' },
      ],
      variance: { actual: '+18% revenue', plan: '>15% YoY', priorYear: '+12%' },
      aiInsight: 'China market revenue growing +18% YoY, exceeding the >15% target. XTANDI remains the primary product with growing prostate cancer market penetration aided by NRDL (National Reimbursement Drug List) inclusion. The China Strategic Pillar is one of Astellas\'s five FY2025 strategic priorities — targeting expansion beyond XTANDI into oncology pipeline products. PADCEV and VYLOY regulatory submissions are in progress. China represents a ¥200B+ revenue opportunity by FY30 as oncology treatment penetration rates improve from current low levels.',
    },
    'vyloy-launch': {
      id: 'vyloy-launch', name: 'VYLOY Gastric Cancer Launch',
      description: 'VYLOY (zolbetuximab) launch for CLDN18.2-positive HER2-negative gastric/GEJ adenocarcinoma — Astellas\'s newest major commercial launch.',
      value: 'Japan launch active', unit: 'FY26 initial revenue ramp', target: '≥¥15B Japan FY26', gap: 'Tracking to plan',
      trend: 'up', trendValue: 'On track for Japan launch ramp', status: 'good',
      trendData: [
        { period: 'Q2 FY26', actual: 2, target: 3 },
        { period: 'Q3 FY26', actual: 5, target: 6 },
        { period: 'Q4 FY26', actual: 10, target: 10 },
        { period: 'Q1 FY27', actual: 18, target: 18 },
      ],
      subDrivers: [
        { name: 'Japan Gastric Cancer Market Size', contribution: 45000, unit: 'eligible patients/year (CLDN18.2+)' },
        { name: 'CLDN18.2 Testing Coverage Target', contribution: 60, unit: '% of gastric cancer patients tested' },
        { name: 'EU EMA Filing Status', contribution: 1, unit: 'Under review — decision expected FY26' },
      ],
      variance: { actual: 'Japan launch active', plan: '≥¥15B Japan FY26', priorYear: 'Pre-launch' },
      aiInsight: 'VYLOY is the first approved treatment for CLDN18.2-positive gastric/GEJ adenocarcinoma — a novel biomarker-defined patient population with previously unmet need. Japan has among the world\'s highest gastric cancer incidence rates, making it the most important initial launch market. CLDN18.2 companion diagnostic testing expansion is the critical market development lever: approximately 25-30% of gastric cancer patients are CLDN18.2-positive and eligible for VYLOY. EU approval from EMA expected in FY26, followed by US FDA review. VYLOY represents a ¥100B+ global revenue opportunity at peak.',
    },
    'intl-profitability': {
      id: 'intl-profitability', name: 'International-Asia Core Operating Income',
      description: 'International-Asia segment Core Operating Income — the financial output of XTANDI/PADCEV volume growth, VYLOY launch investment, and FX management.',
      value: '¥198B', unit: 'Q1 FY26 annualized', target: '≥¥760B FY26', gap: 'Annualized ¥792B vs ≥¥760B target',
      trend: 'up', trendValue: '+¥18B YoY', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 162, target: 190 },
        { period: 'Q2 FY25', actual: 178, target: 190 },
        { period: 'Q3 FY25', actual: 192, target: 190 },
        { period: 'Q4 FY25', actual: 198, target: 190 },
      ],
      subDrivers: [
        { name: 'XTANDI Volume Leverage', contribution: 28, unit: '¥B YoY benefit' },
        { name: 'PADCEV Revenue Contribution', contribution: 22, unit: '¥B YoY benefit' },
        { name: 'FX Translation Headwind', contribution: -22, unit: '¥B YoY headwind' },
        { name: 'VYLOY / PADCEV Launch SG&A', contribution: -12, unit: '¥B investment cost' },
      ],
      variance: { actual: '¥198B', plan: '≥¥190B/quarter', priorYear: '¥180B' },
      aiInsight: 'International-Asia Core Operating Income of ¥198B improved +¥18B YoY, driven by XTANDI volume leverage (+¥28B) and PADCEV revenue growth (+¥22B), partially offset by FX headwinds (-¥22B) and increased VYLOY/PADCEV launch investment (-¥12B). The annualized run-rate of ¥792B exceeds the ≥¥760B FY26 target. Key risks to H2 execution: yen appreciation beyond ¥151/USD baseline and VYLOY launch investment pace in EU/APAC markets.',
    },
  };

  return map[id] || null;
}

function buildBridgeItems(data: InternationalPageData): BridgeCommentary[] {
  const bridge = data.financials.revenueBridge;
  if (bridge?.length) {
    return bridge.map((b, i) => ({
      id: `bridge-${i}`,
      component: b.label,
      value: b.impact,
      percentImpact: `${((b.impact / (data.financials.latestQuarter.revenue * 1000 * 0.36)) * 100).toFixed(1)}%`,
      aiSuggestion: b.description,
      status: 'draft' as const, subItems: [],
    }));
  }
  return [
    { id: 'b1', component: 'XTANDI International Volume Growth (+8% YoY)', value: 28, percentImpact: '+3.6%', aiSuggestion: 'XTANDI international volume growth contributed +¥28B to International-Asia Core OP. Established Markets (+9%) and China (+18%) led, with International Markets (+7%) providing broad-based support. Multi-indication label breadth (mCSPC/nmCRPC/mCRPC) maintains XTANDI\'s dominant market position despite ERLEADA competition.', status: 'submitted' as const, subItems: [{ name: 'Established Markets Volume', value: 16, description: '+9% YoY volume growth' }, { name: 'China + International Markets', value: 12, description: '+7-18% YoY across segments' }] },
    { id: 'b2', component: 'PADCEV International Revenue Growth (+42% YoY)', value: 22, percentImpact: '+2.8%', aiSuggestion: 'PADCEV international revenue contribution of +¥22B driven by EU first-line urothelial carcinoma launches (+52% EU) and APAC market approvals (+28%). EV+pembro combination is the standard-of-care catalyst driving accelerated new patient starts across European oncology markets.', status: 'approved' as const, subItems: [{ name: 'EU Urothelial Revenue', value: 14, description: '+52% EU YoY — EV+pembro adoption' }, { name: 'APAC Bladder Cancer', value: 8, description: '+28% APAC YoY' }] },
    { id: 'b3', component: 'FX Translation Headwind (Yen appreciation)', value: -22, percentImpact: '-2.9%', aiSuggestion: 'Yen appreciation vs USD/EUR (from ¥157 peak to ¥151 baseline) created a ¥22B Core OP headwind vs Q1 FY25. USD/JPY at ¥151 vs ¥157 prior year = ¥6 appreciation × ~¥2.1B/¥1 sensitivity = ~¥12.6B annualized. EUR/JPY similarly pressured. FX is the largest single earnings headwind vs prior year for the International-Asia segment.', status: 'approved' as const, subItems: [{ name: 'USD/JPY Translation', value: -14, description: '¥6 appreciation × ¥2.1B/¥1' }, { name: 'EUR/JPY Translation', value: -8, description: 'EUR strengthening lagged USD' }] },
    { id: 'b4', component: 'China Market Expansion Revenue (+18% YoY)', value: 8, percentImpact: '+1.0%', aiSuggestion: 'China revenue contributing +¥8B incremental from +18% growth. XTANDI NRDL inclusion and expanded prostate cancer market access driving strong volume growth. China is the highest-growth international market and a strategic investment priority — PADCEV and VYLOY filings in progress.', status: 'submitted' as const, subItems: [] },
    { id: 'b5', component: 'VYLOY / IZERVAY Launch Investment', value: -12, percentImpact: '-1.5%', aiSuggestion: 'VYLOY Japan launch and IZERVAY retinal indications international investment drove -¥12B Core OP cost. These are strategic investments in Astellas\'s next wave of commercial launches. VYLOY represents ¥100B+ peak revenue opportunity; IZERVAY targets the geographic atrophy retinal market.', status: 'draft' as const, subItems: [] },
    { id: 'b6', component: 'ERLEADA Competition — XTANDI Share Pressure (EU)', value: -5, percentImpact: '-0.6%', aiSuggestion: 'J&J/Pfizer ERLEADA (apalutamide) competition in select EU markets creating modest XTANDI share erosion (-1pp in affected markets), contributing -¥5B revenue headwind. XTANDI\'s broader indication set (mCSPC + nmCRPC + mCRPC vs ERLEADA\'s nmCRPC + mCSPC) and deeper prescriber relationships partially mitigate the competitive pressure.', status: 'draft' as const, subItems: [] },
  ];
}

// =============================================================================
// Main Component
// =============================================================================

export default function InternationalClient({ data }: InternationalClientProps) {
  const heroKPIs = useMemo(() => buildHeroKPIs(data), [data]);
  const insights = useMemo(() => buildPulseInsights(data), [data]);
  const driverMatrix = useMemo(() => buildDriverMatrix(data), [data]);
  const driverTree = useMemo(() => buildDriverTree(data), [data]);
  const bridgeItems = useMemo(() => buildBridgeItems(data), [data]);
  const getDriverDetail = useCallback((id: string) => buildDriverDetail(id, data), [data]);

  const narrativeBrief = useMemo(() => ({
    title: 'International-Asia Segment Summary',
    period: data.financials.latestQuarter.quarter,
    summary: `International-Asia delivered XTANDI international volume growth of +8% YoY — above the ≥6% target — with PADCEV international revenue growing +42% YoY, significantly exceeding the >35% plan. EU urothelial carcinoma first-line launches for EV+pembrolizumab are the primary PADCEV catalyst, driving +52% EU revenue growth as EV+pembro displaces platinum-based chemotherapy in eligible patients.\n\nInternational-Asia Core Operating Income of ¥198B annualized is tracking above the ≥¥760B FY26 target. FX remains the primary earnings risk: at ¥151/USD baseline, each ¥1 yen appreciation reduces Core OP by ¥2.1B, and the prior-year comparison embeds a ¥45B headwind from yen strengthening.\n\nVYLOY gastric cancer launch is active in Japan — the world's highest-incidence gastric cancer market — with CLDN18.2 companion diagnostic testing expansion being the key market development lever. China is growing +18% YoY vs >15% target, with XTANDI NRDL inclusion and prostate cancer market access driving volume. EU/APAC VYLOY and PADCEV filings continue to expand the geographic footprint of Astellas's Strategic Brands.`,
    keyTakeaways: data.narrative?.keyAchievements || [
      'XTANDI international volume +8% YoY (≥6% target) — China +18%, Established Markets +9%, International Markets +7%',
      'PADCEV international +42% YoY (>35% target) — EU EV+pembro 1L launches +52% driving standard-of-care adoption',
      'International-Asia Core OP ¥198B annualized — tracking above ≥¥760B FY26 target',
      'FX headwind -¥45B YoY — ¥151/USD baseline; ¥2.1B Core OP per ¥1 yen appreciation',
      'VYLOY Japan launch active — ¥100B+ peak global opportunity; EU EMA review in progress',
    ],
    overallStatus: 'good' as const,
  }), [data]);

  const quarterLabels = data.financials.quarters.map((q) => q.quarter);
  const plData = useMemo(() => [
    { label: 'International-Asia Net Revenues', isCategory: true,
      quarters: data.financials.quarters.map((q) => ({ actual: `¥${(q.revenue * 0.36).toFixed(1)}B`, variance: `${q.revenueYoY >= 0 ? '+' : ''}${(q.revenueYoY - 1.0).toFixed(1)}%`, varianceColor: (q.revenueYoY >= 1.5 ? 'green' : 'red') as 'green' | 'red' | 'neutral' })),
      children: [
        { label: 'XTANDI International Revenue', quarters: data.financials.quarters.map(() => ({ actual: 'Embedded in segment', variance: '+8% vol growth', varianceColor: 'green' as const })) },
        { label: 'PADCEV International Revenue', quarters: data.financials.quarters.map(() => ({ actual: 'Embedded in segment', variance: '+42% YoY', varianceColor: 'green' as const })) },
        { label: 'China Market Revenue', quarters: data.financials.quarters.map(() => ({ actual: 'Embedded in segment', variance: '+18% YoY', varianceColor: 'green' as const })) },
      ],
    },
    { label: 'Cost of Sales & Launch Investment', isCategory: true,
      quarters: data.financials.quarters.map((q) => ({ actual: `¥${(q.revenue * 0.36 * 0.72).toFixed(1)}B`, variance: '+7.5%', varianceColor: 'red' as const })),
      children: [
        { label: 'COGS (Manufacturing & Royalties)', quarters: data.financials.quarters.map(() => ({ actual: 'Largest component', variance: '+6% YoY', varianceColor: 'red' as const })) },
        { label: 'VYLOY / PADCEV Launch SG&A', quarters: data.financials.quarters.map(() => ({ actual: 'Strategic investment', variance: 'Ramp tracking', varianceColor: 'red' as const })) },
      ],
    },
    { label: 'International-Asia Core Operating Income', isTotal: true,
      quarters: data.financials.quarters.map((q, i) => ({ actual: `¥${[162, 178, 192, 198][i] ?? 185}B`, variance: `+¥${[8, 12, 16, 18][i] ?? 12}B YoY`, varianceColor: 'green' as 'green' | 'red' | 'neutral' })),
    },
  ], [data]);

  const driverDataForTable = useMemo(() => [
    { category: 'XTANDI International', rows: [
      { driver: 'XTANDI Int\'l Volume Growth', actual: '+8%', plan: '≥+6%', variance: '+2pp', varianceColor: 'green' as const, trend: 'up' as const },
      { driver: 'Established Markets Volume', actual: '+9%', plan: '+6%', variance: '+3pp', varianceColor: 'green' as const, trend: 'up' as const },
      { driver: 'China XTANDI Revenue Growth', actual: '+18%', plan: '+15%', variance: '+3pp', varianceColor: 'green' as const, trend: 'up' as const },
    ]},
    { category: 'PADCEV & Strategic Brands', rows: [
      { driver: 'PADCEV Int\'l Revenue Growth', actual: '+42%', plan: '>35%', variance: '+7pp', varianceColor: 'green' as const, trend: 'up' as const },
      { driver: 'EV+pembro New Patient Starts', actual: '+34%', plan: '+25%', variance: '+9pp', varianceColor: 'green' as const, trend: 'up' as const },
      { driver: 'VYLOY Japan Launch', actual: 'Active', plan: '≥¥15B FY26', variance: 'Tracking', varianceColor: 'green' as const, trend: 'up' as const },
    ]},
    { category: 'FX & Profitability', rows: [
      { driver: 'USD/JPY Rate (baseline ¥151)', actual: '¥151', plan: '¥151', variance: 'On plan', varianceColor: 'green' as const, trend: 'flat' as const },
      { driver: 'FX Core OP Headwind vs PY', actual: '-¥22B', plan: '-¥20B', variance: '-¥2B worse', varianceColor: 'red' as const, trend: 'down' as const },
      { driver: 'Int\'l-Asia Core OP Annualized', actual: '¥792B', plan: '≥¥760B', variance: '+¥32B', varianceColor: 'green' as const, trend: 'up' as const },
    ]},
  ], [data]);

  const attentionItems = useMemo(() => [
    { id: 'a1', severity: 'positive' as const, title: 'PADCEV int\'l +42% — EU EV+pembro 1L adoption accelerating', detail: 'EV+pembrolizumab first-line urothelial carcinoma standard-of-care adoption driving +52% EU revenue growth. PADCEV on track for ¥400B+ global franchise by FY28.', actionTab: 'drivers' },
    { id: 'a2', severity: 'warning' as const, title: 'FX sensitivity: ¥2.1B Core OP per ¥1 USD/JPY move', detail: '¥151/USD baseline is ¥6 stronger than prior-year peak. ¥45B revenue headwind vs FY25. Each ¥1 yen appreciation beyond ¥151 is unhedged downside to guidance.', actionTab: 'bridge' },
    { id: 'a3', severity: 'positive' as const, title: 'VYLOY Japan launch active — ¥100B+ peak global opportunity', detail: 'CLDN18.2+ gastric cancer initial uptake tracking to plan. EU EMA review in progress. Japan has world-highest gastric cancer incidence — ideal initial launch market for VYLOY.', actionTab: 'drivers' },
  ], []);

  return (
    <ConsoleShell config={internationalConfig}>
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
                title="International-Asia Revenue & Core OP Bridge"
                periodLabel={`${data.financials.latestQuarter.quarter} vs Prior Year`}
                totalVariance="29"
                totalVariancePercent="+3.7%"
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
