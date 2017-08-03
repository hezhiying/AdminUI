/**
 * slim-scroll
 * slimScroll是一个小的jQuery插件，可以将任何div转换为可滚动区域，并带有一个漂亮的滚动条 - 类似于Facebook和Google最近在其产品中使用的一个。 slimScroll不占用任何视觉空间，因为它只出现在用户启动的鼠标悬停。用户可以拖动滚动条或使用鼠标滚轮来更改滚动值。
 * @git https://github.com/rochal/jQuery-slimScroll
 */
$.fn.uiSlimScroll = function () {
	let me = $(this);
	if (me.length) {
		RequireJC(['slimscroll'], () => {
			me.each(initSlimscroll);
		});
	}
	return me;
};
function initSlimscroll (i, elm) {
	if ($(this).data('installed')) return;
	$(this).data('installed',true);
	let $self = $(this), $data = $self.data(), $slimResize;
	$self.slimScroll($data);
	$(window).resize(function () {
		clearTimeout($slimResize);
		$slimResize = setTimeout(function () {
			$self.slimScroll($data);
		}, 500);
	});

	$(document).on('updateNav', function () {
		$self.slimScroll($data);
	});
}
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