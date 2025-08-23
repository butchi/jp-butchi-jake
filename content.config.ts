import { defineContentConfig, defineCollection, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    a: defineCollection({
      type: "page",
      source: "a/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
  },
})
