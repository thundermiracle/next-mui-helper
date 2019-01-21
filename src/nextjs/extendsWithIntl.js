import React from 'react';
import getDisplayName from '../util/getDisplayName';

/**
 * Enable yahoo/intl in nextjs._document.
 * DocumentComponent: next/document.
 * Passing IntlScripts as name:localeDataScript from server is required
 * @param {NextDocument} DocumentComponent 
 */
const extendsWithIntl = (DocumentComponent) => {
  class ExtendsWithIntl extends DocumentComponent {
    static displayName = `extendsWithIntl(${getDisplayName(DocumentComponent)})`;

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

  return ExtendsWithIntl;
};

export default extendsWithIntl;
