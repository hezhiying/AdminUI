import notify from 'bootstrap-notify'

/**
 * notify
 */
($ => {
	$.notifyS = (message, title, url = null) => {
		nott(message, title, 'check-square', 'success', url);
	};
	$.notifyI = (message, title, url = null) => {
		nott(message, title, 'info-circle', 'info', url);
	};
	$.notifyW = (message, title, url = null) => {
		nott(message, title, 'warning', 'warning', url);
	};
	$.notifyD = (message, title, url = null) => {
		nott(message, title, 'warning', 'danger', url);
	};

	const nott = (message, title, icon, type, url = null) => {
		$.notify({title: title ? title : '', message: message, icon: 'fa fa-' + icon, url:url}, {
			type     : type,
			z_index  : 9000,
			placement: {
				from : "top",
				align: "center"
			}
		});
	};
})(jQuery);
export default {

}