import Document from 'next/document';

import extendsWithMui from './extendsWithMui';
import extendsWithIntl from './extendsWithIntl';

import defaultTheme from '../mui/defaultTheme';

import compose from '../util/compose';

/**
 * Making _document from next/document.
 * Including yahoo/intl, material-ui.
 * @param {MUITheme} theme
 */
const makeNextDocument = theme => compose(
  extendsWithMui(theme || defaultTheme),
  extendsWithIntl,
)(Document);

export default makeNextDocument;

export const DefaultNextDocument = makeNextDocument();
