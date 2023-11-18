import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { request } from '../k6http/k6http.js';
import {ApiOptions} from '../config/apiOptions.js'
import {dealrespon, consoleLog,checkExpectation } from '../tool/allTool.js';
import { expect } from "../tool/chaijs.js";
/*
option={
	key	事项类型的key
	name	名字
}
*/
const request_params = {
	timeout: '30s',
	headers: {
		'Content-Type': 'text/plain',
		'Cookie': ApiOptions.token
	},};
export function delByParse(option) {
	const path = '/parse/classes/' + option.tablename +'/' + option.objectId;
	const payload = JSON.stringify({
		"_method": "DELETE",
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
	});
	option.requestname = option.tablename
	const res = request(option, 'POST', path, payload, request_params)
	if (!option.isNotLog){
		res.report.steps = [
			{"name": "返回状态200或者201",
			"status": 	checkExpectation(() => expect([200,201]).to.be.an("array").that.includes(res.res.status)).pass || 'broken',
			"parameters": [{'name': '实际结果', 'value': checkExpectation(() => expect([200,201]).to.be.an("array").that.includes(res.res.status)).fail || res.res.status}]
			},
			{
			"name": "返回包含objectId",
			"status": 	checkExpectation(() => expect(res.res.json()).to.have.property("objectId")).pass || 'broken',
			"parameters": [{'name': '实际结果', 'value': checkExpectation(() => expect(res.res.json()).to.have.property("objectId")).fail || res.res.json().objectId}]
			}
		]
		consoleLog(res.report)
	}
	return res.res
}
export function createByParse(option) {
	const path = '/parse/classes/' + option.tablename;
	option.requestname = option.tablename
	const res = request(option, 'POST', path, option.payload, request_params)
	if (!option.isNotLog){
		res.report.steps = [
			{"name": "返回状态200或者201",
			"status": 	checkExpectation(() => expect([200,201]).to.be.an("array").that.includes(res.res.status)).pass || 'broken',
			"parameters": [{'name': '实际结果', 'value': checkExpectation(() => expect([200,201]).to.be.an("array").that.includes(res.res.status)).fail || res.res.status}]
			},
			{
			"name": "返回包含objectId",
			"status": 	checkExpectation(() => expect(res.res.json()).to.have.property("objectId")).pass || 'broken',
			"parameters": [{'name': '实际结果', 'value': checkExpectation(() => expect(res.res.json()).to.have.property("objectId")).fail || res.res.json().objectId}]
			}
		]
		consoleLog(res.report)
	}
	return res.res
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
	// const option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
		"name": params.name + ApiOptions.projectuuid,
		"key": params.key + ApiOptions.projectuuid,
		"icon": "/icons/Issue_Plan.svg",
		"_ApplicationId": ApiOptions.tenant,
		"_SessionToken": ApiOptions.token
	});
	params.tablename = 'ItemType'
	params.payload = payload
	let res = createByParse(params)
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
	//组装事项类型方案的请求载荷payload
	let key = params.key + ApiOptions.projectuuid
	let objectId = params.objectId
	const itemtypeList = [{"key":key,"children":[{"key":key,"objectId":objectId}],"expanded":true,"objectId":objectId}]
	const payload = JSON.stringify({
		"hierarchy": JSON.stringify(itemtypeList),
		"name": params.name + ApiOptions.projectuuid,
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
	})
	option.tablename = 'ItemTypeScheme'
	option.group = params.group
	option.casename = params.casename
	option.payload = payload
	let res = createByParse(option)
	try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}
}