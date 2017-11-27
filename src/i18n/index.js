import en from './en_local';
import zh from './zh_local';


//语言包
$.lang = function (name, l = 'zh') {
  let msg = $.extend(true, {}, en, zh);
  if(l === 'en'){
     msg = en;
  }

  let names =  name.split('.');
  let result = msg[names.shift()];
  if(result){
    for(let key of names){
      if(result[key]){
        result = result[key]
      }else{
        result = key;
      }
    }
  }else{
    result = names.pop();
  }
  return result;
};

