const Cache = require("@11ty/eleventy-cache-assets");

module.exports = class BookmarksAPI {
  constructor() {
    this.apiEndpoint = process.env.BOOKMARKS_ENDPOINT;
    this.credentials = process.env.BOOKMARKS_TOKEN;
  }

  async getBookmarks() {
    return Cache(this.apiEndpoint, {
      duration: "1d",
      type: "json",
      fetchOptions: {
        headers: {
          Authorization: `Token token="${this.credentials}"`,
        },
      },
    });
  }
}
