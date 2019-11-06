const { src,dest , watch , series, parallel } = require('gulp')
const path = require('path')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')
const cleanCSS=require('gulp-clean-css')
const rev=require('gulp-rev')
const revCollector=require('gulp-rev-collector')

const buildPath = '../../build'

// copyHTML
function copyHTML(){
    return src([`${buildPath}/rev/**/*.json`,'../*.html'])
    .pipe(revCollector())
    .pipe( dest(buildPath) )
}

// copyLibs
function copyLibs(){
    return src('../libs/**/*')
    .pipe( dest(`${buildPath}/libs`) )
}

// copyassets
function copyassets(){
    return src('../assets/**/*')
    .pipe( dest(`${buildPath}/assets`) )
}

// 模块化JS
function packJS(){
    return src('../scripts/app.js')
    .pipe( webpack({
        mode : 'production',
        entry : '../scripts/app.js',
        output : {
            path : path.resolve(__dirname , buildPath),
            filename : 'app.js'
        },
        module : {
            rules:[
                {
                    test : /\.html$/,
                    loader : 'string-loader'
                },
                {
                    test : /\.art$/,
                    loader : 'art-template-loader'
                }
            ]
        }
    }) )
    .pipe(rev())
    .pipe( dest(`${buildPath}/scripts`) )
    .pipe(rev.manifest())
    .pipe(dest(`${buildPath}/rev/scripts`))
}


// 编译scss
function packScss(){
    return src('../styles/*.scss')
    .pipe( sass().on('error', sass.logError ))
    .pipe(cleanCSS({compatibility:'ie8'}))
    .pipe(rev())
    .pipe( dest(`${buildPath}/styles`) )
    .pipe(rev.manifest({}))
    .pipe( dest(`${buildPath}/rev/styles`) )
}


exports.default = series(parallel(copyLibs,copyassets,packJS,packScss),copyHTML)