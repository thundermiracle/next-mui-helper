import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';

function createContext(themeObj) {
  return {
    theme: createMuiTheme(themeObj),
    // eslint-disable-next-line no-undef
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

let pageContext;

export default function getContext(themeObj) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createContext(themeObj);
  }

  // Reuse context on the client-side
  if (!pageContext) {
    pageContext = createContext(themeObj);
  }

  return pageContext;
}
