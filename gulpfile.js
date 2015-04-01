"use strict";

var gulp = require('gulp');
var debug = require('gulp-debug');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var rev = require('gulp-rev');
var useref= require('gulp-useref');
var del = require('del');

//gulp.task('concat', function(){
//    
//});

//gulp.task('js-hint', function(){
//    gulp.src('.js/*.js')
//        .pipe()
//});

gulp.task('watch', function () {
    gulp.watch('js/*.js', ['jshint']);
    gulp.watch('', []);
});

gulp.task('browser-sync', function () {
    var files = ["index.html",
        "css/index.css",
        "js/*.js"
    ];

    browserSync.init(files, {
        server: {
            baseDir: '.'
        }
    });
});

gulp.task('build-css', function () {

    gulp.src([
        'vendor/mustache/mustache.min.js',
        'js/app.js'
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint-js', function () {

    gulp.src([
        'js/app.js'
    ])
    .pipe(rev())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function () {

    gulp.src([
        'src/js/app.js'
    ])
    .pipe(debug({title: "beforeRev"}))
    .pipe(rev())
    .pipe(debug({title: "AfterRev"}))
    .pipe(gulp.dest('dist'));
});

gulp.task('useref', ['clean:dist'], function () {
    var assets = useref.assets();
    
    return gulp.src('src/index.html')
        .pipe(debug({title: "before assets"}))
        .pipe(assets)
        .pipe(debug({title: "before assets restore"}))
        .pipe(assets.restore())
        .pipe(debug({title: "before useref"}))
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function(cb){
  del([
    'dist/index.html',
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'dist/**',
    // we don't want to clean this file though so we negate the pattern
    '!dist/deploy.json'
  ], cb);
});

gulp.task('default', ['build']);