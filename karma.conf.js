// Karma configuration
// Generated on Sun May 03 2015 22:44:55 GMT+0200 (Paris, Madrid (heure d'été))

module.exports = function(config) {
    console.log(process.argv);
    var sourcePreprocessors  = 'coverage';
    function isDebug(argument) {
        return argument === '--debug';
    }
    if (process.argv.some(isDebug)) {
        sourcePreprocessors  = [];
    }
    
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'vendor/moment/min/moment.min.js',
      'vendor/moment/locale/fr.js',
      'src/js/viewHelper.js',
      'test/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': sourcePreprocessors
    },


      
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'html', 'coverage'],

//    junitReporter: {
//      outputFile: 'test/junit-report.xml',
//      suite: ''
//    },
      
    htmlReporter: {
      outputFile: 'test/units.html'
    },
    
    coverageReporter: [
        { type : 'html', dir : 'coverage/' },
        { type : 'text-summary' }
    ],
      
//    plugins : ['karma-mocha-reporter'],      
      
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
