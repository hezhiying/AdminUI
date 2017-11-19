import CONFIG from '../config.js';

/**
 * 表格分页器
 * @param $table
 * @param $pager
 * @constructor
 *
 * <div data-table-pager="#tableID" data-per-size-opts="[5,10,20]" data-per-size="5" data-per-page="20">
 * <div data-table-pager="#tableID" data-show-total="false" data-show-per-size="false" data-show-go="false" data-show-page="false">
 */
const TablePager = function ($table, $pager) {
  this.table = $table;
  this.pager = $pager;

  //是否显示各个子模块
  this.showTotal = $pager.attr('data-show-total') ? $pager.data('showTotal') : true;
  this.showPerSize = $pager.attr('data-show-per-size') ? $pager.data('showPerSize') : true;
  this.showGo = $pager.attr('data-show-go') ? $pager.data('showGo') : true;
  this.showPage = $pager.attr('data-show-page') ? $pager.data('showPage') : true;
  //总记录数
  this.total = 0;
  //当前页
  this.current = 1;
  //可用分页大小
  this.perSizeOpts = this.pager.data('perSizeOpts') || [5, 10, 20, 50, 100];
  //分页数量长度
  this.perSize = this.pager.data('perSize') || 5;
  //每页大小
  this.perPage = this.pager.data('perPage') || 20;

  //监听table成功事件，更新page perPage total数据
  this.table.onAjaxSuccess((data,xhr, opts, event)=>{
    if($(data).attr('data-total')){
      this.total = parseInt($(data).data('total'));
    }

    this.perPage = opts.perPage || this.perPage;
    this.current = opts.page || 1;
    this.render();
  })
};

//渲染
TablePager.prototype.render = function () {
  this.showTotal && this.renderTotalTpl();
  this.showPerSize && this.renderPerPageOptsTpl();
  this.showGo && this.renderGoTpl();
  this.showPage && this.renderPerSizeTpl();
};
//渲染总记录数
TablePager.prototype.renderTotalTpl = function () {
  let tpl = '<span class="hidden-xs v-middle comp-total"> 共 <span class="text-total-page">{{totalPage}}</span> 页 <span class="text-total">{{total}}</span> 条记录 </span>';
  if (this.pager.find('span.comp-total').length === 0) {
    this.pager.append(tpl);
  }
  this.pager.find('span.text-total-page').text(this.totalPage());
  this.pager.find('span.text-total').text(this.total);
  return this;
};
//渲染分页数量选择
TablePager.prototype.renderPerPageOptsTpl = function () {
  let me = this;
  let tpl = `<div class=" visible-lg-inline visible-md-inline dropup comp-per-page-opts">
                            <button data-toggle="dropdown" class="btn btn-sm btn-default dropdown-toggle" aria-expanded="false">
                                <span class="dropdown-label text-per-page"></span>
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu text-per-page-list">
                            {{pageList}}
                            </ul>
                        </div> `;
  let html = '';
  this.perSizeOpts.forEach((item, index) => {
    html += '<li data-value="' + item + '" ><a href="#">' + item + ' 条/页</a></li>';
  });
  tpl = tpl.replace('{{pageList}}', html);

  if (this.pager.find('div.comp-per-page-opts').length === 0) {
    this.pager.append(tpl);
    this.pager.find('ul.text-per-page-list li').on('click', 'a', function(event){
      event.preventDefault();
      if($(this).parent('li').hasClass('active')){
        return false;
      }

      let perPage = parseInt($(this).parent('li').data('value'));
      me.doPage(1, perPage);
    });
  }
  this.pager.find('ul.text-per-page-list li[data-value='+this.perPage+']').addClass('active').siblings().removeClass('active')
  this.pager.find('span.text-per-page').html(this.perPage + ' 条/页');


  return this;
};
//渲染goBtn
TablePager.prototype.renderGoTpl = function () {
  let me = this;
  let tpl = `<div class="visible-lg-inline-block visible-md-inline-block v-middle comp-go">
                            <div class="input-group input-s-xs">
                                <input class="input-sm form-control" type="text" >
                                <div class="input-group-btn ">
                                    <button class="btn btn-sm btn-default box-shadow-none btn-go" data-placement="right" data-toggle="tooltip" title="跳转到指定页">go</button>
                                </div>
                            </div>
                        </div> `;
  if (this.pager.find('div.comp-go').length === 0) {
    this.pager.append(tpl);
    this.pager.find('div.comp-go').on('click', 'button', function(event){
      let page = parseInt(me.pager.find('div.comp-go input').val());
      if(page > 0){
        me.doPage(parseInt(page));
        me.pager.find('div.comp-go input').val(page);
      }
    })
  }

  if(this.totalPage() >=10){
    this.pager.find('div.comp-go').removeClass('hide').addClass('visible-lg-inline-block visible-md-inline-block')
  }else{
    this.pager.find('div.comp-go').removeClass('visible-lg-inline-block visible-md-inline-block').addClass('hide')
  }
  return this;
};
//渲染分页
TablePager.prototype.renderPerSizeTpl = function () {
  let me = this;
  let tpl = `<ul class="pagination pagination-sm m-t-none m-b-none v-middle comp-per-size">
                            <li class="page-first"><a href="#" rel="1"><i class="fa fa-angle-double-left"></i></a></li>
                            <li class="page-prev"><a href="#" rel="1"><i class="fa fa-angle-left"></i></a></li>
                            {{pageList}}
                            <li class="page-next"><a href="#" rel="1"><i class="fa fa-angle-right"></i></a></li>
                            <li class="page-last"><a href="#" rel="1"><i class="fa fa-angle-double-right"></i></a></li>
                        </ul>`;
  let html = '';
  for (let i = 1; i <= this.perSize; i++) {
    html += '<li class="page-' + i + '"><a href="#" rel="' + i + '">' + i + '</a></li>';
  }
  tpl = tpl.replace('{{pageList}}', html);

  if (this.pager.find('ul.comp-per-size').length === 0) {
    this.pager.append(tpl);
    //绑定单击事件
    this.pager.find('ul.comp-per-size').on('click', 'a', function(event){
      event.preventDefault();
      if(!$(this).parent('li').hasClass('disabled') && !$(this).parent('li').hasClass('active')){
        let rel    = $(this).attr('rel');
        me.doPage(parseInt(rel));
      }
    })
  }


  let pagerElm = this.pager.find('ul.comp-per-size');
  pagerElm.find('li').removeClass('active').show();
  //如果总页数小于可分页数，则隐藏多余的
  if(this.totalPage() < this.perSize){
    for(let i=this.totalPage(); i < this.perSize; i++){
      this.pager.find('ul.comp-per-size .page-'+(i+1)).hide()
    }
  }

  //第一页时禁用用上向首页按钮
  if(this.current === 1){
    pagerElm.find('li.page-first').addClass('disabled');
    pagerElm.find('li.page-prev').addClass('disabled');
  }else{
    pagerElm.find('li.page-first').removeClass('disabled');
    pagerElm.find('li.page-prev').removeClass('disabled').find('a').attr('rel', this.current - 1);
  }

  //最后一页时禁用下一页和末页按钮
  if(this.current === this.totalPage()){
    pagerElm.find('li.page-next').addClass('disabled');
    pagerElm.find('li.page-last').addClass('disabled');
  }else{
    pagerElm.find('li.page-next').removeClass('disabled').find('a').attr('rel', this.current + 1);
    pagerElm.find('li.page-last').removeClass('disabled').find('a').attr('rel', this.totalPage());
  }

  //计算开始页 pt 页数的一半位置
  let pt = Math.ceil(this.perSize / 2), start = 0;
  if (this.current > pt) {
    start = this.current - pt;
  }
  if ((this.current + pt) > this.totalPage() && this.totalPage() > this.perSize) {
    start = Math.min(start, this.totalPage() - this.perSize);
  }
  for (let i = 1; i <= Math.min(this.perSize, this.totalPage()); i++) {
    pagerElm.find('.page-' + i).find('a').attr('rel', start + i).html(start + i);
  }
  //当前页显示active
  pagerElm.find('a[rel=' + this.current + ']').parents('li').not('.page-first, .page-prev, .page-next,.page-last').addClass('active');
  return this;
};
//加载页面
TablePager.prototype.doPage = function(page, perPage){
  let e_tableReload = $.Event(CONFIG.EVENT.TABLE_RELOAD);
  page = page || this.current;
  perPage = perPage || this.perPage;

  if(!this.table.data('ajaxSending')){
    this.table.trigger(e_tableReload, [page, perPage]);
  }else{
    $.notifyI('数据正在加载, 请稍后...')
  }
};
//计算总页数
TablePager.prototype.totalPage = function () {
  if(this.total === 0){
    return 1;
  }
  return Math.ceil(this.total / this.perPage)
};

$.fn.uiTablePager = function () {
  let me = $(this);
  me.each(function (i, elm) {
    let $this = $(this);
    let tableTarget = $this.data('tablePager');
    if (tableTarget && $(tableTarget).length && !$(this).data('tablePagerObj')) {
      $(this).data('tablePagerObj', new TablePager($(tableTarget), $this));
    }
  });
};

export default {
  config: {},
  onload: () => {
    $('[data-table-pager]').uiTablePager();
  },
  event: (elm) => {
    $(elm).find('table[data-ajax]').uiTablePager();
  }
}
