/**
 * slim-scroll
 * slimScroll是一个小的jQuery插件，可以将任何div转换为可滚动区域，并带有一个漂亮的滚动条 - 类似于Facebook和Google最近在其产品中使用的一个。 slimScroll不占用任何视觉空间，因为它只出现在用户启动的鼠标悬停。用户可以拖动滚动条或使用鼠标滚轮来更改滚动值。
 * @git https://github.com/rochal/jQuery-slimScroll
 */
$.fn.uiSlimScroll = function () {
  if (this.length) {
    RequireJC(['slimscroll'], () => {
      $(this).each((i, e) => {
        const $this = $(e), inited = $this.data('slimScrollObj');
        if (inited) {
          return;
        }
        $this.data('slimScrollObj', true);
        let $slimResize;
        let opts = $.extend({
          distance:0,
          size:"5px",
          color:"#333333",
          disableFadeOut:true,
          height:'auto'
        }, $this.data() || {});
        $this.slimScroll(opts);

        $(window).resize(function () {
          $slimResize && clearTimeout($slimResize);
          $slimResize = setTimeout(function () {
            $this.slimScroll(opts);
          }, 500);
        });

      });
    });
  }
};
export default {
  config:{
    paths:{
      'slimscroll':'js/jquery-slimscroll/jquery.slimscroll.min.js'
    }
  },
  onload: function () {
    $('.no-touch .slim-scroll').uiSlimScroll();
  },
  event:function(elm){
    if ($('html').hasClass('no-touch')) {
      $(elm).find('.slim-scroll').uiSlimScroll();
    }
  }
}
