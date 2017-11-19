import Checkbox from './checkbox-fuelux'
import Select2 from './jquery.select2'
import DateRangePicker from './date-range-picker'
import BootstrapDatepicker from './bootstrap-datepicker'

let components = {Checkbox, Select2, DateRangePicker, BootstrapDatepicker};

//合并配制
let config;
for(let item of Object.values(components)){
  config = $.extend(true, {}, config, item.config||{});
}

export default {
  config,
  onload: () => {
    //依次加载初始化
    for(let item of Object.values(components)){
      item.onload && item.onload();
    }
  },
  event: (elm, event) => {
    //依次加载事件
    for(let item of Object.values(components)){
      item.event && item.event(elm, event);
    }
  }
}