const path = require('path');

module.exports = function override(config, env) {
  config.module.rules = [
    // salesforce dependencies
    // this will compile salesforce lightning as src, not as package
    {
      test: /\.jsx?$/,
      include: [
        'node_modules/@salesforce/design-system-react',
      ].map(
        someDir => path.resolve(
          process.cwd(),
          someDir
        )
      ),
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          "react-app"
        ],
      },
    },
  ].concat(config.module.rules);

  return config;
}