import React from 'react';

import { CssBaseline } from '@material-ui/core';
import getInitialProps from '../util/getInitialProps';
import getDisplayName from '../util/getDisplayName';

/**
 * inject Material-ui's default cssbaseline
 */
const withCssBaseline = (BaseComponent) => {
  const InjectMUICssBaseline = (props) => {
    const CssBaselineWrapper = CssBaseline;

    return (
      <div>
        <CssBaselineWrapper />
        <BaseComponent {...props} />
      </div>
    );
  };

  // wrap displayName for easier debug
  InjectMUICssBaseline.displayName = `withCssBaseline(${getDisplayName(BaseComponent)})`;

  InjectMUICssBaseline.getInitialProps = async (context) => {
    const props = await getInitialProps(BaseComponent, context);
    return { ...props };
  };

  return InjectMUICssBaseline;
};

export default withCssBaseline;
