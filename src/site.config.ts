import type { SiteConfig } from "@/types";

type Link = { href: string; title: string; icon?: string };
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
export const menuLinks: { href: string; title: string }[] = [
	{
		href: "/",
		title: "About",
	},
	{
		href: "/writing/",
		title: "Writing",
	},
	{
		href: "/notes/",
		title: "Notes",
	},
];

export const socialLinks: Link[] = [
	{
		href: "https://github.com/garythemann",
		title: "GitHub",
		icon: "ei:sc-github",
	},
	{
		href: "https://linkedin.com/in/gzma",
		title: "LinkedIn",
		icon: "ei:sc-linkedin",
	},
];

export const footerLinks: LinkGroup[] = [
	{
		className: "font-semibold",
		links: [
			{
				href: "/",
				title: "Home",
			},
			...menuLinks,
		],
	},
	{
		links: [
			...socialLinks,
			{
				href: "/rss.xml",
				title: "Updates (RSS)",
				icon: "mdi:rss",
			},
		],
	},
	{
		className: "text-xs",
		links: [
			{
				href: "/colophon",
				title: "Colophon",
			},
			{
				href: "https://github.com/garythemann/garymann.org",
				title: "Source",
			},
			{
				href: "/writing#disclaimer",
				title: "Disclaimer",
			},
		],
	},
];
