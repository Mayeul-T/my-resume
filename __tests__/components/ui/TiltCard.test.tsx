import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

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
    useMotionValue: () => ({ set: vi.fn(), get: () => 0.5 }),
    useSpring: (v: unknown) => v,
    useTransform: (...args: unknown[]) => {
      if (Array.isArray(args[0])) return { get: () => '' }
      return { get: () => 0 }
    },
  }
})

import { TiltCard } from '@/components/ui/TiltCard'

describe('TiltCard', () => {
  it('renders children', () => {
    render(<TiltCard><p>Hello</p></TiltCard>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies glass classes', () => {
    const { container } = render(<TiltCard><p>Test</p></TiltCard>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('glass')
  })

  it('applies custom className', () => {
    const { container } = render(<TiltCard className="custom-class"><p>Test</p></TiltCard>)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('custom-class')
  })
})
