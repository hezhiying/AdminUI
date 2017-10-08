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
drops|data-drops|选择框打开方向| 'down' or 'up'


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