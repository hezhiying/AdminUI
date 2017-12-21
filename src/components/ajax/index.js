import utils from '../../utils/utils';
import './ajax.confirm'
import ajaxLoading from './ajax.loading'
import './ajax.target'
import ajaxTable from './table'
import tablePager from './table.pager'
import tableTree from './table.tree';
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

let components = [ajax, ajaxForm, tablePager, ajaxTable, ajaxLoading, dialogForm, tableTree];
export default utils.regComp(components)
