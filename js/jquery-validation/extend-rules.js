
// 手机号码验证
$.validator.addMethod("isMobile", function(value, element, params) {
  //this.optional(elm);判断表单控件值不为空:true
  return this.optional(element) || value.isMobile();
}, "请正确填写您的手机号码。");

// 联系电话(手机/电话皆可)验证
$.validator.addMethod("isTel", function(value,element) {
  return this.optional(element) || value.isTel();
}, "请正确填写您的联系方式");

// 判断中文字符
$.validator.addMethod("isChinese", function(value, element) {
  return this.optional(element) || value.isChinese();
}, "只能包含中文字符。");

// 判断英文字符
$.validator.addMethod("isEnglish", function(value, element) {
  return this.optional(element) || value.isEnglish();
}, "只能包含英文字符。");