import { Logo, Nav } from "components";
import type { ReactElement } from "react";
import { styled } from "stitches";

const Container = styled("nav", {
  display: "grid",
  gridGap: "$2",

  variants: {
    layout: {
      tiny: {
        gridTemplate: `"a a a a" auto "b b b b" auto / 1fr 1fr 1fr 1fr`,
        marginTop: "$2",
      },
      small: {
        gridTemplate: `"a a b b" auto / 1fr 1fr 1fr 1fr`,
        marginTop: "$3",
        marginBottom: "$2",
      },
      minimal: {
        gridTemplate: `"b" auto / 1fr`,
        marginTop: "$3",
        marginBottom: "$2",
      },
    },
  },
});

export default function SiteHeader({
  layout,
}: {
  layout?: Record<any, any>;
}): ReactElement {
  return (
    <Container layout={layout ? layout : { initial: "tiny", bp1: "small" }}>
      {layout?.initial == "minimal" ? null : <Logo />}
      <Nav
        layout={{ initial: "horizontal", bp1: "horizontal" }}
        css={{ gridArea: "b" }}
      />
    </Container>
  );
}
