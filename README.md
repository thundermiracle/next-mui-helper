<h1 align="center">next-mui-helper</h1>

[![npm version](https://badge.fury.io/js/next-mui-helper.svg)](https://badge.fury.io/js/next-mui-helper)
[![Build Status](https://travis-ci.org/thundermiracle/next-mui-helper.svg)](https://travis-ci.org/thundermiracle/next-mui-helper)
[![dependencies Status](https://david-dm.org/thundermiracle/next-mui-helper/status.svg)](https://david-dm.org/thundermiracle/next-mui-helper)
[![devDependencies Status](https://david-dm.org/thundermiracle/next-mui-helper/dev-status.svg)](https://david-dm.org/thundermiracle/next-mui-helper?type=dev)
[![peerDependencies Status](https://david-dm.org/thundermiracle/next-mui-helper/peer-status.svg)](https://david-dm.org/thundermiracle/next-mui-helper?type=peer)

## Description

***material-ui version support***

| version | material-ui's version |
|:---|:-------------:|
| ~0.2.8 | material-ui@beta |
| ~2.0.0 | @material-ui 1.0 ~ 3.9.4 |
| 3.0.0~ | @material-ui 4.0.0 ~ |

next-mui-helper is a package for making a project with [next.js](https://github.com/zeit/next.js/) and [material-ui](https://github.com/mui-org/material-ui) easier.

There are several steps to enable SSR in next.js with material-ui which may be little bit confusing for beginners to implement.

This package wraps those steps and you can achieve the goal with only `two` steps.

## Used By

* [next-boilerplate](https://github.com/thundermiracle/next-boilerplate) simple boilerplate of next.js. With material-ui, google analytics, customizable export, simple layout support.

* [react-sunflower](https://github.com/thundermiracle/react-sunflower) drawing sunflower by using next.js.

## Installation

next-mui-helper is available as an [npm package](https://www.npmjs.org/package/next-mui-helper).

```sh
npm install --save next-mui-helper
```

## *!!Important!!* from next@9.0.0

As described [here](https://github.com/zeit/next.js/issues/8358#issuecomment-521387124), next.js@9 needs ES6 Class syntax in server side but transpiled one in client.

So you MUST use files in es6 folder and tell webpack to transpiled it in client.

## Steps from next@9.0.0

### Full example is *[here](/examples/es6)*

1. use ES6 module in ```_document.js``` and ```_app.js```;

    ```jsx
    import { makeNextDocument } from 'next-mui-helper/es';

    export default makeNextDocument();
    ```

    ```jsx
    import { makeNextApp } from 'next-mui-helper/es';

    export default makeNextApp();
    ```

1. include next-mui-helper in ```next.config.js``` for transpile(by using next-transpile-modules)

    ```jsx
    const withTM = require('next-transpile-modules');

    module.exports = withTM({
      transpileModules: ['next-mui-helper'],
    });
    ```

## Steps until next@8.0.0

1. Create _document.js in the pages folder.

    ```jsx
    import { makeNextDocument } from 'next-mui-helper';

    export default makeNextDocument();
    ```

1. Create _app.js in the pages folder.

    ```jsx
    import { makeNextApp } from 'next-mui-helper';

    export default makeNextApp();
    ```

That's it! Want to inject your own theme? See following instructions.

### About step2, without make a _app.js file, you also can inject theme by hoc.

  ```jsx
  import React from 'react';
  import { withParts } from 'next-mui-helper';
  import Button from '@material-ui/core/Button';

  const Page1 = () => (
    <Button color="primary">
      Hello World
    </Button>
  );

  export default withParts()(Page1);
  ```

## Instructions

#### You can import functions from next-mui-helper/es if ES6 is preferable.

* **makeNextDocument**

| No.   |      Parameter      |  Default | Description |
|:---|:-------------:|:--------------|:-----------|
| 1 |  muiTheme | ```{ palette: { primary: blue, secondary: pink, }, }``` | material-ui's theme object |
| 2 |  Document | ```next/document``` | |

* **makeNextApp**

| No.   |      Parameter      |  Default | Description |
|:---|:-------------:|:--------------|:-----------|
| 1 |  muiTheme | ```{ palette: { primary: blue, secondary: pink, }, }``` | material-ui's theme object |
| 2 |  layout | null | Layout component(like ```<Layout>{childrend}</Layout>)``` |
| 3 |  enable nprogress | false | enable progress bar made by [nprogress](https://github.com/rstacruz/nprogress) |
| 4 |  enable CssBaseline | true | enable material-ui's default [CssBaseline](https://material-ui-next.com/style/css-baseline/) |
| 5 |  App | ```next/app``` | |

* **withParts**

| No.   |      Parameter      |  Default | Description |
|:---|:-------------:|:--------------|:-----------|
| 1 |  muiTheme | ```{ palette: { primary: blue, secondary: pink, }, }``` | material-ui's theme object |
| 2 |  layout | null | Layout component(like ```<Layout>{childrend}</Layout>)``` |
| 3 |  enable nprogress | false | enable progress bar made by [nprogress](https://github.com/rstacruz/nprogress) |
| 4 |  enable CssBaseline | true | enable material-ui's default [CssBaseline](https://material-ui-next.com/style/css-baseline/) |

* **withProgressBar**
| No.   |      Parameter      |  Default | Description |
|:---|:-------------:|:--------------|:-----------|
| 1 |  BaseComponent |  | add NProgress bar to BaseComponent |

* **useThemeManagerContext**
hook for manage theme.

| No.   |      Parameter      |  Default | Description |
|:---|:-------------:|:--------------|:-----------|
| 1 | |  | returns theme object and setTheme(theme). call setTheme(theme) to change the project's theme |

* **withThemeManager**
hoc to inject theme object and setTheme(theme) function

* **deepCompareObj**
deep compare two objects, return _true_ if they're the same.

## Examples

You can find some examples under the [./example](/examples) folder.

OR

Open them in CodeSandbox:

1. simple:　[[simple] in CodeSandbox](https://codesandbox.io/s/github/thundermiracle/next-mui-helper/tree/master/examples/simple)

1. withTheme:　[[withTheme] in CodeSandbox](https://codesandbox.io/s/github/thundermiracle/next-mui-helper/tree/master/examples/withTheme?module=%2Fsrc%2Fpages%2Findex.js)

1. withThemeApp:　[[withThemeApp] in CodeSandbox](https://codesandbox.io/s/github/thundermiracle/next-mui-helper/tree/master/examples/withThemeApp?module=%2Fsrc%2Fpages%2Findex.js)

1. use ES6:　[[ES6] in CodeSandbox](https://codesandbox.io/s/github/thundermiracle/next-mui-helper/tree/master/examples/es6)

1. withRedux:　[[withRedux] in CodeSandbox](https://codesandbox.io/s/github/thundermiracle/next-mui-helper/tree/master/examples/withRedux?module=%2Fsrc%2Fpages%2Findex.js)

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
