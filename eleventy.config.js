import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import Image from "@11ty/eleventy-img";

export default async function (eleventyConfig) {
	eleventyConfig.setTemplateFormats("njk,svg,woff2,md");

	eleventyConfig.addPlugin(EleventyVitePlugin);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!-- excerpt -->",
	});

	eleventyConfig.addAsyncShortcode("image", imageShortcode);

	eleventyConfig.setServerPassthroughCopyBehavior("copy");
	eleventyConfig.addPassthroughCopy("src/assets/scss");
	eleventyConfig.addPassthroughCopy("src/assets/javascript");

	return {
		passthroughFileCopy: true,
		dir: {
			input: "src",
			output: "site",
		},
	};
}

async function imageShortcode(src, alt, sizes = "90vw") {
	let metadata = await Image(src, {
		widths: [400, 800],
		formats: ["webp"],
		urlPath: "/assets/images/",
		outputDir: "./site/assets/images/",
	});

	let imageAttributes = {
		alt,
		sizes,
		class: "image",
		loading: "lazy",
		decoding: "async",
	};

	return Image.generateHTML(metadata, imageAttributes);
}
