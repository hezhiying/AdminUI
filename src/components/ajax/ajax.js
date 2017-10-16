// import CONFIG from '../config.js'
import CONFIG from '../config.js';

// ajax.js
($ => {
	"use strict";
	const wulajax = $.wulajax = $.ajax;
	// 重写ajax
	$.confirmDo  = function (options, confirm) {
		let opts = {
			escapeKey: 'cancel',
			content  : '',
			title    : $.lang.core.confirmTile,
			icon     : 'fa fa-question-circle',
			type     : 'orange',
			theme    : 'material',
			buttons  : {
				ok    : {
					text    : $.lang.core.yes1,
					btnClass: 'btn-blue',
					keys    : ['enter'],
					action() {
						if (opts.loading) {
							jc.setTitle('');
							jc.buttons.ok.hide();
							jc.buttons.cancel.hide();
							jc.setIcon('');
							jc.setContent('<p class="text-center"><i class="fa fa-spinner fa-spin fa-4x" aria-hidden="true"></i></p>');
							$.ajax(options).always(() => {
								if (opts.block) {
									return;
								}
								jc.close();
							});
							return false;
						} else
							$.ajax(options);
					}
				},
				cancel: {
					text: $.lang.core.cancel
				}
			}
		};
		opts     = $.extend(true, opts, confirm || {});
		let jc   = $.confirm(opts);
	};
	$.ajaxDialog = function (url, title, buttons, type, columnClass) {
		let djc, opts = {
			title         : title || false,
			content       : 'url:' + url,
			type          : type || 'default',
			closeIcon     : true,
			closeIconClass: 'fa fa-close',
			contentLoaded : function (data, status, xhr) {
				if (status === 'error') {
					djc.close();
				}
			},
			onContentReady: function () {
				$.adminUI.initElement($(this.$content));
			},
			onDestroy     : function () {
				$.adminUI.destroyElement($(this.$content));
			},
			columnClass   : 'medium'
		};

		if (columnClass) {
			opts.columnClass = columnClass;
		}
		if (buttons) {
			opts.buttons = buttons;
			djc          = $.confirm(opts);
		} else {
			djc = $.dialog(opts);
		}
	};
	$.ajax       = function (url, options) {
		return wulajax(url, options).done(data => {
			let opts = options || url;
			if (opts.mode === 'abort') {
				return;
			}
			if (opts.dataType === 'json') {
				showMsg(data);
				ajaxAction(data);
			} else if (opts.action === 'update' && opts.target) {
				ajaxAction({action: 'update', target: opts.target, args: {content: data}});
			}
		});
	};
	//修改默认的ajax行为
	$(document).ajaxSend((event, xhr, opts) => {
		if (opts.mode === 'abort') {
			return;
		}
		if (!opts.element) {
			opts.element = $('body');
		} else {
			opts.isElement = true;
		}
		if (opts.isElement) {
			opts.element.data('ajaxSending', true);
		}
		let e     = new $.Event('ajax.send');
		e.element = opts.element;
		opts.element.trigger(e, [opts, xhr]);
		if (opts.element.hasClass('data-loading-text')) {
			opts.element.button('loading');
		}
		xhr.setRequestHeader('X-AJAX-TYPE', opts.dataType);
	});

	$(document).ajaxError((event, xhr, opts, error) => {
		if (opts.mode === 'abort') {
			return;
		}
		$.adminUI.loadingBar.error();
		let e = $.Event('ajax.error');
		opts.element.trigger(e, [opts, error, xhr]);
		if (!e.isDefaultPrevented()) {
			//处理错误
			switch (xhr.status) {
				case 500:
					deal500({
						message: (t => {
							if (xhr.getResponseHeader('ajax')) {
								try {
									let data = $.parseJSON(t);
									return data.message;
								} catch (e) {
								}
							} else if (t.indexOf('</body>')) {
								t = t.substr(0, t.indexOf('</body>'));
								t = t.substr(t.indexOf('>', t.indexOf('<body')) + 1);
							}
							return t;
						})(xhr.responseText)
					});
					break;
				case 200:
					//数据类型转换错误
					deal500({
						message: (t => {
							if (xhr.getResponseHeader('ajax')) {
								try {
									let data = $.parseJSON(t);
									return data.message;
								} catch (e) {
								}
							} else if (t.indexOf('</body>')) {
								t = t.substr(0, t.indexOf('</body>'));
								t = t.substr(t.indexOf('>', t.indexOf('<body')) + 1);
							}
							return t;
						})(xhr.responseText)
					}, $.lang.core.ajaxDataConvertException);
					break;
				case 401:
					showNotice(xhr);
					$(document).trigger('wula.need.login');
					break;
				case 403:
					showNotice(xhr);
					$(document).trigger('wula.perm.denied');
					break;
				case 404:
					showNotice(xhr);
					$(document).trigger('wula.page.404');
					break;
				case 422:
					try {
						ajaxAction($.parseJSON(xhr.responseText));
					} catch (e) {

					}
					break;
				default:
					showNotice(xhr);
			}
		}
	});

	$(document).ajaxSuccess((event, xhr, opts, data) => {
		if (opts.mode === 'abort') {
			return;
		}
		$.adminUI.loadingBar.success();
		opts.element.trigger('ajax.success', [data, opts, xhr]);
	});

	$(document).ajaxComplete((event, xhr, opts) => {
		if (opts.mode === 'abort') {
			return;
		}
		opts.element.data('ajaxSending', false);
		if (opts.element.hasClass('data-loading-text')) {
			opts.element.button('reset');
		}
		let e     = new $.Event('ajax.done');
		e.element = opts.element;
		opts.element.trigger(e, [opts, xhr]);
	});
	// 全局设置
	$.ajaxSetup({
		cache  : false,
		timeout: 900000
	});
	// ajax 请求
	const doAjaxRequest = function (e) {
		//阻止事件的默认行为
		e.preventDefault();
		//阻止事件向上冒泡到 DOM 树，阻止任何父处理程序被事件通知
		e.stopPropagation();
		let $this = $(this);
		//如果当前ajax正在请求，忽略本次
		if ($this.data('ajaxSending')) {
			return false;
		}
    /**
		 * 发送ajax.before事件， 用户可以在其它地方监听，返回true 或 false
		 * true 继续执行
		 * false 中止执行
     */
		let event     = $.Event(CONFIG.EVENT.AJAX_BEFORE);
		event.element = $this;
		$this.trigger(event);
		if (!event.isDefaultPrevented()) {
			// 生成发起ajax请求的选项.
			let be      = $.Event('ajax.build');
			be.opts     = $.extend({element: $this, data: []}, $this.data() || {});
			be.opts.url = be.opts.url || $this.attr('href') || $this.attr('action') || '';
			let ajax    = be.opts.ajax || 'get.json';
			delete be.opts.ajax;
			let types        = ajax.split('.');
			be.opts.dataType = types.length === 2 ? types[1] : 'json';
			let method       = $this.attr('method') || (types[0] ? types[0] : null) || 'GET';
			be.opts.method   = method.toUpperCase();

			if (be.opts.method === 'UPDATE') {
				be.opts.method   = 'GET';
				be.opts.dataType = 'html';
				be.opts.action   = 'update';
				be.opts.target   = $this.attr('target') || $this.data('target');
			} else if (be.opts.method === 'DIALOG') {
				be.opts.method           = 'GET';
				be.opts.dataType         = 'html';
				be.opts.action           = 'dialog';
				be.opts.dialogTitle      = $this.data('dialogTitle') || false;
				be.opts.dialogType       = $this.data('dialogType') || 'default';
				be.opts.dialogWidthClass = $this.data('dialogWidthCls') || false;
				let dialogE              = $.Event('build.dialog');
				dialogE.buttons          = null;
				$this.trigger(dialogE);
				if (dialogE.buttons) {
					be.opts.buttons = dialogE.buttons;
				}
			}

			let selected = $this.data('grp');
			if (selected) {
				let ids = [], name = $this.data('arg') || 'ids';
				$(selected).each(function (i, n) {
					ids.push($(n).val());
				});
				if (ids.length === 0) {
					let warn = $this.data('warn') || $.lang.core.emptyWarn;
					$.notifyW(warn);
					return;
				}
				ids = ids.join(',');
				be.opts.data.push({
					name : name,
					value: ids
				});
			}
			$this.trigger(be);
			if (!be.isDefaultPrevented()) {
				if (be.opts.action === 'update' && $(be.opts.target).data('loaderObj')) {
					$(be.opts.target).data('load', be.opts.url).data('loaderObj').reload(null, $this.data('force') !== undefined);
				} else if (be.opts.action === 'dialog') {
					//是dialog，所以走$.ajaxDialog方法
					let ops = be.opts;
					$.ajaxDialog(ops.url, ops.dialogTitle, ops.buttons, ops.dialogType, ops.dialogWidthClass);
				} else if ($this.data('confirm') !== undefined) {
					let jc = $.confirm({
						content  : $this.data('confirm') || '',
						title    : $this.data('confirmTitle') || $.lang.core.confirmTile,
						icon     : $this.data('confirmIcon') || 'fa fa-question-circle',
						type     : $this.data('confirmType') || 'orange',
						theme    : $this.data('confirmTheme') || 'material',
						autoClose: $this.data('confirmAutoclose') || false,
						escapeKey: 'cancel',
						buttons  : {
							ok    : {
								text    : $.lang.core.yes1,
								btnClass: 'btn-blue',
								keys    : ['enter'],
								action() {
									if ($this.data('loading') !== undefined) {
										$this.data('loading', null);
										jc.setTitle('');
										jc.buttons.ok.hide();
										jc.buttons.cancel.hide();
										jc.setIcon('');
										jc.setContent('<p class="text-center"><i class="fa fa-spinner fa-spin fa-4x" aria-hidden="true"></i></p>');

										$.ajax(be.opts).always(() => {
											if ($this.data('block') !== undefined) {
												return;
											}
											jc.close();
										});

										return false;
									} else
										$.ajax(be.opts);
								}
							},
							cancel: {
								text: $.lang.core.cancel
							}
						}
					});
				} else {
					$.ajax(be.opts);
				}
			}
		}
		return false;
	};
	const deal500       = function (data, title) {
		$.dialog({
			icon        : 'fa fa-warning',
			theme       : 'supervan',
			title       : title ? title : '',
			type        : 'red',
			content     : data.message,
			boxWidth    : '80%',
			useBootstrap: false
		});
	};
	const showMsg       = function (data) {
		if (data.message) {
			let notice = true, opts = {};
			if (data.style === 'alert') {
				notice = false;
			}
			switch (data.code) {
				case 500://ERROR
					opts.icon  = 'fa fa-warning';
					opts.title = $.lang.core.error;
					if (notice) {
						opts.type = 'danger';
					} else {
						opts.type    = 'red';
						opts.content = data.message;
					}
					break;
				case 400://WARNING
					opts.icon  = 'fa fa-warning';
					opts.title = $.lang.core.warning;
					if (notice) {
						opts.type = 'warning';
					} else {
						opts.type    = 'orange';
						opts.content = data.message;
					}
					break;
				case 300://INFO
					opts.icon  = 'fa fa-info-circle';
					opts.title = $.lang.core.info;
					if (notice) {
						opts.type = 'info';
					} else {
						opts.type    = 'blue';
						opts.content = data.message;
					}
					break;
				case 200://SUCCESS
				default:
					opts.icon  = 'fa fa-check-square';
					opts.title = $.lang.core.success;
					if (notice) {
						opts.type = 'success';
					} else {
						opts.type    = 'green';
						opts.content = data.message;
					}
					break;
			}
			if (notice) {
				opts.z_index   = 9000;
				opts.placement = {
					from : "top",
					align: "center"
				};
				$.notify({
					icon   : opts.icon,
					title  : '<strong>' + opts.title + '</strong>',
					message: data.message
				}, opts);
			} else {
				$.dialog(opts);
			}
		}
	};
	const ajaxAction    = (data) => {
		let target;
		switch (data.action) {
			case 'update':
				//更新内容
				target = $(data.target);
				if (target.length && data.args && data.args.content) {
					let append = data.args.append;
					if (append) {
						let d = $(data.args.content);
						target.append(d);
						$.adminUI.initElement(d);
					} else {
						$.adminUI.destroyElement(target);
						target.empty().html(data.args.content);
						$.adminUI.initElement(target);
					}
				}
				break;
			case 'reload':
				//重新加载
				if (data.target === 'document') {
					location.reload();
					return;
				}
				target = $(data.target);
				if (target.length) {
					let loader = target.data('loaderObj');
					try {
						if (loader) {
							loader.reload(null, true);
						}
					} catch (e) {
					}
				}
				break;
			case 'click':
				//点击
				target = $(data.target);
				if (target.length) {
					if (/^#.+/.test(target.attr('href'))) {
						window.location.hash = target.attr('href');
					} else {
						target.click();
					}
				}
				break;
			case 'redirect':
				//重定向
				let url = data.target;
				if (url) {
					if (url[0] === '#') {
						if (window.location.hash === url) {
							$.wulaUI.load();
						} else {
							window.location.hash = url;
						}
					} else {
						if (window.location.hash && data.hash) {
							window.location.href = url + window.location.hash;
						} else {
							window.location.href = url;
						}
					}
				}
				break;
			case 'validate':
				//表单验证
				target   = $('form[name="' + data.target + '"]');
				let errs = data.args;
				let obj  = target.data('validateObj');
				if (obj) {
					obj.validate(errs);
				}
				break;
			default:
		}
	};
	const showNotice    = (xhr) => {
		$.notify({
			title  : $.lang.core.error,
			message: '<br/>' + xhr.statusText
		}, {
			type     : 'danger',
			z_index  : 9000,
			placement: {
				from : "top",
				align: "right"
			}
		});
	};
	//页面加载完成时处理
	$(() => {
    $('body').on('click', '[data-ajax]:not(form)', doAjaxRequest)
      .on('submit', 'form[data-ajax]', doAjaxRequest)
      .on('change', 'select[data-ajax]', doAjaxRequest);
	});
})(jQuery);

export default {
  config: {
  },
  onload: () => {


  },
  event: (elm) => {

  }
}