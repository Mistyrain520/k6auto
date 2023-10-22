import http from 'k6/http';
import { sleep } from 'k6';
import sql from 'k6/x/sql';
import { getitemGroup } from './tool/pgsql.js';
export function setup() {
  const data = {}
  const db = sql.open('postgres', 'postgres://gitee_team:fa29136a28579f30efe21829aef27bf89730070dbeb331729354d7995ac84a7b@127.0.0.1:5432/osc?sslmode=disable');

  return {a: db}
}
export function teardown(data) {
  // teardowndata(data)
}
export default function (data) {
  const db1 = sql.open('postgres', 'postgres://gitee_team:fa29136a28579f30efe21829aef27bf89730070dbeb331729354d7995ac84a7b@127.0.0.1:5432/osc?sslmode=disable');
  console.log(data, "@@##")
  console.log(getitemGroup(db1, 'OfqrtG8PqV'), "@@##")
}
//如果想要db只open一遍，那边需要在setup中直接执行sql返回结果。不可以返回db然后给到场景使用
//否则只能在场景中自行连接db。每个场景下每个VU都是独立的ES2015ES6的js环境，每个VU之间是不互通的。
