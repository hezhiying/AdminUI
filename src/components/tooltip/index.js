//tooltip

$.fn.uiTooltip = function () {
	let self = $(this);
	if (self.length) {
		RequireJC(['tooltip'], () => {
			self.each(function (i,elm) {
				if ($(this).data('installed')) return;
				$(this).tooltip();
				$(this).data('installed', true);
			});
		});
	}
};

export default{
	config:{
		paths:{
			tooltip: 'js/charts/flot/jquery.flot.tooltip.min.js',
			flot   : 'js/charts/flot/jquery.flot.min.js',

		},
		dep:{
			tooltip: ['flot']
		},
	},
	onload: function () {
		$("[data-toggle=tooltip]").uiTooltip();
	},
	event: (elm, event) => {
		$(elm).find('[data-toggle=tooltip]').uiTooltip();
	}
}