const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats("htm,html,njk,jpg,svg");
  // Add a filter using the Config API

  // Copy `src/css` to `site/css`
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/media");

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  // You can return your Config object (optional).
  return {
    dir: {
      input: "src",
      output: "site",
    },
  };
};




