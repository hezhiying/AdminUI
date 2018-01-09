/**
 * cascade input 模式
 * @param $cascade
 * @constructor
 */
const CascadeInput = function ($cascade) {
  this.isInit = false;
  this.target = $cascade;
  //默认值
  this.defaultValue = this.target.val() || '';
  //默认显示内容，为空使用val
  this.defaultShowValue = (this.target.data('showValue') || this.defaultValue.replace(/,/g, '/')).replace(/\//g, ' / ');

  this.placeholder = this.target.attr('placeholder') || '请选择';
  let types = (this.target.data('cascadeAjax') || 'get.json').split('.');
  this.ajax = {
    url: this.target.data('cascadeUrl'),
    dataType: types.length >= 2 ? types[1] : 'json',
    method: (types[0] ? types[0] : 'GET').toUpperCase()
  };
  this.cascadeData = undefined;
  this.cacheData = [];
  this.selectedValue = this.defaultValue.split(',');
  this.createElm();
  this.initEvent();
  this.show(this.defaultShowValue);

};

/**
 * 初始化html模版
 */
CascadeInput.prototype.createElm = function () {
  this.containerElm = $('<div class="cascade cascade-container"></div>');
  this.selectionElm = $(
    '<div class="cascade-selection">' +
    '<input autocomplete="off" spellcheck="false" type="text" placeholder="' + this.placeholder + '" readonly="readonly" class="cascade-container-input">' +
    // '<span class="cascade-selection_arrow"><b></b></span>' +
    '<span class="cascade-selection_arrow"><b></b><i class="fa fa-times-circle"></i></span>' +
    '</div>').appendTo(this.containerElm);
  this.dropdownElm = $('<div class="cascade-dropdown"><div class="cascade-dropdown-wrapper">暂无数据</div></div>').appendTo(this.containerElm);
  this.dropdownElm = this.dropdownElm.children('.cascade-dropdown-wrapper');
  this.target.after(this.containerElm);
  this.target.attr('type', 'hidden');
};

CascadeInput.prototype.initEvent = function () {
  let self = this;
  //绑定打开显示
  this.selectionElm.click(() => {
    if (this.containerElm.is('.cascade-container-open')) {
      this.containerElm.removeClass('cascade-container-open');
    } else {
      this.containerElm.addClass('cascade-container-open');
      this.containerElm.trigger("show");
    }
  });

  //绑定清除内容事件
  this.selectionElm.find('span.cascade-selection_arrow i').click(function (event) {
    event.stopPropagation();
    self.selectedValue = [];
    self.defaultShowValue = '';
    self.defaultValue = '';
    self.target.val('');
    self.show('');
    self.dropdownElm.html('');
    self.isInit = false;
    console.log(self.dropdownElm,self.dropdownElm.children('.cascade-dropdown-wrapper').length)
  });

  //点击空白关闭选择界面
  $(document).click(function (event) {
    if ($(event.target).closest(self.containerElm).length === 0 && self.containerElm.is('.cascade-container-open')) {
      self.containerElm.removeClass('cascade-container-open')
    }
  });

  //绑定选择点击事件
  this.dropdownElm.off().on('click', 'li', function () {
    let $this = $(this);
    $(this).siblings('li').removeClass('active');
    $(this).addClass('active');
    let level = $(this).closest('span[data-level]').data('level');
    let value = $(this).data('value');
    let children = $(this).data('children');
    //清空下级数据，如果有的话
    self.dropdownElm.find("span[data-level=" + level + "]").children('span').remove();

    let result = [];
    let list = [];
    self.dropdownElm.find('li.active').each((index, li) => {
      result.push($(li).text());
      list.push($(li).data('value'));
    });
    self.selectedValue = list;


    if($this.data('cascadeLeaf')){
      self.show(result.join(' / '));
      self.target.val(self.selectedValue);
      return;
    }
    if (self.cascadeData) {
      //非动态加载数据模式
      //如果后代数据，则渲染下一级数据
      if (children.length) {
        self.renderColumn(children, level + 1, self.dropdownElm.find("span[data-level=" + level + "]"));

        // self.dropdownElm.find("span[data-level=" + level + "]").append(self.renderColumn(children, level + 1))
      } else {
        //如果是叶子数据，则更新显示和值
        self.show(result.join(' / '));
        self.target.val(self.selectedValue);
      }
    } else if (self.ajax.url) {
      let cachedKey = self.selectedValue.join('_');
      let prevCachedKey = self.selectedValue.slice(0, self.selectedValue.length-1).join('_');
      //ajax动态加载数据模式
      if (self.cacheData[cachedKey]) {
        //如果已ajax加载直接读取
        self.renderColumn(self.cacheData[cachedKey], level + 1, self.dropdownElm.find("span[data-level=" + level + "]"));

        // self.dropdownElm.find("span[data-level=" + level + "]").append(self.renderColumn(self.cacheData[cachedKey], level + 1))
        if($this.data('cascadeLeaf')){
          self.show(result.join(' / '));
          self.target.val(self.selectedValue);
        }
      } else {
        //拼接参数，会把级联到本级的下拉框选择的结果，和query
        let param = "key=" + self.selectedValue;

        $.ajax({url: self.ajax.url, data: param, dataType: self.ajax.dataType, method: 'GET'}).then(data => {
          self.cacheData[cachedKey] = self.formatData(data);
          if (data.length) {
            //有数据，渲染显示
            self.renderColumn(data, level + 1, self.dropdownElm.find("span[data-level=" + level + "]"));

            // self.dropdownElm.find("span[data-level=" + level + "]").append(self.renderColumn(data, level + 1))
          } else {
            //当前是最后一级
            //将当前值所在的数据列中，将leaf置为true
            self.cacheData[prevCachedKey][value]['leaf'] = true;
            $this.data('cascadeLeaf', true);
            $this.children('i').remove();
            self.show(result.join(' / '));
            self.target.val(self.selectedValue);
          }
        })
      }
    }

  });
  //监听
  this.containerElm.on("show", function (event) {
    let $this = $(this);
    if(self.isInit === false){
      self.initData();
    }
  });
};
//初始化数据
CascadeInput.prototype.setData = function (data) {
  this.cascadeData = data;

};

//显示选择结果
CascadeInput.prototype.show = function (str) {
  this.selectionElm.find('input').val(str).change();
  if(str){
    this.selectionElm.addClass('has-content');
  }else{
    this.selectionElm.removeClass('has-content')
  }
};

//将ajax返回的一维字符型数组格式化为一维对象
CascadeInput.prototype.formatData = function (data) {
  let result = [];
  if(typeof data === 'string'){
    return data;
  }
  data.forEach(item => {
    if (typeof item === 'string') {
      result[item] = {name: item, val: item, leaf: false};
    } else {
      let leaf = typeof item.leaf === 'undefined' ? false : item.leaf;
      result[item.val] = {name: item.name, val: item.val, leaf: leaf};
    }
  });
  return result;
};

CascadeInput.prototype.renderColumn = function (data, level = 0, $wrapper) {

  if(typeof data === 'string'){
    let $itemElm = $('<span data-level="' + level + '"><ul class="cascade-dropdown-menu"></ul></span>');
    $itemElm.children('ul').append(data);
    $wrapper.append($itemElm);
    $itemElm.find('li.active').trigger('click');

  }else if (Object.values(data).length > 0) {
    let $itemElm = $('<span data-level="' + level + '"><ul class="cascade-dropdown-menu"></ul></span>');
    Object.values(data).forEach(item => {
      let name = typeof item === 'string' ? item : item['name'];
      let val = typeof item === 'string' ? item : item['val'];
      let leaf = typeof item.leaf === 'undefined' ? false : item['leaf'];
      let arrow = '<i class="fa fa-angle-right"></i>';
      let children = item.children ? item.children : [];
      let $li;
      if (this.cascadeData) {
        if (item.children && item.children.length) {
          $li = $('<li class="cascade-menu-item" data-value="' + val + '" data-cascade-leaf="false">' + name + arrow + '</li>');
        } else {
          $li = $('<li class="cascade-menu-item" data-value="' + val + '" data-cascade-leaf="true">' + name + '</li>');
        }
        $li.data('children', item.children);
      } else if (this.ajax.url) {
        if(leaf){
          $li = $('<li class="cascade-menu-item" data-value="' + val + '" data-cascade-leaf="'+leaf+'">' + name + '</li>');
        }else{
          $li = $('<li class="cascade-menu-item" data-value="' + val + '" data-cascade-leaf="'+leaf+'">' + name + arrow + '</li>');
        }
      }
      let defaultValue = this.defaultValue.split(',');
      if(val === defaultValue[level]){
        $li.addClass('active');
      }
      $itemElm.children('ul').append($li);
    });

    $wrapper.append($itemElm);
    $itemElm.find('li.active').trigger('click');

    if( $itemElm.find('li.active').length){
      let top = $itemElm.find('li.active').offset().top - $itemElm.offset().top;
      $itemElm.children('ul').scrollTop(parseInt(top))
    }

    // console.log('top',$itemElm.find('li.active'),$itemElm.find('li.active').offset().top,$itemElm.offset().top,$itemElm.find('li.active').offset().top - $itemElm.offset().top)
    // $itemElm.animate({scrollTop:$itemElm.find('li.active').offset().top - $itemElm.offset().top},2000)

    //return $itemElm;
    //return '<span data-level="'+level+'"><ul class="cascade-dropdown-menu">' + html + '</ul></span>';
  }
  return '';
};

CascadeInput.prototype.initData = function () {
  let self = this;
  if (this.cascadeData) {
    //==========有数据直接渲染
    // self.dropdownElm.html(self.renderColumn(this.cascadeData));
    self.renderColumn(this.cascadeData, 0, self.dropdownElm.html(''));
  } else if (this.target.data('cascadeData')) {
    //==========通过ajax一次性获取数据
    $.ajax({
      url: this.target.data('cascadeData'),
      dataType: this.ajax.dataType,
      method: this.ajax.method
    }).then(function (data) {
      self.cascadeData = data;
      self.renderColumn(data, 0, self.dropdownElm.html(''));

      // let listRender = self.renderColumn(data);
      // self.dropdownElm.html(listRender);
      // listRender.find('li.active').trigger('click')
    });
  } else if (self.cacheData.length) {
    self.renderColumn(self.cacheData[0], 0, self.dropdownElm.html(''));

    // self.dropdownElm.html(self.renderColumn(self.cacheData[0]));
  } else if (this.target.data('cascadeUrl')) {
    //==========通过ajax动态加载
    let param = "key=" + self.selectedValue;
    $.ajax({url: this.ajax.url, data: param, dataType: this.ajax.dataType, method: this.ajax.method}).then(data => {
      self.cacheData[0] = self.formatData(data);
      self.renderColumn(self.cacheData[0], 0, self.dropdownElm.html(''));

      // self.dropdownElm.html(self.renderColumn(self.cacheData[0]));
    })
  }
  this.isInit = true;
};

export {CascadeInput}