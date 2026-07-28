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
      title: 'SMT Cost Savings Are the Primary Predictor of Core Operating Margin Expansion',
      hypothesis:
        'Each ¥10B of incremental SMT savings is associated with a ≥0.45 percentage-point improvement in Core Operating Margin, holding revenue growth constant.',
      result: 'supported',
      pValue: 0.003,
      effectSize: 'FY2025 SMT ¥21B → Core OP margin 26.0%; FY2026 target ¥40B → modeled 27.0%+',
      details:
        'Regression of Core OP margin on SMT savings across semi-annual periods confirms a statistically significant positive relationship. At ¥2,139B revenue, each ¥10B of annual savings = ~0.47ppt Core OP margin improvement. The FY2025 achievement of ¥21B savings (vs ¥0 baseline) is consistent with a ~1ppt margin improvement vs pre-SMT trajectory. FY2026 target ¥40B implies a cumulative ~1.9ppt margin lift from SMT alone — which, combined with operating leverage from PADCEV/VEOZAH revenue growth, supports management guidance of Core OP ¥580B+ on ¥2,200B revenue (26.4%) and further improvement toward 28%+ in FY2027. SMT workstreams (procurement, manufacturing, commercial SG&A, G&A) each contribute independent margin effects.',
      confidence: 99.7,
    },
    {
      id: 2,
      title: 'XTANDI Volume Growth in Non-Medicare Populations Offsets IRA Price Negotiation Impact',
      hypothesis:
        'A 5 percentage-point increase in XTANDI volume in non-Part D populations (commercial, VA, international) within 2 quarters of the IRA price negotiation effective date offsets ≥50% of the CMS price reduction revenue impact.',
      result: 'partially-supported',
      pValue: 0.038,
      effectSize: 'Directional support: XTANDI nmCRPC/mCSPC label expansions drive non-Part D volume growth; IRA impact partially offset',
      details:
        'Analysis of XTANDI prescription data by payer channel following the IRA Medicare price negotiation announcement shows a statistically meaningful increase in commercial and VA channel prescriptions, consistent with physician prescribing optimization to avoid Part D formulary restrictions. The mechanism: oncologists shift eligible patients to commercial formulary where XTANDI net pricing is not subject to CMS negotiation. However, the majority of advanced prostate cancer patients are Medicare-eligible (average age >70), limiting the non-Part D volume growth ceiling. Estimated offset: 40–60% of IRA price headwind (¥9.6B per 1pp) can be recovered through volume and channel mix shifts within 2–3 quarters. International market expansion (Korea, Brazil) provides additional offset. Full hypothesis support requires IRA price cut to be <15pp to remain within manageable range.',
      confidence: 94.8,
    },
    {
      id: 3,
      title: 'PADCEV First-Line Adoption Rate Leads VEOZAH Prescriber Breadth Expansion by 1–2 Quarters',
      hypothesis:
        'Astellas commercial field force productivity improvements from PADCEV 1L bladder cancer launch are associated with a statistically significant increase in VEOZAH new prescriber accounts within 1–2 quarters, due to shared urology/oncology call routing.',
      result: 'supported',
      pValue: 0.019,
      effectSize: 'PADCEV 1L launch and VEOZAH prescriber base growth both accelerating in overlapping physician segments',
      details:
        'Astellas field force serves overlapping specialist physician networks: PADCEV targets urologic oncologists and medical oncologists; VEOZAH targets OB/GYN and primary care physicians with some overlap in academic medical centers. Analysis of prescriber-level data shows a 1–2 quarter lag between PADCEV 1L adoption in a given account and VEOZAH introduction into that same institution — consistent with account relationship depth created by PADCEV commercial success increasing Astellas institutional credibility. Additionally, health system formulary committee approvals for PADCEV appear to accelerate VEOZAH formulary consideration. The correlation coefficient (r=0.68) is statistically significant after controlling for account size, specialty mix, and geography. This supports the strategic rationale for investment in both products simultaneously.',
      confidence: 98.1,
    },
    {
      id: 4,
      title: 'Japan NHI Biennial Price Revisions Are Partially Self-Correcting Through Volume Response',
      hypothesis:
        'Astellas Japan segment revenue recovers ≥40% of each biennial NHI price cut within 12 months through net volume growth from new indication approvals and broader prescriber adoption.',
      result: 'supported',
      pValue: 0.011,
      effectSize: 'Post-April 2026 NHI revision: XTANDI mCSPC/nmCRPC volume growth expected to recover ~45% of price cut within 4 quarters',
      details:
        'Historical analysis of prior Astellas Japan NHI price revisions (2022, 2024) confirms a consistent volume response: lower NHI prices expand formulary access, reduce physician hesitation for higher-cost therapies, and trigger broader indication adoption. The mechanism is particularly strong for oncology agents where clinicians were previously price-sensitive about adding XTANDI to regimens for patients on multiple drugs. The April 2026 NHI revision (avg −3.5%) follows this pattern — Astellas Japan team models ~45% revenue recovery within 4 quarters through XTANDI mCSPC label expansion volume and Prograf generic displacement being smaller than industry average (Astellas has strong physician loyalty program). Full volume recovery takes 12–18 months, which is consistent with the hypothesis threshold. VEOZAH Japan NDA approval (expected FY2026) will provide additional incremental revenue to offset revision impact.',
      confidence: 97.5,
    },
    {
      id: 5,
      title: 'PADCEV + Pembrolizumab Combination Therapy Durable Responses Support Premium Pricing Sustainability',
      hypothesis:
        'PADCEV plus pembrolizumab (enfortumab vedotin + pembrolizumab) combination therapy in 1L urothelial carcinoma is associated with statistically superior overall survival vs cisplatin-based chemotherapy, supporting premium pricing and reimbursement sustainability across major markets.',
      result: 'supported',
      pValue: 0.001,
      effectSize: 'KEYNOTE-869 Phase 3 data: OS benefit HR ~0.47 vs chemotherapy; supports premium pricing across EU and U.S. payer reviews',
      details:
        'KEYNOTE-869 Phase 3 trial (PADCEV + pembro vs cisplatin-based chemotherapy in 1L cisplatin-eligible urothelial carcinoma) demonstrated an overall survival hazard ratio of approximately 0.47 — a >50% reduction in risk of death — with statistical significance well below p=0.01. This level of clinical benefit supports premium pricing defense against payer pushback in the U.S. and EU health technology assessment (NICE, HAS, G-BA) reviews. The durability of response is particularly important: durable OS benefit differentiates PADCEV+pembro from competing ADC+IO combinations. Astellas and Pfizer are leveraging KEYNOTE-869 data proactively in reimbursement negotiations. The hypothesis is directly relevant to PADCEV pricing sustainability — the primary concern in bear scenarios — and the evidence strongly supports continued premium pricing access.',
      confidence: 99.9,
    },
  ],
};
