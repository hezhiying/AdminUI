/**
 *
 * @param ajaxOpts
 * @param dialogOpts
 * @returns {boolean}
 *
 * columnClass xl l m s sm
 * theme 'light', dark 'supervan' 'material', 'bootstrap', modern
 * type  'blue, green, red, orange, purple & dark'
 * btnClass btn-primary btn-inverse btn-warning btn-info btn-danger btn-success.
 * btnClass btn-blue btn-green btn-red btn-orange btn-purple btn-default btn-dark
 */
$.dialogForm = function (ajaxOpts, dialogOpts) {
  let defAjaxOpts = {
    dataType: 'html',
    method: 'GET'
  };
  let defDialogOpts = {
    columnClass: 'medium',
    theme: 'bootstrap',
    type: 'blue',
    buttons: {
      save: {
        text: $.lang('button.save'),
        btnClass: 'btn-primary',
        keys: ['enter'],
        action() {
          this.$content.find('form').submit();
          return false;
        }
      },
      cancel: {
        text: $.lang('button.cancel')
      }
    },
    onContentReady: function () {
      $.adminUI.initElement(this.$content.children());
      let dialog = this;
      this.$content.find('form').onAjaxBuild(function (ajaxOptions) {
        ajaxOptions.dialog = dialog;
      })
    }
  };

  //合并ajax选项
  if(typeof ajaxOpts === 'string'){
    defAjaxOpts.url = ajaxOpts;
  }else if(typeof ajaxOpts === 'object'){
    $.extend(defAjaxOpts, ajaxOpts || {});
  }

  //合并dialog选项
  if(typeof dialogOpts === 'string'){
    defDialogOpts.title = dialogOpts;
  }else if(typeof dialogOpts === 'object'){
    defDialogOpts = $.extend(true, defDialogOpts, dialogOpts || {});
  }

  //初始化dialog ajax选项
  defDialogOpts.content = function () {
    let self = this;
    return $.ajax(defAjaxOpts).done(function (html) {
      self.setContent(html);
    });
  };
  $.confirm(defDialogOpts);
};

const  DialogForm = function ($elm) {
  let $this = this.target = $elm;

  let opts = $this.data('dialogForm');

  let dialogOpts = {};
  if(typeof opts === 'string'){
    dialogOpts.title = opts;
  }else if(typeof opts === 'object'){
    dialogOpts = $.extend(true, {}, dialogOpts, opts || {});
  }

  this.target.onAjaxBuild(function (ajaxOptions, event) {
    //拦截阻止按钮的ajax.build事件。使用dialog方式打开form
    let ajaxOpts = {
      url: ajaxOptions.url,
      dataType: ajaxOptions.dataType,
      method: ajaxOptions.method
    };
    $.dialogForm(ajaxOpts, dialogOpts);

    return false;
  });

};


$.fn.uiDialogForm = function () {
  let me = $(this);
  me.each(function (i, elm) {
    let $this = $(elm);
    if (!$this.data('dialogFormObj')) {
      $this.data('dialogFormObj', new DialogForm($this));
    }
  });
};

export default {
  config: {},
  onload: () => {
    $('[data-dialog-form]').uiDialogForm();
  },
  event: (elm) => {
    $(elm).find('[data-dialog-form]').uiDialogForm();
  }
}
