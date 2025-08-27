import { defineContentConfig, defineCollection, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    album: defineCollection({
      type: "page",
      source: "v0/1/album/*.md",
      schema: z.object({
        title: z.string(),
        by: z.string(),
        image: z.string().url().optional(),
        spotifyId: z.string().optional(),
        appleMusicId: z.string().optional(),
        youTubeMusicId: z.string().optional(),
      }),
    }),
    bandcamp: defineCollection({
      type: "page",
      source: "v0/1/bandcamp/*.md",
      schema: z.object({
        title: z.string(),
        by: z.string(),
        image: z.string().url().optional(),
        bandcampId: z.string(),
        releaseDate: z.string().optional(),
      }),
    }),
  },
})
