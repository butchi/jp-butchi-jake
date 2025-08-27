import { defineContentConfig, defineCollection, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    a: defineCollection({
      type: "page",
      source: "a/*.md",
      schema: z.object({
        title: z.string(),
        by: z.string(),
        description: z.string(),
        image: z.string().url().optional(),
        spotifyId: z.string().optional(),
        appleMusicId: z.string().optional(),
        youTubeMusicId: z.string().optional(),
      }),
    }),
  },
})
