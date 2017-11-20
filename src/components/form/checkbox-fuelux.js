import Utils from '../../utils/utils'
/**
 * http://getfuelux.com/javascript.html#checkbox
 * http://getfuelux.com/javascript.html#radio
 * example <label class="zui-checkbox"><input type="checkbox" checked> checkbox</label>
 * example <label class="zui-radio"><input type="radio" checked> radio</label>
 */

$(function () {
  $.fn.uiCheckbox = function () {
    if(this.length) {
      RequireJC('checkbox', () => {
        Utils.lazyRun(()=>$.fn.checkbox !== undefined, ()=>{
          $(this).each((i, e) => {
            const $this = $(e);
            if ($this.data('checkboxObj')) {
              return;
            }
            $this.data('checkboxObj', true);
            $this.find('input[type=checkbox]').after('<i class="fa fa-fw fa-square-o"></i>');
            $this.checkbox();
          });
        })
      });
    }
  };

  $.fn.uiRadio = function () {
    if(this.length) {
      RequireJC('fuelux.radio', () => {
        Utils.lazyRun(()=>$.fn.radio !== undefined, ()=>{
          $(this).each((i, e) => {
            const $this = $(e);
            if ($this.data('radioObj')) {
              return;
            }
            $this.data('radioObj', true);
            $this.find('input[type=radio]').after('<i class="fa fa-circle-o"></i>');
            $this.radio();
          });
        });

      });
    }
  };

});
//, 'js/fuelux/fuelux.css'
export default {
  config:{
    paths:{
      'checkbox':['js/fuelux/checkbox.js'],
      'fuelux.radio':['js/fuelux/radio.js'],
    },
    dep:{
    }
  },
  onload:()=>{
    $('.zui-checkbox').uiCheckbox();
    $('.zui-radio').uiRadio();
  },
  event:(elm)=>{
    $(elm).find('.zui-checkbox').uiCheckbox();
    $(elm).find('.zui-radio').uiRadio();
  }
}