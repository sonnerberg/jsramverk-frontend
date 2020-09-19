const { Builder, By, until } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const test = require('selenium-webdriver/testing')
const fsp = require('fs').promises
const assert = require('assert')

const screen = {
  width: 1920,
  height: 1080,
}

const testUrl = 'https://sonnerberg.me/'

// https://stackoverflow.com/a/49185175
async function takeScreenshot(driver, file) {
  let image = await driver.takeScreenshot()
  await fsp.writeFile(`./test/images/${file}`, image, 'base64')
}

test.describe('JS-ramverk', function () {
  let driver

  test.beforeEach(function () {
    this.timeout(10000)
    driver = new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
      .build()
    driver.get(testUrl)
  })

  test.it('Check title for home', async function () {
    driver.wait(until.titleIs('Home | JS-ramverk'))
    const title = await driver.getTitle()
    assert.strictEqual(title, 'Home | JS-ramverk')
  })

  test.it('Go to kmom01', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom01')))
    await link.click()

    driver.wait(until.urlContains('/reports/week/1'))
    const url = await driver.getCurrentUrl()
    assert.ok(url.endsWith('/reports/week/1'))
    await takeScreenshot(driver, 'kmom01.png')
  })

  test.it('Go to kmom01 and check title', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom01')))
    await link.click()

    driver.wait(until.titleIs('Kursmoment 1 | JS-ramverk'))
    const title = await driver.getTitle()
    assert.strictEqual(title, 'Kursmoment 1 | JS-ramverk')
  })

  test.it('Go to kmom02', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom02')))
    await link.click()

    driver.wait(until.urlContains('/reports/week/2'))
    const url = await driver.getCurrentUrl()
    assert.ok(url.endsWith('/reports/week/2'))
    await takeScreenshot(driver, 'kmom02.png')
  })

  test.it('Go to kmom02 and check title', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom02')))
    await link.click()

    driver.wait(until.titleIs('Kursmoment 2 | JS-ramverk'))
    const title = await driver.getTitle()
    assert.strictEqual(title, 'Kursmoment 2 | JS-ramverk')
  })

  test.it('Go to kmom04', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom04')))
    await link.click()

    driver.wait(until.urlContains('/reports/week/4'))
    const url = await driver.getCurrentUrl()
    assert.ok(url.endsWith('/reports/week/4'))
    await takeScreenshot(driver, 'kmom04.png')
  })

  test.it('Go to kmom04 and check title', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('kmom04')))
    await link.click()

    driver.wait(until.titleIs('Kursmoment 4 | JS-ramverk'))
    const title = await driver.getTitle()
    assert.strictEqual(title, 'Kursmoment 4 | JS-ramverk')
  })

  test.it('Go to Home', async function () {
    const link = await driver.wait(until.elementLocated(By.linkText('Home')))
    await link.click()

    driver.wait(until.urlIs(testUrl))
    const url = await driver.getCurrentUrl()
    assert.strictEqual(url, testUrl)
    await takeScreenshot(driver, 'home.png')
  })

  test.it.skip('Use Github link', async function () {
    const link = await driver.wait(until.elementLocated(By.id('githubUser')))
    await link.click()

    // driver.wait(until.urlContains('github.com'), 20000)
    // await takeScreenshot(driver, 'visitGithub.png')
    const windowHandles = await driver.getAllWindowHandles()
    console.log(windowHandles)
  })

  test.it('Register user and visit "create and update"', async function () {
    // If the user is already registered, login instead
    const button = await driver.wait(
      until.elementLocated(By.id('showregister')),
    )
    await button.click()
    const registerEmail = await driver.wait(
      until.elementLocated(By.id('registerEmail')),
    )
    await registerEmail.click()
    registerEmail.sendKeys('test@test.com')
    const registerPassword = await driver.wait(
      until.elementLocated(By.id('registerPassword')),
    )
    await registerPassword.click()
    registerPassword.sendKeys('testing')

    const registerButton = await driver.wait(
      until.elementLocated(By.id('registerButton')),
    )
    await registerButton.click()

    const link = await driver.wait(
      until.elementLocated(By.linkText('create or update')),
    )
    await link.click()

    await takeScreenshot(driver, 'register.png')
  })

  test.afterEach(function () {
    this.timeout(20000)
    driver.quit()
  })
})
