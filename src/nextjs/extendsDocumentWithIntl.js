import React from 'react';

/**
 * Enable yahoo/intl in nextjs._document.
 * DocumentComponent: next/document.
 * Passing IntlScripts as name:localeDataScript from server is required
 * @param {NextDocument} DocumentComponent 
 */
const extendsDocumentWithIntl = (DocumentComponent) => {
  class ExtendsDocumentWithIntl extends DocumentComponent {
    static async getInitialProps(ctx) {
      const props = await super.getInitialProps(ctx);

      // react-intl ssr
      const { req: { localeDataScript } } = ctx;

      const { head } = props;
      if (localeDataScript) {
        const intlScript = (
          <script
            dangerouslySetInnerHTML={{ __html: localeDataScript.toString() }}
          />
        );
        head.push(intlScript);
      }

      return {
        ...props,
        head,
      };
    }
  }

  return ExtendsDocumentWithIntl;
};

export default extendsDocumentWithIntl;
