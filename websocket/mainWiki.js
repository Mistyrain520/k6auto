import {writePage, writeWord} from './scenariosWiki/writeScen.js'

export function setup() {
  
}
export function teardown() {
  // teardowndata(data)
}
export const options = {
  setupTimeout: '2m',
  discardResponseBodies: false,
  scenarios: {
    contacts: {
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 2,
        maxDuration: '10m',
        exec: 'scenarios_wikiPage',
        tags: { my_custom_tag: '编写wiki文档' },
        env: { MYVAR: 'contacts' },
      },
    contacts2: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 2,
      maxDuration: '10m',
      startTime: '10s',
      exec: 'scenarios_wikiWord',
      tags: { my_custom_tag: '编写word文档' },
      env: { MYVAR: 'contacts' },
    }
  },
};
export function scenarios_wikiPage() {
  writePage()
}
export function scenarios_wikiWord() {
  writeWord()
}