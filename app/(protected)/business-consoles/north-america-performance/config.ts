import { Activity } from 'lucide-react';
import type { ConsoleConfig } from '@/components/console/types';

export const northAmericaConfig: ConsoleConfig = {
  id: 'north-america-performance',
  title: 'Oncology & XTANDI Performance',
  subtitle: 'XTANDI global sales, IRA price risk, prostate cancer market share, and Pfizer co-promotion economics',
  icon: Activity,
  segment: 'hcb',

  heroKPIs: [
    { id: 'revenue', label: 'XTANDI Revenue (¥B)', metricKey: 'XTANDI Revenue', format: 'currency' },
    { id: 'comp-sales', label: 'XTANDI YoY Growth', metricKey: 'XTANDI YoY Growth', format: 'percent' },
    { id: 'trasm', label: 'Oncology Core OP (¥B)', metricKey: 'Oncology Core OP', format: 'currency' },
    { id: 'op-margin', label: 'Core OP Margin', metricKey: 'Core OP Margin', format: 'percent' },
  ],

  primaryFilters: [
    {
      id: 'segment',
      label: 'Indication',
      type: 'pills',
      options: [
        { value: 'All', label: 'All Indications' },
        { value: 'mCSPC', label: 'mCSPC' },
        { value: 'mCRPC', label: 'mCRPC' },
        { value: 'nmCRPC', label: 'nmCRPC' },
        { value: 'MIBC', label: 'MIBC' },
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
        { value: 'Peers', label: 'vs ARSi Peers' },
      ],
      defaultValue: 'YoY',
    },
  ],

  secondaryFilters: [
    {
      id: 'geography',
      label: 'Geography',
      type: 'select',
      options: [
        { value: 'All', label: 'All Geographies' },
        { value: 'US', label: 'United States' },
        { value: 'EU', label: 'Europe' },
        { value: 'Japan', label: 'Japan' },
        { value: 'Other', label: 'Rest of World' },
      ],
      defaultValue: 'All',
    },
    {
      id: 'partnerSplit',
      label: 'Co-Promotion',
      type: 'select',
      options: [
        { value: 'All', label: 'Gross Revenue' },
        { value: 'Astellas', label: 'Astellas Share' },
        { value: 'Pfizer', label: 'Pfizer Share (US)' },
      ],
      defaultValue: 'All',
    },
    {
      id: 'valueView',
      label: 'View',
      type: 'pills',
      options: [
        { value: 'Total', label: 'Total ¥' },
        { value: 'Growth', label: 'YoY Growth %' },
      ],
      defaultValue: 'Total',
    },
  ],
};
