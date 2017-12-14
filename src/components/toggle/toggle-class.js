/**
 * 设置元素样式
 * @type {{onload: (())}}
 * @data-toggle class:元素1样式,元素2样式
 * @data-target||href 元素1,元素2
 * demo
 <a href="#" class="hide nav-off-screen-block" data-toggle="class:nav-off-screen, open" data-target="#nav,html"></a>
 <div id="nav"></div>
 */
export default {
	onload:()=>{
		$(document).on('click', '[data-toggle^="class"]', function(e){
			e && e.preventDefault();
			let $this = $(e.target), $class , $target, $tmp, $classes, $targets;
			!$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
			$class = $this.data()['toggle'];
			$target = $this.data('target') || $this.attr('href');
			$class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
			$target && ($targets = $target.split(','));
			$targets && $targets.length && $.each($targets, function( index, value ) {
				($targets[index] !=='#') && $($targets[index]).toggleClass($classes[index]);
			});
			$this.toggleClass('active');
		});
		$(document).on('mouseover', '[data-toggle-over^="class"]', function(e){
			e && e.preventDefault();
			let $this = $(e.target), $class , $target, $tmp, $classes, $targets;
			!$this.data('toggleOver') && ($this = $this.closest('[data-toggle-over^="class"]'));
			$class = $this.data()['toggleOver'];
			$target = $this.data('target') || $this.attr('href');
			$class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
			$target && ($targets = $target.split(','));
			$targets && $targets.length && $.each($targets, function( index, value ) {
				($targets[index] !=='#') && $($targets[index]).addClass($classes[index]);
			});
		});
		$(document).on('mouseout', '[data-toggle-over^="class"]', function(e){
			e && e.preventDefault();
			let $this = $(e.target), $class , $target, $tmp, $classes, $targets;
			!$this.data('toggleOver') && ($this = $this.closest('[data-toggle-over^="class"]'));
			$class = $this.data()['toggleOver'];
			$target = $this.data('target') || $this.attr('href');
			$class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
			$target && ($targets = $target.split(','));
			$targets && $targets.length && $.each($targets, function( index, value ) {
				($targets[index] !=='#') && $($targets[index]).removeClass($classes[index]);
			});
		});
	}
};