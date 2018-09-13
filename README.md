<h1 align="center">

nextjs-mui-helper

</h1>

[![npm version](https://badge.fury.io/js/nextjs-mui-helper.svg)](https://badge.fury.io/js/nextjs-mui-helper)
 [![Build Status](https://travis-ci.org/thundermiracle/nextjs-mui-helper.svg)](https://travis-ci.org/thundermiracle/nextjs-mui-helper)
[![dependencies Status](https://david-dm.org/thundermiracle/nextjs-mui-helper/status.svg)](https://david-dm.org/thundermiracle/nextjs-mui-helper)
[![devDependencies Status](https://david-dm.org/thundermiracle/nextjs-mui-helper/dev-status.svg)](https://david-dm.org/thundermiracle/nextjs-mui-helper?type=dev)
[![peerDependencies Status](https://david-dm.org/thundermiracle/nextjs-mui-helper/peer-status.svg)](https://david-dm.org/thundermiracle/nextjs-mui-helper?type=peer)

## Description

***ONLY Support @material-ui/core. If you want to use material-ui@beta version, please use v0.2.8 instead.***

nextjs-mui-helper is a package for making a project with [nextjs](https://github.com/zeit/next.js/) and [material-ui](https://github.com/mui-org/material-ui) easier.

There are several steps to enable SSR in nextjs with material-ui which may be little bit confusing for beginners to implement.

This package wraps those steps and you can achieve the goal with only `two` steps. 

## Installation

nextjs-mui-helper is available as an [npm package](https://www.npmjs.org/package/nextjs-mui-helper).

```sh
npm install --save nextjs-mui-helper
```

## Steps

1. Create a _document.js under the pages folder.

```jsx
import makeNextDocument from 'nextjs-mui-helper/nextjs/makeNextDocument';

export default makeNextDocument();
```

2. Use hoc to inject material-ui to your page. Example: make a page1.js under pages folder.

```jsx
import React from 'react';
import withParts from 'nextjs-mui-helper/mui/withParts';
import Button from 'material-ui/Button';

const Page1 = () => (
  <Button color="primary">
    Hello World
  </Button>
);

export default withParts()(Page1);
```
That's it! Want to inject your own theme? See following instructions.

### About step2, you also can create a _app.js under the pages folder.

```jsx
import makeNextApp from 'nextjs-mui-helper/nextjs/makeNextApp';

export default makeNextApp();
```



## Instructions

* **nextjs/makeNextDocument**

| No.   |      Parameter      |  Default | Description |
|:---|:-------------:|:--------------|:-----------|
| 1 |  muiTheme | ```{ palette: { primary: blue, secondary: pink, }, }``` | material-ui's theme object |

* **mui/withParts**

| No.   |      Parameter      |  Default | Description |
|:---|:-------------:|:--------------|:-----------|
| 1 |  muiTheme | ```{ palette: { primary: blue, secondary: pink, }, }``` | material-ui's theme object |
| 2 |  layout | null | Layout component(like ```<Layout>{childrend}</Layout>)``` |
| 3 |  enable nprogress | false | enable progress bar made by [nprogress](https://github.com/rstacruz/nprogress) |
| 4 |  enable CssBaseline | true | enable material-ui's default [CssBaseline](https://material-ui-next.com/style/css-baseline/) |

* **nextjs/makeNextApp**

Same with withParts. But can be used to create a _app.js file.

## Examples

You can find some examples under the [./example](/examples) folder.

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
