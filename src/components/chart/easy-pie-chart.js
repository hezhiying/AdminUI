/**
 * easy-pie-chart
 * 轻量级的插件来呈现简单，动画和视网膜优化的饼图
 * @git https://github.com/rendro/easy-pie-chart
 * @home http://rendro.github.io/easy-pie-chart/
 */

(function ($) {
  $.fn.uiEasyPieChart = function () {
    if(this.length === 0)return;
    RequireJC(['easyPieChart'], ()=>{
      $(this).each((i, e) =>{
        const $this = $(e), inited = $this.data('dateEasyPieChartObj');
        if (inited) {
          return;
        }
        $this.data('dateEasyPieChartObj',true);


        let $data = $this.data(),
          $step = $this.find('.step'),
          $target_value = parseInt($($data.target).text()),
          $value = 0;
        $data.barColor || ( $data.barColor = function($percent) {
          $percent /= 100;
          return "rgb(" + Math.round(200 * $percent) + ", 200, " + Math.round(200 * (1 - $percent)) + ")";
        });
        $data.onStep =  function(value){
          $value = value;
          $step.text(parseInt(value));
          $data.target && $($data.target).text(parseInt(value) + $target_value);
        };
        $data.onStop =  function(value){
          $target_value = parseInt($($data.target).text());
          $data.update && setTimeout(function() {
            $this.data('easyPieChart').update(100 - $value);
          }, $data.update);
        };
        $data.animate || ($data.animate= 1000);
        $this.easyPieChart($data);

      });

    });

  };
})(jQuery);

//安装选项

export default {
  config:{
    paths:{
      easyPieChart:'js/charts/easypiechart/jquery.easy-pie-chart.js',
    },
    dep:{
    }
  },
  onload:()=>{
    $('.easypiechart').uiEasyPieChart();
  },
  event:(elm)=>{
    $(elm).find('.easypiechart').uiEasyPieChart();
  }
}
