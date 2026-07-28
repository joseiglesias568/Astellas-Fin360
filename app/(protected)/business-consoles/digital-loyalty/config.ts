import { BarChart2 } from 'lucide-react';
import type { ConsoleConfig } from '@/components/console/types';

export const digitalLoyaltyConfig: ConsoleConfig = {
  id: 'digital-loyalty',
  title: 'Digital & Commercial Analytics',
  subtitle: 'Companion diagnostics adoption, patient adherence programs, digital clinical trials, and commercial access metrics',
  icon: BarChart2,
  segment: 'digital-health',

  heroKPIs: [
    { id: 'platform-users', label: 'CDx Testing Rate', metricKey: 'CDx Testing Rate', format: 'percent' },
    { id: 'proptech-adoption', label: 'Patient Adherence Rate', metricKey: 'Patient Adherence Rate', format: 'percent' },
    { id: 'platform-revenue', label: 'Digital Trial Endpoints', metricKey: 'Digital Trial Endpoints', format: 'compact' },
    { id: 'client-onboardings', label: 'Market Access Coverage', metricKey: 'Market Access Coverage', format: 'percent' },
  ],

  primaryFilters: [
    {
      id: 'segment',
      label: 'Program',
      type: 'pills',
      options: [
        { value: 'All', label: 'All Programs' },
        { value: 'CDx', label: 'Companion Diagnostics' },
        { value: 'Adherence', label: 'Patient Adherence' },
        { value: 'DigitalTrials', label: 'Digital Clinical Trials' },
      ],
      defaultValue: 'All',
    },
    {
      id: 'period',
      label: 'Period',
      type: 'pills',
      options: [
        { value: 'M', label: 'Monthly' },
        { value: 'Q', label: 'Quarterly' },
        { value: 'TTM', label: 'Trailing 12M' },
      ],
      defaultValue: 'Q',
    },
    {
      id: 'comparison',
      label: 'Compare',
      type: 'select',
      options: [
        { value: 'YoY', label: 'vs Last Year' },
        { value: 'QoQ', label: 'vs Last Quarter' },
        { value: 'Plan', label: 'vs Plan' },
      ],
      defaultValue: 'YoY',
    },
  ],

  secondaryFilters: [
    {
      id: 'product',
      label: 'Product',
      type: 'select',
      options: [
        { value: 'All', label: 'All Products' },
        { value: 'VYLOY', label: 'VYLOY (Claudin 18.2 CDx)' },
        { value: 'PADCEV', label: 'PADCEV (Nectin-4 Testing)' },
        { value: 'XOSPATA', label: 'XOSPATA (FLT3 Testing)' },
        { value: 'XTANDI', label: 'XTANDI (AR Testing)' },
      ],
      defaultValue: 'All',
    },
    {
      id: 'channel',
      label: 'Channel',
      type: 'select',
      options: [
        { value: 'All', label: 'All Channels' },
        { value: 'AstellasApp', label: 'Astellas Patient App' },
        { value: 'HCP', label: 'HCP Digital Platform' },
        { value: 'ClinicalTrial', label: 'Clinical Trial Portal' },
      ],
      defaultValue: 'All',
    },
    {
      id: 'geography',
      label: 'Geography',
      type: 'select',
      options: [
        { value: 'All', label: 'All Geographies' },
        { value: 'US', label: 'United States' },
        { value: 'EU', label: 'Europe' },
        { value: 'Japan', label: 'Japan' },
        { value: 'China', label: 'China' },
      ],
      defaultValue: 'All',
    },
  ],
};
