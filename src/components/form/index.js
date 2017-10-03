($ => {
	const prepareValidateRule    = function (rules) {
		if ('object' !== typeof rules) {
			rules = $.parseJSON(rules);
		}
		if (rules.rules) {
			for (let i in rules.rules) {
				for (let j in rules.rules[i]) {
					if (j === 'pattern') {
						eval('var rule = ' + rules.rules[i][j] + ';');
						rules.rules[i][j] = rule;
					}
				}
			}
		}
		return rules;
	};
	const errorPlacement         = function (error, element) {
		let oldError = $(`#${element.attr('name')}-error`);
		if(oldError.length){
			//手动放置错误位置
			oldError.replaceWith(error);
		}else if (element.is('[type=checkbox]') || element.is('[type=radio]')) {
			//checkbox || radio
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
			let e = $.Event('form.placement');
			element.trigger(e, [error, element]);
			if (!e.isDefaultPrevented()) {
				if(element.next('.input-group-btn').length||element.prev('.input-group-btn').length){
					//如果input后面同级元素直放到外面
					(element.parents('div.form-group')||element.parent('div')).append(error);
				}else{
					error.insertAfter(element);
				}
			}
		}
	};
	const highlight =function(element, errorClass, validClass) {
		if ($(element).is('[type=checkbox]') || $(element).is('[type=radio]')) {
			let wrap = $(element).closest('div');
			if (wrap.is('.checkbox') || wrap.is('.radio')) {
				wrap = wrap.parent().closest('div');
			}
			wrap.removeClass("has-success").addClass("has-error");
		}else{
			($(element).parents('.form-group')||$(element).parent()).removeClass("has-success").addClass("has-error");
//			$(element).parent().removeClass("has-success").addClass("has-error");
		}
	};

	//验证通过时回调
	const unhighlight = function (element, errorClass, validClass) {
		if ($(element).is('[type=checkbox]') || $(element).is('[type=radio]')) {
			let wrap = $(element).closest('div');
			if (wrap.is('.checkbox') || wrap.is('.radio')) {
				wrap = wrap.parent().closest('div');
			}
			wrap.removeClass("has-error").addClass("has-success");
		}else{
			($(element).parents('.form-group')||$(element).parent()).removeClass("has-error").addClass("has-success");

//			$(element).parent().removeClass("has-error").addClass("has-success");
		}
	};
	const Validator              = function (form) {
		this.form                 = form;
		this.rules                = prepareValidateRule(form.data('validate'));
		const name                = form.attr('name');
		this.rules.errorPlacement = errorPlacement;
		this.rules.onsubmit       = false;
		this.rules.ignoreTitle    = true;
		this.rules.errorClass     = 'parsley-error help-block';
		this.rules.validClass     = 'parsley-success';
//		this.rules.wrapper        = 'ul';
		this.rules.wrapperClass   = 'parsley-error-list';
		this.rules.debug = true;
		this.rules.highlight = highlight;
		this.rules.unhighlight = unhighlight;

		this.rules.errorElement   = 'span';
		//可以通过事件定制高级验证规则
		let e                     = new $.Event('form.init.rule');
		e.form                    = this;
		this.form.trigger(e);

		this.validator = form.validate(this.rules);
		let me         = this;
		form.on('ajax.before', function () {
			let result = me.validate();
			return result;
		});

		//注册销毁事件
		form.closest('.adminUI').on('adminUI.destroy', this.destroy);
	};
	//验证
	Validator.prototype.validate = function (errors) {
		if (!this.validator) {
			return false;
		}
		if (this.validator.form()) {
			if (errors) {
				this.validator.showErrors(errors);
				return;
			}
			if (this.validator.pendingRequest) {
				this.validator.formSubmitted = true;
				return false;
			}
		}
		return this.form.valid();
	};
	//销毁
	Validator.prototype.destroy  = function () {
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
	config:{
		paths:{validator:'js/jquery-validation/jquery.validate.js'}
	},
	onload:()=>{
		$('form[data-validate]').uiForm();

	},
	event:(elm)=>{
		$(elm).find('form[data-validate]').uiForm();
	}
}