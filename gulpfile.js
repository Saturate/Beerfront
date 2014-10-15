'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('jshint', function () {
  return gulp.src('source/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

var wiredep = require('wiredep').stream;

gulp.task('default', ['jshint'], function() {
	console.log('Awesome? Not yet but soon...');

	// Just copy files for now
	return gulp.src('source/**')
		.pipe(wiredep())
		.pipe(gulp.dest('build'));
});