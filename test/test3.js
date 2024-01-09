let obj = {};

// 添加小写字母的 ASCII 值到 JSON 对象
for (let i = 97; i <= 122; i++) {
  let letter = String.fromCharCode(i);
  obj[letter] = i;
}

// 添加大写字母的 ASCII 值到 JSON 对象
for (let i = 65; i <= 90; i++) {
  let letter = String.fromCharCode(i);
  obj[letter] = i;
}

let jsonString = JSON.stringify(obj); // 将对象转换为 JSON 字符串

console.log(jsonString); // 输出 JSON 字符串
