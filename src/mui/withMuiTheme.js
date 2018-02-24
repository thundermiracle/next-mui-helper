import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';

import getInitialProps from '../util/getInitialProps';
import getContext from '../util/getContext';

// Apply some reset
const styles = {
  '@global': {
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
  },
};

let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

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
      return (
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <Reboot />
          <AppWrapper>
            <BaseComponent {...this.props} />
          </AppWrapper>
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
