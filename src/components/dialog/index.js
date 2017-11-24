import 'jquery-confirm'

let alertFun = function (type, content, title = null, urlOrCallback = null, icon) {
  let types = [ 'blue', 'green', 'red', 'orange', 'purple' , 'dark'];
  if(!types.includes(type)){
    type = 'default';
  }
  $.alert({
    icon:icon,
    title:title,
    content:content,
    type:type,
    buttons:{
      ok:{
        keys: ['enter'],
        text:$.lang('button.ok'),
        action(){
          typeof urlOrCallback === 'string' && (window.location.href = urlOrCallback);
          typeof urlOrCallback === 'function' && (urlOrCallback.call(this));
        }
      }
    }
  })
};
($ => {
  $.alertI =function (content, title = null, urlOrCallback = null) {
    title = title ? title : $.lang('alert.title.info');
    alertFun('blue', content, title, urlOrCallback, 'fa fa-info-circle')
  };
  $.alertS =function (content, title = null, urlOrCallback = null) {
    title = title ? title : $.lang('alert.title.success');
    alertFun('green', content, title, urlOrCallback, 'fa fa-check-circle')
  };
  $.alertD = function (content, title = null, urlOrCallback = null) {
    title = title ? title : $.lang('alert.title.error');
    alertFun('red', content, title, urlOrCallback, 'fa fa-times-circle')
  };
  $.alertW = function (content, title = null, urlOrCallback = null) {
    title = title ? title : $.lang('alert.title.warning');
    alertFun('orange', content, title, urlOrCallback, 'fa fa-warning')
  };

  //页面加载完成时处理
  $(() => {
    $('body').on('click', '[data-dialog]', function () {
      let $this = $(this);
      if ($this.data('dialog')) {
        let content = $($this.data('dialog'));
        if (content.length === 1) {
          let be = $.Event('build.dialog');
          be.dialogTitle = $this.data('dialogTitle') || false;
          be.dialogType = $this.data('dialogType') || 'default';
          be.dialogWidthClass = $this.data('dialogWidthCls') || false;
          be.buttons = false;
          $this.trigger(be);
          if (!be.isDefaultPrevented()) {
            content = content.html();
            let opts = {
              title: be.dialogTitle || false,
              content: content,
              type: be.dialogType || 'default',
              closeIcon: true,
              containerFluid: true,
              theme: 'ui-1',
              alignMiddle: true,
              closeIconClass: 'fa fa-close',
              onContentReady: function () {
                $.adminUI.initElement($(this.$content));
              },
              onOpen: function () {
                console.log(this);
                this.$el.scrollTop(0);
              },
              onDestroy: function () {
                $.adminUI.destroyElement($(this.$content));
              },
              columnClass: 'm'
            };
            if (be.dialogWidthClass) {
              opts.columnClass = be.dialogWidthClass;
            }
            console.log('opts.columnClass', opts.columnClass);
            if (be.buttons) {
              opts.buttons = be.buttons;
              $.confirm(opts);
            } else {
              $.dialog(opts);
            }
          }
        }
      }
      return false;
    });
  });
})(jQuery);
