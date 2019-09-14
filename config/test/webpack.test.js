// Copyright (c) 2019 Gonzalo Müller Bravo.
const webpack = require('webpack')

const reactRule = {
  test: /\.jsx$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-react']
    }
  }
}

const istanbulRule = {
  test: /\.js(x?)$/,
  include: /src\/main\/js/,
  enforce: 'post',
  use: {
    loader: 'istanbul-instrumenter-loader',
    options: {
      esModules: true
    }
  }
}

module.exports = {
  mode: 'development',
  module: {
    rules: [
      reactRule,
      istanbulRule
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      test: /\.js(x)?$/
    }),
  ],
  watch: false
}
