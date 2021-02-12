require("dotenv").config();
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  const config = { htmlTemplateEngine: "njk" };
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy("assets/fonts");
  eleventyConfig.addWatchTarget("assets/**/*.css");

  eleventyConfig.addFilter("findByID", require("./filters/findByID"));
  eleventyConfig.addFilter("limit", require("./filters/limit"));
  eleventyConfig.addFilter("formatDate", require("./filters/date"));
  eleventyConfig.addFilter("toDateObj", require("./filters/toDateObj"));
  eleventyConfig.addFilter("JSONStringify", function (data) {
    const json = JSON.stringify(
      data.map((item) => {
        return item.fields;
      })
    );
    return json;
  });

  eleventyConfig.addShortcode(
    "renderMarkdown",
    require("./shortcodes/markdown")
  );

  return config;
};
