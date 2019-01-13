import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'
import theme from '../themes/light'
import { Global, css } from '@emotion/core'
import Grids from '../shared/grid'
import Grid from '../components/Grid'
import PageHeader from '../components/PageHeader'
import SocialMediaLinkList from '../components/SocialMediaLinkList'
import Heading from '../components/Heading'
import ProjectList from '../components/ProjectList'

class Homepage extends React.Component {
  render() {
    const { data } = this.props
    const node = data.allContentfulPage.edges[0].node
    const sections = node.sections

    return (
      <ThemeProvider theme={theme}>
        <Global
          styles={css`
            body,
            html {
              background-color: ${theme.colors.background};
            }
          `}
        />
        {sections.map(section => {
          switch (section.__typename) {
            case 'ContentfulPageHeader':
              return (
                <PageHeader
                  key={section.id}
                  title={section.title}
                  subtitle={section.subtitle}
                />
              )
            case 'ContentfulSocialMediaLinkList':
              return (
                <SocialMediaLinkList
                  key={section.id}
                  description={section.description}
                  links={section.links}
                />
              )
            case 'ContentfulProjectList':
              return (
                <React.Fragment key={section.id}>
                  <Heading as="h3" color="text">
                    {section.title}
                  </Heading>
                  <Grid gridTemplateColumns={Grids.columns.three}>
                    <ProjectList
                      title={section.title}
                      projects={section.projects}
                    />
                  </Grid>
                </React.Fragment>
              )
          }
        })}
      </ThemeProvider>
    )
  }
}

Homepage.propTypes = {
  data: PropTypes.object,
}

export default Homepage

export const PageQuery = graphql`
  query HomeQuery {
    allContentfulPage(filter: { title: { eq: "Home New" } }) {
      edges {
        node {
          sections {
            ... on ContentfulPageHeader {
              id
              title
              subtitle
            }
            ... on ContentfulSocialMediaLinkList {
              id
              links {
                id
                description
                url
              }
            }
            ... on ContentfulProjectList {
              id
              title
              projects {
                id
                title
                description {
                  childMarkdownRemark {
                    html
                  }
                }
                url
              }
            }
          }
        }
      }
    }
  }
`
