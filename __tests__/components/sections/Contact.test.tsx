import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Contact } from '@/components/sections/Contact'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: 'Contact',
      subtitle: 'Get in touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Failed to send message',
    }
    return translations[key] || key
  },
}))

// Mock the contact action
vi.mock('@/lib/actions/contact', () => ({
  sendContactEmail: vi.fn(),
}))

// Mock the UI components
vi.mock('@/components/ui/Section', () => ({
  Section: ({ children, title }: { children: React.ReactNode; title: string }) => (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  ),
}))

vi.mock('@/components/ui/AnimatedElement', () => ({
  AnimatedElement: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

import { sendContactEmail } from '@/lib/actions/contact'

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form with all fields (name, email, message)', () => {
    render(<Contact />)

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Contact />)

    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
  })

  it('form inputs update on change', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Message')

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'Hello there!')

    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(messageInput).toHaveValue('Hello there!')
  })

  it('submit button shows loading state', async () => {
    vi.mocked(sendContactEmail).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ success: true }), 100))
    )

    const user = userEvent.setup()
    render(<Contact />)

    // Fill out form
    await user.type(screen.getByLabelText('Name'), 'John')
    await user.type(screen.getByLabelText('Email'), 'john@test.com')
    await user.type(screen.getByLabelText('Message'), 'Hello')

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'Send' }))

    // Button should show loading state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sending...' })).toBeInTheDocument()
    })
  })

  it('success message displays after successful submit', async () => {
    vi.mocked(sendContactEmail).mockResolvedValue({ success: true })

    const user = userEvent.setup()
    render(<Contact />)

    // Fill out form
    await user.type(screen.getByLabelText('Name'), 'John')
    await user.type(screen.getByLabelText('Email'), 'john@test.com')
    await user.type(screen.getByLabelText('Message'), 'Hello')

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'Send' }))

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument()
    })
  })

  it('error message displays after failed submit', async () => {
    vi.mocked(sendContactEmail).mockResolvedValue({
      success: false,
      error: 'Failed',
    })

    const user = userEvent.setup()
    render(<Contact />)

    // Fill out form
    await user.type(screen.getByLabelText('Name'), 'John')
    await user.type(screen.getByLabelText('Email'), 'john@test.com')
    await user.type(screen.getByLabelText('Message'), 'Hello')

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'Send' }))

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to send message')).toBeInTheDocument()
    })
  })

  it('error message displays when action throws', async () => {
    vi.mocked(sendContactEmail).mockRejectedValue(new Error('Network error'))

    const user = userEvent.setup()
    render(<Contact />)

    // Fill out form
    await user.type(screen.getByLabelText('Name'), 'John')
    await user.type(screen.getByLabelText('Email'), 'john@test.com')
    await user.type(screen.getByLabelText('Message'), 'Hello')

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'Send' }))

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to send message')).toBeInTheDocument()
    })
  })

  it('form clears after successful submit', async () => {
    vi.mocked(sendContactEmail).mockResolvedValue({ success: true })

    const user = userEvent.setup()
    render(<Contact />)

    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Message')

    // Fill out form
    await user.type(nameInput, 'John')
    await user.type(emailInput, 'john@test.com')
    await user.type(messageInput, 'Hello')

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'Send' }))

    // Wait for form to clear
    await waitFor(() => {
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(messageInput).toHaveValue('')
    })
  })

  it('submit button is disabled during loading', async () => {
    vi.mocked(sendContactEmail).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ success: true }), 100))
    )

    const user = userEvent.setup()
    render(<Contact />)

    // Fill out form
    await user.type(screen.getByLabelText('Name'), 'John')
    await user.type(screen.getByLabelText('Email'), 'john@test.com')
    await user.type(screen.getByLabelText('Message'), 'Hello')

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: 'Send' }))

    // Button should be disabled
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled()
    })
  })
})
