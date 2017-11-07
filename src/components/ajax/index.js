import './ajax.confirm'
import './ajax.loading'
import './ajax.target'

/**
 * ajax核心模块
 * 提供以下事件
 * onAjaxBefore onAjaxBuild onAjaxSend onAjaxError onAjaxSuccess onAjaxDone
 */
import ajax from './ajax';

/**
 * 表单校验插件
 * https://jqueryvalidation.org/
 * https://github.com/jquery-validation/jquery-validation
 */
import ajaxForm from './form';

let config = $.extend({}, ajax.config, ajaxForm.config);

/**
 * ajax功能安装入口
 */
export default {
  config: config,
  onload: () => {
    ajax.onload();
    ajaxForm.onload();
  },
  event: (elm) => {
    ajax.event(elm);
    ajaxForm.event(elm);
  }
}