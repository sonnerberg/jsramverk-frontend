/** global: cy */

describe('Me app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('loading')
    cy.contains('This is JS-ramverk')
  })

  it('login form can be opened', () => {
    cy.contains('login').click()
  })

  it('user can visit kmom01', () => {
    cy.contains('kmom01').click()
  })

  it('user can visit kmom02', () => {
    cy.contains('kmom02').click()
  })

  it('user can visit kmom04', () => {
    cy.contains('kmom04').click()
  })

  it('user can register', () => {
    cy.contains('register').click()
    cy.get('input[id=registerEmail]').type('cypress@test.com')
    cy.get('input[id=registerPassword]').type('salainen')
    cy.get('input[id=registerShowPassword]').check()
    cy.get('form[id=registerForm]').submit()
  })

  it('user can login and visit create or update', () => {
    cy.contains('login').click()
    cy.get('input[id=loginEmail]').type('cypress@test.com')
    cy.get('input[id=loginPassword]').type('salainen')
    cy.get('form[id=loginForm]').submit()
    cy.contains('create or update').click()
    cy.get('select[id=kmom-select]').select('Kmom01')
    // Wait for the backend
    cy.wait(500)
    cy.get('form[id=kmomForm').submit()
  })

  it('user can create content', () => {
    cy.contains('login').click()
    cy.get('input[id=loginEmail]').type('cypress@test.com')
    cy.get('input[id=loginPassword]').type('salainen')
    cy.get('form[id=loginForm]').submit()
    cy.contains('create or update').click()
    cy.get('select[id=kmom-select]').select('Kmom10')
    // Wait for the backend
    cy.wait(500)
    cy.get('textarea[id=kmom-text]')
      .clear()
      .type('Hello world!\nThis is a message from cypress')
    cy.get('input[id=kmom-link]')
      .clear()
      .type('https://github.com/cypress-io/cypress')
    cy.get('form[id=kmomForm').submit()
  })

  it('login and logout', () => {
    cy.contains('login').click()
    cy.get('input[id=loginEmail]').type('cypress@test.com')
    cy.get('input[id=loginPassword]').type('salainen')
    cy.get('form[id=loginForm]').submit()
    cy.wait(500)
    cy.get('button[id=logout').click()
  })

  it('login with wrong credentials', () => {
    cy.contains('login').click()
    cy.get('input[id=loginEmail]').type('cypress@test.com')
    cy.get('input[id=loginPassword]').type('sainen')
    cy.get('form[id=loginForm]').submit()
    cy.wait(4000)
  })

  it('user cannot register again', () => {
    cy.contains('register').click()
    cy.get('input[id=registerEmail]').type('cypress@test.com')
    cy.get('input[id=registerPassword]').type('salnen')
    cy.get('input[id=registerShowPassword]').check()
    cy.get('form[id=registerForm]').submit()
    // Wait for error message to disappear
    cy.wait(4000)
  })
})
