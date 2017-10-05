import screenfull from './screenfull';

/**
 * 全屏显示功能
 * https://github.com/sindresorhus/screenfull.js
 * e.g. <a href="#" class="navbar-brand" data-toggle="fullscreen"></a>
 */
$(document).on('click', "[data-toggle=fullscreen]", function (e) {
  if (screenfull.enabled) {
    screenfull.request();
  }
});
export default {};
//toggle fullscreen
