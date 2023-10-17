import uuid from './uuid.js'
import crypto from 'k6/crypto';
import {JSONPath} from '../node_modules/jsonpath-plus/dist/index-browser-esm.js';
export function generateUUID(){
    return uuid.v4()
}
export function generateMd5(data) {
  return crypto.md5(data, 'hex');
}
//再写个方法自动转为curl方便调试



export function jsonpath(obj, jsptah){
  return JSONPath(jsptah, obj)
}

export function dealrespon(obj, params){
  console.log(params, "@#")
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
  return obj
}