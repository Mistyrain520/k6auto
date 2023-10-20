// import winston from '../node_modules/winston/index.d.ts';
// import { Writable } from 'stream'
//下面这两行写法在k6中不支持，要写成import形式

// 创建可写流
// const Writable = require('stream')
// const stream = new Writable({
//   objectMode: false,
//   write: raw => console.log('stream msg', raw.toString())
// })
// 创建http服务
// const http = require('http')
// http.createServer((req, res) => {
//     const arr = []
//     req
//       .on('data', chunk => arr.push(chunk))
//       .on('end', () => {
//         const msg = Buffer.concat(arr).toString()
//         console.log('http msg', msg)
//         res.end(msg)
//       })
//   })
//   .listen(8080)
// 配置 4 种通道
// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({filename: 'combined.log'}),
//     // new winston.transports.Http({host: 'localhost', port: 8080}),
//     // new winston.transports.Stream({stream})
//   ]},
//   {
//     format: winston.format.combine(
//       winston.format.label({ label: 'right meow!' }),
//       winston.format.timestamp(),
//       winston.format.prettyPrint(),
//     )
//   })
// 传输到通道
// logger.info('winston transports')
const winston = require('winston')
const fs = require('fs');
const path = require('path');
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

// 格式化日期
let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

// 检查目录是否存在
if (!fs.existsSync(formattedDate)) {
    // 如果不存在，创建目录
    fs.mkdirSync(formattedDate);
}

function createMyLogger(filename){
  const myfilename = path.join(formattedDate, filename + '-result.json');
  const mylogger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: myfilename, options: { flags: 'w' }}),
        
      ],
      format: winston.format.combine(
          // winston.format.label({ label: 'right meow!' }),
          winston.format.timestamp(),
          winston.format.prettyPrint(),
          winston.format.json(),
      )
  });

  return mylogger

}
const uuid = require('uuid')
const readline = require('readline');
async function processLineByLine() {
  const fileStream = fs.createReadStream('report.log');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    let index = line.indexOf("]");
    let parts = line.substring(index + 1).replace(/\s|\n/g, "");
    if (parts.includes('testCaseId')) {
      // console.log(parts)
      let jsonObject = JSON.parse(parts)
      await writeReport(jsonObject)
    }
  }
  rl.close()
}
async function writeReport(data){
    const mylogger = createMyLogger(uuid.v4())
    data.message = '测试用例结果'
    data.level = 'info'
    mylogger.info(data);
}

async function main() {
  await processLineByLine();
  console.log("@#@#");
}

main();

