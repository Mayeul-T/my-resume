import { describe, it, expect, vi, beforeEach } from 'vitest'
import { z } from 'zod'
import {
  parseYamlFile,
  YamlFileNotFoundError,
  YamlParseError,
  YamlValidationError,
} from '@/lib/utils/yaml'

// Mock fs/promises
vi.mock('fs/promises', () => ({
  default: {
    readFile: vi.fn(),
  },
}))

import fs from 'fs/promises'

const TestSchema = z.object({
  name: z.string(),
  age: z.number(),
})

describe('parseYamlFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('parses valid YAML and returns data', async () => {
    const yamlContent = `
name: John
age: 30
`
    vi.mocked(fs.readFile).mockResolvedValue(yamlContent)

    const result = await parseYamlFile('/path/to/file.yml', TestSchema)

    expect(result).toEqual({ name: 'John', age: 30 })
    expect(fs.readFile).toHaveBeenCalledWith('/path/to/file.yml', 'utf-8')
  })

  it('parses valid JSON (JSON is valid YAML)', async () => {
    const jsonContent = '{"name": "Jane", "age": 25}'
    vi.mocked(fs.readFile).mockResolvedValue(jsonContent)

    const result = await parseYamlFile('/path/to/file.json', TestSchema)

    expect(result).toEqual({ name: 'Jane', age: 25 })
  })

  it('validates data against Zod schema', async () => {
    const yamlContent = `
name: Test
age: 42
extra: ignored
`
    vi.mocked(fs.readFile).mockResolvedValue(yamlContent)

    const result = await parseYamlFile('/path/to/file.yml', TestSchema)

    expect(result).toEqual({ name: 'Test', age: 42 })
  })

  it('throws YamlFileNotFoundError when file does not exist', async () => {
    const error = Object.assign(new Error('ENOENT'), { code: 'ENOENT' })
    vi.mocked(fs.readFile).mockRejectedValue(error)

    await expect(
      parseYamlFile('/nonexistent/file.yml', TestSchema)
    ).rejects.toThrow(YamlFileNotFoundError)

    await expect(
      parseYamlFile('/nonexistent/file.yml', TestSchema)
    ).rejects.toThrow('File not found: "/nonexistent/file.yml"')
  })

  it('throws YamlParseError for invalid YAML syntax', async () => {
    const invalidYaml = `
name: "unclosed string
age: 30
`
    vi.mocked(fs.readFile).mockResolvedValue(invalidYaml)

    await expect(
      parseYamlFile('/path/to/invalid.yml', TestSchema)
    ).rejects.toThrow(YamlParseError)
  })

  it('throws YamlValidationError for schema mismatch', async () => {
    const yamlContent = `
name: John
age: "not a number"
`
    vi.mocked(fs.readFile).mockResolvedValue(yamlContent)

    await expect(
      parseYamlFile('/path/to/file.yml', TestSchema)
    ).rejects.toThrow(YamlValidationError)
  })

  it('error messages include file path', async () => {
    const error = Object.assign(new Error('ENOENT'), { code: 'ENOENT' })
    vi.mocked(fs.readFile).mockRejectedValue(error)

    try {
      await parseYamlFile('/my/specific/path.yml', TestSchema)
      expect.fail('Should have thrown')
    } catch (e) {
      expect((e as Error).message).toContain('/my/specific/path.yml')
    }
  })

  it('validation errors list all field issues with paths', async () => {
    const yamlContent = `
name: 123
age: "string"
`
    vi.mocked(fs.readFile).mockResolvedValue(yamlContent)

    try {
      await parseYamlFile('/path/to/file.yml', TestSchema)
      expect.fail('Should have thrown')
    } catch (e) {
      const error = e as YamlValidationError
      expect(error.message).toContain('name')
      expect(error.message).toContain('age')
    }
  })

  it('rethrows unexpected errors', async () => {
    const unexpectedError = new Error('Unexpected error')
    vi.mocked(fs.readFile).mockRejectedValue(unexpectedError)

    await expect(
      parseYamlFile('/path/to/file.yml', TestSchema)
    ).rejects.toThrow('Unexpected error')
  })
})
