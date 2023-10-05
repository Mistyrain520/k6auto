import { browser } from 'k6/experimental/browser'
import { browcontext } from 'k6/experimental/BrowserContext'
import { check } from 'k6'
import http from 'k6/http'

export const options = {
  scenarios: {
    browser: {
      executor: 'per-vu-iterations',
      exec: 'browserTest',
      options: {
        browser: {
          type: 'chromium'
        }
      }
    }
    // protocol: {
    //   executor: 'constant-vus',
    //   exec: 'protocolTest',
    //   vus: 20,
    //   duration: '30s'
    // }
  }
}

export async function browserTest() {
  const btext = browcontext.browser()
  const page = browser.newPage()
  await page.goto('https://team.gitee.cn/project/osc/workspaces')
  
  
  const productCard = page.locator('[class="ant-btn css-nuzu10 ant-btn-primary ant-btn-background-ghost"]')
  await productCard.click()

  // const quantityOption = page.locator('[data-cy="product-quantity"]')
  // quantityOption.selectOption('3')

  // const addToCardBtn = page.locator('[data-cy="product-add-to-cart"]')
  // await addToCardBtn.click()

  // check(page, {
  //   'cart item name': page => page.locator('//p[text()="National Park Foundation Explorascope"]').isVisible() === true,
  //   'cart item quantity': page => page.locator('//p[text()="3"]').isVisible() === true
  // })

  // page.close()
}

// export function protocolTest() {
//   const res = http.get('https://otel-demo.field-eng.grafana.net/')

//   check(res, {
//     'status is 200': res => res.status === 200
//   })
// }