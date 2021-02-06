import timeFormat from '../../libs/function/timeFormat.js';

/**
 * 时间戳转为多久之前
 * @param String timestamp 时间戳
 * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 */
function timeFrom(timestamp = null, format = 'yyyy-mm-dd') {
	if (timestamp == null) timestamp = Number(new Date());
	timestamp = parseInt(timestamp);
	// 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
	if (timestamp.toString().length == 10) timestamp *= 1000;
	let timedats = timedat(timestamp)
	var week = getWeek(timedats)
	
	var timer = (new Date()).getTime() - timestamp;
	
	
	timer = parseInt(timer / 1000);
	// 如果小于5分钟,则返回"刚刚",其他以此类推
	let tips = '';
	switch (true) {
		case timer < 300:
			tips = '刚刚';
			break;
		case timer >= 300 && timer < 3600:
			tips = parseInt(timer / 60) + '分钟前';
			break;
		case timer >= 3600 && timer < 86400:
			tips = parseInt(timer / 3600) + '小时前';
			break;
		case timer >= 86400 && timer < 2592000:
			if(timer >= 86400 && timer < 172800) {
				tips = '昨天';
				break;
			} else if(timer>= 172800 && timer < 259200) {
				tips = '前天';
				break;
			} else if(timer>= 259200 && timer < 604800) {
				tips = week;
				break;
			} else {
				tips = parseInt(timer / 86400) + '天前';
				break;
			}
		default:
			// 如果format为false，则无论什么时间戳，都显示xx之前
			if(format === false) {
				if(timer >= 2592000 && timer < 365 * 86400) {
					tips = parseInt(timer / (86400 * 30)) + '个月前';
				} else {
					tips = parseInt(timer / (86400 * 365)) + '年前';
				}
			} else {
				tips = timeFormat(timestamp, format);
			}
	}
	return tips;
}
function timedat(res){   //res 为传入的时间戳   例：1509091800000
    var time = new Date(res);
    var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	return y+'-'+m+'-'+d;
};

//根据时间判断星期几
function getWeek(timedat) {  //timedat参数格式：   getWeek（new Date("2017-10-27" )）
   let weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
   
   let week = weekArr[new Date(timedat).getDay()]
   
   return week;
}
export default timeFrom;
