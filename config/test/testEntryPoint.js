// Copyright (c) 2019 Gonzalo Müller Bravo.
import './enzyme.conf'

const coreContext = require.context('../../src/main/js', true, /\.js$/)
coreContext
  .keys()
  .forEach(coreContext)

const testContext = require.context('../../src/test/js', true, /\.test\.js(x?)$/)
testContext
  .keys()
  .forEach(testContext)
