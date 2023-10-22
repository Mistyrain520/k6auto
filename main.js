import http from 'k6/http';
import { fail } from 'k6';
// import { sleep } from 'k6';
import sql from 'k6/x/sql';
import {setupdata} from './scenarios/setupdata.js'
import { teardowndata } from './scenarios/teardowndata.js';
import { createItem } from './scenarios/itemScenarios.js';
import { getitemGroup } from './tool/pgsql.js';
export function setup() {
  return setupdata()
}
export function teardown(data) {
  // teardowndata(data)
}
export const options = {
  setupTimeout: '2m',
  discardResponseBodies: false,
  scenarios: {
    contacts: {
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 1,
        maxDuration: '10s',
        exec: 'scenarios_item',
        tags: { my_custom_tag: '事项相关场景' },
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

export function scenarios_item(data) {
  const db1 = sql.open('postgres', 'postgres://gitee_team:fa29136a28579f30efe21829aef27bf89730070dbeb331729354d7995ac84a7b@127.0.0.1:5432/osc?sslmode=disable');
  data.myitemGroup = {'objectId':getitemGroup(db1, data.myworkspace.objectId)}
  createItem(data)
}

//上面option有定义，下面的function才会执行
export function itemtype(data) {
  console.log("##############", data)
}
