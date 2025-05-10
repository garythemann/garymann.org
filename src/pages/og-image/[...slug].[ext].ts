import DefaultSansLight from "@/assets/fonts/DefaultSans-Light.ttf";
import DMSerifDisplay from "@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff";
import DefaultSansLightItalic from "@/assets/fonts/DefaultSans-LightItalic.ttf";
import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site.config";
import { getFormattedDate } from "@/utils/date";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext, InferGetStaticPropsType } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

const ogOptions: SatoriOptions = {
	// debug: true,
	fonts: [
		{
			data: Buffer.from(DefaultSansLight),
			name: "Default Sans",
			style: "normal",
			weight: 300,
		},
		{
			data: Buffer.from(DefaultSansLightItalic),
			name: "Default Sans",
			style: "italic",
			weight: 300,
		},
		{
			data: Buffer.from(DMSerifDisplay),
			name: "DM Serif Display",
			style: "regular",
			weight: 400,
		},
	],
	height: 630,
	width: 1200,
};

const markup = (title: string, pubDate: string) =>
	html` <div tw="flex flex-col w-full h-full bg-[#1c1c31] text-[#6b6b6b]">
		<div tw="flex flex-col flex-1 w-full p-10 justify-center">
			<p tw="text-3xl mb-6 text-[#8e8e8e] font-medium">${pubDate}</p>
			<!-- TODO Would be better to do font[DM_Serif_Display] -->
			<h1
				style="font-family: DM Serif Display"
				tw="text-6xl font-semibold leading-snug text-[#CCC]"
			>
				${title}
			</h1>
		</div>
		<div
			tw="flex items-end justify-between w-full p-10 border-t border-[#dbdbdb] text-3xl text-[#c9e55d]"
		>
			<div tw="flex items-center">
				<p tw="ml-3 text-5xl text-[#c9e55d] font-light italic">${siteConfig.title}</p>
			</div>
		</div>
	</div>`;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
	const { pubDate, title } = context.props as Props;
	const postDate = getFormattedDate(pubDate, {
		month: "long",
		weekday: "long",
	});
	const svg = await satori(markup(title, postDate), ogOptions);

	// ,    PNG
	if (context.url.pathname.endsWith(".png")) {
		const png = new Resvg(svg).render().asPng();
		return new Response(png, {
			headers: {
				"Cache-Control": "public, max-age=31536000, immutable",
				"Content-Type": "image/png",
			},
		});
	}

	// ,    SVG
	if (context.url.pathname.endsWith(".svg")) {
		return new Response(svg, {
			headers: {
				"Cache-Control": "public, max-age=31536000",
				"Content-Type": "image/svg+xml; charset=utf-8",
			},
		});
	}

	//      .png  .svg,
	return new Response("Unsupported format", { status: 400 });
}

export async function getStaticPaths() {
	const posts = await getAllPosts();
	return posts
		.filter(({ data }) => !data.ogImage)
		.flatMap((post) => {
			return [
				{
					params: { slug: post.id, ext: "png" },
					props: {
						pubDate: post.data.updatedDate ?? post.data.publishDate,
						title: post.data.title,
					},
				},
				{
					params: { slug: post.id, ext: "svg" },
					props: {
						pubDate: post.data.updatedDate ?? post.data.publishDate,
						title: post.data.title,
					},
				},
			];
		});
}
