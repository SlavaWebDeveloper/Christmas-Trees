const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const newer = require('gulp-newer');
const browsersync = require('browser-sync').create();
const del = require('del');

// Пути исходных файлов src и пути к результирующим файлам dest
const paths = {
  html: {
    src: ['src/*.html'],
    dest: 'docs/'
  },
  styles: {
    src: ['src/styles/**/*.scss'],
    dest: 'docs/styles/'
  },
  scripts: {
    src: ['src/**/**/*.js'],
    dest: 'docs/scripts/'
  },
  images: {
    src: 'src/**/*.{jpg,png,svg,gif,ico,webp,avif}',
    dest: 'docs/'
  },
  fonts: {
    src: 'src/fonts/**',
    dest: 'docs/fonts/'
  }
}

/**
 * Очищает каталог docs, удаляя все файлы кроме изображений
 */
function clean() {
  return del(['docs/*', '!docs/img', '!docs/fonts'])
}

/**
 * Обработка HTML
 */
function html() {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size({
      showFiles:true
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browsersync.stream())
}

/**
 * Обработка препроцессоров стилей
 */
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename({
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(size({
      showFiles:true
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream())
}

/**
 * Обработка Java Script файлов
 */
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(size({
      showFiles:true
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream())
}

/**
 * Сжатие изображений
 */
function img() {
  return gulp.src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(size({
      showFiles:true
    }))
    .pipe(gulp.dest(paths.images.dest))
}

/**
 * Переносит шрифты в продакшен
 */
function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(newer(paths.fonts.dest))
    .pipe(gulp.dest(paths.fonts.dest));
}

/**
 * Отслеживание изменений в файлах и запуск лайв сервера
 */
function watch() {
  browsersync.init({
    server: {
        baseDir: "./docs"
    }
  })
  gulp.watch(paths.html.dest).on('change', browsersync.reload)
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.fonts.src, fonts)
  gulp.watch(paths.images.src, img)
}

/**
 * Задачи для ручного запуска с помощью gulp clean, gulp html и т.д.
 */
exports.clean = clean
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.img = img
exports.fonts = fonts
exports.watch = watch

/**
 * Задача, которая выполняется по команде gulp
 */
exports.default = gulp.series(clean, html, gulp.parallel(styles, scripts, img, fonts), watch)
