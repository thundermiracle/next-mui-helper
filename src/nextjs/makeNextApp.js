import React from 'react';
import App, { Container } from 'next/app';
import withParts from '../mui/withParts';

const makeNextApp = (muiTheme, Layout, enableNProgress, enableDefaultCssBaseline) => {
  class NextApp extends App {
    render() {
      const { Component, pageProps } = this.props;
      const NewComponent = withParts(muiTheme, Layout, enableNProgress, enableDefaultCssBaseline)(Component);

      return (
        <Container>
          <NewComponent {...pageProps} />
        </Container>
      );
    }
  }

  return NextApp;
};

export default makeNextApp;

export const DefaultNextApp = makeNextApp();
