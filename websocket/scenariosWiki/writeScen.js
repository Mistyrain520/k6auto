import {multiplayerMessage, replayMessage} from '../apiWiki/createPage.js'
import {apicreateWikiPage, apicreateWordPage, apicreateDiagram} from '../apiWiki/page.js'
import { readJson} from '../../tool/allTool.js';
import {WikiOptions} from '../config.js'

//readJson必须写在这里，因为用了SharedArray。除非改用Open方法
const spaceId = 1034,
    domain = WikiOptions.domainName,
    tenant = WikiOptions.tenant,
    wikiMessage = readJson('wikiMessage', '../k6scen/page2.json'),
    wordMessage = readJson('wordMessage', '../k6scen/word2.json'),
    pptMessage = readJson('pptMessage', '../k6scen/ppt.json'),
    excelMessage = readJson('excelMessage', '../k6scen/excel.json'),
    mindMessaage = readJson('mindMessaage', '../k6scen/mind2.json'),
    diagramMessage = readJson('diagramMessage', '../k6scen/diagram.json'),
    mulitMessage = readJson('mulitMessage', '../k6scen/pageUsers.json')

//写page场景
export function writePage(params){
    const pageid = apicreateWikiPage({
        'params': {
            'jsonpath': '$.data.id'
        },
        'Cookie': params.Cookie
    })
    console.log(params.Cookie, "@#@#")
    
    const url = WikiOptions.ws + domain +'/wikicolla/1/editor/' + tenant + '/' + String(pageid);
    console.log(url, "@@")
    //暂时不支持标题，因为报文中有包含pageid需要手动修改报文
    replayMessage(url, wikiMessage, {'Cookie': params.Cookie})
}
// 写word场景
export function writeWord(params){
    const pageid = apicreateWordPage({
        'spaceId': spaceId,
        'Cookie': params.Cookie,
        'contentType': 'word',
        'params': {
            'jsonpath': '$.data.[id,content]'
        }
    })
    console.log(pageid, "@#@#")
    var fetchUrl = JSON.parse(pageid[1])
    const url = WikiOptions.ws + domain + '/doc/?docId=' + tenant+ '_' + String(pageid[0]) + '&protocol=http&EIO=3&transport=websocket';
    console.log(fetchUrl['fetchUrl'], url)
    replayMessage(url, wordMessage, {'type': 'office','fetchUrl': fetchUrl['fetchUrl'], 'tenant': tenant, 'spaceId': spaceId, 'pageid': String(pageid[0]),'Cookie': params.Cookie})
}
// 写ppt场景
export function writePpt(params){
    const pageid = apicreateWordPage({
        'title': '自动化创建ppt',
        'spaceId': spaceId,
        'contentType': 'ppt',
        'Cookie': params.Cookie,
        'params': {
            'jsonpath': '$.data.[id,content]'
        }
    })
    console.log(pageid, "@#@#")
    var fetchUrl = JSON.parse(pageid[1])
    const url = WikiOptions.ws + domain + '/doc/?docId=' + tenant+ '_' + String(pageid) + '&protocol=http&EIO=3&transport=websocket';
    console.log(fetchUrl['fetchUrl'], url,pageid)
    replayMessage(url, pptMessage, {'type': 'office', 'fetchUrl': fetchUrl['fetchUrl'], 'tenant': tenant, 'spaceId': spaceId, 'pageid': String(pageid[0]),'Cookie': params.Cookie})
}

// 写excel场景
export function writeExcel(params){
    const pageid = apicreateWordPage({
        'title': '自动化创建excel',
        'spaceId': spaceId,
        'Cookie': params.Cookie,
        'contentType': 'excel',
        'params': {
            'jsonpath': '$.data.[id,content]'
        }
    })
    console.log(pageid, "@#@#")
    var fetchUrl = JSON.parse(pageid[1])
    const url = WikiOptions.ws + domain + '/doc/?docId=' + tenant+ '_' + String(pageid) + '&protocol=http&EIO=3&transport=websocket';
    console.log(fetchUrl['fetchUrl'], url,pageid)
    replayMessage(url, excelMessage, {'type': 'office','fetchUrl': fetchUrl['fetchUrl'], 'tenant': tenant, 'spaceId': spaceId, 'pageid': String(pageid[0]),'Cookie': params.Cookie})
}


export function writeMind(params){
    const pageid = apicreateWordPage({
        'title': '我是mind',
        'spaceId': spaceId,
        'contentType': 'mind_mapping',
        'Cookie': params.Cookie,
        'params': {
            'jsonpath': '$.data.[id,content]'
        }
    })
    // console.log(pageid, "@#@#")
    var fetchUrl = JSON.parse(pageid[1])
    const url = WikiOptions.ws + domain + '/wikicolla/0/minder/' + tenant+ '/' + String(pageid);
    console.log(fetchUrl['fetchUrl'], String(pageid[0]), url,pageid)
    replayMessage(url, mindMessaage, {'type': 'mind', 'tenant': tenant, 'spaceId': spaceId, 'pageid': String(pageid[0]),'Cookie': params.Cookie})
}

// 写diagram场景
export function writeDiagram(params){
    const pageid = apicreateWordPage({
        'title': '我是流程图',
        'spaceId': spaceId,
        'contentType': 'diagram',
        'Cookie': params.Cookie,
        'params': {
            'jsonpath': '$.data.[id]'
        }
    })
    apicreateDiagram({'pageId': pageid[0]})
    const url = WikiOptions.ws + domain + '/wikicolla/2/diagram/' + tenant+ '/' + String(pageid[0]);
    console.log(pageid, "@#@#",url)
    replayMessage(url, diagramMessage,{'Cookie': params.Cookie})
}


export function multiwritePage(params){
    const pageid = apicreateWikiPage({
        'params': {
            'jsonpath': '$.data.id'
        },
        'Cookie': params[0].Cookie
    })
    console.log(params[0].Cookie, "@#@#")
    
    const url = WikiOptions.ws + domain +'/wikicolla/1/editor/' + tenant + '/' + String(pageid);
    console.log(url, "@@")
    //暂时不支持标题，因为报文中有包含pageid需要手动修改报文
    //写两个replayMessage，一前一后
    // multiplayerMessage(mulitMessage, [{'Cookie': params[0].Cookie, 'url': url, 'tag': 'pageUser1'},{'Cookie': params[1].Cookie, 'url': url, 'tag': 'pageUser2'}])
}