import { ReactElement } from "react";
import { styled } from "stitches";

const Container = styled("section", {
  display: "grid",
  gridColumnGap: "$2",
  gridRowGap: "$2_5",

  variants: {
    layout: {
      vertical: { gridTemplateColumns: "1fr" },
      horizontal: {
        gridTemplateColumns: "1fr 1fr",
      },
    },
    margin: {
      large: {
        marginBottom: "$3",
      },
    },
  },
});

const Column = styled("div", {
  variants: {
    position: {
      first: {
        gridRow: "1",
        bp2: {
          gridRow: "1",
          gridColumn: "1",
        },
      },
      second: {
        gridRow: "2",
        bp2: {
          gridRow: "1",
          gridColumn: "2",
        },
      },
    },
  },
});

interface SplitterProps {
  col1: ReactElement;
  col2: ReactElement;
  reverse?: boolean;
  margin?: "large";
}

export default function Splitter({
  col1,
  col2,
  reverse,
  margin,
}: SplitterProps): ReactElement {
  return (
    <Container
      layout={{ initial: "vertical", bp2: "horizontal" }}
      margin={margin}
    >
      <Column
        position={{
          initial: reverse ? "second" : "first",
          bp2: "first",
        }}
      >
        {col1}
      </Column>
      <Column
        position={{
          initial: reverse ? "first" : "second",
          bp2: "second",
        }}
      >
        {col2}
      </Column>
    </Container>
  );
}
