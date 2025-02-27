import {
  Layer2Provider,
  ScalingProjectCategory,
  ScalingProjectPurpose,
  StageConfig,
} from '@l2beat/config'
import { ActivityApiResponse, VerificationStatus } from '@l2beat/shared-pure'

export interface ActivityPagesData {
  activityApiResponse: ActivityApiResponse
  verificationStatus: VerificationStatus
}

export interface ActivityViewEntry {
  name: string
  shortName: string | undefined
  slug: string
  category: ScalingProjectCategory | undefined
  provider: Layer2Provider | undefined
  warning: string | undefined
  redWarning: string | undefined
  purposes: ScalingProjectPurpose[] | undefined
  isVerified: boolean | undefined
  showProjectUnderReview: boolean | undefined
  dataSource: string | undefined
  data: ActivityViewEntryData | undefined
  stage: StageConfig | undefined
}

export interface ActivityViewEntryData {
  tpsDaily: number
  tpsWeeklyChange: string
  transactionsMonthlyCount: number
  maxTps: number
  maxTpsDate: string
}
