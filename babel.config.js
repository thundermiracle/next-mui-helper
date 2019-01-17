console.log('NODE_ENV:', process.env.NODE_ENV);

// common definition
const common = {
  presets: [],
  plugins: [],
  env: {
    production: {
      plugins: [
        'transform-react-remove-prop-types',
      ],
    },
  },
  ignore: ['node_modules/**'],
};


let presets = [];
let plugins = [];
if (process.env.NODE_ENV !== 'production') {
  // besides production
  presets = [
    'next/babel',
  ];
} else {
  // production
  presets = [
    '@babel/env',
    '@babel/react',
  ];

  plugins = [
    'add-module-exports',
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
}

// merge
const babelConfig = {
  ...common,
  presets,
  plugins,
};

module.exports = babelConfig;
