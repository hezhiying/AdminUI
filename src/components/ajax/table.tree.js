import utils from '../../utils/utils';

const TableTree = function (table) {
  this.table = table;
  this.indentTemplate = '<span class="treegrid-indent"></span>';
  this.expanderTemplate = '<span class="treegrid-expander"></span>';
  this.treeColumn = table.data('treeColumn') || 0;
  // this.expanderCollapsedClass = 'fa fa-chevron-down';
  this.expanderCollapsedClass = table.data('treeCollapsedClass') || 'fa fa-plus';
  this.expanderExpandedClass =  table.data('treeExpandedClass') || 'fa fa-minus';
  this.expanderLeafClass =  table.data('treeLeafClass') || 'status ';
  // this.expanderExpandedClass = 'fa fa-chevron-right';
  this.saveStateName = table.data('treeCookieName') || 'table-tree-state';
  this.initTree();
};

/**
 * 初始化表格树
 */
TableTree.prototype.initTree = function() {
  this.initNode(this.getRootNodes());
  this.render(this.getRootNodes());
};

/**
 * 渲染节点入口
 * @param trs
 */
TableTree.prototype.render = function(trs) {
  let self = this;
  $(trs).each(function() {
    let $this = $(this);
    //如果父节点中有一个是关闭的，则关闭否则显示
    if (self.isOneOfParentsCollapsed($this)) {
      $this.hide();
    } else {
      $this.show();
    }
    //如果有子节点，递归渲染
    if (self.getChildNodes($this)) {
      self.renderExpander($this);
      self.render(self.getChildNodes($this));
    }
  });
};
/**
 * 渲染节点按钮样式图标
 * @param $tr
 */
TableTree.prototype.renderExpander = function($tr) {
  let self = this;
  $($tr).each(function() {
    let $this = $(this);
    let expander = $this.find('.treegrid-expander');
    if (expander) {
      if($tr.data('treeLeaf')){
        expander.addClass($this.data('treeLeafClass') || self.expanderLeafClass);
        expander.css('cursor','auto')
      }else if(self.isExpanded($this)){
        expander.removeClass(self.expanderCollapsedClass);
        expander.addClass(self.expanderExpandedClass);
      }else if(self.isCollapsed($this)){
        expander.removeClass(self.expanderExpandedClass);
        expander.addClass(self.expanderCollapsedClass);
      }else{
        expander.removeClass(self.expanderExpandedClass);
        expander.addClass(self.expanderCollapsedClass);
      }
    } else {
      self.initExpander($this);
      self.renderExpander($this);
    }
  });
};

/**
 * 初始化行节点
 * @param trs
 */
TableTree.prototype.initNode = function(trs) {
  let self = this;
  trs.each(function() {
    let $this = $(this);
    self.initNode(self.getChildNodes($this));
    self.initExpander($this);
    self.initIndent($this);
    self.initEvents($this);
    self.initState($this);
    self.initChangeEvent($this);
  });
};
/**
 * 初始化每行节点前的缩进
 * @param $tr
 */
TableTree.prototype.initIndent =function($tr) {
  $tr.find('.treegrid-indent').remove();
  let expander = $tr.find('.treegrid-expander');
  let depth = this.getDepth($tr);
  for (let i = 0; i < depth; i++) {
    $(this.indentTemplate).insertBefore(expander);
  }
};
/**
 * 初始化每行节点扩展按钮点击事件
 * @param $tr
 * @returns {TableTree}
 */
TableTree.prototype.initExpander = function($tr) {
  if($tr.is('[data-ajax]')){
    $tr.unbind('click');
  }
  let cell = $tr.find('td').get(this.treeColumn);
  let tpl = this.expanderTemplate;
  let expander = $tr.find('.treegrid-expander');
  if (expander) {
    expander.remove();
  }
  let self = this;
  $(tpl).prependTo(cell).click(function() {
    self.toggle($($(this).closest('tr')));
  });
  return this;
};
/**
 * 初始化事件监听
 * @param $tr
 */
TableTree.prototype.initEvents = function($tr) {
  let self = this;
  let $this = $tr;
  //Default behavior on collapse
  $this.on("collapse", function(event) {
    let $this = $(this);
    $this.removeClass('treegrid-expanded');
    $this.addClass('treegrid-collapsed');
  });
  //Default behavior on expand
  $this.on("expand", function(event) {
    let $this = $(this);
    $this.removeClass('treegrid-collapsed');
    $this.addClass('treegrid-expanded');
  });

};

TableTree.prototype.initChangeEvent = function($tr) {
  let self = this;
  //Save state on change
  $tr.on("change", function() {
    self.render($(this));
    self.saveState($(this))
  });
};
TableTree.prototype.initState = function ($tr) {
  if( typeof $.cookie === 'function' && !this.isFirstInit()){
    this.restoreState($tr)
  }else{
    this.collapse($tr);
  }
};
/**
 * Expand if collapsed, Collapse if expanded
 *
 * @returns {Node}
 */
TableTree.prototype.toggle =function($tr) {
  if (this.isExpanded($tr)) {
    this.collapse($tr);
  } else {
    this.expand($tr);
  }
};
TableTree.prototype.getDepth = function($tr) {
  if(this.getParentNode($tr)){
    return this.getDepth(this.getParentNode($tr))+1;
  }else{
    return 0;
  }
};
TableTree.prototype.getChildNodes = function($tr) {
  return this.table.find('tr[data-tree-parent="' + $tr.data('treeId') + '"]');
};
TableTree.prototype.getRootNodes = function() {
  let result = $.grep(this.table.find('tbody tr'), function(tr) {
    return $(tr).data('treeId') && !$(tr).data('treeParent');
  });
  return $(result);
};
TableTree.prototype.getParentNode = function($tr) {
  if (!$tr.data('treeParent')) {
    return null;
  } else {
    return this.table.find('tr[data-tree-id="'+$tr.data('treeParent')+'"]');
  }
};

TableTree.prototype.isExpanded = function($tr) {
  return $tr.hasClass('treegrid-expanded');
};

TableTree.prototype.isCollapsed = function($tr) {
  return $tr.hasClass('treegrid-collapsed');
};
/**
 * Return true if at least one of parent node is collapsed
 *
 * @returns {Boolean}
 */
TableTree.prototype.isOneOfParentsCollapsed = function($tr) {
  if (this.getDepth($tr) === 0) {
    return false;
  } else {
    let $parentNode = $(this.getParentNode($tr));
    if (this.isCollapsed($parentNode)) {
      return true;
    } else {
      return this.isOneOfParentsCollapsed($parentNode);
    }
  }
};

/**
 * 折叠节点
 * @param $trs
 */
TableTree.prototype.collapse= function($trs) {
  let self = this;
  $trs.each(function() {
    let $this = $(this);
    if (self.getChildNodes($this).length && !self.isCollapsed($this)) {
      $this.trigger("collapse");
      $this.trigger("change");
    }
  });

};
/**
 * 折叠所有节点
 *
 * @returns {Node}
 */
TableTree.prototype.collapseAll = function() {
  this.collapseRecursive(this.getRootNodes());
};
/**
 * Collapse current node and all child nodes begin from current
 *
 */
TableTree.prototype.collapseRecursive = function($trs) {
  let self = this;
  $trs.each(function() {
    let $this = $(this);
    self.collapse($this);
    if(self.getChildNodes($this)){
      self.collapseRecursive(self.getChildNodes($this));
    }
  });
};
TableTree.prototype.expand = function($tr) {
  if (this.getChildNodes($tr).length && !this.isExpanded($tr)) {
    $tr.trigger("expand");
    $tr.trigger("change");
  }else if(
    this.getChildNodes($tr).length === 0 &&
    this.isTrFirstExpand($tr) &&
    $tr.is('[data-ajax]') &&
    !this.isExpanded($tr)){
    //判断是否需要使用ajax加载节点
    this.load($tr);
  }
  return this;
};
/**
 * Expand all nodes
 *
 * @returns {Node}
 */
TableTree.prototype.expandAll = function() {
  this.expandRecursive(this.getRootNodes());
};
/**
 * Expand current node and all child nodes begin from current
 *
 * @returns {Node}
 */
TableTree.prototype.expandRecursive = function($trs) {
  let self =  this;
   $trs.each(function() {
    let $this = $(this);
    self.expand($this);
    if(self.getChildNodes($this)){
      self.expandRecursive(self.getChildNodes($this));
    }
  });

};
/**
 * ajax动态加载下级节点
 * @param $tr
 * @returns {boolean}
 */
TableTree.prototype.load = function ($tr) {
  let $this = $tr;
  if ($this.data('ajaxSending')) {
    return false;
  }
  let types = ($this.data('ajax') || 'get.json').split('.');
  let opts = {};
  opts.element = $this;
  opts.url = $this.data('ajaxUrl') || $this.attr('href') || $this.attr('action') || '';
  opts.dataType = types.length >= 2 ? types[1] : 'json';
  opts.method = ($this.attr('method') || (types[0] ? types[0] : 'GET')).toUpperCase();
  opts.data = utils.parseJson($this.data('ajaxData'));
  opts.data = $.extend(opts.data, {treeId:$tr.data('treeId')});
  let self = this;
  $.ajax(opts).then(function (data) {
    let trs = $(data).filter('tr').each(function () {
      $(this).attr('data-tree-parent', $tr.data('treeId'));
      $(this).attr('data-tree-id', "tree" + Math.round(Math.random() * 10000));
    });

    $(trs).insertAfter($tr);
    self.table.initUI();
    self.initNode(trs);
    self.render(trs);
    self.expand($tr)
  });

};
TableTree.prototype.saveState = function($tr) {
  if (typeof $.cookie === 'function') {
    let stateArrayString = $.cookie(this.saveStateName) || '';
    let stateArray = (stateArrayString === '' ? [] : stateArrayString.split(','));
    let nodeId = $tr.data('treeId').toString();

    if (this.isExpanded($tr)) {
      if ($.inArray(nodeId, stateArray) === -1) {
        stateArray.push(nodeId);
      }
    } else if (this.isCollapsed($tr)) {
      if ($.inArray(nodeId, stateArray) !== -1) {
        stateArray.splice($.inArray(nodeId, stateArray), 1);
      }
    }
    $.cookie(this.saveStateName, stateArray.join(','));
  }
};
TableTree.prototype.restoreState = function($tr) {
  if (typeof $.cookie === 'function') {
    let stateArray = ($.cookie(this.saveStateName) || '').split(',');
    if ($.inArray($tr.data('treeId').toString(), stateArray) !== -1) {
      this.expand($tr);
    } else {
      this.collapse($tr);
    }
  }
};
TableTree.prototype.isFirstInit = function() {
  if (this.table.data('first_init') === undefined) {
    this.table.data('first_init', $.cookie(this.saveStateName) === undefined);
  }
  return this.table.data('first_init');
};
TableTree.prototype.isTrFirstExpand = function ($tr) {
  let isBool = typeof $tr.data('first-expand') === 'undefined';
  $tr.data('first-expand', true);
  return isBool;
};

$(function () {
  $.fn.uiTableTree = function () {
    $(this).each((i, e) => {
      const $this = $(e), inited = $this.data('tableTreeObj');
      if (inited) {
        return;
      }
      $this.data('tableTreeObj', new TableTree($this));

    });

  };
})

export default {
  config: {
    paths:{
    },
  },
  onload: () => {
    $('table.table-tree').uiTableTree();
  },
  event: (elm) => {
    $(elm).find('table.table-tree').uiTableTree();
  }
}