import React from 'react';
import App from 'next/app';
import withParts from '../mui/withParts';
import ThemeManagerContext, {
  ThemeManagerProvider,
} from '../context/ThemeManagerContext';

const makeNextApp = (
  muiTheme,
  Layout,
  enableNProgress,
  enableDefaultCssBaseline,
  BaseAppComponent = App,
) => {
  const hocs = withParts(muiTheme, Layout, enableNProgress, enableDefaultCssBaseline);
  class NextApp extends BaseAppComponent {
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

      return (
        <ThemeManagerProvider initTheme={muiTheme}>
          <ThemeManagerContext.Consumer>
            {({ theme }) => {
              const NewComponent = withParts(
                theme,
                Layout,
                enableNProgress,
                enableDefaultCssBaseline,
              )(Component);

              return <NewComponent {...pageProps} />;
            }}
          </ThemeManagerContext.Consumer>
        </ThemeManagerProvider>
      );
    }
  }

  return NextApp;
};

export default makeNextApp;

export const DefaultNextApp = makeNextApp();
