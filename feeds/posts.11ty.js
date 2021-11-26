class Posts {
  constructor() {
    this.filename = "posts.json";
    this.endpoint = "https://interroban.gg";
  }

  data() {
    return {
      permalink: `/feeds/${this.filename}`,
    };
  }

  render(data) {
    const posts = data.collections.posts.map((post) => ({
      content_html: post.templateContent,
      url: `${this.endpoint}/posts/${post.url}`,
      summary: post.data.description,
      date_published: post.date,
      title: post.data.title,
    }));

    const wrapper = {
      version: "https://jsonfeed.org/version/1.1",
      title: "Luke Mitchell | Product Designer",
      description:
        "Personal site, blog, and portfolio of Luke Mitchell, a design director, product designer, and UI developer.",
      icon: `${this.endpoint}/assets/images/favicon.svg`,
      favicon: `${this.endpoint}/assets/images/favicon.svg`,
      authors: [{ name: "Luke Mitchell", url: this.endpoint }],
      language: "en",
      home_page_url: this.endpoint,
      feed_url: `${this.endpoint}/feeds/${this.filename}`,
      items: posts,
    };

    return JSON.stringify(wrapper);
  }
}

module.exports = Posts;
