import CONFIG from '../config'
/**
 * 显示loading bar加载效果
 * ajax加载时自动显示
 * @e.g.
 * $.adminUI.loadingBar.show(); //开始显示
 * $.adminUI.loadingBar.success();  //成功
 * $.adminUI.loadingBar.error(); //失败
 */

(function ($) {
  "use strict";

  //自动实现loading bar 效果
  $.adminUI.loadingBar = {
    bar    : null,
    processBar: null,
    init() {
      $('#loading-bar').remove();
      this.bar = $('<div class="loading-bar animated" id="loading-bar">\
				<div class="progress progress-xs">\
				<div class="progress-bar active"></div>\
				</div>\
				</div>');
      this.bar.prependTo('body');
      this.processBar = this.bar.find('.progress-bar')
    },
    show(){
      this.init();
      this.bar.find('.progress').addClass('progress-striped');
      this.processBar.removeClass('progress-bar-success progress-bar-danger done').width(0);
      this.bar.removeClass('fadeOut').addClass('fadeIn').show();
      this.processBar.width('90%')
    },
    error(){
      this.bar.find('.progress').removeClass('progress-striped');
      this.processBar.addClass('progress-bar-danger done').width('100%');
      this.hide()
    },
    success(){
      this.bar.find('.progress').removeClass('progress-striped');
      this.processBar.addClass('progress-bar-success done').width('100%');
      this.hide()
    },
    hide(){
      let me = this;
      setTimeout(function () {
        me.bar.addClass('fadeOut').hide().remove();
      }, 500)
    }
  };
  $(()=>{
    const bar = $.adminUI.loadingBar;
    $(document).ajaxStart(() => {
      bar.show();
    });
    $(document).ajaxStop(() => {
      bar.hide();
    });
    $(document).ajaxError(() => {
      bar.error();
    });
    $(document).ajaxSuccess(() => {
      bar.success();
    });
  });
  /**
   * ajax发送时判断是否需要显示button loading 或 blockUi loading
   */
  $(document).on(CONFIG.EVENT.AJAX_SEND, function (event, xhr, ajaxOptions) {
    let me = ajaxOptions.element;

    if( me.data('ajaxTarget')){
      let target = me.data('loading') || me.data('ajaxTarget');
      let blockOptions = {};
      me.data('loadingText') && (blockOptions.message = me.data('loadingText'));
      $(target).block(blockOptions);
    }else if (me.is('[data-loading]')) {
      me.button('loading');
    }

  });

  /**
   * 发送完成结束loading状态
   */
  $(document).on(CONFIG.EVENT.AJAX_DONE, function (event, xhr, ajaxOptions) {
    let me = ajaxOptions.element;
    if( me.data('ajaxTarget')){
      let target = me.data('loading') || me.data('ajaxTarget');
      setTimeout(()=>{$(target).unblock();},2000)
    }else if (me.is('[data-loading]')) {
      setTimeout(()=>{ me.button('reset');},2000)
    }
  });

})(jQuery);