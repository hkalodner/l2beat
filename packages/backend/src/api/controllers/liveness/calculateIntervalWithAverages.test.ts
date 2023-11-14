import { LivenessType, UnixTime } from '@l2beat/shared-pure'
import { expect } from 'earl'
import { cloneDeep } from 'lodash'

import {
  calculateAverages,
  calculateIntervals,
  calculateIntervalWithAverages,
  LivenessRecordWithInterval,
} from './calculateIntervalWithAverages'

const NOW = UnixTime.now()

const RECORDS: LivenessRecordWithInterval[] = [
  {
    timestamp: NOW,
    type: LivenessType('DA'),
    previousRecordInterval: 3600,
  },
  {
    timestamp: NOW.add(-1, 'hours'),
    type: LivenessType('DA'),
    previousRecordInterval: 7200,
  },
  {
    timestamp: NOW.add(-3, 'hours'),
    type: LivenessType('DA'),
    previousRecordInterval: 86_400 * 31 - 10_800,
  },
  {
    timestamp: NOW.add(-31, 'days'),
    type: LivenessType('STATE'),
  },
  {
    timestamp: NOW.add(-31, 'days').add(-1, 'hours'),
    type: LivenessType('STATE'),
  },
  {
    timestamp: NOW.add(-91, 'days'),
    type: LivenessType('DA'),
  },
  {
    timestamp: NOW.add(-92, 'days'),
    type: LivenessType('DA'),
  },
  {
    timestamp: NOW.add(-93, 'days'),
    type: LivenessType('DA'),
  },
]

describe(calculateIntervals.name, () => {
  it('returns records with intervals', () => {
    const expected: LivenessRecordWithInterval[] = [
      {
        timestamp: NOW,
        type: LivenessType('DA'),
        previousRecordInterval: 3600,
      },
      {
        timestamp: NOW.add(-1, 'hours'),
        type: LivenessType('DA'),
        previousRecordInterval: 2 * 3600,
      },
      {
        timestamp: NOW.add(-3, 'hours'),
        type: LivenessType('DA'),
      },
    ]
    const input = cloneDeep(RECORDS).slice(0, 3)
    delete input[2].previousRecordInterval
    calculateIntervals(input)

    expect(input).toEqual(expected)
  })
})

describe(calculateAverages.name, () => {
  it('returns the averages for stateUpdates with undefined', () => {
    const input = cloneDeep(RECORDS).filter(
      (r) => r.type === LivenessType('STATE'),
    )
    calculateIntervals(input)!
    const result = calculateAverages(input)
    const expected = {
      last30Days: undefined,
      last90Days: { averageInSeconds: 3600, maximumInSeconds: 3600 },
      max: { averageInSeconds: 3600, maximumInSeconds: 3600 },
    }
    expect(result).toEqual(expected)
  })
  it('returns the averages for batchSubmissions', () => {
    const input = cloneDeep(RECORDS)
    calculateIntervals(input)!
    const result = calculateAverages(
      input.filter((r) => r.type === LivenessType('DA')),
    )
    const expected = {
      last30Days: { averageInSeconds: 892800, maximumInSeconds: 2667600 },
      last90Days: { averageInSeconds: 892800, maximumInSeconds: 2667600 },
      max: { averageInSeconds: 570240, maximumInSeconds: 2667600 },
    }
    expect(result).toEqual(expected)
  })
})

describe(calculateIntervalWithAverages.name, () => {
  it('returns the intervals with averages', () => {
    const result = calculateIntervalWithAverages({
      project1: {
        batchSubmissions: {
          records: RECORDS.filter((r) => r.type === LivenessType('DA')),
        },
        stateUpdates: {
          records: RECORDS.filter((r) => r.type === LivenessType('STATE')),
        },
      },
    })

    const batchSubmissionRecords = cloneDeep(RECORDS).filter(
      (r) => r.type === LivenessType('DA'),
    )
    calculateIntervals(batchSubmissionRecords)
    const stateUpdateRecords = cloneDeep(RECORDS).filter(
      (r) => r.type === LivenessType('STATE'),
    )
    calculateIntervals(stateUpdateRecords)

    const expected = {
      project1: {
        batchSubmissions: {
          records: batchSubmissionRecords,
          last30Days: {
            averageInSeconds: 2620800,
            maximumInSeconds: 7851600,
          },
          last90Days: {
            averageInSeconds: 2620800,
            maximumInSeconds: 7851600,
          },
          max: {
            averageInSeconds: 1607040,
            maximumInSeconds: 7851600,
          },
        },

        stateUpdates: {
          records: stateUpdateRecords,
          last30Days: undefined,
          last90Days: {
            averageInSeconds: 3600,
            maximumInSeconds: 3600,
          },
          max: {
            averageInSeconds: 3600,
            maximumInSeconds: 3600,
          },
        },
      },
    }
    expect(result).toEqual(expected)
  })
})
