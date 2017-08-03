/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.3.6
 */
/**
 * 使用appear插件，让元素在进入视野里产生动画效果
 */
($ => {
	$.extend(jQuery.easing,
		{
			def          : 'easeOutQuad',
			easeInOutExpo: function (x, t, b, c, d) {
				if (t === 0) return b;
				if (t === d) return b + c;
				if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		}
	);

	$.fn.initAppear = function () {
		let me = $(this);
		if (me.length) {
			RequireJC(['appear'], () => {
				me.appear();
				if (!$('html').hasClass('ie no-ie10')) {
					me.addClass('appear');
					me.on('appear', function () {
						let $el = $(this), $ani = ($el.data('animation') || 'fadeIn'), $delay;
						if (!$el.hasClass('animated')) {
							$delay = $el.data('delay') || 0;
							setTimeout(function () {
								$el.removeClass('appear').addClass($ani + " animated");
							}, $delay);
						}
					});
				}
			});
		}
		return me;
	};
})(jQuery);


export default {
	config: {
		paths: {appear: 'js/jquery-appear/jquery.appear.js'}
	},
	event : (elm) => {
		$(elm).find('[data-ride="animated"]').initAppear();
	},
	onload: function () {
		//视觉动画
		$('[data-ride="animated"]').initAppear();
		//滚动页面指定位置
		$(document).on('click.app', '[href^="#"][data-jump]', function (e) {
			e.preventDefault();
			let $target = this.hash;
			if (!$(this).data('jump')) return;
			$('html, body').stop().animate({
				'scrollTop': $($target).offset().top
			}, 1000, 'easeInOutExpo', function () {
				//window.location.hash = $target;
			});
		});
	}
}