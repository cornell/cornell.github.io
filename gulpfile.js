var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');

gulp.task('concat', function(){
});

gulp.tasj('js-hint', function(){
    gulp.src('.js/*.js')
        .pipe()
});

gulp.task('watch', function(){
    gulp.watch('js/*.js', ['jshint']);
    gulp.watch('', [])
})