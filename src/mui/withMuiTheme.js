import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider } from 'material-ui/styles';
// import { Reboot, CssBaseline } from 'material-ui';

import getInitialProps from '../util/getInitialProps';
import getContext from '../util/getContext';

/**
 * inject Mui Theme
 * @param {object} theme 
 */
const withMuiTheme = theme => ((BaseComponent) => {
  class InjectMuiTheme extends PureComponent {
    static async getInitialProps(context) {
      const props = getInitialProps(BaseComponent, context);
      return { ...props };
    }

    componentWillMount() {
      this.styleContext = this.props.stylesContext || getContext(theme);
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      // mui < beta36: reboot; mui >= beta37 : CssBaseline
      // const CssBaselineWrapper = CssBaseline == null ? Reboot : CssBaseline;

      return (
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          {/* <CssBaselineWrapper /> */}
          <BaseComponent {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  InjectMuiTheme.propTypes = {
    stylesContext: PropTypes.object,
  };

  InjectMuiTheme.defaultProps = {
    stylesContext: null,
  };

  return InjectMuiTheme;
});

export default withMuiTheme;
