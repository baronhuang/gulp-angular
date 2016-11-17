'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var spritesmith = require('gulp.spritesmith');

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

    gulp.watch([
        path.join(conf.paths.src, '/images/slice/*.png'),
    ], function(event) {
        gulp.start('sprite');
    });

});

/*编译less*/
gulp.task('less', function () {
  gulp.watch([
    path.join(conf.paths.src, '/**/*.less'),
  ], function(event) {
    return gulp.src([path.join(conf.paths.src, '/less/main.less')])
      .pipe($.less()).on('error', conf.errorHandler('Less'))
      .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
      .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/css/')));
  });
});

/*自动化sprite*/
gulp.task('sprite', function () {
  var spriteData = gulp.src(conf.paths.src + '/images/slice/*.png').pipe(spritesmith({
          imgName: 'sprite.png',
          imgPath: '../images/sprite.png?t=' + new Date().getTime(),
          cssName: 'sprite.less',
          cssFormat: 'less',
          cssTemplate: './gulp/custom.template',
          lgorithm: 'binary-tree',
        }))
      // .pipe(gulp.dest('path/to/output/'));

  spriteData.img
      .pipe(buffer())
      .pipe($.imagemin())
      .pipe(gulp.dest(path.join(conf.paths.src, '/images/'))); // output path for the sprite
  spriteData.css.pipe(gulp.dest(path.join(conf.paths.src, '/less/'))); // output path for the CSS
});
