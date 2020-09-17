import { Title } from "components";
import { Footnote, Image, Small } from "designSystem";
import { styled } from "tokens";
import { ReactElement } from "react";
import { Asset } from "services/contentful.types";

const Container = styled("div", {
  display: "grid",
  position: "relative",

  variants: {
    layout: {
      vertical: {
        gridTemplate: `"a a a ." auto
                       "b b b b" auto
                       "f f f ." auto / 1fr 1fr 1fr 1fr`,
        marginBottom: "$2",
      },
      horizontal: {
        gridTemplate: `"a b b b" auto
                       "f b b b"/ 1fr 1fr 1fr 1fr`,
        marginBottom: "$2",
        gridGap: "$2",
      },
    },
  },
});

export default function Hero({
  image,
  title,
}: {
  image: Asset;
  title: string;
}): ReactElement {
  return (
    <Container layout={{ initial: "vertical", bp2: "horizontal" }}>
      <Title title={title} link={{ url: "/", text: "Back" }} />
      <Image
        src={`${image.url}?w=${image.width / 4}&q=50`}
        alt={image.desc}
        css={{ gridArea: "b" }}
      />
      <Footnote
        position={{ initial: "aside" }}
        css={{ marginTop: "auto", marginBottom: "$1", position: "static" }}
      >
        <Small>Image: {image.desc}</Small>
      </Footnote>
    </Container>
  );
}
