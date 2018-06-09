import React from 'react'
import PropTypes from 'prop-types'
import GatsbyLink from 'gatsby-link'
import { Tooltip } from 'react-tippy'
import linkCursor from '../assets/images/link_cursor.svg'
import styled, { css } from 'react-emotion'
import ds from '../assets/design-system'

const ExternalLink = styled.a`
  text-decoration: none;
  color: ${ds.color.primary};
  transition: filter 0.25s linear;

  &:hover {
    cursor: url(${linkCursor}), auto;
    filter: blur(5px);
  }
`

const InternalLink = css`
  text-decoration: none;
`

const Link = ({ children, to }) => {
  const internal = /^\/(?!\/)/.test(to)

  // Use gatsby-link for internal, and <a> for others
  if (internal) {
    return (
      <Tooltip followCursor={true} title={to} duration={0}>
        <GatsbyLink className={InternalLink} to={to}>
          {children}
        </GatsbyLink>
      </Tooltip>
    )
  }
  return (
    <ExternalLink href={to} target="_blank">
      {children}
    </ExternalLink>
  )
}

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
}

export default Link
