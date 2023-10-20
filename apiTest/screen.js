import http from 'k6/http';
import { sleep,check } from 'k6';
import {ApiOptions, logJson} from '../config/apiOptions.js'
import { generateUUID, generateMd5, dealrespon } from '../tool/allTool.js';
const params = {
	headers: {
		'Content-Type': 'application/json',
		'Cookie': ApiOptions.token
	},};
/*
option={
	key	事项类型的key
	name	名字
}
*/
function createScreen(option) {
	const url = option.domainName + '/parse/classes/Screen';
	const payload = JSON.stringify({
			"layout":{
				"_id": generateUUID(),
				"component":"_c_root",
				"children":option.children
			},
			"name":option.name,
			"_ApplicationId":option.tenant,
			"_SessionToken":option.token
		});
	const res = http.post(url, payload, params);
	if (
		!check(res, {
			'createScreen code status': (res) => res.status == 200 || res.status == 201,
		})
	  ) {
		console.log(url, payload, params, res.body, res.json())
		// res.debugcurl = '这里组装curl'
	  }
	return res
}
/*
option={
	key	事项类型的key
	objectId	事项类型的id
	name	名字
}
*/
function createField(option) {
	const url = option.domainName + '/parse/classes/CustomField'; 
	const payload = JSON.stringify({
		"property": {},
		"name": option.name,
		"key": option.key,
		"fieldType": {
			"__type": "Pointer",
			"className": "FieldType",
			"objectId": option.objectId
		},
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
	})
	let params1 = params;
	params1['headers']['Content-Type'] = 'text/plain'
	const res = http.post(url, payload, params1);
	if (
		!check(res, {
			'createField code status': (res) => res.status == 200 || res.status == 201,
		})
	  ) {
		console.log(url, payload, params1, res.body, res.json())
	  }
	return res

}

//----------------华丽的分割线--------------
//---------下面写用例，上面是接口参数封装-----------
//----------------华丽的分割线--------------

/*
params={
	params : 
		jsonpath	通过jsonpath方式返回结果 ""
		key	通过获取key返回 []
	other: 需要传递的值
}
空默认返回res.json()
*/
export function apicreateField(params={}){
	const option = ApiOptions
	option.name = params.name + ApiOptions.projectuuid
	option.key = params.key + ApiOptions.projectuuid
	option.objectId = params.objectId
	let res = createField(option)
	let Itemlog = logJson
	Itemlog.name = "createField"
	Itemlog.uuid = generateUUID()
	Itemlog.historyId = generateUUID()
	Itemlog.testCaseId = generateMd5("createField")
	Itemlog.fullName = "前置操作#createField"
	if ([200,201].includes(res.status)){
		Itemlog.status = "passed"
	}else{
		Itemlog.status = "broken"
	}
	console.log(Itemlog)
	// console.log(res.json(), "@@@@@@###")
	return dealrespon(res.json(), params.params)
}

export function apicreateScreen(params={}){
	const option = ApiOptions
	option.name = params.name + ApiOptions.projectuuid
	option.children = params.children
	let res = createScreen(option)
	let Itemlog = logJson
	Itemlog.name = "createScreen"
	Itemlog.uuid = generateUUID()
	Itemlog.historyId = generateUUID()
	Itemlog.testCaseId = generateMd5("createScreen")
	Itemlog.fullName = "前置操作#createScreen"
	if ([200,201].includes(res.status)){
		Itemlog.status = "passed"
	}else{
		Itemlog.status = "broken"
	}
	console.log(Itemlog)
	return dealrespon(res.json(), params.params)
}
