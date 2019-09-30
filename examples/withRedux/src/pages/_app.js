import { makeNextApp } from 'next-mui-helper/es';
import { Provider } from 'react-redux';

import CommonLayout from '../client/layout/CommonLayout';
import theme from '../client/style/theme';
import withReduxStore from '../client/hoc/withReduxStore';

const BaseApp = makeNextApp(theme, CommonLayout, true);

class MyApp extends BaseApp {
  render() {
    const { reduxStore } = this.props;
    const elementTree = super.render();

    return <Provider store={reduxStore}>{elementTree.props.children}</Provider>;
  }
}

export default withReduxStore(MyApp);
