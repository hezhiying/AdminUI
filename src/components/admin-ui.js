$.adminUI                = {};
//触发UI初始化事件
$.adminUI.initElement    = function (e) {
	if (e.hasClass('adminUI')) {
		e.trigger('adminUI.init');
	} else {
		e.children('.adminUI').trigger('adminUI.init');
	}
};
//触发UI销毁化事件
$.adminUI.destroyElement = function (e) {
	if (e.hasClass('adminUI')) {
		e.trigger('adminUI.destroy');
	}
	e.find('.adminUI').trigger('adminUI.destroy');
};

export const adminUI = {
	install    : (components) => {
		//读取组件依赖
		for (let item of Object.values(components)) {
			if (item.config) {
				RequireJC.config(item.config);
			}
			//组件初始化
			if (item.onload) {
				item.onload();
			}
		}
	},
	addListener: (components) => {
		//监听UI事件
		$('body').on('adminUI.init', '.adminUI',  function (event) {
			console.log(this,event)
			for (let item of Object.values(components)) {
				if (item.event) {
					item.event(this, event)
				}
			}
		});
	}

};