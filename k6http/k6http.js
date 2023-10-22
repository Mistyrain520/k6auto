import http from 'k6/http';
import { sleep,check } from 'k6';
import {httpRequestToCurl,consoleLog } from '../tool/allTool.js';
export function request(option, method, path, payload, params){
    let url = option.domainName + path;
    let start = new Date().getTime();
	let res = http.request(method, url, payload, params);
	let stop = new Date().getTime();
	check(res, {
		[path]: (res) => res.status == 200 || res.status == 201,
	})
	if (!option.isNotLog){
	consoleLog({
		'group': option.group,
		'casename': option.casename || option.requestname,
		'resStatus': res.status,
		'start': start,
		'stop': stop,
		'description': httpRequestToCurl(method, url, params.headers, payload),
		'statusDetails': {'message': res.body || '无返回体,点击可查看更多信息', 'trace': res.error},
	})
	}
	return res
}
//		'description': httpRequestToCurl(method, url, params.headers, payload) + '----华丽的分割线----' + (res.body || '无返回体'),
