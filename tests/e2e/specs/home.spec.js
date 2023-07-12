describe('Home', () => {
  it('deve abrir modal de criação de conta quando clicado no botão de criação de conta', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-cy="cta-create-account-button"]').click()
    cy.get('[data-cy="modal-create-account"]')
  })

  it('deve abrir modal de criação de conta quando clicado no botão de criação de conta no cabeçalho', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-cy="header-create-account-button"]').click()
    cy.get('[data-cy="modal-create-account"]')
  })

  it('deve abrir modal de loginq quando clicado no botão de login', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-cy="header-login-button"]').click()
    cy.get('[data-cy="modal-login"]')
  })

  it('deve fazer o login com e-mail e senha', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-cy="header-login-button"]').click()
    cy.get('[data-cy="email-field"]').type('igor@igor.me')
    cy.get('[data-cy="password-field"]').type('1234')
    cy.get('[data-cy="login-button"]').click()
    cy.url().should('include', '/feedbacks')
  })

  it('deve apresentar erro quando e-mail estiver inválido', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-cy="header-login-button"]').click()
    cy.get('[data-cy="email-field"]').type('igor@')
    cy.get('[data-cy="password-field"]').type('1234')
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-cy="email-error"]')
  })

  it('deve fazer logout quando clicado no botão de logout', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-cy="header-login-button"]').click()
    cy.get('[data-cy="email-field"]').type('igor@igor.me')
    cy.get('[data-cy="password-field"]').type('1234')
    cy.get('[data-cy="login-button"]').click()
    cy.url().should('include', '/feedbacks')
    cy.get('[data-test="logout-button"]').click()
    cy.url().should('include', '/')
  })
})
