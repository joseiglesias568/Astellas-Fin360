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
import type { DigitalLoyaltyPageData } from './types';
import { digitalLoyaltyConfig } from './config';

interface DigitalLoyaltyClientProps {
  data: DigitalLoyaltyPageData;
}

// =============================================================================
// Data Mappers — Astellas Pharma: Digital Patient Programs
// SOURCE: Astellas FY2025 Annual Results, Patient Engagement Strategy
// MyAstellas.com portal; patient support programs (PSP); HCP digital engagement;
// eConsent/remote trial enablement; digital Rx services
// PSP enrollment target: 85K FY26; HCP digital engagement target: 65K unique HCPs
// =============================================================================

function buildHeroKPIs(data: DigitalLoyaltyPageData): HeroKPI[] {
  const { kpis } = data;
  const allKPIs = [...kpis.primaryKPIs, ...kpis.operationalKPIs, ...kpis.digitalKPIs, ...kpis.financialKPIs];
  const platformKPI = allKPIs.find((k) => k.label.toLowerCase().includes('platform') || k.label.toLowerCase().includes('proptech'));

  return [
    {
      id: 'platform-users', label: 'Patient Portal Active Enrollees',
      value: platformKPI ? String(platformKPI.value) : '62.4K',
      unit: platformKPI?.unit || 'active PSP enrollees',
      change: platformKPI?.trendValue || '+18% YoY',
      changeDirection: 'up',
      sparkline: [44, 48, 52, 56, 59, 61, 62.4],
      target: '85K',
      gap: '-22.6K',
      status: 'good',
      subDrivers: [
        { name: 'XTANDI PSP Enrollment', impact: '28.4K (+12%)', direction: 'positive' as const },
        { name: 'PADCEV PSP Enrollment', impact: '18.6K (+62%)', direction: 'positive' as const },
        { name: 'VEOZAH/IZERVAY PSP Enrollment', impact: '15.4K (launch)', direction: 'positive' as const },
      ],
      aiInsight: 'MyAstellas.com Patient Support Program (PSP) portal reached 62.4K active enrollees (+18% YoY), tracking toward the 85K FY26 target. PADCEV PSP grew 62% YoY alongside the strong commercial uptake of EV+pembro. VEOZAH and IZERVAY PSP enrollment is ramping as new commercial launches build prescriber adoption. PSP enrollment is a leading indicator of patient adherence and therapy persistence — higher enrollment reduces treatment discontinuation risk.',
      driversTabId: 'platform-growth',
    },
    {
      id: 'proptech-adoption', label: 'HCP Digital Engagement',
      value: '48.2K',
      unit: 'unique HCPs digitally engaged',
      change: '+14% YoY',
      changeDirection: 'up',
      sparkline: [32, 35, 38, 41, 44, 46, 48.2],
      target: '65K',
      gap: '-16.8K',
      status: 'good',
      subDrivers: [
        { name: 'Medical Portal (eP2P) Engagement', impact: '38.5K HCPs', direction: 'positive' as const },
        { name: 'HCP Video/Webinar Attendance', impact: '24.8K unique HCPs', direction: 'positive' as const },
        { name: 'Digital Rx Sampling Requests', impact: '8.2K requests', direction: 'positive' as const },
      ],
      aiInsight: 'HCP digital engagement reached 48.2K unique healthcare professionals (+14% YoY) — oncologists, urologists, OB/GYNs, and retina specialists. Medical portal (eP2P) engagement at 38.5K HCPs is the primary digital channel. HCP video education and virtual medical symposia reaching 24.8K unique attendees. Digital engagement quality: HCPs with >3 digital interactions have 2.4x higher new patient start rates vs non-engaged HCPs.',
      driversTabId: 'proptech-penetration',
    },
    {
      id: 'platform-revenue', label: 'Digital Channel Revenue Contribution',
      value: '22%',
      change: '+5pp YoY',
      changeDirection: 'up',
      sparkline: [13, 15, 17, 18.5, 20, 21, 22],
      target: '28%',
      gap: '-6pp',
      status: 'good',
      subDrivers: [
        { name: 'PSP-Enrolled Patient Persistence Premium', impact: '+18% vs non-enrolled', direction: 'positive' as const },
        { name: 'Digital HCP New Rx Rate', impact: '2.4x vs non-digital HCPs', direction: 'positive' as const },
        { name: 'eConsent Remote Trial Efficiency', impact: '15% faster enrollment', direction: 'positive' as const },
      ],
      aiInsight: 'Digital programs now drive 22% of revenue attributable to digital-enabled patient and HCP interactions (+5pp YoY). PSP-enrolled patients have 18% higher therapy persistence (fewer discontinuations), directly protecting XTANDI, PADCEV, and VEOZAH revenue. HCP digital engagement drives 2.4x higher new patient start rates vs non-digitally engaged HCPs.',
      driversTabId: 'digital-revenue',
    },
    {
      id: 'client-onboardings', label: 'New PSP Enrollments',
      value: '3.2K',
      unit: '/month',
      change: '+28% YoY',
      changeDirection: 'up',
      sparkline: [1.9, 2.1, 2.4, 2.6, 2.9, 3.1, 3.2],
      target: '4.5K/mo',
      gap: '-1.3K',
      status: 'warning',
      subDrivers: [
        { name: 'PADCEV PSP New Enrollments', impact: '1,240/mo (+65%)', direction: 'positive' as const },
        { name: 'XTANDI PSP New Enrollments', impact: '980/mo (+8%)', direction: 'positive' as const },
        { name: 'VEOZAH + IZERVAY New Enrollments', impact: '980/mo (launch)', direction: 'positive' as const },
      ],
      aiInsight: 'New PSP enrollments at 3.2K/month (+28% YoY) with PADCEV driving the fastest growth. 4.5K/month target requires closing a 1.3K/month gap — addressable through expanded HUB services reach and proactive outreach from PADCEV field teams. PSP enrollment-to-activation (patient completing first PSP interaction) at 72%, improved from 65% PY with streamlined digital onboarding.',
      driversTabId: 'client-engagement',
    },
  ];
}

function buildPulseInsights(_data: DigitalLoyaltyPageData): PulseInsight[] {
  return [
    { id: '1', severity: 'positive', headline: 'PADCEV PSP enrollment growing +62% YoY alongside 55% US revenue growth — patient support reinforcing therapy persistence', detail: 'PADCEV PSP enrollment of 18.6K (+62% YoY) is scaling in line with commercial uptake of EV+pembro. PSP-enrolled PADCEV patients have 22% lower discontinuation rates vs non-enrolled patients. Digital onboarding via MyAstellas.com reducing PSP activation time from 14 days to 6 days.', action: 'View PADCEV PSP Metrics', actionTab: 'drivers' },
    { id: '2', severity: 'positive', headline: 'HCP digital engagement driving 2.4x higher new patient start rates — eP2P portal at 38.5K unique HCPs', detail: 'Digital engagement quality improving: HCPs with 3+ digital interactions initiate 2.4x more new patient starts vs non-engaged HCPs. Medical portal (eP2P) at 38.5K unique HCPs engaged. Virtual medical education (oncology webinars) reaching 24.8K HCPs — 68% of XTANDI/PADCEV target prescribers.', action: 'Explore HCP Digital Engagement', actionTab: 'drivers' },
    { id: '3', severity: 'info', headline: 'VEOZAH + IZERVAY PSP launch enrollment on track — digital-first onboarding model for new products', detail: 'VEOZAH (fezolinetant, VMS) and IZERVAY (avacincaptad pegol, GA) combined PSP enrollment at 15.4K in first 9 months of commercial launch. Digital-first PSP model (no paper forms, MyAstellas.com enrollment) achieving 72% activation rate. OB/GYN digital engagement for VEOZAH and retina specialist digital engagement for IZERVAY are the near-term growth levers.', action: 'View Launch Digital Metrics', actionTab: 'drivers' },
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

function buildDriverMatrix(data: DigitalLoyaltyPageData): DriverMatrixRow[] {
  const digitalConsole = data.digitalConsole;
  if (digitalConsole?.keyDrivers?.length) {
    return digitalConsole.keyDrivers.slice(0, 6).map((kd, idx) => {
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
    { id: 'platform-growth', name: 'Patient Support Program Enrollment', score: 82, trend: '+18% YoY', trendDirection: 'up', gap: '-22.6K to 85K target', status: 'good', subDrivers: ['XTANDI PSP', 'PADCEV PSP', 'VEOZAH/IZERVAY PSP'] },
    { id: 'proptech-penetration', name: 'HCP Digital Engagement', score: 76, trend: '+14% YoY', trendDirection: 'up', gap: '-16.8K to 65K target', status: 'good', subDrivers: ['eP2P Portal', 'Virtual Medical Education', 'Digital Rx Sampling'] },
    { id: 'client-engagement', name: 'New PSP Monthly Enrollment Rate', score: 72, trend: '+28% YoY', trendDirection: 'up', gap: '-1.3K/mo to target', status: 'warning', subDrivers: ['PADCEV New Enrollments', 'Enrollment-to-Activation', 'HUB Services'] },
    { id: 'digital-revenue', name: 'Digital Channel Revenue Contribution', score: 85, trend: '+5pp', trendDirection: 'up', gap: '-6pp to 28% target', status: 'good', subDrivers: ['PSP Persistence Premium', 'HCP Rx Rate', 'eConsent Efficiency'] },
    { id: 'ai-analytics', name: 'Patient Digital Adherence Monitoring', score: 78, trend: '+28%', trendDirection: 'up', gap: '+3pp vs target', status: 'good', subDrivers: ['PSP Adherence Alerts', 'Therapy Persistence %', 'Patient Satisfaction NPS'] },
    { id: 'client-tier-mix', name: 'PSP Product Portfolio Mix', score: 68, trend: '29% PADCEV', trendDirection: 'up', gap: '-2pp vs balance target', status: 'warning', subDrivers: ['PADCEV Mix %', 'XTANDI Mix %', 'VEOZAH/IZERVAY Mix'] },
  ];
}

function buildDriverTree(data: DigitalLoyaltyPageData): DriverNode[] {
  const allKPIs = [...data.kpis.primaryKPIs, ...data.kpis.operationalKPIs, ...data.kpis.digitalKPIs, ...data.kpis.financialKPIs];
  const platformKPI = allKPIs.find((k) => k.label.toLowerCase().includes('platform') || k.label.toLowerCase().includes('proptech'));
  const platformValue = platformKPI ? String(platformKPI.value) : '62.4';

  return [
    { id: 'platform-growth', name: 'Patient Support Program Enrollment', value: `${platformValue}K`, status: 'good',
      children: [
        { id: 'active-clients', name: 'Active PSP Enrollees', value: `${platformValue}K active`, status: 'good',
          children: [
            { id: 'new-onboardings', name: 'New PSP Enrollments', value: '3.2K/month (+28%)', status: 'good' },
            { id: 'active-rate', name: 'PSP Activation Rate', value: '72%', status: 'good' },
            { id: 'churn-rate', name: 'PSP Dropout Rate', value: '6.2%', status: 'good' },
          ],
        },
        { id: 'enterprise-tier', name: 'PADCEV PSP Enrollment', value: '18.6K (+62%)', status: 'good',
          children: [
            { id: 'upgrade-rate', name: 'PADCEV New Enrollments/Month', impact: '1,240/mo', value: '+65% YoY', status: 'good' },
            { id: 'enterprise-retention', name: 'PADCEV PSP Persistence', value: '22% lower dropout vs non-PSP', status: 'good' },
          ],
        },
      ],
    },
    { id: 'proptech-penetration', name: 'HCP Digital Engagement', value: '48.2K unique HCPs', status: 'good',
      children: [
        { id: 'portal-adoption', name: 'eP2P Medical Portal Engagement', value: '38.5K HCPs', status: 'good' },
        { id: 'digital-twin', name: 'Virtual Medical Education (Webinars)', value: '24.8K unique HCPs', status: 'good' },
        { id: 'smart-building', name: 'Digital Rx Sampling Requests', value: '8.2K requests', status: 'good' },
      ],
    },
    { id: 'digital-revenue', name: 'Digital Channel Revenue Contribution', value: '22%', unit: 'of total', status: 'good',
      children: [
        { id: 'fee-premium', name: 'PSP Persistence Revenue Premium', value: '+18% vs non-enrolled', status: 'good' },
        { id: 'client-frequency', name: 'HCP Digital Engagement Rx Rate', value: '2.4x vs non-digital HCPs', status: 'good' },
        { id: 'cross-sell', name: 'eConsent Remote Trial Efficiency', value: '15% faster patient enrollment', status: 'good' },
      ],
    },
    { id: 'personalization', name: 'AI Patient Adherence Monitoring', value: '+22%', unit: 'persistence lift', status: 'good',
      children: [
        { id: 'recommendation-accuracy', name: 'PSP Adherence Alert Accuracy', value: '74%', status: 'good' },
        { id: 'alert-ctr', name: 'Patient Re-engagement Rate (after alert)', value: '38%', status: 'good' },
        { id: 'insight-adoption', name: 'Nurse Educator Case Resolution Rate', value: '68%', status: 'good' },
      ],
    },
    { id: 'portal-engagement', name: 'MyAstellas.com Portal Engagement', value: '72%', unit: 'activation rate', status: 'good',
      children: [
        { id: 'dau-mau', name: 'DAU/MAU Ratio (PSP Portal)', value: '28%', status: 'warning' },
        { id: 'session-duration', name: 'Avg Portal Session Duration', value: '6.8 min', status: 'good' },
        { id: 'day30-retention', name: 'Day 30 PSP Portal Retention', value: '71%', status: 'good' },
      ],
    },
  ];
}

function buildDriverDetail(id: string, _data: DigitalLoyaltyPageData): DriverDetailData | null {
  const map: Record<string, DriverDetailData> = {
    'platform-growth': {
      id: 'platform-growth', name: 'Patient Support Program Enrollment', description: 'MyAstellas.com patient support program (PSP) enrollment across XTANDI, PADCEV, VEOZAH, and IZERVAY.',
      value: '62.4K', unit: 'active PSP enrollees', target: '85K', gap: '-22.6K',
      trend: 'up', trendValue: '+18% YoY', status: 'good',
      trendData: [{ period: 'Q1 FY25', actual: 52, target: 62 }, { period: 'Q2 FY25', actual: 56, target: 68 }, { period: 'Q3 FY25', actual: 59, target: 74 }, { period: 'Q4 FY25', actual: 62.4, target: 85 }],
      subDrivers: [
        { name: 'New PSP Enrollments/Month', contribution: 3200, unit: '/month (+28% YoY)' },
        { name: 'PSP Activation Rate', contribution: 72, unit: '%' },
        { name: 'PSP Portfolio Mix — PADCEV', contribution: 29, unit: '% of total PSP' },
        { name: 'PSP Dropout Rate', contribution: -6.2, unit: '%' },
      ],
      variance: { actual: '62.4K', plan: '85K', priorYear: '52.9K' },
      aiInsight: 'PSP enrollment grew 18% YoY to 62.4K active enrollees. PADCEV PSP (+62% YoY) is the fastest growing product — driven by EV+pembro commercial success and the complex ADC therapy requiring robust patient support. XTANDI PSP growth (+12%) reflects a mature product with steady new patient starts. VEOZAH and IZERVAY combined PSP at 15.4K in their commercial launch year demonstrates effective digital-first onboarding. PSP enrollment gap to 85K target is addressable through expanded HUB services reach and oncology nurse educator programs. Enrolled patients have 18-22% lower discontinuation rates across products.',
      crossRefs: [{ label: 'Americas Performance', consoleId: 'north-america-performance' }],
    },
    'proptech-penetration': {
      id: 'proptech-penetration', name: 'HCP Digital Engagement', description: 'Healthcare professional digital engagement across eP2P medical portal, virtual medical education, and digital Rx services.',
      value: '48.2K', target: '65K unique HCPs', gap: '-16.8K',
      trend: 'up', trendValue: '+14% YoY', status: 'good',
      trendData: [{ period: 'Q1 FY25', actual: 40, target: 50 }, { period: 'Q2 FY25', actual: 43, target: 55 }, { period: 'Q3 FY25', actual: 46, target: 60 }, { period: 'Q4 FY25', actual: 48.2, target: 65 }],
      subDrivers: [
        { name: 'eP2P Medical Portal Unique HCPs', contribution: 38500, unit: 'HCPs' },
        { name: 'Virtual Medical Education Attendance', contribution: 24800, unit: 'unique HCP attendees' },
        { name: 'Digital Rx Sampling Requests', contribution: 8200, unit: 'requests (oncology leads)' },
        { name: 'High-Engagement HCPs (3+ interactions)', contribution: 18400, unit: 'HCPs — 2.4x higher Rx rate' },
      ],
      variance: { actual: '48.2K', plan: '65K', priorYear: '42.3K' },
      aiInsight: 'HCP digital engagement at 48.2K unique HCPs (+14% YoY). eP2P medical portal is the highest-volume channel — 38.5K HCPs accessing XTANDI/PADCEV/VEOZAH/IZERVAY medical information, clinical data, and prescribing tools. The key quality metric: 18.4K HCPs with 3+ digital interactions generate 2.4x higher new patient starts vs minimally engaged HCPs. Virtual medical education (oncology webinars, retina symposia) reaching 24.8K HCPs — high-impact channel for PADCEV EV+pembro 1L data dissemination and IZERVAY geographic atrophy clinical education.',
    },
    'portal-engagement': {
      id: 'portal-engagement', name: 'MyAstellas.com Portal Engagement', description: 'MyAstellas.com patient and HCP portal engagement — session quality, retention, and digital activation metrics.',
      value: '72%', unit: 'activation rate', target: '80%', gap: '-8pp',
      trend: 'up', trendValue: '+8pp YoY', status: 'good',
      trendData: [{ period: 'Q1 FY25', actual: 64, target: 72 }, { period: 'Q2 FY25', actual: 67, target: 75 }, { period: 'Q3 FY25', actual: 70, target: 78 }, { period: 'Q4 FY25', actual: 72, target: 80 }],
      subDrivers: [
        { name: 'Oncology Patient Portal (XTANDI/PADCEV)', contribution: 88, unit: '% activation' },
        { name: 'Specialty Portal (VEOZAH/IZERVAY)', contribution: 65, unit: '% activation (launch)' },
        { name: 'Day 30 PSP Portal Retention', contribution: 71, unit: '%' },
        { name: 'DAU/MAU Ratio', contribution: 28, unit: '% (target 35%)' },
      ],
      variance: { actual: '72%', plan: '80%', priorYear: '64%' },
      aiInsight: 'Portal activation rate growing 8pp YoY to 72%. Oncology products (XTANDI/PADCEV) lead at 88% activation — cancer patients have high engagement with digital support tools. Specialty products (VEOZAH/IZERVAY) at 65% activation in their commercial launch year — expected to improve to >75% by FY26 Q2. Day-30 PSP portal retention at 71% reflects strong initial engagement. DAU/MAU at 28% vs 35% target represents an opportunity for deeper daily engagement, addressable through push notification optimization and personalized therapy milestone reminders.',
    },
    'digital-revenue': {
      id: 'digital-revenue', name: 'Digital Channel Revenue Contribution', description: 'Revenue contribution attributable to digital patient programs — PSP persistence premium, HCP digital engagement Rx lift, and eConsent clinical trial efficiency.',
      value: '22%', unit: 'of revenue digitally attributable', target: '28%', gap: '-6pp',
      trend: 'up', trendValue: '+5pp YoY', status: 'good',
      trendData: [{ period: 'Q1 FY25', actual: 16, target: 22 }, { period: 'Q2 FY25', actual: 18, target: 24 }, { period: 'Q3 FY25', actual: 20, target: 26 }, { period: 'Q4 FY25', actual: 22, target: 28 }],
      subDrivers: [
        { name: 'PSP Persistence Revenue Premium', contribution: 18, unit: '% higher revenue vs non-enrolled' },
        { name: 'HCP Digital Rx Rate Multiplier', contribution: 2.4, unit: 'x higher new starts' },
        { name: 'eConsent Remote Trial Efficiency', contribution: 15, unit: '% faster patient enrollment' },
        { name: 'Patient Adherence Monitoring (PSP)', contribution: 22, unit: '% lower discontinuation rate' },
      ],
      variance: { actual: '22%', plan: '28%', priorYear: '17%' },
      aiInsight: 'Digital programs drive 22% of revenue through measurable attribution (+5pp YoY). PSP-enrolled patients generate 18% more revenue per patient due to higher therapy persistence. HCP digital engagement drives 2.4x higher new Rx starts — the highest single digital ROI driver. eConsent remote trial enablement reduces clinical trial patient enrollment time by 15%, reducing R&D investment cycle time. AI-powered adherence monitoring contributes 22% lower discontinuation rates — directly protecting XTANDI and PADCEV recurring revenue.',
    },
    'personalization': {
      id: 'personalization', name: 'AI Patient Adherence Monitoring', description: 'AI-driven patient adherence monitoring and nurse educator interventions — reducing therapy discontinuation across XTANDI, PADCEV, VEOZAH, and IZERVAY.',
      value: '+22%', unit: 'persistence lift vs non-monitored', target: '+25%', gap: '-3pp',
      trend: 'up', trendValue: '+22% persistence lift', status: 'good',
      trendData: [{ period: 'Q1 FY25', actual: 15, target: 20 }, { period: 'Q2 FY25', actual: 18, target: 22 }, { period: 'Q3 FY25', actual: 20, target: 24 }, { period: 'Q4 FY25', actual: 22, target: 25 }],
      subDrivers: [
        { name: 'Nurse Educator Case Resolution Rate', contribution: 68, unit: '%' },
        { name: 'Patient Re-engagement Rate (after alert)', contribution: 38, unit: '%' },
        { name: 'PSP Adherence Alert Accuracy', contribution: 74, unit: '%' },
      ],
      variance: { actual: '+22% persistence lift', plan: '+25%', priorYear: '+14%' },
      aiInsight: 'AI adherence monitoring delivering +22% therapy persistence lift, up from +14% prior year. Nurse educator case resolution at 68% — when a patient triggers an adherence alert, 68% are successfully re-engaged. Patient re-engagement rate after digital alert at 38%, improving from 28% PY via optimized notification timing and personalization. Alert accuracy at 74% reducing false positive fatigue. The +22% persistence lift translates directly to revenue protection — for XTANDI at ¥960B global revenue, each 1pp improvement in persistence = ~¥2.1B revenue protection.',
    },
    'client-tier-mix': {
      id: 'client-tier-mix', name: 'PSP Product Portfolio Mix', description: 'Patient support program enrollment mix by product — XTANDI, PADCEV, VEOZAH, and IZERVAY.',
      value: '29%', unit: 'PADCEV share of PSP', target: '28%', gap: '+1pp (PADCEV growing)',
      trend: 'up', trendValue: '+8pp PADCEV share YoY', status: 'warning',
      trendData: [{ period: 'Q1 FY25', actual: 18, target: 25 }, { period: 'Q2 FY25', actual: 22, target: 26 }, { period: 'Q3 FY25', actual: 26, target: 27 }, { period: 'Q4 FY25', actual: 29, target: 28 }],
      subDrivers: [
        { name: 'XTANDI PSP Mix %', contribution: 45, unit: '% of total PSP (28.4K)' },
        { name: 'PADCEV PSP Mix %', contribution: 29, unit: '% of total PSP (18.6K)' },
        { name: 'VEOZAH + IZERVAY PSP Mix %', contribution: 26, unit: '% of total PSP (15.4K — launch products)' },
      ],
      variance: { actual: '45% XTANDI, 29% PADCEV, 26% VEOZAH/IZERVAY', plan: '50/28/22 target mix', priorYear: '58% XTANDI, 21% PADCEV, 21% VEOZAH/IZERVAY' },
      aiInsight: 'PSP portfolio mix is shifting toward PADCEV (29% of total PSP, up from 21% PY) as EV+pembro commercial growth accelerates. XTANDI remains the largest PSP product at 45% (28.4K enrollees) — declining share reflects XTANDI maturity vs PADCEV/VEOZAH/IZERVAY growth. VEOZAH and IZERVAY combined 26% share of PSP in commercial launch year demonstrates successful digital onboarding. Portfolio diversification of PSP enrollment mirrors commercial revenue diversification strategy.',
    },
  };

  return map[id] || null;
}

function buildBridgeItems(_data: DigitalLoyaltyPageData): BridgeCommentary[] {
  return [
    { id: 'b1', component: 'PSP Enrollment Therapy Persistence Premium', value: 4200, percentImpact: '+0.5% of Core OP', aiSuggestion: 'PSP-enrolled patients generate ¥4.2B incremental revenue through 18-22% higher therapy persistence (fewer discontinuations). PADCEV PSP: ¥1.8B; XTANDI PSP: ¥1.6B; VEOZAH/IZERVAY: ¥0.8B.', status: 'approved' as const, subItems: [{ name: 'PADCEV PSP Persistence Revenue', value: 1800, description: '22% lower discontinuation vs non-enrolled' }, { name: 'XTANDI PSP Persistence Revenue', value: 1600, description: '18% lower discontinuation vs non-enrolled' }] },
    { id: 'b2', component: 'HCP Digital Engagement New Rx Lift', value: 3800, percentImpact: '+0.4% of Core OP', aiSuggestion: 'HCPs with 3+ digital interactions generate 2.4x higher new patient starts vs non-digitally engaged HCPs — contributing ¥3.8B incremental revenue from the 18.4K high-engagement HCPs.', status: 'submitted' as const, subItems: [] },
    { id: 'b3', component: 'MyAstellas.com Portal Patient Activation', value: 1200, percentImpact: '+0.1% of Core OP', aiSuggestion: 'Portal activation at 72% generating ¥1.2B incremental benefit through improved patient support, co-pay assistance utilization, and therapy information access reducing abandonment at pharmacy.', status: 'draft' as const, subItems: [] },
    { id: 'b4', component: 'eConsent Remote Trial Efficiency', value: 850, percentImpact: '+0.1% R&D efficiency', aiSuggestion: 'eConsent and remote trial enablement reducing clinical trial enrollment time by 15% — contributing ¥850M R&D investment efficiency benefit (equivalent to faster time-to-revenue for pipeline assets).', status: 'draft' as const, subItems: [] },
    { id: 'b5', component: 'AI Adherence Monitoring Patient Re-engagement', value: 680, percentImpact: '+0.08% of Core OP', aiSuggestion: 'AI-driven adherence monitoring re-engaging 38% of at-risk patients after alerts — contributing ¥680M revenue protection. Alert accuracy at 74% reducing false positive fatigue.', status: 'draft' as const, subItems: [] },
    { id: 'b6', component: 'Digital Programs Investment Costs', value: -420, percentImpact: '-0.05% of Core OP', aiSuggestion: 'Digital patient program platform investment (MyAstellas.com upgrades, AI adherence monitoring, eP2P portal) costs ¥420M — generating ¥10.7B gross benefit, a 25x+ ROI on digital investment.', status: 'draft' as const, subItems: [] },
  ];
}

// =============================================================================
// Main Component
// =============================================================================

export default function DigitalLoyaltyClient({ data }: DigitalLoyaltyClientProps) {
  const heroKPIs = useMemo(() => buildHeroKPIs(data), [data]);
  const insights = useMemo(() => buildPulseInsights(data), [data]);
  const driverMatrix = useMemo(() => buildDriverMatrix(data), [data]);
  const driverTree = useMemo(() => buildDriverTree(data), [data]);
  const bridgeItems = useMemo(() => buildBridgeItems(data), [data]);
  const getDriverDetail = useCallback((id: string) => buildDriverDetail(id, data), [data]);

  const narrativeBrief = useMemo(() => ({
    title: 'Digital Patient Programs Performance Summary',
    period: data.financials.latestQuarter.quarter,
    summary: `Astellas Digital Patient Programs reached 62.4K active Patient Support Program (PSP) enrollees in ${data.financials.latestQuarter.quarter} (+18% YoY), tracking toward the 85K FY26 target. MyAstellas.com portal activation rate at 72%, with XTANDI and PADCEV patients leading at 88% activation.\n\nDigital programs now drive 22% of revenue attributable to patient and HCP digital engagement (+5pp YoY). PSP-enrolled patients generate 18-22% higher therapy persistence — directly protecting ¥4.2B of revenue that would otherwise be lost to early discontinuation.\n\nHCP digital engagement at 48.2K unique healthcare professionals (+14% YoY), with 18.4K high-engagement HCPs (3+ digital interactions) generating 2.4x higher new patient start rates. PADCEV PSP enrollment grew 62% YoY, scaling alongside 55% US revenue growth.`,
    keyTakeaways: [
      'PSP enrollment 62.4K (+18% YoY) — PADCEV +62%, XTANDI +12%, VEOZAH/IZERVAY launch',
      'MyAstellas.com portal activation 72% (+8pp YoY) — oncology products 88%, specialty 65%',
      'Digital revenue contribution 22% (+5pp) — PSP persistence premium ¥4.2B revenue protection',
      'HCP digital engagement 48.2K (+14% YoY) — high-engagement HCPs 2.4x new Rx rate',
      'AI adherence monitoring: +22% persistence lift; 38% patient re-engagement rate after alert',
    ],
    overallStatus: 'good' as const,
  }), [data]);

  const quarterLabels = data.financials.quarters.map((q) => q.quarter);
  const plData = useMemo(() => [
    { label: 'Digital Revenue Contribution', isCategory: true,
      quarters: data.financials.quarters.map((q, i) => ({ actual: `¥${(q.revenue * [0.145, 0.158, 0.17, 0.18][i]!).toFixed(1)}B`, variance: `+${[2, 3, 3.5, 4][i]}pp`, varianceColor: 'green' as 'green' | 'red' | 'neutral' })),
      children: [
        { label: 'PSP Persistence Revenue Premium', quarters: data.financials.quarters.map((q) => ({ actual: `¥${(q.revenue * 0.016).toFixed(1)}B`, variance: '+3pp YoY', varianceColor: 'green' as const })) },
        { label: 'HCP Digital Rx Lift', quarters: data.financials.quarters.map((q) => ({ actual: `¥${(q.revenue * 0.010).toFixed(1)}B`, variance: '+2pp YoY', varianceColor: 'green' as const })) },
        { label: 'AI Adherence Monitoring Lift', quarters: data.financials.quarters.map(() => ({ actual: '+22% persistence', variance: '+8pp YoY', varianceColor: 'green' as const })) },
      ],
    },
    { label: 'PSP Patient Metrics', isCategory: true,
      quarters: data.financials.quarters.map((_q, i) => ({ actual: `${[52, 56, 59, 62.4][i]}K`, variance: `+${[8, 12, 15, 18][i]}%`, varianceColor: 'green' as 'green' | 'red' | 'neutral' })),
      children: [
        { label: 'PADCEV PSP Enrollees', quarters: data.financials.quarters.map((_q, i) => ({ actual: `${[10.2, 12.8, 15.6, 18.6][i]}K`, variance: `+${[38, 48, 55, 62][i]}%`, varianceColor: 'green' as const })) },
        { label: 'PSP Activation Rate', quarters: data.financials.quarters.map((_q, i) => ({ actual: `${[64, 67, 70, 72][i]}%`, variance: `+${[3, 4, 6, 8][i]}pp`, varianceColor: 'green' as const })) },
      ],
    },
    { label: 'Digital Program Revenue % of Total', isTotal: true,
      quarters: data.financials.quarters.map((_q, i) => ({ actual: `${[14.5, 15.8, 17, 22][i]}%`, variance: `+${[2, 3, 3.5, 5][i]}pp`, varianceColor: 'green' as 'green' | 'red' | 'neutral' })),
    },
  ], [data]);

  const driverDataForTable = useMemo(() => [
    { category: 'PSP Enrollment & Activation', rows: [
      { driver: 'Active PSP Enrollees', actual: '62.4K', plan: '85K', variance: '-22.6K', varianceColor: 'red' as const, trend: 'up' as const },
      { driver: 'New PSP Enrollments/Month', actual: '3.2K/mo', plan: '4.5K/mo', variance: '-1.3K/mo', varianceColor: 'red' as const, trend: 'up' as const },
      { driver: 'PSP Activation Rate', actual: '72%', plan: '80%', variance: '-8pp', varianceColor: 'red' as const, trend: 'up' as const },
    ]},
    { category: 'HCP Digital Engagement', rows: [
      { driver: 'Unique HCPs Digitally Engaged', actual: '48.2K', plan: '65K', variance: '-16.8K', varianceColor: 'red' as const, trend: 'up' as const },
      { driver: 'eP2P Medical Portal HCPs', actual: '38.5K', plan: '45K', variance: '-6.5K', varianceColor: 'red' as const, trend: 'up' as const },
      { driver: 'High-Engagement HCPs (3+ interactions)', actual: '18.4K', plan: '22K', variance: '-3.6K', varianceColor: 'red' as const, trend: 'up' as const },
    ]},
    { category: 'Digital Revenue Contribution', rows: [
      { driver: 'Digital Revenue % of Total', actual: '22%', plan: '28%', variance: '-6pp', varianceColor: 'red' as const, trend: 'up' as const },
      { driver: 'PSP Adherence Monitoring Lift', actual: '+22%', plan: '+25%', variance: '-3pp', varianceColor: 'red' as const, trend: 'up' as const },
      { driver: 'PSP Persistence Revenue (¥B)', actual: '¥4.2B', plan: '¥3.8B', variance: '+¥0.4B', varianceColor: 'green' as const, trend: 'up' as const },
    ]},
  ], []);

  const attentionItems = useMemo(() => [
    { id: 'a1', severity: 'warning' as const, title: 'PSP enrollment 27% below 85K FY26 target — PADCEV and VEOZAH/IZERVAY expansion key levers', detail: 'New enrollment rate of 3.2K/month needs to reach 4.5K/month. PADCEV HUB services expansion and VEOZAH OB/GYN outreach are addressable levers.', actionTab: 'drivers' },
    { id: 'a2', severity: 'positive' as const, title: 'HCP digital engagement driving 2.4x higher Rx starts — 18.4K high-engagement HCPs identified', detail: 'Digital engagement ROI is measurable and compelling. Scaling to 65K total HCP target will compound the revenue benefit.', actionTab: 'drivers' },
    { id: 'a3', severity: 'info' as const, title: 'MyAstellas.com portal DAU/MAU at 28% vs 35% target — push notification optimization opportunity', detail: 'Day 30 retention at 71% is strong; daily engagement has room to improve with therapy milestone reminders and personalized adherence nudges.', actionTab: 'bridge' },
  ], []);

  return (
    <ConsoleShell config={digitalLoyaltyConfig}>
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
                title="Digital Patient Programs Revenue Bridge"
                periodLabel={`${data.financials.latestQuarter.quarter} vs Prior Year`}
                totalVariance="10310"
                totalVariancePercent="+22% digital attribution"
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
