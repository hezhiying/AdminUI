import CONFIG from '../config.js';

(function ($) {

  /**
   * 监听ajax.build 判断ajax是否需要先确认
   */
  $(document).on(CONFIG.EVENT.AJAX_BUILD, function (event, opts) {
    let me = opts.element;
    //如果没有指定data-confirm, 则返回，这里不能返回false 否则会阻止ajax提交进程
    if(typeof me.data('confirm') === 'undefined'){
      return;
    }

    let title = me.data('confirm') || $.lang.core.confirmTile;
    let content = me.data('confirmContent') || '';
    let confirmOptions = {
      escapeKey: 'cancel',
      content  : content,
      title    : title,
      icon     : 'fa fa-question-circle',
      type     : 'orange',
      theme    : 'material',
      buttons  : {
        ok    : {
          text    : $.lang.core.confirmOK,
          btnClass: 'btn-blue',
          keys    : ['enter'],
          action() {
            $.ajax(opts)
          }
        },
        cancel: {
          text: $.lang.core.confirmCancel
        }
      }
    };

    $.confirm(confirmOptions);
    return false;
  });
})(jQuery);