/**
 * tooltip文字提示插件
 * @e.g.
 * <a class="btn btn-danger" href="#" data-toggle="tooltip" data-placement="top" title="sssfsafsf">link button</a>
 * placement: top bottom right left
 */
$.fn.uiTooltip = function () {
  let self = $(this);
  if (self.length) {
    self.each(function (i,elm) {
      if ($(this).data('installed')) return;
      $(this).tooltip();
      $(this).data('installed', true);
    });
  }
};

export default{
  config:{paths:{a:'aaa'}},
  onload: function () {
    $("[data-toggle=tooltip]").uiTooltip();
  },
  event: (elm, event) => {
    $(elm).find('[data-toggle=tooltip]').uiTooltip();
  }
}