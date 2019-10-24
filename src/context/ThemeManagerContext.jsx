import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const initState = {
  theme: {},
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme, callback) => {},
};

const ThemeManagerContext = React.createContext(initState);

class ThemeManagerProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      theme: props.initTheme || initState.theme,
    };
  }

  setTheme = (theme, callback) => {
    this.setState({ theme }, () => {
      if (callback && typeof callback === 'function') {
        callback(theme);
      }
    });
  };

  render() {
    const { children } = this.props;
    const { theme } = this.state;

    return (
      <ThemeManagerContext.Provider
        value={{
          theme,
          setTheme: this.setTheme,
        }}
      >
        {children}
      </ThemeManagerContext.Provider>
    );
  }
}

ThemeManagerProvider.propTypes = {
  children: PropTypes.any.isRequired,
  initTheme: PropTypes.object,
};

ThemeManagerProvider.defaultProps = {
  initTheme: {},
}

const useThemeManagerContext = () => {
  return useContext(ThemeManagerContext);
};

const withThemeManager = BaseComponent => {
  const WithThemeManager = props => {
    return (
      <ThemeManagerContext.Consumer>
        {ctx => {
          return <BaseComponent {...ctx} {...props} />;
        }}
      </ThemeManagerContext.Consumer>
    );
  };

  return WithThemeManager;
};

export { ThemeManagerContext as default, ThemeManagerProvider, useThemeManagerContext, withThemeManager };
