import { PrismaClient } from '@prisma/client';

// =============================================================================
// Seed In-Cycle Estimates: Current period tracking for EPM
// Layer 4: EPM — In-Cycle Reporting
//
// Current quarter is Q2 FY25 (Jul–Sep 2025), modelled at day 47 of 92 (mid-August).
// Q1 FY25 actual values: Revenue ¥537.9B, Core OP ¥130.8B, Core EPS ¥54.88,
// Core OP Margin 24.3%.
// FY2025 guidance: Revenue ¥2,139.2B, Core OP ¥555.7B (26.0%), Core EPS ¥237.01.
// FY2026 guidance: Revenue ¥2,220B, Core OP ¥620B (27.9%), Core EPS ¥256.77.
// All monetary values in JPY billions (¥B) except Core EPS (¥) and ratios/rates.
// =============================================================================

export async function seedInCycleEstimates(prisma: PrismaClient, companyId: number) {
  console.log('  Seeding in-cycle estimates...');

  const estimates = [
    {
      periodLabel: 'Q2 FY25',
      metricName: 'Revenue',
      mtdActual: 265.0,           // ¥265.0B QTD through day 47 (July + early August actuals, ¥B)
      qtdActual: 265.0,
      flashEstimate: 540.0,       // Extrapolated flash to quarter end (¥B); consistent with FY25 run-rate
      forecastValue: 540.0,       // Official Q2 FY25 forecast (¥B); XTANDI stable, Strategic Brands ramp
      budgetValue: 530.0,         // Budget/plan set at FY2025 planning
      priorYearActual: 484.3,     // Q2 FY24 actual revenue (¥B)
      daysThroughPeriod: 47,
      totalDaysInPeriod: 92,
    },
    {
      periodLabel: 'Q2 FY25',
      metricName: 'Core Operating Income',
      mtdActual: 67.0,            // ¥67.0B QTD Core OP through day 47 (¥B)
      qtdActual: 67.0,
      flashEstimate: 138.0,       // Flash to quarter end (¥B); SMT savings pacing ahead
      forecastValue: 138.5,       // Q2 FY25 Core OP forecast (¥B)
      budgetValue: 135.0,         // Budget baseline (¥B)
      priorYearActual: 108.5,     // Q2 FY24 actual Core OP (¥B)
      daysThroughPeriod: 47,
      totalDaysInPeriod: 92,
    },
    {
      periodLabel: 'Q2 FY25',
      metricName: 'Core EPS',
      mtdActual: 29.0,            // ¥29.0 QTD Core EPS through day 47 (¥)
      qtdActual: 29.0,
      flashEstimate: 59.0,        // Flash to quarter end (¥); FX tailwind moderating vs Q1
      forecastValue: 59.14,       // Q2 FY25 Core EPS forecast (¥); consistent with FY25 annual ¥237.01 pace
      budgetValue: 58.0,          // Budget baseline (¥)
      priorYearActual: 45.2,      // Q2 FY24 actual Core EPS (¥)
      daysThroughPeriod: 47,
      totalDaysInPeriod: 92,
    },
    {
      periodLabel: 'Q2 FY25',
      metricName: 'XTANDI Revenue',
      mtdActual: 118.5,           // ¥118.5B QTD XTANDI revenue through day 47 (¥B)
      qtdActual: 118.5,
      flashEstimate: 238.5,       // Flash to quarter end (¥B); pacing slightly below Q1 ¥249.3B seasonal norm
      forecastValue: 238.7,       // Q2 FY25 XTANDI forecast (¥B); IRA monitoring but no financial impact yet
      budgetValue: 245.0,         // Budget baseline (¥B); modest softness vs plan on Q2 seasonality
      priorYearActual: 225.0,     // Q2 FY24 actual XTANDI revenue (¥B)
      daysThroughPeriod: 47,
      totalDaysInPeriod: 92,
    },
    {
      periodLabel: 'Q2 FY25',
      metricName: 'Strategic Brands Revenue',
      mtdActual: 59.2,            // ¥59.2B QTD Strategic Brands through day 47 (¥B); PADCEV + IZERVAY + VYLOY
      qtdActual: 59.2,
      flashEstimate: 119.0,       // Flash to quarter end (¥B); VYLOY launch accelerating
      forecastValue: 118.5,       // Q2 FY25 Strategic Brands forecast (¥B)
      budgetValue: 115.0,         // Budget baseline (¥B)
      priorYearActual: 82.0,      // Q2 FY24 actual Strategic Brands revenue (¥B)
      daysThroughPeriod: 47,
      totalDaysInPeriod: 92,
    },
    {
      periodLabel: 'Q2 FY25',
      metricName: 'Core OP Margin',
      mtdActual: 25.3,            // 25.3% QTD Core OP Margin (April–August partial period)
      qtdActual: 25.3,
      flashEstimate: 25.6,        // Flash to quarter end (%); SMT savings supporting margin expansion
      forecastValue: 25.8,        // Q2 FY25 Core OP Margin forecast (%); Q2 historically second-strongest
      budgetValue: 25.5,          // Budget baseline (%)
      priorYearActual: 22.4,      // Q2 FY24 actual Core OP Margin (%)
      daysThroughPeriod: 47,
      totalDaysInPeriod: 92,
    },
    {
      periodLabel: 'Q2 FY25',
      metricName: 'SMT Savings YTD',
      mtdActual: 8.5,             // ¥8.5B SMT savings YTD cumulative through day 47 of Q2 FY25 (¥B)
      qtdActual: 8.5,
      flashEstimate: 10.5,        // Flash YTD to Q2 quarter end (¥B); ahead of ¥10.0B H1 target
      forecastValue: 10.5,        // Q2 FY25 YTD SMT savings forecast (¥B); FY2025 target ¥21B on track
      budgetValue: 10.0,          // H1 FY25 SMT savings budget target (¥B)
      priorYearActual: 4.5,       // Q2 FY24 YTD SMT savings (¥B); programme was earlier-stage
      daysThroughPeriod: 47,
      totalDaysInPeriod: 92,
    },
    {
      periodLabel: 'Q2 FY25',
      metricName: 'China Revenue',
      mtdActual: 25.8,            // ¥25.8B QTD China revenue through day 47 (¥B); VYLOY launch tailwind
      qtdActual: 25.8,
      flashEstimate: 52.0,        // Flash to quarter end (¥B); VYLOY formulary listings progressing
      forecastValue: 52.5,        // Q2 FY25 China revenue forecast (¥B)
      budgetValue: 48.0,          // Budget baseline (¥B)
      priorYearActual: 37.2,      // Q2 FY24 actual China revenue (¥B)
      daysThroughPeriod: 47,
      totalDaysInPeriod: 92,
    },
    {
      periodLabel: 'Q2 FY25',
      metricName: 'USD/JPY Rate',
      mtdActual: 149.8,           // 149.8 average USD/JPY rate QTD through day 47
      qtdActual: 149.8,
      flashEstimate: 150.0,       // Flash Q2 FY25 average USD/JPY estimate
      forecastValue: 150.0,       // Q2 FY25 USD/JPY forecast; slightly below Q1 FY25 ¥152 average
      budgetValue: 152.0,         // FY25 planning basis (¥B)
      priorYearActual: 143.5,     // Q2 FY24 average USD/JPY (significant YoY JPY weakening since then)
      daysThroughPeriod: 47,
      totalDaysInPeriod: 92,
    },
  ];

  await prisma.inCycleEstimate.createMany({
    data: estimates.map((e) => ({
      companyId,
      periodLabel: e.periodLabel,
      metricName: e.metricName,
      mtdActual: e.mtdActual,
      qtdActual: e.qtdActual,
      flashEstimate: e.flashEstimate,
      forecastValue: e.forecastValue,
      budgetValue: e.budgetValue,
      priorYearActual: e.priorYearActual,
      daysThroughPeriod: e.daysThroughPeriod,
      totalDaysInPeriod: e.totalDaysInPeriod,
      lastUpdated: '2025-08-17T08:00:00Z',
    })),
  });

  console.log(`  Created ${estimates.length} in-cycle estimates`);
  console.log('In-Cycle Estimates seed complete');
}
