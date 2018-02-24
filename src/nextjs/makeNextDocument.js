import Document from 'next/document';

import extendsDocumentWithMui from './extendsDocumentWithMui';
import extendsDocumentWithIntl from './extendsDocumentWithIntl';

import defaultTheme from '../mui/defaultTheme';

/**
 * Making _document from next/document.
 * Including yahoo/intl, material-ui.
 * @param {MUITheme} theme
 */
export default theme => extendsDocumentWithMui(theme || defaultTheme)(extendsDocumentWithIntl(Document));
