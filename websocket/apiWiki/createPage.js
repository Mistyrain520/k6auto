import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import { WebSocket } from 'k6/experimental/websockets';
import encoding from 'k6/encoding';

import { sleep, check } from 'k6';
import {} from './page.js'
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
        'Cookie': 'lang=zh-CN; USER_REALM_KEY="eyJyZWFsbVV1aWQiOiJvc2MiLCJjbGllbnRJZCI6Im9uZS1zc28iLCJyZWRpcmVjdFVyaSI6bnVsbH0="; PRE-GW-LOAD=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1U05DcmVhdGVkIjoiMSIsImRpc3BsYXlOYW1lIjoi6LaF566hIiwic0FNQWNjb3VudE5hbWUiOiJvc2MtYWRtaW4iLCJjb21wYW55IjoienVodXRlc3RfNiIsImNvbXBhbnlJZGVudGl0eSI6IkNPTVBBTllfT1dORVIiLCJ1c2VyUHJpbmNpcGFsTmFtZSI6Im9zY0BhZG1pbi5jb20iLCJqdGkiOiJhNTE1YjczM2U2ZGM0NmRhOTFmNWQ2ZWFiZDU5MmIzMCIsImlhdCI6MTcwNDA4NTgyNywic3ViIjoiMSIsImV4cCI6MTcwNDY2MTIwMH0.6aSfJfCwHxBQ3R90hkgj1BXpp9L1D0nmOERswubffiM; PRE-GW-SESSION=a515b733e6dc46da91f5d6eabd592b30',
      },
    };
  const ws = new WebSocket(url, null, params1);

  ws.addEventListener('open', () => {
    //这里要用==1来比较，因为readyState的类型是ReadyState，要用非严格比较
    if (!check(ws, {
      'is status 200': (r) => r.readyState == 1,
    })){
      ws.close()
    }
    // 测试发送用的，写入1
    // ws.send(encoding.b64decode('AgAIbm8gdG9rZW4=', 'std'))
    // ws.send(encoding.b64decode('AAABAA==', 'std'));
    // ws.send(encoding.b64decode('BUx7Im1lc3NhZ2UiOnsiZGF0YSI6eyJrZXkiOiJ0aXRsZSIsImRhdGEiOiIxIn0sImFjdGlvbiI6InVwZGF0ZS1wYWdlLWZpZWxkIn19', 'std'));
    for (const mess of messages){
      switch(mess.opcode){
        case 1:
          if (mess.type == 'send'){
            if(params && mess.data.includes('gitee-minio')){
              changxie['docid'] = params.tenant + '_' + params.pageid
              changxie['documentCallbackUrl'] = 'http://wiki-master:5199/open/office/'+ params.pageid+'/saveCXCallback?tenant='+ params.tenant+'&userId=103&type=&id=' + params.pageid
              changxie['openCmd']['id'] = params.tenant + '_' + params.pageid
              changxie['openCmd']['url'] = 'http://gitee-minio:9000/gitee-wiki/' + params.fetchUrl
              //靠，注意观察畅写的报文格式，是['message', '报文内容']，是个数组，别TM搞错了，排查半天。
              var sendDtat = '42' + JSON.stringify(['message', JSON.stringify(changxie)])
              console.log("case 1 发送@#@", sendDtat)
              ws.send(sendDtat)
              sleep(0.01)
            }else{
              // console.log("case 1 发送", mess.data)
              ws.send(mess.data)
              sleep(0.01)
            }
          }
          break;
        case 2:
          if (mess.type == 'send'){
            console.log("case 2 发送", mess.data)
            let arrbuff = encoding.b64decode(mess.data, 'std')
            ws.send(arrbuff)
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