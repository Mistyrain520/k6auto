const ApiOptions = {
    domainName: 'http://localhost:8088',
    projectuuid: 'crthaha2',
    token: 'a:5342414fbd5b66363156fb08',
    tenant: 'osc',
}
const logJson = {
	"name": "test_get_baidu",
	"status": "passed",
	"start": 1696485702081,
	"stop": 1696485702201,
	"description": "你可以不写",
	"statusDetails": {},
	"uuid": "43c8cdb0-5dfc-450a-a966-e85f33dc3884",
	"historyId": "63de3e8603f5b694f34a15879bdc13c7",
	"testCaseId": "d42c884865bc517952f178e1b70879b5",
	//下面三个main可对应修改，12372可随机生成，其他倒是不需要动
	"fullName": "main#test_get_baidu",
	"labels": [{
		"name": "suite",
		"value": "main"
	}, {
		"name": "host",
		"value": "WINDOWS-PUD7AEB"
	}, {
		"name": "thread",
		"value": "12372-MainThread"
	}, {
		"name": "framework",
		"value": "pytest"
	}, {
		"name": "language",
		"value": "cpython3"
	}, {
		"name": "package",
		"value": "main"
	}],
	"steps": [
		{
		  "name": "Step 1",
		  "status": "passed",
		  "start": 1682358426014,
		  "stop": 1682358426014,
		  "parameters": []
		},
		{
		  "name": "Step 2",
		  "status": "passed",
		  "start": 1682358426014,
		  "stop": 1682358426014
		}
	  ]
}
export { ApiOptions, logJson}

// "parameters": [ {
// 	"name" : "arg1",
// 	"value" : "1"
//   }, {
// 	"name" : "arg2",
// 	"value" : "'abc'"
//   } ]