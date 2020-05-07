// Copyright (c) 2020 Gonzalo Müller Bravo.

const reactRule = {
  test: /\.jsx$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [ '@babel/preset-react' ]
    }
  }
}

const istanbulRule = {
  test: /\.js(x?)$/,
  include: /cjs/,
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
    extensions: [ '.js', '.jsx' ]
  },
  watch: false
}
