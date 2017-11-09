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
  onload:()=>{
    $("pre code").codeTransformHtml();
  },
  event:(elm)=>{
    $(elm).find('pre code').codeTransformHtml();
  }
}