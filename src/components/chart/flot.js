/**
 * flotChart
 * @git https://github.com/flot/flot
 * @home http://www.flotcharts.org/
 */

//默认选项
let defaultOpts = {
  series: {

  },
  //生成图表标题
  legend: {
    show: true,
    noColumns:1,// 用于设置legend表格的列数
    position: 'ne', //用于指定legend在曲线图内的位置，"ne"东北角，"se"东南 , "nw"西北 , "sw"西南
    margin:[5,5],//设置legend与曲线图边框的距离,可以是x y轴偏移量的数值对[x,y]也可以是单个数字，单个数字值表示相对x,y轴的偏移量使用相同的值
    backgroundColor:null,  //设置legend的背景颜色 null or color
    backgroundOpacity:0.85,  //设置legend背景的透明度 number between 0 0.1 ... 1
  },
  //背景栅格定制
  grid: {
    hoverable: true,  //允许监听鼠标点击事件
    clickable: false, //允许监听鼠标悬停事件
    borderWidth: 0,   //设置边框宽度，设为0则取消边框
    // tickColor:null,   //设置刻度线的颜色
    // labelMargin:null, //设置刻度值标签与网格的距离，
    // borderColor:null, //设置边框颜色，
  },
  tooltip:true,
  tooltipOpts:{
    show:true,
    defaultTheme:false,
    content: "%s | X: %x | Y: %y", //  string or function $s:标签名 %x x值 %y值
  }
};

$.fn.uiFlotChart = function () {
	let self = $(this);
	if (self.length) {
		RequireJC(['flot'], () => {
			self.each(function (i,elm) {
				if ($(this).data('installed')) return;
				let data = [], opts = {};

        //获取flot data 替换html注释  替换script
        let dataStr = $(this).find(".flot-data").text();
        dataStr = dataStr.replace(/<!--[\w\W]*?-->/ig,'');
        dataStr = dataStr.replace(/<script>|<\/script>/ig,'');
				try{
          data = eval('(' + dataStr + ')');
        }catch(e){
          data = [];
				  console.warn('缺少data:',$(this));
        }

        //获取opts属性 替换html注释 替换script
        let optsStr = $(this).find(".flot-options").text();
        optsStr = optsStr.replace(/<!--[\w\W]*?-->/ig,'');
        optsStr = optsStr.replace(/<script>|<\/script>/ig,'');
        try{
          opts = eval('(' + optsStr + ')');
        }catch(e) {
          opts = {};
        }

        //用户选项和默认值合并
        opts = $.extend(true, {}, defaultOpts, opts);

        //初始化flot图表
        $.plot($(this), data,  opts);
        $(this).data('installed', true);
			});
		});
	}
};

export default{
	config:{
		paths:{
			flot   : [
        'js/charts/flot/jquery.flot.tooltip.min.js',
        'js/charts/flot/jquery.flot.resize.js',
        'js/charts/flot/jquery.flot.orderBars.js',
        'js/charts/flot/jquery.flot.pie.min.js',
        'js/charts/flot/jquery.flot.grow.js',
      ],
		},
		dep:{
		  flot: 'js/charts/flot/jquery.flot.min.js'
		},
	},
	onload: function () {
		$(".flotchart").uiFlotChart();
	},
	event: (elm, event) => {
		$(elm).find('.flotchart').uiFlotChart();
	}
}