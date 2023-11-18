import http from 'k6/http';
import { sleep,check } from 'k6';
import { httpRequestToCurl} from '../tool/allTool.js';
import {ApiOptions} from '../config/apiOptions.js'
export function request(option, method, path, payload, params){
    let url = ApiOptions.domainName + path;
    let start = new Date().getTime();
	let res = http.request(method, url, payload, params);
	let stop = new Date().getTime();
	check(res, {
		[path]: (res) => res.status == 200 || res.status == 201,
	})
	// let mycheck = []
	// mycheck.push({
	// 		"name": "Step 1",
	// 		"status": "passed",
	// 	},
	// 	{
	// 		"name": "Step 1",
	// 		"status": "passed",
	// 	},
	// )
	if (!option.isNotLog){
		return {'res':res, 'report': {
			'group': option.group,
			'casename': option.casename || option.requestname,
			'resStatus': res.status,
			'start': start,
			'stop': stop,
			'description': httpRequestToCurl(method, url, params.headers, payload),
			'message': res.body || '无返回体,点击可查看更多信息',
			'trace': res.error
		}}
	}
		
	return {'res':res, 'report': null}
}
//		'description': httpRequestToCurl(method, url, params.headers, payload) + '----华丽的分割线----' + (res.body || '无返回体'),
