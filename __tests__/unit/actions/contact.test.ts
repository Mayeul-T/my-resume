import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Create mock instances
const mockSendTransacEmail = vi.fn()
const mockSetApiKey = vi.fn()

// Mock the Brevo module before importing the action
vi.mock('@getbrevo/brevo', () => {
  return {
    TransactionalEmailsApi: class {
      sendTransacEmail = mockSendTransacEmail
      setApiKey = mockSetApiKey
    },
    TransactionalEmailsApiApiKeys: {
      apiKey: 'apiKey',
    },
    SendSmtpEmail: class {
      sender: unknown
      to: unknown
      replyTo: unknown
      subject: unknown
      htmlContent: unknown
      textContent: unknown
    },
  }
})

import { sendContactEmail } from '@/lib/actions/contact'

describe('sendContactEmail', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.clearAllMocks()
    process.env = {
      ...originalEnv,
      BREVO_API_KEY: 'test-api-key',
      BREVO_EMAIL_SENDER: 'sender@example.com',
      CONTACT_EMAIL: 'contact@example.com',
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  const validFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, this is a test message.',
  }

  describe('validation', () => {
    it('returns error for missing name', async () => {
      const result = await sendContactEmail({
        name: '',
        email: 'test@example.com',
        message: 'Hello',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Missing required fields')
    })

    it('returns error for missing email', async () => {
      const result = await sendContactEmail({
        name: 'John',
        email: '',
        message: 'Hello',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Missing required fields')
    })

    it('returns error for missing message', async () => {
      const result = await sendContactEmail({
        name: 'John',
        email: 'test@example.com',
        message: '',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Missing required fields')
    })

    it('returns error for invalid email format', async () => {
      const result = await sendContactEmail({
        name: 'John',
        email: 'invalid-email',
        message: 'Hello',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Invalid email format')
    })
  })

  describe('email validation patterns', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'user+tag@example.org',
      'user123@test.io',
    ]

    const invalidEmails = [
      'invalid',
      '@domain.com',
      'user@',
      'user@.com',
      'user @domain.com',
      'user@ domain.com',
    ]

    it.each(validEmails)('accepts valid email: %s', async (email) => {
      mockSendTransacEmail.mockResolvedValue({})

      const result = await sendContactEmail({
        name: 'John',
        email,
        message: 'Hello',
      })

      // Should pass validation (success since mock returns success)
      expect(result.error).not.toBe('Invalid email format')
    })

    it.each(invalidEmails)('rejects invalid email: %s', async (email) => {
      const result = await sendContactEmail({
        name: 'John',
        email,
        message: 'Hello',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Invalid email format')
    })
  })

  describe('configuration', () => {
    it('returns error when BREVO_API_KEY missing', async () => {
      delete process.env.BREVO_API_KEY

      const result = await sendContactEmail(validFormData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Server configuration error')
    })

    it('returns error when BREVO_EMAIL_SENDER missing', async () => {
      delete process.env.BREVO_EMAIL_SENDER

      const result = await sendContactEmail(validFormData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Server configuration error')
    })

    it('returns error when CONTACT_EMAIL missing', async () => {
      delete process.env.CONTACT_EMAIL

      const result = await sendContactEmail(validFormData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Server configuration error')
    })
  })

  describe('API interaction', () => {
    it('successful email returns { success: true }', async () => {
      mockSendTransacEmail.mockResolvedValue({})

      const result = await sendContactEmail(validFormData)

      expect(result).toEqual({ success: true })
      expect(mockSendTransacEmail).toHaveBeenCalled()
    })

    it('Brevo API error returns { success: false, error: "Failed to send email" }', async () => {
      mockSendTransacEmail.mockRejectedValue(new Error('API Error'))

      const result = await sendContactEmail(validFormData)

      expect(result).toEqual({ success: false, error: 'Failed to send email' })
    })
  })
})
