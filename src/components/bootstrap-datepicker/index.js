/**
 * bootstrap-datepicker 插件
 * @git https://github.com/uxsolutions/bootstrap-datepicker
 * @demo https://uxsolutions.github.io/bootstrap-datepicker
 */

(function ($) {
  $.fn.uiDatePicker = function () {
    if(this.length === 0)return;
    RequireJC(['datepicker', 'datepicker-zh'], ()=>{

      $(this).each((i, e) =>{
        const $this = $(e), inited = $this.data('datePickerObj');
        if (inited) {
          return;
        }
        $this.data('datePickerObj',true);
        let opts = {
          language: "zh-CN",
          todayHighlight: true,
          format: 'yyyy-mm-dd',
          autoclose: true
        };
        if(typeof $this.data('dateFormat') !== 'undefined'){
          opts.format = $this.data('dateFormat');
        }
        if(typeof $this.data('dateAutoclose') !== 'undefined'){
          opts.autoclose = $this.data('dateAutoclose');
        }
        $this.datepicker(opts);
      });

    });
  };

})(jQuery);

export default {
  config:{
    paths:{
      datepicker:'js/bootstrap-datepicker/bootstrap-datepicker.min.js',
      'datepicker-zh': 'js/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js'
    },
    dep:{
      datepicker:'js/bootstrap-datepicker/bootstrap-datepicker3.min.css',
      'datepicker-zh': 'datepicker'
    }
  },
  onload:()=>{
    $('.datepicker-input').uiDatePicker();
  },
  event:(elm)=>{
    $(elm).find('.datepicker-input').uiDatePicker();
  }
}