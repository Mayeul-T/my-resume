import { describe, it, expect } from 'vitest'
import {
  MetaSchema,
  SocialsSchema,
  HeroSchema,
  AboutSchema,
  ExperienceItemSchema,
  SkillSchema,
  EducationItemSchema,
  ProjectItemSchema,
  ResumeSchema,
} from '@/lib/schemas/resume'
import { validResume, minimalValidResume } from '@/__tests__/fixtures/resume'

describe('MetaSchema', () => {
  it('valid meta passes', () => {
    const result = MetaSchema.safeParse({
      title: 'My Resume',
      description: 'A great resume',
    })
    expect(result.success).toBe(true)
  })

  it('missing title fails', () => {
    const result = MetaSchema.safeParse({
      description: 'A description',
    })
    expect(result.success).toBe(false)
  })

  it('missing description fails', () => {
    const result = MetaSchema.safeParse({
      title: 'Title',
    })
    expect(result.success).toBe(false)
  })
})

describe('SocialsSchema', () => {
  it('all optional fields pass when empty', () => {
    const result = SocialsSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('valid URLs pass', () => {
    const result = SocialsSchema.safeParse({
      github: 'https://github.com/user',
      linkedin: 'https://linkedin.com/in/user',
      twitter: 'https://twitter.com/user',
    })
    expect(result.success).toBe(true)
  })

  it('invalid URL fails', () => {
    const result = SocialsSchema.safeParse({
      github: 'not-a-url',
    })
    expect(result.success).toBe(false)
  })

  it('invalid email fails', () => {
    const result = SocialsSchema.safeParse({
      email: 'not-an-email',
    })
    expect(result.success).toBe(false)
  })

  it('valid email passes', () => {
    const result = SocialsSchema.safeParse({
      email: 'test@example.com',
    })
    expect(result.success).toBe(true)
  })
})

describe('HeroSchema', () => {
  it('valid hero passes', () => {
    const result = HeroSchema.safeParse({
      name: 'John Doe',
      title: 'Software Engineer',
      subtitle: 'Full Stack Developer',
      description: 'Building great things',
      socials: {},
    })
    expect(result.success).toBe(true)
  })

  it('missing name fails', () => {
    const result = HeroSchema.safeParse({
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Desc',
      socials: {},
    })
    expect(result.success).toBe(false)
  })

  it('missing title fails', () => {
    const result = HeroSchema.safeParse({
      name: 'Name',
      subtitle: 'Subtitle',
      description: 'Desc',
      socials: {},
    })
    expect(result.success).toBe(false)
  })

  it('missing subtitle fails', () => {
    const result = HeroSchema.safeParse({
      name: 'Name',
      title: 'Title',
      description: 'Desc',
      socials: {},
    })
    expect(result.success).toBe(false)
  })

  it('missing description fails', () => {
    const result = HeroSchema.safeParse({
      name: 'Name',
      title: 'Title',
      subtitle: 'Subtitle',
      socials: {},
    })
    expect(result.success).toBe(false)
  })

  it('optional profileImage can be omitted', () => {
    const result = HeroSchema.safeParse({
      name: 'Name',
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Desc',
      socials: {},
    })
    expect(result.success).toBe(true)
  })

  it('profileImage can be provided', () => {
    const result = HeroSchema.safeParse({
      name: 'Name',
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Desc',
      profileImage: '/images/profile.jpg',
      socials: {},
    })
    expect(result.success).toBe(true)
  })

  it('optional cvUrl can be omitted', () => {
    const result = HeroSchema.safeParse({
      name: 'Name',
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Desc',
      socials: {},
    })
    expect(result.success).toBe(true)
  })

  it('valid cvUrl passes', () => {
    const result = HeroSchema.safeParse({
      name: 'Name',
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Desc',
      cvUrl: 'https://example.com/cv.pdf',
      socials: {},
    })
    expect(result.success).toBe(true)
  })

  it('invalid cvUrl fails', () => {
    const result = HeroSchema.safeParse({
      name: 'Name',
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Desc',
      cvUrl: 'not-a-url',
      socials: {},
    })
    expect(result.success).toBe(false)
  })
})

describe('AboutSchema', () => {
  it('valid about passes', () => {
    const result = AboutSchema.safeParse({
      description: 'About me text',
      highlights: ['Highlight 1', 'Highlight 2'],
    })
    expect(result.success).toBe(true)
  })

  it('empty highlights array fails (min 1)', () => {
    const result = AboutSchema.safeParse({
      description: 'About me',
      highlights: [],
    })
    expect(result.success).toBe(false)
  })

  it('missing description fails', () => {
    const result = AboutSchema.safeParse({
      highlights: ['One'],
    })
    expect(result.success).toBe(false)
  })
})

describe('ExperienceItemSchema', () => {
  it('valid experience item passes', () => {
    const result = ExperienceItemSchema.safeParse({
      id: 'exp-1',
      company: 'Tech Corp',
      position: 'Engineer',
      location: 'NYC',
      startDate: '2020-01',
      description: 'Did stuff',
      achievements: ['Built things'],
      technologies: ['TypeScript'],
    })
    expect(result.success).toBe(true)
  })

  it('missing required fields fail', () => {
    const result = ExperienceItemSchema.safeParse({
      id: 'exp-1',
    })
    expect(result.success).toBe(false)
  })

  it('optional endDate can be omitted', () => {
    const result = ExperienceItemSchema.safeParse({
      id: 'exp-1',
      company: 'Company',
      position: 'Position',
      location: 'Location',
      startDate: '2020-01',
      description: 'Desc',
      achievements: [],
      technologies: [],
    })
    expect(result.success).toBe(true)
  })

  it('endDate can be provided', () => {
    const result = ExperienceItemSchema.safeParse({
      id: 'exp-1',
      company: 'Company',
      position: 'Position',
      location: 'Location',
      startDate: '2020-01',
      endDate: '2022-12',
      description: 'Desc',
      achievements: [],
      technologies: [],
    })
    expect(result.success).toBe(true)
  })
})

describe('SkillSchema', () => {
  it('valid skill passes', () => {
    const result = SkillSchema.safeParse({
      name: 'TypeScript',
      level: 85,
    })
    expect(result.success).toBe(true)
  })

  it('level outside 0-100 range fails (above)', () => {
    const result = SkillSchema.safeParse({
      name: 'Skill',
      level: 101,
    })
    expect(result.success).toBe(false)
  })

  it('level outside 0-100 range fails (below)', () => {
    const result = SkillSchema.safeParse({
      name: 'Skill',
      level: -1,
    })
    expect(result.success).toBe(false)
  })

  it('level is optional', () => {
    const result = SkillSchema.safeParse({
      name: 'Skill',
    })
    expect(result.success).toBe(true)
  })

  it('level at boundary values passes', () => {
    expect(SkillSchema.safeParse({ name: 'S', level: 0 }).success).toBe(true)
    expect(SkillSchema.safeParse({ name: 'S', level: 100 }).success).toBe(true)
  })
})

describe('EducationItemSchema', () => {
  it('valid education item passes', () => {
    const result = EducationItemSchema.safeParse({
      id: 'edu-1',
      institution: 'University',
      degree: 'BS',
      field: 'CS',
      location: 'Boston',
      startDate: '2014-09',
    })
    expect(result.success).toBe(true)
  })

  it('all required fields validated', () => {
    const result = EducationItemSchema.safeParse({
      id: 'edu-1',
    })
    expect(result.success).toBe(false)
  })

  it('optional endDate and description work', () => {
    const result = EducationItemSchema.safeParse({
      id: 'edu-1',
      institution: 'Uni',
      degree: 'MS',
      field: 'SE',
      location: 'NYC',
      startDate: '2018-09',
      endDate: '2020-05',
      description: 'Studied hard',
    })
    expect(result.success).toBe(true)
  })
})

describe('ProjectItemSchema', () => {
  it('valid project passes', () => {
    const result = ProjectItemSchema.safeParse({
      id: 'proj-1',
      title: 'My Project',
      description: 'A cool project',
      technologies: ['React', 'TypeScript'],
    })
    expect(result.success).toBe(true)
  })

  it('invalid liveUrl fails', () => {
    const result = ProjectItemSchema.safeParse({
      id: 'proj-1',
      title: 'Project',
      description: 'Desc',
      technologies: [],
      liveUrl: 'not-a-url',
    })
    expect(result.success).toBe(false)
  })

  it('invalid githubUrl fails', () => {
    const result = ProjectItemSchema.safeParse({
      id: 'proj-1',
      title: 'Project',
      description: 'Desc',
      technologies: [],
      githubUrl: 'not-a-url',
    })
    expect(result.success).toBe(false)
  })

  it('valid URLs pass', () => {
    const result = ProjectItemSchema.safeParse({
      id: 'proj-1',
      title: 'Project',
      description: 'Desc',
      technologies: [],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/user/repo',
    })
    expect(result.success).toBe(true)
  })
})

describe('ResumeSchema (composite)', () => {
  it('complete valid resume passes', () => {
    const result = ResumeSchema.safeParse(validResume)
    expect(result.success).toBe(true)
  })

  it('minimal valid resume passes', () => {
    const result = ResumeSchema.safeParse(minimalValidResume)
    expect(result.success).toBe(true)
  })

  it('nested validation errors bubble up', () => {
    const invalidResume = {
      ...minimalValidResume,
      hero: {
        ...minimalValidResume.hero,
        name: '', // Invalid: empty string
      },
    }
    const result = ResumeSchema.safeParse(invalidResume)
    expect(result.success).toBe(false)
  })

  it('missing top-level section fails', () => {
    const { meta, ...rest } = minimalValidResume
    const result = ResumeSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })
})
