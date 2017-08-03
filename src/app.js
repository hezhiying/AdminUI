import './i18n/en';
import {adminUI} from './components/admin-ui';

import './notebook/app';
import './notebook/app.plugin';
import './components/modernizr';
import {getScriptArg} from './utils/helpers'
import Tooltip from './components/tooltip';
import screenfull from './components/screenfull';
import slimscroll from './components/slim-scroll';
import landing from './components/landing';
import ajax from './components/ajax';
import form from './components/form';
import loadingBar from './components/loading-bar';
import placeholder from './components/placeholder';

/**
 * @var ../js/requirejc.js RequireJC
 */
RequireJC.config({
	baseUrl: getScriptArg('baseUrl') || '/',
	debug  : true
});
let components = {
	Tooltip,screenfull,slimscroll,landing,ajax,form,loadingBar,placeholder
};

$(function () {
	//安装组件
	adminUI.install(components);
	//监听UI事件
	adminUI.addListener(components);

});
