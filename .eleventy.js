require("dotenv").config();

const pluginRSS = require("@11ty/eleventy-plugin-rss");
const pluginReadingTime = require("eleventy-plugin-reading-time");
const findByID = require("./filters/findByID");
const limit = require("./filters/limit");
const date = require("./filters/date");
const markdown = require("./shortcodes/markdown");
const responsiveImage = require("./shortcodes/responsiveImage");
const remark = require("./plugins/remark");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRSS);
  eleventyConfig.addPlugin(pluginReadingTime);

  eleventyConfig.addPassthroughCopy("./assets/fonts");
  eleventyConfig.addPassthroughCopy("./assets/images");
  eleventyConfig.addPassthroughCopy("./components/*.js");
  eleventyConfig.addWatchTarget("./css/**/*.css");

  eleventyConfig.addFilter("findByID", findByID);
  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addFilter("formatDate", date);

  eleventyConfig.addShortcode("renderMarkdown", markdown);
  eleventyConfig.addShortcode("responsiveImage", responsiveImage);

  eleventyConfig.addCollection("metaPosts", function (collection) {
    return collection.getFilteredByGlob("meta/*.md").reverse();
  });
  eleventyConfig.addCollection("now", function (collection) {
    return collection.getFilteredByGlob("now/*.md").reverse();
  });

  eleventyConfig.setLibrary("md", remark());

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      layouts: "/_includes/layouts",
    },
  };
};
