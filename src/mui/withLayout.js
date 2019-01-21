import React from 'react';

import getInitialProps from '../util/getInitialProps';
import getDisplayName from '../util/getDisplayName';

/**
 * inject Layout
 * @param {Component} Layout 
 */
const withLayout = Layout => ((BaseComponent) => {
  const InjectLayout = (props) => {
    return (
      <Layout {...props}>
        <BaseComponent {...props} />
      </Layout>
    );
  };

  // wrap displayName for easier debug
  InjectLayout.displayName = `withLayout(${getDisplayName(BaseComponent)})`;

  InjectLayout.getInitialProps = async (context) => {
    const props = await getInitialProps(BaseComponent, context);

    // Get menu info
    const { pathname } = context;

    // get title from pathname
    let title;
    if (pathname && pathname !== '') {
      title = pathname.slice(pathname.lastIndexOf('/') + 1);
    }

    return { ...props, title };
  };

  return InjectLayout;
});

export default withLayout;
