var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var clean = require('gulp-clean');
var historyAPIFallback = require('connect-history-api-fallback');
var args = require('yargs').argv;
var env = args.env;

console.log('Environment -->', env);

// variables
var parentPath = 'app/**/**/*';
var cssCollection = parentPath + '.scss';
var jsCollection = [
  'app/app.js',
  'app/config/' + env + '.js',
  'app/constants/*.js',
  'app/common/**/*.js',
  'app/components/**/*.js'
];
var htmlCollection = parentPath + '.html';
// var indexPath = './index/index.' + env + '.html';

// VendorJSdependencies
var vendorJSDependencies = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/angular/angular.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/angular-ui-router/release/angular-ui-router.min.js',
  'node_modules/angular-sanitize/angular-sanitize.min.js',
  'node_modules/ngstorage/ngStorage.min.js',
  'node_modules/angularjs-slider/dist/rzslider.min.js',
  'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
  'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
  'node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js',
  'node_modules/ui-select/dist/select.min.js',
  'node_modules/angular-jwt/dist/angular-jwt.min.js',
  'node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js'
];

// VendorCssDependencies
var vendorCSSDependencies = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
  'node_modules/ui-select/dist/select.min.css'
];

// gulp.task('index', function () {
//   console.log("Picking index from ", indexPath);
//   gulp.src(indexPath)
//     .pipe(concat('index.html'))
//     .pipe(gulp.dest('dist'));
// });

//task to compile, concat, cleanSCSS
gulp.task('sass', function () {
  gulp.src(cssCollection)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    // .pipe(cleanCSS())
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('dist/bundle'));
});

gulp.task('scripts', function () {
  gulp.src(jsCollection)
    .pipe(concat('app.js'))
    // .pipe(uglify())
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('dist/bundle'));
});

gulp.task('build-vendor-js', function () {
  gulp.src(vendorJSDependencies)
    .pipe(concat('vendor.js'))
    // .pipe(uglify())
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('dist/bundle'));
});

gulp.task('build-vendor-css', function () {
  gulp.src(vendorCSSDependencies)
    .pipe(concat('vendor.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/bundle'));
});

gulp.task('html', function () {
  gulp.src(htmlCollection)
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function () {
  gulp.src('app/assets/images/**/*.+(png|jpg|gif|svg|ico)')
    // .pipe(cache(imagemin({
    //   interlaced: true
    // })))
    .pipe(gulp.dest('dist/assets/images'))
});

gulp.task('fonts', function () {
  gulp.src('app/assets/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'))
});

//browsersync config for live reload and gulp server
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'dist',
      middleware: [historyAPIFallback()]
    },
  });
});

gulp.task('clean-dist', function () {
  gulp.src('dist', {
      read: false
    })
    .pipe(clean());
});

gulp.task('build', function () {
  runSequence('sass', 'scripts', 'html', 'images', 'fonts', 'build-vendor-js', 'build-vendor-css');
});

gulp.task('build-dev', function () {
  runSequence('sass', 'scripts', 'html', 'images', 'fonts', 'build-vendor-js', 'build-vendor-css', 'browserSync');
});

//task to watch dev changes, run this task to start the app
gulp.task('dev', ['build-dev'], function () {
  gulp.watch(cssCollection, ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch(htmlCollection, ['html']);
  gulp.watch(jsCollection, ['scripts']);
  console.log("Development Running...");
});

// run this task in prod environment
gulp.task('prod', ['build'], function () {
  console.log("Build Successfull...");
});
