import http from 'k6/http';
import { fail } from 'k6';
import createItem from './apiTest/item.js';
import {ApiOptions, logJson} from './config/apiOptions.js'
import {apicreateItemType, apicreateItemTypeScheme} from './apiTest/itemType.js'
// import { sleep } from 'k6';
var globalVar = {}
export function setup() {
  let myitemtype = apicreateItemType({'returnBykey': ['objectId']})
  let myitemtypescheme = apicreateItemTypeScheme(
    {
      'data': {'objectId': myitemtype.objectId, 'key': 'k6Itemtype' + ApiOptions.projectuuid},
      'returnBykey': ['objectId']
    })
  const res = createItem();
  const status = res.json()
  data.myitemtype = {'objectId': myitemtype.objectId}
  data.myitemtypescheme = {'objectId': myitemtypescheme.objectId}
  return data
}
export function teardown(data) {
  console.log(data, "@@@@@@@@@@@@@@");
}
export const options = {
  discardResponseBodies: false,
  scenarios: {
    contacts: {
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 1,
        maxDuration: '30s',
        exec: 'contacts',
        tags: { my_custom_tag: 'contacts' },
        env: { MYVAR: 'contacts' },
      },
      itemtype: {
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 1,
        maxDuration: '30s',
        exec: 'itemtype',
        tags: { my_custom_tag: 'contacts' }
      }
  },
};

export function contacts(data) {
  console.log("##############", data)
  globalVar.aa = 1;
  if (__ENV.MYVAR != 'contacts') fail();
}
export function itemtype(data) {
  console.log("##############", data)
  globalVar.bb = 2;
}
