// import http from 'k6/http';
// import { sleep } from 'k6';
// import generateUUID from './tool/allTool.js'
// export default function test() {
//   console.log("@@哈哈", generateUUID())
// }
// import {logJson} from './config/apiOptions.js'
// let a = JSON.parse(JSON.stringify(logJson));
// a.labels.push({a:1})
// console.log(a)
// let b = JSON.parse(JSON.stringify(logJson));
// b.labels.push({b:1})
// console.log(b)
const apiOptions = {'a':1}
function myFunction() {
  const a = JSON.parse(JSON.stringify(apiOptions));
  a.b = 2
  console.log(a); // 输出 "Hello, world!"
}
function myFunction2() {
  const a = JSON.parse(JSON.stringify(apiOptions));
  console.log(a); // 输出 "Hello, world!"
}
myFunction();
myFunction2();

