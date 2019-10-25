import { makeNextApp } from 'next-mui-helper/es';

import CommonLayout from '../client/layout/CommonLayout';
import { DefaultTheme } from '../client/style/theme';

export default makeNextApp(DefaultTheme, CommonLayout, true);
