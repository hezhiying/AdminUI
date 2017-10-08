# AdminUI


### 所有特性
- [占位符 placeholder](#placeholder)
- [全屏显示 fullscreen](#fullscreen)
- [漂亮滚动条 slimScroll](#slimScroll)
- [通知插件 notify](#notify)
- [jquery-confirm](#jquery-confirm)
- [tooltip](#tooltip)
- [landing 让元素在进入视野里产生动画效果](#landing)
- [loading-bar loadingBar加载效果](#loading-bar)
- [daterangepicker日期范围](#daterangepicker)
- [bootstrap-datepicker](#bootstrap-datepicker)

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

## notify

[https://github.com/mouse0270/bootstrap-notify](https://github.com/mouse0270/bootstrap-notify)

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

## jquery-confirm
[http://craftpip.github.io/jquery-confirm/index.html](http://craftpip.github.io/jquery-confirm/index.html)

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

## tooltip

https://github.com/krzysu/flot.tooltip

http://www.flotcharts.org/

**e.g.**
```html
<!--data-toggle="tooltip"-->

<a class="btn btn-danger" href="#" data-toggle="tooltip" data-placement="top" title="sssfsafsf">link button</a>

```

**属性**

属性 | data | 说明  |默认
---|--- |---|---
placement|data-placement|显示位置|top`bottom right left`
title|title|内容|

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
## daterangepicker
非常好用的日期范围选择
* http://www.daterangepicker.com/
* https://github.com/dangrossman/bootstrap-daterangepicker

**e.g.**

```html
<input date-range-picker data-start-date="2017-5-3" data-end-date="2017-7-1" data-opens="right" data-date-limit='{"days":30}'>
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

### localeFormat可用属性
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

 * @git https://github.com/uxsolutions/bootstrap-datepicker
 * @demo https://uxsolutions.github.io/bootstrap-datepicker
 
 **e.g.**
 ```html
//单选 必须包含样式: datepicker-input
<input type="text" class="form-control datepicker-input">

//range日期范围 必须包含样式：input-daterange datepicker-input
<div class="input-daterange input-group datepicker-input">
    <input type="text" class="input-sm form-control" name="start" />
    <span class="input-group-addon">to</span>
    <input type="text" class="input-sm form-control" name="end" />
</div>

//组件样式加上 class="datepicker-input"
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

