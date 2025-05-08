import type { SiteConfig } from "@/types";

type Link = { path: string; title: string; icon?: string };
type LinkGroup = {
	name: string;
	className?: string;
	links: Link[];
};

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "Gary Mann",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "en-US",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	// Used as the default description meta property and webmanifest description
	description: "Personal site for Gary Mann",
	// HTML lang property, found in src/layouts/Base.astro L:18 & astro.config.ts L:48
	lang: "en-US",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "en_US",
	// Used to construct the meta title property found in src/components/BaseHead.astro L:11, and webmanifest name found in astro.config.ts L:42
	title: "Gary Mann",
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/about/",
		title: "About",
	},
	{
		path: "/writing/",
		title: "Writing",
	},
	{
		path: "/notes/",
		title: "Notes",
	},
];

export const socialLinks: Link[] = [
	{
		path: "https://github.com/garythemann",
		title: "GitHub",
		icon: "ei:sc-github",
	},
	{
		path: "https://linkedin.com/in/gzma",
		title: "LinkedIn",
		icon: "ei:sc-linkedin",
	},
];

export const footerLinks: LinkGroup[] = [
	{
		className: "font-semibold",
		links: [
			{
				path: "/",
				title: "Home",
			},
			...menuLinks,
		],
	},
	{
		links: [
			...socialLinks,
			{
				path: "/rss.xml",
				title: "Updates (RSS)",
				icon: "mdi:rss",
			},
		],
	},
	{
		className: "text-xs",
		links: [
			{
				path: "/colophon",
				title: "Colophon",
			},
			{
				path: "/writing#disclaimer",
				title: "Disclaimer",
			},
		],
	},
];
