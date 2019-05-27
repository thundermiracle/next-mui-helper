import React from 'react';

import hoistStatics from 'hoist-non-react-statics';

import CssBaseline from '@material-ui/core/CssBaseline';
import getDisplayName from '../util/getDisplayName';

/**
 * inject Material-ui's default cssbaseline
 */
const withCssBaseline = BaseComponent => {
  const InjectMUICssBaseline = props => {
    return (
      <>
        <CssBaseline />
        <BaseComponent {...props} />
      </>
    );
  };

  // wrap displayName for easier debug
  InjectMUICssBaseline.displayName = `withCssBaseline(${getDisplayName(BaseComponent)})`;

  // hoist all static functions
  hoistStatics(InjectMUICssBaseline, BaseComponent);

  return InjectMUICssBaseline;
};

export default withCssBaseline;
