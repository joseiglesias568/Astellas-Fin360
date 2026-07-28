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
import type { ConsolePageData } from './types';
import { northAmericaConfig } from './config';

interface NorthAmericaClientProps {
  data: ConsolePageData;
}

// =============================================================================
// Data Mappers — Astellas Pharma: Americas Performance (United States Segment)
// SOURCE: Astellas FY2025 Annual Results, FY2026 Guidance
// United States segment ~¥1,091B (51% of total revenue)
// XTANDI US revenue ~¥640B (dominant product); PADCEV US ~¥160B
// IRA price negotiation risk: ¥9.6B Core OP per 1pp net price reduction eff. 2026
// FX baseline: ¥151/USD; VEOZAH (fezolinetant) women's health US launch active
// =============================================================================

function buildHeroKPIs(data: ConsolePageData): HeroKPI[] {
  const { financials } = data;
  const revenueQtrData = financials.quarters.map((q) => q.revenue);
  const marginQtrData = financials.quarters.map((q) => q.operatingMargin);

  return [
    {
      id: 'revenue', label: 'Americas Revenue',
      value: `¥${financials.latestQuarter.revenue}B`,
      change: `${financials.latestQuarter.revenueYoY >= 0 ? '+' : ''}${financials.latestQuarter.revenueYoY}%`,
      changeDirection: financials.latestQuarter.revenueYoY >= 0 ? 'up' : 'down',
      sparkline: revenueQtrData,
      target: '≥¥1,100B FY26 annualized',
      gap: `${financials.latestQuarter.revenueYoY >= 0 ? '+' : ''}${financials.latestQuarter.revenueYoY}% YoY`,
      status: financials.latestQuarter.revenueYoY >= 3 ? 'good' : financials.latestQuarter.revenueYoY >= 0 ? 'warning' : 'critical',
      subDrivers: [
        { name: 'XTANDI US Net Price/Volume', impact: '+4% YoY', direction: 'positive' as const },
        { name: 'PADCEV US Revenue Growth', impact: '+55% YoY', direction: 'positive' as const },
        { name: 'IRA Net Price Headwind Risk', impact: '¥9.6B/1pp — effective 2026', direction: 'negative' as const },
      ],
      aiInsight: `Americas revenue of ¥${financials.latestQuarter.revenue}B, up ${financials.latestQuarter.revenueYoY}% YoY. XTANDI US net price and volume growth remain positive ahead of IRA negotiated price implementation (effective 2026). PADCEV US revenue growing +55% YoY as first-line urothelial carcinoma adoption scales. VEOZAH women's health launch contributing incremental revenue. IRA price negotiation is the most significant near-term Americas risk: ¥9.6B Core OP impact per 1pp net price reduction.`,
      driversTabId: 'xtandi-ira',
    },
    {
      id: 'comp-sales', label: 'XTANDI US Net Price Realization',
      value: '+4%',
      change: '+4% YoY net price',
      changeDirection: 'up',
      sparkline: financials.quarters.map((q) => q.feeRevenueGrowth),
      target: 'Maintain positive pricing pre-IRA',
      gap: 'On track ahead of IRA implementation',
      status: 'good',
      subDrivers: [
        { name: 'Gross-to-Net Improvement', impact: '+180bps YoY', direction: 'positive' as const },
        { name: 'mCSPC Volume Expansion', impact: '+8% new patient starts', direction: 'positive' as const },
        { name: 'ERLEADA US Competitive Pressure', impact: '-2pp share pressure nmCRPC', direction: 'negative' as const },
      ],
      aiInsight: 'XTANDI US net price realization +4% YoY driven by gross-to-net improvement and mCSPC indication volume growth. mCSPC (metastatic castration-sensitive prostate cancer) label expansion continues to drive new patient starts into XTANDI beyond the legacy mCRPC patient population. IRA price negotiation risk is the dominant forward-looking concern: CMS has included XTANDI in the IRA drug price negotiation program; each 1pp net price reduction from the negotiated ceiling price equals ¥9.6B annual Core OP impact effective from the 2026 negotiated price date.',
      driversTabId: 'xtandi-ira',
    },
    {
      id: 'padcev-us', label: 'PADCEV US Revenue Growth',
      value: '+55%',
      unit: 'YoY revenue growth',
      change: '+55% YoY',
      changeDirection: 'up',
      sparkline: [28, 38, 46, 55],
      target: '>40% FY26',
      gap: '+15pp above target',
      status: 'good',
      subDrivers: [
        { name: 'EV+pembro 1L Urothelial Adoption', impact: '+62% new 1L patient starts', direction: 'positive' as const },
        { name: 'PADCEV Bladder Cancer Market Share', impact: '>45% treated patients', direction: 'positive' as const },
        { name: 'PADCEV + Keytruda Combo Rx Growth', impact: '+58% combo prescriptions', direction: 'positive' as const },
      ],
      aiInsight: 'PADCEV US revenue growth of +55% YoY vastly exceeds the >40% target, driven by EV+pembrolizumab adoption as the standard of care for first-line locally advanced or metastatic urothelial carcinoma. The EV+pembro combination has achieved >45% US market share in eligible 1L bladder cancer patients. PADCEV is on track to exceed ¥300B in US revenue by FY27, making it the second-largest product globally behind XTANDI.',
      driversTabId: 'padcev-us',
    },
    {
      id: 'op-margin', label: 'Americas Core OP Margin',
      value: `${financials.latestQuarter.operatingMargin}%`,
      change: '+120bps YoY',
      changeDirection: 'up',
      sparkline: marginQtrData,
      target: '≥28% FY26',
      gap: `${(financials.latestQuarter.operatingMargin - 28).toFixed(1)}pp`,
      status: financials.latestQuarter.operatingMargin >= 28 ? 'good' : financials.latestQuarter.operatingMargin >= 25 ? 'warning' : 'critical',
      subDrivers: [
        { name: 'XTANDI Operating Leverage', impact: '+80bps', direction: 'positive' as const },
        { name: 'PADCEV Revenue Mix Benefit', impact: '+60bps', direction: 'positive' as const },
        { name: 'VEOZAH Launch Investment', impact: '-20bps', direction: 'negative' as const },
      ],
      aiInsight: `Americas Core OP margin of ${financials.latestQuarter.operatingMargin}% improved 120bps YoY, driven by XTANDI operating leverage and PADCEV high-margin revenue contribution. VEOZAH (fezolinetant) women's health launch investment is a modest drag. IRA price implementation risk in FY26 is the primary margin downside scenario: if XTANDI negotiated price results in a 5pp net price reduction, the annual Core OP impact would be approximately ¥48B.`,
      driversTabId: 'profitability',
    },
  ];
}

function buildPulseInsights(_data: ConsolePageData): PulseInsight[] {
  return [
    {
      id: '1', severity: 'warning',
      headline: 'IRA XTANDI price negotiation — ¥9.6B Core OP per 1pp net price reduction eff. 2026',
      detail: 'CMS has selected XTANDI for IRA drug price negotiation under the Inflation Reduction Act. The negotiated "Maximum Fair Price" (MFP) will take effect in 2026. Each 1pp reduction from current net price equals ¥9.6B annual Core OP impact. The negotiation outcome is the single most material Americas earnings risk. Astellas is actively engaging CMS; management has reserved commentary on the likely pricing range pending negotiation completion.',
      action: 'View IRA Risk Analysis', actionTab: 'drivers',
    },
    {
      id: '2', severity: 'positive',
      headline: 'PADCEV +55% US revenue — EV+pembro 1L standard-of-care adoption accelerating',
      detail: 'PADCEV US revenue growth of +55% YoY exceeds the >40% target. EV+pembrolizumab has become the US standard of care for 1L locally advanced/metastatic urothelial carcinoma, achieving >45% new patient starts in eligible patients. The Merck collaboration (50/50 US economics split on PADCEV) continues to generate strong co-promotional synergies through Keytruda\'s established oncology sales force.',
      action: 'View PADCEV Analysis', actionTab: 'drivers',
    },
    {
      id: '3', severity: 'info',
      headline: 'VEOZAH women\'s health US launch: 14,500+ prescribers reached in first 12 months',
      detail: 'VEOZAH (fezolinetant) for vasomotor symptoms (VMS) associated with menopause has reached 14,500+ unique prescribers in the first 12 months of US launch. VEOZAH is the first non-hormonal prescription treatment approved for moderate-to-severe VMS, targeting the ~40% of menopause patients who avoid or cannot use hormone therapy. Market penetration remains early-stage — the addressable US patient population is ~10M annually.',
      action: 'View VEOZAH Drivers', actionTab: 'drivers',
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

function buildDriverMatrix(data: ConsolePageData): DriverMatrixRow[] {
  const naConsole = data.naConsole;
  if (naConsole?.keyDrivers?.length) {
    return naConsole.keyDrivers.slice(0, 6).map((kd, idx) => {
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
    { id: 'xtandi-ira', name: 'XTANDI US & IRA Risk', score: 72, trend: '+4% net price', trendDirection: 'up', gap: 'IRA risk active', status: 'warning', subDrivers: ['Net Price Realization', 'Volume Growth', 'IRA MFP Negotiation'] },
    { id: 'padcev-us', name: 'PADCEV US Growth', score: 90, trend: '+55% YoY', trendDirection: 'up', gap: '+15pp to target', status: 'good', subDrivers: ['EV+pembro 1L', 'Market Share >45%', 'Merck Collaboration'] },
    { id: 'veozah-launch', name: 'VEOZAH Women\'s Health', score: 68, trend: '14,500 Rx\'ers', trendDirection: 'up', gap: 'Early penetration', status: 'warning', subDrivers: ['Prescriber Reach', 'Patient Starts', 'Market Share'] },
    { id: 'profitability', name: 'Americas Core OP Margin', score: 82, trend: '+120bps', trendDirection: 'up', gap: 'Above ≥28% target', status: 'good', subDrivers: ['XTANDI Leverage', 'PADCEV Mix', 'VEOZAH Investment'] },
    { id: 'market-access', name: 'Market Access & Formulary', score: 74, trend: 'Tier 2 majority', trendDirection: 'flat', gap: 'IRA formulary risk', status: 'warning', subDrivers: ['PBM Formulary Coverage', 'Part D Access', 'Prior Auth Rates'] },
    { id: 'pipeline-us', name: 'US Pipeline Launches', score: 78, trend: 'IZERVAY + VEOZAH', trendDirection: 'up', gap: 'Ramp tracking', status: 'good', subDrivers: ['IZERVAY GA', 'VEOZAH VMS', 'Rx Penetration'] },
  ];
}

function buildDriverTree(data: ConsolePageData): DriverNode[] {
  const q = data.financials.latestQuarter;
  return [
    { id: 'xtandi-ira', name: 'XTANDI US & IRA Risk Management', value: '+4% net price', status: 'warning',
      children: [
        { id: 'xtandi-volume', name: 'XTANDI US Volume Growth', value: '+6% new patient starts', status: 'good',
          children: [
            { id: 'mcspc-growth', name: 'mCSPC New Patient Starts', value: '+8% YoY', status: 'good' },
            { id: 'nmcrpc-competition', name: 'nmCRPC ERLEADA Competition', value: '-2pp share pressure', status: 'warning' },
            { id: 'mcrpc-stable', name: 'mCRPC Market Position', value: 'Stable — market leader', status: 'good' },
          ],
        },
        { id: 'ira-negotiation', name: 'IRA Price Negotiation Risk', value: '¥9.6B/1pp eff. 2026', status: 'warning',
          children: [
            { id: 'mfp-implementation', name: 'Maximum Fair Price Implementation', value: '2026 effective date', status: 'warning' },
            { id: 'ira-mitigation', name: 'Volume Offset Strategy', value: 'Patient access programs', status: 'good' },
          ],
        },
        { id: 'xtandi-gross-net', name: 'Gross-to-Net Optimization', value: '+180bps YoY', status: 'good' },
      ],
    },
    { id: 'padcev-us', name: 'PADCEV US Revenue Growth', value: '+55% YoY', status: 'good',
      children: [
        { id: 'ev-pembro-1l', name: 'EV+pembro 1L Urothelial Adoption', value: '+62% new 1L starts', status: 'good' },
        { id: 'padcev-market-share', name: 'Bladder Cancer US Market Share', value: '>45% treated patients', status: 'good' },
        { id: 'merck-collaboration', name: 'Merck Collaboration (50/50 US)', value: 'Strong co-promotion', status: 'good',
          children: [
            { id: 'keytruda-synergy', name: 'Keytruda Sales Force Synergy', value: 'Active co-promotion', status: 'good' },
          ],
        },
      ],
    },
    { id: 'veozah-launch', name: 'VEOZAH Women\'s Health Launch', value: '14,500+ prescribers', status: 'warning',
      children: [
        { id: 'veozah-prescribers', name: 'Unique Prescriber Reach', value: '14,500+ Rx\'ers (12mo)', status: 'warning' },
        { id: 'veozah-patients', name: 'Active Patient Starts', value: 'Early-stage penetration', status: 'warning' },
        { id: 'veozah-market', name: 'Addressable VMS Market', value: '~10M US patients/year', status: 'good' },
      ],
    },
    { id: 'profitability', name: 'Americas Core OP Margin', value: `${q.operatingMargin}%`, status: q.operatingMargin >= 28 ? 'good' : 'warning',
      children: [
        { id: 'xtandi-leverage', name: 'XTANDI Operating Leverage', value: '+80bps margin benefit', status: 'good' },
        { id: 'padcev-mix', name: 'PADCEV High-Margin Revenue Mix', value: '+60bps benefit', status: 'good' },
        { id: 'smt-savings', name: 'SMT Cost Savings (Americas share)', value: '¥8B FY26 target', status: 'good' },
      ],
    },
  ];
}

function buildDriverDetail(id: string, data: ConsolePageData): DriverDetailData | null {
  const quarters = data.financials.quarters;
  const q = quarters[quarters.length - 1];

  const map: Record<string, DriverDetailData> = {
    'xtandi-ira': {
      id: 'xtandi-ira', name: 'XTANDI US & IRA Risk Management',
      description: 'XTANDI US commercial performance and IRA Inflation Reduction Act price negotiation risk — the primary Americas earnings driver and risk factor.',
      value: '+4%', target: 'Maintain net price pre-IRA', gap: 'IRA MFP negotiation in progress',
      trend: 'up', trendValue: '+4% net price realization YoY', status: 'warning',
      trendData: [
        { period: 'Q1 FY25', actual: 2.5, target: 4.0 },
        { period: 'Q2 FY25', actual: 3.2, target: 4.0 },
        { period: 'Q3 FY25', actual: 3.8, target: 4.0 },
        { period: 'Q4 FY25', actual: 4.0, target: 4.0 },
      ],
      subDrivers: [
        { name: 'mCSPC New Patient Volume Growth', contribution: 8, unit: '% YoY' },
        { name: 'Gross-to-Net Improvement', contribution: 1.8, unit: '% (bps → pp)' },
        { name: 'ERLEADA nmCRPC Share Erosion', contribution: -2, unit: 'pp market share headwind' },
        { name: 'IRA MFP Sensitivity', contribution: -9.6, unit: '¥B Core OP per 1pp price reduction' },
      ],
      variance: { actual: '+4% net price', plan: 'Maintain positive pricing', priorYear: '+2.5%' },
      aiInsight: 'XTANDI US net price realization of +4% reflects gross-to-net optimization and mCSPC volume growth, partially offset by ERLEADA competitive pressure in nmCRPC. The overriding near-term risk is the IRA Maximum Fair Price (MFP) negotiation: CMS has selected XTANDI for the FY2026 negotiation cohort. Each 1pp net price reduction from the negotiated ceiling equals ¥9.6B annual Core OP impact. Astellas management is engaging CMS in the negotiation process; final MFP will be published by September 1, 2025 for January 1, 2026 implementation. Analyst consensus expects a 20-40% gross price reduction, which on a net basis (after existing rebates) could represent a 10-25% net price reduction — translating to a ¥96-240B annual Core OP headwind.',
      crossRefs: [{ label: 'SMT Cost Transformation', consoleId: 'strategy-execution' }],
    },
    'padcev-us': {
      id: 'padcev-us', name: 'PADCEV US Revenue Growth',
      description: 'PADCEV (enfortumab vedotin) US revenue — the fastest-growing Astellas product, co-promoted with Merck (Keytruda) for first-line urothelial carcinoma.',
      value: '+55%', unit: 'YoY revenue growth', target: '>40% FY26', gap: '+15pp above target',
      trend: 'up', trendValue: '+55% YoY', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 28, target: 35 },
        { period: 'Q2 FY25', actual: 38, target: 38 },
        { period: 'Q3 FY25', actual: 46, target: 40 },
        { period: 'Q4 FY25', actual: 55, target: 40 },
      ],
      subDrivers: [
        { name: 'EV+pembro 1L New Patient Starts', contribution: 62, unit: '% YoY growth' },
        { name: 'US Bladder Cancer Market Share', contribution: 45, unit: '% of treated patients' },
        { name: 'Combo Prescription Growth', contribution: 58, unit: '% YoY' },
      ],
      variance: { actual: '+55%', plan: '>40%', priorYear: '+28%' },
      aiInsight: 'PADCEV US revenue +55% YoY — significantly exceeding the >40% target and accelerating. EV+pembrolizumab has achieved standard-of-care status for 1L locally advanced/metastatic urothelial carcinoma in the US, with NCCN Category 1 recommendation. The 50/50 US profit split with Merck on PADCEV means Astellas captures 50% of the US contribution margin, with Merck\'s Keytruda sales force providing strong co-promotional leverage. Targeting ¥300B+ US PADCEV revenue by FY27 as penetration scales toward peak market share.',
    },
    'veozah-launch': {
      id: 'veozah-launch', name: 'VEOZAH Women\'s Health US Launch',
      description: 'VEOZAH (fezolinetant) for vasomotor symptoms (VMS) of menopause — Astellas\'s first entry into women\'s health, the largest specialty pharma category.',
      value: '14,500+', unit: 'unique prescribers (12 months)', target: '25,000+ prescribers by YE2026', gap: '-10,500 to YE2026 target',
      trend: 'up', trendValue: '+22% prescriber growth QoQ', status: 'warning',
      trendData: [
        { period: 'Q1 FY25', actual: 3500, target: 8000 },
        { period: 'Q2 FY25', actual: 7200, target: 14000 },
        { period: 'Q3 FY25', actual: 11000, target: 20000 },
        { period: 'Q4 FY25', actual: 14500, target: 25000 },
      ],
      subDrivers: [
        { name: 'OB/GYN Prescriber Reach', contribution: 14500, unit: 'unique prescribers' },
        { name: 'VMS Addressable US Market', contribution: 10, unit: 'M patients/year' },
        { name: 'Non-Hormonal Differentiation', contribution: 40, unit: '% of VMS patients avoid/cannot use HRT' },
      ],
      variance: { actual: '14,500 prescribers', plan: '25,000+ YE2026', priorYear: 'Pre-launch' },
      aiInsight: 'VEOZAH is the first non-hormonal prescription treatment for moderate-to-severe vasomotor symptoms (hot flashes) associated with menopause. The addressable patient population (~10M US patients/year) is substantial, with approximately 40% unable or unwilling to use hormone replacement therapy — creating a significant unmet need. Early launch momentum is building with 14,500+ prescribers reached, though prescriber conversion to active prescribing requires continued education investment. Peak US revenue potential estimated at ¥100B+. OB/GYN call point engagement is the primary market development lever.',
    },
    'profitability': {
      id: 'profitability', name: 'Americas Core OP Margin',
      description: 'Americas segment Core Operating Income margin — driven by XTANDI/PADCEV operating leverage and offset by new product launch investment.',
      value: `${q?.operatingMargin || 0}%`, target: '≥28% FY26', gap: `${((q?.operatingMargin || 0) - 28).toFixed(1)}pp`,
      trend: 'up', trendValue: '+120bps YoY', status: 'good',
      trendData: quarters.map((qu) => ({ period: qu.quarter, actual: qu.operatingMargin, target: 28 })),
      subDrivers: [
        { name: 'XTANDI Volume Leverage', contribution: 0.8, unit: 'pp margin' },
        { name: 'PADCEV Revenue Mix', contribution: 0.6, unit: 'pp margin' },
        { name: 'VEOZAH Launch Investment', contribution: -0.2, unit: 'pp drag' },
        { name: 'SMT Americas Savings', contribution: 0.3, unit: 'pp benefit' },
      ],
      variance: { actual: `${q?.operatingMargin}%`, plan: '≥28%', priorYear: `${(q?.operatingMargin || 0) - 1.2}%` },
      aiInsight: `Americas Core OP margin of ${q?.operatingMargin}% improved 120bps YoY. XTANDI operating leverage on a largely fixed-cost base and PADCEV's high-margin contribution (Astellas captures 50% of US economics) are the primary drivers. SMT cost transformation initiatives targeting ¥8B Americas savings in FY26. VEOZAH launch investment is a modest margin headwind that should moderate as revenue scales. Key downside risk: IRA MFP implementation in 2026 creating a potential 3-8pp margin impact depending on negotiated price reduction magnitude.`,
    },
    'market-access': {
      id: 'market-access', name: 'Market Access & Formulary Position',
      description: 'XTANDI and PADCEV US formulary coverage across commercial, Medicare Part D, and Medicaid plans.',
      value: '>85%', unit: 'commercial formulary coverage (XTANDI)', target: '>90%', gap: '-5pp to target',
      trend: 'flat', trendValue: 'Stable pre-IRA implementation', status: 'warning',
      trendData: [
        { period: 'Q1 FY25', actual: 84, target: 90 },
        { period: 'Q2 FY25', actual: 85, target: 90 },
        { period: 'Q3 FY25', actual: 85, target: 90 },
        { period: 'Q4 FY25', actual: 85, target: 90 },
      ],
      subDrivers: [
        { name: 'Commercial Plan Formulary Coverage', contribution: 85, unit: '% lives (XTANDI)' },
        { name: 'Medicare Part D Coverage', contribution: 92, unit: '% PDP/MA-PD plans' },
        { name: 'Prior Authorization Rate', contribution: 78, unit: '% approved first attempt' },
        { name: 'PADCEV Commercial Coverage', contribution: 88, unit: '% lives' },
      ],
      variance: { actual: '>85%', plan: '>90%', priorYear: '>84%' },
      aiInsight: 'XTANDI US formulary coverage at >85% commercial and >92% Medicare Part D, providing strong access foundation. IRA MFP implementation will directly affect Part D coverage — formulary decisions by PBMs and health plans may shift as the negotiated price changes XTANDI economics for plan sponsors. Maintaining favorable formulary positioning post-IRA implementation is a key commercial strategy. PADCEV access at >88% commercial reflects its standard-of-care designation driving formulary inclusion across major PBMs.',
    },
    'pipeline-us': {
      id: 'pipeline-us', name: 'US Pipeline Launches (IZERVAY + VEOZAH)',
      description: 'Astellas US new product launches beyond oncology — IZERVAY for geographic atrophy (retinal disease) and VEOZAH for VMS of menopause.',
      value: '2', unit: 'active major US launches', target: 'Both tracking to plan', gap: 'Ramp tracking',
      trend: 'up', trendValue: 'Cumulative new launches building', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 1, target: 2 },
        { period: 'Q2 FY25', actual: 2, target: 2 },
        { period: 'Q3 FY25', actual: 2, target: 2 },
        { period: 'Q4 FY25', actual: 2, target: 2 },
      ],
      subDrivers: [
        { name: 'IZERVAY GA Market Penetration', contribution: 12, unit: '% of treated GA patients' },
        { name: 'VEOZAH VMS Prescriber Reach', contribution: 14500, unit: 'unique prescribers' },
        { name: 'Combined Launch Revenue (¥B)', contribution: 35, unit: '¥B annualized FY26 estimate' },
      ],
      variance: { actual: 'Both active', plan: 'Both active', priorYear: 'VEOZAH only (IZERVAY approved Q2 FY25)' },
      aiInsight: 'Both IZERVAY (avacincaptad pegol for geographic atrophy) and VEOZAH are active US commercial launches diversifying Americas revenue beyond oncology. IZERVAY targets geographic atrophy (GA), the leading cause of vision loss in patients with age-related macular degeneration — an ~800K US prevalent patient population with limited treatment options. VEOZAH targets the ~40% of VMS patients who cannot or prefer not to use HRT. Combined, these launches represent the foundation of Astellas\'s portfolio diversification beyond XTANDI dependency.',
    },

    // ── XTANDI IRA children ────────────────────────────────────────────────

    'mcspc-growth': {
      id: 'mcspc-growth', name: 'mCSPC New Patient Volume Growth',
      description: 'Metastatic castration-sensitive prostate cancer new patient starts — the largest XTANDI volume growth driver, driven by expanded first-line prostate cancer treatment.',
      value: '+8%', target: '≥+5% YoY', gap: '+3pp above target',
      trend: 'up', trendValue: '+8% YoY new patient starts', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 4.2, target: 5.0 },
        { period: 'Q2 FY25', actual: 5.8, target: 5.0 },
        { period: 'Q3 FY25', actual: 6.9, target: 5.0 },
        { period: 'Q4 FY25', actual: 8.0, target: 5.0 },
      ],
      subDrivers: [
        { name: 'mCSPC Guideline Penetration', contribution: 72, unit: '% of guideline-eligible new patients' },
        { name: 'AR-targeting Agent Share (mCSPC)', contribution: 55, unit: '% of XTANDI among AR agents' },
        { name: 'Treatment Duration (months)', contribution: 18, unit: 'avg months on therapy' },
      ],
      variance: { actual: '+8%', plan: '≥+5%', priorYear: '+5.5%' },
      aiInsight: 'mCSPC remains the highest-volume XTANDI indication growth driver as AR-targeting agents become more deeply embedded in first-line prostate cancer treatment guidelines. XTANDI holds ~55% market share among AR-targeting agents in mCSPC (vs ERLEADA and darolutamide). The 18-month average treatment duration creates a durable patient base; long-term XTANDI prescribing is supported by ARCHES and ENZAMET trial data demonstrating overall survival benefit.',
    },

    'ira-negotiation': {
      id: 'ira-negotiation', name: 'IRA Maximum Fair Price Negotiation',
      description: 'CMS IRA drug price negotiation for XTANDI — the most material single financial risk facing Astellas Americas.',
      value: '¥9.6B', unit: 'Core OP per 1pp net price reduction', target: 'Minimize price reduction vs current net price', gap: 'Negotiation outcome pending',
      trend: 'down', trendValue: 'Risk increasing toward implementation date', status: 'warning',
      trendData: [
        { period: 'Announcement', actual: 0, target: 0 },
        { period: 'Initial Offer CMS', actual: -15, target: 0 },
        { period: 'Negotiation Period', actual: -20, target: 0 },
        { period: 'Final MFP (est)', actual: -25, target: 0 },
      ],
      subDrivers: [
        { name: 'Core OP per 1pp net price reduction', contribution: -9.6, unit: '¥B/year' },
        { name: 'Analyst consensus range for reduction', contribution: -20, unit: 'to -35% net price (illustrative)' },
        { name: 'Effective Date', contribution: 2026, unit: 'January 2026 implementation' },
        { name: 'Duration of IRA MFP', contribution: 2, unit: 'years initially (2026-2027)' },
      ],
      variance: { actual: 'Negotiation active', plan: 'Minimize net price reduction', priorYear: 'Not yet selected' },
      aiInsight: 'The IRA XTANDI price negotiation is the single most material near-term financial risk for Astellas. CMS has the statutory authority to impose a Maximum Fair Price after negotiation with the manufacturer. Astellas is engaging in the negotiation process but cannot unilaterally reject the CMS offer (the alternative is a substantial excise tax on US sales). At ¥9.6B Core OP per 1pp net price reduction, a 25% net price reduction would equal a ¥240B annual Core OP headwind — approximately 43% of current Americas segment Core OP. Management has stated it is "actively managing this risk" but has not quantified the expected impact. Mitigation levers include: volume growth to offset price reduction, international expansion to diversify revenue, and SMT cost savings.',
    },

    // ── PADCEV US children ────────────────────────────────────────────────

    'ev-pembro-1l': {
      id: 'ev-pembro-1l', name: 'EV+pembro 1L Urothelial Carcinoma Adoption',
      description: 'EV+pembrolizumab (enfortumab vedotin + Keytruda) as first-line treatment for locally advanced/metastatic urothelial carcinoma — the primary PADCEV growth catalyst.',
      value: '+62%', unit: 'new 1L patient starts YoY', target: '+40% YoY', gap: '+22pp above target',
      trend: 'up', trendValue: '+62% new 1L patient starts YoY', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 28, target: 35 },
        { period: 'Q2 FY25', actual: 42, target: 38 },
        { period: 'Q3 FY25', actual: 52, target: 40 },
        { period: 'Q4 FY25', actual: 62, target: 40 },
      ],
      subDrivers: [
        { name: 'FDA-Approved 1L Indication', contribution: 1, unit: 'NCCN Category 1 recommendation' },
        { name: 'Platinum-Eligible Patient Capture', contribution: 45, unit: '% of platinum-eligible 1L patients' },
        { name: 'US Bladder Cancer Incidence', contribution: 83000, unit: 'new cases/year addressable' },
      ],
      variance: { actual: '+62%', plan: '+40%', priorYear: '+28%' },
      aiInsight: 'EV+pembro has achieved NCCN Category 1 recommendation as 1L standard of care for platinum-eligible locally advanced/metastatic urothelial carcinoma patients — the largest, most treatment-refractory bladder cancer patient segment. The EV-302/KEYNOTE-869 trial demonstrated superiority over platinum-based chemotherapy in overall survival. US bladder cancer affects ~83,000 new patients annually; at ~45% capture of eligible 1L patients, PADCEV US has substantial volume headroom to peak market share.',
    },

    'merck-collaboration': {
      id: 'merck-collaboration', name: 'Merck (PADCEV) US Collaboration',
      description: 'Astellas-Merck 50/50 US profit sharing collaboration for PADCEV — co-promoting with Keytruda\'s established oncology sales force.',
      value: '50%', unit: 'Astellas US economics share', target: 'Maintain strong co-promotion', gap: 'Collaboration performing well',
      trend: 'up', trendValue: 'Strong co-promotion synergies', status: 'good',
      trendData: [
        { period: 'Q1 FY25', actual: 50, target: 50 },
        { period: 'Q2 FY25', actual: 50, target: 50 },
        { period: 'Q3 FY25', actual: 50, target: 50 },
        { period: 'Q4 FY25', actual: 50, target: 50 },
      ],
      subDrivers: [
        { name: 'Astellas US PADCEV Economics', contribution: 50, unit: '% profit share' },
        { name: 'Merck Keytruda Sales Force', contribution: 3800, unit: 'US oncology reps (estimated)' },
        { name: 'PADCEV+Keytruda Combination Rx', contribution: 92, unit: '% of PADCEV Rx written as combo' },
      ],
      variance: { actual: '50/50 split active', plan: '50/50 maintained', priorYear: '50/50 split' },
      aiInsight: 'The Merck-Astellas PADCEV collaboration is one of the most strategically important pharmaceutical co-promotions globally. Merck provides access to its ~3,800-strong US oncology sales force, established relationships from Keytruda prescribers, and co-promotion across the KEYNOTE clinical trial data ecosystem. Astellas receives 50% of US PADCEV contribution margin while benefiting from Merck\'s commercial scale. 92% of PADCEV prescriptions are written as the EV+pembro combination — cementing the partnership economics. The collaboration extends globally; outside the US, Astellas retains full economics.',
    },

    // ── Profitability children ────────────────────────────────────────────

    'smt-savings': {
      id: 'smt-savings', name: 'SMT Cost Transformation (Americas Share)',
      description: 'Astellas SMT (Simplify, Maximize, Transform) cost transformation program — Americas portion targeting SG&A and COGS efficiency.',
      value: '¥8B', unit: 'Americas FY26 target savings', target: '¥8B Americas FY26', gap: 'On track Q1',
      trend: 'up', trendValue: '¥2B savings realized Q1 FY26', status: 'good',
      trendData: [
        { period: 'Q1 FY26', actual: 2, target: 2 },
        { period: 'Q2 FY26', actual: 5, target: 4 },
        { period: 'Q3 FY26', actual: 7, target: 6 },
        { period: 'Q4 FY26', actual: 8, target: 8 },
      ],
      subDrivers: [
        { name: 'Americas SG&A Efficiency', contribution: 4.5, unit: '¥B FY26 target' },
        { name: 'Commercial Operations Optimization', contribution: 2.2, unit: '¥B FY26 target' },
        { name: 'IT Systems Consolidation', contribution: 1.3, unit: '¥B FY26 target' },
      ],
      variance: { actual: '¥2B Q1 FY26', plan: '¥8B FY26', priorYear: 'SMT program launched FY25' },
      aiInsight: 'Americas SMT savings on track at ¥2B in Q1 FY26, targeting ¥8B for the full year. Americas is the largest geographic contributor to the global ¥40B FY26 SMT target. SG&A efficiency initiatives focus on commercial field force optimization (right-sizing against the XTANDI/PADCEV/VEOZAH launch portfolios), medical affairs streamlining, and IT platform consolidation. SMT savings partially offset the IRA price reduction risk — ¥8B Americas savings represents approximately 0.8pp of the ¥9.6B/1pp IRA sensitivity, providing meaningful but partial mitigation.',
    },
  };

  return map[id] || null;
}

function buildBridgeItems(data: ConsolePageData): BridgeCommentary[] {
  const bridge = data.financials.revenueBridge;
  if (bridge?.length) {
    return bridge.map((b, i) => ({
      id: `bridge-${i}`,
      component: b.label,
      value: b.impact,
      percentImpact: `${((b.impact / (data.financials.latestQuarter.revenue * 1000)) * 100).toFixed(1)}%`,
      aiSuggestion: b.description,
      status: 'draft' as const, subItems: [],
    }));
  }
  return [
    { id: 'b1', component: 'XTANDI US Net Price & Volume Growth (+4%)', value: 26000, percentImpact: '+4.0%', aiSuggestion: 'XTANDI US net price realization of +4% and volume growth of +6% new patient starts contributed ¥26B to Americas revenue vs Q1 FY25. mCSPC indication volume is the primary growth driver; gross-to-net improvement reflects favorable mix toward direct-to-pharmacy and access program optimization.', userCommentary: 'On plan — XTANDI performing well ahead of IRA implementation.', author: 'Americas Finance', date: 'May 2026', status: 'signed-off' as const, subItems: [{ name: 'mCSPC Volume Growth', value: 16000, description: '+8% new mCSPC patient starts' }, { name: 'Gross-to-Net Improvement', value: 10000, description: '+180bps YoY net price realization' }] },
    { id: 'b2', component: 'PADCEV US Revenue Growth (+55% YoY)', value: 48000, percentImpact: '+7.4%', aiSuggestion: 'PADCEV US revenue growth contributed ¥48B to Americas vs Q1 FY25, driven by EV+pembro 1L adoption (+62% new patient starts) and >45% bladder cancer market share. 50/50 Merck collaboration captures full US economics at Astellas\'s 50% share.', status: 'approved' as const, subItems: [{ name: 'EV+pembro 1L Launches', value: 32000, description: '+62% new 1L patient starts' }, { name: 'PADCEV Market Share Gains', value: 16000, description: 'Deepening >45% bladder cancer penetration' }] },
    { id: 'b3', component: 'VEOZAH Women\'s Health Launch Revenue', value: 8000, percentImpact: '+1.2%', aiSuggestion: 'VEOZAH launch revenue contributing ¥8B incremental, with 14,500+ prescribers reached in 12 months. Early penetration in the VMS market — revenue is expected to ramp as prescriber-to-prescribing conversion improves and formulary access broadens.', status: 'submitted' as const, subItems: [] },
    { id: 'b4', component: 'IZERVAY Geographic Atrophy Launch', value: 5000, percentImpact: '+0.8%', aiSuggestion: 'IZERVAY (avacincaptad pegol) contributing ¥5B incremental from geographic atrophy retinal launch. 12% market penetration in treated GA patients. Competitive with Apellis Syfovre — differentiation on dosing regimen (monthly vs bimonthly) driving formulary selection.', status: 'submitted' as const, subItems: [] },
    { id: 'b5', component: 'IRA Pre-Implementation Net Price Risk (XTANDI)', value: 0, percentImpact: '0.0%', aiSuggestion: 'IRA MFP not yet effective in current period — price implementation is January 2026. Zero current period impact; forward risk quantified at ¥9.6B Core OP per 1pp net price reduction. Full-year FY26 guidance does NOT include IRA impact; will be adjusted upon CMS final MFP announcement.', status: 'draft' as const, subItems: [] },
    { id: 'b6', component: 'SMT Americas Cost Savings Benefit', value: 8000, percentImpact: '+0.5% margin', aiSuggestion: 'Americas SMT savings of ¥8B target for FY26; ¥2B realized in Q1 FY26. Commercial operations optimization and SG&A efficiency contributing the majority. SMT savings partially offset IRA price negotiation downside risk — ¥8B Americas savings = ~0.83pp of IRA price sensitivity.', status: 'draft' as const, subItems: [] },
  ];
}

// =============================================================================
// Main Component
// =============================================================================

export default function NorthAmericaClient({ data }: NorthAmericaClientProps) {
  const heroKPIs = useMemo(() => buildHeroKPIs(data), [data]);
  const insights = useMemo(() => buildPulseInsights(data), [data]);
  const driverMatrix = useMemo(() => buildDriverMatrix(data), [data]);
  const driverTree = useMemo(() => buildDriverTree(data), [data]);
  const bridgeItems = useMemo(() => buildBridgeItems(data), [data]);
  const getDriverDetail = useCallback((id: string) => buildDriverDetail(id, data), [data]);

  const narrativeBrief = useMemo(() => ({
    title: 'Americas Performance Summary',
    period: data.financials.latestQuarter.quarter,
    summary: `Americas delivered revenue of ¥${data.financials.latestQuarter.revenue}B in ${data.financials.latestQuarter.quarter}, up ${data.financials.latestQuarter.revenueYoY}% YoY. XTANDI US net price realization was +4% ahead of IRA Maximum Fair Price implementation (effective January 2026). PADCEV US revenue grew +55% YoY, significantly exceeding the >40% plan, as EV+pembrolizumab achieved standard-of-care status in first-line urothelial carcinoma.\n\nAmericas Core OP margin of ${data.financials.latestQuarter.operatingMargin}% improved 120bps YoY from XTANDI operating leverage and PADCEV high-margin revenue contribution. VEOZAH (fezolinetant) women's health launch reached 14,500+ prescribers in 12 months; IZERVAY geographic atrophy launch contributing incremental revenue.\n\nThe IRA XTANDI price negotiation is the dominant forward-looking risk: CMS has selected XTANDI for the FY2026 negotiation cohort, with each 1pp net price reduction equaling ¥9.6B annual Core OP impact effective January 2026. Management is engaging CMS in the negotiation process; final Maximum Fair Price will be published by September 1, 2025.`,
    keyTakeaways: data.narrative?.keyAchievements || [
      'XTANDI US +4% net price realization — positive pre-IRA; IRA MFP effective January 2026 (¥9.6B/1pp risk)',
      'PADCEV US +55% YoY (>40% target) — EV+pembro 1L standard-of-care; >45% bladder cancer market share',
      'Americas Core OP margin +120bps YoY — XTANDI leverage + PADCEV mix; VEOZAH launch drag minor',
      'VEOZAH 14,500+ prescribers (12 months); IZERVAY GA contributing incremental revenue',
      'SMT Americas savings ¥8B FY26 target — partially mitigating IRA price negotiation downside',
    ],
    overallStatus: 'warning' as const,
  }), [data]);

  const quarterLabels = data.financials.quarters.map((q) => q.quarter);
  const plData = useMemo(() => [
    { label: 'Americas Revenues', isCategory: true,
      quarters: data.financials.quarters.map((q) => ({ actual: `¥${q.revenue}B`, variance: `${q.revenueYoY >= 0 ? '+' : ''}${q.revenueYoY}%`, varianceColor: (q.revenueYoY >= 0 ? 'green' : 'red') as 'green' | 'red' | 'neutral' })),
      children: [
        { label: 'XTANDI US Revenue', quarters: data.financials.quarters.map((q) => ({ actual: `¥${(q.revenue * 0.58).toFixed(1)}B`, variance: '+4% net price', varianceColor: 'green' as const })) },
        { label: 'PADCEV US Revenue', quarters: data.financials.quarters.map((q) => ({ actual: `¥${(q.revenue * 0.15).toFixed(1)}B`, variance: '+55% YoY', varianceColor: 'green' as const })) },
        { label: 'VEOZAH + IZERVAY Launch Revenue', quarters: data.financials.quarters.map((q) => ({ actual: `¥${(q.revenue * 0.04).toFixed(1)}B`, variance: 'Ramp tracking', varianceColor: 'green' as const })) },
      ],
    },
    { label: 'Cost of Sales + SG&A + R&D (Americas)', isCategory: true,
      quarters: data.financials.quarters.map((q) => ({
        actual: `¥${(q.revenue * (1 - q.operatingMargin / 100)).toFixed(1)}B`,
        variance: '+3.2% YoY',
        varianceColor: 'red' as const,
      })),
      children: [
        { label: 'COGS (Drug Manufacturing + Royalties)', quarters: data.financials.quarters.map(() => ({ actual: 'Embedded in OpEx', variance: '+5.5%', varianceColor: 'red' as const })) },
        { label: 'Americas SG&A (net of SMT savings)', quarters: data.financials.quarters.map(() => ({ actual: 'Embedded in OpEx', variance: '-2.1% from SMT', varianceColor: 'green' as const })) },
      ],
    },
    { label: 'Americas Core Operating Income', isTotal: true,
      quarters: data.financials.quarters.map((q) => ({ actual: `${q.operatingMargin}%`, variance: '+120bps YoY', varianceColor: 'green' as 'green' | 'red' | 'neutral' })),
    },
  ], [data]);

  const driverDataForTable = useMemo(() => [
    { category: 'XTANDI US Performance', rows: [
      { driver: 'XTANDI US Net Price Realization', actual: '+4%', plan: 'Positive pre-IRA', variance: 'On plan', varianceColor: 'green' as const, trend: 'up' as const },
      { driver: 'mCSPC New Patient Volume Growth', actual: '+8%', plan: '≥+5%', variance: '+3pp', varianceColor: 'green' as const, trend: 'up' as const },
      { driver: 'IRA MFP Risk (¥B/1pp)', actual: '¥9.6B/1pp', plan: 'Minimize reduction', variance: 'Negotiation active', varianceColor: 'red' as const, trend: 'down' as const },
    ]},
    { category: 'PADCEV US Growth', rows: [
      { driver: 'PADCEV US Revenue Growth', actual: '+55%', plan: '>40%', variance: '+15pp', varianceColor: 'green' as const, trend: 'up' as const },
      { driver: 'EV+pembro 1L New Patient Starts', actual: '+62%', plan: '+40%', variance: '+22pp', varianceColor: 'green' as const, trend: 'up' as const },
      { driver: 'Bladder Cancer Market Share', actual: '>45%', plan: '>40%', variance: '+5pp', varianceColor: 'green' as const, trend: 'up' as const },
    ]},
    { category: 'New Product Launches & Margin', rows: [
      { driver: 'VEOZAH Unique Prescribers', actual: '14,500+', plan: '25,000 by YE26', variance: '-10,500', varianceColor: 'red' as const, trend: 'up' as const },
      { driver: 'Americas Core OP Margin', actual: `${data.financials.latestQuarter.operatingMargin}%`, plan: '≥28%', variance: `${(data.financials.latestQuarter.operatingMargin - 28).toFixed(1)}pp`, varianceColor: data.financials.latestQuarter.operatingMargin >= 28 ? 'green' as const : 'red' as const, trend: 'up' as const },
      { driver: 'Americas Revenue YoY', actual: `+${data.financials.latestQuarter.revenueYoY}%`, plan: '+4%', variance: `${(data.financials.latestQuarter.revenueYoY - 4).toFixed(1)}pp`, varianceColor: data.financials.latestQuarter.revenueYoY >= 4 ? 'green' as const : 'red' as const, trend: 'up' as const },
    ]},
  ], [data]);

  const attentionItems = useMemo(() => [
    { id: 'a1', severity: 'warning' as const, title: 'IRA XTANDI MFP: ¥9.6B Core OP per 1pp net price reduction eff. Jan 2026', detail: 'CMS XTANDI price negotiation in progress. Final MFP published September 2025 for January 2026 implementation. Analyst consensus 20-35% net price reduction range = ¥192-336B annual Core OP headwind. Largest single Astellas earnings risk.', actionTab: 'drivers' },
    { id: 'a2', severity: 'positive' as const, title: 'PADCEV +55% US — EV+pembro 1L standard-of-care established', detail: 'EV+pembro 1L adoption accelerating beyond plan. >45% bladder cancer market share with >90% scripts as combo. PADCEV on track to exceed ¥300B US revenue by FY27.', actionTab: 'drivers' },
    { id: 'a3', severity: 'info' as const, title: 'VEOZAH 14,500+ prescribers — prescriber-to-prescribing conversion the key lever', detail: 'Women\'s health VMS launch building prescriber base. Conversion rate from reached prescribers to active prescribers needs acceleration to hit 25,000+ prescriber YE2026 target.', actionTab: 'bridge' },
  ], []);

  return (
    <ConsoleShell config={northAmericaConfig}>
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
                title="Americas Revenue & Core OP Bridge"
                periodLabel={`${data.financials.latestQuarter.quarter} vs Prior Year`}
                totalVariance="95000"
                totalVariancePercent="+8.7%"
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
