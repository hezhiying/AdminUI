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
    return nott(message, title, 'warning', 'danger', url);
  };

  const nott = (message, title, icon, type, url = null) => {
    return $.notify({
      title: title ? '<strong>'+title+'</strong> ' : '',
      message: message,
      icon: 'fa fa-' + icon,
      url: url
    }, {
      type: type,
      newest_on_top: true,
      z_index: 9000,
      delay:5000,
      placement: {
        from: "top",
        align: "right"
      }
    });
  };
})(jQuery);
export default {}