import { formatSeconds } from '../utils/formatSeconds'
import { ScalingProjectRisk } from './ScalingProjectRisk'
import { ScalingProjectTechnologyChoice } from './ScalingProjectTechnologyChoice'

function REGULAR(
  type: 'zk' | 'optimistic',
  proof: 'no proof' | 'merkle proof',
  timeSeconds?: number,
): ScalingProjectTechnologyChoice {
  const finalized = type === 'zk' ? 'proven' : 'finalized'
  const requires = proof === 'no proof' ? 'does not require' : 'requires'
  const timeString =
    timeSeconds !== undefined
      ? `takes a challenge period of ${formatSeconds(timeSeconds)}`
      : 'usually takes several days'
  const time =
    type === 'optimistic'
      ? ` The process of block finalization ${timeString} to complete.`
      : ''
  return {
    name: 'Regular exit',
    description: `The user initiates the withdrawal by submitting a regular transaction on this chain. When the block containing that transaction is ${finalized} the funds become available for withdrawal on L1.${time} Finally the user submits an L1 transaction to claim the funds. This transaction ${requires} a merkle proof.`,
    risks: [],
    references: [],
  }
}

function FORCED(
  orHalt?: 'forced-withdrawals' | 'all-withdrawals',
): ScalingProjectTechnologyChoice {
  let orHaltString = ''
  if (orHalt) {
    switch (orHalt) {
      case 'forced-withdrawals':
        orHaltString =
          ' or halt all messages from L1, including all forced withdrawals and deposits'
        break
      case 'all-withdrawals':
        orHaltString =
          ' or halt all withdrawals, including forced withdrawals from L1 and regular withdrawals initated on L2'
        break
    }
  }
  return {
    name: 'Forced exit',
    description: `If the user experiences censorship from the operator with regular exit they can submit their withdrawal requests directly on L1. The system is then obliged to service this request${orHaltString}. Once the force operation is submitted and if the request is serviced, the operation follows the flow of a regular exit.`,
    risks: [],
    references: [],
  }
}

function EMERGENCY(
  state: string,
  proof: 'zero knowledge proof' | 'merkle proof',
  delay?: number,
): ScalingProjectTechnologyChoice {
  const risks: ScalingProjectRisk[] =
    proof === 'zero knowledge proof'
      ? [
          {
            category: 'Funds can be lost if',
            text: 'the user is unable to generate the non-trivial ZK proof for exodus withdraw.',
          },
        ]
      : []
  const delayString = delay !== undefined ? formatSeconds(delay) : 'enough time'
  return {
    name: 'Emergency exit',
    description: `If the ${delayString} deadline passes and the forced exit is still ignored the user can put the system into ${state}, disallowing further state updates. In that case everybody can withdraw by submitting a ${proof} of their funds with their L1 transaction.`,
    risks,
    references: [],
  }
}

const STARKEX_REGULAR_PERPETUAL: ScalingProjectTechnologyChoice = {
  ...REGULAR('zk', 'no proof'),
  references: [
    {
      text: 'Withdrawal - StarkEx documentation',
      href: 'https://docs.starkware.co/starkex/perpetual/withdrawal-perpetual.html',
    },
  ],
}

const STARKEX_REGULAR_SPOT: ScalingProjectTechnologyChoice = {
  ...REGULAR('zk', 'no proof'),
  description:
    REGULAR('zk', 'no proof').description +
    ' When withdrawing NFTs they are minted on L1.',
  references: [
    {
      text: 'Withdrawal - StarkEx documentation',
      href: 'https://docs.starkware.co/starkex/spot/withdrawal.html',
    },
  ],
}

const STARKEX_FORCED_PERPETUAL: ScalingProjectTechnologyChoice = {
  ...FORCED(),
  references: [
    {
      text: 'Forced Operations - StarkEx documentation',
      href: 'https://docs.starkware.co/starkex/perpetual/shared/README-forced-operations.html',
    },
    {
      text: 'Forced Withdrawal - StarkEx documentation',
      href: 'https://docs.starkware.co/starkex/perpetual/perpetual-trading-forced-withdrawal-and-forced-trade.html#forced_withdrawal',
    },
    {
      text: 'Forced Trade - StarkEx documentation',
      href: 'https://docs.starkware.co/starkex/perpetual/perpetual-trading-forced-withdrawal-and-forced-trade.html#forced_trade',
    },
  ],
}

const STARKEX_FORCED_SPOT: ScalingProjectTechnologyChoice = {
  ...FORCED(),
  references: [
    {
      text: 'Forced Operations - StarkEx documentation',
      href: 'https://docs.starkware.co/starkex/spot/shared/README-forced-operations.html',
    },
    {
      text: 'Full Withdrawal - StarkEx documentation',
      href: 'https://docs.starkware.co/starkex/spot/spot-trading-full-withdrawals.html',
    },
  ],
}

const STARKEX_EMERGENCY_PERPETUAL: ScalingProjectTechnologyChoice = {
  ...EMERGENCY('a frozen state', 'merkle proof'),
  references: [...STARKEX_FORCED_PERPETUAL.references],
}

const STARKEX_EMERGENCY_SPOT: ScalingProjectTechnologyChoice = {
  ...EMERGENCY('a frozen state', 'merkle proof'),
  references: [...STARKEX_FORCED_SPOT.references],
}

const OPERATOR_CENSORS_WITHDRAWAL: ScalingProjectRisk = {
  category: 'Funds can be frozen if',
  text: 'the operator censors withdrawal transaction.',
}

const STARKNET_REGULAR: ScalingProjectTechnologyChoice = {
  ...REGULAR('zk', 'no proof'),
  description:
    REGULAR('zk', 'no proof').description +
    ' Note that the withdrawal request can be censored by the Sequencer.',
  references: [
    {
      text: ' Withdrawing is based on l2 to l1 messages - Starknet documentation',
      href: 'https://www.cairo-lang.org/docs/hello_starknet/l1l2.html',
    },
  ],
  risks: [OPERATOR_CENSORS_WITHDRAWAL],
}

const STARKNET_EMERGENCY: ScalingProjectTechnologyChoice = {
  name: 'Emergency exit',
  risks: [],
  description:
    'There is no generic escape hatch mechanism as Starknet cannot be forced by users into a frozen state. Note that a freezing mechanism on L2, to be secure, requires anti-censorship protection.',
  references: [],
}

const PLASMA: ScalingProjectTechnologyChoice = {
  name: 'Regular exit',
  description:
    'The user executes the withdrawal by submitting a transaction on L1 that requires a merkle proof of funds.',
  risks: [],
  references: [],
}

export const AUTONOMOUS: ScalingProjectTechnologyChoice = {
  name: 'Autonomous exit',
  description:
    'Users can (eventually) exit the system by pushing the transaction on L1 and providing the corresponding state root. The only way to prevent such withdrawal is via an upgrade.',
  risks: [],
  references: [],
}

export const RISK_CENTRALIZED_VALIDATOR: ScalingProjectRisk = {
  category: 'Funds can be frozen if',
  text: 'the centralized validator goes down. Users cannot produce blocks themselves and exiting the system requires new block production.',
  isCritical: true,
}

export const EXITS = {
  REGULAR,
  FORCED,
  EMERGENCY,
  AUTONOMOUS,
  STARKEX_PERPETUAL: [
    STARKEX_REGULAR_PERPETUAL,
    STARKEX_FORCED_PERPETUAL,
    STARKEX_EMERGENCY_PERPETUAL,
  ],
  STARKEX_SPOT: [
    STARKEX_REGULAR_SPOT,
    STARKEX_FORCED_SPOT,
    STARKEX_EMERGENCY_SPOT,
  ],
  STARKNET: [STARKNET_REGULAR, STARKNET_EMERGENCY],
  PLASMA,
  RISK_CENTRALIZED_VALIDATOR,
  OPERATOR_CENSORS_WITHDRAWAL,
}
