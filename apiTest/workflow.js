import { request } from '../k6http/k6http.js';
import {ApiOptions, logJson} from '../config/apiOptions.js'
import { generateUUID, dealrespon } from '../tool/allTool.js';
import {createByParse } from './itemType.js';
const request_params = {
	timeout: '30s',
	headers: {
		'Content-Type': 'application/json',
		'Cookie': ApiOptions.token
	},};
const request_params1 = {
	timeout: '30s',
	headers: {
		'Content-Type': 'text/plain',
		'Cookie': ApiOptions.token
	},};
const request_params2 = {
	timeout: '30s',
	headers: {
		'Content-Type': 'text/plain',
		'Cookie': ApiOptions.token,
		'X-Parse-Application-Id': ApiOptions.tenant,
		'X-Parse-Session-Token': ApiOptions.token,
	},};
export function apicreateStatus(params={}){
	let option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
        "name": params.name + ApiOptions.projectuuid,
        "type": params.type,
        "_context": {
            "untranslatedName": params.name + ApiOptions.projectuuid
        },
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
    })
	option.tablename = 'Status'
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
export function apicreatFlow(params={}){
	let option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
		"name": params.name + ApiOptions.projectuuid,
		"nodes": [{
			"left": 100,
			"top": 80,
			"id": "start_node",
			"key": "Start",
			"name": "Start",
			"statusId": "start_node",
			"type": "Start",
			"elementType": "Node",
			"anyTag": false
		}, {
			"left": 376,
			"top": 257,
			"id": params.statusKey2,
			"key": "InProgress",
			"name": params.statusName2,
			"statusId": params.statusKey2,
			"type": "Task",
			"elementType": "Node",
			"anyTag": false
		}, {
			"left": 253,
			"top": 133,
			"id": params.statusKey1,
			"key": "InProgress",
			"name": params.statusName2,
			"statusId": params.statusKey1,
			"type": "Task",
			"elementType": "Node",
			"anyTag": false
		}],
		"transitions": [{
			"id": generateUUID(),
			"name": "新建",
			"source": {
				"id": "start_node",
				"key": "start_node",
				"anchor": "Right",
				"name": "Start"
			},
			"target": {
				"id": params.statusKey1,
				"key": params.statusKey1,
				"anchor": "Left",
				"name": params.statusName1 + ApiOptions.projectuuid
			},
			"sourceId": "start_node",
			"targetId": params.statusKey1,
			"parameters": {},
			"properties": [],
			"anyTag": false
		}, {
			"id": generateUUID(),
			"name": "A到B",
			"source": {
				"id": params.statusKey1,
				"key": params.statusKey1,
				"anchor": "Right",
				"name": params.statusName1 + ApiOptions.projectuuid
			},
			"target": {
				"id": params.statusKey2,
				"key": params.statusKey2,
				"anchor": "Left",
				"name": params.statusName2 + ApiOptions.projectuuid
			},
			"sourceId": params.statusKey1,
			"targetId": params.statusKey2,
			"parameters": {},
			"properties": [],
			"anyTag": false
		}],
		"step": 2,
		"initial": {
			"__type": "Pointer",
			"className": "Status",
			"objectId": params.statusKey1
		},
		"releaseStatus": true
	})
	option.payload = payload
	option.group = params.group
	option.casename = params.casename
	let res = request(option, 'POST', '/parse/api/workflows', payload, request_params2)
	try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}
}

export function apiWorkflowScheme(params={}){
	let option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
		"name": params.name + ApiOptions.projectuuid,
		"_ApplicationId": option.tenant,
		"_SessionToken": option.token
	})
	option.payload = payload
	option.group = params.group
	option.casename = params.casename
	let res = request(option, 'POST', '/parse/classes/WorkflowScheme', payload, request_params1)
	try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}
}