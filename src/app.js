import './i18n/zh_cn';
import 'requirejc'
import './notebook/app';
import './notebook/app.plugin';
import {adminUI} from './components/admin-ui';
import './components/modernizr';
import {getScriptArg} from './utils/helpers'

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

import ajax from './components/ajax/ajax';

/**
 * 表单校验插件
 * https://jqueryvalidation.org/
 * https://github.com/jquery-validation/jquery-validation
 */
import form from './components/ajax/form';
// import larError from './components/vue/larave-error.vue'
/*$(function(){
  new Vue({el:'#app',components:{larError}, data: {
    errors: {
      "message": "Undefined variable: data",
      "exception": "ErrorException",
      "file": "/home/vagrant/code/tianciai/app/Http/Controllers/LoginController.php",
      "line": 12,
      "trace": [
        {
          "file": "/home/vagrant/code/tianciai/app/Http/Controllers/LoginController.php",
          "line": 12,
          "function": "handleError",
          "class": "Illuminate\\Foundation\\Bootstrap\\HandleExceptions",
          "type": "->"
        },
        {
          "function": "login",
          "class": "App\\Http\\Controllers\\LoginController",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Controller.php",
          "line": 54,
          "function": "call_user_func_array"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/ControllerDispatcher.php",
          "line": 45,
          "function": "callAction",
          "class": "Illuminate\\Routing\\Controller",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Route.php",
          "line": 212,
          "function": "dispatch",
          "class": "Illuminate\\Routing\\ControllerDispatcher",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Route.php",
          "line": 169,
          "function": "runController",
          "class": "Illuminate\\Routing\\Route",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Router.php",
          "line": 645,
          "function": "run",
          "class": "Illuminate\\Routing\\Route",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 30,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Router",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Middleware/SubstituteBindings.php",
          "line": 41,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 149,
          "function": "handle",
          "class": "Illuminate\\Routing\\Middleware\\SubstituteBindings",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 53,
          "function": "Illuminate\\Pipeline\\{closure}",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/VerifyCsrfToken.php",
          "line": 67,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 149,
          "function": "handle",
          "class": "Illuminate\\Foundation\\Http\\Middleware\\VerifyCsrfToken",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 53,
          "function": "Illuminate\\Pipeline\\{closure}",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/View/Middleware/ShareErrorsFromSession.php",
          "line": 49,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 149,
          "function": "handle",
          "class": "Illuminate\\View\\Middleware\\ShareErrorsFromSession",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 53,
          "function": "Illuminate\\Pipeline\\{closure}",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Session/Middleware/StartSession.php",
          "line": 63,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 149,
          "function": "handle",
          "class": "Illuminate\\Session\\Middleware\\StartSession",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 53,
          "function": "Illuminate\\Pipeline\\{closure}",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Cookie/Middleware/AddQueuedCookiesToResponse.php",
          "line": 37,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 149,
          "function": "handle",
          "class": "Illuminate\\Cookie\\Middleware\\AddQueuedCookiesToResponse",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 53,
          "function": "Illuminate\\Pipeline\\{closure}",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Cookie/Middleware/EncryptCookies.php",
          "line": 59,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 149,
          "function": "handle",
          "class": "Illuminate\\Cookie\\Middleware\\EncryptCookies",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 53,
          "function": "Illuminate\\Pipeline\\{closure}",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 102,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Router.php",
          "line": 647,
          "function": "then",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Router.php",
          "line": 622,
          "function": "runRouteWithinStack",
          "class": "Illuminate\\Routing\\Router",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Router.php",
          "line": 588,
          "function": "runRoute",
          "class": "Illuminate\\Routing\\Router",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Router.php",
          "line": 577,
          "function": "dispatchToRoute",
          "class": "Illuminate\\Routing\\Router",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php",
          "line": 176,
          "function": "dispatch",
          "class": "Illuminate\\Routing\\Router",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 30,
          "function": "Illuminate\\Foundation\\Http\\{closure}",
          "class": "Illuminate\\Foundation\\Http\\Kernel",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/fideloper/proxy/src/TrustProxies.php",
          "line": 56,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 149,
          "function": "handle",
          "class": "Fideloper\\Proxy\\TrustProxies",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 53,
          "function": "Illuminate\\Pipeline\\{closure}",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php",
          "line": 30,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 149,
          "function": "handle",
          "class": "Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 53,
          "function": "Illuminate\\Pipeline\\{closure}",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php",
          "line": 30,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 149,
          "function": "handle",
          "class": "Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 53,
          "function": "Illuminate\\Pipeline\\{closure}",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/ValidatePostSize.php",
          "line": 27,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 149,
          "function": "handle",
          "class": "Illuminate\\Foundation\\Http\\Middleware\\ValidatePostSize",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 53,
          "function": "Illuminate\\Pipeline\\{closure}",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/CheckForMaintenanceMode.php",
          "line": 46,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 149,
          "function": "handle",
          "class": "Illuminate\\Foundation\\Http\\Middleware\\CheckForMaintenanceMode",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php",
          "line": 53,
          "function": "Illuminate\\Pipeline\\{closure}",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php",
          "line": 102,
          "function": "Illuminate\\Routing\\{closure}",
          "class": "Illuminate\\Routing\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php",
          "line": 151,
          "function": "then",
          "class": "Illuminate\\Pipeline\\Pipeline",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php",
          "line": 116,
          "function": "sendRequestThroughRouter",
          "class": "Illuminate\\Foundation\\Http\\Kernel",
          "type": "->"
        },
        {
          "file": "/home/vagrant/code/tianciai/public/index.php",
          "line": 55,
          "function": "handle",
          "class": "Illuminate\\Foundation\\Http\\Kernel",
          "type": "->"
        }
      ]
    }
  }})
})*/
RequireJC.config({
	baseUrl: getScriptArg('baseUrl') || '/',
  paths:{
	  'vue': 'js/vue/vue.min.js'
  },
	debug  : true
});

let components = {
	slimscroll, landing, loadingBar, placeholder,
  //图表相关
  easyPieChart, flotChar, chartSparkline,
  //日期相关
  daterangepicker, bootstrapDatepicker,
  //data-toggle
  togglePopover, toggleTooltip, toggleClass, togglePanel,
	//ajax
  ajax,form,
};

$(function () {
	//安装组件
	adminUI.install(components);
	//监听UI事件
	adminUI.addListener(components);

	$.adminUI.initElement($("body"));
});
