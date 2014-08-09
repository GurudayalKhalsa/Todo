var gulp = require('gulp'),
    transform = require('vinyl-transform'),
    browserify = require('gulp-browserify'),
    exorcist = require('exorcist'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    react = require('gulp-react'),
    clean = require('gulp-clean');

var paths = {
  jsxSrcAll: './src/js/views/*.jsx',
  views: 'views',
  srcDir: './src/js/',
  src: './src/js/app.js',
  jsSrcAll: './src/js/**.js',
  srcAll: ['./src/js/*.js', './src/js/*/*.js', '!./src/js/views/**.js', './src/js/*/*.jsx'],
  destDir: './js/',
  destName: 'build.js',
  destNameMin: 'build.min.js',
  destNameSourceMap: 'build.map.js'
};

gulp.task('jsx', function(){
  return gulp.src(paths.jsxSrcAll)
      .pipe(react())
      .pipe(gulp.dest(paths.srcDir+paths.views));
});

// gulp.task('lint', function(){
//   return gulp.src(paths.jsSrcAll)
//       .pipe(jshint())
//       .pipe(jshint.reporter('jshint-stylish'))
//       .pipe(jshint.reporter('fail'));
// });

gulp.task('browserify', ['jsx'], function() {

  return gulp.src(paths.src)
      .pipe(browserify({ debug: true }))
      .pipe(transform(function () { return exorcist(paths.destDir+paths.destNameSourceMap); }))
      // .pipe(concat(paths.destName))
      .pipe(rename(paths.destName))
      .pipe(gulp.dest(paths.destDir));
});

gulp.task('minify', ['browserify'], function(){
  return gulp.src(paths.destDir+paths.destName)
      .pipe(rename(paths.destNameMin))
      .pipe(uglify())
      .pipe(gulp.dest(paths.destDir));
});

//removes .js views files
gulp.task('clean', ['minify'], function(){
  return gulp.src(paths.srcDir+paths.views+"/*.js", {read: false})
      .pipe(clean());
});

gulp.task('watch', ['clean'], function() {
  gulp.watch([paths.srcAll, ], ['default']);
});


gulp.task('default', ['jsx', 'browserify', 'minify', 'clean', 'watch']);
