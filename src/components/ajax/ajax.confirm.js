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

    let title = me.data('confirm') || $.lang('confirm.title');
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
          text    : $.lang('confirm.ok'),
          btnClass: 'btn-blue',
          keys    : ['enter'],
          action() {
            //点击OK按钮后执行ajax
            $.ajax(opts)
          }
        },
        cancel: {
          text: $.lang('confirm.Cancel')
        }
      }
    };

    $.confirm(confirmOptions);

    //立即返回false 阻止默认的ajax后续动作
    return false;
  });

})(jQuery);