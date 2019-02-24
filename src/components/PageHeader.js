import React from 'react'
import PropTypes from 'prop-types'
import Heading from './Heading'
import styled from '@emotion/styled'
import shared from '../themes/shared'
import Anime from 'react-anime'
import InternalLink from './InternalLink'

const Wrapper = styled.header`
  padding-top: ${shared.space[5]};
  margin-bottom: ${shared.space[5]};

  @media (min-width: 640px) {
    position: ${props => (props.fixed ? 'fixed' : 'static')};
  }
`

class PageHeader extends React.Component {
  render() {
    return (
      <Anime delay={500} opacity={[0, 1]} translateY={['5rem', '0']}>
        <Wrapper fixed={this.props.fixed}>
          <Heading color="text" mb={1}>
            {this.props.title}
          </Heading>
          {this.props.subtitle && (
            <Heading as="h2" color="text">
              {this.props.subtitle}
            </Heading>
          )}
          {!this.props.subtitle && (
            <InternalLink
              href="/"
              fontFamily={shared.fontFamilies.mono}
              fontSize={shared.fontSizes[2]}
            >
              Back
            </InternalLink>
          )}
        </Wrapper>
      </Anime>
    )
  }
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  fixed: PropTypes.bool,
}

export default PageHeader
