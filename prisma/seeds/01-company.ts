import { PrismaClient } from '@prisma/client';

// SOURCE: Astellas Pharma Inc. (ALPMY) — FY2025 Annual Report (June 2026),
// Q4 FY2025 earnings release, and public investor relations materials.
// CEO: Naoki Okamura | CFO: Atsushi Kitamura
// Global pharmaceutical company headquartered in Minato, Tokyo, Japan.
// Fiscal year: April 1 – March 31. Ticker: ALPMY (OTC ADR, NYSE).
// Key products: XTANDI (enzalutamide), PADCEV (enfortumab vedotin),
//   IZERVAY (avacincaptad pegol), VEOZAH (fezolinetant).

export async function seedCompany(prisma: PrismaClient) {
  const company = await prisma.company.create({
    data: {
      name: 'Astellas Pharma Inc.',
      ticker: 'ALPMY',
      platformName: 'Astellas Finance360',
      tagline: 'AI-Powered Management Reporting',
      subtitle: 'Real-time analytics and reporting for Astellas Pharma Inc.',
      logoPath: '/logo.svg',
      logoAlt: 'Astellas Pharma Inc. Logo',
      copyrightHolder: 'Astellas Pharma Inc.',
      copyrightYear: 2026,
      poweredBy: 'Accenture',
      ceo: 'Naoki Okamura',
      cfo: 'Atsushi Kitamura',
      fiscalYearEnd: 'March 31',
      industry: 'Pharmaceutical',
      headquarters: 'Minato, Tokyo, Japan',
    },
  });

  // Brand colors per Astellas Pharma brand guidelines.
  // Astellas brand red #D91E49 is the primary brand anchor.
  await prisma.brandColors.create({
    data: {
      companyId: company.id,
      primary: '#D91E49',      // Astellas Brand Red
      primaryDark: '#A62B4E',  // Dark Red
      primaryLight: '#FAE8EE', // Light Red/Pink
      primaryAlt: '#C01840',   // Alternate Red
      navBg: '#1A1A2E',        // Nav BG (Dark Navy)
      navBgLight: '#A62B4E',   // Nav BG Light
      accent: '#D91E49',       // Accent (Brand Red)
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#3B82F6',
    },
  });

  console.log(`✅ Seeded company: ${company.name} (id: ${company.id})`);
  console.log(`✅ Seeded brand colors`);

  return company;
}
