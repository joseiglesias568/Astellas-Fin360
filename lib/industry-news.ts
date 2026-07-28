/**
 * Shared types + offline fallback for the pharmaceutical industry news ticker.
 * Live headlines are loaded via `/api/industry-news` (RSS aggregation).
 */

export interface IndustryNewsItem {
    title: string;
    link: string;
    /** Feed label shown in the ticker */
    source: string;
    /** ISO date string when known */
    publishedAt: string | null;
}

/** Shown when RSS feeds are unreachable or return no usable items. */
export const INDUSTRY_NEWS_FALLBACK: IndustryNewsItem[] = [
    {
        title:
            'Offline preview — connect to load live pharmaceutical industry headlines from public RSS (Fierce Pharma + Google News).',
        link: 'https://news.google.com/search?q=Astellas+XTANDI+PADCEV+oncology+pharma&hl=en-US&gl=US&ceid=US:en',
        source: 'System',
        publishedAt: null,
    },
    {
        title: 'FDA, EMA, and PMDA publish drug approvals, label updates, and clinical guidance on oncology products including XTANDI, PADCEV, and VYLOY on an ongoing basis.',
        link: 'https://www.fda.gov/drugs/drug-approvals-and-databases/drug-approvals-news',
        source: 'Industry note',
        publishedAt: null,
    },
    {
        title: 'Astellas discusses XTANDI IRA pricing, Strategic Brands growth, SMT savings delivery, and pipeline milestones each quarter on earnings calls and in TSE filings.',
        link: 'https://www.astellas.com/en/investors/',
        source: 'Research anchor',
        publishedAt: null,
    },
];
