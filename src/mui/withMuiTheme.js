import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider } from 'material-ui/styles';
import JssProvider from 'react-jss/lib/JssProvider';

import getInitialProps from '../util/getInitialProps';
import getContext from '../util/getContext';

/**
 * inject Mui Theme
 * @param {object} theme 
 */
const withMuiTheme = theme => ((BaseComponent) => {
  class InjectMuiTheme extends PureComponent {
    pageContext = null;

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
    
    static async getInitialProps(context) {
      const props = await getInitialProps(BaseComponent, context);
      return { ...props };
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

  return InjectMuiTheme;
});

export default withMuiTheme;
