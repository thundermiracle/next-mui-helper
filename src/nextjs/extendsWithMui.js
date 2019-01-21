import React from 'react';
import PropTypes from 'prop-types';
import { Head, Main, NextScript } from 'next/document';

import getContext from '../util/getContext';
import getDisplayName from '../util/getDisplayName';

/**
 * Enable material-ui in nextjs._document.
 * DocumentComponent: next/document.
 * @param {MUITheme} theme
 * @param {next/document} DocumentComponent
 */
const extendsWithMui = theme => ((DocumentComponent) => {
  class ExtendsWithMui extends DocumentComponent {
    static displayName = `extendsWithMui(${getDisplayName(DocumentComponent)})`;

    static async getInitialProps(ctx) {
      // Resolution order
      //
      // On the server:
      // 1. app.getInitialProps
      // 2. page.getInitialProps
      // 3. document.getInitialProps
      // 4. app.render
      // 5. page.render
      // 6. document.render
      //
      // On the server with error:
      // 1. document.getInitialProps
      // 2. app.render
      // 3. page.render
      // 4. document.render
      //
      // On the client
      // 1. app.getInitialProps
      // 2. page.getInitialProps
      // 3. app.render
      // 4. page.render
      const superProps = await super.getInitialProps(ctx);

      // inject theme by hoc
      let pageContext;
      const page = ctx.renderPage((Component) => {
        const WrappedComponent = (props) => {
          // pageContext = props.pageContext;
          // eslint-disable-next-line react/destructuring-assignment
          pageContext = props.pageContext || getContext(theme);
          return <Component {...props} pageContext={pageContext} />;
        };

        WrappedComponent.propTypes = {
          pageContext: PropTypes.object,
        };

        WrappedComponent.defaultProps = {
          pageContext: null,
        };

        return WrappedComponent;
      });

      const { head } = superProps;
      if (pageContext != null) {
        const jssStyles = (
          <style
            id="jss-server-side"
            key="jss-server-side-key"
            dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
          />
        );
        head.push(jssStyles);
      }

      return {
        ...superProps,
        ...page,
        head,
        pageContext,
      };
    }

    render() {
      const { pageContext } = this.props;

      return (
        <html lang="en">
          <Head>
            <meta charSet="utf-8" />
            {/* Use minimum-scale=1 to enable GPU rasterization */}
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
            {/* PWA primary color */}
            <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
            />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      );
    }
  }

  return ExtendsWithMui;
});

export default extendsWithMui;
