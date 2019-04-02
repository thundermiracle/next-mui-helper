import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import hoistStatics from 'hoist-non-react-statics';

import getContext from '../util/getContext';
import getDisplayName from '../util/getDisplayName';

/**
 * inject Mui Theme
 * @param {object} theme
 */
const withMuiTheme = theme => BaseComponent => {
  class InjectMuiTheme extends PureComponent {
    pageContext = null;

    // wrap displayName for easier debug
    static displayName = `withMuiTheme(${getDisplayName(BaseComponent)})`;

    constructor(props) {
      super(props);
      this.pageContext = props.pageContext || getContext(theme);
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      // eslint-disable-next-line react/destructuring-assignment
      const pageContext = this.props.pageContext || this.pageContext;

      return (
        <JssProvider
          registry={pageContext.sheetsRegistry}
          generateClassName={pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={pageContext.theme}
            sheetsManager={pageContext.sheetsManager}
          >
            <BaseComponent {...this.props} pageContext={pageContext} />
          </MuiThemeProvider>
        </JssProvider>
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
