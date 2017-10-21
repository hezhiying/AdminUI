import CONFIG from '../config.js';
import './ajax.confirm';
import {showExceptionDialog} from "../dialog/http.exception";

(function ($) {

  // 全局设置
  $.ajaxSetup({
    cache: false,
    timeout: 900000
  });

  /**
   * 3.生命周期：ajax.send
   * 发送中...，监听ajax.send 返回false不能阻止ajax的发送
   */
  $(document).ajaxSend((event, xhr, opts) => {

    // 确保opts有一个element对象
    if (!opts.element) {
      opts.element = $('body');
    } else {
      opts.isElement = true;
    }

    opts.element.data('ajaxSending', true);
    let e_ajaxSend = new $.Event(CONFIG.EVENT.AJAX_SEND);
    e_ajaxSend.element = opts.element;
    opts.element.trigger(e_ajaxSend, [xhr, opts]);

    /**
     * 确认是否要实现load效果
     */
    if (opts.element.is('[data-loading]')) {
      opts.element.button('loading');
    }
    xhr.setRequestHeader('X-AJAX-TYPE', opts.dataType);
    xhr.setRequestHeader('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'));
  });

  /**
   * 4.1 生命周期：ajax.error
   * 发送失败，监听ajax.error 返回false不能阻止ajax的发送
   */
  $(document).ajaxError((event, xhr, opts, error) => {
    let e_ajaxError = $.Event(CONFIG.EVENT.AJAX_ERROR);
    opts.element.trigger(e_ajaxError, [xhr, opts, error]);

    //如果其它地方监听返回false，则交由其它地方处理
    if (e_ajaxError.isDefaultPrevented()) {
      return false;
    }
    //处理表单校验错误
    if ((xhr.status === 422 || xhr.status === 423) && xhr.responseJSON && xhr.responseJSON.errors) {
      opts.element.trigger(CONFIG.EVENT.FORM_VALIDATE_ERROR, [xhr.responseJSON.errors]);
      return false;
    }

    //laravel json error Exception
    if(xhr.responseJSON && xhr.responseJSON.exception){
      showExceptionDialog(xhr.responseJSON, xhr.status, xhr.statusText);
    }else if(xhr.responseText){
      showExceptionDialog(xhr.responseText, xhr.status, xhr.statusText, 'html');
    }

  });

  /**
   * 4.2 生命周期 ajax.success
   * 请求成功
   */
  $(document).ajaxSuccess((event, xhr, opts, data) => {
    let e_ajaxSuccess = $.Event(CONFIG.EVENT.AJAX_SUCCESS);
    opts.element.trigger(e_ajaxSuccess, [data, xhr, opts]);

    //如果其它地方监听返回false，则交由其它地方处理
    if (e_ajaxSuccess.isDefaultPrevented()) {
      return false;
    }
  });

  /**
   * 5.生命周期最后 ajax.done 不论失败功失败
   */
  $(document).ajaxComplete((event, xhr, opts) => {
    //重置发送状态
    opts.element.data('ajaxSending', false);
    if (opts.element.is('[data-loading]')) {
      opts.element.button('reset');
    }

    //触发事件
    let e_ajaxDone = new $.Event(CONFIG.EVENT.AJAX_DONE);
    e_ajaxDone.element = opts.element;
    opts.element.trigger(e_ajaxDone, [xhr, opts]);

    // 判断是否需要显示notify message信息
    if (xhr.responseJSON && xhr.responseJSON.message) {
      let code = xhr.responseJSON.code || xhr.status || 0;
      showNotifyMessage(code, xhr.responseJSON.message);
    }
  });

  /**
   * 自定义元素监听ajax事件,按生命周期排序
   * @param callback
   */
  $.fn.onAjaxBefore = function (callback) {
    $(this).on(CONFIG.EVENT.AJAX_BEFORE, function (event) {
      if(!$(this).is($(event.target))){
        return;
      }
      return callback.call(this, event);
    })
  };
  $.fn.onAjaxBuild = function (callback) {
    $(this).on(CONFIG.EVENT.AJAX_BUILD, function (event, ajaxOptions) {
      if(!$(this).is($(event.target))){
        return;
      }
      return callback.call(this, ajaxOptions, event);
    })
  };
  $.fn.onAjaxSend = function (callback) {
    $(this).on(CONFIG.EVENT.AJAX_SEND, function (event, xhr, opts) {
      if(!$(this).is($(event.target))){
        return;
      }
      return callback.call(this, xhr, opts, event);
    })
  };
  $.fn.onAjaxError = function (callback) {
    $(this).on(CONFIG.EVENT.AJAX_ERROR, function (event, xhr, opts, error) {
      if(!$(this).is($(event.target))){
        return;
      }
      return callback.call(this, xhr, opts, error, event);
    })
  };
  $.fn.onAjaxSuccess = function (callback) {
    $(this).on(CONFIG.EVENT.AJAX_SUCCESS, function (event, data, xhr, opts) {
      if(!$(this).is($(event.target))){
        return;
      }
      return callback.call(this, data, xhr, opts, event);
    })
  };
  $.fn.onAjaxDone = function (callback) {
    $(this).on(CONFIG.EVENT.AJAX_DONE, function (event, xhr, opts) {
      if(!$(this).is($(event.target))){
        return;
      }
      return callback.call(this, xhr, opts, event);
    })
  };


})(jQuery);

/**
 * 返回结果有message，显示通知信息
 * @param code
 * @param message
 */
let showNotifyMessage = function (code, message) {
  if (code === 200) {
    $.notifyS(message);
  } else {
    $.notifyD(message);
  }
};

let doAjaxRequest = function (event) {
  //阻止事件的默认行为
  event.preventDefault();
  //阻止事件向上冒泡到 DOM 树，阻止任何父处理程序被事件通知
  event.stopPropagation();

  let $this = $(this);
  //如果当前ajax正在请求，忽略本次
  if ($this.data('ajaxSending')) {
    return false;
  }
  /**
   * 1.生命周期：ajax.before
   * 发送ajax.before事件， 用户可以在其它地方监听，返回true 或 false
   * true 继续执行
   * false 中止执行
   */
  let e_ajaxBefore = $.Event(CONFIG.EVENT.AJAX_BEFORE);
  $this.trigger(e_ajaxBefore);
  if (e_ajaxBefore.isDefaultPrevented()) {
    return false;
  }

  /**
   * 2.生命周期： ajax.build
   * 构建ajaxOptions 发送选项
   * 其它地方监听返回false则退出发送
   */
  let e_ajaxBuild = $.Event(CONFIG.EVENT.AJAX_BUILD);
  let opts = $.extend({element: $this, data: []}, $this.data() || {});
  opts.url = opts.url || $this.attr('href') || $this.attr('action') || '';
  let ajax = opts.ajax || 'get.json';
  let types = ajax.split('.');
  opts.dataType = types.length === 2 ? types[1] : 'json';
  opts.method = ($this.attr('method') || (types[0] ? types[0] : 'GET')).toUpperCase();
  e_ajaxBuild.opts = opts;

  $this.trigger(e_ajaxBuild, [opts]);
  if (e_ajaxBuild.isDefaultPrevented()) {
    return false;
  }

  $.ajax(opts);

  return false;

};

export default {
  config: {},
  onload: () => {
    $('body')
      .on('click', '[data-ajax]:not(form)', doAjaxRequest)
      .on('submit', 'form[data-ajax]', doAjaxRequest)
      .on('change', 'select[data-ajax]', doAjaxRequest);

  },
  event: (elm) => {

  }
}