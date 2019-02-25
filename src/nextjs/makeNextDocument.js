import Document from 'next/document';

import extendsWithMui from './extendsWithMui';

import defaultTheme from '../mui/defaultTheme';

import compose from '../util/compose';

/**
 * Making _document from next/document.
 * Including material-ui.
 * @param {MUITheme} theme
 */
const makeNextDocument = theme => compose(
  extendsWithMui(theme || defaultTheme),
)(Document);

export default makeNextDocument;

export const DefaultNextDocument = makeNextDocument();
