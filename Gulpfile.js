'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    refresh = require('gulp-livereload');

var liveReloadPort = 35729;

gulp.task('dev', [
    'views',
    'styles',
    'core-js',
    'tasty-js'
], function() {});

gulp.task('views', function() {
    gulp.src('app/index.html')
    .pipe(gulp.dest('dist'));
    gulp.src('app/**/*.html', {base: 'app'})
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    gulp.src('app/styles/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefix())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('core-js', function() {
    gulp.src([
        'lib/angular/angular.js',
        'lib/angular-route/angular-route.js'
    ])
    .pipe(concat('core.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('tasty-js', function() {
    gulp.src(['app/app.js', 'app/**/*.js'])
    .pipe(concat('tasty.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    refresh.listen(liveReloadPort);

    gulp.watch(['app/**/*.js'], ['tasty-js']);
    gulp.watch(['app/styles/**/*.sass'], ['styles']);
    gulp.watch(['app/**/*.html'], ['views']);
    gulp.watch('dist/**').on('change', refresh.changed);
});

gulp.task('default', ['watch']);
