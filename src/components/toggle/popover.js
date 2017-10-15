/**
 * popover
 * 帮助 http://www.runoob.com/bootstrap/bootstrap-popover-plugin.html
 */
$.fn.uiPopover = function () {
  let self = $(this);
  if (self.length) {
    self.each(function (i,elm) {
      if ($(this).data('installed')) return;
      //默认位置为auto
      $(this).data('placement', $(this).data('placement') || 'auto');
      $(this).popover();
      $(this).data('installed', true);
    });
  }
};

export default{
  onload: function () {
    $("[data-toggle=popover]").uiPopover();
    $(document).on('click', '.popover-title .close', function(e){
      var $target = $(e.target), $popover = $target.closest('.popover').prev();
      //直接隐藏或导致再次点击时需要2次，关闭时改为触发按钮一次点击解决问题
      $popover && $popover.trigger('click');
      // $popover && $popover.popover('hide');
    });
  },
  event: (elm, event) => {
    $(elm).find('[data-toggle=popover]').uiPopover();
  }
}