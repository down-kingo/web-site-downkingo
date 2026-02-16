import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

const howToStepSchema = z.object({
  name: z.string(),
  text: z.string(),
  url: z.string().optional(),
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default("Emanuel Nunes"),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      refId: z.string().optional(),
      tags: z.array(z.string()).default([]),
      category: z
        .enum(["tutorial", "announcement", "guide", "release"])
        .default("announcement"),
      lang: z.enum(["en", "pt"]),
      draft: z.boolean().default(false),
      howTo: z
        .object({
          name: z.string(),
          description: z.string().optional(),
          totalTime: z.string().optional(),
          steps: z.array(howToStepSchema),
        })
        .optional(),
      faq: z.array(faqItemSchema).optional(),
    }),
});

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  blog: blogCollection,
};
