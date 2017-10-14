//tooltip

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
	onload: function () {
		$("[data-toggle=tooltip]").uiTooltip();
	},
	event: (elm, event) => {
		$(elm).find('[data-toggle=tooltip]').uiTooltip();
	}
}