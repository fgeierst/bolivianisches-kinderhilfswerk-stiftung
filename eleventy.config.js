const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const path = require("path");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats("htm,html,njk,svg,woff2,md");

  eleventyConfig.addPlugin(EleventyVitePlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy('src/assets/scss');

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "site",
    },
  };
};

async function imageShortcode(src, alt, sizes = "60vw") {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [400,800],
    formats: ['avif', 'jpeg'],
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
    urlPath: "/assets/images/",
    outputDir: "./site/assets/images/"    
  });

  let lowsrc = metadata.jpeg[0];

  return `<picture class="img--responsive">
    ${Object.values(metadata).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
      <img
        src="${lowsrc.url}"
        width="${lowsrc.width}"
        height="${lowsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}


