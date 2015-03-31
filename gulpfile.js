"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var rev = require('gulp-rev');

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
    .pipe(rev())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);