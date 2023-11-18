import { browser } from 'k6/experimental/browser';

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
      name: 'sessionToken',
      value: 'r:0ae319f13a2c641736e66aec338fc35f',
      domain: 'localhost:8088',
      path: '/',
      expires: 0, // 设置为 0 表示会话 cookie，你可以设置具体的过期时间
      httpOnly: false, // 是否为 HTTP-only cookie
      secure: false, // 是否要求安全连接
      sameSite: 'Lax', // SameSite 属性，可以是 'Lax'、'Strict' 或 'None'
    },{
      name: 'tenant',
      value: 'osc',
      domain: 'localhost:8088',
      path: '/',
      expires: 0, // 设置为 0 表示会话 cookie，你可以设置具体的过期时间
      httpOnly: false, // 是否为 HTTP-only cookie
      secure: false, // 是否要求安全连接
      sameSite: 'Lax', // SameSite 属性，可以是 'Lax'、'Strict' 或 'None'
    }]);

    console.log('####',context.cookies())
    // 打开需要登录的页面
    await page.goto('http://localhost:8088/project/osc/workspaces');
    page.screenshot({ path: 'screenshot.png' });


    // 关闭浏览器
    page.close();
}
