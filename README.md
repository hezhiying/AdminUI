# AdminUI


### 所有特性
- [占位符 placeholder](#placeholder)
- [全屏显示 fullscreen](#fullscreen)
- [漂亮滚动条 slimScroll](#slimScroll)
- [通知插件 notify](#notify)

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
