import CONFIG from '../config.js';
/**
 * 表单验证插件
 * https://jqueryvalidation.org/
 * https://github.com/jquery-validation/jquery-validation
 */

($ => {

  let notifyHandle = {};

  let notifyError = function (message, title, placement) {
    placement = (placement || 'top-right').split('-');
    if(placement.length !== 2){
      placement = ['top', 'right'];
    }
    let from = placement[0];
    let align = placement[1];
    return $.notify({
      title: title ? '<strong>'+title+'</strong> ' : '',
      message: message,
      icon: 'fa fa-warning'
    }, {
      type: 'danger',
      newest_on_top: true,
      z_index: 9000,
      delay:5000,
      placement: {from, align}
    })
  };

  /**
   * 处理自定义表单规则
   * @e.g
   * $("#formID").data('formRule',{rules:{},messages:{}});
   *
   * @param formRule
   * @returns {*}
   */
  const prepareValidateRule = function (formRule) {
    if (!formRule) {
      return {};
    }
    if ('object' !== typeof formRule) {
      formRule = $.parseJSON(formRule);
    }
    if (formRule.rules) {
      for (let i in formRule.rules) {
        for (let j in formRule.rules[i]) {
          if (j === 'pattern') {
            eval('var rule = ' + formRule.rules[i][j] + ';');
            formRule.rules[i][j] = rule;
          }
        }
      }
    }
    return formRule;
  };

  /**
   * 自定义错误显示位置
   * @param error   新的错误内容含元素
   * @param element 表单控件元素
   */
  const errorPlacement = function (error, element) {
    //判断是否要在当前元素下显示错误提示
    if($(this.currentForm).data('errorPlacement')){
      return ;
    }
    if (element.is('[type=checkbox]') || element.is('[type=radio]')) {
      //如果是checkbox 或 radio 控件，手动处理
      let wrap = element.closest('div');
      if (wrap.is('.checkbox') || wrap.is('.radio')) {
        wrap = wrap.parent().closest('div');
      }
      if (wrap.children('span').length) {
        error.insertBefore(wrap.children('span'));
      } else {
        error.appendTo(wrap);
      }
    }else if(element.is('select.zui-select')){
      //select2下拉框时处理
      error.insertAfter(element.nextAll('.select2-container'));
    } else {
      //其它控件，错误内容显示在控件之后
      let e = $.Event('form.placement');
      element.trigger(e, [error, element]);
      if (!e.isDefaultPrevented()) {
        /**
         * 情况1 如果控件是在input-group下
         * <div class="form-group"><div class="input-group"><input></div> {这里放错误信息}</div>
         */
        if(element.parent('.input-group').length){
          error.insertAfter(element.parent('.input-group'));
        }else if (element.next('.input-group-btn').length || element.prev('.input-group-btn').length) {
          //如果input后面同级元素直放到外面
          (element.parents('div.form-group') || element.parent('div')).append(error);
        } else {
          error.insertAfter(element);
        }
      }
    }
  };

  /**
   * 验证失败时
   * @param element
   * @param errorClass
   * @param validClass
   */
  const highlight = function (element, errorClass, validClass) {
    ($(element).parents('.form-group') || $(element).parent()).removeClass("has-success").addClass("has-error");

    /*  if ($(element).is('[type=checkbox]') || $(element).is('[type=radio]')) {
        let wrap = $(element).closest('div');
        if (wrap.is('.checkbox') || wrap.is('.radio')) {
          wrap = wrap.parent().closest('div');
        }
        wrap.removeClass("has-success").addClass("has-error");
      } else {
        ($(element).parents('.form-group') || $(element).parent()).removeClass("has-success").addClass("has-error");
      }*/
  };

  /**
   * 验证通过时
   * @param element
   * @param errorClass
   * @param validClass
   */
  const unhighlight = function (element, errorClass, validClass) {
    ($(element).parents('.form-group') || $(element).parent()).removeClass("has-error").addClass("has-success");

    //成功时，将对应的notify通知类型改为success
    let id = element.name + '-notify-error';
    if($('#' + id).length){
      notifyHandle[id].update({message:'校验成功', title: '<strong>' + element.name + '</strong>', type: 'success', icon: 'fa fa-check'})
    }


    //notifyHandle[element.name] && notifyHandle[element.name].update({type: 'success', message: element.name, icon: 'fa fa-check'})
    /* if ($(element).is('[type=checkbox]') || $(element).is('[type=radio]')) {
       let wrap = $(element).closest('div');
       if (wrap.is('.checkbox') || wrap.is('.radio')) {
         wrap = wrap.parent().closest('div');
       }
       wrap.removeClass("has-error").addClass("has-success");
     } else {
       ($(element).parents('.form-group') || $(element).parent()).removeClass("has-error").addClass("has-success");
     }*/
  };

  /**
   * 表单验证类
   * @param form
   * @constructor
   */
  const Validator = function (form) {
    // this.form                 = form;
    this.target = form;
    //validate 验证选项
    this.options = prepareValidateRule(form.data('formRule'));

    //如果有ajax插件，则不绑定提交事件（交由ajax组件来通知表单骓），否则绑定提交事件（提交时会自动验证）
    this.options.onsubmit = false;
    if (typeof form.data('ajax') === 'undefined' ){
      this.options.onsubmit = true;
    }
    this.options.ignoreTitle = form.is('[data-ignore-title]') ? form.data('ignoreTitle') : true;      //忽略标题作为错误提示内容
    this.options.highlight = highlight;     //失败时回调
    this.options.unhighlight = unhighlight; //成功时回调

    this.options.errorClass = 'parsley-error help-block';
    this.options.validClass = 'parsley-success';
    this.options.errorPlacement = errorPlacement;

    this.options.errorElement = "span";
    // this.options.wrapper = 'ul';
    this.options.wrapperClass = 'parsley-error-list';

    this.options.debug = false;

    //自定义错误显示逻辑
    this.options.showErrors = function (errorMap, errorList) {

      //判断是否要以右侧notify形式显示错误
      let placement = $(this.currentForm).data('errorPlacement');
      if(placement){
        let err = '';
        for(let key in errorMap){
          err += '<li><strong>' + key + '</strong> '+ errorMap[key];

          let id = key + '-notify-error';
          if($('#' + id).length){
            notifyHandle[id].update({message:errorMap[key], title: '<strong>' + key + '</strong>', type: 'danger', icon: 'fa fa-warning'})
          }else{
            notifyHandle[id] = notifyError(errorMap[key], key, placement);
            notifyHandle[id].$ele.attr('id', id);
          }
        }
      }
      //调用系统错误处理方法
      this.defaultShowErrors()
    };


    /**
     * 可以通过事件定制高级验证规则
     * @e.g
     * $("form").on("form.init.rule",function(event){
     *    event.validateOptions.rules = {}
     *    event.validateOptions.messages = {}
     * })
     */
    let event = new $.Event(CONFIG.EVENT.FORM_INIT_RULE);
    // event.validateOptions = this.options;
    form.trigger(event, this.options);

    //验证器句柄
    this.validator = form.validate(this.options);

    //监听ajax.before事件，提交form表单前进行验证
    let me = this;

    /**
     * ajax请求前先检测表单
     */
    form.onAjaxBefore(function () {
      return me.validOrShowErrors(); //返回验证结果成功还是失败，返回false ajax将停止提交
    });

    //监听ajax.build事件，序列化表单数据
    form.on(CONFIG.EVENT.AJAX_BUILD, function (event, ajaxOptions) {
      if($(this).is($(event.target))){
        ajaxOptions.data = form.serializeObject();
      }
    });

    /**
     * 当提交ajax时，button状态更改为loading状态
     */
    form.on(CONFIG.EVENT.AJAX_SEND, function (event) {
      if($(this).is($(event.target))){
        form.find("button[data-loading]").button('loading');
      }
    });

    //当完成时，处理校验失败 及恢复button loading状态
    form.on('ajax.error ajax.done', function (event, xhr) {
      if($(this).is($(event.target))){
        form.find("button[data-loading]").button('reset');
        if ((xhr.status === 422 || xhr.status === 423) && xhr.responseJSON && xhr.responseJSON.errors) {
          return me.validOrShowErrors(xhr.responseJSON.errors);
        }
      }
    });

    //监听表单校验失败事件, ajax提交骓失败后触发这个事件
    form.on(CONFIG.EVENT.FORM_VALIDATE_ERROR, function (event, errors) {
      if($(this).is($(event.target))){
        me.validOrShowErrors(errors);
      }
    });

    //注册销毁事件
    form.closest('.adminUI').on('adminUI.destroy', this.destroy);
  };

  /**
   * 验证表单或直接显示错误信息
   * @param errors
   * @returns {boolean}
   */
  Validator.prototype.validOrShowErrors = function (errors) {
    if (!this.validator) {
      return false;
    }
    if (this.validator.form()) {
      //如果验证表单通过但是errors不为空直直接显示错误信息
      if (errors) {
        this.validator.showErrors(errors);
        this.validator.focusInvalid(); //第一个错误元素获得焦点
        return false;
      }
      if (this.validator.pendingRequest) {
        this.validator.formSubmitted = true;
        return false;
      }
    }else{
      this.validator.focusInvalid(); //第一个错误元素获得焦点
    }

    //返回验证结果
    return this.target.valid();
  };
  //销毁
  Validator.prototype.destroy = function () {
    if (this.validator) {
      this.validator.destroy();
      this.validator = null;
    }
  };

  $.fn.uiForm = function () {
    let me = $(this);
    if (me.length) {
      RequireJC(['validator'], () => {
        me.each(function () {
          let $this = $(this);
          if (!$this.data('validateObj')) {
            /**
             * 初始化表单验证插件
             * validateObj 有3个对象
             * @target 当前表单
             * @options validate options 验证选项
             * @validator jquery.validate 对象
             */
            $this.data('validateObj', new Validator($this));
          }
        });
      });
    }
    return me;
  };

//	$(() => {
//		$(document).on('ajax.build', 'form[data-ajax]', function (e) {
//			e.opts.data = $(this).serializeArray();
//		}).on('adminUI.init', '.adminUI', function () {
//			$(this).find('form[data-validate]').uiForm();
//		});
//	});
})(jQuery);
export default {
  config: {
    paths: {
      validator: ['js/jquery-validation/local/messages_zh.js','js/jquery-validation/extend-rules.js'],
    },
    dep:{
      validator:'js/jquery-validation/jquery.validate.js'
    }
  },
  onload: () => {
    $('form').uiForm();
  },
  event: (elm) => {
    $(elm).find('form').uiForm();
  }
}