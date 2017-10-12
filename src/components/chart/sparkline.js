/**
 * chart-sparkline
 * 直接在浏览器生成迷你图表(sparkline)
 *
 * @git https://github.com/gwatts/jquery.sparkline
 * @home https://omnipotent.net/jquery.sparkline/#s-about
 * @example:
 * bar 柱状图
 * <span class="sparkline" data-type="bar" data-height="35" data-bar-width="6" data-bar-spacing="2" data-bar-color="#ff0000">5,8,9,12,8,10,8,9,7,8,6</span>
 * <span class="sparkline" data-type="bar" data-height="35" data-bar-width="6" data-bar-spacing="2" data-bar-color="#ff0000">5:2,3:6</span>
 *
 * line 典线图
 * <span class="sparkline" data-type="line" data-height="35" data-width="80" data-fill-color="#ff0000" data-line-color="#ff0000">5,8,9,12,8,10,8,9,7,8,6,15</span>
 *
 * pie 饼图
 * <span class="sparkline" data-type="line" data-height="35" data-width="80" data-fill-color="#ff0000" data-line-color="#ff0000">5,8,9,12,8,10,8,9,7,8,6,15</span>
 *
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