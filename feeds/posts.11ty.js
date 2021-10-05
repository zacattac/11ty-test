class Posts {
  constructor() {
    this.filename = "posts.json";
  }

  data() {
    return {
      permalink: `/feeds/${this.filename}`,
    };
  }

  render(data) {
    const posts = data.collections.posts.map((post) => ({
      content_html: post.templateContent,
      url: `https://interroban.gg/posts/${post.url}`,
      summary: post.data.description,
      date_published: post.date,
      title: post.data.title,
    }));

    const wrapper = {
      version: "https://jsonfeed.org/version/1.1",
      title: "Luke Mitchell | Product Designer",
      description:
        "Personal site, blog, and portfolio of Luke Mitchell, a design director, product designer, and UI developer.",
      icon: "https://interroban.gg/assets/images/favicon.svg",
      favicon: "https://interroban.gg/assets/images/favicon.svg",
      authors: [{ name: "Luke Mitchell", url: "https://interroban.gg" }],
      language: "en",
      home_page_url: "https://interroban.gg",
      feed_url: "https://interroban.gg/feeds/posts.json",
      items: posts,
    };

    return JSON.stringify(wrapper);
  }
}

module.exports = Posts;
