import makeNextApp from 'nextjs-mui-helper/nextjs/makeNextApp';

import CommonLayout from '../client/layout/CommonLayout';
import theme from '../client/style/theme';

export default makeNextApp(theme, CommonLayout, true);
