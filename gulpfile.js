'use strict';

var gulp = require('gulp');

gulp.task('default', function() {
	console.log('Awesome? Not yet but soon...');

	// Just copy files for now
	return gulp.src('source/**')
		.pipe(gulp.dest('build'));
});