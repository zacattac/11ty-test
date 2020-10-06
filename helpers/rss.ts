import { BlogPost } from "services/contentful.types";

const generateRssItem = (post: BlogPost): string => `
   <item>
     <guid>https://interroban.gg/post/${post.slug}</guid>
     <title>${post.title}</title>
     <link>https://interroban.gg/post/${post.slug}</link>
     <description>${post.description}</description>
     <pubDate>${new Date(post.date).toUTCString()}</pubDate>
   </item>
 `;

const generateRss = (posts: BlogPost[]): string => `
   <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
     <channel>
       <title>Journal - Luke Mitchell</title>
       <link>https://www.interroban.gg/journal</link>
       <description>Personal blog of Luke Mitchell, Product Designer</description>
       <language>en</language>
       <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
       <atom:link href="https://interroban.gg/rss.xml" rel="self" type="application/rss+xml"/>
       ${posts.map(generateRssItem).join("")}
     </channel>
   </rss>
 `;

export default generateRss;