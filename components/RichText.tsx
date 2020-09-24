import { ReactNode } from "react";
import {
  BLOCKS,
  INLINES,
  Inline,
  Document,
  Paragraph,
  Block,
  Hyperlink,
} from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { styled } from "tokens";
import { P, Small, Image, A, Footnote, BulletList } from "designSystem";

type RichTextProps = {
  source?: Document;
  unwrapped?: boolean;
};

type RichTextChildren = Array<string | ReactNode>;

const Content = styled("article", {
  display: "grid",
  gridColumnGap: "$2",
  gridRowGap: "$1",
  position: "relative",

  variants: {
    layout: {
      small: {
        gridTemplate: `"c c c c" auto / 1fr 1fr 1fr 1fr`,
      },
      footNoteRight: {
        gridTemplate: `". c c f" auto / 1fr 1fr 1fr 1fr`,
      },
    },
  },
});

const SubContainer = styled("section", {
  display: "grid",
  gridGap: "$2",
  position: "relative",

  variants: {
    layout: {
      vertical: {
        gridArea: "auto / c",
        gridTemplateColumns: "repeat(3, 1fr)",
      },
      horizontal: {
        gridArea: "auto / c / auto / f",
        gridTemplateColumns: "repeat(3, 1fr)",
      },
    },
  },
});

function footnote(node: Inline): ReactNode {
  const content = node.data.target.fields.content;
  const image = node.data.target.fields?.image?.fields;

  const footnoteOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_: Paragraph, children: RichTextChildren) => {
        return (
          <>
            <Image
              src={image.file.url}
              alt={image.description}
              css={{ marginBottom: "$0" }}
            />
            <Small>Image: {children}</Small>
          </>
        );
      },
      [INLINES.HYPERLINK]: (node: Hyperlink, children: RichTextChildren) => {
        return (
          <A href={node.data.uri} css={{ fontSize: "$3" }}>
            {children}
          </A>
        );
      },
    },
  };
  return (
    <Footnote position={{ initial: "below", bp3: "aside" }}>
      {documentToReactComponents(content, footnoteOptions)}
    </Footnote>
  );
}

const generateFootnotes = (node: Paragraph, children: RichTextChildren) => {
  const footnotes = [];

  node.content.map((child, i) => {
    if (child.nodeType === "embedded-entry-inline") {
      child.data.target.sys.position = i;
      footnotes.push(children[i]);
      children.splice(i, 1);
    }
  });

  if (footnotes.length !== 0) {
    return (
      <SubContainer layout={{ initial: "vertical", bp2: "horizontal" }}>
        <P
          css={{
            gridArea: "1 / 1 / 1 / 4",
            bp3: { gridColumnEnd: "3" },
          }}
        >
          {children}
        </P>
        {footnotes}
      </SubContainer>
    );
  } else {
    return <P css={{ gridArea: "auto / c" }}>{children}</P>;
  }
};

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Paragraph, children: RichTextChildren) => {
      return generateFootnotes(node, children);
    },
    [BLOCKS.UL_LIST]: (_: Block, children: RichTextChildren) => (
      <BulletList>{children}</BulletList>
    ),
    [INLINES.EMBEDDED_ENTRY]: (node: Inline) => footnote(node),
  },
};

const RichText = ({ source, unwrapped }: RichTextProps): JSX.Element => {
  const renderedNode = documentToReactComponents(source as Document, options);
  return (
    <>
      {!unwrapped ? (
        <Content
          layout={{
            initial: "small",
            bp3: "footNoteRight",
          }}
        >
          {renderedNode}
        </Content>
      ) : (
        <>{renderedNode}</>
      )}
    </>
  );
};

export default RichText;