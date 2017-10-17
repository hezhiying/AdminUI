/**
 * 扩展string方法
 */
($=>{

  //扩展jQuery字符串方法
  $.extend(String.prototype,{
    //a=1&b=2 转成json
    toJson:function() {
      let str = this;
      //去掉第一个?号
      if(this[0] === "?"){
        str = this.substr(1);
      }
      let search,args ={};
      search = str.split("&");
      for( let i = 0; i < search.length; i++){
        let key = search[i].split("=")[0] || '';
        let value = search[i].split("=")[1] || '';
        if(key){
          args[key] = value;
        }
      }
      return args;
    },
    parseArgs : function() {
      let re = /\$(.+?)\$/g, match, args = [];
      while (match = re.exec(this)) {
        args.push(match[1]);
      }
      return args;
    },
    //是否整型
    isInteger : function() {
      return (new RegExp(/^\d+$/).test(this));
    },

    isNumber : function(value, element) {
      return (new RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(this));
    },

    //第一个字符是不是pattern
    startsWith : function(pattern) {
      return this.indexOf(pattern) === 0;
    },
    //最后一个字符是不是pattern
    endsWith : function(pattern) {
      let d = this.length - pattern.length;
      return d >= 0 && this.lastIndexOf(pattern) === d;
    },
    //手机号码验证
    isMobile:function () {
      return  this.length === 11 && /^(((1[3|4|5|7|8][0-9]{1}))+\d{8})$/.test(this);
    },
    //电话或者手机号验证
    isTel:function () {
      let tel = /^(\d{3,4}-?)?\d{7,9}$/g;
      return tel.test(this) || this.isMobile();
    },
    //中文字符验证
    isChinese:function () {
      return /^[\u0391-\uFFE5]+$/.test(this);

    },
    //英文字符验证
    isEnglish:function () {
      return  /^[A-Za-z]+$/.test(this);

    }
  });

})(jQuery);