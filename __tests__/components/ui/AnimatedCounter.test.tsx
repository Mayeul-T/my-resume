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
    useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
    useSpring: () => ({ on: () => vi.fn() }),
    useInView: () => false,
  }
})

import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

describe('AnimatedCounter', () => {
  it('renders with initial value of 0', () => {
    render(<AnimatedCounter target={85} />)
    const el = screen.getByText('0')
    expect(el).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<AnimatedCounter target={50} className="text-xl font-bold" />)
    const el = screen.getByText('0')
    expect(el.className).toContain('text-xl')
    expect(el.className).toContain('font-bold')
  })
})
