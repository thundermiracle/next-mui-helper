import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getContext from '../util/getContext';
import defaultTheme from '../mui/defaultTheme'

import withParts from '../mui/withParts';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const NewComponent = withParts()(Component);
    return (
      <Container>
        <NewComponent {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
