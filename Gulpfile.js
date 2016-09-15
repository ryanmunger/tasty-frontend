'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    refresh = require('gulp-livereload');

var liveReloadPort = 35729;

gulp.task('views', function() {
    gulp.src(['app/index.html', 'app/views/**/*.html'], { base: 'app' })
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    gulp.src('app/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefix())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('core-js', function() {
    gulp.src([
        'app/lib/angular/angular.js',
        'app/lib/angular-route/angular-route.js'
    ])
    .pipe(concat('core.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('tasty-js', function() {
    gulp.src(['app/app.js', 'app/views/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    refresh.listen(liveReloadPort);
    gulp.watch(['app/**/*.js'], ['tasty-js']);
    gulp.watch(['app/styles/**/*.scss'], ['styles']);
    gulp.watch(['app/**/*.html'], ['views']);
    gulp.watch('dist/**').on('change', refresh.changed);
});

gulp.task('default', ['watch']);
gulp.task('build', ['core-js', 'tasty-js', 'views', 'styles']);
