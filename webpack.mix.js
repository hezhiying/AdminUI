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
  mix.less('src/less/app.less', 'build');
  mix.js('src/app.js', 'build');
} else {

}
mix.less('src/less/app.less', '.');
mix.js('src/app.js', '.');