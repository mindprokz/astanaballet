'use strict'

// все что относиться к самому галпу
const gulp = require('gulp');
const rename = require('gulp-rename');

// все что относиться к html
const pug = require('gulp-pug2');

// все что относиться к css
const minifyCss = require('gulp-minify-css');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Все что относиться к js
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const jshint = require('gulp-jshint');

// Все что относиться к изображениям
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

// Браузер синк и модуль для копирования директорий
const bs = require("browser-sync").create();
const ncp = require('ncp').ncp;

// Переменная окружения заданная по умолчанию
//NODE_ENV='{"build": "build", "lang": "ru"}' -> example for run

let prc = JSON.parse(process.env.NODE_ENV);
let env = prc.build === 'build' ? 'build' : 'develop';

// Если это разработка запустить сервер
gulp.task('server', () => {
  // Если переменная окружения задана, то делаем сборку под продакшн
  // if (env === 'develop') {
  //   bs.init({
  //     server : `./_compile/${env}/`,
  //     //proxy: 'localhost'
  //   })
  // }

  return;
});

// Настройки для вебпака
let webpackOptions = {
  entry: {
		a:  './_sources/js/main.js',
  },

  module: {

    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015'
    }]
  },
}

// Конструктор для создания пути для исходных файлов и скомпилированных файлов
class CreatePath {
  constructor (from, to) {
    this.from = __dirname +  from;
    this.to = to === undefined ? __dirname + `/_compile/${env}/` :  __dirname + to;
  }
}

// Пути для всех основных файлов
let jsPath = new CreatePath('/_sources/js/main.js', `/_compile/${env}/js/`);
let libsPath = new CreatePath('/_extra/libs');
let scssPath = new CreatePath('/_sources/scss/*.scss',`/_compile/${env}/css/`);
let jadePath = new CreatePath('/_sources/jade/*.pug');
let imagesPath = new CreatePath('/_sources/image/imageFromProd/**/*', `/_compile/${env}/images/`);

// опции для синтаксиса js
let optionForJshint = {
  // these directives can
  // be found in the official
  // JSLint documentation.
  evil: true,
  curly : true,
  eqeqeq : true,
  newcap : true,
  plusplus : false,
  browser : true,
  esnext: true,
  // you can also set global
  // declarations for all source
  // files like so:
  predef: ['$'],
  // both ways will achieve the
  // same result; predef will be
  // given priority because it is
  // promoted by JSLint
}


// task для компиляции jade шаблонов
gulp.task('jade', () => {
  gulp.src(jadePath.from)
  .pipe(pug({ pretty: true }))
  .pipe(rename(function (path) {
    path.extname = ".php"
  }))
  .pipe(gulp.dest(jadePath.to));

  bs.reload();
});


// @TODO поискать css lint
// task для компиляции scss стилей
gulp.task('scss', () => {
  let _files = gulp.src(scssPath.from);

  if (process.env.NODE_ENV !== 'build') {
    _files.pipe(sass().on('error', sass.logError))
    .pipe(rename(function (path) {
      path.extname = ".css"
    }))
    .pipe(gulp.dest(scssPath.to))
    .pipe(gulp.dest('/Users/merrick/Desktop/Server/wp-content/themes/AstanaBalletTheme/css'));

    bs.reload();
  } else {
    _files.pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 10 version'))
    .pipe(minifyCss())
    .pipe(rename(function (path) {
      path.extname = ".css"
    }))
    .pipe(gulp.dest(scssPath.to));
  }
});



gulp.task('images', () => {
  gulp.src(imagesPath.from)
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest(imagesPath.to))
  .pipe(gulp.dest('/Users/merrick/Desktop/Server/wp-content/themes/AstanaBalletTheme/images'));
});



// task for JS
gulp.task('js', () => {
  let _files = gulp.src(jsPath.from);

  if (process.env.NODE_ENV !== 'build') {
    _files.pipe(jshint(optionForJshint))
    .pipe(jshint.reporter('default'))
    .pipe(webpackStream(webpackOptions))
    .pipe(rename(function (path) {
	    path.basename = "main";
      path.extname = ".js";
    }))
    .pipe(gulp.dest(jsPath.to))
    .pipe(gulp.dest('/Users/merrick/Desktop/Server/wp-content/themes/AstanaBalletTheme/js'));

    bs.reload();
  } else {
    _files.pipe(jshint(optionForJshint))
    .pipe(jshint.reporter('default'))
    .pipe(webpackStream(webpackOptions))
    .pipe(uglify())
    .pipe(rename(function (path) {
	    path.basename = "main";
      path.extname = ".js";
    }))
    .pipe(gulp.dest(jsPath.to));

  }
});




// @TODO оставлять только нужные файлы через плагин bower
// Таск для переноса библиотек в готовую сборку
gulp.task('libsCompile', () => {
  ncp(libsPath.from, libsPath.to, function (err) {
    if (err) {
      return console.error(err);
    }
  });
  ncp(libsPath.from, '/Users/merrick/Desktop/Server/wp-content/themes/AstanaBalletTheme/', function (err) {
    if (err) {
      return console.error(err);
    }
  });
});



//taks for watch change files
gulp.task('watch', () => {

  // Ватчеры для .jade файлов
	gulp.watch(jadePath.from, ['jade']);
  gulp.watch(__dirname + '/_sources/jade/sections/*.jade', ['jade']);

  // Ватчеры для .scss файлов
  gulp.watch(scssPath.from, ['scss']);
  gulp.watch(__dirname + '/_sources/scss/sections/*.scss', ['scss']);

  // Ватчер для .js файлов
  gulp.watch(__dirname + '/_sources/js/main.js', ['js']);

});

// default task
if (env === 'develop') {
  gulp.task('default', ['jade', 'scss', 'js', 'server', 'watch' ]);
} else {
  gulp.task('default', ['jade', 'scss', 'js', 'images', 'libsCompile']);
}
