import './ajax.confirm'
import ajaxLoading from './ajax.loading'
import './ajax.target'
import ajaxTable from './table'
import tablePager from './table.pager'
import dialogForm from './ajax.dialog.form';

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
    ajaxForm.onload();
    tablePager.onload();
    ajaxTable.onload();
    ajax.onload();
    ajaxLoading.onload();
    dialogForm.onload()

  },
  event: (elm) => {
    ajaxTable.event(elm);
    tablePager.event(elm);
    ajaxForm.event(elm);
    ajax.event(elm);
    ajaxLoading.event(elm);

  }
}
