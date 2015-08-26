/**
 * Created by braunreu on 27.06.15.
 */
'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var config = {
    sourceFiles: ['./lib/**/*.js', './app.js'],
    testFiles: './test/**/*.spec.js'
};

gulp.task('lint', function () {
    return gulp.src(config.sourceFiles)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('js-doc', plugins.shell.task([
    'node ./node_modules/jsdoc/jsdoc ./lib/**/*.js -d docs'
]));

gulp.task('mocha', function () {
    return gulp.src(config.sourceFiles)
        .pipe(plugins.istanbul({includeUntested: true}))
        .on('finish', function () {
            gulp.src(config.testFiles)
                .pipe(plugins.mocha({reporter: 'spec'}))
                .on('error', function (error) {
                    console.log(error);
                })
                .pipe(plugins.istanbul.writeReports({
                    dir: './code-coverage',
                    reporters: ['lcov', 'html'],
                    reportOpts: {dir: './code-coverage'}
                }));
        });
});

gulp.task('test', ['lint', 'mocha']);

gulp.task('default', ['lint', 'mocha', 'js-doc'], function () {
    gulp.watch(config.sourceFiles, ['lint', 'mocha', 'js-doc']);
});

