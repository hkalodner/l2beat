import { ProjectId } from '@l2beat/shared-pure'

import { CONTRACTS, TECHNOLOGY, UPCOMING_RISK_VIEW } from './common'
import { Layer2 } from './types'

export const pepesync: Layer2 = {
  isUpcoming: true,
  type: 'layer2',
  id: ProjectId('pepesync'),
  display: {
    name: 'PepeSync',
    slug: 'pepesync',
    description:
      'PepeSync is an OP stack chain built for the World of Meme Coins.',
    purpose: 'Launchpad, AMM',
    category: 'Optimistic Rollup',
    provider: 'Optimism',
    links: {
      websites: ['https://pepesync.xyz'],
      apps: ['https://bridge.test.pepesync.xyz'],
      documentation: ['https://paper.pepesync.xyz/'],
      explorers: [
        'https://goerli-test.pepescan.xyz',
        'https://pepesync.instatus.com',
      ],
      repositories: ['https://github.com/pepesync'],
      socialMedia: [
        'https://twitter.com/Pepe_Sync',
        'https://discord.gg/aBFkJatT',
        'https://mirror.xyz/0x80591D2e5bf600fc4f00cc4A92DfA5840f34Ed4E',
      ],
    },
  },
  config: {
    escrows: [],
  },
  riskView: UPCOMING_RISK_VIEW,
  technology: TECHNOLOGY.UPCOMING,
  contracts: CONTRACTS.EMPTY,
}
