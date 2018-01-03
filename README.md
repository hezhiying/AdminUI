# AdminUI


### 所有特性
- [占位符 placeholder](#placeholder)
- [全屏显示 fullscreen](#fullscreen)
- [漂亮滚动条 slimScroll](#slimscroll)
- [landing 让元素在进入视野里产生动画效果](#landing)
- [loading-bar loadingBar加载效果](#loading-bar)
- [chart-sparkline迷你图](#chart-sparkline)
- [easyPieChart 轻量饼图插件](#easypiechart)
- [flotChart 图表插件](#flotchart)
- [data-toggle 插件](#data-toggle)
	- [tooltip 提示框](#tooltip)
	- [popover 弹出框](#popover)
	- [toggle class 切换元素样式](#toggle-class)
	- [toggle panel 切换显示隐藏](#toggle-panel)
- [Alert 警告提示](#Alert警告提示)
	- [Notice 通知提醒](#Notice通知提醒)
	- [Modal 对话框提醒](#Modal对话框提醒)
- [ajax](#ajax)
	- [基本用法](#基本用法)
		- [例子](#例子)
		- [属性](#属性)
		- [方法](#方法)
		- [事件](#事件)
	- [dialog-form](#dialog-form)
	- [表格分页](#表格分页)
	- [TableTree](#table-tree)
	- [form-validate表单验证](#form-validate)
- [form element](#form-element)
	- [checkbox](#checkbox)
	- [radio](#radio)
	- [select2](#select2)
	- [daterangepicker日期范围](#daterangepicker)
	- [bootstrap-datepicker](#bootstrap-datepicker)
	- [cascade无限级联下拉选择框](#cascade)

- [jquery cookie](#jquery-cookie)
	
## placeholder
IE上实现Html5中placeholder效果

[https://github.com/mathiasbynens/jquery-placeholder](https://github.com/mathiasbynens/jquery-placeholder)

**example:**
```html
 <input type="text" name="name" placeholder="e.g. John Doe">
```


## fullscreen
[https://github.com/sindresorhus/screenfull.js](https://github.com/sindresorhus/screenfull.js)

**e.g.**
```html
 <a href="#" class="navbar-brand" data-toggle="fullscreen"></a>
```

## slimScroll
 [https://github.com/rochal/jQuery-slimScroll](https://github.com/rochal/jQuery-slimScroll)
 
**e.g.**
```html
<div class="slim-scroll"  data-height="auto" data-width="auto" data-disable-fade-out="true" data-distance="0" data-size="5px" data-color="#333333">
</div>
```
**属性**

属性 | data | 说明 | 类型 |默认
---|--- |---|---|---
width | data-width | 滚动区域宽度 | pixels |none
height | data-height | 滚动区域高度 |pixels| 250px
size | data-size | 滚动条大小(宽度) | pixels | 7px
disableFadeOut | data-disable-fade-out | true:鼠标在滚动区域内滚动条不消失 <br>false:一段时间滚动条自动隐藏消失 |bool| false
distance | data-distance |滚动条边距 |pixels| 1px
color | data-color | 滚动条颜色 |hex| #000000
wheelStep | data-wheel-step |滚动条每次滚动距离 |int| 20
## landing
使用appear插件，让元素在进入视野里添加动画效果
https://github.com/morr/jquery.appear/

**e.g.**

```html
<!--进入可视区域后今次播放从左往右淡入的动画效果-->
<div data-ride="animated" data-animation="fadeInLeft" data-delay="300"></div>
<div data-ride="animated" data-animation="fadeInLeft" data-delay="600"></div>
<div data-ride="animated" data-animation="fadeInLeft" data-delay="900"></div>
<!--直接使用动画效果-->
<div class="animated fadeInLeft"></div>

```

**属性**

属性 | data | 说明  |默认
---|--- |---|---
animation|data-animation|要使用的动画效果|<fadeInLeft>
delay|data-delay|延迟多少时间开始动画效果ms|0

**动画效果列表**

淡入 | 淡出 | 说明 |
---|--- | --- |
fadeIn|fadeOut|淡入(淡出)显示 
fadeInUp|fadeOutUp|从下往上淡入(淡出)
fadeInDown|fadeOutDown|从上 -> 往下
fadeInLeft|fadeOutLeft|从左 -> 往右
fadeInRight|fadeOutRight|从右 -> 往左
fadeInUpBig|fadeOutUpBig|从底 -> 往上
fadeInDownBig|fadeOutDownBig|从顶 -> 往下
fadeInLeftBig|fadeOutLeftBig|从左屏 -> 往右
fadeInRightBig|fadeOutRightBig|从右屏 -> 往左

## loading-bar 

ajax加载时自动显示[code source](src/components/loading-bar/index.js)

**e.g.**

```js
//开始显示
$.adminUI.loadingBar.show();
//成功
$.adminUI.loadingBar.success();
//失败
$.adminUI.loadingBar.error();
```


## chart-sparkline

直接在浏览器生成迷你图表(sparkline)

* @git https://github.com/gwatts/jquery.sparkline
* @home https://omnipotent.net/jquery.sparkline/#s-about

**e.g.**

```html
//bar
<span class="sparkline" data-type="bar" data-height="35" data-bar-width="6" data-bar-spacing="2" data-bar-color="#ff0000">5,8,9,12,8,10,8,9,7,8,6</span>
<span class="sparkline" data-type="bar" data-height="35" data-bar-width="6" data-bar-spacing="2" data-bar-color="#ff0000">5:2,3:6</span>

//line
<span class="sparkline" data-type="line" data-height="35" data-width="80" data-fill-color="#ff0000" data-line-color="#ff0000">5,8,9,12,8,10,8,9,7,8,6,15</span>

//pie
<span class="sparkline" data-type="line" data-height="35" data-width="80" data-fill-color="#ff0000" data-line-color="#ff0000">5,8,9,12,8,10,8,9,7,8,6,15</span>

```
**常用属性**

属性 | data | 说明 |默认值
---|--- | --- |---
type|data-type|图表类型|柱图`bar`, 曲线`line`, 饼图`pie`
height|data-height|
width|data-width|
lineColor|data-line-color|线条色|
fillColor|data-fill-color|填充色|`false`:透明 or 颜色值
tooltipSuffix|data-tooltip-suffix|提示后缀|`string`
tooltipPrefix|data-tooltip-prefix|提示前缀|`string`
tooltipChartTitle|data-tooltip-chart-title|提示标题|`string`

**line chart**

* `LineWidth` or `data-line-width`: 线条宽度
* `spotColor` or `data-spot-color`: 点的颜色
* `minSpotColor` or`data-min-spot-color`: 最小点的颜色
* `maxSpotColor` or `data-max-spot-color`: 最高点颜色

**bar chart**

* `barColor` `data-bar-color`: 柱正值颜色
* `negBarColor` `data-neg-bar-color`: 柱负值颜色
* `zeroColor` `data-zero-color`: 柱零值颜色
* `barWidth` `data-bar-width`: 柱宽度
* `barSpacing` `data-bar-spacing` 间距
* `stackedBarColor` `data-stacked-bar-color`: 条形图系列颜色 ['#000','#111'] 对应 `<div class="sparkline"> 用颜色1:用颜色2</div>`

**pie chart**

* `borderWidth` `data-border-width`: 边框宽度 default:0
* `borderColor` `data-border-color`: 边框颜色 default:#000
* `sliceColors` `data-slice-colors`: 颜色数组 ['#000', ...]

## easyPieChart 
简单轻量的饼图插件

* @git https://github.com/rendro/easy-pie-chart
* @home http://rendro.github.io/easy-pie-chart/

**e.g.**

```html
 <div id="test">0</div>
 <div class="easypiechart" data-percent="25" data-target="#test" data-line-width="6" data-size="188">
    <span class="h2 step">25</span>%
    <div class="easypie-text">Today</div>
 </div>
 
```

**属性说明**

属性 | 默认值 | 说明 
---|--- | --- 
percent| 0 | 百分比 |
lineWidth|3| 线条宽度(px) 
lineCap|round|线条如何收尾:`butt`, `round`, `square` 
size|110|饼图大小（px)
barColor|<span style="color:#ef1e25">#ef1e25</span>|线条颜色
trackColor|<span style="color:#f2f2f2">#f2f2f2</span>|轨道颜色 false 为禁止
scaleColor|<span style="color:#dfe0e0">#dfe0e0</span>|缩放的线条颜色
animate|false|变形动画时间毫秒
delay|false|延迟多久开始执行动画(毫秒)
onStart|$.noop|动画开始时回调
onStep|$.noop(val)|动画执行时 返回当前百分比
onStop|$.noop(val)|动画结束时 this.$el 访问dom
target|undefined|会把当前百分比加到目标上显示

```js
//获取easyPieChart对象
let chart = $("#id").data('easyPieChart');
chart.update(40);//更新饼图百分比
```

## flotChart
* @git https://github.com/flot/flot
* @home http://www.flotcharts.org/
* 中文翻译1 http://shuaizai88.iteye.com/blog/1227641
* 中文翻译2 http://blog.csdn.net/linybo/article/details/46891505
**脚本写法**

```js
$.plot(placeholder, data, options)
```
**html写法**

> *注意样式名包含flotchart and  必须设置一个高度*

```html
<div class="flotchart" style="height:240px">
	<div class="flot-data hide">
		<!--表格数据 Data Format-->
	</div>
	<div class="flot-options hide">
		<!--表格选项-->
   </div>
</div>

```

### 表格数据 Data Format

flot表格数据是一个数列数组(每条条曲线或直方图为一个数列，可以有条折线)

```js
[ series1, series2, ... ]
```

一个系列`series`可以是原始数据或具有属性的对象。

原始数据格式是一个数组：

```js
[ [x1, y1], [x2, y2], ... ]

//原始数据格式是一个数组:
[ [1, 3], [2, 14.01], [3.5, 3.14] ]

//或者是对象:
//常用对象:
{
    data: rawdata, //一组数据
    label: string
}
//data全部属性
{
    color: color or number
    data: rawdata
    label: string
    //属性和plot options一样，参考后面解释
    lines: specific lines options
    bars: specific bars options
    points: specific points options
    xaxis: number
    yaxis: number
    clickable: boolean
    hoverable: boolean
    shadowSize: number
    highlightColor: color or number
}
```

### 表格选项 Plot Options

常用属性

```js
{
  //图例说明设置
  legend: {
    //是否显示图例说明 boolean
    show: true,
    
    //有4个选项"ne", "nw", "se", "sw"分别表示将label组显示在 ↗， ↖， ↘， ↙
    position: "ne",
    
    //边距，[x margin, y margin]
    margin: [0, 0],
    //背景色 null or color
    backgroundColor: null,
    //背景透明度 number between 0 and 1
    backgroundOpacity: 0.8
  },
  //数例设置
   series: {
    //折线图 散点图 直方图 共同属性
    lines, points, bars: {
      show: boolean
      lineWidth: number
      fill: boolean or number
      fillColor: null or color/gradient
    },
    bars: {
     order:number, 直方图序号(不设置，会叠加在一起）
         //直方图宽度，单位是数轴的单位而非像素
         barWidth: number, 
         //用于设置数据点对应刻度线与直方图之间的对齐关系，默认情况下，刻度线在直方图的左侧(left,靠近数轴最小值一侧)，如果设置为center，刻度线在直方图中间。
         align: "left", "right" or "center"
        //为true 直方图为水平绘制
        horizontal: boolean
      },
      points: {
        radius: number
        symbol: "circle" or function
      },
      lines: {
         //对于折线图，"steps"可以设置是否使用阶梯状折线，设置为true采用阶梯状折线，相邻2个数据点之间先以水平线连接，
         //后然用垂直线连接，需要注意的是，这种模式会在同一垂直线上增加数据点来实现
         steps: boolean
       },
       pie: {
         innerRadius: 0.5, //同心圆半径(最大1）
         show: true
       },

       shadowSize: number
       highlightColor: color or number
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
  //提示设置
  tooltip:true,
  tooltipOpts:{
    show:true,
    defaultTheme:false,
    content: "%s | X: %x | Y: %y", //  string or function $s:标签名 %x x值 %y值
  }
  colors: [ color1, color2, ... ],

 

}
```

## data-toggle

### tooltip


**Example:**

```html

<a class="btn btn-danger" href="#" data-toggle="tooltip" data-placement="top" title="提示内容">顶部 tooltip</a>

//data-placement:显示位置 top bottom right left
//title: 提示内容

```

### popover

**Example:**

> 弹出普通文本

```html
<button type="button" class="btn btn-default" title="Popover title"
            data-toggle="popover" data-container="body" data-placement="left"
            data-content="左侧的 Popover 中的一些内容">
        左侧的 Popover
</button>
    
```

> 弹出html内容：

```html
<button class="btn btn-sm btn-info" data-toggle="popover" data-html="true" data-placement="top" data-content="<div class='scrollable' style='height:40px'>Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.</div>" title="" data-original-title='<button type="button" class="close pull-right" data-dismiss="popover">&times;</button>Popover on top'>Popover on top</button>
```

属性|默认值|说明
---|---|---|
data-placement|auto|规定如何定位弹出框（即`top` `bottom` `left` `right` `auto`）。
title|undefined|提示内容
data-content| undefined|弹出框内容
data-html|false|内容是否为html格式
data-trigger|click|定义如何触发弹出框： click  hover focus manual。您可以传递多个触发器，每个触发器之间用空格分隔。
data-container|false,当前元素的下方|向指定元素追加弹出框。e.g:container: 'body'
data-delay|0|延迟显示和隐藏弹出框的毫秒数 

### toggle-class

```html
<button type="button" class="btn btn-default"
            data-toggle="class:nav-off-screen, open" data-target="#nav,html">
        toggle class
</button>

//data-toggle="class:样式1,样式2,..."
//data-target="元素1,元素2"
//样式和元素位置一一对应
```

### toggle-panel

查看demo:

```html
<section class="panel panel-default">
 <header class="panel-heading text-right bg-light">
 <ul class="nav nav-tabs pull-left">
 <li><a href="#messages-2" data-toggle="tab"><i class="fa fa-comments text-default"></i></a></li>
 <li class="active"><a href="#profile-2" data-toggle="tab"><i class="fa fa-user text-default"></i> Profile</a></li>
 <li class="dropdown">
 <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-cog text-default"></i> Settings <b class="caret"></b></a>
 <ul class="dropdown-menu text-left">
 <li><a href="#dropdown1" data-toggle="tab">@fat</a></li>
 <li><a href="#dropdown2" data-toggle="tab">@mdo</a></li>
 </ul>
 </li>
 </ul>
 <a href="#" class="panel-toggle text-muted"><i class="fa fa-caret-down text-active"></i><i class="fa fa-caret-up text"></i></a>
 <span class="hidden-sm sr-only">Left tab</span>
 </header>
 <div class="panel-body">
 <div class="tab-content">
 <div class="tab-pane fade" id="messages-2">message</div>
 <div class="tab-pane fade active in" id="profile-2">profile</div>
 <div class="tab-pane fade" id="dropdown1">dropdown1</div>
 <div class="tab-pane fade" id="dropdown2">dropdown2</div>
 </div>
 </div>
 </section>
```


# Alert警告提示

## Notice通知提醒

* docs: [https://github.com/mouse0270/bootstrap-notify](https://github.com/mouse0270/bootstrap-notify)

**用法示例**

```js
//成功
$.notifyS(message, title, url = null)
//提示
$.notifyI()
//警告
$.notifyW()
//错误
$.notifyD()

//自定义
$.notify({
	// options
	message: 'Hello World' 
},{
	// settings
	type: 'danger'
});

//主要选项和设置
let notify = $.notify({
	// options
	icon: 'fa fa-user',
	title: 'Bootstrap notify',
	message: 'Turning standard Bootstrap alerts',
	url: 'https://github.com/mouse0270/bootstrap-notify',
	target: '_blank'
},{
    placement: {
		from: "top",
		align: "right"
	},
	delay: 5000,
});

notify.close();
notify.update('title', 'new title')

```



## Modal对话框提醒

> 使用 Jquery-confirm 插件。
> docs: [http://craftpip.github.io/jquery-confirm/index.html](http://craftpip.github.io/jquery-confirm/index.html)

**example**

```js
//alert: 只有一个OK按钮
$.alert(content, title)
OR
$.alert({
  content: '', //text html ajax(url:page.html)
  title: '', 
  type: 'default',//red, green, orange, blue, purple, dark
  columnClass: 'xs, s, m, l, xl', //s
  icon: '', //fa fa-user
  contentLoaded: function(data, status, xhr){}, //仅在ajax调用时使用 status:success|error
  theme: 'light', //主题 light, dark, modern, supervan, material, bootstrap
  containerFluid: false, //If true, will use the container-fluid layout, to use the full browser width.
  onContentReady: function(){},
  onOpenBefore: function(){},
  onOpen: function(){},
  onDestroy: function(){},
  onAction: function(buttonName){}, //任何按钮点击时被调用，返回buttonName
  buttons:{
    btn1: function(btn1){
        this.buttons.btn2.setText();//api:enable, disable, show, hide, addClass, removeClass
    },
    btn2: {
        text: '',
        btnClass: '', //btn-blue btn-red, btn-green, btn-orange, btn-purple, btn-dark
        keys: ['a', 'enter'],
        isHidden: false,
        isDisabled: false,
        action: function(btn2){}
    }
      
  }
    
})

//confirm: OK and Close button
$.confirm(content, title)
OR
$.confirm({/**options*/})

//dialog: 没有按钮
$.dialog(content, title)
OR
$.dialog({/**options*/})
```

**原生方法**

方法名|说明|示例
---|---|---
$.alert|默认含有一个确认按钮的提示 [alert](http://craftpip.github.io/jquery-confirm/index.html#alert)|`$.alert(content, title)`
$.confirm|默认含有 ok 和 cancel 按钮的提示 [confirm](http://craftpip.github.io/jquery-confirm/index.html#confirm)|`$.confirm(content, title)`
$.dialog|不包含按钮，有一个closeicon [dialog](http://craftpip.github.io/jquery-confirm/index.html#dialog)|`$.dialog(content)`

**已封装方法**

* content 内容
* title 标题
* urlOrCallback string:确认后要跳转的网址 function:确认后要执行的回调

方法名|说明|示例
---|---|---
$.alertI|消息|`$.alertI(content,title, urlOrCallback)`|
$.alertS|成功|`$.alertI(content,title, urlOrCallback)`|
$.alertD|错误|`$.alertI(content,title, urlOrCallback)`|
$.alertW|警告|`$.alertI(content,title, urlOrCallback)`|



# ajax

## 基本用法

> ### 例子


```
//普通点击

<button data-ajax="get.json" data-ajax-url="example.html" data-ajax-data="a=1&b=2"></button>
<button data-ajax="delete.json?id=1" data-loading data-loading-text="loading..."></button>

<!-- 加载前确认 -->

<button data-ajax="get.json" data-ajax-url="example.html" data-ajax-data="a=1&b=2" data-confirm="确认标题" data-confirm-content="确认提示内容"></button>

<!-- 加载内容在指定元素上显示 -->

<button data-ajax-url="" data-ajax="get.html" data-ajax-target="#test" data-loading="block.light"></button>

<div id="test"></div>

<!-- 自动加载内容到本元素上 -->

<div data-ajax="get.html.load" data-ajax-url="example.html" data-loading="block.dark"></div>

<!-- form表单提交 -->

<form action="post.html" data-ajax="post.json">
<button type="submit" data-loading></button>
</form>

```



> ### 属性

属性名|说明|默认
---|---|---
data-ajax| ajax绑定，格式: `method.dataType.eventType`| `get.json.click` 
data-ajax-url|访问地址|优先顺序为：ajaxUrl > herf > action
data-ajax-data|提交参数,json 或 string|`null`
method|提交方法get post |method 优先于 data-ajax中的方法
data-confirm|提交前确认，值为确认框标题 | `null`
data-confirm-content|确认框内容 | `null`
data-loading|加载时显示状态，text block.light block.dark| `null`
data-loading-text|加载时提示内容|loading...
data-loading-target|加载block显示在哪个元素上|默认为自己元素
data-ajax-target|显示的目标元素|默认为自己
data-table-form|当前form为table的关联form|#tableID (目标table的ID)
data-table-pager|当前元素为table的关联分页器|#tableID (目标table的ID)
data-ajax-build-callback|构建ajax事件，可用参数:this(自己) 参数:opts|如果返回 false;则会阻止ajax提交，可以ajax前检查
data-ajax-success-callback|成功后执行的回调脚本,可用参数:this(指向自己),可用参数: data,xhr,opts|如：成功后删除当前表格行：$(this).parents("tr").remove();
data-ajax-error-callback|失败后执行的回调脚本,this(指向自己),可用参数: status,xhr,opts|这里是js脚本

data-ajax 可用属性

属性名|可选值|默认
---|---|---|
method|get, post, put, patch, delete | get
dataType|json, xml, script, html | json
eventType|click(点击加载), load(立即开始加载) | click

> ### 方法

方法名|说明|示例
---|---|---
ajaxReload|重新加载ajax|$(elm).ajaxReload()
onAjaxBefore|ajax加载前监听，返回false中断ajax继续|$(elm).onAjaxBefore(event=>{})
onAjaxBuild|构建参数时监听，可以动态改变发送选项|$("#id").onAjaxBuild((ajaxOptions, event)=>{});
onAjaxSend|请求前|$("#id").onAjaxSend((xhr, ajaxOptions, event)=>{});
onAjaxError|请求错误|$("#id").onAjaxError((xhr, ajaxOptions, statusText, event)=>{});
onAjaxSuccess|请求成功|$("#id").onAjaxSuccess((data, xhr, ajaxOptions, event)=>{});
onAjaxDone|请求完成|$("#id").onAjaxDone((xhr, ajaxOptions, event)=>{});

> ###事件

事件名|说明|参数
---|---|---
ajax.before||$("#id").on('ajax.before',function(event){})
ajax.build||$("#id").on('ajax.build',function(event, ajaxOptions){})
ajax.send||$("#id").on('ajax.send',function(event, xhr, ajaxOptions){})
ajax.error||$("#id").on('ajax.error',function(event, xhr, ajaxOptions, statusText){})
ajax.success||$("#id").on('ajax.success',function(event, data, xhr, ajaxOptions){})
ajax.done||$("#id").on('ajax.done',function(event, xhr, ajaxOptions){})
form.init.rule|form初始化校验规则，可以在此定义字段校验规则|$("form").on('form.init.rule', function(events, options){options.rules = {username:'required'};options.messages = {username:'用户名必填'};})
form.validate.error|form会监听此事件，可以触发form此事件，达到让form显示自定义错误|$("form").trigger('form.validate.error', [{username:'用户名不能为空'}])
table.reload|表格加载事件，向table触发此事件以加载分页数据|$("table").trigger('table.reload',[page, perPage])


## dialog-form

> 对话框形式ajax加载打开form表单

**代码**

```html

<a class="btn btn-default" href="data.form.html"  data-ajax="get.html" data-dialog-form='{"title":"标题", "columnClass":"medium"}'>打开form</a>

//js手动方法

$.dialogForm({url:'', dataType:'html', method:'GET'}, {title:'',columnClass:'lg'})

简写方式 

$.dialogForm('url', 'title')

//加载的URL结果要包含form表单，确定按钮自动绑定submit事件，
//表单提交后怎么关闭

$("form").onAjaxSuccess(funciton(data,xhr,opts){
//form ajax数据提交成功
//opts.dialog.close()可关闭当前表单dialog

opts.dialog && opts.dialog.close()
})

```

* data-dialog-form 存放 string(dialog title) 或 json(options 选项)

**主要选项**

属性名|说明|默认|可选
---|---|---|---
columnClass|宽度| m | `xl` `l` `m` `s` `xs`
type|类型|`default`| blue, green, red, orange, purple & dark
theme|主题| `bootstrap`|'light', 'dark', 'supervan' 'material', 'bootstrap', modern

**主要方法**

方法名|说明
---|---|---
$.dialogForm

## 表格分页

### 代码

```html
//searchForm

<form class="form-inline" data-table-form="#userTable" data-ajax="get.json" data-error-placement="bottom-right" >
	<div class="form-group">
		<input type="text" name="username"  class="form-control input-sm"  placeholder="please input username" required data-rule-required="true">
	</div>
	<div class="form-group">
		<input type="text" name="email"  class="form-control input-sm"  placeholder="please input email" required>
	</div>
	<button class="btn btn-sm btn-primary" type="submit">Search</button>
	<button class="btn btn-sm btn-primary" type="button" onclick="reset()">Reset</button>
</form>
			
//table

<table class="table table-striped table-hover" id="userTable" data-ajax="get.html" data-ajax-url="table.data.html" data-loading="block.light">
	<thead>
		<tr role="row">
			<th width="20">
				<input type="checkbox" class="grp"/>
			</th>
			<th width="80" data-sort="id,asc">ID</th>
			<th width="150" data-sort="username">用户名</th>
			<th data-sort="nickname">昵称</th>
			<th>操作</th>
		</tr>
	</thead>
</table>
			

//page

<div class="pull-right">
   <div data-table-pager="#tableID"> </div>
  
   <!-- or -->

   <div data-table-pager="#tableID" data-per-size-opts="[5,10,20]" data-per-size="5" data-per-page="20">
   
   <!-- or -->
  
   <div data-table-pager="#tableID" data-show-total="false" data-show-per-size="false" data-show-go="false" data-show-page="false">
 
</div>

```

### 属性
* form 表格关联查询表单

属性名|说明|默认
---|---|---
data-table-form|当前form关联的表格元素|#tableID

* table th 表格头

属性名|说明|默认
---|---|---
data-sort|当前列是否参与排序 field.dir 字段和方向|如果指定dir排序方向，直当前字段为默认排序字段

* table page 分页器

属性名|说明|默认
---|---|---
data-table-pager|当前分页器关联的表格元素|#tableID
data-per-size-opts|分页大小可选列表|[5,10,20,30,50,100]
data-per-size|分页器大小，显示几个分页|5
data-per-page|每页记录显示记录数|20
data-show-total|是否显示记录总数|true
data-show-per-size|是否显示分页大小下拉框|true
data-show-go|是否显示分页跳转|true
data-show-page|是否显示分页按钮|true

* tableObj可用方法

属性名|参数|说明|默认
---|---|---|---
setData|data, clearOld=false|设置表格ajax提交默认数据|$("table").data('ajaxData')
reload|page, perPage, formData|重新加载

## table-tree

实现表格树效果

```html
<table 
	class="table table-striped table-hover table-tree"
	data-tree-column="0"
 	data-tree-cookie-name="table-tree-state"
 	data-tree-collapsed-class="fa fa-folder"
 	data-tree-expanded-class="fa fa-folder-open"
 	data-tree-leaf-class="fa fa-file">
 <thead> ... </thead>
 <tbody>
 	<tr data-tree-id="1" data-tree-parent="0" data-tree-leaf="0">
 	    <td> Root根目录1</td>
 	</tr>
  	<tr data-tree-id="11" data-tree-parent="1" data-tree-leaf="0">
 	    <td> 子目录</td>
 	</tr>
 	<tr data-tree-id="111" data-tree-parent="11" data-tree-leaf="1">
 	    <td> 子目录</td>
 	</tr>
 	<tr data-tree-id="112" data-tree-parent="11" data-tree-leaf="0">
 	    <td> 子目录</td>
 	</tr>
 	<tr data-tree-id="1111" data-tree-parent="112" data-tree-leaf="1">
 	    <td> 子目录</td>
 	</tr>
 	<tr 
 	   data-tree-id="2" 
 	   data-tree-parent="0"
 	   data-ajax="get.html"
 	   data-ajax-url="tr.html"
 	   data-ajax-data="a=1&b=2"
 	   data-tree-leaf-class="fa fa-file-o">
 	    <td> Root根目录2</td>
 	</tr>
 	
 </tbody>
</table>

```

**table-tree table 可用属性**

属性名|说明|默认
---|---|---
data-tree-column|节点显示在第几列|0
data-tree-cookie-name|节点状态保存的变量名|table-tree-state,系统有多个tree-table的话要设置成不同的
data-tree-collapsed-class|节点折叠时的样式|fa fa-plus
data-tree-expanded-class|节点展开时的样式|fa fa-minus
data-tree-leaf-class|叶子节点时的图标样式|无

**table-tree tr 可用属性**

属性名|说明|默认
---|---|---
data-tree-id|节点ID|必须
data-tree-parent|节点父ID|必须，为空时为根节点
data-tree-leaf|是否为叶子节点|可选 `1` or `0`
data-ajax|ajax功能|`get.html` method.数据类型
data-ajax-url|ajax提交网址|必须
data-ajax-data|ajax提交时参数|格式为:`a=1&b=2`
data-tree-leaf-class|叶子节点样式图标|如：fa fa-file-o

**Methods可用方法**

先获取表格树对象: `let table = $(".table-tree").data('tableTreeObj')`

方法名|说明|默认
---|---|---
table.collapseAll()|折叠所有节点|
table.collapse($tr)|折叠某个节点
table.expandAll()|展开所有节点|
table.expand($tr)|展开某个节点
table.getRootNodes()|获得所有根节点

**Event事件**

事件名称|说明| Example
---|---|---
collapse|折叠|`$('#node1').on('collapse', function(){alert(this);});`
expand|展开|`$('#node1').on('expand', function(){alert(this);});`
change|折叠或展开|`$('#node1').on('change', function(){alert(this);});`


## form-validate

表单验证插件，默认所有表单已进行validate插件初始化。可以配合data-ajax data-confirm 使用。不管是不是ajax模式提交，都会自动使用validate控件进行表单验证

> 相关教程

 * https://jqueryvalidation.org/
 * https://github.com/jquery-validation/jquery-validation
 * [所有内置验证方法](https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods)

> form.init.rule事件，validate在初始化表单的时候会发送。
 
参数|说明
---|---
options|当前validate选项，可以修改options.rules 和 options.messages


可用属性|对象|说明|默认
---|---|---|---
data-ignore-title | form | 是否忽略使用title作为错误提示 | true  false (默认true忽略）
data-error-placement|form | 错误信息显示位置 from-align | from: `top` or `bottom`  align: `left`, `center` or `right` 默认(top-right)

> 使用方法 

```html
<!--添加data-ajax属性交由ajax组件触发校验，否则绑定submit事件验证-->
 <form role="form" name="loginForm" data-ajax class="form-validate">
      <div class="form-group has-feedback">
          <input name="email2" type="email" class="form-control" required placeholder="please input email">
          <!--div.form-group添加 has-feedback 样式，并配合以下两行，会显示右侧对或错图标。-->
          <span class="form-control-feedback feedback-success"> <i class="fa fa-check"></i> </span>
          <span class="form-control-feedback feedback-error"> <i class="fa fa-times"></i> </span>
      </div>
      <div class="form-group">
          <!--直接在input上定义验证规则 格式：data-rule-规则名="参数"  -->
          <input name="password" type="password" class="form-control" data-rule-minlength="3" data-rule-maxlength="10" placeholder="Password">
      </div>
      <div class="form-group">
            <div class="checkbox">
                <label><input name="remember" type="checkbox" required> Remember me</label>
            </div>
      </div>
      <button type="submit" class="btn btn-sm btn-primary btn-block">Submit</button>
</form>

<script>

$(function () {
   //自定义验证规则及提示信息
   $("form").data('formRule',{rules: { password: {required: true, minlength:3}},
      messages: {password: {required: '密码必须输入', minlength: '密码最少3位'}}
   })
})

//手动验证

$("form").valid();

</script>
                    
```

### 添加验证规则方法:

* 直接在input上添加


```html
<form>
<input name="user" type="text" required data-rule-required="true">
<input name="email" type="email" required>
</form>

```


* js写法

```js
$(function(){
  $("form").data('formRule',{
        rules:{
          username:'required',
          password:{
            required:true,
            minlength:3,
            maxlength:12
          }
        },
        messages:{
          username:'用户名错误', 
          password:{
            required:'密码必须', 
            minlength:'长度不能少于3字符'
          }
        }
    })
  
})

```

* 监听事件，在事件中添加

```js

$("form").on('form.init.rule', function(events, options){

  options.rules = {
      username:'required'
  
  }
})

```

* 已包含自定义规则:

	* `data-rule-ismobile`:判断是否手机号
	* `data-rule-istel`:判断是否为电话号码或手机号
	* `data-rule-ischinese`: 判断是否全为中文字符
	* `data-rule-isenglish`: 判断是否全为英文字符
	
* 自定义规则脚本文件路径：`js/jquery-validation/extend-rules.js`
* 自定义中文messages脚本路径 `js/jquery-validation/local/messages_zh.js`


### form元素data主要属性和方法

```js
let validateObj = $("form").data('validateObj');//插件句柄
validateObj.options   //验证选项
validateObj.target    //form表单元素本身
validateObj.validator //jquery validate插件原生句柄

//手动校验表单，或直接显示错误内容。用于服务器验证出错显示。($("form").data('validateObj')).validOrShowError(errors)
//errors格式： {field:'错误信息', field2:['xxx','zzzz']}
validateObj.validOrShowErrors(errors); 

let validator = $("form").data('validator'); //jquery validate 句柄
validator.showErrors(errors);//显示错误信息
validator.form(); //校验
validator.focusInvalid(); //第一个错误元素获得焦点
```

# form-element


## checkbox

> link [http://getfuelux.com/javascript.html#checkbox](http://getfuelux.com/
javascript.html#checkbox)

> example:

```html
 <label class="zui-checkbox">
   <input type="checkbox"  name="ck" value="1" />  全选
 </label>
<label class="zui-checkbox">
  <input type="checkbox"  name="ck" value="2" checked/> checked 全选
</label>
<label class="zui-checkbox">
  <input type="checkbox"  name="ck" value="3" disabled/> disabled 全选
</label>
<label class="zui-checkbox">
  <input type="checkbox"  name="ck" value="4" disabled checked/> checked disabled 全选
</label>


```

获取选中checkbox值方法： `$("input[name=ck]").getval();


## radio

> link [http://getfuelux.com/javascript.html#radio](http://getfuelux.com/javascript.html#radio)

> example:


```html

<label class="zui-radio">
  <input type="radio"   name="ra" value="1"  /> normal
</label>
<label class="zui-radio">
  <input type="radio"   name="ra" value="2"  checked/> 2checked 全选
</label>
<label class="zui-radio">
  <input type="radio"  name="ra" value="3"  disabled/> disabled 全选
</label>
<label class="zui-radio">
  <input type="radio" name="ra" value="4"  disabled checked/> checked disabled 全选
</label>


```


获取选中radio值方法： `$("input[name=ra]").getval();


## select2

> link [https://select2.org/](https://select2.org/)  [select2-bootstrap-theme](http://select2.github.io/select2-bootstrap-theme/)
> 
> api [https://select2.org/configuration/options-api](https://select2.org/configuration/options-api)

> example:


```html
<select class="zui-select" data-tags="true" multiple dir="rtl">

 <optgroup label="Alaskan/Hawaiian Time Zone">
  <option value="AK">Alaska</option>
  <option value="HI">Hawaii</option>
 </optgroup>

</select>
```

## daterangepicker

非常好用的日期范围选择

* http://www.daterangepicker.com/
* https://github.com/dangrossman/bootstrap-daterangepicker

**e.g.**

```html
<input class="zui-date-range-picker" data-start-date="2017-5-3" data-end-date="2017-7-1" data-opens="right" data-date-limit='{"days":30}'>

```

**属性**

属性 | data | 说明 |默认值
---|--- | --- |---
startDate|data-start-date|开始日期|当天
endDate|data-end-date|结束日期|当天
opens|data-opens|窗口打开位置|'left'/'right'/'center'
dateLimit|data-date-limit|开始结束大最日期间隔|`{"days":30}` `{"months":1}`
dateLimitDays|data-date-limit-days|选择范围（天）|int
dateLimitMonths|data-date-limit-months|选择范围（月）|int
drops|data-drops|选择框打开方向| 'down' or 'up'
showDropdowns|data-show-dropdowns|年月下拉框可选| false
timePicker|data-time-picker|时间可选| false
timePicker24Hour|data-time-picker24-hour|24小时制| false
timePickerIncrement|data-time-picker-increment|分钟间隔时间|1
timePickerSeconds|data-time-picker-seconds|秒数是否可选|false
singleDatePicker|data-single-date-picker|是否单选一天|false
localeFormat|data-locale-format|格式|`YYYY-MM-DD`, 

**localeFormat可用属性**

* `YYYY` 年
* `MM` 月
* `DD` 日
* `H` 24小时制小时
* `h` 14小时制小时
* `mm` 分钟
* `ss` 秒
* `A` AM PM

## bootstrap-datepicker

bootstrap提供的一个日期组件

 * @git [https://github.com/uxsolutions/bootstrap-datepicker](https://github.com/uxsolutions/bootstrap-datepicker)
 * @demo [https://uxsolutions.github.io/bootstrap-datepicker](https://uxsolutions.github.io/bootstrap-datepicker)
 
**e.g.**
 
```html
//单选 必须包含样式: zui-bootstrap-datepicker
<input type="text" class="form-control zui-bootstrap-datepicker">

//range日期范围 必须包含样式：input-daterange zui-bootstrap-datepicker
<div class="input-daterange input-group zui-bootstrap-datepicker">
    <input type="text" class="input-sm form-control" name="start" />
    <span class="input-group-addon">to</span>
    <input type="text" class="input-sm form-control" name="end" />
</div>

//组件样式加上 class="zui-bootstrap-datepicker"
//日期范围组件加上 class="input-daterange"
```

**可用属性**

属性 | data | 说明 |默认值
---|--- | --- |---
format|data-date-format|日期格式|yyyy-mm-dd
clearBtn|data-date-clear-btn|显示清空按钮|false
todayBtn|data-date-today-btn|显示今日按钮|false `true`回到当天的日期位置但不设置 <br>`linked` 设置为当天日期
orientation|data-date-orientation|组件显示方向|auto 由`auto`, `top`, `bottom`, `left`, `right` 一个或两个组件
startDate|data-date-start-date|最小日期|日期格式字符串`2017-10-01`
endDate|data-date-end-date|最大日期|`2017-10-31` 必须由 `format` 能够解析
autoclose|data-date-autoclose|自动关闭|true
startView|data-date-start-view|打开时显示的视图|0:days(默认) 1:months(月) 2:years(年) 3:decades(十年) 4:centuries(百年）

**日期格式说明**

* d, dd: 数字日期，无前导0和有前导0. Eg, 5, 05.
* D, DD: 星期几缩写和全称. Eg, Mon, Monday.
* m, mm: 数字月份. Eg, 7, 07.
* M, MM: 月份缩写和全称. Eg, Jan, January
* yy, yyyy: 2位或4位数年份. Eg, 12, 2012.

## Cascade

无限级联下拉框，支持ajax动态查询显示和一次性加载完数据

demo:

```html
<div 
   id = "cascadeProv"
	data-cascade="province,city,district"
	data-cascade-data="data/xxx.json"
	data-cascade-url="data/region.php"
	data-cascade-ajax="get.json">
	<select name="province" class="form-control" data-value="默认值">
	    <option>请选择省份</option>
	</select>
	<select name="city" class="form-control" >
	    <option>请选择市</option>
	</select>
	<select name="district" class="form-control" >
	    <option>请选择区县</option>
	</select>
</div>

```


无限级联组件的数据加载方式有以下三种可以任选一种：

* ajax一次性数据加载
* ajax动态加载
* 组件初始化时加载好

### 属性

属性  | 说明 |例子
---|--- | --- 
data-cascade| 级联目标对象列表（必填）不带# .就是name | a,b,c 
data-cascade-data|一次性数据加载地址（请见数据格式1) | url
data-cascade-url|动态加载地址(详见数据格式2）| url
data-cascade-ajax|请求方式和请求数据类型|get.json

data-cascade-data 数据格式

```json

[
  {name:"江西",val:"江西",children:[{},...]},
  {name:"上海",val:"上海",children:[]}

]
```

data-cascade-url 动态请求时参数例子

```html
//查询全国所有省份（第一级）
http://test.dev/region?query=province

//查询江西省全有市（第二级)
http://test.dev/region?query=city&province=江西

//查询江西省上饶地区所有区县（第三级）
http://test.dev/region?query=province&province=江西&city=上饶

```

返回格式可以是字符串、对象或html

```json
['北京','上海','江西']

[{name:"北京", val:"北京"}...]

<option value="北京">北京</option>

```

### 方法

$.fn.uiCascade = function(data)

在页面中直接初始级联数据

demo:

```js

$(function(){
  let data = [{"name": "北京", "val": "北京", "children":[]}];

  $("#cascadeProv").uiCascade(data);
})


```



# jquery-cookie

一个轻量级的cookie 插件，可以读取、写入、删除 cookie。

1.添加一个会话 cookie： 

注：当没有指明 cookie有效时间时，所创建的cookie有效期默认到用户关闭浏览器为止，所以被称为“会话cookie（session cookie）”。 


```js
$.cookie('the_cookie', 'the_value'); 

```

2.创建一个cookie并设置有效时间为 7天: 


```js
$.cookie('the_cookie', 'the_value', { expires: 7 }); 
```

3.创建一个cookie并设置 cookie的有效路径： 

```js
$.cookie('the_cookie', 'the_value', { expires: 7, path: '/' }); 
```

4.读取cookie

```js
$.cookie('the_cookie'); // cookie存在 => 'the_value' 
$.cookie('not_existing'); // cookie不存在 => null 

```

5.删除cookie

```js
$.cookie('the_cookie', null); 
```

参数说明

参数 | 说明 |默认值
---|--- | --- 
expires|过期时间，单位天|会话cookie，将在用户退出浏览器时被删除
path|能读取当前cookie的路径，设置为 `/` 为整个网站可读取|创建 cookie 的网页所在路径（标准浏览器的行为）
domain|`domain: 'example.com' `所有子域名能读|创建 cookie的网页所拥有的域名。 
secure|如果为true，cookie的传输需要使用安全协议（HTTPS）。| false 
raw:|如果为true,读写时不自动编码和解码 | false （使用encodeURIComponent 编码， decodeURIComponent 解码）




# 相关样式说明

```
//很多情况下按钮激活和未激活是可以显示不同的ico 
//可以结合data-toggle=class 插件很多事情可以简单化
//未激活时显示
<a href="#" class="panel-toggle text-muted">
	<!--隐藏-->
	<i class="fa fa-caret-down text-active"></i>
	<!--显示-->
	<i class="fa fa-caret-up text"></i>          
</a>

//添加active类激活后自动显示另一个ico

<a href="#" class="panel-toggle text-muted active">
	<!--显示-->
	<i class="fa fa-caret-down text-active"></i>
	<!--隐藏-->
	<i class="fa fa-caret-up text"></i>          
</a>

```

## 特性

#### Button and Link

- 滚动到指定元素
```html
template:
<a href="#id" data-jump="true">text</a>

<section class="adminUI" id="content">
...
</section>
<p class="text-center">
    <a href="#content" data-jump="true" class="btn btn-icon btn-rounded">
        <i class="fa fa-angle-up"></i>
    </a>
</p>
```

#### [DateRangePicker](src/components/date-range-picker.md) 

