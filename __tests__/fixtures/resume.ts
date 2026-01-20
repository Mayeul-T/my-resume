import type { Resume } from '@/lib/schemas/resume'

export const validResume: Resume = {
  meta: {
    title: 'Test Resume',
    description: 'A test resume for unit testing',
  },
  hero: {
    name: 'John Doe',
    title: 'Software Engineer',
    subtitle: 'Full Stack Developer',
    description: 'Building great software',
    socials: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      email: 'john@example.com',
    },
  },
  about: {
    description: 'A passionate developer',
    highlights: ['Experienced', 'Creative', 'Team player'],
  },
  experience: {
    items: [
      {
        id: 'exp-1',
        company: 'Tech Corp',
        position: 'Senior Developer',
        location: 'San Francisco, CA',
        startDate: '2020-01',
        description: 'Led development team',
        achievements: ['Improved performance by 50%'],
        technologies: ['TypeScript', 'React', 'Node.js'],
      },
    ],
  },
  skills: {
    categories: [
      {
        name: 'Frontend',
        skills: [
          { name: 'React', level: 90 },
          { name: 'TypeScript', level: 85 },
        ],
      },
    ],
  },
  education: {
    items: [
      {
        id: 'edu-1',
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'Boston, MA',
        startDate: '2014-09',
        endDate: '2018-06',
      },
    ],
  },
  projects: {
    items: [
      {
        id: 'proj-1',
        title: 'Portfolio Website',
        description: 'Personal portfolio built with Next.js',
        technologies: ['Next.js', 'TypeScript', 'Tailwind'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/johndoe/portfolio',
      },
    ],
  },
}

export const minimalValidResume: Resume = {
  meta: {
    title: 'Title',
    description: 'Description',
  },
  hero: {
    name: 'Name',
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    socials: {},
  },
  about: {
    description: 'About',
    highlights: ['Highlight'],
  },
  experience: {
    items: [],
  },
  skills: {
    categories: [],
  },
  education: {
    items: [],
  },
  projects: {
    items: [],
  },
}
