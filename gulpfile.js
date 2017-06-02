var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var bs = require("browser-sync");
var browserSync = bs.create();
const reload = browserSync.reload;
var del = require('del');
const runSequence = require('run-sequence');
var dev = true;

// css前缀处理配置
var AutoRreFixerParams = {
  browsers: [
    'last 2 versions',
    'iOS >= 7',
    'Android >= 4'],
  cascade: false
};

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('styles', function () {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AutoRreFixerParams))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.if(dev, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(gulp.dest('app/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('html', ['styles', 'scripts'], function () {
  return gulp.src('app/index.html')
    .pipe($.inlineSource())
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
  return new Promise(function (resolve) {
    dev = false;
    runSequence(['clean'], 'build', resolve);
  });
});

gulp.task('build', ['html'], function () {
  return gulp.src('dist/index.html').pipe($.inlineSource()).pipe($.size({title: 'dist/index.html', gzip: true}));
});


gulp.task('serve', function () {
  runSequence(['clean'], ['styles', 'scripts'], function () {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {}
      }
    });

    gulp.watch([
      'app/*.html',
    ]).on('change', reload);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
  });
});

gulp.task('serve:dist', ['default'], function () {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});