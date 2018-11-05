//环境变量 dev开发环境 pro产品
var ENV = process.env.NODE_ENV;

var project = 'yw';
var hostName = '127.0.0.1';
var proxyUrl = 'http://115.159.189.146:8037';
var pathUrl = ENV === 'dev' ? `//kscdn.ksgame.com/static/${project}/pc/dist` : `/static/${project}/pc/dist`;

var gulp = require('gulp'),
    sass = require("gulp-sass"), // 编译sass
    babel = require('gulp-babel'),// es6转码
    uglify = require('gulp-uglify'), //压缩js
    concat = require('gulp-concat'), //合并js
    htmlMin = require('gulp-htmlmin'),   //压缩html
    imageMin = require('gulp-imagemin'),     //压缩图片
    cleanCss = require('gulp-clean-css'),    //压缩css
    cssVer = require('gulp-make-css-url-version'),   //css文件引用加版本号
    rev = require('gulp-rev-append'),    //页面引用添加版本号
    spritesmith = require('gulp.spritesmith'), //合并雪碧图
    fileinclude = require('gulp-file-include'), //导入html公共部分
    autoprefixer = require('gulp-autoprefixer'), //自动添加浏览器前缀
    plumber = require('gulp-plumber'),  //错误不终止watch
    notify = require('gulp-notify'),    //通知消息
    rename = require('gulp-rename'),    //重命名
    flatten = require('gulp-flatten'),  //移动文件
    connect = require('gulp-connect'),  //本地服务器 自动刷新
    proxy = require('http-proxy-middleware'),   //本地服务器代理
    runSequence = require('run-sequence'),    //同步执行gulp任务
    replace = require('gulp-replace'),  //替换路径
    del = require('del')    //删除文件


//删除dist下面的文件
del.sync(['dist'])

//编译sass
gulp.task('sass', () => {
    if (ENV === 'dev') {
        return gulp.src('src/style/main.scss')
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))   //错误不终止并给出提示
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ["last 5 versions"],
                cascade: false, //是否美化属性值 默认：true 像这样：
                //-webkit-transform: rotate(45deg);
                //        transform: rotate(45deg);
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(plumber.stop())   //返回管道后的默认行为
            .pipe(gulp.dest('dist/css'))
            .pipe(connect.reload())     //自动刷新
    } else if (ENV === 'pro') {
        return gulp.src('src/style/main.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ["last 5 versions"],
                cascade: false, //是否美化属性值 默认：true 像这样：
                //-webkit-transform: rotate(45deg);
                //        transform: rotate(45deg);
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(cssVer())     //css文件引用加版本号
            .pipe(cleanCss({  //压缩CSS
                advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie8',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*'    //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            .pipe(gulp.dest('dist/css'))
    }
});

//es
gulp.task('es', () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

//压缩JS
gulp.task('jsmin', () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))   //错误不终止并给出提示
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$', 'layer', 'laypage']}, //排除混淆关键字
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            //preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

//复制库文件
gulp.task('copyLib', () => {
    return gulp.src('src/lib/**/*')
        .pipe(gulp.dest('dist/lib'))
})

//压缩html
gulp.task('htmlMin', () => {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('dist/*.html')
        .pipe(htmlMin(options))
        .pipe(gulp.dest('dist'));
});


//页面引用添加版本号 ?rev=@hash
gulp.task('rev', () => {
    return gulp.src('dist/*.html')
        .pipe(rev())
        .pipe(gulp.dest('dist'))

});

//雪碧图 图片的名字为a.png 对应的类为.icon-a
gulp.task('spritesmith', () => {
    return gulp.src('src/img/sprite/*.*')
        .pipe(spritesmith({
            imgName: 'img/sprite.png',  //图片地址相对于 dest的地址
            cssName: 'style/_sprite.scss',   //保存合并后对于css样式的地址
            padding: 10,
            algorithm: 'binary-tree',
            cssTemplate: "src/style/handlebarsInheritance.scss.handlebars"
        }))
        .pipe(gulp.dest('src'))
        .pipe(connect.reload());
});

gulp.task('copyImg', () => {
    return gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(gulp.dest('dist/img'))
        .pipe(connect.reload());

});

gulp.task('copyVideo', () => {
    return gulp.src('src/video/*.*')
        .pipe(gulp.dest('dist/video'))
});

//导入html公共部分   @@include('include/meta.html')
gulp.task('fileinclude', () => {
    return gulp.src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('connect', () => {
    connect.server({
        host: hostName, //地址，可不写，不写的话，默认localhost
        port: 9001, //端口号，可不写，默认8000
        root: './', //当前项目主目录
        livereload: true, //自动刷新
        middleware(connect, opt) {
            return [
                proxy(`/${project}`,  {
                    target: proxyUrl,
                    changeOrigin:true,
                    pathRewrite: {
                        '^/yw': ''
                    }
                })
               /* proxy('/api', {
                    target: proxyUrl,
                    changeOrigin: true
                })*/
            ]
        }
    });
});

//移动文件
gulp.task('moveIndex', () => {
    return gulp.src('dist/index.html')
        .pipe(rename({extname: '.php'}))
        .pipe(gulp.dest(`../../../modules/${project}/views/site`));
});

gulp.task('moveFile', () => {
    return gulp.src('dist/*.html')
        .pipe(rename({extname: '.php'}))
        .pipe(gulp.dest(`../../../modules/${project}/views/news`));
});


//替换路径
gulp.task('replaceHtml', () => {
    return gulp.src('dist/*.html')
        .pipe(replace('../dist', pathUrl))
        .pipe(gulp.dest('dist'));
});

gulp.task('replaceJs', () => {
    return gulp.src('dist/js/*.js')
        .pipe(replace('../dist', pathUrl))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('replaceCss', () => {
    return gulp.src('dist/css/index.css')
        .pipe(replace('..', pathUrl))
        .pipe(gulp.dest('dist/css'));
});

//复制到cdn目录
gulp.task('copyCdnDir', () => {
    return gulp.src('dist/**')
        .pipe(gulp.dest(`../../static/${project}/pc/dist`))
});


gulp.task('watch', () => {
    gulp.watch('src/js/*.js', ['es']);
    gulp.watch('src/style/*.scss', ['sass']);
    gulp.watch('src/img/sprite/*.*', ['spritesmith']);
    gulp.watch('src/*.html', ['fileinclude']);
    gulp.watch('src/img/*.{png,jpg,gif}', ['copyImg']);

});


if (ENV === 'dev') {
    gulp.task('default', () => {
        runSequence('spritesmith', 'copyImg', 'copyVideo', ['sass', 'es', 'fileinclude', 'copyLib'], 'connect', 'watch')
    })
} else if (ENV === 'pro') {
    gulp.task('default', () => {
        runSequence('spritesmith', 'copyImg', 'copyVideo', ['sass', 'jsmin', 'fileinclude', 'copyLib'], 'rev', 'htmlMin', ['replaceHtml', 'replaceCss', 'replaceJs'], ['moveIndex', 'moveFile'], 'copyCdnDir');
    })
}


