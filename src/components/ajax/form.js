import CONFIG from '../config.js';
/**
 * 表单验证插件
 * https://jqueryvalidation.org/
 * https://github.com/jquery-validation/jquery-validation
 */

($ => {

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

    this.options.ignoreTitle = true;
    this.options.highlight = highlight;     //失败时回调
    this.options.unhighlight = unhighlight; //成功时回调

    this.options.errorClass = 'parsley-error help-block';
    this.options.validClass = 'parsley-success';
    this.options.errorPlacement = errorPlacement;

    this.options.errorElement = "span";
    // this.options.wrapper = 'ul';
    this.options.wrapperClass = 'parsley-error-list';

    this.options.debug = false;


    /**
     * 可以通过事件定制高级验证规则
     * @e.g
     * $("form").on("form.init.rule",function(event){
     *    event.validateOptions.rules = {}
     *    event.validateOptions.messages = {}
     * })
     */
    let event = new $.Event(CONFIG.EVENT.FORM_INIT_RULE);
    event.validateOptions = this.options;
    form.trigger(event);

    //验证器句柄
    this.validator = form.validate(this.options);

    //监听ajax.before事件，提交form表单前进行验证
    let me = this;
    form.on(CONFIG.EVENT.AJAX_BEFORE, function (event) {
      return me.validate(); //返回验证结果成功还是失败，返回false ajax将停止提交
    });

    //注册销毁事件
    form.closest('.adminUI').on('adminUI.destroy', this.destroy);
  };

  /**
   * 验证表单或直接显示错误信息
   * @param errors
   * @returns {boolean}
   */
  Validator.prototype.validate = function (errors) {
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
    paths: {validator: 'js/jquery-validation/jquery.validate.js'}
  },
  onload: () => {
    $('form').uiForm();

  },
  event: (elm) => {
    $(elm).find('form').uiForm();
  }
}