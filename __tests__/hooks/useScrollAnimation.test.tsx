import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import React from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

// Mock IntersectionObserver
const mockObserve = vi.fn()
const mockUnobserve = vi.fn()
const mockDisconnect = vi.fn()

type IntersectionCallbackType = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void

let intersectionCallback: IntersectionCallbackType | null = null
let lastObserverOptions: IntersectionObserverInit | undefined

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    intersectionCallback = callback
    lastObserverOptions = options
  }

  observe = mockObserve
  unobserve = mockUnobserve
  disconnect = mockDisconnect
  takeRecords = (): IntersectionObserverEntry[] => []
}

// Helper to create mock IntersectionObserverEntry
function createMockEntry(
  target: Element,
  isIntersecting: boolean
): IntersectionObserverEntry {
  return {
    isIntersecting,
    target,
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRatio: isIntersecting ? 1 : 0,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
    time: Date.now(),
  }
}

// Test component that uses the hook and renders an element
function TestComponent({
  options = {},
  testId = 'test-element',
}: {
  options?: Parameters<typeof useScrollAnimation>[0]
  testId?: string
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(options)
  return (
    <div ref={ref} data-testid={testId} data-visible={isVisible}>
      {isVisible ? 'visible' : 'hidden'}
    </div>
  )
}

describe('useScrollAnimation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    intersectionCallback = null
    lastObserverOptions = undefined
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns ref and isVisible state', () => {
    render(<TestComponent />)
    const element = screen.getByTestId('test-element')

    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute('data-visible', 'false')
  })

  it('isVisible initially false', () => {
    render(<TestComponent />)
    const element = screen.getByTestId('test-element')

    expect(element).toHaveTextContent('hidden')
  })

  it('calls IntersectionObserver with correct default options', () => {
    render(<TestComponent />)

    expect(lastObserverOptions?.threshold).toBe(0.1)
    expect(lastObserverOptions?.rootMargin).toBe('0px')
  })

  it('calls IntersectionObserver with custom options', () => {
    render(
      <TestComponent
        options={{
          threshold: 0.5,
          rootMargin: '10px',
          triggerOnce: false,
        }}
      />
    )

    expect(lastObserverOptions?.threshold).toBe(0.5)
    expect(lastObserverOptions?.rootMargin).toBe('10px')
  })

  it('observes element when mounted', () => {
    render(<TestComponent />)

    expect(mockObserve).toHaveBeenCalled()
  })

  it('sets isVisible true when intersecting', () => {
    render(<TestComponent />)
    const element = screen.getByTestId('test-element')

    expect(element).toHaveAttribute('data-visible', 'false')

    // Simulate intersection
    act(() => {
      intersectionCallback!(
        [createMockEntry(element, true)],
        { unobserve: mockUnobserve } as unknown as IntersectionObserver
      )
    })

    expect(element).toHaveAttribute('data-visible', 'true')
    expect(element).toHaveTextContent('visible')
  })

  it('unobserves after first trigger when triggerOnce: true (default)', () => {
    render(<TestComponent />)
    const element = screen.getByTestId('test-element')

    // Simulate intersection
    act(() => {
      intersectionCallback!(
        [createMockEntry(element, true)],
        { unobserve: mockUnobserve } as unknown as IntersectionObserver
      )
    })

    expect(mockUnobserve).toHaveBeenCalledWith(element)
  })

  it('toggles visibility when triggerOnce: false', () => {
    render(<TestComponent options={{ triggerOnce: false }} />)
    const element = screen.getByTestId('test-element')

    // Enter viewport
    act(() => {
      intersectionCallback!(
        [createMockEntry(element, true)],
        { unobserve: mockUnobserve } as unknown as IntersectionObserver
      )
    })

    expect(element).toHaveAttribute('data-visible', 'true')

    // Leave viewport
    act(() => {
      intersectionCallback!(
        [createMockEntry(element, false)],
        { unobserve: mockUnobserve } as unknown as IntersectionObserver
      )
    })

    expect(element).toHaveAttribute('data-visible', 'false')
  })

  it('does not unobserve when triggerOnce: false and element becomes visible', () => {
    render(<TestComponent options={{ triggerOnce: false }} />)
    const element = screen.getByTestId('test-element')

    // Clear the initial observe call
    mockUnobserve.mockClear()

    // Trigger intersection
    act(() => {
      intersectionCallback!(
        [createMockEntry(element, true)],
        { unobserve: mockUnobserve } as unknown as IntersectionObserver
      )
    })

    // Should not have called unobserve when triggerOnce is false
    expect(mockUnobserve).not.toHaveBeenCalled()
  })

  it('cleanup unobserves element on unmount', () => {
    const { unmount } = render(<TestComponent />)

    // Clear mocks to isolate cleanup behavior
    mockUnobserve.mockClear()

    unmount()

    expect(mockUnobserve).toHaveBeenCalled()
  })
})
