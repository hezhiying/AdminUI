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
      if ($(this).data('tooltipInstalled')) return;
      $(this).tooltip({trigger:'hover'});
      $(this).data('tooltipInstalled', true);
    });
  }
};

export default{
  onload: function () {
    $("[data-toggle=tooltip]").uiTooltip();
  },
  event: (elm, event) => {
    $(elm).find('[data-toggle=tooltip]').uiTooltip();
  }
}