import uuid from './uuid.js'
import crypto from 'k6/crypto';
import {JSONPath} from '../node_modules/jsonpath-plus/dist/index-browser-esm.js';
import {logJson} from '../config/apiOptions.js'
export function generateUUID(){
    return uuid.v4()
}
export function generateMd5(data) {
  return crypto.md5(data, 'hex');
}




export function jsonpath(obj, jsptah){
  return JSONPath(jsptah, obj)
}
// returnBykey返回 {'key': value}
// jsonpath 返回 []
// 
export function dealrespon(obj, params){
  if (params && obj){
    if (params.hasOwnProperty("jsonpath")){
      return jsonPath(obj, jsptah)
    }
    if (params.hasOwnProperty("returnBykey")){
      return params.returnBykey.reduce(function(result, key) {
        if (key in obj) {
            result[key] = obj[key];
        }
        return result;
    }, {});
    }
  }
  
  return obj
}

//TUDO:用go的zap重新写个扩展，支持高性能写入,这样就不需要consoleLog了
export function consoleLog(params={}){
  //用深拷贝，创建独立副本
  let Itemlog = JSON.parse(JSON.stringify(logJson));
  Itemlog.name = params.casename
  Itemlog.uuid = generateUUID()
  Itemlog.historyId = generateUUID()
  Itemlog.description = params.description
  Itemlog.testCaseId = generateMd5(params.casename)
  Itemlog.fullName = params.group + "#" + params.casename
  Itemlog.start = params.start
  Itemlog.stop = params.stop
  Itemlog.statusDetails = params.statusDetails
  if ([200,201].includes(params.resStatus)){
    Itemlog.status = "passed"
  }else{
    Itemlog.status = "broken"
  }
  var label = ''
  if (params.group.includes('.')){
    var line = params.group.split('.')
    label = line[0]
    Itemlog.labels.push({"name": "subSuite", "value": line[1]})
  }else{
    label = params.group
  }
  Itemlog.labels = Itemlog.labels.map(item => {
    if (item.value === 'main') {
      item.value = label
      return item;
    }
    return item;
})
  console.log(Itemlog)
}
//再写个方法自动转为curl方便调试
export function httpRequestToCurl(method, url, headers, data) {
  let headerString = '';
  for (let key in headers) {
      headerString += `-H "${key}: ${headers[key]}" `;
  }

  let dataString = '';
  if (data) {
      dataString = `-d '${data}' `;
  }

  return `curl -X ${method} ${headerString}${dataString}${url}`;
}