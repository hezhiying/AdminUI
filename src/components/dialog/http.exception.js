import larError from '../vue/larave-error.vue';

/**
 * 显示http异常弹出框
 * @param larErrors laravel异常JSON格式
 * @param statusCode 错误代码
 * @param statusText 错误标题
 * @param type 类型 html or json  default:json
 */
let showExceptionDialog = function (larErrors, statusCode = '', statusText = '', type = 'json') {
  RequireJC.addPath('vue', 'js/vue/vue.min.js');
  let htmlId = "lar-error-tab-" + new Date().getTime();
  let html = '<div id="'+htmlId+'"><lar-error :errors="errors"></lar-error></div>';
  let title = larErrors.message || statusText;
  let opts = {
    title: title + " " + statusCode,
    content: type === 'json' ? html : larErrors,
    type: 'red',
    closeIcon: true,
    containerFluid: true,
    theme: 'dark',
    alignMiddle: true,
    columnClass: 'm',
    closeIconClass: 'fa fa-close',
    onContentReady: function () {
      RequireJC('vue', function(){
        new Vue({
          components: {larError},
          el: "#"+htmlId,
          data: {
            errors: larErrors
          }
        });
      });
      $.adminUI.initElement($(this.$content));
    },
  };
  $.dialog(opts);
};
export {showExceptionDialog}