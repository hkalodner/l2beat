import { Meta, StoryObj } from '@storybook/react'

import { ContractsSection, ContractsSectionProps } from './ContractsSection'

const meta: Meta<typeof ContractsSection> = {
  component: ContractsSection,
}
export default meta
type Story = StoryObj<typeof ContractsSection>

const props: ContractsSectionProps = {
  id: 'contracts',
  title: 'Smart Contracts',
  contracts: [
    {
      name: 'CanonicalTransactionChain',
      etherscanUrl: 'etherscan.io',
      addresses: [
        '0x5E4e65926BA27467555EB562121fac00D24E9dD2',
        '0x5E4e65926BA27467555EB562121fac00D24E9dD2',
        '0x5E4e65926BA27467555EB562121fac00D24E9dD2',
      ],
      description:
        'The Canonical Transaction Chain (CTC) contract is an append-only log of transactions which must be applied to the OVM state. It defines the ordering of transactions by writing them to the CTC:batches instance of the Chain Storage Container. CTC batches can only be submitted by OVM_Sequencer. The CTC also allows any account to enqueue() an L2 transaction, which the Sequencer must eventually append to the rollup state.',
      links: [],
    },
    {
      name: 'L1CrossDomainMessenger',
      etherscanUrl: 'etherscan.io',
      addresses: ['0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1'],
      description:
        "The L1 Cross Domain Messenger (L1xDM) contract sends messages from L1 to L2, and relays messages from L2 onto L1. In the event that a message sent from L1 to L2 is rejected for exceeding the L2 epoch gas limit, it can be resubmitted via this contract's replay function.",
      links: [
        {
          href: '#',
          name: 'Implementation (Upgradable)',
          address: '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA2',
          isAdmin: false,
        },
        {
          href: '#',
          name: 'Admin',
          address: '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA3',
          isAdmin: true,
        },
      ],
    },
    {
      name: 'L1Escrow',
      etherscanUrl: 'etherscan.io',
      addresses: ['0x467194771dAe2967Aef3ECbEDD3Bf9a310C76C65'],
      description:
        'DAI Vault for custom DAI Gateway managed by MakerDAO. This contract stores the following tokens: DAI.',
      links: [],
    },
  ],
  escrows: [
    {
      name: 'L1Escrow',
      etherscanUrl: 'etherscan.io',
      addresses: ['0x467194771dAe2967Aef3ECbEDD3Bf9a310C76C65'],
      description:
        'DAI Vault for custom DAI Gateway managed by MakerDAO. This contract stores the following tokens: DAI.',
      links: [],
      upgradeableBy: 'Maker DAO',
      upgradeDelay: 'No delay',
    },
    {
      name: 'Generic escrow',
      etherscanUrl: 'etherscan.io',
      addresses: ['0x5E4e65926BA27467555EB562121fac00D24E9dD2'],
      links: [],
    },
  ],
  risks: [
    {
      text: 'Funds can be stolen if a contract receives a malicious code upgrade. There is no delay on code upgrades.',
      isCritical: true,
    },
  ],
  references: [
    {
      text: 'Source of truth about L2s',
      href: 'https://l2beat.com',
    },
  ],
  architectureImage: '/images/optimism-architecture.png',
  verificationStatus: {
    projects: {},
    contracts: {
      '0x5E4e65926BA27467555EB562121fac00D24E9dD2': true,
      '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1': true,
      '0x467194771dAe2967Aef3ECbEDD3Bf9a310C76C65': false,
      '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA2': true,
      '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA3': false,
      '0x4D014f3c5F33Aa9Cd1Dc29ce29618d07Ae666d15': true,
    },
  },
  manuallyVerifiedContracts: {},
}

export const Contracts: Story = { args: props }

export const NoImage: Story = {
  args: {
    ...props,
    architectureImage: '',
  },
}

export const EmptyContract: Story = {
  args: {
    contracts: [],
    escrows: [],
    risks: [],
    references: [],
  },
}
