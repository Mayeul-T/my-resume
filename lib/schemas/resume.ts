import "server-only";
import { z } from "zod";

// ===== META (SEO) =====
export const MetaSchema = z.object({
  title: z.string().min(1, "Meta title is required"),
  description: z.string().min(1, "Meta description is required"),
});

// ===== HERO SECTION =====
export const SocialsSchema = z.object({
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  email: z.string().email().optional(),
});

export const HeroSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  profileImage: z.string().refine(
    (val) => val.startsWith('/') || val.startsWith('http'),
    'Must be an absolute path or URL'
  ).optional(),
  cvUrl: z.string().url().optional(),
  socials: SocialsSchema,
});

// ===== ABOUT SECTION =====
export const AboutSchema = z.object({
  description: z.string().min(1, "About description is required"),
  highlights: z.array(z.string()).min(1, "At least one highlight is required"),
});

// ===== EXPERIENCE SECTION =====
export const ExperienceItemSchema = z.object({
  id: z.string().min(1, "Experience ID is required"),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  achievements: z.array(z.string()),
  technologies: z.array(z.string()),
});

export const ExperienceSchema = z.object({
  items: z.array(ExperienceItemSchema),
});

// ===== SKILLS SECTION =====
export const SkillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  level: z.number().min(0).max(100).optional(),
});

export const SkillCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  skills: z.array(SkillSchema).min(1, "At least one skill is required"),
});

export const SkillsSchema = z.object({
  categories: z.array(SkillCategorySchema),
});

// ===== EDUCATION SECTION =====
export const EducationItemSchema = z.object({
  id: z.string().min(1, "Education ID is required"),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const EducationSchema = z.object({
  items: z.array(EducationItemSchema),
});

// ===== PROJECTS SECTION =====
export const ProjectItemSchema = z.object({
  id: z.string().min(1, "Project ID is required"),
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  image: z.string().optional(),
  technologies: z.array(z.string()),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
});

export const ProjectsSchema = z.object({
  items: z.array(ProjectItemSchema),
});

// ===== HOBBIES SECTION =====
export const HobbyItemSchema = z.object({
  id: z.string().min(1, "Hobby ID is required"),
  name: z.string().min(1, "Hobby name is required"),
  duration: z.string().optional(),
  organizations: z.array(z.string()).optional(),
});

export const HobbiesSchema = z.object({
  items: z.array(HobbyItemSchema),
});

// ===== MAIN RESUME SCHEMA =====
export const ResumeSchema = z.object({
  meta: MetaSchema,
  hero: HeroSchema,
  about: AboutSchema,
  experience: ExperienceSchema,
  skills: SkillsSchema,
  education: EducationSchema,
  projects: ProjectsSchema,
  hobbies: HobbiesSchema.optional(),
});

// ===== TYPE EXPORTS =====
export type Meta = z.infer<typeof MetaSchema>;
export type Socials = z.infer<typeof SocialsSchema>;
export type Hero = z.infer<typeof HeroSchema>;
export type About = z.infer<typeof AboutSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type Skills = z.infer<typeof SkillsSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type ProjectItem = z.infer<typeof ProjectItemSchema>;
export type Projects = z.infer<typeof ProjectsSchema>;
export type HobbyItem = z.infer<typeof HobbyItemSchema>;
export type Hobbies = z.infer<typeof HobbiesSchema>;
export type Resume = z.infer<typeof ResumeSchema>;
