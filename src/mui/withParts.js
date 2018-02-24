import compose from '../util/compose';

import withLayout from './withLayout';
import withMuiTheme from './withMuiTheme';
import withProgressBar from './withProgressBar';

import defaultTheme from './defaultTheme';

const withParts = (muiTheme = null, Layout = null, enableNProgress = true) => {
  let layoutHoc;
  if (Layout != null) layoutHoc = withLayout(Layout);

  const muiThemeHoc = withMuiTheme(muiTheme || defaultTheme);

  let progressBarHoc;
  if (enableNProgress) progressBarHoc = withProgressBar;

  return compose(
    layoutHoc,
    muiThemeHoc,
    progressBarHoc,
  );
};

export default withParts;
