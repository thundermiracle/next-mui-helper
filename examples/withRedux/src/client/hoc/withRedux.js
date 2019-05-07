import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';

import getStore from '../store/getStore';

/**
 * inject redux store
 */
const withMuiTheme = BaseComponent => {
  class InjectMuiTheme extends PureComponent {
    static async getInitialProps(ctx) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getStore();

      // Provide the store to getInitialProps of pages
      ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof BaseComponent.getInitialProps === 'function') {
        appProps = await BaseComponent.getInitialProps(ctx);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getStore(props.initialReduxState);
    }

    render() {
      return (
        <Provider store={this.reduxStore}>
          <BaseComponent {...this.props} />
        </Provider>
      );
    }
  }

  InjectMuiTheme.propTypes = {
    initialReduxState: PropTypes.object,
  };

  InjectMuiTheme.defaultProps = {
    initialReduxState: null,
  };

  return InjectMuiTheme;
};

export default withMuiTheme;
