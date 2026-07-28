// Natural-language scenario parser for Astellas Pharma Inc. (ALPMY)
// Outputs lever IDs that match the seeded ScenarioLever table
// (prisma/seeds/08-scenarios.ts) so values flow through /api/scenario into
// lib/scenario-engine.ts without translation.
//
// Lever vocabulary (externalId → unit, range, default):
//   xtandi-ira-price-reduction    % IRA cut   [0, 25]    default 0     (lower is better — 0 = no cut)
//   xtandi-volume-growth          % growth    [0, 15]    default 5.3   (higher is better)
//   strategic-brands-growth       % growth    [10, 70]   default 43.0  (higher is better)
//   smt-savings-fy26              ¥B savings  [15, 65]   default 40    (higher is better)
//   fx-usd-jpy                    ¥/USD       [130, 170] default 151   (lower = stronger yen = less favorable)
//   china-revenue-growth          % growth    [10, 60]   default 29.6  (higher is better)
//   rd-poc-success                count       [0, 6]     default 3     (higher is better)

export interface ParsedScenario {
    levers: Record<string, number>;
    explanation: string;
}

const SEMANTIC_GROUPS: Record<string, string[]> = {
    // XTANDI IRA price risk — US Inflation Reduction Act drug negotiation
    xtandiIRA: [
        'ira', 'inflation reduction act', 'drug negotiation', 'cms negotiation',
        'price negotiation', 'xtandi price', 'xtandi ira', 'negotiated price',
        'cms drug price', 'drug pricing', 'medicare negotiation', 'price cut',
        'enzalutamide price', 'xtandi discount', 'government pricing',
        'maximum fair price', 'mfp', 'part d negotiation',
    ],

    // XTANDI volume — global unit demand for enzalutamide
    xtandiVolume: [
        'xtandi', 'enzalutamide', 'prostate cancer', 'xtandi volume',
        'xtandi sales', 'xtandi growth', 'xtandi market share',
        'mcspc', 'mcrpc', 'nmcrpc', 'prostate', 'androgen receptor',
        'xtandi demand', 'xtandi units', 'xtandi new patients',
        'xtandi competition', 'arsi', 'androgen signaling',
        'apalutamide', 'darolutamide', 'erleada', 'nubeqa', 'xtandi vs',
    ],

    // Strategic Brands — PADCEV, IZERVAY, VYLOY, VEOZAH, XOSPATA portfolio
    strategicBrands: [
        'strategic brands', 'padcev', 'enfortumab vedotin', 'urothelial',
        'bladder cancer', 'adc', 'antibody drug conjugate',
        'izervay', 'avacincaptad pegol', 'geographic atrophy', 'ga',
        'vyloy', 'zolbetuximab', 'gastric cancer', 'claudin', 'claudin 18',
        'veozah', 'fezolinetant', 'vasomotor', 'hot flashes', 'menopause',
        'xospata', 'gilteritinib', 'aml', 'acute myeloid leukemia', 'flt3',
        'launch', 'new product', 'growth portfolio', 'oncology pipeline',
        'specialty portfolio', 'product launch', 'new indication',
    ],

    // SMT — Sustainable Margin Transformation cost savings
    smtSavings: [
        'smt', 'sustainable margin', 'cost savings', 'cost transformation',
        'sga reduction', 'operating efficiency', 'cost optimization',
        'restructuring', 'efficiency program', 'headcount reduction',
        'cost target', 'cost program', 'margin improvement', 'opex savings',
        'cost reduction', 'sg&a savings', 'smt target', 'smt savings',
        'cost discipline', 'smt delivery', 'operating leverage',
    ],

    // FX — USD/JPY exchange rate impact on JPY-reporting company
    fxRate: [
        'fx', 'foreign exchange', 'currency', 'yen', 'jpy', 'usd',
        'exchange rate', 'dollar', 'dollar yen', 'yen weakness', 'yen strength',
        'currency headwind', 'fx impact', 'fx tailwind', 'fx translation',
        'forex', 'currency risk', 'yen depreciation', 'yen appreciation',
        'dollar strengthens', 'dollar weakens', 'usd jpy', '¥', 'jpy usd',
        'currency translation', 'fx sensitivity',
    ],

    // China — revenue growth in China market
    chinaGrowth: [
        'china', 'chinese market', 'china revenue', 'china growth',
        'nhi', 'national health insurance', 'china formulary', 'vbp',
        'volume-based procurement', 'china launch', 'china pipeline',
        'china access', 'vyloy china', 'xtandi china', 'china expansion',
        'china market share', 'china sales', 'greater china',
    ],

    // R&D pipeline — POC achievements, phase 3 success rates
    rdPipeline: [
        'pipeline', 'r&d', 'rd', 'research', 'development', 'poc',
        'proof of concept', 'phase 3', 'phase 2', 'clinical trial',
        'regulatory approval', 'nda', 'bla', 'fda approval', 'ema approval',
        'new drug', 'pipeline success', 'trial readout', 'data readout',
        'drug development', 'clinical success', 'pipeline failure',
        'pipeline milestone', 'r&d productivity', 'drug discovery',
        'study results', 'efficacy', 'phase 2 readout',
    ],
};

const calculateMatchScore = (text: string, groupKey: string): number => {
    const group = SEMANTIC_GROUPS[groupKey];
    if (!group) return 0;
    const lowerText = text.toLowerCase();
    let score = 0;
    group.forEach(term => {
        if (lowerText.includes(term.toLowerCase())) {
            score += term.split(' ').length;
        }
    });
    return score;
};

const extractPercentage = (text: string): number | null => {
    const match = text.match(/(-?\d+(?:\.\d+)?)\s*%/);
    if (match) {
        const value = parseFloat(match[1]);
        if (!isNaN(value)) return value;
    }
    return null;
};

const extractYenAmount = (text: string): { value: number; unit: 'M' | 'B' } | null => {
    const billionMatch = text.match(/[¥¥]?\s*(-?\d+(?:\.\d+)?)\s*(?:b|bn|billion|兆|B)\b/i);
    if (billionMatch) return { value: parseFloat(billionMatch[1]), unit: 'B' };
    const millionMatch = text.match(/[¥¥]?\s*(-?\d+(?:\.\d+)?)\s*(?:m|mn|million|億|M)\b/i);
    if (millionMatch) return { value: parseFloat(millionMatch[1]), unit: 'M' };
    return null;
};

const extractExchangeRate = (text: string): number | null => {
    const rateMatch = text.match(/(\d{3}(?:\.\d+)?)\s*(?:yen|jpy|¥)?\s*(?:per|\/|to)?\s*(?:dollar|usd|\$)/i);
    if (rateMatch) return parseFloat(rateMatch[1]);
    const reverseMatch = text.match(/(?:dollar|usd|\$)\s*(?:at|to|=|of)?\s*(\d{3}(?:\.\d+)?)\s*(?:yen|jpy|¥)/i);
    if (reverseMatch) return parseFloat(reverseMatch[1]);
    // standalone 3-digit number in context of FX
    const standalone = text.match(/\b(1[2-7]\d(?:\.\d+)?)\b/);
    if (standalone) return parseFloat(standalone[1]);
    return null;
};

const extractCount = (text: string): number | null => {
    const countMatch = text.match(/(\d+)\s+(?:poc|proof.of.concept|phase.3|trial|program)/i);
    if (countMatch) return parseInt(countMatch[1], 10);
    return null;
};

const containsAny = (text: string, keywords: string[]): boolean => {
    const lowerText = text.toLowerCase();
    return keywords.some(kw => lowerText.includes(kw.toLowerCase()));
};

const isIncrease = (text: string): boolean =>
    containsAny(text, ['increase', 'rise', 'up', 'higher', 'grow', 'improve',
                        'gain', 'expand', 'boost', 'accelerate', 'recover', 'surge',
                        'strong', 'positive', 'bull', 'upside', 'favorable', 'better',
                        'outperform', 'exceed', 'beat', 'above', 'strength']);

const isDecrease = (text: string): boolean =>
    containsAny(text, ['decrease', 'decline', 'down', 'lower', 'fall', 'drop', 'reduce',
                        'cut', 'weak', 'slump', 'miss', 'disappoint', 'slow', 'bear',
                        'downside', 'headwind', 'pullback', 'delay', 'adverse', 'worsen',
                        'unfavorable', 'pressure', 'deteriorat', 'compress', 'risk',
                        'underperform', 'below', 'miss']);

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

// Lever ranges — must exactly match externalId/min/max in prisma/seeds/08-scenarios.ts
const RANGES: Record<string, [number, number]> = {
    'xtandi-ira-price-reduction':  [0, 25],
    'xtandi-volume-growth':        [0, 15],
    'strategic-brands-growth':     [10, 70],
    'smt-savings-fy26':            [15, 65],
    'fx-usd-jpy':                  [130, 170],
    'china-revenue-growth':        [10, 60],
    'rd-poc-success':              [0, 6],
};

const DEFAULTS: Record<string, number> = {
    'xtandi-ira-price-reduction':  0,
    'xtandi-volume-growth':        5.3,
    'strategic-brands-growth':     43.0,
    'smt-savings-fy26':            40,
    'fx-usd-jpy':                  151,
    'china-revenue-growth':        29.6,
    'rd-poc-success':              3,
};

const set = (levers: Record<string, number>, id: string, value: number) => {
    const [min, max] = RANGES[id] ?? [-9999, 9999];
    levers[id] = clamp(value, min, max);
};

export const parseScenarioFromText = (text: string): ParsedScenario => {
    const lower = text.toLowerCase();
    const levers: Record<string, number> = {};
    const explanations: string[] = [];

    const pct = extractPercentage(lower);
    const yen = extractYenAmount(lower);
    const fxRate = extractExchangeRate(lower);
    const pocCount = extractCount(lower);

    const scores: Record<string, number> = {};
    Object.keys(SEMANTIC_GROUPS).forEach(g => { scores[g] = calculateMatchScore(lower, g); });

    const hasIncrease = isIncrease(lower);
    const hasDecrease = isDecrease(lower);
    // direction: +1 = favorable outcome described; -1 = adverse/worsening
    const direction = hasDecrease && !hasIncrease ? -1 : 1;

    // 1. XTANDI IRA Price Reduction — 0 is favorable (no cut); higher cut = more adverse
    if (scores.xtandiIRA > 0) {
        let iraCut: number;
        if (pct !== null && pct >= 0 && pct <= 30) {
            iraCut = clamp(pct, 0, 25);
        } else if (direction > 0) {
            // "No IRA cut", "IRA risk mitigated", "favorable IRA outcome"
            iraCut = containsAny(lower, ['none', 'no cut', 'exempt', 'mitigat', 'no impact']) ? 0 : 5;
        } else {
            // "IRA price cut", "negotiation risk", "price reduction"
            iraCut = containsAny(lower, ['severe', 'large', 'significant', '20', 'twenty']) ? 20 : 12;
        }
        set(levers, 'xtandi-ira-price-reduction', iraCut);
        const revenueImpact = iraCut * 9.608; // ¥9,608M per 1pp (¥960.8B × 1%)
        explanations.push(`Set XTANDI IRA net price reduction to ${iraCut}% (≈ ¥${revenueImpact.toFixed(0)}B revenue impact; 0% = no IRA cut, FY2026 bear case ≈ 15-20%)`);
    }

    // 2. XTANDI Volume Growth — higher is favorable
    if (scores.xtandiVolume > 1 && scores.xtandiIRA <= scores.xtandiVolume) {
        let volGrowth: number;
        if (pct !== null && pct >= 0 && pct <= 15) {
            volGrowth = clamp(pct, 0, 15);
        } else if (direction > 0) {
            volGrowth = containsAny(lower, ['strong', 'above', 'outperform', 'accelerate']) ? 8.0 : 6.5;
        } else {
            // Competition from apalutamide/darolutamide
            volGrowth = containsAny(lower, ['competition', 'arsi', 'erleada', 'nubeqa']) ? 1.5 : 3.0;
        }
        set(levers, 'xtandi-volume-growth', volGrowth);
        const revenueImpact = volGrowth * 9.608;
        explanations.push(`Set XTANDI global volume growth to ${volGrowth}% (≈ ¥${revenueImpact.toFixed(0)}B revenue; FY2025 actual: +5.3%)`);
    }

    // 3. Strategic Brands Growth — higher is favorable
    if (scores.strategicBrands > 0) {
        let brandGrowth: number;
        if (pct !== null && pct >= 10 && pct <= 70) {
            brandGrowth = clamp(pct, 10, 70);
        } else if (direction > 0) {
            brandGrowth = containsAny(lower, ['accelerate', 'strong', 'above', 'beat']) ? 55.0 : 48.0;
        } else {
            brandGrowth = containsAny(lower, ['slow', 'miss', 'disappoint', 'below']) ? 28.0 : 35.0;
        }
        set(levers, 'strategic-brands-growth', brandGrowth);
        const revenueImpact = ((brandGrowth - DEFAULTS['strategic-brands-growth']) / 100) * 480.3;
        const sign = revenueImpact >= 0 ? '+' : '';
        explanations.push(`Set Strategic Brands combined growth to ${brandGrowth}% YoY (${sign}¥${revenueImpact.toFixed(1)}B vs FY2025 +43% baseline; target ¥610B)`);
    }

    // 4. SMT Savings — higher is favorable
    if (scores.smtSavings > 1) {
        let smtBn: number;
        if (yen) {
            smtBn = yen.unit === 'B' ? clamp(yen.value, 15, 65) : clamp(yen.value / 1000, 15, 65);
        } else if (pct !== null) {
            // User said "SMT up X%" — interpret as delta from ¥40B target
            smtBn = clamp(DEFAULTS['smt-savings-fy26'] * (1 + direction * pct / 100), 15, 65);
        } else if (direction > 0) {
            smtBn = containsAny(lower, ['exceed', 'above', 'beat', 'more']) ? 50 : 45;
        } else {
            smtBn = containsAny(lower, ['miss', 'below', 'shortfall', 'delay']) ? 25 : 32;
        }
        set(levers, 'smt-savings-fy26', smtBn);
        const delta = smtBn - DEFAULTS['smt-savings-fy26'];
        const sign = delta >= 0 ? '+' : '';
        explanations.push(`Set FY2026 SMT savings to ¥${smtBn}B (${sign}¥${delta}B vs ¥40B target; cumulative 2-year target ¥65B)`);
    }

    // 5. FX Rate — USD/JPY (higher ¥/$ = weaker yen = more favorable for Astellas JPY reporting)
    if (scores.fxRate > 0) {
        let rate: number;
        if (fxRate !== null && fxRate >= 130 && fxRate <= 175) {
            rate = clamp(fxRate, 130, 170);
        } else if (pct !== null) {
            // "Yen strengthens X%" — yen strengthen = lower rate number
            rate = direction > 0
                ? clamp(DEFAULTS['fx-usd-jpy'] * (1 + pct / 100), 130, 170) // weaker yen = higher number = favorable
                : clamp(DEFAULTS['fx-usd-jpy'] * (1 - pct / 100), 130, 170); // stronger yen = lower = headwind
        } else if (containsAny(lower, ['yen weakness', 'weak yen', 'yen depreciat', 'dollar strength'])) {
            rate = 160;
        } else if (containsAny(lower, ['yen strength', 'strong yen', 'yen appreciat', 'dollar weakness'])) {
            rate = 140;
        } else if (direction > 0) {
            rate = 158; // weaker yen = FX tailwind for Astellas
        } else {
            rate = 144; // stronger yen = FX headwind
        }
        set(levers, 'fx-usd-jpy', rate);
        const delta = rate - DEFAULTS['fx-usd-jpy'];
        const sign = delta >= 0 ? '+' : '';
        const revenueImpact = delta * 2.139; // ¥2,139M per ¥1 move
        explanations.push(`Set USD/JPY to ¥${rate} (${sign}¥${delta} vs ¥${DEFAULTS['fx-usd-jpy']} FY2025 avg; ≈ ${sign}¥${revenueImpact.toFixed(0)}B translation revenue impact)`);
    }

    // 6. China Revenue Growth — higher is favorable
    if (scores.chinaGrowth > 0) {
        let chinaGrowth: number;
        if (pct !== null && pct >= 10 && pct <= 60) {
            chinaGrowth = clamp(pct, 10, 60);
        } else if (direction > 0) {
            chinaGrowth = containsAny(lower, ['strong', 'accelerate', 'nhi', 'formulary', 'approval']) ? 45.0 : 36.0;
        } else {
            chinaGrowth = containsAny(lower, ['vbp', 'volume-based', 'pricing pressure', 'slow']) ? 12.0 : 18.0;
        }
        set(levers, 'china-revenue-growth', chinaGrowth);
        const revenueImpact = ((chinaGrowth - DEFAULTS['china-revenue-growth']) / 100) * 101.5;
        const sign = revenueImpact >= 0 ? '+' : '';
        explanations.push(`Set China revenue growth to ${chinaGrowth}% (${sign}¥${revenueImpact.toFixed(1)}B vs +29.6% FY2025 actual; base ¥101.5B)`);
    }

    // 7. R&D Pipeline POC Success — higher is favorable
    if (scores.rdPipeline > 1) {
        let pocSuccesses: number;
        if (pocCount !== null) {
            pocSuccesses = clamp(pocCount, 0, 6);
        } else if (direction > 0) {
            pocSuccesses = containsAny(lower, ['multiple', 'several', 'strong', '4', 'four', '5', 'five']) ? 5 : 4;
        } else {
            pocSuccesses = containsAny(lower, ['fail', 'miss', 'disappoint', '0', '1', 'one']) ? 1 : 2;
        }
        set(levers, 'rd-poc-success', pocSuccesses);
        explanations.push(`Set R&D POC successes to ${pocSuccesses} programs (FY2025 actual: 3; each POC ≈ ¥15B R&D cost avoidance on failures averted)`);
    }

    // BROAD MACRO SCENARIO — when no specific lever matched
    if (Object.keys(levers).length === 0) {
        if (containsAny(lower, ['recession', 'downturn', 'slowdown', 'crisis', 'macro headwind'])) {
            set(levers, 'xtandi-volume-growth', 2.0);
            set(levers, 'strategic-brands-growth', 28.0);
            set(levers, 'fx-usd-jpy', 145); // yen strengthens in risk-off
            set(levers, 'smt-savings-fy26', 35);
            explanations.push('Modeled macro downturn: XTANDI volume deceleration, Strategic Brands slowdown, yen strength headwind, partial SMT execution');
        } else if (containsAny(lower, ['recovery', 'bull', 'upside', 'favorable', 'strong quarter'])) {
            set(levers, 'xtandi-volume-growth', 8.0);
            set(levers, 'strategic-brands-growth', 55.0);
            set(levers, 'smt-savings-fy26', 48);
            set(levers, 'china-revenue-growth', 40.0);
            explanations.push('Modeled upside scenario: XTANDI volume acceleration, Strategic Brands outperformance, SMT delivery above target, China expansion');
        } else if (containsAny(lower, ['ira', 'drug pricing', 'cms', 'policy risk'])) {
            set(levers, 'xtandi-ira-price-reduction', 15);
            set(levers, 'xtandi-volume-growth', 3.5); // volume offset partially
            set(levers, 'strategic-brands-growth', 50.0); // pivot to Strategic Brands
            explanations.push('Modeled IRA risk scenario: XTANDI 15% price cut, volume acceleration to offset, accelerated Strategic Brands pivot');
        }
    }

    // FALLBACK: apply highest-scoring concept
    if (Object.keys(levers).length === 0) {
        const sorted = Object.entries(scores)
            .filter(([, s]) => s > 0)
            .sort(([, a], [, b]) => b - a);

        if (sorted.length > 0) {
            const [topConcept] = sorted[0];
            const conceptToLever: Record<string, string> = {
                xtandiIRA: 'xtandi-ira-price-reduction',
                xtandiVolume: 'xtandi-volume-growth',
                strategicBrands: 'strategic-brands-growth',
                smtSavings: 'smt-savings-fy26',
                fxRate: 'fx-usd-jpy',
                chinaGrowth: 'china-revenue-growth',
                rdPipeline: 'rd-poc-success',
            };
            const leverId = conceptToLever[topConcept];
            if (leverId) {
                const def = DEFAULTS[leverId];
                const [min, max] = RANGES[leverId];
                const range = max - min;
                // IRA cut: adverse = higher; others: adverse = lower
                const isAdverseLever = leverId === 'xtandi-ira-price-reduction' || leverId === 'fx-usd-jpy';
                const adjVal = isAdverseLever
                    ? (direction > 0 ? clamp(def - range * 0.15, min, max) : clamp(def + range * 0.15, min, max))
                    : (direction > 0 ? clamp(def + range * 0.15, min, max) : clamp(def - range * 0.15, min, max));
                set(levers, leverId, adjVal);
                explanations.push(`Inferred ${direction > 0 ? 'favorable' : 'adverse'} adjustment to ${leverId.replace(/-/g, ' ')} (${adjVal.toFixed(2)} vs default ${def})`);
            }
        }
    }

    const explanation = explanations.length > 0
        ? explanations.join('. ')
        : 'Analyzed scenario and adjusted relevant levers based on key Astellas Pharma factors identified.';

    return { levers, explanation };
};
