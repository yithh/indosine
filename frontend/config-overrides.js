const { override, addWebpackResolve } = require('customize-cra');

module.exports = override(
  addWebpackResolve({
    fallback: {
      "path": false,
      "os": false,
      "crypto": false
    }
  })
);
