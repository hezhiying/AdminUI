import './jquery.blockUI'
import TransformCodeHtml from './transform.code.html'

let components = {TransformCodeHtml};

/**
 * 安装blockUI功能
 */
let installBlockUI = function () {
  let blockOpts = {
    message: ' <span class="fa-lg"><i class="fa fa-spinner fa-spin "></i> loading...</span>',
    css: {
      backgroundColor: "none",
      border:"none",
      color:"#fff",
      cursor:"wait",
      left:"35%",
      margin:0,
      padding:0,
      textAlign:"center",
      top:"40%",
      width:"30%"
    },
    overlayCSS: {
      backgroundColor: '#2e3e4e',
      opacity: 0.85,
      cursor: 'wait'
    },
  };
  $.blockUI.defaults = $.extend($.blockUI.defaults, blockOpts);
};


//合并配制
let config;
for(let item of Object.values(components)){
  config = $.extend(true, {}, config, item.config||{});
}
export default {
  config,
  onload: () => {
    installBlockUI();

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