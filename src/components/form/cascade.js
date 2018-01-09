import {CascadeSelect} from "./cascade-select";
import {CascadeInput} from "./cascade-input";

$.fn.cascade = function (data) {
  $(this).each((i, e) => {
    const $this = $(e);
    //初始化级联树型数据格式为：[{name,val,children:[]}]
    if (data && $this.data('cascadeObj')) {
      $this.data('cascadeObj').setData(data)
    }
    if ($this.data('cascadeObj')) {
      return;
    }

    if($this.is('input')){
      $this.data('cascadeObj', new CascadeInput($this));
    }else{
      $this.data('cascadeObj', new CascadeSelect($this));
    }
  });
};

export default {
  onload: () => {
    $('.zui-cascade').cascade();
  },
  event: (elm) => {
    $(elm).find('.zui-cascade').cascade();
  }
}