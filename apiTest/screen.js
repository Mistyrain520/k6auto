import {ApiOptions, logJson} from '../config/apiOptions.js'
import { generateUUID, dealrespon } from '../tool/allTool.js';
import {createByParse } from './itemType.js';
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
	// option.params = request_param 
	//封装的parse已经有params了，不需要单独传了
	let res = createByParse(option)
	try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}
}

export function apicreateScreen(params={}){
	let option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
		"layout":{
			"_id": generateUUID(),
			"component":"_c_root",
			"children":params.children
		},
		"config": {
			"labelAlign": "left",
			"labelWidth": 120,
			"columnsPadding": 0
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
			"objectId": params.objectId
		},
		"name": params.name + ApiOptions.projectuuid,
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
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