import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'react-emotion'
import ds from '../assets/design-system'

const Wrapper = styled.article`
  padding: 0 0 ${ds.spacing.base};

  @media (max-width: ${ds.breakpoint.small}) {
    flex-direction: column;
  }
`

const Date = styled.time`
  font-family: ${ds.typography.fontFamily.secondary};
  opacity: 0.5;
`

const Content = styled.a`
  flex: 1;
  font-family: ${ds.typography.fontFamily.secondary};
  margin-right: ${ds.spacing.small};
`

const Tag = styled.p`
  display: inline-block;
  font-family: ${ds.typography.fontFamily.secondary};
  opacity: 0.5;
  padding-right: ${ds.spacing.xsmall};
`

class ListPost extends React.Component {
  formattedDate() {
    var a = moment(this.props.date)
    return a.format(`DD MMM 'YY`)
  }

  render() {
    return (
      <Wrapper>
        <Content href={this.props.url} target="_blank">
          {this.props.title}
        </Content>
        <footer>
          <Tag>{this.props.tag}</Tag>
          <Date dateTime={this.props.date}>{`(${this.formattedDate()})`}</Date>
        </footer>
      </Wrapper>
    )
  }
}

ListPost.propTypes = {
  date: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
  tag: PropTypes.string,
}

export default ListPost