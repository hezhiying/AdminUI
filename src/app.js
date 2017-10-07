import './i18n/en';
import 'requirejc'
import './notebook/app';
import './notebook/app.plugin';
import {adminUI} from './components/admin-ui';
import './components/modernizr';
import {getScriptArg} from './utils/helpers'

/**
 * 占位显示
 * IE上实现Html5中placeholder效果
 * @git https://github.com/mathiasbynens/jquery-placeholder
 * e.g. <input type="text" name="name" placeholder="e.g. John Doe">
 *   $("input").placeholder()
 */
import placeholder from './components/placeholder';

/**
 * 全屏显示插件
 *
 * @git https://github.com/sindresorhus/screenfull.js
 * e.g. <a href="#" class="navbar-brand" data-toggle="fullscreen"></a>
 */
import './components/screenfull';

/**
 * 在DIV上实现漂亮的滚动条
 * @git https://github.com/rochal/jQuery-slimScroll
 * @e.g. <div class="slim-scroll"></div>
 * data-height="auto" 滚动区域高度 default:none
 * data-width="auto"  滚动区域宽度 default:250px
 * data-size="5px"    滚动条大小(宽度) default:7px
 * data-disable-fade-out="true" true:鼠标在滚动区域内滚动条不消失 false:一段时间滚动条自动隐藏消失  default:false
 * data-distance="0"  滚动条边距 default:1px
 * data-color="#333333" 滚动条颜色 default: #000000
 * data-wheel-step    滚动条每次滚动距离 Default: 20
 *
 */
import slimscroll from './components/slim-scroll';

/**
 * notify右侧通知功能
 * https://github.com/mouse0270/bootstrap-notify
 * @e.g.
 * $.notifyS(msg, title, url) | notifyI notifyW notifyD
 */
import notify from './components/notify';

/**
 * jquery-confirm 模态提示框
 * https://craftpip.github.io/jquery-confirm/
 * @e.g.
 * $.alert(content, title), $.confirm(), $.dialog()
 * $.alert({})
 */
import dialog from './components/dialog';

/**
 * tooltip文字提示插件
 * https://github.com/krzysu/flot.tooltip
 * http://www.flotcharts.org/
 */
import Tooltip from './components/tooltip';

import landing from './components/landing';
import ajax from './components/ajax';
import form from './components/form';
import loadingBar from './components/loading-bar';


import {ToggleClass,TogglePanel} from './components/toggle';
import daterangepicker from './components/date-range-picker';

/**
 * @var ../js/requirejc.js RequireJC
 */
RequireJC.config({
	baseUrl: getScriptArg('baseUrl') || '/',
	debug  : true
});

let components = {
	Tooltip, slimscroll,landing,ajax,form,loadingBar,placeholder, ToggleClass,TogglePanel,daterangepicker
};

$(function () {
	//安装组件
	adminUI.install(components);
	//监听UI事件
	adminUI.addListener(components);

	$.adminUI.initElement($("body"));
});
