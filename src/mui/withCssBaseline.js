import React from 'react';

import { Reboot, CssBaseline } from 'material-ui';
import getInitialProps from '../util/getInitialProps';

/**
 * inject Material-ui's default cssbaseline
 */
const withCssBaseline = (BaseComponent) => {
  const InjectMUICssBaseline = (props) => {
    // mui < beta36: reboot; mui >= beta37 : CssBaseline
    const CssBaselineWrapper = CssBaseline == null ? Reboot : CssBaseline;

    return (
      <div>
        <CssBaselineWrapper />
        <BaseComponent {...props} />
      </div>
    );
  };

  InjectMUICssBaseline.getInitialProps = async (context) => {
    const props = await getInitialProps(BaseComponent, context);
    return { ...props };
  };

  return InjectMUICssBaseline;
};

export default withCssBaseline;
