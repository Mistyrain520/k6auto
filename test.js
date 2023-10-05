import http from 'k6/http';
import { sleep } from 'k6';
export default function () {
  const url = 'http://test.gitee.work/api/gateway/login';
  const payload = JSON.stringify({
    "username": "chenruitao2",
    // "password": "k7YvIXzPfFsJjXWX0yc0PQ=="
    "password": "NgFWcxARAxfTXBnZTMWoaQ=="
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    },
  };
  console.log("@@@@@@@@@@@###################")
  const res1 = http.post(url, payload, params);
  sleep(0.5);
  console.log(res1.body, "哈哈222")
}