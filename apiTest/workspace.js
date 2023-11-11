import { request } from '../k6http/k6http.js';
import {ApiOptions, logJson} from '../config/apiOptions.js'
import { generateUUID, dealrespon } from '../tool/allTool.js';
const request_params1 = {
	timeout: '30s',
	headers: {
		'Content-Type': 'text/plain',
		'Cookie': ApiOptions.token
	},};
export function apiWorkspace(params={}){
	let option = JSON.parse(JSON.stringify(ApiOptions));
	const payload = JSON.stringify({
        "name": params.name + ApiOptions.projectuuid,
        "key": params.key + ApiOptions.projectuuid,
        "icon": "/icons/RedFlagIcon.svg",
        "permissionScheme": {
            "__type": "Pointer",
            "className": "PermissionScheme",
            "objectId": "K8e9HweEcy"
        },
        "itemTypeScheme": {
            "__type": "Pointer",
            "className": "ItemTypeScheme",
            "objectId": params.itemTypeScheme
        },
        "itemTypeScreenScheme": {
            "__type": "Pointer",
            "className": "ItemTypeScreenScheme",
            "objectId": params.itemTypeScreenScheme
        },
        "workflowScheme": {
            "__type": "Pointer",
            "className": "WorkflowScheme",
            "objectId": params.workflowScheme
        },
        "_context": {
            "noSkipLog": true
        },
        "_ApplicationId": option.tenant,
        "_SessionToken": option.token
    })
	option.payload = payload
	option.group = params.group
	option.casename = params.casename
	let res = request(option, 'POST', '/parse/classes/Workspace', payload, request_params1).res
	try {
		return dealrespon(res.json(), params.params)
	  } catch (err) {
		return dealrespon(res.body, params.params)
	}
}