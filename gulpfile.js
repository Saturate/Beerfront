'use strict';


var buildDir = 'build';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('jshint', function () {
  return gulp.src('source/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', function () {
  return gulp.src('source/styles/main.scss')
    .pipe($.plumber())
    //.pipe($.sourcemaps.init())
	    .pipe($.sass({
	    	precision: 10
	    }))
    //.pipe($.sourcemaps.write())
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('connect', function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var source = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('source'))
    .use(serveStatic('.tmp'))
    // paths to bower_components should be relative to the current file
    // e.g. in source/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('source'));

  require('http').createServer(source)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect'], function () {
  require('opn')('http://localhost:9000');
});

gulp.task('watch', ['connect', 'serve'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'source/*.html',
    '.tmp/styles/**/*.css',
    'source/scripts/**/*.js',
    'source/images/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch('source/styles/**/*.scss', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  gulp.src('source/styles/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('source/styles'));
  gulp.src('source/*.html')
    .pipe(wiredep({exclude: ['bootstrap-sass-official']}))
    .pipe(gulp.dest('source'));
});

gulp.task('html', ['styles'], function () {
  var lazypipe = require('lazypipe');
  var cssChannel = lazypipe()
    .pipe($.csso)
    .pipe($.replace, 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap','fonts');
  var assets = $.useref.assets({searchPath: '{.tmp,source}'});

  return gulp.src('source/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', cssChannel()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(buildDir));
});

gulp.task('images', function () {
  return gulp.src('source/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('build/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest(buildDir));
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src(buildDir + '/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'build']));

gulp.task('default', ['clean'], function() {
	console.log('Awesome? Not yet but soon...');
	gulp.start('build');
});