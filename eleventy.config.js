const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const path = require("path");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats("njk,svg,woff2,md");

  eleventyConfig.addPlugin(EleventyVitePlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  eleventyConfig.addAsyncShortcode("image", imageShortcode);

  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy('src/assets/scss');
  eleventyConfig.addPassthroughCopy('src/assets/javascript');

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "site",
    },
  };
};

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
    class: 'image',
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}
