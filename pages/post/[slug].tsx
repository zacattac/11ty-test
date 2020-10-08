import { NavLink, RichText, Title } from "components";
import { Heading, SecondaryText } from "components/designSystem";
import { styled } from "components/stitches";
import { GetStaticProps } from "next";
import { ReactElement } from "react";
import { ContentAPI } from "services/contentful";
import { BlogPost } from "services/contentful.types";
import { formattedDate } from "helpers/date";

type Params = {
  params: {
    slug: string;
  };
};

type Paths = {
  paths: Params[];
  fallback: boolean;
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const api = new ContentAPI();
  const post = await api.fetchBlogPostBySlug(params.slug);
  return { props: { post } };
};

export async function getStaticPaths(): Promise<Paths> {
  const api = new ContentAPI();
  const posts = await api.fetchBlogPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

const PageTitle = styled("section", {
  marginBottom: "$2",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: "$2",

  variants: {
    alignment: {
      center: {
        textAlign: "center",
      },
      left: {
        textAlign: "left",
      },
    },
  },
});

const Footer = styled("div", {
  textAlign: "center",
  marginTop: "$2",
});

const PostTitle = styled("div", {
  gridColumn: "span 3",
});

export default function Post({ post }: { post: BlogPost }): ReactElement {
  return (
    <>
      <PageTitle>
        <Title
          title="Post"
          link={{ url: "/journal", text: "Back" }}
          as="p"
          hidden
        />
        <PostTitle>
          <Heading size="large">{post.title}</Heading>
          <SecondaryText>
            {post.date &&
              formattedDate(post.date, {
                month: "long",
                year: "numeric",
              })}
          </SecondaryText>
        </PostTitle>
      </PageTitle>
      <RichText source={post.content} />
      <Footer>
        <NavLink url="/journal">Back to Journal</NavLink>
      </Footer>
    </>
  );
}
