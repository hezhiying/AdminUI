import './jquery.placeholder.js'
/*!
 * jQuery Placeholder Plugin v2.3.1
 * https://github.com/mathiasbynens/jquery-placeholder
 *
 * Copyright 2011, 2015 Mathias Bynens
 * Released under the MIT license
 */
//占位文字插件
export default {
	onload:()=>{
		$('input[placeholder], textarea[placeholder]').placeholder();
	},
	event:(elm)=>{
		$(elm).find('input[placeholder], textarea[placeholder]').placeholder();
	}
}