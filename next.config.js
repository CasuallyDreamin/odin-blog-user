const path = require('path');

module.exports = {
  webpack(config, { dev, isServer }) {
    // Find the rule handling css modules
    const cssModuleRule = config.module.rules.find(
      (r) => r.oneOf
    )?.oneOf.find(
      (rule) =>
        rule?.test?.toString().includes('.module.css')
    );

    if (cssModuleRule) {
      // Ensure PostCSS loader is applied
      cssModuleRule.use.push({
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            config: path.resolve(__dirname, 'postcss.config.js'),
          },
        },
      });
    }

    return config;
  },
};
