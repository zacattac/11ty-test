import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import PageSection from '../components/page-section'

class RootIndex extends React.Component {
  render() {
    const data = this.props.data.allContentfulPage.edges
    let footer
    let primaryContent = []

    data.map(({ node }) => {
      return node.sections.map(section => {
        if (section.id == 'c6kgP0kjluggCm0WI2oG6mm') {
          footer = section
        } else {
          primaryContent.push(section)
        }
      })
    })

    return (
      <React.Fragment>
        <Helmet>
          <title>Interrobang - Luke Mitchell</title>
        </Helmet>
        {primaryContent.map((section, i) => {
          return (
            <PageSection
              key={i}
              title={section.subtitle}
              level="2"
              content={section.content}
              projects={section.projects}
            />
          )
        })}

        <PageSection
          altStyling
          pinBottom
          title={footer.subtitle}
          content={footer.content}
        />
      </React.Fragment>
    )
  }
}

RootIndex.propTypes = {
  data: PropTypes.object,
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulPage(filter: { title: { eq: "Home" } }) {
      edges {
        node {
          sections {
            id
            subtitle
            content {
              childMarkdownRemark {
                html
              }
            }
            projects {
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
`