import http from 'k6/http';
import { sleep,check } from 'k6';
import {ApiOptions, logJson} from '../config/apiOptions.js'
import { request } from '../k6http/k6http.js';
import { generateUUID, dealrespon } from '../tool/allTool.js';
import { apidelByParse, createByParse } from './itemType.js';
const request_param1 = {
	headers: {
		'Content-Type': 'application/json',
		'Cookie': ApiOptions.token
	},};
const request_param = {
	headers: {
		'Content-Type': 'text/plain',
		'Cookie': ApiOptions.token
	},};
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
	const payload = JSON.stringify({
		"property": {},
		"name": params.name + ApiOptions.projectuuid,
		"key": params.key + ApiOptions.projectuuid,
		"fieldType": {
			"__type": "Pointer",
			"className": "FieldType",
			"objectId": params.objectId
		},
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
	})
	option.tablename = 'CustomField'
	option.group = params.group
	option.casename = params.casename
	option.payload = payload
	let res = createByParse(option)
	try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}}

export function apicreateScreen(params={}){
	let option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
		"layout":{
			"_id": generateUUID(),
			"component":"_c_root",
			"children":params.children
		},
		"name":params.name + ApiOptions.projectuuid,
		"_ApplicationId":option.tenant,
		"_SessionToken":option.token
	});
	option.tablename = 'Screen'
	option.group = params.group
	option.casename = params.casename
	option.payload = payload
	let res = createByParse(option)
	try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}}

export function apicreateScreen(params={}){
	let option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
		"layout":{
			"_id": generateUUID(),
			"component":"_c_root",
			"children":params.children
		},
		"name":params.name + ApiOptions.projectuuid,
		"_ApplicationId":option.tenant,
		"_SessionToken":option.token
	});
	option.tablename = 'Screen'
	option.group = params.group
	option.casename = params.casename
	option.payload = payload
	let res = createByParse(option)
	try {
		return dealrespon(res.json(), params.params)
		} catch (err) {
		return dealrespon(res.body, params.params)
	}}

export function apicreateScreenScheme(params={}){
	let option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
		"name": params.name + ApiOptions.projectuuid,
		"defaultScreen": {
			"__type": "Pointer",
			"className": "Screen",
			"objectId": params.objectId
		},
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
	});
	option.tablename = 'ScreenScheme'
	option.group = params.group
	option.casename = params.casename
	option.payload = payload
	let res = createByParse(option)
	try {
		return dealrespon(res.json(), params.params)
		} catch (err) {
		return dealrespon(res.body, params.params)
	}}

	export function apicreateItemTypeScreenScheme(params={}){
		let option = JSON.parse(JSON.stringify(ApiOptions));
		const payload = JSON.stringify({
			"defaultScreenScheme": {
				"__type": "Pointer",
				"className": "ScreenScheme",
				"objectId": option.objectId
			},
			"name": option.name + ApiOptions.projectuuid,
			"_ApplicationId": "osc",
			"_SessionToken": "r:b6e33133713a9b40cb6444a79326a1dd"
		});
		option.tablename = 'ItemTypeScreenScheme'
		option.group = params.group
		option.casename = params.casename
		option.payload = payload
		let res = createByParse(option)
		try {
			return dealrespon(res.json(), params.params)
			} catch (err) {
			return dealrespon(res.body, params.params)
		}}