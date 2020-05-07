// Copyright (c) 2020 Gonzalo Müller Bravo.
/* eslint-disable import/no-default-export, import/no-anonymous-default-export */
import cleanup from 'rollup-plugin-cleanup'

export default {
  input: './src/react-reducer-provider.js',
  output: {
    file: './cjs/react-reducer-provider.js',
    format: 'cjs',
    esModule: false,
    compact: true,
    banner: '// Copyright (c) 2020 Gonzalo Müller Bravo.'
  },
  external: [ 'react' ],
  plugins: [
    cleanup({
      comments: 'none',
      maxEmptyLines: 0,
      sourceMap: false
    })
  ]
}
