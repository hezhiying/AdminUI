import CONFIG from '../config.js';

/**
 * 添加ajax结果在目标元素上显示功能
 *
 * <a href="" data-ajax="get.html" data-ajax-target="#targetID" data-loading="显示loading的位置，为空显示在target上" data-loading-text="loading文字">
 */
(function ($) {
  $(document).on(CONFIG.EVENT.AJAX_SUCCESS, function (event, data, xhr, ajaxOptions) {
    let me = ajaxOptions.element;
    let types = ($(me).data('ajax') || '').split('.');
    let target = types.includes('load') ? me : undefined;
    me.data('ajaxTarget') && (target=$(me.data('ajaxTarget')));
    //中果ajax类型为load 或有 ajaxTarget 则把ajax内容在目标对象上显示
    if(typeof target === 'undefined'){
      return;
    }
    target.html(data);
    $.adminUI.initElement(target);
  });
})(jQuery);