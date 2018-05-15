import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider } from 'material-ui/styles';

import getInitialProps from '../util/getInitialProps';
import getContext from '../util/getContext';

/**
 * inject Mui Theme
 * @param {object} theme 
 */
const withMuiTheme = theme => ((BaseComponent) => {
  class InjectMuiTheme extends PureComponent {
    constructor(props, context) {
      super(props, context);

      this.styleContext = this.props.stylesContext || getContext(theme);
    }

    static async getInitialProps(context) {
      const props = await getInitialProps(BaseComponent, context);
      return { ...props };
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
