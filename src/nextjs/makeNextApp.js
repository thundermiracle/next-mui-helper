import React from 'react';
import App, { Container } from 'next/app';
import withParts from '../mui/withParts';

const makeNextApp = (muiTheme, Layout, enableNProgress, enableDefaultCssBaseline) => {
  const hocs = withParts(muiTheme, Layout, enableNProgress, enableDefaultCssBaseline);
  class NextApp extends App {
    // inject props made by hoc
    static async getInitialProps({ Component, ctx }) {
      let pageProps = {};

      const ComponentWithInitialProps = hocs(Component);

      if (ComponentWithInitialProps.getInitialProps) {
        pageProps = await ComponentWithInitialProps.getInitialProps(ctx);
      }

      return { pageProps };
    }

    render() {
      const { Component, pageProps } = this.props;
      const NewComponent = hocs(Component);

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
