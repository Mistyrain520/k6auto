import http from 'k6/http';
import { fail } from 'k6';
import test from './test.js';
import createItem from './apiTest/item.js';
import { sleep } from 'k6';
export function setup() {
  client.connect('auth.googleapis.com:443');
  const resp = client.invoke('google.cloud.authorization.v1.AuthService/GetAccessToken', {
    username: 'john.smith@k6.io',
    password: 'its-a-secret',
  });
  client.close();
  return resp.message.accessToken;
}
export function teardown() {
  console.log('teardown will still be called after test.abort()');
}
export const options = {
  discardResponseBodies: false,
  scenarios: {
    contacts: {
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 1,
        maxDuration: '30s',
        exec: 'contacts',
        tags: { my_custom_tag: 'contacts' },
        env: { MYVAR: 'contacts' },
      },
    news: {
        executor: 'shared-iterations',
        iterations: 1,
        exec: 'news',
        tags: { my_custom_tag: 'news' },
        env: { MYVAR: 'news' },
    },
  },
};

export function contacts() {
  if (__ENV.MYVAR != 'contacts') fail();
  createItem();
}

export function news() {
  if (__ENV.MYVAR != 'news') fail();
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
  res1.error
  console.log(res1.body, "哈哈")
//   console.log(res1.headers)
}
