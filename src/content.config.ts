import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}

const baseSchema = z.object({
	title: z.string().max(90),
	description: z.string(),
	className: z.string().optional(),
});

const basePostSchema = ({ image }) =>
	baseSchema.extend({
		coverImage: z
			.object({
				alt: z.string(),
				src: image(),
			})
			.optional(),
		draft: z.boolean().default(false),
		ogImage: z.string().optional(),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
		publishDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
	});

const post = defineCollection({
	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		basePostSchema({ image }).extend({
			seriesId: z.string().optional(),
			orderInSeries: z.number().optional(),
		}),
});

const note = defineCollection({
	loader: glob({ base: "./src/content/note", pattern: "**/*.{md,mdx}" }),
	schema: basePostSchema,
});

const article = defineCollection({
	loader: glob({ base: "./src/content/article", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema,
});

const series = defineCollection({
	loader: glob({ base: "./src/content/series", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		id: z.string(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { post, note, article, series };
