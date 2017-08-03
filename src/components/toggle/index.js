export default {
	onload:function(){
		// class
		$(document).on('click', '[data-toggle^="class"]', function(e){
			e && e.preventDefault();
			var $this = $(e.target), $class , $target, $tmp, $classes, $targets;
			!$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
			$class = $this.data()['toggle'];
			$target = $this.data('target') || $this.attr('href');
			$class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
			$target && ($targets = $target.split(','));
			$targets && $targets.length && $.each($targets, function( index, value ) {
				($targets[index] !='#') && $($targets[index]).toggleClass($classes[index]);
			});
			$this.toggleClass('active');
		});
	}
}