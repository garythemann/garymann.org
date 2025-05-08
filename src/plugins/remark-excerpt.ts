import { toString as mdastToString } from "mdast-util-to-string";

export function remarkExcerpt() {
	// @ts-expect-error:next-line
	return (tree, { data }) => {
		const textOnPage = mdastToString(tree);
		data.astro.frontmatter.excerpt = textOnPage.substring(0, 220) + "...";
	};
}
