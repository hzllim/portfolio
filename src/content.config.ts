import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    coverImage: z.string().nullable().optional(),
    date: z.string().or(z.date()).optional(),
    category: z.string().default("branding"),
    role: z.string().optional(),
    featured: z.boolean().default(true),
    published: z.boolean().default(true),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "index.{md,mdoc}", base: "./src/content/about" }),
  schema: z.object({
    name: z.string(),
    tagline: z.string().optional(),
    avatar: z.string().nullable().optional(),
    email: z.string().optional(),
    location: z.string().optional(),
    socialLinks: z
      .array(
        z.object({
          platform: z.string().default("Link"),
          url: z.string().default("#"),
        }),
      )
      .nullable()
      .optional(),
  }),
});

export const collections = { projects, about };
