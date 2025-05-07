// Provide button-like affordance to NotePreview

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("[data-article-preview]").forEach((preview) => {
		let link = preview.querySelector("[data-article-preview-link]"),
			href = link && link instanceof HTMLAnchorElement && link.href;
		if (href) {
			preview.classList.add("cursor-pointer");
			preview.addEventListener("click", async () => {
				window.location.assign(href);
			});
		}
	});
});
