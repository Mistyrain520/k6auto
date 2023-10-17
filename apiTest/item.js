import http from 'k6/http';
import { sleep } from 'k6';
import {ApiOptions} from '../config/apiOptions.js'
export default function createItem() {
	const url = ApiOptions.domainName + '/parse/api/v2/items';
	const payload = JSON.stringify({
	"name": "dsfd",
	"ancestors": [],
	"workspace": {
		"__type": "Pointer",
		"className": "Workspace",
		"objectId": "OfqrtG8PqV"
	},
	"itemType": {
		"__type": "Pointer",
		"className": "ItemType",
		"objectId": "Lg9J3eCO1b"
	},
	"values": {
		"__screen_type": "create"
	},
	"reporter": null,
	"itemGroup": {
		"__type": "Pointer",
		"className": "ItemGroup",
		"objectId": "AWA1joeVbn"
	},
	"parseContext": {
		"eventExtraData": {}
	}
	});

	const params = {
	headers: {
		'Content-Type': 'application/json',
		'X-Parse-Session-Token': ApiOptions.token,
		'X-Parse-Application-Id': 'osc',
		// 'Cookie': 'grafana_session_expiry=1696326735; grafana_session=2a8df17943a96551a3acd0ab8e86a33f; tenant=osc; sessionToken=r:7694d3b1e41191225dbead553878dc98'
	},
	};
	const res1 = http.post(url, payload, params);
	console.log(res1.body, "哈哈222")
	return res1
}