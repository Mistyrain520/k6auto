import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import { WebSocket } from 'k6/experimental/websockets';
import encoding from 'k6/encoding';

import { sleep, check } from 'k6';
import { setTimeout, clearTimeout, setInterval, clearInterval } from 'k6/experimental/timers';


var changxie = {
	"type": "auth",
	"docid": "zuhutest_6_101633",
	"documentCallbackUrl": "http://wiki-master:5199/open/office/101633/saveCXCallback?tenant=zuhutest_6&userId=103&type=&id=101633",
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
		"id": "zuhutest_6_101633",
		"userid": "103",
		"format": "docx",
		"url": "http://gitee-minio:9000/gitee-wiki/zuhutest_6/page/1034/101633/dfd55f2127fa4de39c35f3b8af71cc00.docx",
		"title": "Unnamed.docx",
		"lcid": 30724,
		"nobase64": true
	},
	"lang": "zh",
	"mode": null,
	"permissions": {}
}
// const sessionDuration = randomIntBetween(5000, 60000); 

export function replayMessage(url, messages, params={}) {
    // const url = `ws://test.gitee.work/wikicolla/0/editor/osc/4625`;
    const params1 = {
      headers: {

        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Cookie': params.Cookie,
      },
    };
  const ws = new WebSocket(url, null, params1);

  ws.addEventListener('open', () => {
    //这里要用==1来比较，因为readyState的类型是ReadyState，要用非严格比较
    if (!check(ws, {
      'is status 200': (r) => r.readyState == 1,
    })){
      console.log('链接失败!!!', url)
      ws.close()
    }
    for (const mess of messages){
      switch(mess.opcode){
        case 1:
          if (mess.type == 'send'){
            if(params.type == 'office' && mess.data.includes('gitee-minio')){
              changxie['docid'] = params.tenant + '_' + params.pageid
              changxie['documentCallbackUrl'] = 'http://wiki-master:5199/open/office/'+ params.pageid+'/saveCXCallback?tenant='+ params.tenant+'&userId=103&type=&id=' + params.pageid
              changxie['openCmd']['id'] = params.tenant + '_' + params.pageid
              changxie['openCmd']['url'] = 'http://gitee-minio:9000/gitee-wiki/' + params.fetchUrl
              //靠，注意观察畅写的报文格式，是['message', '报文内容']，是个数组，别TM搞错了，排查半天。
              var sendDtat = '42' + JSON.stringify(['message', JSON.stringify(changxie)])
              console.log("case 1 发送@#@", sendDtat)
              ws.send(sendDtat)
              sleep(0.01)
            }
            else{
              // console.log("case 1 发送", mess.data)
              ws.send(mess.data)
              sleep(0.01)
            }
          }
          break;
        case 2:
          if (mess.type == 'send'){
            if(params.type == 'mind'){
              let senddatat = modifiArrBuff(mess.data, params)
              console.log("case 2-1 发送", encoding.b64encode(senddatat))
              ws.send(senddatat)
            }else{
              console.log("case 2-2 发送", mess.data)
              let arrbuff = encoding.b64decode(mess.data, 'std')
              ws.send(arrbuff)
            }
            sleep(0.01)      
          }
          break;
        default:
          if (mess.type == 'send'){
            console.log("default 发送", mess.data)
            let arrbuff = encoding.b64decode(mess.data, 'std')
            ws.send(arrbuff)
            sleep(0.01)
          }
      }
      
      
    }
    
    // listen for messages/errors and log them into console
    ws.addEventListener('message', (e) => {
        console.log(e, "###")
    });
    // const intervalId = setInterval(() => {
    //     ws.send(encoding.b64decode('AAABAA==', 'std'));
    //   }, randomIntBetween(2000, 8000));

    ws.addEventListener('close', () => {
      console.log(`VU ${__VU} disconnected`);
    });

    ws.close()
  });
}
function modifiArrBuff(base64String, params={}){
  console.log(params, "#$#$")
  //这个customlength = 18不是固定的，得看报文的租户信息来修改
  const customlength = 18
  var buff = encoding.b64decode(base64String, 'std')
  let uint8View = new Uint8Array(buff); 
  let tenant = params.tenant;
  let pageid = params.pageid;
  let oldbuffLength = uint8View.length
  let newLength = tenant.length + pageid.length + 1
  let newUint8View1 = new Uint8Array(1);
  newUint8View1[0] = uint8View[0]
  let newUint8View2 = new Uint8Array(newLength);
  for(let i = 0; i< newLength; i++){
    if(i < tenant.length){
      newUint8View2[i] = tenant[i].charCodeAt(0)
    }
    if(i == tenant.length){
      newUint8View2[i] = '-'.charCodeAt(0)
    }
    if(i > tenant.length){
      newUint8View2[i] = pageid[i-tenant.length-1].charCodeAt(0)
    }
  }
  let newUint8View3 = new Uint8Array(oldbuffLength - customlength);
  for(let i = 0; i< newUint8View3.length; i++){
    newUint8View3[i] = uint8View[i + customlength]
  }
  let mergedArray = new Uint8Array(newUint8View1.length + newUint8View2.length + newUint8View3.length);
  mergedArray.set(newUint8View1, 0);
  mergedArray.set(newUint8View2, newUint8View1.length);
  mergedArray.set(newUint8View3, newUint8View1.length + newUint8View2.length);
  return mergedArray.buffer
}