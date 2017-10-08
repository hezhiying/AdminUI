/**
 * bootstrap-datepicker 插件
 * @git https://github.com/uxsolutions/bootstrap-datepicker
 * @demo https://uxsolutions.github.io/bootstrap-datepicker
 */
  // sparkline
// var sr, sparkline = function($re){
//     $(".sparkline").each(function(){
//       var $data = $(this).data();
//       if($re && !$data.resize) return;
//       ($data.type == 'pie') && $data.sliceColors && ($data.sliceColors = eval($data.sliceColors));
//       ($data.type == 'bar') && $data.stackedBarColor && ($data.stackedBarColor = eval($data.stackedBarColor));
//       $data.valueSpots = {'0:': $data.spotColor};
//       $(this).sparkline('html', $data);
//     });
//   };
// $(window).resize(function(e) {
//   clearTimeout(sr);
//   sr = setTimeout(function(){sparkline(true)}, 500);
// });
// sparkline(false);

(function ($) {
  $.fn.uiSparkline = function ($re) {
    if(this.length === 0)return;
    RequireJC(['sparkline'], ()=>{
      $(this).each((i, e) =>{
        const $this = $(e), inited = $this.data('dateSparklineObj');
        if (inited) {
          return;
        }
        $this.data('dateSparklineObj',true);

        let $data = $this.data();
        if($re && !$data.resize) return;
        ($data.type === 'pie') && $data.sliceColors && ($data.sliceColors = eval($data.sliceColors));
        ($data.type === 'bar') && $data.stackedBarColor && ($data.stackedBarColor = eval($data.stackedBarColor));
        $data.valueSpots = {'0:': $data.spotColor};
        $this.sparkline('html', $data);
      });

    });
  };


})(jQuery);

export default {
  config:{
    paths:{
      sparkline:'js/charts/sparkline/jquery.sparkline.min.js',
    },
    dep:{
    }
  },
  onload:()=>{
    $('.sparkline').uiSparkline(false);
    let sr;
    $(window).resize(function(e) {
      clearTimeout(sr);
      sr = setTimeout(function(){$('.sparkline').uiSparkline(true)}, 500);
    });
  },
  event:(elm)=>{
    $(elm).find('.sparkline').uiSparkline(false);
  }
}