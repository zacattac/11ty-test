import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type {
  Block,
  Document,
  Heading2,
  Hyperlink,
  Inline,
  Paragraph,
} from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { ResponsiveImage } from "components";
import {
  A,
  BlockQuote,
  BulletList,
  Figcaption,
  Footnote,
  Grid,
  GridChild,
  Heading,
  P,
  Subtitle,
} from "designSystem";
import { ImageSizes } from "helpers/image";
import type { Asset, RichTextChildren } from "services/contentful.types";

type RichTextProps = {
  source?: Document;
  unwrapped?: boolean;
};

const Wrapper = (props: any) => {
  const { ...otherProps } = props;
  return (
    <GridChild
      as="section"
      column={{
        initial: "fullWidth",
        bp2: "threeQuarters",
        bp3: "center",
      }}
      {...otherProps}
    />
  );
};

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Paragraph, children: RichTextChildren) => {
      // Pop out inline-entries into new containers
      let footnotes: any;
      if (node.content.length > 1) {
        footnotes = node.content.filter(
          (child) => child.nodeType == "embedded-entry-inline",
        );
      }

      return (
        <>
          <Wrapper>
            <P>{children}</P>
          </Wrapper>
          {footnotes && renderFootnotes(footnotes)}
        </>
      );
    },
    [BLOCKS.HEADING_2]: (_: Heading2, children: RichTextChildren) => (
      <Wrapper>
        <Heading as="h2" margin="top" size="small">
          {children}
        </Heading>
      </Wrapper>
    ),
    [BLOCKS.HEADING_3]: (_: Heading2, children: RichTextChildren) => (
      <Wrapper>
        <Subtitle as="h3">{children}</Subtitle>
      </Wrapper>
    ),
    [BLOCKS.UL_LIST]: (_: Block, children: RichTextChildren) => (
      <Wrapper>
        <BulletList>{children}</BulletList>
      </Wrapper>
    ),
    [BLOCKS.QUOTE]: (_: Block, children: RichTextChildren) => (
      <Wrapper>
        <BlockQuote>{children}</BlockQuote>
      </Wrapper>
    ),
    [INLINES.HYPERLINK]: (node: Hyperlink, children: RichTextChildren) => {
      return <A href={node.data.uri}>{children}</A>;
    },
    [INLINES.EMBEDDED_ENTRY]: () => {
      return null;
    },
  },
};

const footnoteOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: Paragraph, children: RichTextChildren) => (
      <Figcaption>{children}</Figcaption>
    ),
    [INLINES.HYPERLINK]: (node: Hyperlink, children: RichTextChildren) => {
      return (
        <A href={node.data.uri} size="small">
          {children}
        </A>
      );
    },
    [INLINES.EMBEDDED_ENTRY]: (node: Inline) => {
      const rawImage = node.data.target.fields.image.fields;
      const image: Asset = {
        url: rawImage.file.url,
        desc: rawImage.description,
        width: rawImage.file.details.image.width,
        height: rawImage.file.details.image.height,
      };
      const rawCaption = node.data.target.fields.content;
      const renderedCaptionNode = documentToReactComponents(
        rawCaption,
        footnoteOptions,
      );
      return (
        <GridChild
          as={Footnote}
          column={{ initial: "firstHalf", bp2: "center", bp3: "$4" }}
        >
          <ResponsiveImage image={image} sizes={ImageSizes.quarter} />
          {renderedCaptionNode}
        </GridChild>
      );
    },
  },
};

function renderFootnotes(node: any): any {
  node = { content: node, data: {}, nodeType: "document" };
  const renderedFootnoteNode = documentToReactComponents(node, footnoteOptions);
  return renderedFootnoteNode;
}

const RichText = ({ source, unwrapped }: RichTextProps): JSX.Element => {
  const renderedNode = documentToReactComponents(source as Document, options);
  return (
    <>
      {!unwrapped ? (
        <Grid as="section" gap="small">
          {renderedNode}
        </Grid>
      ) : (
        <>{renderedNode}</>
      )}
    </>
  );
};

export default RichText;
