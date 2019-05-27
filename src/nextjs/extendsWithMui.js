import React from 'react';
import { Head, Main, NextScript } from 'next/document';
import ServerStyleSheets from '@material-ui/styles/ServerStyleSheets';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import flush from 'styled-jsx/server';

import getDisplayName from '../util/getDisplayName';

/**
 * Enable material-ui in nextjs._document.
 * DocumentComponent: next/document.
 * @param {MUITheme} theme
 * @param {next/document} DocumentComponent
 */
const extendsWithMui = themeInput => DocumentComponent => {
  // wrap de
  const theme = createMuiTheme(themeInput);

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

      // inject theme by hoc
      const sheets = new ServerStyleSheets();
      const originalRenderPage = ctx.renderPage;
      ctx.renderPage = () =>
        originalRenderPage({
          // wrap Jss context
          enhanceApp: App => props => sheets.collect(<App {...props} />),
        });

      // get props after override the renderPage to get jss props
      const superProps = await super.getInitialProps(ctx);

      // push to head instead of override styles
      superProps.head.push(
        <React.Fragment key="jss-server-side">
          {sheets.getStyleElement()}
          {flush() || null}
        </React.Fragment>,
      );

      return {
        ...superProps,
      };
    }

    render() {
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
            <meta name="theme-color" content={theme.palette.primary.main} />
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
};

export default extendsWithMui;
