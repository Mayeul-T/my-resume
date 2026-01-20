import { z } from "zod";

export const MessagesSchema = z.object({
  nav: z.object({
    about: z.string(),
    experience: z.string(),
    skills: z.string(),
    education: z.string(),
    projects: z.string(),
    contact: z.string(),
  }),
  hero: z.object({
    downloadCv: z.string(),
  }),
  about: z.object({
    title: z.string(),
  }),
  experience: z.object({
    title: z.string(),
    present: z.string(),
  }),
  skills: z.object({
    title: z.string(),
  }),
  education: z.object({
    title: z.string(),
  }),
  projects: z.object({
    title: z.string(),
    viewProject: z.string(),
    viewCode: z.string(),
  }),
  hobbies: z.object({
    title: z.string(),
  }),
  contact: z.object({
    title: z.string(),
    subtitle: z.string(),
    name: z.string(),
    email: z.string(),
    message: z.string(),
    send: z.string(),
    sending: z.string(),
    success: z.string(),
    error: z.string(),
  }),
  footer: z.object({
    rights: z.string(),
  }),
  theme: z.object({
    light: z.string(),
    dark: z.string(),
  }),
  language: z.object({
    switch: z.string(),
  }),
});

export type Messages = z.infer<typeof MessagesSchema>;
