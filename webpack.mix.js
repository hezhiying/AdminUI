let mix = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 // */
//

/**
 * 不处理css中的URL
 */
mix.options({
	processCssUrls: false
});

/**
 * 全局库
 */
mix.webpackConfig({
	externals: {
		"jquery": "jQuery",
		"vue": "Vue"
	}
});

if (mix.config.production) {
	mix.copy('node_modules/font-awesome/fonts/*', 'fonts');
	//	mix.copy('node_modules/font-awesome/css/font-awesome.min.css', 'css/font-awesome.min.css');
	mix.copy('node_modules/bootstrap/dist/js/bootstrap.min.js', 'js/bootstrap/');
	mix.copy('node_modules/bootstrap/dist/css/bootstrap.min.css', 'js/bootstrap/');
//	mix.copy('node_modules/jquery/dist/jquery.min.js', 'js')
	//	mix.js('src/main.js', 'requirejc.min.js');
} else {
	//	mix.js('src/main.js', 'requirejc.js');
}
mix.less('src/less/app.less', 'css/');
mix.js('src/app.js', 'js').sourceMaps();
//mix.js('src/test.js', 'js/test.js');

//mix.styles(['src/less/css/animate.css','src/less/css/font.css'],'css/animate.css');
//mix.styles('src/less/css/font.css','css/font.css');
//mix.styles('src/less/css/landing.css','css/landing.css');
