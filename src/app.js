import './i18n/en';
import 'requirejc/src/main'
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
 * @e.g.
 * <a class="btn btn-danger" href="#" data-toggle="tooltip" data-placement="top" title="sssfsafsf">link button</a>
 * placement: top bottom right left
 */
import Tooltip from './components/tooltip';

/**
 * 使用appear插件，让元素在进入视野里添加动画效果
 * https://github.com/morr/jquery.appear/
 * @e.g.
 * <div data-ride="animated" data-animation="fadeInLeft" data-delay="900"></div>
 * 可用的动画效果 animated fadeIn fadeInUp fadeInDown fadeInLeft fadeInRight fadeInUpBig fadeInDownBig fadeInLeftBig fadeInRightBig fadeOut fadeOutUp fadeOutDown fadeOutLeft fadeOutRight fadeOutUpBig fadeOutDownBig fadeOutLeftBig fadeOutRightBig
 */
import landing from './components/landing';

/**
 * 显示loading bar加载效果
 * ajax加载时自动显示
 * @e.g.
 * $.adminUI.loadingBar.show(); //开始显示
 * $.adminUI.loadingBar.success();  //成功
 * $.adminUI.loadingBar.error(); //失败
 */
import loadingBar from './components/loading-bar';

/**
 * 日期范围选择控件
 * http://www.daterangepicker.com/
 * https://github.com/dangrossman/bootstrap-daterangepicker
 */
import daterangepicker from './components/date-range-picker';

/**
 * bootstrap-datepicker插件
 * bootstrap提供的一款日期选择组件
 * https://github.com/uxsolutions/bootstrap-datepicker
 * @e.g.
 * <input class="datepicker-input">
 * 范围选择 必须包含样式：input-daterange datepicker-input
 * <div class="input-daterange input-group datepicker-input">
 *   <input type="text" class="input-sm form-control" name="start" />
 *   <span class="input-group-addon">to</span>
 *   <input type="text" class="input-sm form-control" name="end" />
 * </div>
 */
import bootstrapDatepicker from './components/bootstrap-datepicker';

/**
 * chart-sparkline
 * 直接在浏览器生成迷你图表(sparkline)
 *
 * @git https://github.com/gwatts/jquery.sparkline
 * @home https://omnipotent.net/jquery.sparkline/#s-about
 * @e.g. <span class="sparkline" data-type="bar" data-height="35" data-bar-width="6" data-bar-spacing="2" data-bar-color="#ff0000">5,8,9,12,8,10,8,9,7,8,6</span>
 */
import chartSparkline from './components/chart/sparkline';

/**
 * easy-pie-chart
 * 轻量级的插件来呈现简单，动画和视网膜优化的饼图
 */
import easyPieChart from './components/chart/easy-pie-chart';

import ajax from './components/ajax';
import form from './components/form';


import {ToggleClass,TogglePanel} from './components/toggle';

/**
 * @var ../js/requirejc.js RequireJC
 */
RequireJC.config({
	baseUrl: getScriptArg('baseUrl') || '/',
	debug  : true
});

let components = {
	Tooltip, slimscroll,chartSparkline, easyPieChart, bootstrapDatepicker, landing,ajax,form,loadingBar,placeholder, ToggleClass,TogglePanel,daterangepicker
};

$(function () {
	//安装组件
	adminUI.install(components);
	//监听UI事件
	adminUI.addListener(components);

	$.adminUI.initElement($("body"));
});
