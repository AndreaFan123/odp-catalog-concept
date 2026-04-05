/**
 * categories.ts — Hardcoded category taxonomy for the ODP catalog.
 *
 * Categories are derived from common keyword patterns observed in
 * Hub Ocean STAC API responses. Each category maps to a set of
 * keywords used for substring matching against collection.keywords.
 *
 * Design decision DD-09: clickable labels as filter triggers.
 * These category chips complement keyword search — they provide
 * non-engineer users with discoverable, domain-meaningful entry points
 * into the catalog without requiring knowledge of specific terms.
 */

export interface Category {
  id: string
  label: string
  keywords: string[]  // used for substring matching against collection.keywords
}

export const CATEGORIES: Category[] = [
  {
    id: 'biodiversity',
    label: 'Biodiversity & Species',
    keywords: [
      'species', 'mammal', 'whale', 'turtle', 'fish',
      'coral', 'benthos', 'biota', 'biodiversity',
      'marine ecology', 'habitat', 'bird', 'seal', 'penguin',
    ],
  },
  {
    id: 'ocean-physics',
    label: 'Ocean Physics',
    keywords: [
      'ctd', 'temperature', 'salinity', 'current',
      'wave', 'metocean', 'oceanographic', 'physics',
      'water column', 'bathymetry', 'sea level', 'pressure',
    ],
  },
  {
    id: 'acoustics',
    label: 'Acoustics & Fisheries',
    keywords: [
      'acoustic', 'echosounder', 'krill', 'fishery',
      'sonar', 'echogram', 'EK60', 'EK80', 'fish stock',
    ],
  },
  {
    id: 'mpa',
    label: 'Marine Protected Areas',
    keywords: [
      'MPA', 'marine protected', 'conservation',
      'fishing protection', 'management', 'restriction',
      '30x30', 'sanctuary',
    ],
  },
  {
    id: 'industry',
    label: 'Industry & Offshore',
    keywords: [
      'industry', 'offshore', 'oil', 'platform',
      'hydrocarbon', 'North Sea', 'Norwegian', 'shipping',
      'energy', 'wind farm',
    ],
  },
  {
    id: 'coral',
    label: 'Coral & Reef',
    keywords: [
      'coral', 'reef', 'benthic', 'carbonate',
      'rhodolith', 'cold-water coral', 'atoll',
    ],
  },
]

/**
 * Returns true if any of the collection's keywords match any of the
 * category's keywords (case-insensitive substring match).
 */
export function matchesCategory(
  collection: { keywords?: string[] },
  category: Category,
): boolean {
  const kws = (collection.keywords ?? []).map((k) => k.toLowerCase())
  return category.keywords.some((ck) =>
    kws.some((k) => k.includes(ck.toLowerCase())),
  )
}
