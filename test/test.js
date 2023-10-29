import http from 'k6/http';
import { sleep,check } from 'k6';
import sql from 'k6/x/sql';
import zaplogger from 'k6/x/zaplogger';
console.log("####@@@@")
export const options = {
    setupTimeout: '30m',
    discardResponseBodies: false,
    scenarios: {
      contacts: {
          executor: 'per-vu-iterations',
          vus: 1,
          iterations: 1,
          maxDuration: '1m',
          exec: 'test2',
          tags: { my_custom_tag: 'mytag' },
          env: { MYVAR: 'contacts' },
        }
    },
  };
export function test2(){
  const res = http.get('https://test.k6.io');
  const db = sql.open('postgres', 'postgres://gitee_team:fa29136a28579f30efe21829aef27bf89730070dbeb331729354d7995ac84a7b@127.0.0.1:5432/osc?sslmode=disable');
  const testdata = sql.query(db, `select name from "Item" limit 1;`);
  const mylogger = zaplogger.initLogger("./test.log")
  mylogger.infow("msg", "key", "gagga")
  mycheck(res, {
		[path]: (res) => res.status == 200 || res.status == 201,
	}, '')
  console.log(testdata)
}
function mycheck(val, sets, tags){
  check(val, sets, tags)
  return

}
