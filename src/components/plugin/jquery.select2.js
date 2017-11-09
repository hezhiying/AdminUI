/**
 * select2下拉选择框
 * https://select2.org/
 * http://select2.github.io/select2-bootstrap-theme/
 * <select class="select2" data-tags="true" ></select>
 */
$.fn.uiSelect2 = function () {
  if(this.length) {
    RequireJC('select2', () => {
    $.fn.select2.defaults.set("theme", "bootstrap");

      $(this).each((i, e) => {
        const $this = $(e), inited = $this.data('select2Obj');
        if (inited) {
          return;
        }
        $this.data('select2Obj', true);
        let opts = $.extend({minimumResultsForSearch:20}, $this.data() || {});
        $this.select2(opts);
      });
    });
  }
};

export default {
  config:{
    paths:{
      select2:['js/select2/select2.min', 'js/select2/select2.min.css', 'js/select2/select2-bootstrap-theme.css'],
    },
    dep:{
    }
  },
  onload:()=>{
    $('select.select2').uiSelect2();
  },
  event:(elm)=>{
    $(elm).find('select.select2').uiSelect2();
  }
}
