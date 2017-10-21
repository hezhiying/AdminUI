import 'jquery-confirm'


($ => {
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
