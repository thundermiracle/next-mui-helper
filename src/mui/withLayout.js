import React from 'react';

import getInitialProps from '../util/getInitialProps';

/**
 * inject Layout
 * @param {Component} Layout 
 */
const withLayout = Layout => ((Page) => {
  const InjectLayout = (props) => {
    return (
      <Layout {...props} >
        <Page {...props} />
      </Layout>
    );
  };

  InjectLayout.getInitialProps = async (context) => {
    const props = await getInitialProps(Page, context);

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
