import http from 'k6/http';
import { sleep } from 'k6';
import { request } from '../k6http/k6http.js';
import {ApiOptions} from '../config/apiOptions.js'
import {dealrespon, httpRequestToCurl, checkExpectation, consoleLog } from '../tool/allTool.js';
import { expect } from "../tool/chaijs.js";
// import zaplogger from 'k6/x/zaplogger';

const request_params = {
	headers: {
		'Content-Type': 'application/json',
		'X-Parse-Session-Token': ApiOptions.token,
		'X-Parse-Application-Id': ApiOptions.tenant,
		// 'Cookie': 'grafana_session_expiry=1696326735; grafana_session=2a8df17943a96551a3acd0ab8e86a33f; tenant=osc; sessionToken=r:7694d3b1e41191225dbead553878dc98'
	},
	};

export function apicreateItem(params={}){
	const path = '/parse/api/v2/items';
	const option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
		"name": params.name,
		"ancestors": [],
		"workspace": {
			"__type": "Pointer",
			"className": "Workspace",
			"objectId": params.workspace
		},
		"itemType": {
			"__type": "Pointer",
			"className": "ItemType",
			"objectId": params.itemType
		},
		"values": {
			"__screen_type": "create"
		},
		"reporter": null,
		"itemGroup": {
			"__type": "Pointer",
			"className": "ItemGroup",
			"objectId": params.itemGroup
		},
		"parseContext": {
			"eventExtraData": {}
		}
		});
	option.group = params.group
	option.casename = params.casename
	option.payload = payload
	//来控制是否打印日志，也就是输出报告，可以空，默认打印；true就不打印日志
	option.isNotLog = params.isNotLog
	let res = request(option, 'POST', path, payload, request_params)
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
	
	try {
		return dealrespon(res.res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.res.body, params.params)
	}
}