"use strict";

var gulp = require('gulp');
var debug = require('gulp-debug');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var rev = require('gulp-rev');
var useref= require('gulp-useref');
var revReplace = require('gulp-rev-replace');
var del = require('del');
var filter = require('gulp-filter');
var csso = require('gulp-csso');

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

gulp.task('build', ['clean:dist'], function () {
        
    // Filtre sur les fichiers créés par useref !!
    var cssFilter = filter(['*.js', '*.css', '!index.html']);
    //var cssFilter = filter("*.css");    
    var assetFiles = useref.assets();
    debugger;
    return gulp.src('src/index.html')
        .pipe(assetFiles)           // Concatène js et css suivant les patterns décrits dans index.html
        .pipe(assetFiles.restore()) // Annule le filtre pour accéder à 'index.html'
        .pipe(useref())             // modifie le fichier index.html pour utiliser les css 'compilés'
        .pipe(cssFilter)            // filtre les css et js
        .pipe(rev())                // met un n° de révision sur les css et js
        .pipe(cssFilter.restore())  // Annule le filtre pour accéder à 'index.html'
        .pipe(revReplace())
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