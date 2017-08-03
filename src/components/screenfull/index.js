import screenfull from './screenfull';

//toggle fullscreen
export default{
	onload: function () {
		$(document).on('click', "[data-toggle=fullscreen]", function (e) {
			console.log('full2');

			if (screenfull.enabled) {
				screenfull.request();
			}
		});
	}
}