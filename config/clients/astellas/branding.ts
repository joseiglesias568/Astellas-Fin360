// v1 — Astellas Pharma Inc.
// Runtime data comes from DB via lib/db/repositories/company.ts
// Also used directly by login page (no auth context for DB access)
import { BrandingConfig } from '../../types';

export const branding: BrandingConfig = {
  companyName: 'Astellas Pharma Inc.',
  ticker: 'ALPMY',
  platformName: 'Astellas Finance360',
  tagline: 'AI-Powered Management Reporting',
  subtitle: 'Real-time analytics and reporting for Astellas Pharma Inc.',
  logoPath: '/logo.svg',
  logoAlt: 'Astellas Pharma — Finance360',
  copyrightHolder: 'Astellas Pharma Inc',
  copyrightYear: 2026,
  poweredBy: 'Accenture',
  designedBy: 'Accenture',
  ceo: 'Naoki Okamura',
  cfo: 'Atsushi Kitamura',
  cfoTitle: 'Chief Financial Officer',
  fiscalYearEnd: 'March 31',
  industry: 'Pharmaceutical',
  headquarters: 'Minato, Tokyo, Japan',
  // Astellas Pharma official brand colors (Finance360 implementation)
  //   Flying Star Red:  #D91E49 — primary brand; nav, buttons, active links
  //   Dark Red:         #A62B4E — deeper shade for headers/nav hover
  //   Light Pink:       #FAE8EE — background tints, card highlights
  //   Grey:             #A7A9AC — secondary brand/text
  colors: {
    primary: '#D91E49',      // Astellas brand red (Flying Star)
    primaryDark: '#A62B4E',  // Deeper red for hover / nav bg
    primaryLight: '#FAE8EE', // Light pink tint for card backgrounds
    primaryAlt: '#C01840',   // Mid-red variant
    navBg: '#1A1A2E',        // Dark navy for nav / sidebar
    navBgLight: '#A62B4E',   // Dark red for highlights
    accent: '#D91E49',       // Brand red accent
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  },
};
