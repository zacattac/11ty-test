---
title: Bookmarks
description: false
theme: blue
sections:
  - header
  - divider
  - favourites
  - bookmarks
headerLinks:
  - { text: "RSS Feed", url: "/feeds/bookmarks.xml" }
  - { text: "JSON Feed", url: "/feeds/bookmarks.json" }
  - {
      text: "Suggest a bookmark",
      url: "mailto:luke@interroban.gg?subject=Bookmark%20suggestion",
    }
pagination:
  data: bookmarks
  size: 1
  alias: year
permalink: "bookmarks/{% if pagination.pageNumber > 0 %}{{ year.title | lower }}/{% endif %}index.html"
---

I try and keep track of all the interesting things I find on my travels around the web. Because the internet never stops changing, as this list gets older things will begin to decay and disappear. So this isn’t an archive as such, it’s a log.
