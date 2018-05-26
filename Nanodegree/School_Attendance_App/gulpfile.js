var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('default', ['styles', 'copy-img', 'script', 'copy-html'], function() {
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('images/*', ['copy-img']);
	gulp.watch(['js/*', '!js/app.js'], ['script']);
	gulp.watch('./*.html', ['copy-html']);
	browserSync.init({
		server: './dist'
	});
});

gulp.task('styles', function() {
	gulp.src('sass/**/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('copy-html', function() {
	gulp.src('./index.html')
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());
});

gulp.task('copy-img', function() {
	gulp.src('./images/*')
		.pipe(gulp.dest('dist/images'));
});

gulp.task('script', function() {
	gulp.src(['js/model.js', 'js/engine.js', 'js/controller.js', 'js/view.js'])
		.pipe(concat('./app.js'))
		.pipe(gulp.dest('./js'))
		.pipe(babel({
			presets: ['env']
			}))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});