const { Builder, By, until } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const test = require('selenium-webdriver/testing')

const screen = {
  width: 1920,
  height: 1080,
}

test.describe('JS-ramverk', function () {
  let driver

  test.beforeEach(function () {
    this.timeout(10000)
    driver = new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
      .build()
    driver.get('http://localhost:3000')
  })

  test.it('Check title for home', function () {
    driver.wait(until.titleIs('Home | JS-ramverk'))
  })

  test.it('Go to kmom01', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom01')))
    await link.click()

    driver.wait(until.urlContains('/reports/week/1'))
  })

  test.it('Go to kmom01 and check title', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom01')))
    await link.click()

    driver.wait(until.titleIs('Kursmoment 1 | JS-ramverk'))
  })

  test.it('Go to kmom02', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom02')))
    await link.click()

    driver.wait(until.urlContains('/reports/week/2'))
  })

  test.it('Go to kmom02 and check title', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom02')))
    await link.click()

    driver.wait(until.titleIs('Kursmoment 2 | JS-ramverk'))
  })

  test.it('Go to kmom04', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom04')))
    await link.click()

    driver.wait(until.urlContains('/reports/week/4'))
  })

  test.it('Go to kmom04 and check title', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom04')))
    await link.click()

    driver.wait(until.titleIs('Kursmoment 4 | JS-ramverk'))
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

  test.it.skip(
    'Register user and visit "create and update"',
    async function () {
      // If the user is already registered, login instead
    },
  )

  test.afterEach(function () {
    this.timeout(20000)
    driver.quit()
  })
})
