var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var rename = require('gulp-rename');


gulp.task('js', function () {
    return gulp.src([
        './node-modules/tether/dist/js/tether.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(rename('modules.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('sass', function () {
    return gulp.src([,
        './public/css/main.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('default', ['js', 'sass']);