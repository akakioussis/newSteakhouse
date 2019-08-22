const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//compile scss into css
function style() {
    //1. where is my scss file
    return gulp.src('./src/scss/**/*.scss')
        //2. pass that file through sass compiler
        .pipe(sass().on('error', sass.logError))
        //3. where do I save the compiled CSS
        .pipe(gulp.dest('./src/css'))
        //4. stream changes to all browser
        .pipe(browserSync.stream());
}

gulp.task('build', async function () {
    gulp.src('./src/css/*')
        .pipe(gulp.dest('./dist/css'));

    gulp.src('./src/assets/**')
        .pipe(gulp.dest('./dist/assets/'));

    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

function watch() {
    browserSync.init({
        server: {
            baseDir: './src/'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}


exports.style = style;
exports.watch = watch;