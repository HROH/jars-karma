var KarmaServer = require('karma').Server,
    path = require('path');

function karmaConfigurator(files) {
    'use strict';

    return function(config) {
        config.set({
            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '../',
            /*
             * frameworks to use
             * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
             */
            frameworks: ['mocha', 'chai-sinon'],
            // list of files / patterns to load in the browser
            files: files.concat(['tests/index.js', {
                pattern: 'tests/**/*-spec.js',

                included: false
            }, {
                pattern: 'src/**/*.js',

                included: false
            }]),

            client: {
                mocha: {
                    reporter: 'html',

                    ui: 'bdd'
                }
            },
            // list of files to exclude
            exclude: [],
            /*
             * preprocess matching files before serving them to the browser
             * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
             */
            preprocessors: {
                './src/**/*.js': ['coverage']
            },
            /*
             * test results reporter to use
             * possible values: 'dots', 'progress'
             * available reporters: https://npmjs.org/browse/keyword/karma-reporter
             */
            reporters: ['progress', 'coverage'],

            coverageReporter: {
                type: 'html',

                dir: './reports/coverage/',

                subdir: function(browser) {
                    // normalization process to keep a consistent browser name across different OS
                    return browser.toLowerCase().split(/[ /-]/)[0];
                }
            },
            // web server port
            port: 9876,
            // enable / disable colors in the output (reporters and logs)
            colors: true,
            /*
             * level of logging
             * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
             */
            logLevel: config.LOG_INFO,
            /*
             * enable / disable watching file and executing tests whenever any file changes
             */
            //autoWatch: false,
            /*
             * start these browsers
             * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
             */
            browsers: ['ChromeHeadless', 'FirefoxHeadless'],
            /*
             * Continuous Integration mode
             * if true, Karma captures browsers, runs the tests and exits
             */
            //singleRun: true,

            plugins: [require('karma-mocha'), require('karma-chai-sinon'), require('karma-coverage'), require('karma-chrome-launcher'), require('karma-firefox-launcher')]
        });
    };
}

function karmaServer(singleRun) {
    'use strict';

    return function(done) {
        new KarmaServer({
            configFile: path.join(process.cwd(), 'tests', 'karma.conf.js'),

            singleRun: singleRun
        }, done).start();
    };
}

module.exports = {
    createConfigurator: karmaConfigurator,

    createServer: karmaServer
};
