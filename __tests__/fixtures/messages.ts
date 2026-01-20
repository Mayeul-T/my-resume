import type { Messages } from '@/lib/schemas/messages'

export const validMessages: Messages = {
  nav: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    education: 'Education',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    downloadCv: 'Download CV',
  },
  about: {
    title: 'About Me',
  },
  experience: {
    title: 'Experience',
    present: 'Present',
  },
  skills: {
    title: 'Skills',
  },
  education: {
    title: 'Education',
  },
  projects: {
    title: 'Projects',
    viewProject: 'View Project',
    viewCode: 'View Code',
  },
  hobbies: {
    title: 'Hobbies',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Get in touch',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send',
    sending: 'Sending...',
    success: 'Message sent!',
    error: 'Failed to send message',
  },
  footer: {
    rights: 'All rights reserved',
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
  },
  language: {
    switch: 'Switch language',
  },
}
