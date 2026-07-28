// v2
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
  copyrightHolder: 'Astellas Pharma Inc.',
  copyrightYear: 2026,
  poweredBy: 'Accenture',
  designedBy: 'Accenture',
  ceo: 'Naoki Okamura',
  cfo: 'Atsushi Kitamura',
  cfoTitle: 'Executive Vice President, Chief Financial Officer',
  fiscalYearEnd: 'March 31',
  industry: 'Pharmaceutical / Oncology',
  headquarters: 'Kōtō, Tokyo, Japan',
  // Astellas Pharma official brand colors (Finance360 implementation)
  //   Astellas Red:   #D91E49 — primary brand; nav, buttons, active links
  //   Dark Red:       #A62B4E — secondary brand accent
  //   Dark Navy:      #1A1A2E — deep background / nav bg
  //   Light Pink:     #FAE8EE — background tints, card highlights
  colors: {
    primary: '#D91E49',      // Astellas Red
    primaryDark: '#1A1A2E',  // Deep navy for hover / nav bg
    primaryLight: '#FAE8EE', // Light pink tint for card backgrounds
    primaryAlt: '#A62B4E',   // Dark red variant
    navBg: '#D91E49',        // Astellas Red (nav / sidebar)
    navBgLight: '#A62B4E',   // Dark red for highlights
    accent: '#D91E49',       // Astellas Red (accent)
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#A62B4E',
  },
};
