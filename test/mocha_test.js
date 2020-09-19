const { Builder, By, until } = require('selenium-webdriver')
const test = require('selenium-webdriver/testing')

test.describe('JS-ramverk', function () {
  let driver

  test.beforeEach(function () {
    this.timeout(20000)
    driver = new Builder().forBrowser('firefox').build()
    driver.get('http://localhost:3000') // (1)
  })

  test.it('Check title', function () {
    driver.wait(until.titleIs('JS-ramverk'), 1000) // (4)
  })

  test.it('Go to kmom01', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom01')))
    await link.click()

    driver.wait(until.urlContains('/reports/week/1'))
  })

  test.it('Go to kmom02', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom02')))
    await link.click()

    driver.wait(until.urlContains('/reports/week/2'))
  })

  test.it('Go to kmom04', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom04')))
    await link.click()

    driver.wait(until.urlContains('/reports/week/4'))
  })

  test.it('Go to Home', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('Home')))
    await link.click()

    driver.wait(until.urlIs('http://localhost:3000/'))
  })

  test.it.skip('Use Github link', async function () {
    const link = await driver.wait(
      until.elementLocated(By.css('a.jAPudY:nth-child(3)'), 10000),
    )
    await link.click()

    driver.wait(until.urlContains('github.com'))
  })

  test.afterEach(function () {
    driver.quit()
  })
})
