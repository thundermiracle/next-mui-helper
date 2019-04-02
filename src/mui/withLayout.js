import React from 'react';

import hoistStatics from 'hoist-non-react-statics';

import getInitialProps from '../util/getInitialProps';
import getDisplayName from '../util/getDisplayName';

/**
 * inject Layout
 * @param {Component} Layout
 */
const withLayout = Layout => BaseComponent => {
  const InjectLayout = props => {
    return (
      <Layout {...props}>
        <BaseComponent {...props} />
      </Layout>
    );
  };

  // wrap displayName for easier debug
  InjectLayout.displayName = `withLayout(${getDisplayName(BaseComponent)})`;

  InjectLayout.getInitialProps = async context => {
    const props = await getInitialProps(BaseComponent, context);

    // Get menu info
    const { pathname } = context;

    // get title from pathname
    let title;
    if (pathname && pathname !== '') {
      [title] = pathname.split('/').reverse();
      // title = pathname.slice(pathname.lastIndexOf('/') + 1);
    }

    return { ...props, title };
  };

  // hoist all static functions
  hoistStatics(InjectLayout, BaseComponent);

  return InjectLayout;
};

export default withLayout;
