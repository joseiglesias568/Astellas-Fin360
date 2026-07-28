// v2
// SEED REFERENCE ONLY — runtime data comes from DB via lib/db/repositories/hypotheses.ts
//
// Hypotheses are analytical questions framed against Astellas Pharma Inc.'s
// actual business model. Statistical results are estimated for demonstration.
// ─────────────────────────────────────────────────────────────────────
import { HypothesesConfig } from '../../types';

export const hypotheses: HypothesesConfig = {
  hypotheses: [
    {
      id: 1,
      title: 'IRA Price Negotiation is the Primary Driver of XTANDI US Revenue Risk',
      hypothesis:
        'A 10% IRA-negotiated price reduction on XTANDI Medicare sales is associated with a ≥¥38B annual reduction in Core Operating Profit, holding US prescription volume constant.',
      result: 'supported',
      pValue: 0.001,
      effectSize: 'XTANDI FY2025 revenue ¥960.8B; Medicare ~40% of US sales (~¥200B); 10% price reduction ≈ −¥20B revenue → −¥38B Core OP at ~70% incremental margin',
      details:
        'Regression of XTANDI US revenue sensitivity to simulated IRA price scenarios confirms a near-linear inverse relationship between Medicare price negotiation depth and Core OP. At ¥960.8B annual revenue with Medicare representing ~40% of US sales (~¥200B estimated), a 10% price reduction equates to −¥20B revenue and approximately −¥38B Core OP given XTANDI\'s high incremental margin (~70% at current scale). The IRA-negotiated price became effective January 2026, and the actual price reduction magnitude (estimated 20–35%) will be the dominant driver of FY2026 and FY2027 Core EPS variance vs. consensus estimates. Astellas has guided investors to monitor this lever as a key source of uncertainty in the FY2026 outlook.',
      confidence: 99.9,
    },
    {
      id: 2,
      title: 'SMT Savings Delivery Leads Core OP Margin Expansion by 1–2 Quarters',
      hypothesis:
        'A ¥10B increase in Sustainable Margin Transformation (SMT) quarterly savings recognition is associated with a ≥0.4 percentage point improvement in Core OP margin within 1–2 quarters of the savings achieving operational scale.',
      result: 'supported',
      pValue: 0.018,
      effectSize: 'SMT delivered incremental savings contributing to Core OP margin rising from 25.3% (FY2024) to 26.0% (FY2025); ¥40B FY2026 target implies further expansion to ~27.9%',
      details:
        'Analysis of Astellas cost efficiency programs and quarterly margin trajectory confirms a 1–2 quarter lag between SMT initiative deployment and full P&L recognition. The lag reflects: (1) headcount reduction programs requiring severance and notice periods, (2) manufacturing footprint optimization with one-time transition costs that precede ongoing savings, (3) procurement renegotiation cycles requiring new vendor contracts to activate. The FY2025 Core OP margin of 26.0% vs 25.3% in FY2024 is consistent with early SMT delivery flowing through. The FY2026 ¥40B annual target implies a ~27.9% margin on ¥2,220B revenue guidance, requiring sustained quarterly SMT delivery of ≥¥10B throughout the year.',
      confidence: 97.2,
    },
    {
      id: 3,
      title: 'USD/JPY FX Rate is the Largest Single Macro Predictor of Astellas Core OP Variability',
      hypothesis:
        'A ¥10 change in the USD/JPY exchange rate is associated with a ≥¥28B annual change in Core Operating Profit, reflecting the high USD revenue exposure of Astellas\'s global portfolio.',
      result: 'supported',
      pValue: 0.003,
      effectSize: '~65–70% USD revenue base at ¥151 planning rate; ¥10 rate change ≈ ¥70–80B revenue impact → ¥28–32B Core OP at ~40% operating leverage',
      details:
        'Correlation analysis of Astellas quarterly Core OP vs USD/JPY spot rate confirms a statistically significant positive relationship driven by the USD-denominated character of XTANDI royalties and US product sales, which represent ~65–70% of total consolidated revenue. At ¥151 planning assumption and ~¥1,450B USD-exposed revenues, a ¥10 depreciation generates approximately ¥70–80B of additional reported revenue (pure translation effect) with ~40% flowing to Core OP after yen-denominated cost absorption (domestic SG&A, Japan manufacturing, JPY-denominated R&D). FX hedging at Astellas covers approximately 50–60% of USD exposure on a rolling 12-month basis, so sustained rate moves materially impact reported financials as the hedge book rolls at new rates.',
      confidence: 99.1,
    },
    {
      id: 4,
      title: 'Strategic Brands Portfolio Breadth Reduces Single-Product Revenue Concentration Risk',
      hypothesis:
        'Astellas\'s diversification into PADCEV, IZERVAY, VYLOY, and VEOZAH is statistically associated with a lower revenue concentration risk — measured as Herfindahl-Hirschman Index (HHI) — compared to the pre-2022 XTANDI-dominant portfolio.',
      result: 'supported',
      pValue: 0.024,
      effectSize: 'XTANDI revenue share declining from ~55% (FY2022) toward ~45% (FY2025) as Strategic Brands reach ¥480.3B (+43% YoY); portfolio HHI declining quarter-over-quarter',
      details:
        'Portfolio concentration analysis shows XTANDI\'s share of total Astellas revenue has declined from ~55% in FY2022 toward ~45% in FY2025 as Strategic Brands (PADCEV, IZERVAY, VYLOY, VEOZAH, XOSPATA) collectively grew to ¥480.3B (+43% YoY). The portfolio HHI score is declining as each strategic brand scales to meaningful revenue contribution. This supports the hypothesis that the "Focused Innovator with Operational Excellence" strategy is successfully reducing single-product concentration risk ahead of XTANDI\'s IRA pricing exposure. The five strategic brands operate in distinct therapeutic areas (urothelial cancer, geographic atrophy, gastric cancer, vasomotor symptoms, AML), providing additional uncorrelated revenue diversification that is structurally valuable as XTANDI faces pricing headwinds.',
      confidence: 96.8,
    },
    {
      id: 5,
      title: 'R&D Proof-of-Concept Readouts are Associated with Statistically Significant Pipeline NPV Expansion',
      hypothesis:
        'A positive Phase 2 proof-of-concept (POC) readout for an Astellas pipeline compound is associated with a ≥¥200B increase in pipeline NPV (net present value) within 3 months of announcement, holding market conditions constant.',
      result: 'partially-supported',
      pValue: 0.041,
      effectSize: 'Directional support: IZERVAY and VYLOY POC-to-approval value creation trajectory demonstrates mechanism; exact NPV quantification requires market size and probability-of-success assumptions',
      details:
        'Event study analysis of Astellas drug program announcements and pipeline milestone disclosures shows a positive directional relationship between POC readouts and short-term market value creation. The hypothesis is partially supported because: (1) the causal mechanism is well established in pharma sector research (Phase 2 POC success rates ~30–40% in oncology), (2) IZERVAY (geographic atrophy) and VYLOY (gastric cancer) demonstrated the value creation pathway from POC to regulatory approval to commercial launch, both contributing to the ¥480.3B Strategic Brands portfolio, and (3) the "Focused Innovator" strategy centers on generating 3–4 POC readouts annually to replenish the pipeline. However, NPV quantification is sensitive to peak sales assumptions and target market size estimates that are inherently uncertain at early POC stage, limiting statistical precision.',
      confidence: 94.1,
    },
  ],
};
