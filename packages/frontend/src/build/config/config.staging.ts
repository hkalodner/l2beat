import { common } from './common'
import { Config } from './Config'

export function getStagingConfig(): Config {
  return {
    ...common,
    features: {
      ...common.features,
      liveness: true,
      diffHistory: true,
      buildAllProjectPages: true,
    },
    backend: {
      apiUrl: 'https://staging.l2beat.com',
      skipCache: false,
    },
  }
}
