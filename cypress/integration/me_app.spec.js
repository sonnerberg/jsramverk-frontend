/** global: cy */

describe('Me app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('loading')
    cy.contains('This is JS-ramverk')
    cy.get('title').should('contain', 'Home')
  })

  it('login form can be opened', () => {
    cy.contains('login').click()
  })

  it('user can visit kmom01', () => {
    cy.contains('kmom01').click()
    cy.get('title').should('contain', 'Kursmoment 1')
  })

  it('user can visit kmom02', () => {
    cy.contains('kmom02').click()
    cy.get('title').should('contain', 'Kursmoment 2')
  })

  it('user can visit kmom04', () => {
    cy.contains('kmom04').click()
    cy.get('title').should('contain', 'Kursmoment 4')
  })

  it('user can register', () => {
    cy.contains('register').click()
    cy.get('input[id=registerEmail]').type('cypress@test.com')
    cy.get('input[id=registerPassword]').type('salainen')
    cy.get('input[id=registerShowPassword]').check()
    cy.get('form[id=registerForm]').submit()
    cy.get('header').should('contain', 'create or update')
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
    cy.get('header').should('contain', 'kmom10')
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
    cy.get('header').should('not.contain', 'create or update')
  })

  it('user cannot register again', () => {
    cy.contains('register').click()
    cy.get('input[id=registerEmail]').type('cypress@test.com')
    cy.get('input[id=registerPassword]').type('salnen')
    cy.get('input[id=registerShowPassword]').check()
    cy.get('form[id=registerForm]').submit()
    // Wait for error message to disappear
    cy.wait(4000)
    cy.get('header').should('not.contain', 'create or update')
  })
})
