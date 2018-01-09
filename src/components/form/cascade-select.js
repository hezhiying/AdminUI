/**
 * cascade select 模式
 * @param $cascade
 * @constructor
 */
const CascadeSelect = function ($cascade) {
  this.target = $cascade;
  let types = (this.target.data('cascadeAjax') || 'get.json').split('.');
  this.ajax = {
    url: this.target.data('cascadeUrl'),
    dataType: types.length >= 2 ? types[1] : 'json',
    method: (types[0] ? types[0] : 'GET').toUpperCase()
  };
  this.cascadeData = undefined;
  this.cacheData = [];
  let selects = $cascade.data('cascadeSelect').split(',');
  this.selects = []; //{"name":"province", "elm":$("[name=province]")}
  let self = this;
  //遍历初始化
  selects.forEach((key, index) => {
    let $elm = key.startsWith('#') || key.startsWith('.') ? $(key) : this.target.find("select[name='" + key + "']");
    let placeholder = $elm.children('option').length ? $elm.html() : '<option>请选择</option>';
    this.selects.push({"name": key, "elm": $elm, placeholder: placeholder, data: []});
    $elm.data('selectIndex', index);
    $elm.change(function () {
      let _index = $(this).data('selectIndex');
      let val = $(this).val();
      let nextIndex = _index + 1;
      let prevIndex = _index ? _index - 1 : _index;
      //如果值为空 或 当前下拉框是最一级则不操作
      if (val === '' || !self.selects[nextIndex]) {
        return;
      }

      //已加载过的ajax数据缓存
      let cachedKey = _index + '_' + val + '_' + self.selects[prevIndex]['elm'].val();

      //================一次加载数据的方式=======================================
      if (self.cascadeData !== undefined) {
        self.selects[_index]['data'].forEach((item, i) => {
          if (item.val === $(this).val()) {
            self.selects[nextIndex]['data'] = item.children;
          }
        });
        self.render(nextIndex);
        return;
      }
      //================每次动态ajax加载的方式=======================================
      if (self.ajax.url) {
        if (self.cacheData[cachedKey]) {
          //如果已ajax加载直接读取
          self.selects[nextIndex]['data'] = self.cacheData[cachedKey];
          self.render(nextIndex)
        } else {
          //拼接参数，会把级联到本级的下拉框选择的结果，和query
          let param = "query=" + self.selects[_index + 1]['elm'].attr('name') + "&" + $(this).attr('name') + "=" + $(this).val();
          self.selects.forEach((item, i) => {
            if (i < _index) {
              param += "&" + self.selects[i]['elm'].attr('name') + "=" + self.selects[i]['elm'].val();
            }
          });

          $.ajax({url: self.ajax.url, data: param, dataType: self.ajax.dataType, method: 'GET'}).then(data => {
            self.selects[nextIndex]['data'] = data;
            self.cacheData[cachedKey] = data;
            self.render(nextIndex)
          })
        }

      }
    });
  });
  this.initData();
};

//初始化数据
CascadeSelect.prototype.setData = function (data) {
  this.cascadeData = data;
  this.selects[0]['data'] = this.cascadeData;
  this.render(0)
};

//初始化数据
CascadeSelect.prototype.initData = function (sIndex = 0) {
  let self = this;
  if (this.cascadeData) {
    //==========有数据直接渲染
    self.selects[0]['data'] = this.cascadeData;
    self.render(0);
  } else if (this.target.data('cascadeData')) {
    //==========通过ajax一次性获取数据
    $.ajax({
      url: this.target.data('cascadeData'),
      dataType: this.ajax.dataType,
      method: this.ajax.method
    }).then(function (data) {
      self.cascadeData = data;
      self.selects[0]['data'] = data;
      self.render(0);
    });
  } else if (this.target.data('cascadeUrl')) {
    //==========通过ajax动态加载
    let param = "query=" + self.selects[0]['elm'].attr('name');
    $.ajax({url: this.ajax.url, data: param, dataType: this.ajax.dataType, method: this.ajax.method}).then(data => {
      self.selects[0]['data'] = data;
      self.render(0)

    })
  }
};

//填充数据
CascadeSelect.prototype.render = function (selectIndex) {
  //初始化select列表
  this.selects.forEach((item, index) => {
    if (index >= selectIndex) {
      this.selects[index]['elm'].html('');
      this.selects[index]['elm'].append(this.selects[index]['placeholder']);
    }
  });
  //填充数据到select
  if (this.ajax.dataType === 'html') {
    this.selects[selectIndex]['elm'].append(this.selects[selectIndex]['data']);
  } else {
    this.selects[selectIndex]['data'].forEach((item, index) => {
      let sname = typeof item === 'string' ? item : item.name;
      let sval = typeof item === 'string' ? item : item.val;
      this.selects[selectIndex]['elm'].append("<option value='" + sval + "'>" + sname + "</option>");
    });
  }


  //设置默认值如果有
  if (this.selects[selectIndex]['elm'].data('value') &&
    this.selects[selectIndex]['elm'].children("option[value='" + this.selects[selectIndex]['elm'].data('value') + "']").length) {
    this.selects[selectIndex]['elm'].val(this.selects[selectIndex]['elm'].data('value')).change()
  }
};

export {CascadeSelect};