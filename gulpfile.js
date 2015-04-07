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
var gulpif = require('gulp-if');
var csso = require('gulp-csso');
var cssClean = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var override=require('gulp-rev-css-url');

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

gulp.task('build:js', function () {
  // set up the browserify instance on a task basis
  var b = browserify();
  // transform regular node stream to gulp (buffered vinyl) stream
  var browserified = transform(function(filename) {
    b.add(filename);
    return b.bundle();
  });

  return gulp.src('./src/js/main.js')
    .pipe(browserified)/*
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))*/
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'));
});

gulp.task('build:js2', function(){
    
return browserify('./src/js/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest({
            base: './dist2',
            merge:true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:css', ['clean:dist'], function () {
        
    // set up the browserify instance on a task basis
    var b = browserify();
    // transform regular node stream to gulp (buffered vinyl) stream
    var browserified = transform(function(filename) {
        b.add(filename);
        return b.bundle();
    });    
    
    // Filtre sur les fichiers créés par useref !!
    var jsAndcssFiles = filter(['*.js', '*.css', '!index.html']);
    var jsFiles = filter(['*.js']);
    var cssFiles = filter(['*.css']);
    var assetFiles = useref.assets();
    debugger;
    return gulp.src('src/index.html')
        .pipe(assetFiles)           // Concatène js et css suivant les patterns décrits dans index.html        
        .pipe(debug())
        .pipe(gulpif('*.css', cssClean()))            // filtre les css
        .pipe(assetFiles.restore()) // Annule le filtre pour accéder à 'index.html'        
//        .pipe(jsFiles())
//        .pipe(browserified)
//        .pipe(source('app.js'))
//        .pipe(buffer())
//        .pipe(jsFiles.restore())
        .pipe(jsAndcssFiles)
        .pipe(rev())               // met un n° de révision sur les css et js
        .pipe(jsAndcssFiles.restore())  // Annule le filtre pour accéder à 'index.html'
        .pipe(useref())             // modifie le fichier index.html pour utiliser les css 'compilés'
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});

gulp.task('build:css2',function () {
        
    var cssFiles = [
        './src/css/*.css'
    ];

    return gulp.src(cssFiles)
        .pipe(concat('app.css'))        
        .pipe(rev())               // met un n° de révision sur les css et js
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest({
            base: './dist2',
            merge:true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build2', ['build:js2','build:css2'], function(){
   
    var manifest = gulp.src("dist/rev-manifest.json");
    
    gulp.src('src/index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build:js', 'build:css'], function () {
        
    // Filtre sur les fichiers créés par useref !!
    var jsAndcssFiles = filter(['*.js', '*.css', '!index.html']);
    var jsFiles = filter(['*.js']);
    var assetFiles = useref.assets();
    return gulp.src('src/index.html')
        .pipe(assetFiles)           // Concatène js et css suivant les patterns décrits dans index.html        
        .pipe(debug())
        .pipe(gulpif('*.css', cssClean()))            // filtre les css
        .pipe(assetFiles.restore()) // Annule le filtre pour accéder à 'index.html'        
        .pipe(cssFiles)
        .pipe(rev())               // met un n° de révision sur les css et js
        .pipe(cssFiles.restore())  // Annule le filtre pour accéder à 'index.html'
        .pipe(useref())             // modifie le fichier index.html pour utiliser les css 'compilés'
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function(cb){
  del([
      'dist2',
    'dist/index.html',
    // here we use a globbing pattern to match everything inside the `mobile` folder
    'dist/**',
    // we don't want to clean this file though so we negate the pattern
    '!dist/deploy.json'
  ], cb);
});

gulp.task('default', ['build']);