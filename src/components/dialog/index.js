import 'jquery-confirm'
import larError from '../vue/larave-error.vue'

($ => {
  //页面加载完成时处理
  $(() => {
    $.showLaravelError = function (larErrors, statusCode = '', statusText = '', type = 'json') {
      let html = '<div id="lar-error-tab"><lar-error :errors="errors"></lar-error></div>';
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
          let dialog = this.$content;
          new Vue({
            components: {larError},
            el: "#lar-error-tab",
            data: {
              errors: larErrors
            }
          });

          $.adminUI.initElement($(this.$content));
        },
      }
      $.dialog(opts);

    };
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
