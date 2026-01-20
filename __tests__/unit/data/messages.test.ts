import { describe, it, expect, vi, beforeEach } from 'vitest'
import { validMessages } from '@/__tests__/fixtures/messages'

// Mock the yaml utility
vi.mock('@/lib/utils/yaml', () => ({
  parseYamlFile: vi.fn(),
}))

// Mock the routing module
vi.mock('@/lib/i18n/routing', () => ({
  routing: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
}))

import { parseYamlFile } from '@/lib/utils/yaml'
import { getMessages } from '@/lib/data/messages'

describe('getMessages', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('valid locale returns messages', async () => {
    vi.mocked(parseYamlFile).mockResolvedValueOnce(validMessages)

    const result = await getMessages('en')

    expect(result).toEqual(validMessages)
    expect(parseYamlFile).toHaveBeenCalled()
  })

  it('invalid locale throws error', async () => {
    await expect(getMessages('invalid' as 'en')).rejects.toThrow(
      'Invalid locale: "invalid"'
    )
    await expect(getMessages('invalid' as 'en')).rejects.toThrow(
      'Valid locales are: en, fr'
    )
  })

  it('uses correct file path for locale', async () => {
    vi.mocked(parseYamlFile).mockResolvedValueOnce(validMessages)

    await getMessages('en')

    const calls = vi.mocked(parseYamlFile).mock.calls
    expect(calls[0][0]).toContain('messages')
    expect(calls[0][0]).toContain('en.yml')
  })

  it('works with french locale', async () => {
    vi.mocked(parseYamlFile).mockResolvedValueOnce(validMessages)

    await getMessages('fr')

    const calls = vi.mocked(parseYamlFile).mock.calls
    expect(calls[0][0]).toContain('fr.yml')
  })

  it('propagates parseYamlFile errors', async () => {
    const mockError = new Error('Parse error')
    vi.mocked(parseYamlFile).mockRejectedValueOnce(mockError)

    await expect(getMessages('en')).rejects.toThrow('Parse error')
  })
})
