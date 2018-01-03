
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

// 通用用户名规则
$.validator.addMethod("username", function(value, element) {
  let rule = /^[a-z][a-z0-9_]{5,15}$/i;
  return this.optional(element) || rule.test(value);
}, "必须是英文字母、数字和下划线组成的6~16位字符，并且必须以字母开头!");