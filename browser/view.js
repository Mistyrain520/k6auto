import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    myui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
}

export default async function () {
    const context = browser.newContext();
    const page = context.newPage();
    context.addCookies([{
      name: 'X-Parse-Session-Token',
      value: 'eyJhZG1pbiI6dHJ1ZSwiY29tcGFuaWVzIjpbInhseS1wb2MiLCJDUFpYIiwicWQiLCJDRkNBIl0sImNvbXBhbnkiOiJ4bHktcG9jIiwiY29tcGFueUlkZW50aXR5IjoiQ09NUEFOWV9BRE1JTiIsImNvbXBhbnlQYXRoIjoieGx5LXBvYyIsImRpc3BsYXlOYW1lIjoi6ZmI6ZSQ5rabIiwiZW1haWwiOiJjaGVucnVpdGFvQG9zY2hpbmEuY24iLCJpZCI6IjY5NiIsInNBTUFjY291bnROYW1lIjoiY2hlbnJ1aXRhbyIsInN0YXR1cyI6IlNVQ0NFU1MiLCJ1U05DcmVhdGVkIjoiNjk2IiwidXNlclByaW5jaXBhbE5hbWUiOiJjaGVucnVpdGFvQG9zY2hpbmEuY24iLCJ1c2VybmFtZSI6ImNoZW5ydWl0YW8ifQ==',
      domain: 'xxxxxx',
      path: '/',
      expires: 0, // 设置为 0 表示会话 cookie，你可以设置具体的过期时间
      httpOnly: false, // 是否为 HTTP-only cookie
      secure: false, // 是否要求安全连接
      sameSite: 'Lax', // SameSite 属性，可以是 'Lax'、'Strict' 或 'None'
    },{
      name: 'tenant',
      value: 'xxx',
      domain: 'xxxxxx',
      path: '/',
      expires: 0, // 设置为 0 表示会话 cookie，你可以设置具体的过期时间
      httpOnly: false, // 是否为 HTTP-only cookie
      secure: false, // 是否要求安全连接
      sameSite: 'Lax', // SameSite 属性，可以是 'Lax'、'Strict' 或 'None'
    }]);

    console.log('####',context.cookies())
    // 打开需要登录的页面
    await page.goto('https://xxxxxx/auth/realms/osc/protocol/openid-connect/auth?response_type=code&client_id=one-sso&redirect_uri=https://osc.gitee.work/api/one/rest/v1/users/login/info/ret');
    
    page.screenshot({ path: 'screenshot.png' });


    // 关闭浏览器
    page.close();
}
