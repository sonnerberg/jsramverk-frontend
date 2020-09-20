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
    cy.get('form[id=registerForm]').submit()
  })

  it.skip('user can login and visit create or update', () => {
    cy.contains('login').click()
    cy.get('input[id=loginEmail]').type('cypress@test.com')
    cy.get('input[id=loginPassword]').type('salainen')
    cy.get('form[id=loginForm]').submit()
    cy.contains('create or update').click()
    cy.get('select[id=kmom-select]')
      .select('Kmom01')
      .select('Kmom02')
      .select('Kmom03')
      .select('Kmom04')
      .select('Kmom05')
      .select('Kmom06')
      .select('Kmom07')
      .select('Kmom01')
    // Wait for the backend
    cy.wait(500)
    cy.get('form[id=kmomForm').submit()
    cy.get('button[id=logout').click()
  })

  it('login with wrong credentials', () => {
    cy.contains('login').click()
    cy.get('input[id=loginEmail]').type('cypress@test.com')
    cy.get('input[id=loginPassword]').type('sainen')
    cy.get('form[id=loginForm]').submit()
    cy.wait(6000)
  })
})
