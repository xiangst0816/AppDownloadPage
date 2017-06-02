var gulp = require('gulp')
var gulpLoadPlugins = require('gulp-load-plugins')
var $ = gulpLoadPlugins()
var bs = require('browser-sync')
var browserSync = bs.create()
var reload = browserSync.reload
var del = require('del')
var runSequence = require('run-sequence')

// css前缀处理配置
var AutoRreFixerParams = {
  browsers: [
    'last 2 versions',
    'iOS >= 7',
    'Android >= 4'],
  cascade: false
}

gulp.task('clean', del.bind(null, ['.tmp', 'dist']))

gulp.task('style', function () {
  return gulp.src('src/scss/*.scss')
  .pipe($.plumber())
  .pipe($.sass.sync({
    outputStyle: 'expanded',
    precision: 10,
    includePaths: ['.']
  }).on('error', $.sass.logError))
  .pipe($.autoprefixer(AutoRreFixerParams))
  .pipe(gulp.dest('.tmp/css'))
})

gulp.task('script', function () {
  return gulp.src('src/js/**/*.js')
  .pipe($.plumber())
  .pipe(gulp.dest('.tmp/js'))
})

gulp.task('other', function () {
  gulp.src('src/asset/**.*')
  .pipe($.plumber())
  .pipe(gulp.dest('.tmp/asset'))

  gulp.src('src/index.html')
  .pipe($.plumber())
  .pipe(gulp.dest('.tmp'))
})

gulp.task('default', function () {
  return new Promise(function (resolve) {
    runSequence(['clean'], 'build', resolve)
  })
})

gulp.task('build',  function () {
  runSequence(['style', 'script', 'other'], function () {
    gulp.src('.tmp/index.html')
    .pipe($.inlineSource())
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe($.size({title: 'dist/index.html', gzip: true}))
    .pipe(gulp.dest('dist'))
  })
})

gulp.task('serve', function () {
  runSequence(['clean'], ['style', 'script', 'other'], function () {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp']
      }
    })

    gulp.watch('src/scss/**/*.*', function () {
      runSequence('style', function () {
        reload()
      })
    })

    gulp.watch('src/js/**/*.*', function () {
      runSequence('script', function () {
        reload()
      })
    })

    gulp.watch(['src/asset/**/*.*', 'src/index.html'], function () {
      runSequence('other', function () {
        reload()
      })
    })
  })
})
