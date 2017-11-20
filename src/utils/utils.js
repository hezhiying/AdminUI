/**
 * 获取url参数，
 * @param key 参数名
 * @returns {null}
 */
let getScriptArg = function(key){
  let scripts=document.getElementsByTagName("script"),
    script=scripts[scripts.length-1],
    src=script.src;
  return (src.match(new RegExp("(?:\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
};

/**
 * 延迟运行，
 * @param condFun 要运行的条件 为一个function
 * @param callback 要运行的方法 会50ms一次检查 condFun 如果为true则会执行
 * @param ttl 最长等待时间
 */
let lazyRun = function (condFun, callback, ttl = 2000) {
  let times = 0; //等待次数
  let clock;
  let interval = 50; //间隔

  let handleRun = function () {
    times++;
    //加载超时程序继续往下执行
    if(condFun()){
      clearTimeout(clock);
      return callback();
    }else if (times * interval >= ttl) {
      clearTimeout(clock);
      console.warn("延迟执行无法等到想要的结果");
      return false;
    }
    return false;
  };
  if(handleRun() === false){
    clock = setInterval(handleRun, interval);
  }
};

let parseJson = function(param){
  let obj={};
  if(typeof param !== 'string')return obj;

  let keyvalue=[];
  let key="",value="";
  let paraString = param.split("&");
  for(let i in paraString)
  {
    keyvalue=paraString[i].split("=");
    key=keyvalue[0];
    value=keyvalue[1];
    obj[key]=value;
  }
  return obj;
};

export default  {
  parseJson,
  lazyRun,
  getScriptArg
}