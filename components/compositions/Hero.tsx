import { Title } from "components";
import { Footnote, Image, LargeText, Small } from "designSystem";
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
  intro,
}: {
  image?: Asset;
  title: string;
  intro?: string;
}): ReactElement {
  return (
    <Container layout={{ initial: "vertical", bp2: "horizontal" }}>
      <Title
        title={title}
        link={{ url: "/", text: "Back" }}
        css={{ gridArea: "a" }}
      />
      {intro ? (
        <LargeText margin="medium" css={{ gridArea: "b" }}>
          {intro}
        </LargeText>
      ) : null}
      {image ? (
        <>
          <Image
            src={`${image.url}?w=${Math.round(image.width / 4)}&q=50`}
            alt={image.desc}
            width={Math.round(image.width / 4)}
            height={Math.round(image.height / 4)}
            css={{ gridArea: "b" }}
          />

          <Footnote position="hero" css={{ gridArea: "f" }}>
            <Small>Image: {image.desc}</Small>
          </Footnote>
        </>
      ) : null}
    </Container>
  );
}
