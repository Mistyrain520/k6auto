import {replayMessage} from '../apiWiki/createPage.js'
import {apicreateWikiPage, apicreateWordPage} from '../apiWiki/page.js'
import { readJson} from '../../tool/allTool.js';

//readJson必须写在这里，因为用了SharedArray。除非改用Open方法
const spaceId = 1034,
    tenant = 'zuhutest_6',
    wikiMessage = readJson('wikiMessage', '../k6scen/newPage.json'),
    wordMessage = readJson('wordMessage', '../k6scen/word2.json');
export function writePage(){
    const pageid = apicreateWikiPage({
        'params': {
            'jsonpath': '$.data.id'
        }
    })
    console.log(pageid, "@#@#")
    
    const url = 'ws://nonghang-dev.gitee.work/wikicolla/1/editor/' + tenant + '/' + String(pageid);
    console.log(url, "@@")
    replayMessage(url, wikiMessage)
}
// 畅写
export function writeWord(){
    const pageid = apicreateWordPage({
        'spaceId': spaceId,
        'contentType': 'word',
        'params': {
            'jsonpath': '$.data.[id,content]'
        }
    })
    console.log(pageid, "@#@#")
    var fetchUrl = JSON.parse(pageid[1])
    const url = 'ws://nonghang-dev.gitee.work/doc/?docId=' + tenant+ '_' + String(pageid) + '&protocol=http&EIO=3&transport=websocket';
    console.log(fetchUrl['fetchUrl'], url)
    replayMessage(url, wordMessage, {'fetchUrl': fetchUrl['fetchUrl'], 'tenant': tenant, 'spaceId': spaceId, 'pageid': String(pageid[0])})
}