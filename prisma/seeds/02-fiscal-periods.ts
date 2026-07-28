import { PrismaClient } from '@prisma/client';

// SOURCE: Astellas Pharma Inc. — FY2025 Annual Report and IR materials.
// Astellas uses an April 1 – March 31 fiscal year.
// FY2024 = April 2024 – March 2025; FY2025 = April 2025 – March 2026.
// Quarterly periods: Q1 (Apr-Jun), Q2 (Jul-Sep), Q3 (Oct-Dec), Q4 (Jan-Mar).
// Note: Q4 FY24 (Jan-Mar 2025) has calendar year 2025; Q4 FY25 (Jan-Mar 2026) has year 2026.

export async function seedFiscalPeriods(prisma: PrismaClient, companyId: number) {
  const periods = [
    { label: 'Q1 FY24', year: 2024, quarter: 1,    type: 'quarter'  },
    { label: 'Q2 FY24', year: 2024, quarter: 2,    type: 'quarter'  },
    { label: 'Q3 FY24', year: 2024, quarter: 3,    type: 'quarter'  },
    { label: 'Q4 FY24', year: 2025, quarter: 4,    type: 'quarter'  },
    { label: 'FY24',    year: 2024, quarter: null,  type: 'annual'   },
    { label: 'Q1 FY25', year: 2025, quarter: 1,    type: 'quarter'  },
    { label: 'Q2 FY25', year: 2025, quarter: 2,    type: 'quarter'  },
    { label: 'Q3 FY25', year: 2025, quarter: 3,    type: 'quarter'  },
    { label: 'Q4 FY25', year: 2026, quarter: 4,    type: 'quarter'  },
    { label: 'FY25',    year: 2025, quarter: null,  type: 'annual'   },
    { label: 'Q1 FY26', year: 2026, quarter: 1,    type: 'forecast' },
  ];

  const periodMap: Record<string, { id: number }> = {};

  for (const period of periods) {
    const created = await prisma.fiscalPeriod.create({
      data: {
        companyId,
        label: period.label,
        year: period.year,
        quarter: period.quarter,
        type: period.type,
      },
    });
    periodMap[period.label] = { id: created.id };
  }

  console.log(`Seeded ${periods.length} fiscal periods (Q1 FY24 through Q1 FY26)`);

  return periodMap;
}
