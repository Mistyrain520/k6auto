
/* 
    该文件不能在k6中调用使用
    该文件旨在处理ws报文，提取报文信息并保存为一个新的同名json文件

*/
const fs = require('fs');
//editor office diagram
const messType = 'editor'
const yourfile = ['pageUser1.json','pageUser2.json']
// 读取原始 JSON 文件
function readFile(filepath){
    try {
        const data = fs.readFileSync('./websocket/scen/' + filepath, 'utf8');
        const jsonData = JSON.parse(data);
      
        if (messType === 'editor' || messType === 'diagram') {
          for (const element of jsonData.log.entries) {
            if (element.hasOwnProperty('_webSocketMessages') && element.request.url.includes(messType)) {
            //   const newJsonData = JSON.stringify(newNameObject, null, 2);
              return element['_webSocketMessages'];
            }
          }
          console.error('No message data found');
        }
      } catch (error) {
        console.error('Error:', error);
      }
}
let result = []
for (let item of yourfile){
    let array = readFile(item)
    let parts = item.split('.');
    let newArray = array.map(item => {
        return {
          ...item,
          'Cookie': parts[0]
        };
      });
    result = result.concat(newArray);

    // 按照 time 属性进行排序
    result.sort((a, b) => a.time - b.time);
}
fs.writeFile('./websocket/k6scen/pageUsers.json', JSON.stringify(result, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('New JSON file created successfully!');
  });