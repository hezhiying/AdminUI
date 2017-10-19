import notify from 'bootstrap-notify'

/**
 * notify
 */
($ => {
	$.notifyS = (message, title, url = null) => {
		return nott(message, title, 'check', 'success', url);
	};
	$.notifyI = (message, title, url = null) => {
		return nott(message, title, 'info-circle', 'info', url);
	};
	$.notifyW = (message, title, url = null) => {
		return nott(message, title, 'warning', 'warning', url);
	};
	$.notifyD = (message, title, url = null) => {
		return nott(message, title, 'times', 'danger', url);
	};

	const nott = (message, title, icon, type, url = null) => {
		return $.notify({title: title ? title : '', message: message, icon: 'fa fa-' + icon, url:url}, {
			type     : type,
			z_index  : 9000,
			placement: {
				from : "top",
				align: "right"
			}
		});
	};
})(jQuery);
export default {

}