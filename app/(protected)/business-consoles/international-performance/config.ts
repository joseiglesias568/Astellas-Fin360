import { TrendingUp } from 'lucide-react';
import type { ConsoleConfig } from '@/components/console/types';

export const internationalConfig: ConsoleConfig = {
  id: 'international-performance',
  title: 'Strategic Brands Growth',
  subtitle: 'PADCEV, IZERVAY, VYLOY, VEOZAH, and XOSPATA — combined ¥480.3B portfolio driving +43% YoY growth',
  icon: TrendingUp,
  segment: 'hss',

  heroKPIs: [
    { id: 'intl-revenue', label: 'Strategic Brands Revenue (¥B)', metricKey: 'Strategic Brands Revenue', format: 'currency' },
    { id: 'emea-growth', label: 'Strategic Brands YoY Growth', metricKey: 'Strategic Brands Growth', format: 'percent' },
    { id: 'intl-office-count', label: 'PADCEV Revenue (¥B)', metricKey: 'PADCEV Revenue', format: 'currency' },
    { id: 'fx-impact', label: 'VYLOY Launch Revenue (¥B)', metricKey: 'VYLOY Revenue', format: 'currency' },
  ],

  primaryFilters: [
    {
      id: 'region',
      label: 'Product',
      type: 'pills',
      options: [
        { value: 'All', label: 'All Products' },
        { value: 'PADCEV', label: 'PADCEV' },
        { value: 'IZERVAY', label: 'IZERVAY' },
        { value: 'VYLOY', label: 'VYLOY' },
        { value: 'VEOZAH', label: 'VEOZAH' },
        { value: 'XOSPATA', label: 'XOSPATA' },
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
        { value: 'Peers', label: 'vs Oncology Peers' },
      ],
      defaultValue: 'YoY',
    },
  ],

  secondaryFilters: [
    {
      id: 'storeType',
      label: 'Therapy Area',
      type: 'select',
      options: [
        { value: 'All', label: 'All Areas' },
        { value: 'Oncology', label: 'Oncology (PADCEV/XOSPATA)' },
        { value: 'Ophthalmology', label: 'Ophthalmology (IZERVAY)' },
        { value: 'Gastric', label: 'GI / Gastric (VYLOY)' },
        { value: 'WomensHealth', label: "Women's Health (VEOZAH)" },
      ],
      defaultValue: 'All',
    },
    {
      id: 'geography',
      label: 'Geography',
      type: 'pills',
      options: [
        { value: 'All', label: 'All' },
        { value: 'US', label: 'US' },
        { value: 'ExUS', label: 'Ex-US' },
      ],
      defaultValue: 'All',
    },
    {
      id: 'valueView',
      label: 'Value',
      type: 'pills',
      options: [
        { value: 'Total', label: 'Total ¥' },
        { value: 'Growth', label: 'YoY Growth %' },
      ],
      defaultValue: 'Total',
    },
  ],
};
