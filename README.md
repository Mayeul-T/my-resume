# My Resume

A modern, internationalized portfolio/resume website built with Next.js 16, TailwindCSS 4, and TypeScript.

## Features

- 🌍 **Internationalization** - English and French support with URL-based routing (`/en`, `/fr`)
- 🌙 **Dark/Light Mode** - Theme toggle with system preference detection
- ⚡ **SSG** - Static site generation for optimal performance
- 🎨 **Animations** - Smooth scroll animations and transitions
- 📱 **Responsive** - Mobile-first design
- ✅ **Type-safe** - Full TypeScript support with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Create your resume data files
cp storage.example/resume.en.yml storage/resume.en.yml
cp storage.example/resume.fr.yml storage/resume.fr.yml

# Edit the files with your information
# Then start the development server
pnpm dev
```

### Environment Variables

Create a `.env.local` file:

```env
# Required for contact form
BREVO_API_KEY=your-brevo-api-key
CONTACT_EMAIL=your-email@example.com

# Optional: custom storage path
STORAGE_PATH=./storage
```

## Resume Data Format

The resume data is stored in `storage/resume.{locale}.yml` (or `.yaml`). The application validates these files at startup using Zod schemas. **If the file format is invalid, the application will not start.**

> **Note:** JSON is a valid subset of YAML, so you can use JSON syntax in your `.yml` files if you prefer.

### Schema Structure

```typescript
{
  meta: {
    title: string,          // Required - Page title (SEO)
    description: string     // Required - Page description (SEO)
  },

  hero: {
    name: string,           // Required - Your full name
    title: string,          // Required - Your job title
    subtitle: string,       // Required - A short tagline
    description: string,    // Required - Brief introduction
    profileImage?: string,  // Optional - Path to profile image
    socials: {
      github?: string,      // Optional - GitHub URL
      linkedin?: string,    // Optional - LinkedIn URL
      twitter?: string,     // Optional - Twitter/X URL
      email?: string        // Optional - Email address
    }
  },

  about: {
    description: string,    // Required - Detailed bio (supports \n for paragraphs)
    highlights: string[]    // Required - Array of key points (min 1)
  },

  experience: {
    items: [                // Array of experience items
      {
        id: string,         // Required - Unique identifier
        company: string,    // Required - Company name
        position: string,   // Required - Job title
        location: string,   // Required - City, Country
        startDate: string,  // Required - Format: "YYYY-MM" or "YYYY"
        endDate?: string,   // Optional - Format: "YYYY-MM" or "YYYY"
        description: string,// Required - Role description
        achievements: string[], // Array of achievements
        technologies: string[]  // Array of technologies used
      }
    ]
  },

  skills: {
    categories: [           // Array of skill categories
      {
        name: string,       // Required - Category name
        skills: [           // Required - At least 1 skill
          {
            name: string,   // Required - Skill name
            level?: number  // Optional - Proficiency 0-100
          }
        ]
      }
    ]
  },

  education: {
    items: [                // Array of education items
      {
        id: string,         // Required - Unique identifier
        institution: string,// Required - School/University name
        degree: string,     // Required - Degree type
        field: string,      // Required - Field of study
        location: string,   // Required - City, Country
        startDate?: string, // Optional - Format: "YYYY"
        endDate?: string,   // Optional - Format: "YYYY"
        description?: string// Optional - Additional details
      }
    ]
  },

  projects: {
    items: [                // Array of project items
      {
        id: string,         // Required - Unique identifier
        title: string,      // Required - Project name
        description: string,// Required - Project description
        image?: string,     // Optional - Path to project image
        technologies: string[], // Array of technologies
        liveUrl?: string,   // Optional - Live demo URL
        githubUrl?: string  // Optional - GitHub repository URL
      }
    ]
  },

  hobbies?: {               // Optional section
    items: [                // Array of hobby items
      {
        id: string,         // Required - Unique identifier
        name: string,       // Required - Hobby name
        duration?: string,  // Optional - How long you've practiced
        organizations?: string[] // Optional - Related clubs/organizations
      }
    ]
  }
}
```

### Minimal Example

```yaml
meta:
  title: Jane Smith - Software Engineer
  description: Portfolio of Jane Smith, a passionate software engineer.

hero:
  name: Jane Smith
  title: Software Engineer
  subtitle: Building great software
  description: A passionate developer.
  socials:
    email: jane@example.com

about:
  description: I build things.
  highlights:
    - Fast learner

experience:
  items: []

skills:
  categories: []

education:
  items: []

projects:
  items: []
```

### Validation Errors

If your YAML is invalid, you'll see detailed error messages:

```
ResumeValidationError: Invalid resume data for locale "en":
  - hero.name: Name is required
  - about.highlights: At least one highlight is required
  - experience.items.0.company: Company name is required
```

## Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Project Structure

```
my-resume/
├── app/                 # Next.js App Router
│   ├── [locale]/        # Internationalized pages
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── layout/          # Header, Footer, Theme
│   ├── sections/        # Page sections
│   └── ui/              # Reusable UI components
├── lib/
│   ├── data/            # Data fetching
│   ├── i18n/            # Internationalization config
│   └── schemas/         # Zod validation schemas
├── messages/            # UI translations
├── storage/             # Resume data (gitignored)
└── storage.example/     # Template files
```

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
