/**
 * mockDatasetData.ts
 *
 * Individual dataset detail records sourced from Hub Ocean Catalog API v2
 * (endpoint: /api/catalog/v2/data-collections/{uuid}/datasets/{uuid}).
 * That endpoint requires authentication (401 without token),
 * so this file stores the data as static mock for portfolio use.
 *
 * Each MockDataset corresponds to a row in the "Datasets in this collection"
 * section of the CollectionDetailPage. Datasets with a MockDataset entry
 * get an internal route (/datasets/:id); others link externally.
 */

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface MockDatasetFormat {
  count: number
  total_size: number
}

export interface MockDatasetFiles {
  num_files: number
  total_byte_size: number
  formats: Record<string, MockDatasetFormat>
}

export interface MockDatasetTabularMetadata {
  files: MockDatasetFiles
}

export interface MockDataset {
  id: string
  name: string
  description: string
  provider: {
    name: string
    website: string
    description: string
  }
  citations: { text: string; link: string }[]
  license: {
    name: string
    url: string
    text: string
  }
  tags: string[]
  publish_status: 'draft' | 'published'
  collection: {
    id: string
    name: string
  }
  tabular_metadata: MockDatasetTabularMetadata
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_DATASETS: Record<string, MockDataset> = {

  // ── Aker BioMarine Antarctic Provider 2022 ────────────────────────────────
  'f77ce947-4d8e-4f9a-b021-3e8c7f2d1a09': {
    id: 'f77ce947-4d8e-4f9a-b021-3e8c7f2d1a09',
    name: 'Aker BioMarine Antarctic Provider 2022',
    description:
      'A collection of acoustic data on Antarctic Krill gathered by Aker BioMarine\'s fishing missions to the Southern Ocean during the 2022 Antarctic season, recorded by the fishing vessel Antarctic Provider.',
    provider: {
      name: 'HUB Ocean',
      website: 'https://www.hubocean.earth/',
      description:
        'HUB Ocean is a non-profit tech foundation working to change the fate of the ocean by unlocking the power of data.',
    },
    citations: [
      {
        text: 'EK60, EK80 Ecosounder AKBM data, provided by Aker BioMarine, licensed under ODC-BY 1.0',
        link: '',
      },
    ],
    license: {
      name: 'ODC-BY 1.0',
      url: 'https://opendatacommons.org/licenses/by/1-0/',
      text: 'Open Data Commons Attribution License v1.0',
    },
    tags: ['krill', 'Southern Ocean', 'Antarctica', 'echosounder', 'EK60', 'EK80'],
    publish_status: 'published',
    collection: {
      id: '7c61c869-a7c1-4f1c-900e-34636ee3392a',
      name: 'Aker BioMarine EK60, EK80 Echosounder data',
    },
    tabular_metadata: {
      files: {
        num_files: 498,
        total_byte_size: 2130706432, // ~2.0 GB
        formats: {
          raw: { count: 496, total_size: 2128580608 },
          unknown: { count: 2, total_size: 2125824 },
        },
      },
    },
  },

  // ── Aker BioMarine Saga Sea 2022 ──────────────────────────────────────────
  '097cf084-bf6b-48e1-84c0-754773045a21': {
    id: '097cf084-bf6b-48e1-84c0-754773045a21',
    name: 'Aker BioMarine Saga Sea 2022',
    description:
      'A collection of acoustic data on Antarctic Krill gathered by Aker BioMarine\'s fishing missions to the Southern Ocean during the 2022 Antarctic season, recorded by the fishing vessel Saga Sea.',
    provider: {
      name: 'HUB Ocean',
      website: 'https://www.hubocean.earth/',
      description:
        'HUB Ocean is a non-profit tech foundation working to change the fate of the ocean by unlocking the power of data.',
    },
    citations: [
      {
        text: 'EK60, EK80 Ecosounder AKBM data, provided by Aker BioMarine, licensed under ODC-BY 1.0',
        link: '',
      },
    ],
    license: {
      name: 'ODC-BY 1.0',
      url: 'https://opendatacommons.org/licenses/by/1-0/',
      text: 'Open Data Commons Attribution License v1.0',
    },
    tags: ['krill', 'Southern Ocean', 'Antarctica', 'echosounder', 'EK60', 'EK80'],
    publish_status: 'draft',
    collection: {
      id: '7c61c869-a7c1-4f1c-900e-34636ee3392a',
      name: 'Aker BioMarine EK60, EK80 Echosounder data',
    },
    tabular_metadata: {
      files: {
        num_files: 412,
        total_byte_size: 1873642240, // ~1.7 GB
        formats: {
          raw: { count: 411, total_size: 1872771088 },
          unknown: { count: 1, total_size: 871152 },
        },
      },
    },
  },
}

// ─── Accessor ─────────────────────────────────────────────────────────────────

export function getMockDataset(id: string): MockDataset | null {
  return MOCK_DATASETS[id] ?? null
}
