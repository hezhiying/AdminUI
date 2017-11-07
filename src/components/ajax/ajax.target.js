import CONFIG from '../config.js';

/**
 * 添加ajax结果在目标元素上显示功能
 *
 * <a href="" data-ajax="get.html" data-ajax-target="#targetID" data-loading="显示loading的位置，为空显示在target上" data-loading-text="loading文字">
 */
(function ($) {
  $(document).on(CONFIG.EVENT.AJAX_SUCCESS, function (event, data, xhr, ajaxOptions) {
    let me = ajaxOptions.element;
    //如果没有指定data-confirm, 则返回，这里不能返回false 否则会阻止ajax提交进程
    if(typeof me.data('ajaxTarget') === 'undefined'){
      return;
    }
    let target = $(me.data('ajaxTarget'));
    target.html(data);
    $.adminUI.initElement(target);
  });
})(jQuery);