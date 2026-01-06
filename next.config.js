const path = require('path');

module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack(config, { dev, isServer }) {
    const cssModuleRule = config.module.rules.find(
      (r) => r.oneOf
    )?.oneOf.find(
      (rule) =>
        rule?.test?.toString().includes('.module.css')
    );

    if (cssModuleRule) {
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
