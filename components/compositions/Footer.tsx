import { styled } from "stitches";
import { PlainList, TertiaryText, Subtitle, Small } from "designSystem";
import { NavLink, Nav } from "components";
import { ReactElement } from "react";

const Container = styled("footer", {
  display: "grid",
  gridGap: "$2",
  marginBottom: "$2",

  variants: {
    layout: {
      threeCol: {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
      fourCol: {
        gridTemplateColumns: "repeat(4, 1fr)",
      },
    },
  },
});

const Column = styled("div", {
  gridColumn: "1",
  variants: {
    position: {
      threeCol: {
        gridColumn: "1 / 4",
      },
      oneCol: {
        gridColumn: "1 / 2",
        display: "inline",
      },
      horizontal: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "$2",
        alignItems: "flex-end",
      },
      auto: {
        gridColumn: "auto",
      },
    },
    alignment: {
      bottom: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      },
    },
  },
});

const Item = styled("li", {
  marginRight: "$2",

  bp2: {
    marginRight: "$0",
  },
});

const CopyNotice = styled("div", {
  gridColumn: "1/3",
});

export default function Footer(): ReactElement {
  type FooterLink = {
    url: string;
    title: string;
  };

  const Title = (content: string) => (
    <Subtitle level="h4" margin="small">
      {content}
    </Subtitle>
  );

  const List = (links: FooterLink[]) => {
    return (
      <PlainList>
        {links.map((link: Record<"title" | "url", string>, i: number) => (
          <Item key={i}>
            <NavLink
              url={link.url}
              margin={{ initial: "medium", bp2: "small" }}
              decoration="plain"
            >
              {link.title}
            </NavLink>
          </Item>
        ))}
      </PlainList>
    );
  };

  const InfoLinks = [
    { title: "Colophon", url: "/colophon" },
    { title: "Uses", url: "/uses" },
    { title: "Feeds", url: "/feeds" },
  ];
  const ContactLinks = [
    { title: "Email", url: "mailto:luke@interroban.gg" },
    { title: "Twitter", url: "https://twitter.com/lkemitchll" },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/luke-mitchell-69ba421b3/",
    },
  ];
  const ElsewhereLinks = [
    { title: "Dribbble", url: "https://dribbble.com/Interrobang" },
    { title: "Pinterest", url: "https://www.pinterest.co.uk/lkemitchll" },
    { title: "GitHub", url: "https://www.github.com/lkemitchll" },
  ];

  return (
    <Container layout={{ initial: "threeCol", bp2: "fourCol" }}>
      <Column
        position={{ initial: "threeCol", bp1: "horizontal", bp2: "oneCol" }}
      >
        <Small display="block" margin={{ initial: "small", bp1: "none" }}>
          Luke Mitchell &mdash; <br />
          Product Designer
        </Small>
        <Nav layout={{ initial: "horizontal", bp2: "vertical" }} />
      </Column>
      <Column position="auto" alignment="bottom">
        {Title("Information")}
        {List(InfoLinks)}
      </Column>
      <Column position="auto" alignment="bottom">
        {Title("Contact")}
        {List(ContactLinks)}
      </Column>
      <Column position="auto" alignment="bottom">
        {Title("Elsewhere")}
        {List(ElsewhereLinks)}
      </Column>
      <CopyNotice>
        <TertiaryText>&copy; 2020, Luke Mitchell</TertiaryText>
      </CopyNotice>
    </Container>
  );
}
