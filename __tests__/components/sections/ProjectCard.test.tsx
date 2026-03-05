import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      viewProject: 'View Project',
      viewCode: 'View Code',
    }
    return translations[key] || key
  },
}))

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

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props
    return <img {...rest} />
  },
}))

import { ProjectCard } from '@/components/sections/Projects/ProjectCard'

const baseProject = {
  id: 'proj-1',
  title: 'Test Project',
  description: 'A test project description',
  technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'GraphQL'],
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com/user/repo',
}

describe('ProjectCard', () => {
  it('displays all technologies without truncation', () => {
    render(<ProjectCard project={baseProject} index={0} />)

    for (const tech of baseProject.technologies) {
      expect(screen.getByText(tech)).toBeInTheDocument()
    }
  })

  it('does not show a "+N" badge', () => {
    render(<ProjectCard project={baseProject} index={0} />)

    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument()
  })

  it('works with more than 5 technologies', () => {
    const manyTechs = {
      ...baseProject,
      technologies: Array.from({ length: 12 }, (_, i) => `Tech${i + 1}`),
    }
    render(<ProjectCard project={manyTechs} index={0} />)

    for (const tech of manyTechs.technologies) {
      expect(screen.getByText(tech)).toBeInTheDocument()
    }
    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument()
  })

  it('renders project title and description', () => {
    render(<ProjectCard project={baseProject} index={0} />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('A test project description')).toBeInTheDocument()
  })
})
