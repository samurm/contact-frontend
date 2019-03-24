const gulp = require("gulp");
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

gulp.task('copyHtml', function(){
  gulp.src('src/*.html').pipe(gulp.dest('dist/src'))
  .pipe(browserSync.stream());
});

gulp.task('imageMin', () => 
gulp.src('src/assets/img/*').pipe(imagemin())
.pipe(gulp.dest('dist/src/assets/img'))
.pipe(browserSync.stream()));

gulp.task('minify-css', () => {
  return gulp.src('src/assets/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/src/assets/styles'))
    .pipe(browserSync.stream());
});

gulp.task('minifyJs', () =>
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/src'))
        .pipe(browserSync.stream())
);

gulp.task('serve', ['minifyJs', 'imageMin', 'minify-css', 'copyHtml'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist/src/"
        }
    });

    gulp.watch('src/**/*.js', ['minifyJs']);
    gulp.watch('src/assets/img/*', ['imageMin']);
    gulp.watch('src/assets/styles/*.css', ['minify-css']);
    gulp.watch('src/*.html', ['copyHtml']);
});

gulp.task('default', ['serve']);