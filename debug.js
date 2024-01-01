// import http from 'k6/http';
// import { sleep } from 'k6';
// import sql from 'k6/x/sql';
// import { getitemGroup } from './tool/pgsql.js';
export function setup() {
  const data = {}
  // const db = sql.open('postgres', 'postgres://gitee_team:fa29136a28579f30efe21829aef27bf89730070dbeb331729354d7995ac84a7b@127.0.0.1:5432/osc?sslmode=disable');

  // return {a: db}
}
export function teardown(data) {
  // teardowndata(data)
}
export default function (data) {
  // const db1 = sql.open('postgres', 'postgres://gitee_team:fa29136a28579f30efe21829aef27bf89730070dbeb331729354d7995ac84a7b@127.0.0.1:5432/osc?sslmode=disable');
  // console.log(data, "@@##")
  // console.log(getitemGroup(db1, 'OfqrtG8PqV'), "@@##")

  const a = "[\"message\",\"{\\\"type\\\":\\\"license\\\",\\\"license\\\":{\\\"ofdList\\\":[{\\\"authorizationCode\\\":\\\"3b9c09b3-dd29-55ea-93f8-d538ca0554f3\\\",\\\"ip\\\":\\\"\\\",\\\"ofdCode\\\":\\\"\\\"}],\\\"ofdIsChecked\\\":false,\\\"uuid\\\":\\\"3b9c09b3-dd29-55ea-93f8-d538ca0554f3\\\",\\\"OFDLicense\\\":null,\\\"ip\\\":null,\\\"isClusterMode\\\":true,\\\"uosAI\\\":false,\\\"bindMode\\\":1,\\\"exchangeFormat\\\":[\\\"bmp\\\",\\\"docx\\\",\\\"gif\\\",\\\"jpg\\\",\\\"odt\\\",\\\"pdf\\\",\\\"rtf\\\",\\\"png\\\",\\\"txt\\\",\\\"csv\\\",\\\"ods\\\",\\\"xlsx\\\",\\\"odp\\\",\\\"pptx\\\"],\\\"wordDeskRadio\\\":\\\"1\\\",\\\"wordDeskFileFormatList\\\":[\\\"doc\\\",\\\"docm\\\",\\\"docx\\\",\\\"dot\\\",\\\"dotm\\\",\\\"dotx\\\",\\\"epub\\\",\\\"fodt\\\",\\\"htm\\\",\\\"html\\\",\\\"mht\\\",\\\"odt\\\",\\\"ott\\\",\\\"pdf\\\",\\\"rtf\\\",\\\"txt\\\",\\\"xps\\\",\\\"wps\\\"],\\\"wordDeskAdvancedFunction\\\":[],\\\"wordMobileFileFormatList\\\":[\\\"doc\\\",\\\"docm\\\",\\\"docx\\\",\\\"dot\\\",\\\"dotm\\\",\\\"dotx\\\",\\\"epub\\\",\\\"fodt\\\",\\\"htm\\\",\\\"html\\\",\\\"mht\\\",\\\"odt\\\",\\\"ott\\\",\\\"pdf\\\",\\\"rtf\\\",\\\"txt\\\",\\\"xps\\\",\\\"wps\\\"],\\\"wordMobileRadio\\\":\\\"1\\\",\\\"excelDeskRadio\\\":\\\"1\\\",\\\"excelDeskFileFormatList\\\":[\\\"csv\\\",\\\"et\\\",\\\"crtx\\\",\\\"fods\\\",\\\"ods\\\",\\\"ost\\\",\\\"xls\\\",\\\"xlsm\\\",\\\"xlsx\\\",\\\"xlt\\\",\\\"xltm\\\",\\\"xltx\\\"],\\\"excelDeskAdvancedFunction\\\":[],\\\"pptDeskAdvancedFunction\\\":[],\\\"excelMobileRadio\\\":\\\"1\\\",\\\"excelMobileFileFormatList\\\":[\\\"csv\\\",\\\"et\\\",\\\"crtx\\\",\\\"fods\\\",\\\"ods\\\",\\\"ost\\\",\\\"xls\\\",\\\"xlsm\\\",\\\"xlsx\\\",\\\"xlt\\\",\\\"xltm\\\",\\\"xltx\\\"],\\\"pptDeskRadio\\\":\\\"1\\\",\\\"pptDeskFileFormatList\\\":[\\\"fodp\\\",\\\"dps\\\",\\\"odp\\\",\\\"otp\\\",\\\"pot\\\",\\\"potm\\\",\\\"potx\\\",\\\"pps\\\",\\\"ppsm\\\",\\\"ppsx\\\",\\\"ppt\\\",\\\"pptm\\\",\\\"pptx\\\"],\\\"pptMobileRadio\\\":\\\"1\\\",\\\"pptMobileFileFormatList\\\":[\\\"fodp\\\",\\\"dps\\\",\\\"odp\\\",\\\"otp\\\",\\\"pot\\\",\\\"potm\\\",\\\"potx\\\",\\\"pps\\\",\\\"ppsm\\\",\\\"ppsx\\\",\\\"ppt\\\",\\\"pptm\\\",\\\"pptx\\\"],\\\"process\\\":8,\\\"connections\\\":100,\\\"users_count\\\":0,\\\"nodes\\\":0,\\\"count\\\":8,\\\"commonAdvanceFunction\\\":[],\\\"end_date\\\":\\\"2024-03-26\\\",\\\"users_expire\\\":2,\\\"mode\\\":0,\\\"light\\\":false,\\\"version\\\":\\\"6.0.0\\\",\\\"coCharaCode\\\":\\\"\\\",\\\"coRegUserMax\\\":\\\"\\\",\\\"authorizationLevel\\\":800,\\\"cosysCode\\\":\\\"\\\",\\\"useOfficeExpand\\\":false,\\\"hideOfficeLog\\\":false,\\\"hideCooperationLog\\\":false,\\\"enableRedknowledge\\\":false,\\\"enableOfdFormat\\\":false,\\\"replaceCooperationLog\\\":false,\\\"endDataMsg\\\":null,\\\"isCheckedPublicCloud\\\":false,\\\"sequenceNo\\\":\\\"64e23ab15ca7f66da76798ad4908b5fd\\\",\\\"endDate\\\":\\\"2024-03-26T00:00:00.000Z\\\",\\\"type\\\":3,\\\"usersExpire\\\":172800,\\\"isMaster\\\":true,\\\"buildDate\\\":\\\"2023-10-31T16:00:00.000Z\\\",\\\"rights\\\":1,\\\"buildVersion\\\":\\\"6.4.81\\\",\\\"buildNumber\\\":0}}\"]"
  // console.log(a.replace(/\\/g, ''))
  console.log(JSON.parse(a))
  const changxie = {
    "type": "auth",
    "docid": "zuhutest_6_4",
    "documentCallbackUrl": "http://wiki-master:5199/open/office/101634/saveCXCallback?tenant=zuhutest_6&userId=103&type=&id=101634",
    "token": "fghhfgsjdgfjs",
    "user": {
      "id": "103",
      "username": "osc-admin",
      "firstname": null,
      "lastname": null,
      "indexUser": -1
    },
    "editorType": 0,
    "lastOtherSaveTime": -1,
    "block": [],
    "sessionId": null,
    "sessionTimeConnect": null,
    "sessionTimeIdle": 0,
    "documentFormatSave": 65,
    "view": false,
    "isCloseCoAuthoring": false,
    "openCmd": {
      "c": "open",
      "id": "zuhutest_6_101634",
      "userid": "103",
      "format": "docx",
      "url": "http://gitee-minio:9000/gitee-wiki/zuhutest_6/page/1034/101634/467e061ec9d0491bb8da8d97133d2d31.docx",
      "title": "Unnamed.docx",
      "lcid": 30724,
      "nobase64": true
    },
    "lang": "zh",
    "mode": null,
    "permissions": {}
  }
}
//如果想要db只open一遍，那边需要在setup中直接执行sql返回结果。不可以返回db然后给到场景使用
//否则只能在场景中自行连接db。每个场景下每个VU都是独立的ES2015ES6的js环境，每个VU之间是不互通的。
