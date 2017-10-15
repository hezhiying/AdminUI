/**
 * panel 面板显示隐藏切换功能
 * @type {{onload: (())}}
 *
 * demo:
 <section class="panel panel-default">
 <header class="panel-heading text-right bg-light">
 <ul class="nav nav-tabs pull-left">
 <li><a href="#messages-2" data-toggle="tab"><i class="fa fa-comments text-default"></i></a></li>
 <li class="active"><a href="#profile-2" data-toggle="tab"><i class="fa fa-user text-default"></i> Profile</a></li>
 <li class="dropdown">
 <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-cog text-default"></i> Settings <b class="caret"></b></a>
 <ul class="dropdown-menu text-left">
 <li><a href="#dropdown1" data-toggle="tab">@fat</a></li>
 <li><a href="#dropdown2" data-toggle="tab">@mdo</a></li>
 </ul>
 </li>
 </ul>
 <a href="#" class="panel-toggle text-muted"><i class="fa fa-caret-down text-active"></i><i class="fa fa-caret-up text"></i></a>
 <span class="hidden-sm sr-only">Left tab</span>
 </header>
 <div class="panel-body">
 <div class="tab-content">
 <div class="tab-pane fade" id="messages-2">message</div>
 <div class="tab-pane fade active in" id="profile-2">profile</div>
 <div class="tab-pane fade" id="dropdown1">dropdown1</div>
 <div class="tab-pane fade" id="dropdown2">dropdown2</div>
 </div>
 </div>
 </section>
 */

export default  {
	onload:()=>{
		$(document).on('click', '.panel-toggle', function(e){
			e && e.preventDefault();
			let $this = $(e.target), $class = 'collapse' , $target;
			if (!$this.is('a')) $this = $this.closest('a');
			$target = $this.closest('.panel');
			$target.find('.panel-body').toggleClass($class);
			$this.toggleClass('active');
		});
	}
};