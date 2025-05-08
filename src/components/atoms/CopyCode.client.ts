// Wait for the content to fully load
document.addEventListener("DOMContentLoaded", () => {
	// Find all pre blocks
	document.querySelectorAll("pre").forEach((pre) => {
		// Check if the button already exists
		if (!pre.querySelector(".copy-code")) {
			// Create the button
			const copyButton = document.createElement("button");
			copyButton.className =
				"absolute flex items-center justify-center bg-bgColor h-6 font-medium overflow-hidden rounded-md text-light hover:text-accent-two font-sans text-sm font-medium top-2 right-2";

			// Create the span element that will hold the button text
			const buttonText = document.createElement("span");
			buttonText.innerText = "Copy"; // Initial text
			buttonText.className = "flex items-center block w-full h-full px-2 bg-[var(--code-title-bg)]"; // Set the span to take up full width with background color

			copyButton.appendChild(buttonText); // Append span to the button

			// Add the button inside pre
			pre.appendChild(copyButton);

			// Event handler for copying text
			copyButton.addEventListener("click", async () => {
				const code = pre.querySelector("code")?.textContent;
				if (code) {
					await navigator.clipboard.writeText(code);
					buttonText.innerText = "Copied!"; // Change text to "Copied!"

					// After 1.5 seconds, change the text back to "Copy"
					setTimeout(() => {
						buttonText.innerText = "Copy";
					}, 1500);
				}
			});
		}
	});
});
