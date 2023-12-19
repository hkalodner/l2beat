import { ChainId, ConfigReader } from '@l2beat/discovery'
import { createHash } from 'crypto'
import { readFileSync } from 'fs'

export async function getDiscoveryHash(projectName: string, chainId: ChainId) {
  const configReader = new ConfigReader()
  const curDiscovery = await configReader.readDiscovery(projectName, chainId)
  const hasher = createHash('sha1')
  hasher.update(JSON.stringify(curDiscovery))
  return `0x${hasher.digest('hex')}`
}

export function getHashesDatabase(path: string): Record<string, string> {
  let result = undefined

  try {
    const hashContent = readFileSync(path, 'utf-8')
    result = JSON.parse(hashContent) as Record<string, string>
  } catch (_) {
    result = {}
  }

  return result
}

export function getHashesDatabaseKey(
  projectName: string,
  chainId: ChainId,
): string {
  return `${ChainId.getName(chainId)}:${projectName}`
}
