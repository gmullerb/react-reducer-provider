// Copyright (c) 2020 Gonzalo Müller Bravo.

const webpackConfig = require('./webpack.test.js')

module.exports = function (config) {
  config.set({
    files: [ 'testEntryPoint.js' ],
    exclude: [ '**/*.test.jsx' ],
    frameworks: [ 'jasmine' ],
    browsers: process.env.SINGLE_TEST === '1' ? [ 'jsdom' ] : [ 'ChromeHeadlessNoSandBox', 'ChromeHeadlessNoSandBox', 'jsdom', 'jsdom' ], // Running more than once
    customLaunchers: {
      ChromeHeadlessNoSandBox: {
        base: 'ChromeHeadless',
        flags: [ '--no-sandbox' ]
      }
    },
    preprocessors: {
      'testEntryPoint.js': [ 'webpack' ]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      quiet: true,
      stats: {
        colors: true
      }
    },
    reporters: [
      'coverage-istanbul',
      'html',
      'junit',
      'mocha'
    ],
    coverageIstanbulReporter: {
      dir: 'build/reports/coverage',
      reports: [
        'lcov',
        'text',
        'text-summary'
      ],
      fixWebpackSourcePath: true,
      skipFilesWithNoCoverage: true,
      thresholds: {
        global: {
          branches: 85,
          functions: 65,
          statements: 25,
          lines: 5
        }
      }
    },
    junitReporter: {
      outputDir: '../../build/reports/tests',
      outputFile: 'tests_report.xml',
      useBrowserName: false
    },
    htmlReporter: {
      focusOnFailures: false,
      namedFiles: true,
      outputDir: 'build/reports/tests',
      reportName: 'tests_report'
    },
    autoWatch: false,
    singleRun: true
  })
}
