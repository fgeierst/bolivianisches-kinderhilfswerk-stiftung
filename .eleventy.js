const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const path = require("path");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats("htm,html,njk,svg,css"); // Add a filter using the Config API

  // Copy `src/css` to `site/css`
  // eleventyConfig.addPassthroughCopy("src/assets");
  // eleventyConfig.addPassthroughCopy("src/media");

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  return {
    dir: {
      input: "src",
      output: "site",
    },
  };
};


async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["webp", "jpeg"],
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
    urlPath: "/assets/images/",
    outputDir: "./site/assets/images/"    
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    class: "img--responsive"
  };

  return Image.generateHTML(metadata, imageAttributes);
}

