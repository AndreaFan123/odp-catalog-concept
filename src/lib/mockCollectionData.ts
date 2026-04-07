/**
 * mockCollectionData.ts
 *
 * Structured dataset listings sourced from Hub Ocean Catalog API v2
 * (endpoint: /api/catalog/v2/data-collections/{uuid}).
 * That endpoint requires authentication (401 without token),
 * so this file stores the data as static mock for portfolio use.
 *
 * Collection included: Aker BioMarine EK60, EK80 Echosounder data
 */

export interface CatalogDataset {
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
  collection: { id: string }
}

export interface CatalogCollection {
  id: string
  name: string
  description: string
  datasets: CatalogDataset[]
}

export const MOCK_COLLECTIONS: Record<string, CatalogCollection> = {
  '7c61c869-a7c1-4f1c-900e-34636ee3392a': {
    id: '7c61c869-a7c1-4f1c-900e-34636ee3392a',
    name: 'Aker BioMarine EK60, EK80 Echosounder data',
    description: 'EK60, EK80 Ecosounder data collection from the Southern Ocean privately owned by the Krill fishing company Aker Biomarine, shared for scientific use.',
    datasets: [
      {
        id: 'f77ce947-4d8e-4f9a-b021-3e8c7f2d1a09',
        name: 'Aker BioMarine Antarctic Provider 2022',
        description: 'A collection of acoustic data on Antarctic Krill, gathered by Aker BioMarine\'s fishing missions to the Southern Ocean during the 2022 Antarctic season, recorded by the vessel Antarctic Provider.',
        provider: {
          name: 'HUB Ocean',
          website: 'https://www.hubocean.earth/',
          description: 'HUB Ocean is a non-profit tech foundation working to change the fate of the ocean by unlocking the power of data.',
        },
        citations: [{
          text: 'EK60, EK80 Ecosounder AKBM data, provided by Aker BioMarine, licensed under ODC-BY 1.0',
          link: '',
        }],
        license: {
          name: 'ODC-BY 1.0',
          url: 'https://opendatacommons.org/licenses/by/1-0/',
          text: 'Open Data Commons Attribution License v1.0',
        },
        tags: ['krill', 'Southern Ocean', 'Antarctica', 'echosounder', 'EK60', 'EK80'],
        publish_status: 'published',
        collection: { id: '7c61c869-a7c1-4f1c-900e-34636ee3392a' },
      },
      {
        id: '097cf084-bf6b-48e1-84c0-754773045a21',
        name: 'Aker BioMarine Saga Sea 2022',
        description: 'A collection of 10 years of acoustic data on Antarctic Krill, gathered by Aker BioMarine\'s fishing missions to the Southern Ocean.',
        provider: {
          name: 'HUB Ocean',
          website: 'https://www.hubocean.earth/',
          description: 'HUB Ocean is a non-profit tech foundation working to change the fate of the ocean by unlocking the power of data.',
        },
        citations: [{
          text: 'EK60, EK80 Ecosounder AKBM data, provided by Aker BioMarine, licensed under ODC-BY 1.0',
          link: '',
        }],
        license: {
          name: 'ODC-BY 1.0',
          url: 'https://opendatacommons.org/licenses/by/1-0/',
          text: 'Open Data Commons Attribution License v1.0',
        },
        tags: ['krill', 'Southern Ocean', 'Antarctica', 'echosounder', 'EK60', 'EK80'],
        publish_status: 'draft',
        collection: { id: '7c61c869-a7c1-4f1c-900e-34636ee3392a' },
      },
      {
        id: 'fe083625-a880-4469-b12c-66a331a8a960',
        name: 'Aker BioMarine Antarctic Sea 2017',
        description: 'A collection of 10 years of acoustic data on Antarctic Krill, gathered by Aker BioMarine\'s fishing missions to the Southern Ocean.',
        provider: {
          name: 'HUB Ocean',
          website: 'https://www.hubocean.earth/',
          description: 'HUB Ocean is a non-profit tech foundation.',
        },
        citations: [{ text: 'EK60, EK80 Ecosounder AKBM data, provided by Aker BioMarine, licensed under ODC-BY 1.0', link: '' }],
        license: { name: 'ODC-BY 1.0', url: 'https://opendatacommons.org/licenses/by/1-0/', text: 'Open Data Commons Attribution License v1.0' },
        tags: ['krill', 'Southern Ocean', 'Antarctica', 'echosounder'],
        publish_status: 'draft',
        collection: { id: '7c61c869-a7c1-4f1c-900e-34636ee3392a' },
      },
      {
        id: 'b81ea9ac-1c64-46cf-9c80-82503737ce3a',
        name: 'Aker BioMarine Endurance 2022',
        description: 'A collection of 10 years of acoustic data on Antarctic Krill, gathered by Aker BioMarine\'s fishing missions to the Southern Ocean.',
        provider: {
          name: 'HUB Ocean',
          website: 'https://www.hubocean.earth/',
          description: 'HUB Ocean is a non-profit tech foundation.',
        },
        citations: [{ text: 'EK60, EK80 Ecosounder AKBM data, provided by Aker BioMarine, licensed under ODC-BY 1.0', link: '' }],
        license: { name: 'ODC-BY 1.0', url: 'https://opendatacommons.org/licenses/by/1-0/', text: 'Open Data Commons Attribution License v1.0' },
        tags: ['krill', 'Southern Ocean', 'Antarctica', 'echosounder'],
        publish_status: 'draft',
        collection: { id: '7c61c869-a7c1-4f1c-900e-34636ee3392a' },
      },
      {
        id: 'ad5536fd-a2bb-4b2b-935a-c4a406d9a5ad',
        name: 'Aker BioMarine Antarctic Sea 2020',
        description: 'A collection of 10 years of acoustic data on Antarctic Krill.',
        provider: {
          name: 'HUB Ocean',
          website: 'https://www.hubocean.earth/',
          description: 'HUB Ocean is a non-profit tech foundation.',
        },
        citations: [{ text: 'EK60, EK80 Ecosounder AKBM data, provided by Aker BioMarine, licensed under ODC-BY 1.0', link: '' }],
        license: { name: 'ODC-BY 1.0', url: 'https://opendatacommons.org/licenses/by/1-0/', text: 'Open Data Commons Attribution License v1.0' },
        tags: ['krill', 'Southern Ocean', 'Antarctica', 'echosounder'],
        publish_status: 'draft',
        collection: { id: '7c61c869-a7c1-4f1c-900e-34636ee3392a' },
      },
      {
        id: 'db17042e-ef18-4ec9-84be-da33c461dd9e',
        name: 'Aker BioMarine Antarctic Sea 2021',
        description: 'A collection of 10 years of acoustic data on Antarctic Krill.',
        provider: {
          name: 'HUB Ocean',
          website: 'https://www.hubocean.earth/',
          description: 'HUB Ocean is a non-profit tech foundation.',
        },
        citations: [{ text: 'EK60, EK80 Ecosounder AKBM data, provided by Aker BioMarine, licensed under ODC-BY 1.0', link: '' }],
        license: { name: 'ODC-BY 1.0', url: 'https://opendatacommons.org/licenses/by/1-0/', text: 'Open Data Commons Attribution License v1.0' },
        tags: ['krill', 'Southern Ocean', 'Antarctica'],
        publish_status: 'draft',
        collection: { id: '7c61c869-a7c1-4f1c-900e-34636ee3392a' },
      },
      {
        id: 'a6cfbb08-68e4-49b9-add6-5a463421f0d0',
        name: 'Aker BioMarine Antarctic Sea 2016',
        description: 'A collection of 10 years of acoustic data on Antarctic Krill.',
        provider: {
          name: 'HUB Ocean',
          website: 'https://www.hubocean.earth/',
          description: 'HUB Ocean is a non-profit tech foundation.',
        },
        citations: [{ text: 'EK60, EK80 Ecosounder AKBM data, provided by Aker BioMarine, licensed under ODC-BY 1.0', link: '' }],
        license: { name: 'ODC-BY 1.0', url: 'https://opendatacommons.org/licenses/by/1-0/', text: 'Open Data Commons Attribution License v1.0' },
        tags: ['krill', 'Southern Ocean', 'Antarctica'],
        publish_status: 'draft',
        collection: { id: '7c61c869-a7c1-4f1c-900e-34636ee3392a' },
      },
      {
        id: '85b8d710-6865-45ea-b287-7c8215c5bf95',
        name: 'Aker BioMarine Antarctic Sea 2025',
        description: 'A collection of 10 years of acoustic data on Antarctic Krill.',
        provider: {
          name: 'HUB Ocean',
          website: 'https://www.hubocean.earth/',
          description: 'HUB Ocean is a non-profit tech foundation.',
        },
        citations: [{ text: 'EK60, EK80 Ecosounder AKBM data, provided by Aker BioMarine, licensed under ODC-BY 1.0', link: '' }],
        license: { name: 'ODC-BY 1.0', url: 'https://opendatacommons.org/licenses/by/1-0/', text: 'Open Data Commons Attribution License v1.0' },
        tags: ['krill', 'Southern Ocean', 'Antarctica'],
        publish_status: 'published',
        collection: { id: '7c61c869-a7c1-4f1c-900e-34636ee3392a' },
      },
      {
        id: 'a954a551-4be9-4059-a85a-b3ef8f75e75f',
        name: 'Aker BioMarine Tracklines and Metadata (2011-2025)',
        description: 'Composite tracklines and metadata for the entire EK60, EK80 Echosounder data collection up to and including 2025 data from the Southern Ocean.',
        provider: {
          name: 'HUB Ocean',
          website: 'https://www.hubocean.earth/',
          description: 'HUB Ocean is a non-profit tech foundation.',
        },
        citations: [{ text: 'EK60, EK80 Echosounder AKBM data, provided by Aker BioMarine, licensed under ODC-BY 1.0', link: '' }],
        license: { name: 'ODC-BY 1.0', url: 'https://opendatacommons.org/licenses/by/1-0/', text: 'Open Data Commons Attribution License v1.0' },
        tags: ['Tracklines', 'Metadata', 'Aker BioMarine', 'Krill', 'Echosounder'],
        publish_status: 'published',
        collection: { id: '7c61c869-a7c1-4f1c-900e-34636ee3392a' },
      },
    ],
  },
}

export function getMockCollection(id: string): CatalogCollection | null {
  return MOCK_COLLECTIONS[id] ?? null
}
