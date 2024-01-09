// import http from 'k6/http';
// import { sleep } from 'k6';
// import sql from 'k6/x/sql';
// import { getitemGroup } from './tool/pgsql.js';
import encoding from 'k6/encoding';
import { readJson} from './tool/allTool.js';
const mindMessaage = readJson('mindMessaage2', './websocket/k6scen/mind2.json')
export function setup() {
  const data = {}
  // const db = sql.open('postgres', 'postgres://gitee_team:fa29136a28579f30efe21829aef27bf89730070dbeb331729354d7995ac84a7b@127.0.0.1:5432/osc?sslmode=disable');

  // return {a: db}
}
export function teardown(data) {
  // teardowndata(data)
}
export default function (data) {
  // const db1 = sql.open('postgres', 'postgres://gitee_team:fa29136a28579f30efe21829aef27bf89730070dbeb331729354d7995ac84a7b@127.0.0.1:5432/osc?sslmode=disable');
  // console.log(data, "@@##")
  // console.log(getitemGroup(db1, 'OfqrtG8PqV'), "@@##")
  let str1 = '\x11'; // 包含 \x11 的字符串
  let str2 = 'zuhutest_6-101731'; // 另一个字符串

  let combinedStr = str1 + str2 + '\x00'+ '\x00' + '\x01';// 连接两个字符串


  console.log(encoding.b64encode(combinedStr), "@@@")
  var buff = encoding.b64decode('fVPZsqIwEP2aPM4UJCz6CAYUURQXEF+mULZ4FZBNuV8/QcBlpmaqurrSOadPOt0JEGUAIfGoA0hiARzRVVGnfrtBvUeCoAkeSO7nOUlizXvCMibRWbg6Mq7s0+IXKU9T8Ukvcz9740LEUftAY/fyOupS9+ED99zC7bBHlX0lfVy1gdCx3yH3qXmM3Dh8aR47gJdbYvaKIay5evcl7jdKObN8e+Z/r3e3Budxm0z+SH4rsPEjj7hh5l4AZB73QBjwTRpQRCCNGoMM7TADlCGgrZb5DoYM7X9PPiSDeFlb+6VZB6kdQnLlBx0PKQDSy6K7C5Dc6PTm7bGBcy1UtHUQxfmMbABUY7vakasZLFO9VqOZrjhFxg2NqZnpKwGONwiyFwePVWvJMseCJuhj6bSOVr6/1RZ3RR+xWLZlXr5fHNVhhakV5kP9S8HT2NTgtTpI/MGQ9m78PSknmsCLmiq4gpGWjmNU6yrau+akPFNZXrXMmGGCsxiFaLmlO+QehGF5xPeROHbzeRIBKBcndnuzhA05nJWSchaB6ATOTZjTNVLMS7Ur5uPNPadhYvzdBkQbpPbtb/rUjTvN/IokZf6aEjURNxNtfTvX/z/nn8xTr+j+ichwaMANB0hETKP08bb+/SlE/CSnWVIkx+T88YZ9jxRJ9iqWY/BKsrXFD0tZrbWFQTdamd8=', 'std')
  let uint8View = new Uint8Array(buff); 
  for(const element of uint8View){
    console.log(String.fromCharCode(element), "@##")
  }
  // console.log(uint8View.byteLength,uint8View[17])
  // uint8View[17] = 48;
  // console.log(uint8View.byteLength,uint8View[17])
  // let encodedString = encoding.b64encode(uint8View);
  // console.log(encodedString, "###")
  
  // for (const mess of mindMessaage){
  //   if (mess.type == 'send'){
  //     console.log(modifiArrBuff(mess.data, {'tenant': 'zuhutest_6', 'pageid': '101758'}))
  //   }
  // }
  // console.log(modifiArrBuff('EXp1aHV0ZXN0XzYtMTAxNzY1AAI/AQKAvP6lAQIoAQZjb25maWcFdGhlbWUBdwpmcmVzaC1ibHVlKAEGY29uZmlnB3ZlcnNpb24BdwYxLjQuNDMA', {'tenant': 'zuhutest_6', 'pageid': '101764'}))
}
function modifiArrBuff(base64String, params={}){
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
  console.log('原来的', uint8View)
  console.log('新的', mergedArray)
  let uint16View = new Uint16Array(buff)
  var buff1 = encoding.b64decode(encoding.b64encode(mergedArray), 'std')
  let newuint16View = new Uint16Array(buff1)
  console.log('原来的16', uint16View)
  console.log('新的16', newuint16View)
  return encoding.b64encode(mergedArray)
}
