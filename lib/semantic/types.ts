// ════════════════════════════════════════════════════════════════════════════
// ASTELLAS PHARMA INC. — BUSINESS ARCHITECTURE — TYPE DEFINITIONS
// ════════════════════════════════════════════════════════════════════════════

export interface SemanticMetric {
    id: string;
    name: string;
    description: string;
    unit: 'currency' | 'percent' | 'count' | 'ratio' | 'time' | 'score' | 'index' | 'text';
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'semi-annual' | 'event';
    currentValue?: string;
    target?: string;
    direction: 'higher_is_better' | 'lower_is_better' | 'on_target';
}

export interface SemanticDriver {
    id: string;
    name: string;
    description: string;
    metrics?: SemanticMetric[];
    children?: SemanticDriver[];
    crossReferences?: string[]; // IDs of related drivers in other consoles
}

// Segment categories for Astellas Pharma Inc.:
//   - 'consumer'      : Oncology & XTANDI Performance (largest product franchise)
//   - 'business'      : Strategic Brands Growth (PADCEV, IZERVAY, VYLOY, VEOZAH, XOSPATA)
//   - 'network'       : Americas Performance (US + Canada commercial operations)
//   - 'strategy'      : International & Asia Performance (EU, Japan, China, Intl Markets)
//   - 'finance'       : Pipeline & Commercial Excellence (R&D, SMT, capital allocation)
//   - 'corporate'     : Corporate functions (people, compliance, ESG)
//   - 'cross-cutting' : Cross-functional (regulatory, market access, sustainability)
export interface SemanticConsole {
    id: string;
    title: string;
    category: string;
    segment: 'consumer' | 'business' | 'network' | 'strategy' | 'finance' | 'corporate' | 'cross-cutting' | 'iet' | 'ofse';
    objective: string;
    drivers: SemanticDriver[];
}
