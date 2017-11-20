import CONFIG from '../config.js';
import utils from '../../utils/utils';
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

    //loading功能已转至单独模块ajax.loading.js中
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

    //错误后回调执行元素上 data-ajax-error-callback 属性，里面应包含JS脚本。
    let errorCallback = function (status, xhr, opts) {
      let errorScript = opts.element.data('ajaxErrorCallback');
      if (errorScript){
        eval(errorScript);
      }
    };
    errorCallback.call(opts.element, xhr.status, xhr, opts);

    //laravel json error Exception
    if(xhr.responseJSON && xhr.responseJSON.exception){
      showExceptionDialog(xhr.responseJSON, xhr.status, xhr.statusText);
    }else if(xhr.responseText){
      showExceptionDialog(xhr.responseText, xhr.status, xhr.statusText, 'html');
    }

  });

  /**
   * 5.生命周期最后 ajax.done 不论失败功失败
   */
  $(document).ajaxComplete((event, xhr, opts) => {
    //重置发送状态
    opts.element.data('ajaxSending', false);
    //触发事件
    let e_ajaxDone = new $.Event(CONFIG.EVENT.AJAX_DONE);
    e_ajaxDone.element = opts.element;
    opts.element.trigger(e_ajaxDone, [xhr, opts]);
    //如果其它地方监听返回false，则交由其它地方处理
    if (e_ajaxDone.isDefaultPrevented()) {
      return false;
    }
    // 判断是否需要显示notify message信息
    if (xhr.responseJSON && xhr.responseJSON.message) {
      let code = xhr.responseJSON.code || xhr.status || 0;
      showNotifyMessage(code, xhr.responseJSON.message);
    }
  });

  /**
   * 4.2 生命周期 ajax.success
   * 请求成功
   */
  $(document).ajaxSuccess((event, xhr, opts, data) => {
    let e_ajaxSuccess = $.Event(CONFIG.EVENT.AJAX_SUCCESS);
    opts.element.trigger(e_ajaxSuccess, [data, xhr, opts]);

    //成功后回调执行元素上 data-ajax-success 属性，里面应包含JS脚本。
    let successCallback = function (data, xhr, opts) {
      let successScript = opts.element.data('ajaxSuccessCallback');
      if (successScript){
        eval(successScript);
      }
    };
    successCallback.call(opts.element, data, xhr, opts);

    //如果其它地方监听返回false，则交由其它地方处理
    if (e_ajaxSuccess.isDefaultPrevented()) {
      return false;
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

  //构建ajax发送选项
  let types = ($this.data('ajax') || 'get.json').split('.');
  let opts = {};
  opts.element = $this;
  opts.url = $this.data('ajaxUrl') || $this.attr('href') || $this.attr('action') || '';
  opts.dataType = types.length >= 2 ? types[1] : 'json';
  opts.method = ($this.attr('method') || (types[0] ? types[0] : 'GET')).toUpperCase();
  opts.data = utils.parseJson($this.data('ajaxData'));

  /**
   * 2.生命周期： ajax.build
   * 构建ajaxOptions 发送选项
   * 其它地方监听返回false则退出发送
   */
  let e_ajaxBuild = $.Event(CONFIG.EVENT.AJAX_BUILD);
  e_ajaxBuild.opts = opts;
  $this.trigger(e_ajaxBuild, [opts]);
  if (e_ajaxBuild.isDefaultPrevented()) {
    return false;
  }

  $.ajax(opts);

  return false;

};

//
$.fn.ajaxReload = function () {
  if($(this).is('[data-ajax]')){
    $(this).trigger($.Event(CONFIG.EVENT.AJAX_RELOAD));
  }
};

$.fn.uiAjax = function () {
  let self = $(this);
  if (self.length) {
    self.each(function (i,elm) {
      if ($(this).data('installed')) return;

      //每一个ajax功能元素都绑定reload监听
      $(this).on(CONFIG.EVENT.AJAX_RELOAD, doAjaxRequest);

      if($(this).is("form")){
        $(this).submit(doAjaxRequest);
      }else if($(this).is("select")){
        $(this).change(doAjaxRequest);
      }else if($(this).is("table")){
        $(this).ajaxReload();
      }else{
        let types = ($(this).data('ajax') || 'get.json.click').split('.');
        if(types.includes("load")){
          $(this).ajaxReload();
        }else{
          $(this).click(doAjaxRequest)
        }

      }

      $(this).data('installed', true);
    });
  }


};
export default {
  config: {},
  onload: () => {
    $('[data-ajax]').uiAjax();
   /* $('body')
      .on('click', '[data-ajax]:not(form)', doAjaxRequest)
      .on('submit', 'form[data-ajax]', doAjaxRequest)
      .on('change', 'select[data-ajax]', doAjaxRequest);*/

  },
  event: (elm) => {
    $(elm).find('[data-ajax]').uiAjax();
  }
}
