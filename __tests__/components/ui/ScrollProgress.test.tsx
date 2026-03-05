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
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useSpring: (v: unknown) => v,
    useTransform: () => ({ get: () => 0 }),
  }
})

import { ScrollProgress } from '@/components/ui/ScrollProgress'

describe('ScrollProgress', () => {
  it('renders a fixed bar at the top', () => {
    const { container } = render(<ScrollProgress />)
    const bar = container.firstChild as HTMLElement
    expect(bar).toBeInTheDocument()
    expect(bar.className).toContain('fixed')
    expect(bar.className).toContain('top-0')
  })

  it('has gradient background', () => {
    const { container } = render(<ScrollProgress />)
    const bar = container.firstChild as HTMLElement
    expect(bar.className).toContain('bg-gradient-to-r')
  })
})
