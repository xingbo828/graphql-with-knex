const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#4B286D',
        '@link-color': '#4B286D',
        '@success-color': '#2B8000',
        '@warning-color': '#8C5415',
        '@error-color': '#C12335',
        '@font-size-base': '14px',
        '@text-color': 'rgb(42, 44, 46, 0.65)',
        '@text-color-secondary': 'rgb(42, 44, 46, 0.45)',
        '@disabled-color': 'rgb(42, 44, 46, 0.25)',
      },
    },
  }),
);
