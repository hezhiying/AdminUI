/**
 * 获取参数
 * <script src="xxx.js?mm=123"> getScriptArg('mm') = 123
 * @param key
 * @returns {null}
 */
export function getScriptArg(key){
	let scripts=document.getElementsByTagName("script"),
		script=scripts[scripts.length-1],
		src=script.src;
	return (src.match(new RegExp("(?:\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
}