import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import hoistStatics from 'hoist-non-react-statics';

import getDisplayName from '../util/getDisplayName';

/**
 * inject Mui Theme
 * @param {object} theme
 */
const withMuiTheme = themeInput => BaseComponent => {
  const theme = createMuiTheme(themeInput);

  class InjectMuiTheme extends PureComponent {
    // wrap displayName for easier debug
    static displayName = `withMuiTheme(${getDisplayName(BaseComponent)})`;

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <ThemeProvider theme={theme}>
          <BaseComponent {...this.props} />
        </ThemeProvider>
      );
    }
  }

  InjectMuiTheme.propTypes = {
    pageContext: PropTypes.object,
  };

  InjectMuiTheme.defaultProps = {
    pageContext: null,
  };

  // hoist all static functions
  hoistStatics(InjectMuiTheme, BaseComponent);

  return InjectMuiTheme;
};

export default withMuiTheme;
