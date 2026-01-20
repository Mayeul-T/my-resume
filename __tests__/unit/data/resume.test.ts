import { describe, it, expect, vi, beforeEach } from 'vitest'
import { validResume } from '@/__tests__/fixtures/resume'

// Mock fs/promises
vi.mock('fs/promises', () => ({
  default: {
    access: vi.fn(),
  },
}))

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

import fs from 'fs/promises'
import { parseYamlFile } from '@/lib/utils/yaml'
import { getResumeData } from '@/lib/data/resume'

describe('getResumeData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('valid locale returns resume data', async () => {
    vi.mocked(fs.access).mockResolvedValueOnce(undefined)
    vi.mocked(parseYamlFile).mockResolvedValueOnce(validResume)

    const result = await getResumeData('en')

    expect(result).toEqual(validResume)
    expect(parseYamlFile).toHaveBeenCalled()
  })

  it('invalid locale throws error with helpful message', async () => {
    await expect(getResumeData('invalid' as 'en')).rejects.toThrow(
      'Invalid locale: "invalid"'
    )
    await expect(getResumeData('invalid' as 'en')).rejects.toThrow(
      'Valid locales are: en, fr'
    )
  })

  it('.yml extension has priority over .yaml', async () => {
    // First access check (.yml) succeeds
    vi.mocked(fs.access).mockResolvedValueOnce(undefined)
    vi.mocked(parseYamlFile).mockResolvedValueOnce(validResume)

    await getResumeData('en')

    // Should have checked .yml first and found it
    const accessCalls = vi.mocked(fs.access).mock.calls
    expect(accessCalls.length).toBe(1)
    expect(accessCalls[0][0]).toContain('resume.en.yml')
  })

  it('falls back to .yaml if .yml not found', async () => {
    // First access check (.yml) fails
    vi.mocked(fs.access).mockRejectedValueOnce(new Error('ENOENT'))
    // Second access check (.yaml) succeeds
    vi.mocked(fs.access).mockResolvedValueOnce(undefined)
    vi.mocked(parseYamlFile).mockResolvedValueOnce(validResume)

    await getResumeData('en')

    const accessCalls = vi.mocked(fs.access).mock.calls
    expect(accessCalls.length).toBe(2)
    expect(accessCalls[0][0]).toContain('resume.en.yml')
    expect(accessCalls[1][0]).toContain('resume.en.yaml')
  })

  it('throws when no file found for locale', async () => {
    // Both .yml and .yaml fail
    vi.mocked(fs.access).mockRejectedValue(new Error('ENOENT'))

    await expect(getResumeData('en')).rejects.toThrow(
      'No resume file found for locale "en"'
    )
  })

  it('works with french locale', async () => {
    vi.mocked(fs.access).mockResolvedValueOnce(undefined)
    vi.mocked(parseYamlFile).mockResolvedValueOnce(validResume)

    await getResumeData('fr')

    const accessCalls = vi.mocked(fs.access).mock.calls
    expect(accessCalls[0][0]).toContain('resume.fr.yml')
  })
})
