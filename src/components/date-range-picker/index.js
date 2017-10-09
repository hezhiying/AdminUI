/**
 * daterangepicker
 * http://www.daterangepicker.com/
 * https://github.com/dangrossman/bootstrap-daterangepicker
 *
 * demo:
 * <input date-range-picker data-start-date="2017-5-3" data-end-date="2017-7-1" data-opens="left" data-date-limit='{"days":20}'>
 *
 */

($ => {
	const locale =  {
		format: 'YYYY-MM-DD',
		applyLabel:'确定',
		cancelLabel:'取消',
		customRangeLabel:'自定义',
		daysOfWeek: ["日", "一", "二", "三", "四", "五", "六" ],
		monthNames: ["一月","二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
	};

	const ranges = function () {
	  return {
      '今天': [moment(), moment()],
      '昨天': [moment().subtract(1,'days'), moment().subtract(1,'days')],
      '最近7天': [moment().subtract(6,'days'), moment()],
      '最近30天': [moment().subtract(29,'days'), moment()],
      '本月': [moment().startOf('month'), moment().endOf('month')],
      '上月': [moment().subtract(1,'month').startOf('month'), moment().subtract(1,'month').endOf('month')]
    };
  };

	$.fn.uiDateRangePicker = function () {
		if(this.length){
			RequireJC(['moment', 'daterangepicker'], () => {
				$(this).each((i, e) =>{
					const $this = $(e), inited = $this.data('dateRangeObj');
					if (inited) {
						return;
					}
					$this.data('dateRangeObj',true);
					//显示格式
          locale.format = $this.data("localeFormat") || 'YYYY-MM-DD';
          let opts = {
            locale: locale,
            showCustomRangeLabel:true,
            autoApply:true,
            ranges: ranges()
          };
          let limitDays = $this.data("dateLimitDays");
          let limitMonths = $this.data("dateLimitMonths");
          if(limitDays){
            opts.dateLimit = {days: limitDays}
          }
          if(limitMonths){
            opts.dateLimit = {months: limitMonths}
          }
          //初始化日期控件
					$this.daterangepicker(opts);
				});
			});
		}

	};


})(jQuery);

export default {
	config:{
		paths:{
			moment:'js/moment/moment',
			daterangepicker:'js/daterangepicker/daterangepicker'
		},
		dep:{
			daterangepicker:['js/daterangepicker/daterangepicker.css']
		}
	},
	onload:()=>{
		$('[date-range-picker]').uiDateRangePicker();
	},
	event:(elm)=>{
		$(elm).find('[date-range-picker]').uiDateRangePicker();
	}
}