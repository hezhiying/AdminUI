import ToggleClass from './toggle-class'
import TogglePanel from './toggle-panel'
import tooltip from './tooltip'
import popover from './popover'

let compents = {ToggleClass, TogglePanel, tooltip, popover};

//合并配制
let config;
for(let item of Object.values(compents)){
  config = $.extend(true, {}, config, item.config||{});
}

export default {
	config,
  onload:function () {
	  //依次加载
    for(let item of Object.values(compents)){
      //组件初始化
      if (item.onload) {
        item.onload();
      }
    }
  },
  event:function (elm, event) {
    for(let item of Object.values(compents)){
      //组件初始化
      if (item.event) {
        item.event(elm, event);
      }
    }
  }
}