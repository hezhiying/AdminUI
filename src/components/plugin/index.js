import './jquery.blockUI'

/**
 * 安装blockUI功能
 */
let installBlockUI = function () {
  let blockOpts = {
    message: ' <span class="fa-lg"><i class="fa fa-spinner fa-spin "></i> loading...</span>',
    css: {
      backgroundColor: "none",
      border:"none",
      color:"#fff",
      cursor:"wait",
      left:"35%",
      margin:0,
      padding:0,
      textAlign:"center",
      top:"40%",
      width:"30%"
    },
    overlayCSS: {
      backgroundColor: '#2e3e4e',
      opacity: 0.85,
      cursor: 'wait'
    },
  };
  $.blockUI.defaults = $.extend($.blockUI.defaults, blockOpts);
};

/**
 * 将pre code中的代码转换为html格式
 */
$.fn.codeTransformHtml = function () {
  let self = $(this);
  if (self.length) {
    self.each(function (i,elm) {
      if ($(this).data('installed')) return;
      let t = $(this).html();
      $(this).html(t.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
      $(this).data('installed', true);
    });
  }
};

export default {
  onload: () => {
    installBlockUI();
    $("pre code").codeTransformHtml();

  },
  event: (elm) => {
    $(elm).find('pre code').codeTransformHtml();

  }
}