import React from 'react';
import { Head, Main, NextScript } from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';

import getContext from '../util/getContext';

/**
 * Enable material-ui in nextjs._document.
 * DocumentComponent: next/document.
 * @param {MUITheme} theme
 * @param {next/document} DocumentComponent
 */
const extendsDocumentWithMui = theme => ((DocumentComponent) => {
  class ExtendsDocumentWithMui extends DocumentComponent {
    static async getInitialProps(ctx) {
      const props = await super.getInitialProps(ctx);

      const stylesContext = getContext(theme);
      // eslint-disable-next-line react/display-name
      const page = ctx.renderPage(Component => cprops => (
        <JssProvider
          registry={stylesContext.sheetsRegistry}
          generateClassName={stylesContext.generateClassName}
        >
          <Component stylesContext={stylesContext} {...cprops} />
        </JssProvider>
      ));

      const { head } = props;
      const jssStyles = (
        <style
          id="jss-server-side"
          dangerouslySetInnerHTML={{ __html: stylesContext.sheetsRegistry.toString() }}
        />
      );
      head.push(jssStyles);

      return {
        ...props,
        ...page,
        head,
        stylesContext,
      };
    }

    render() {
      const { stylesContext } = this.props;

      return (
        <html lang="ja">
          <Head>
            <meta charSet="utf-8" />
            {/* Use minimum-scale=1 to enable GPU rasterization */}
            <meta
              name="viewport"
              content={
                'user-scalable=0, initial-scale=1, ' +
                'minimum-scale=1, width=device-width, height=device-height'
              }
            />
            {/* PWA primary color */}
            <meta name="theme-color" content={stylesContext.theme.palette.primary[500]} />
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

  return ExtendsDocumentWithMui;
});

export default extendsDocumentWithMui;
