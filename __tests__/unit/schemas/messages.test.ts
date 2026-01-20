import { describe, it, expect } from 'vitest'
import { MessagesSchema } from '@/lib/schemas/messages'
import { validMessages } from '@/__tests__/fixtures/messages'

describe('MessagesSchema', () => {
  it('valid messages object passes', () => {
    const result = MessagesSchema.safeParse(validMessages)
    expect(result.success).toBe(true)
  })

  it('missing top-level key "nav" fails', () => {
    const { nav, ...rest } = validMessages
    const result = MessagesSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('missing top-level key "hero" fails', () => {
    const { hero, ...rest } = validMessages
    const result = MessagesSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('missing top-level key "about" fails', () => {
    const { about, ...rest } = validMessages
    const result = MessagesSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('missing top-level key "experience" fails', () => {
    const { experience, ...rest } = validMessages
    const result = MessagesSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('missing top-level key "skills" fails', () => {
    const { skills, ...rest } = validMessages
    const result = MessagesSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('missing top-level key "education" fails', () => {
    const { education, ...rest } = validMessages
    const result = MessagesSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('missing top-level key "projects" fails', () => {
    const { projects, ...rest } = validMessages
    const result = MessagesSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('missing top-level key "contact" fails', () => {
    const { contact, ...rest } = validMessages
    const result = MessagesSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('missing top-level key "footer" fails', () => {
    const { footer, ...rest } = validMessages
    const result = MessagesSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('missing top-level key "theme" fails', () => {
    const { theme, ...rest } = validMessages
    const result = MessagesSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('missing top-level key "language" fails', () => {
    const { language, ...rest } = validMessages
    const result = MessagesSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('missing nested key fails', () => {
    const invalid = {
      ...validMessages,
      nav: {
        about: 'About',
        // missing other keys
      },
    }
    const result = MessagesSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it('all 11 top-level objects validated', () => {
    const topLevelKeys = [
      'nav',
      'hero',
      'about',
      'experience',
      'skills',
      'education',
      'projects',
      'contact',
      'footer',
      'theme',
      'language',
    ]

    // Verify each key exists in valid messages
    for (const key of topLevelKeys) {
      expect(validMessages).toHaveProperty(key)
    }

    // Verify each missing key causes failure
    for (const key of topLevelKeys) {
      const invalid = { ...validMessages }
      delete (invalid as Record<string, unknown>)[key]
      const result = MessagesSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    }
  })
})
