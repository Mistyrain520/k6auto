import uuid from './uuid.js'
import crypto from 'k6/crypto';
import {JSONPath} from '../node_modules/jsonpath-plus/dist/index-browser-esm.js';
import {logJson} from '../config/apiOptions.js'
import zaplogger from 'k6/x/zaplogger';
import { expect } from "../tool/chaijs.js";
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
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
  if(!params){return}
  let mypath = generateFile()
	let mylogger = zaplogger.initLogger('./' + mypath.formattedDate + '/' + mypath.myfilename)
  // // 用深拷贝，创建独立副本
  // let Itemlog = JSON.parse(JSON.stringify(logJson));
  let statusDetails = zaplogger.zapObject('statusDetails', 'message', params.message,'trace', params.trace)
  let mystatus = ''
  if ([200,201].includes(params.resStatus)){
    mystatus = "passed"
  }else{
    mystatus = "broken"
  }
  let label = ''
  let labels = JSON.parse(JSON.stringify(logJson.labels))
  if (params.group.includes('.')){
    var line = params.group.split('.')
    label = line[0]
    labels.push({"name": "subSuite", "value": line[1]})
  }else{
    label = params.group
  }
  labels = labels.map(item => {
    if (item.value === 'main') {
      item.value = label
      return item;
    }
    return item;
})
  mylogger.infow(params.casename,
    "name", params.casename,
    "status", mystatus,
    "start", params.start,
    "stop", params.stop,
    "description", params.description,
    statusDetails,
    "uuid", generateUUID(),
    "historyId", '',
    "testCaseId", generateMd5(params.casename),
    "fullName", params.group + "#" + params.casename,
    "labels", labels,
    "steps", params.steps || []
    )
  mylogger.sync()
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

export function generateFile(){
  // 格式化日期
  let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

  // 检查目录是否存在
  // if (!fs.existsSync(formattedDate)) {
  //     fs.mkdirSync(formattedDate);
  // }
  const myfilename = generateUUID() + '-result.json';
  return {'formattedDate': formattedDate, 'myfilename': myfilename}
}

export function checkExpectation(expectationFunc) {
  try {
      expectationFunc();
      return {'pass': 'passed'};
  } catch (error) {
      return {'fail': error.message};
  }
}