// Navigation configuration for the horizontal top nav
// Defines the dropdown structure: Executive, Consoles, Tools, EPM, Report Hub

export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
  comingSoon?: boolean;
}

export interface NavCategory {
  name: string;
  items: NavDropdownItem[];
}

export interface NavItem {
  label: string;
  href?: string;            // Direct link (no dropdown)
  items?: NavDropdownItem[]; // Dropdown items
  megaMenuColumns?: NavCategory[][]; // Mega-menu: columns of categorized items
}

export const mainNavigation: NavItem[] = [
  {
    label: 'Executive',
    items: [
      {
        label: 'Executive Summary',
        href: '/executive-summary',
        description: 'Strategic overview and key decisions',
      },
      {
        label: 'Monthly Operating Report',
        href: '/monthly-report',
        description: 'Comprehensive monthly analysis',
      },
      {
        label: 'Meeting Hub',
        href: '/build-presentation',
        description: 'AI-powered deck builder',
      },
      {
        label: 'Financial Close Tracker',
        href: '/financial-close',
        description: 'Agentic close process flow — milestones, escalations, and sign-off gates',
      },
    ],
  },
  {
    label: 'Business Consoles',
    megaMenuColumns: [
      // Column 1 — Oncology & Product Franchises
      [
        {
          name: 'Oncology & Product Franchises',
          items: [
            { label: 'Oncology & XTANDI Performance', href: '/business-consoles/north-america-performance' },
            { label: 'Strategic Brands Growth', href: '/business-consoles/international-performance' },
            { label: 'Competitive Intelligence', href: '/competitive-intelligence' },
            { label: 'Digital & Commercial Analytics', href: '/business-consoles/digital-loyalty' },
          ],
        },
        {
          name: 'Commercial Engagement',
          items: [
            { label: 'Brand & Market Access', href: '/business-consoles/brand-marketing', comingSoon: true },
          ],
        },
      ],
      // Column 2 — Geographic Performance
      [
        {
          name: 'Geographic Performance',
          items: [
            { label: 'Americas Performance', href: '/business-consoles/store-operations' },
            { label: 'International & Asia Performance', href: '/business-consoles/international-asia', comingSoon: true },
            { label: 'China Market Expansion', href: '/business-consoles/china-market', comingSoon: true },
            { label: 'Japan Home Market', href: '/business-consoles/japan-market', comingSoon: true },
          ],
        },
        {
          name: 'People',
          items: [
            { label: 'People & Culture', href: '/business-consoles/people-culture', comingSoon: true },
          ],
        },
      ],
      // Column 3 — Strategy & Finance
      [
        {
          name: 'Strategy',
          items: [
            { label: 'Strategy Execution', href: '/business-consoles/strategy-execution' },
          ],
        },
        {
          name: 'Financial',
          items: [
            { label: 'Financial Performance & Treasury', href: '/business-consoles/financial-performance', comingSoon: true },
            { label: 'SMT & Capital Allocation', href: '/business-consoles/capital-allocation', comingSoon: true },
          ],
        },
        {
          name: 'Risk',
          items: [
            { label: 'Risk, Compliance & ESG', href: '/business-consoles/risk-compliance', comingSoon: true },
          ],
        },
      ],
    ],
  },
  {
    label: 'Analytics & Reporting',
    items: [
      {
        label: 'Report Hub',
        href: '/report-hub',
        description: 'Centralized report library and distribution for Astellas Pharma financial analytics',
      },
      {
        label: 'Competitive Intelligence',
        href: '/competitive-intelligence',
        description: 'Oncology market share benchmarking, XTANDI vs ARSi competitive analysis, and positioning vs. Merck, AstraZeneca, BMS, and J&J',
      },
      {
        label: 'Scenario Modeling',
        href: '/scenario-modeling',
        description: 'What-if analysis for XTANDI IRA pricing, Strategic Brands growth, SMT savings, FX rates, and R&D pipeline outcomes',
      },
      {
        label: 'Sandbox',
        href: '/sandbox',
        description: 'Experimental analytics environment for Astellas pharmaceutical financial data exploration',
      },
    ],
  },
  {
    label: 'Planning & Forecasting',
    items: [
      {
        label: '18-Month Rolling Forecast',
        href: '/epm/ml-forecasting',
        description: 'Full P&L cascade with ML-predicted pharmaceutical revenue, R&D cost, SG&A, and SMT savings drivers',
      },
      {
        label: 'Quarterly Bridge Walk',
        href: '/epm/bridge-walks',
        description: 'Forecast vs actuals waterfall by P&L line across XTANDI, Strategic Brands, and geographic segments',
      },
      {
        label: 'Fiscal Year Plan',
        href: '/epm/fiscal-year-plan',
        description: 'Annual plan vs YTD actuals and full-year projection by product and geography — core OP margin and EPS focus',
      },
      {
        label: 'Short-Term Planning',
        href: '/epm/short-term-planning',
        description: 'Interactive 0-6 month planning with XTANDI volume, Strategic Brands launch, and SMT savings adjustments',
      },
      {
        label: 'Long-Term Planning',
        href: '/epm/long-term-planning',
        description: '12-36 month strategic planning — pipeline commercialization, China expansion, IRA risk mitigation, and SMT Phase 2',
      },
      {
        label: 'Cost Index Tracking',
        href: '/commodity-tracking',
        description: 'SMT savings tracker, R&D investment indices, SG&A efficiency ratios, and FX impact monitoring',
      },
      {
        label: 'Risks & Opportunities',
        href: '/epm/risks-opportunities',
        description: 'Management adjustments to ML forecast with R&O waterfall for XTANDI IRA risk, pipeline milestones, and FX sensitivity',
      },
    ],
  },
  {
    label: 'AI',
    items: [
      {
        label: 'How AI Works Here',
        href: '/ai-overview',
        description: 'Visual overview of the AI agent team, workflows, and data guardrails',
      },
      {
        label: 'The Data Foundation',
        href: '/data-foundation',
        description: 'What data is needed, how the foundation is built, and the maturity curve to AI-ready analytics',
      },
      {
        label: 'Data Lineage & Source Audit',
        href: '/data-lineage',
        description: 'Confidence ratings, source citations, and lineage for every major financial figure on this platform',
      },
      {
        label: 'AI Search',
        href: '/ai-search',
        description: 'Natural language financial search and analysis',
      },
      {
        label: 'AI Alerts',
        href: '/ai-alerts',
        description: 'Intelligent anomaly detection and notifications',
      },
      {
        label: 'AI Insight / Human Commentary',
        href: '/commentary',
        description: 'AI-generated narrative commentary and analysis',
      },
      {
        label: 'How to Get Started',
        href: '/implementation-roadmap',
        description: 'Illustrative roadmap from Demo to Production — data, platform, UX, and agentic capability workstreams',
      },
      {
        label: 'Deployment Scoping Worksheet',
        href: '/implementation-roadmap/scoping-worksheet',
        description: 'Interactive POC / Pilot / Production scoping tool — timeline, investment, and team estimates based on your use case and data scope',
      },
    ],
  },
];
