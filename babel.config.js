console.log('NODE_ENV:', process.env.NODE_ENV);

// common definition
const common = {
  presets: [],
  plugins: [],
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types'],
    },
  },
  ignore: ['node_modules/**'],
};

let presets = [];
switch (process.env.NODE_ENV) {
  case 'es':
    // es6
    presets = ['@babel/react'];
    break;
  case 'production':
    // production
    presets = ['@babel/env', '@babel/react'];
    break;
  default:
    presets = ['next/babel'];
    // prevent next9.0.2 compile error
    delete common.ignore;
    break;
}

const productionPlugins = [
  'add-module-exports',
  [
    'import',
    {
      libraryName: '@material-ui/core',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'tree-shaking-mui-core',
  ],
  [
    'import',
    {
      libraryName: '@material-ui/core/styles',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'tree-shaking-mui-styles',
  ],
  [
    'import',
    {
      libraryName: '@material-ui/core/colors',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'tree-shaking-mui-colors',
  ],
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  [
    '@babel/plugin-transform-runtime',
    {
      helpers: false,
      regenerator: true,
    },
  ],
];

// merge
const babelConfig = {
  ...common,
  presets,
  env: {
    es: {
      plugins: productionPlugins,
    },
    production: {
      plugins: productionPlugins,
    },
  },
};

module.exports = babelConfig;
