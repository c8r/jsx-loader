const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: path.resolve(__dirname),
        options: {
          scope: `import scope from './scope'`
        }
      }
    ]
  }
}
