import {writePage, writeWord, writePpt, writeExcel, writeMind, writeDiagram, multiwritePage} from './scenariosWiki/writeScen.js'
import {login} from './apiWiki/page.js'

export function setup() {
  return {'Cookie': login({
    "username": "osc-admin",
    "password": "k7YvIXzPfFsJjXWX0yc0PQ=="
  })}
}
export function teardown() {
  // teardowndata(data)
}

export const options234 = {
  setupTimeout: '2m',
  discardResponseBodies: false,
  scenarios: {
    contacts: {
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 1,
        maxDuration: '10m',
        exec: 'scenarios_test',
        tags: { my_custom_tag: '编写wiki文档' },
        env: { MYVAR: 'test' },
      },}
}
export const options = {
  setupTimeout: '2m',
  discardResponseBodies: false,
  scenarios: {
    contacts: {
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 1,
        maxDuration: '10m',
        exec: 'scenarios_wikiPage',
        tags: { my_custom_tag: '编写wiki文档' },
        env: { MYVAR: 'contacts' },
      },
    contacts2: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '10m',
      startTime: '1s',
      exec: 'scenarios_wikiWord',
      tags: { my_custom_tag: '编写word文档' },
      env: { MYVAR: 'contacts' },
    },
    contacts3: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '10m',
      startTime: '1s',
      exec: 'scenarios_wikiPpt',
      tags: { my_custom_tag: '编写ppt文档' },
      env: { MYVAR: 'contacts' },
    },
    contacts4: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '10m',
      startTime: '1s',
      exec: 'scenarios_wikiExcel',
      tags: { my_custom_tag: '编写excel文档' },
      env: { MYVAR: 'contacts' },
    },
    contacts5: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '10m',
      startTime: '1s',
      exec: 'scenarios_wikiMind',
      tags: { my_custom_tag: '编写mind文档' },
      env: { MYVAR: 'contacts' },
    },
    contacts6: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '10m',
      startTime: '1s',
      exec: 'scenarios_wikiDiagram',
      tags: { my_custom_tag: '编写流程图' },
      env: { MYVAR: 'contacts' },
    }
  },
};
export function scenarios_wikiPage(data) {
  writePage(data)
}
export function scenarios_wikiWord(data) {
  writeWord(data)
}
export function scenarios_wikiPpt(data) {
  writePpt(data)
}
export function scenarios_wikiExcel(data) {
  writeExcel(data)
}
export function scenarios_wikiMind(data) {
  // writeMind(data)
}
export function scenarios_wikiDiagram(data) {
  // writeDiagram(data)
}
export function scenarios_test(data) {
 const users = [{'Cookie': login({
    "username": "osc-admin",
    "password": "k7YvIXzPfFsJjXWX0yc0PQ=="
  })},
  {'Cookie': login({
    "username": "chenruitao",
    "password": "k7YvIXzPfFsJjXWX0yc0PQ=="
  })}]
  multiwritePage(users)
}