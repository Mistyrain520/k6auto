
/* 
    该文件不能在k6中调用使用
    该文件旨在处理ws报文，提取报文信息并保存为一个新的同名json文件

*/
const fs = require('fs');
const messType = 'changxie'
const yourfile = 'word2.json'
// 读取原始 JSON 文件
fs.readFile('./websocket/scen/' + yourfile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data); // 解析 JSON 数据
    for (const element of jsonData.log.entries){
        if (element.hasOwnProperty('_webSocketMessages')){
          if (messType === 'changxie' && !element.request.url.includes('docId')){
              continue
          }
          // console.log(element['_webSocketMessages'])
          const newNameObject = element['_webSocketMessages'];
          const newJsonData = JSON.stringify(newNameObject, null, 2);
          fs.writeFile('./websocket/k6scen/' + yourfile, newJsonData, 'utf8', (err) => {
              if (err) {
                console.error('Error writing file:', err);
                return;
              }
              console.log('New JSON file created successfully!');
            });
      }

    }

  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
