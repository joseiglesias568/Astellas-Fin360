import { Globe } from 'lucide-react';
import type { ConsoleConfig } from '@/components/console/types';

export const storeOperationsConfig: ConsoleConfig = {
  id: 'store-operations',
  title: 'Americas Performance',
  subtitle: 'US and Canada commercial operations — XTANDI, PADCEV, IZERVAY, and VEOZAH managed care access and revenue',
  icon: Globe,
  segment: 'pcw',

  heroKPIs: [
    { id: 'completion', label: 'Americas Revenue (¥B)', metricKey: 'Americas Revenue', format: 'currency' },
    { id: 'otp', label: 'Americas YoY Growth', metricKey: 'Americas Growth', format: 'percent' },
    { id: 'casm-ex', label: 'XTANDI US Revenue (¥B)', metricKey: 'XTANDI US Revenue', format: 'currency' },
    { id: 'utilization', label: 'Americas Core OP (¥B)', metricKey: 'Americas Core OP', format: 'currency' },
  ],

  primaryFilters: [
    {
      id: 'hub',
      label: 'Market',
      type: 'pills',
      options: [
        { value: 'All', label: 'All Americas' },
        { value: 'US', label: 'United States' },
        { value: 'Canada', label: 'Canada' },
        { value: 'LatAm', label: 'Latin America' },
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
        { value: 'Peers', label: 'vs US Pharma' },
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
        { value: 'XTANDI', label: 'XTANDI (enzalutamide)' },
        { value: 'PADCEV', label: 'PADCEV (enfortumab vedotin)' },
        { value: 'IZERVAY', label: 'IZERVAY (avacincaptad pegol)' },
        { value: 'VEOZAH', label: 'VEOZAH (fezolinetant)' },
      ],
      defaultValue: 'All',
    },
    {
      id: 'channel',
      label: 'Channel',
      type: 'select',
      options: [
        { value: 'All', label: 'All Channels' },
        { value: 'Specialty', label: 'Specialty Pharmacy' },
        { value: 'Hospital', label: 'Hospital / Institutional' },
        { value: 'Retail', label: 'Retail Pharmacy' },
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
