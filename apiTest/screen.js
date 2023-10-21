import http from 'k6/http';
import { sleep,check } from 'k6';
import {ApiOptions, logJson} from '../config/apiOptions.js'
import { request } from '../k6http/k6http.js';
import { generateUUID, dealrespon,httpRequestToCurl,consoleLog } from '../tool/allTool.js';
const params = {
	headers: {
		'Content-Type': 'application/json',
		'Cookie': ApiOptions.token
	},};
const params1 = {
	headers: {
		'Content-Type': 'text/plain',
		'Cookie': ApiOptions.token
	},};
/*
option={
	key	事项类型的key
	name	名字
}
*/
function createScreen(option) {
	const path = '/parse/classes/Screen';
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
	option.requestname = 'createScreen'
	const res = request(option, 'POST', path, payload, params1)
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
	const path = '/parse/classes/CustomField'; 
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
	option.requestname = 'createScreen'
	const res = request(option, 'POST', path, payload, params1)
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
	let option = JSON.parse(JSON.stringify(ApiOptions));
	option.name = params.name + ApiOptions.projectuuid
	option.key = params.key + ApiOptions.projectuuid
	option.objectId = params.objectId
	option.group = params.group
	option.casename = params.casename
	let res = createField(option)
	// console.log(res.json(), "@@@@@@###")
	return dealrespon(res.json(), params.params)
}

export function apicreateScreen(params={}){
	let option = JSON.parse(JSON.stringify(ApiOptions));
	option.name = params.name + ApiOptions.projectuuid
	option.group = params.group
	option.casename = params.casename
	option.children = params.children
	let res = createScreen(option)
	return dealrespon(res.json(), params.params)
}