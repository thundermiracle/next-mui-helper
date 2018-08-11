import compose from '../util/compose';

import withLayout from './withLayout';
import withMuiTheme from './withMuiTheme';
import withProgressBar from './withProgressBar';
import withCssBaseline from './withCssBaseline';

import defaultTheme from './defaultTheme';

const withParts = (muiTheme = null, Layout = null, enableNProgress = false, enableDefaultCssBaseline = true) => {
  const layoutHoc = Layout != null ? withLayout(Layout) : null;

  const muiThemeHoc = withMuiTheme(muiTheme || defaultTheme);

  const progressBarHoc = enableNProgress ? withProgressBar : null;

  const cssBaselineHoc = enableDefaultCssBaseline ? withCssBaseline : null;

  return compose(
    progressBarHoc,
    muiThemeHoc,
    cssBaselineHoc, // inject global css before muiTheme
    layoutHoc,
  );
};

export default withParts;
