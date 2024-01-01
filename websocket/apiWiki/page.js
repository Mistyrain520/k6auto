import http from 'k6/http';
import { sleep, check } from 'k6';
import { request } from '../../k6http/k6http.js';
import {ApiOptions} from '../../config/apiOptions.js'
import {dealrespon, httpRequestToCurl, checkExpectation, consoleLog } from '../../tool/allTool.js';
import { expect } from "../../tool/chaijs.js";
// import zaplogger from 'k6/x/zaplogger';
const path = 'http://nonghang-dev.gitee.work/api/wiki/spaces/1034/pages';
const request_params = {
	headers: {
        'Content-Type': 'application/json',
        'X-Wiki-Tenant-Id': 'zuhutest_6',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Cookie': 'lang=zh-CN; USER_REALM_KEY="eyJyZWFsbVV1aWQiOiJvc2MiLCJjbGllbnRJZCI6Im9uZS1zc28iLCJyZWRpcmVjdFVyaSI6bnVsbH0="; PRE-GW-LOAD=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1U05DcmVhdGVkIjoiMSIsImRpc3BsYXlOYW1lIjoi6LaF566hIiwic0FNQWNjb3VudE5hbWUiOiJvc2MtYWRtaW4iLCJjb21wYW55IjoienVodXRlc3RfNiIsImNvbXBhbnlJZGVudGl0eSI6IkNPTVBBTllfT1dORVIiLCJ1c2VyUHJpbmNpcGFsTmFtZSI6Im9zY0BhZG1pbi5jb20iLCJqdGkiOiJhNTE1YjczM2U2ZGM0NmRhOTFmNWQ2ZWFiZDU5MmIzMCIsImlhdCI6MTcwNDA4NTgyNywic3ViIjoiMSIsImV4cCI6MTcwNDY2MTIwMH0.6aSfJfCwHxBQ3R90hkgj1BXpp9L1D0nmOERswubffiM; PRE-GW-SESSION=a515b733e6dc46da91f5d6eabd592b30',
      },
	};


/* 

*/
export function apicreateWikiPage(params={}){
	// const option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
        "title": "",
        "content": "{\"default\":{\"type\":\"doc\",\"content\":[]}}",
        "description": "",
        "locale": "en",
        "isPrivate": false,
        "isPublished": false,
        "spaceId": params.spaceId,
        "publishEndDate": "",
        "publishStartDate": "",
        "scriptCss": "",
        "scriptJs": "",
        "tags": []
    });
    const res = http.request('POST', path, payload, request_params)
    //自带简单断言，非chaijs式断言
    check(res, {
		[path]: (res) => res.status == 200 || res.status == 201,
	})
    //调试打印curl
    // console.log(httpRequestToCurl('POST', path, request_params.headers, payload))
    try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}
}

export function apicreateWordPage(params={}){
	// const option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
        "title": "自动化畅写",
        "content": "{}",
        "description": "",
        "locale": "en",
        "isPrivate": false,
        "isPublished": false,
        "spaceId": params.spaceId,
        "publishEndDate": "",
        "publishStartDate": "",
        "scriptCss": "",
        "scriptJs": "",
        "tags": [],
        "contentType": params.contentType
    });
    const res = http.request('POST', path, payload, request_params)
    //自带简单断言，非chaijs式断言
    check(res, {
		[path]: (res) => res.status == 200 || res.status == 201,
	})
    //调试打印curl
    console.log(httpRequestToCurl('POST', path, request_params.headers, payload))
    try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}
}