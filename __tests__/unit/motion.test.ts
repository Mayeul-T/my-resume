import { describe, it, expect } from 'vitest'
import {
  spring,
  springSnappy,
  springBouncy,
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
  scalePop,
  blurIn,
  blurScale,
  slideReveal,
  stagger,
  viewportOnce,
} from '@/lib/motion'

describe('spring configs', () => {
  it('spring has type "spring"', () => {
    expect(spring).toMatchObject({ type: 'spring' })
  })

  it('springSnappy has higher stiffness than spring', () => {
    expect((springSnappy as { stiffness: number }).stiffness).toBeGreaterThan(
      (spring as { stiffness: number }).stiffness
    )
  })

  it('springBouncy has lower damping than springSnappy', () => {
    expect((springBouncy as { damping: number }).damping).toBeLessThan(
      (springSnappy as { damping: number }).damping
    )
  })
})

describe('animation variants', () => {
  it.each([
    ['fadeUp', fadeUp],
    ['fadeDown', fadeDown],
    ['fadeLeft', fadeLeft],
    ['fadeRight', fadeRight],
    ['scaleIn', scaleIn],
    ['scalePop', scalePop],
    ['blurIn', blurIn],
    ['blurScale', blurScale],
    ['slideReveal', slideReveal],
  ])('%s has hidden and visible states', (_name, variant) => {
    expect(variant).toHaveProperty('hidden')
    expect(variant).toHaveProperty('visible')
  })

  it('fadeUp hidden has opacity 0 and positive y offset', () => {
    const hidden = fadeUp.hidden as { opacity: number; y: number }
    expect(hidden.opacity).toBe(0)
    expect(hidden.y).toBeGreaterThan(0)
  })

  it('fadeUp visible has opacity 1 and y 0', () => {
    const visible = fadeUp.visible as { opacity: number; y: number }
    expect(visible.opacity).toBe(1)
    expect(visible.y).toBe(0)
  })

  it('blurIn hidden applies blur filter', () => {
    const hidden = blurIn.hidden as { filter: string }
    expect(hidden.filter).toContain('blur')
  })

  it('blurIn visible removes blur', () => {
    const visible = blurIn.visible as { filter: string }
    expect(visible.filter).toBe('blur(0em)')
  })

  it('scalePop hidden starts at scale 0', () => {
    const hidden = scalePop.hidden as { scale: number }
    expect(hidden.scale).toBe(0)
  })
})

describe('stagger factory', () => {
  it('returns variants with hidden and visible', () => {
    const result = stagger()
    expect(result).toHaveProperty('hidden')
    expect(result).toHaveProperty('visible')
  })

  it('uses default staggerChildren of 0.08', () => {
    const result = stagger()
    const visible = result.visible as { transition: { staggerChildren: number } }
    expect(visible.transition.staggerChildren).toBe(0.08)
  })

  it('uses default delayChildren of 0', () => {
    const result = stagger()
    const visible = result.visible as { transition: { delayChildren: number } }
    expect(visible.transition.delayChildren).toBe(0)
  })

  it('accepts custom staggerChildren', () => {
    const result = stagger(0.15)
    const visible = result.visible as { transition: { staggerChildren: number } }
    expect(visible.transition.staggerChildren).toBe(0.15)
  })

  it('accepts custom delayChildren', () => {
    const result = stagger(0.1, 0.5)
    const visible = result.visible as { transition: { delayChildren: number } }
    expect(visible.transition.delayChildren).toBe(0.5)
  })
})

describe('viewportOnce', () => {
  it('has once: true', () => {
    expect(viewportOnce.once).toBe(true)
  })

  it('has a negative margin', () => {
    expect(viewportOnce.margin).toMatch(/^-/)
  })
})
