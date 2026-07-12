import { z } from 'zod';

// ─── Helpers ───────────────────────────────────────────

export function formatZodErrors(error: z.ZodError): string {
  return error.issues
    .map((e: z.ZodIssue) => {
      const field = e.path.length > 0 ? e.path.join('.') + ' : ' : '';
      return field + e.message;
    })
    .join(' ');
}

// ─── Newsletter ────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "L'email est requis.")
    .email('Format d\'email invalide.'),
});

// ─── Message ───────────────────────────────────────────

export const messageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Le nom est requis.')
    .max(200, 'Le nom ne peut pas dépasser 200 caractères.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "L'email est requis.")
    .email("Format d'email invalide."),
  phone: z
    .string()
    .trim()
    .max(50, 'Le téléphone ne peut pas dépasser 50 caractères.')
    .optional()
    .default(''),
  service: z
    .string()
    .trim()
    .max(200)
    .optional()
    .default('Général'),
  subject: z
    .string()
    .trim()
    .max(300)
    .optional()
    .default('Nouveau message'),
  message: z
    .string()
    .trim()
    .min(1, 'Le message est requis.')
    .max(5000, 'Le message ne peut pas dépasser 5000 caractères.')
    .optional(),
  content: z
    .string()
    .trim()
    .min(1, 'Le message est requis.')
    .max(5000, 'Le message ne peut pas dépasser 5000 caractères.')
    .optional(),
}).refine(
  (data) => data.message || data.content,
  { message: 'Le message est requis.' }
);



// ─── Posts ─────────────────────────────────────────────

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Le titre est requis.')
    .max(300, 'Le titre ne peut pas dépasser 300 caractères.'),
  slug: z.string().trim().max(300).optional(),
  excerpt: z
    .string()
    .trim()
    .min(1, "L'extrait est requis.")
    .max(600, "L'extrait ne peut pas dépasser 600 caractères."),
  content: z
    .string()
    .trim()
    .min(1, 'Le contenu est requis.'),
  imageUrl: z
    .string()
    .trim()
    .url('URL d\'image invalide.')
    .min(1, 'L\'image est requise.'),
  category: z
    .string()
    .trim()
    .min(1, 'La catégorie est requise.')
    .max(100),
  tags: z.array(z.string()).optional(),
  author: z.string().trim().max(200).optional().default('Galsen Technologie'),
  published: z.boolean().optional().default(false),
});

export const postUpdateSchema = postSchema.partial();

// ─── Projects ──────────────────────────────────────────

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Le titre est requis.')
    .max(300),
  slug: z.string().trim().max(300).optional(),
  category: z
    .string()
    .trim()
    .min(1, 'La catégorie est requise.')
    .max(100),
  client: z.string().trim().max(200).optional().nullable(),
  year: z.string().trim().max(10).optional().nullable(),
  description: z
    .string()
    .trim()
    .min(1, 'La description est requise.')
    .max(1000),
  content: z.string().trim().optional().default(''),
  techStack: z.array(z.string()).optional(),
  imageUrl: z
    .string()
    .trim()
    .url("URL d'image invalide.")
    .min(1, "L'image est requise."),
  liveUrl: z.string().trim().url('URL invalide.').optional().nullable(),
  published: z.boolean().optional().default(false),
});

export const projectUpdateSchema = projectSchema.partial();

// ─── Services ──────────────────────────────────────────

export const serviceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Le titre est requis.')
    .max(200),
  slug: z.string().trim().max(200).optional(),
  description: z
    .string()
    .trim()
    .min(1, 'La description est requise.')
    .max(500),
  content: z.string().trim().optional().default(''),
  icon: z.string().trim().optional().default('Code2'),
  color: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, 'Couleur invalide (format hex requis).')
    .optional()
    .default('#22C55E'),
  features: z.array(z.string()).optional(),
  imageUrl: z.string().trim().url('URL invalide.').optional().nullable(),
  active: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
});

export const serviceUpdateSchema = serviceSchema.partial();

// ─── Testimonials ──────────────────────────────────────

export const testimonialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Le nom est requis.')
    .max(200),
  role: z
    .string()
    .trim()
    .min(1, 'Le rôle est requis.')
    .max(200),
  company: z.string().trim().max(200).optional().default(''),
  content: z
    .string()
    .trim()
    .min(1, 'Le contenu est requis.')
    .max(2000),
  rating: z
    .number()
    .int()
    .min(1, 'La note doit être entre 1 et 5.')
    .max(5, 'La note doit être entre 1 et 5.')
    .optional()
    .default(5),
  imageUrl: z.string().trim().url('URL invalide.').optional().nullable(),
  published: z.boolean().optional().default(true),
});

export const testimonialUpdateSchema = testimonialSchema.partial();

// ─── Settings ──────────────────────────────────────────

export const settingsSchema = z.record(
  z.string().min(1).max(100),
  z.string()
);
