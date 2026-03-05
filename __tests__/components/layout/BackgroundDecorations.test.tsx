import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('framer-motion', async () => {
  const React = await import('react')
  const componentCache = new Map()
  const motionHandler: ProxyHandler<object> = {
    get: (_target, prop: string) => {
      if (!componentCache.has(prop)) {
        const MotionComponent = React.forwardRef(function MotionComponent(
          props: Record<string, unknown>,
          ref: React.Ref<unknown>
        ) {
          const {
            variants, initial, animate, whileInView, viewport,
            transition, whileHover, whileTap, exit, ...htmlProps
          } = props
          return React.createElement(prop, { ...htmlProps, ref }, props.children as React.ReactNode)
        })
        MotionComponent.displayName = `motion.${prop}`
        componentCache.set(prop, MotionComponent)
      }
      return componentCache.get(prop)
    },
  }
  return {
    motion: new Proxy({}, motionHandler),
  }
})

import { BackgroundDecorations } from '@/components/layout/BackgroundDecorations'

describe('BackgroundDecorations', () => {
  it('renders without crashing', () => {
    const { container } = render(<BackgroundDecorations />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('is hidden from assistive technology', () => {
    const { container } = render(<BackgroundDecorations />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveAttribute('aria-hidden')
  })

  it('is non-interactive (pointer-events-none)', () => {
    const { container } = render(<BackgroundDecorations />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('pointer-events-none')
  })

  it('renders multiple gradient orbs', () => {
    const { container } = render(<BackgroundDecorations />)
    const orbs = container.querySelectorAll('[class*="rounded-full"]')
    expect(orbs.length).toBeGreaterThanOrEqual(4)
  })
})
