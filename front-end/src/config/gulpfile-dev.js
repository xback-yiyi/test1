const { src,dest , watch , series, parallel } = require('gulp');
const path = require('path');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const proxy=require('http-proxy-middleware')

const devPath = '../../dev'

// copyHTML
function copyHTML(){
    return src('../*.html')
    .pipe( dest(devPath) )
    .pipe( connect.reload() )
}

// copyLibs
function copyLibs(){
    return src('../libs/**/*')
    .pipe( dest(`${devPath}/libs`) )
    .pipe( connect.reload() )
}

// copyassets
function copyassets(){
    return src('../assets/**/*')
    .pipe( dest(`${devPath}/assets`) )
    .pipe( connect.reload() )
}

// 模块化JS
function packJS(){
    return src('../scripts/app.js')
    .pipe( webpack({
        mode : 'development',
        entry : '../scripts/app.js',
        output : {
            path : path.resolve(__dirname , devPath),
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
    .pipe( dest(`${devPath}/scripts`) )
    .pipe( connect.reload() )
}


// 编译scss
function packScss(){
    return src('../styles/*.scss')
    .pipe( sass().on('error', sass.logError ))
    .pipe( dest(`${devPath}/styles`) )
    .pipe( connect.reload() )
}


// 服务器

function myServer(){
    return connect.server({
        name : 'Dist App',
        root : devPath,
        port : 8000,
        livereload : true,
        // host:'10.9.49.199',
        middleware:() => {
            return [
                proxy('/api',{
                    target:'http://localhost:3000',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/ajax':''
                    }
                })
            ]
        }
    })
}

// watch
function watchFiles(){
    watch('../*.html', series(copyHTML))
    watch('../libs/*', series(copyLibs))
    watch('../**/*', series(packJS))
    watch('../**/*.scss', series(packScss))
    watch('../assets/*',series(copyassets))
}
exports.default = series(parallel(copyHTML,copyLibs,copyassets,packJS,packScss),parallel(myServer,watchFiles))