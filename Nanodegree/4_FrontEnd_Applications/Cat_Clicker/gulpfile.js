var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');

gulp.task('default', function(done) {
	gulp.watch('sass/**/*.scss', gulp.series('styles'));
	done();
});

gulp.task('styles', function(done) {
	gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.reload({
			stream: true
		}));
	done();
});

browserSync.init({
	server: './'
});
browserSync.stream();