import './i18n/index';
import 'requirejc'
import Utils from './utils/utils'
import './notebook/app';
import './notebook/app.plugin';
import {adminUI} from './components/admin-ui';
import './components/modernizr';
window.Utils = Utils; //工具方法暴露到全局
/**
 * blockUI
 * https://github.com/malsup/blockui
 * http://jquery.malsup.com/block/
 */
import plugin from './components/plugin';

/**
 * 扩展jquery string方法
 */
import './components/jquery.extend.string';
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
//import loadingBar from './components/loading-bar';

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

/**
 * flotChart
 * @git https://github.com/flot/flot
 * @home http://www.flotcharts.org/
 * @e.g
 * <div class="flotchart hide" style="height:240px"><div class="flot-data">这里放数据</div><div class="flot-options">这里放属性选项</div></div>
 * 样式名包含flotchart  必须设置一个高度
 */
import flotChar from './components/chart/flot';

/**
 * 弹出提示框
 * data-toggle=popover
 */
import togglePopover from './components/toggle/popover';
/**
 * 显示提示
 * data-toggle=tooltip
 */
import toggleTooltip from './components/toggle/tooltip';
/**
 * 切换样式
 * data-toggle=class:css1,css2  data-target="#id1,#id2"
 */
import toggleClass from './components/toggle/toggle-class';
/**
 * 切换显示隐藏面板
 */
import togglePanel from './components/toggle/toggle-panel';
/**
 * ajax模块入口
 * 提供以下事件
 * onAjaxBefore onAjaxBuild onAjaxSend onAjaxError onAjaxSuccess onAjaxDone
 * 包含 form提交 target显示 loading状态 confirm等模块
 */
import ajax from './components/ajax';
import formElm from './components/form';

RequireJC.config({
	baseUrl: Utils.getScriptArg('baseUrl') || '/',
	debug  : true
});

let components = {
	slimscroll, landing, placeholder, plugin,
  //图表相关
  easyPieChart, flotChar, chartSparkline,
  //日期相关
  // bootstrapDatepicker,
  //data-toggle
  togglePopover, toggleTooltip, toggleClass, togglePanel,
  //form element
  formElm,
	//ajax
  ajax,

};

$(function () {
	//安装组件
	adminUI.install(components);
	//监听UI事件
	adminUI.addListener(components);

	$.adminUI.initElement($("body"));
});
