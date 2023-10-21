import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { request } from '../k6http/k6http.js';
import {ApiOptions, logJson} from '../config/apiOptions.js'
import {dealrespon, consoleLog,httpRequestToCurl } from '../tool/allTool.js';
/*
option={
	key	事项类型的key
	name	名字
}
*/
const params = {
	headers: {
		'Content-Type': 'text/plain',
		'Cookie': ApiOptions.token
	},};

function createItemType(option) {
	const path = '/parse/classes/ItemType';
	const payload = JSON.stringify({
		"name": option.name,
		"key": option.key,
		"icon": "/icons/Issue_Plan.svg",
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
	});
	option.requestname = 'createItemType'
	const res = request(option, 'POST', path, payload, params)
	return res
}
function delByParse(option) {
	const path = '/parse/classes/' + option.tablename +'/' + option.objectId;
	const payload = JSON.stringify({
		"_method": "DELETE",
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
	});
	option.requestname = option.tablename
	const res = request(option, 'POST', path, payload, params)
	return res
}

/*
option={
	key	事项类型的key
	objectId	事项类型的id
	name	名字
}
*/
function createItemTypeScheme(option) {
	const path = '/parse/classes/ItemTypeScheme'; 
	const itemtypeList = [{"key":option.key,"children":[{"key":option.key,"objectId":option.objectId}],"expanded":true,"objectId":option.objectId}]
	const payload = JSON.stringify({
		"hierarchy": JSON.stringify(itemtypeList),
		"name": option.name,
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
	})
	option.requestname = 'createItemTypeScheme'
	const res = request(option, 'POST', path, payload, params)
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
export function apicreateItemType(params={}){
	const option = JSON.parse(JSON.stringify(ApiOptions));
	option.name = params.name + ApiOptions.projectuuid
	option.key = params.key + ApiOptions.projectuuid
	option.group = params.group
	option.casename = params.casename
	let res = createItemType(option)
	try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}
}
export function apidelByParse(params={}){
	const option = JSON.parse(JSON.stringify(ApiOptions));
	option.tablename = params.tablename
	option.objectId = params.objectId
	option.group = params.group
	option.casename = params.casename
	let res = delByParse(option)
	try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}
}
export function apicreateItemTypeScheme(params={}){
	const option = JSON.parse(JSON.stringify(ApiOptions));
	option.name = params.name + ApiOptions.projectuuid
	option.key = params.key + ApiOptions.projectuuid
	option.objectId = params.objectId
	option.group = params.group
	option.casename = params.casename
	let res = createItemTypeScheme(option)
	try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}
}