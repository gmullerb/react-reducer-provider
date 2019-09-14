// Copyright (c) 2019 Gonzalo Müller Bravo.

const webpackConfig = require('./webpack.test.js')

module.exports = function (config) {
  config.set({
    files: ['testEntryPoint.js'],
    frameworks: ['jasmine'],
    browsers: ['jsdom'],
    preprocessors: {
      'testEntryPoint.js': [ 'webpack']
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
          statements: 97,
          branches: 97,
          functions: 97,
          lines: 97,
        },
        each: {
          statements: 95,
          branches: 95,
          functions: 95,
          lines: 95,
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
