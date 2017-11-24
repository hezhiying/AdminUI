import CONFIG from '../config.js';
import utils from '../../utils/utils';
/**
 * 添加ajax结果在目标元素上显示功能
 *
 * <a href="" data-ajax="get.html" data-ajax-target="#targetID" data-loading="显示loading的位置，为空显示在target上" data-loading-text="loading文字">
 */


/**
 *
 * @param $table
 * @constructor
 *
 * th[data-sort] : sort field
 */
const Table = function ($table) {
  this.table = $table;
  this.page = 1;
  this.perPage = 20;
  this.sortField = null;
  this.sortDir = null;
  this.formData = {};
  this.initForm();
  this.initSorter();

  //监听加载事件
  this.table.on(CONFIG.EVENT.TABLE_RELOAD, (event, page, perPage, formData)=>{
    this.reload(page, perPage, formData)
  });
  //ajax提交加载
  this.table.onAjaxBuild((ajaxOptions, event)=>{
    let params = {
      page: this.page,
      perPage: this.perPage,
      sortField: this.sortField,
      sortDir: this.sortDir,
    };
    ajaxOptions.page = this.page;
    ajaxOptions.perPage = this.perPage;
    ajaxOptions.sortField = this.sortDir;
    ajaxOptions.sortDir = this.sortDir;
    ajaxOptions.data = $.extend({}, ajaxOptions.data || {}, this.formData || {}, params);
  });
  //ajax加载完成
  this.table.onAjaxSuccess((data, xhr, ajaxOptions, event)=>{
    //恢复表格头的checkbox状态为未先中
    this.table.find('thead th input[type="checkbox"]').prop('checked', false).change();
    let tb = this.table.find('tbody');
    $.adminUI.destroyElement(tb);
    tb.remove();
    this.table.find('thead').after(data);
    $.adminUI.initElement(this.table.find('tbody'));
  });

};

Table.prototype.doCheckbox = function () {
};
//初始化排序字段
Table.prototype.initSorter = function () {
  let me = this;
  this.table.find('th[data-sort]').each(function (i, elm){
    let th = $(elm), sort = th.attr('data-sort');
    let sorts = sort.split(',');

    //设置默认的排序字段及方向
    if(sorts.length === 2){
      let field = me.sortField = sorts[0];
      let dir = me.sortDir = sorts[1] || 'asc';
      th.removeClass('sorting_asc sorting_desc sorting').addClass('sorting_'+dir);
    }else{
      th.removeClass('sorting_asc sorting_desc sorting').addClass('sorting');
    }
  });
  let ths = this.table.find('th[data-sort]');
  //排序点击事件
  ths.click(function () {
    let sorts = $(this).attr('data-sort').split(',');
    $(this).siblings('[data-sort]').removeClass('sorting sorting_asc sorting_desc').addClass('sorting');
    if($(this).hasClass('sorting_asc')){
      $(this).removeClass('sorting_asc sorting').addClass('sorting_desc');
      me.setSort(sorts.shift(), 'desc')
    }else{
      $(this).removeClass('sorting_desc sorting').addClass('sorting_asc');
      me.setSort(sorts.shift(), 'asc')
    }
    me.reload(1);
  })
};

//加载页面
Table.prototype.reload = function (page, perPage, formData) {
  if(typeof page === 'number'){
    this.setPage(page);
  }
  if(typeof perPage === 'number' && perPage !== 0){
    this.setPerPage(perPage);
  }
  if(formData){
    this.formData = formData;
  }

  this.table.ajaxReload();
};

//初始化关联表单
Table.prototype.initForm = function () {
  let me = this;
  let tableId = this.table.attr('id');
  let formTarget = "[data-table-form='#"+tableId+"']";
  if(tableId && $(formTarget).length){
    //监控form表单构建事件，阻止默认的form提交
    $(formTarget).onAjaxBuild(function(ajaxOptions, event) {
      me.formData = $(this).serializeObject();
      me.reload(1);
      return false;
    });
    //监听form重置事件，清空formData
    $(formTarget).on('reset', (event)=>{
      this.formData = {};
      this.reload(1)
    })
  }
};

/**
 * 设置默认ajax要提交的数据，
 * @param data
 * @param clearOld 用新数据完全替换老数据 默认新老数据合并
 * @returns {Table}
 */
Table.prototype.setData = function (data, clearOld = false) {
  let old = utils.parseJson(this.table.data('ajaxData'));
  let newData = clearOld ? data : $.extend(old, data);
  this.table.data('ajaxData', newData);
  return this;
};

Table.prototype.setPage = function (page) {
  this.page = page;
  return this;
};
Table.prototype.setPerPage = function (perPage) {
  this.perPage = perPage;
  return this;
};

Table.prototype.setSort = function (field, dir) {
  this.sortField = field;
  this.sortDir = dir;
  return this;
};

$.fn.uiTable = function () {
  let me = $(this);
  me.each(function (i, elm) {
    let $this = $(elm);
    if (!$this.data('tableObj')) {
      $this.data('tableObj', new Table($this));
    }
  });
};

export default {
  config: {},
  onload: () => {
    $('table[data-ajax]').uiTable();

    //checkbox全选 | 全不选功能
    $(document).on('change', 'table thead [type="checkbox"]', function(e){
      e && e.preventDefault();
      let $table = $(e.target).closest('table'), $checked = $(e.target).is(':checked');
      $('tbody [type="checkbox"]',$table).prop('checked', $checked).change();
    });

    //选中checkbox时激活 tr active样式
    $(document).on('change', 'table tbody [type="checkbox"]', function(e){
      e && e.preventDefault();
      let $checked = $(e.target).is(':checked');
      if($checked){
        $(e.target).closest('tr').addClass('active')
      }else{
        $(e.target).closest('tr').removeClass('active')
      }
    });

  },
  event: (elm) => {
    $(elm).find('table[data-ajax]').uiTable();
  }
}
