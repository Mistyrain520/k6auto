import http from 'k6/http';
import { sleep } from 'k6';
import generateUUID from './tool/allTool.js'
export default function test() {
  console.log("@@哈哈", generateUUID())
}