import React from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import shared from '../themes/shared'
import Anime from 'react-anime'
import BackgroundImage from '../assets/images/bg.svg'

const GlobalStyle = css`
  @font-face {
    font-family: 'Space Grotesk';
    src: url('https://s3.eu-west-2.amazonaws.com/interrobang-fonts/SpaceGrotesk-Regular.woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Space Grotesk';
    src: url('https://s3.eu-west-2.amazonaws.com/interrobang-fonts/SpaceGrotesk-SemiBold.woff2');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Space Mono';
    src: url('https://s3.eu-west-2.amazonaws.com/interrobang-fonts/SpaceMono-Regular.ttf');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Space Mono';
    src: url('https://s3.eu-west-2.amazonaws.com/interrobang-fonts/SpaceMono-Italic.ttf');
    font-weight: 400;
    font-style: italic;
  }

  body,
  html {
    font-size: 22px;
    font-family: 'Space Grotesk', 'Helvetica Neue', 'Helvetica', 'Arial',
      sans-serif;
    font-weight: 400;
    max-width: 1200px;
    margin: 0 auto;
  }

  body {
    margin-left: ${shared.space[3]};
    margin-right: ${shared.space[3]};
  }
`

const Main = styled.main`
  background-repeat: no-repeat;
  background-position: right top;
  background-size: 60%;
  margin-top: ${shared.space[3]};
  opacity: 0;

  @media (min-width: 840px) {
    background-image: url(${BackgroundImage});
  }
`

class Layout extends React.Component {
  render() {
    return (
      <Anime delay={500} direction="normal" opacity="1" easing="easeInOutCirc">
        <Main>
          <Global styles={GlobalStyle} />
          {this.props.children}
        </Main>
      </Anime>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout