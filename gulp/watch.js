'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

function isOnlyChange(event) {
  return event.type === 'changed';
}

/*监听less的变化，会hot-replace对应的css，不知道为什么js不能hot-replace*/
gulp.task('styles-reload',  function() {
  return gulp.src([path.join(conf.paths.src, '/less/main.less')])
      .pipe($.less()).on('error', conf.errorHandler('Less'))
      .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
      .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/css/')))
      .pipe(browserSync.stream());
});

/*监听文件变化，刷新浏览器*/
gulp.task('watch', function () {

  gulp.watch([
    path.join(conf.paths.src, '/**/*.js'),
    path.join(conf.paths.src, '/**/*.html')
  ], function(event) {
    browserSync.reload(event.path);
  });

  gulp.watch([
    path.join(conf.paths.src, '/**/*.less'),
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles-reload');
    } else {
      browserSync.reload(event.path);
    }
  });

});

gulp.task('less', function () {
  gulp.watch([
    path.join(conf.paths.src, '/**/*.less'),
  ], function(event) {
    return gulp.src([path.join(conf.paths.src, '/less/main.less')])
      .pipe($.less()).on('error', conf.errorHandler('Less'))
      .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
      .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/css/')));
  });
})
