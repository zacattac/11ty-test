# interroban.gg

Personal site, blog, and portfolio of Luke Mitchell, a design director, product
designer, and UI developer.

This site pulls data from:

- Contentful: CMS
- Spotify & last.fm: Music stats
- FeedBin: Subscribed feed stats
- GitHub: Commit history
- Savee: Images for the scrapbook

This is a [Eleventy (11ty)](https://www.11ty.dev) project.

## Getting Started

First, install the bundle:

```bash
yarn install
```

Next, build the site:

```bash
yarn run build
```

To run a development environment:

First install the Netlify CLI:

```bash
npm install -g netlify
netlify link
```

...then run:

```bash
yarn run dev
```

Open [http://localhost:8888](http://localhost:8888) with your browser to see
the result, thanks to Netlify CLI you should see the functions working also.

## Documentation

### Page sections

All of the page layouts are defined using a simple list syntax within the markdown front-matter of the page:

```markdown
---
sections:
  - header
  - hero
  - toc
  - content
  - career
---

# Hello, World!
```

The above code will search the `_includes` directory for the `header.html` partial and add it to the page, respecting the order of the sections.

To add a new section create an `.html` file in the `_includes` directory, e.g. `_includes/example.html`, you can then include it using:

```markdown
---
sections:
  - example
---
```

Some sections have options or required data:

#### Header text

```markdown
---
sections:
  - header
description: Hello, world!
---
```

```markdown
---
sections:
  - header
description: false
---

Hello, World!
```

Both the examples above will populate the header introductory text, with provide a `description` in the front-matter or add text to the markdown doc body.

#### Header links

```markdown
---
sections:
  - header
headerLinks:
  - { url: "https://twitter.com/lkemitchll", text: "Twitter" }
---
```

The above example allows adding a list of links to the `header.html` section.

#### Table of contents

```markdown
---
sections:
  - toc
toc:
  - History
  - Experience
  - Clients
  - Skills
  - Recognition
```

the above example defines the heading names that the `toc.html` section will list.

#### Hero Image

```markdown
---
sections:
  - hero
heroImageID: "5ZI6Cx1N7O5KG8ikkg1wv7"
---
```

The above example defines the image to be used for the hero section (the code must be a Contentful asset ID).

### Custom markdown plugins

I am using a custom remark processor to achieve a few specific things that markdown cannot otherwise do by default:

#### Sidenotes

I use the [footnotes plugin](https://github.com/remarkjs/remark-footnotes) to support a footnote syntax. I have created an additional plugin which renders each footnote in the margin next to the original reference:

The plugin can seen in the [`footnotes.js`](https://github.com/LkeMitchll/interroban.gg/blob/main/plugins/remark/footnotes.js) file.

The output can be viewed on the [`/about`](https://interroban.gg/about) page.

#### Figure Captions

I have created a plugin to render the alt text of a responsive image as a `figcaption` below the image:

The plugin can be seen in the [`imagesWithCaptions.js`](https://github.com/LkeMitchll/interroban.gg/blob/main/plugins/remark/imagesWithCaptions.js) file.

The plugin requires a Contentful asset library. When the plugin finds an image reference in the markdown it extracts the asset ID. It can then extract the rich asset information from Contentful, including the `description` field, which the plugin then uses as the image `alt` text as well as the caption.

#### Responsive Images

Every image gets rendered as a responsive image that takes advantage of the `srcset` attribute, and preserves aspect ratio when lazy-loading.

The plugin can be seen in the [`responsiveImage.js`](https://github.com/LkeMitchll/interroban.gg/blob/main/shortcodes/responsiveImage.js) file.

The plugin accepts an asset object from Contentful, as well as an image size, it then constructs an `img` tag with all of the appropriate image src sizes, as well as an alt text based on the asset description field.

The plugin can also return an object so that it can be parsed by the custom markdown processor.
