import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import {ApiOptions, logJson} from '../config/apiOptions.js'
import { generateUUID, generateMd5, dealrespon } from '../tool/allTool.js';
/*
option={
	key	事项类型的key
	name	名字
}
*/
function createItemType(option) {
	const url = option.domainName + '/parse/classes/ItemType';
	const payload = JSON.stringify({
		"name": option.name,
		"key": option.key,
		"icon": "/icons/Issue_Plan.svg",
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
	});
	const params = {
	headers: {
		'Content-Type': 'text/plain',
		'Cookie': option.token
	},};
	const res = http.post(url, payload, params);
	if (
		!check(res, {
			'createItemType code status': (res) => res.status == 200 || res.status == 201,
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
function createItemTypeScheme(option) {
	const url = option.domainName + '/parse/classes/ItemTypeScheme'; 
	const itemtypeList = [{"key":option.key,"children":[{"key":option.key,"objectId":option.objectId}],"expanded":true,"objectId":option.objectId}]
	const payload = JSON.stringify({
		"hierarchy": JSON.stringify(itemtypeList),
		"name": option.name,
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
	})
	const params = {
		headers: {
			'Content-Type': 'text/plain',
			'Cookie': option.token
		},};
	const res = http.post(url, payload, params);
	if (
		!check(res, {
			'createItemTypeScheme code status': (res) => res.status == 200 || res.status == 201,
		})
	  ) {
		console.log(url, payload, params, res.body, res.json())
	  }
	return res

}

//----------------华丽的分割线--------------
//---------下面写用例，上面是接口参数封装-----------
//----------------华丽的分割线--------------

/*
params={
	jsonpath	通过jsonpath方式返回结果 ""
	key	通过获取key返回 []
	data 需要传递的值(通常是上个接口返回的值用于下个接口) {}
}
空默认返回res.json()
*/
export function apicreateItemType(params={}){
	const option = ApiOptions
	option.name = params.name + ApiOptions.projectuuid
	option.key = params.key + ApiOptions.projectuuid
	let res = createItemType(option)
	let Itemlog = logJson
	Itemlog.name = "createItemType"
	Itemlog.uuid = generateUUID()
	Itemlog.testCaseId = generateMd5("createItemType")
	Itemlog.fullName = "前置操作#createItemType"
	if ([200,201].includes(res.status)){
		Itemlog.status = "pass"
	}else{
		Itemlog.status = "broken"
	}
	console.log(Itemlog)
	console.log(res.json(), "@@@@@@###")
	return dealrespon(res.json(), params.params)
}

export function apicreateItemTypeScheme(params={}){
	const option = ApiOptions
	option.name = params.name + ApiOptions.projectuuid
	option.key = params.key + ApiOptions.projectuuid
	option.objectId = params.objectId
	let res = createItemTypeScheme(option)
	let Itemlog = logJson
	Itemlog.name = "createItemTypeScheme"
	Itemlog.uuid = generateUUID()
	Itemlog.testCaseId = generateMd5("createItemTypeScheme")
	Itemlog.fullName = "前置操作#createItemTypeScheme"
	if ([200,201].includes(res.status)){
		Itemlog.status = "pass"
	}else{
		Itemlog.status = "broken"
	}
	console.log(Itemlog)
	console.log(res.json())
	return dealrespon(res.json(), params.params)
}