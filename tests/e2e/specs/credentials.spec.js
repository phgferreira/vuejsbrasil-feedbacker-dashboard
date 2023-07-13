describe('Credentials', () => {
  const URL_BASE = 'http://localhost:8080'
  it('deve regenerar api_key', () => {
    cy.visit(URL_BASE)
    cy.get('[data-cy="header-login-button"]').click()
    cy.get('[data-cy="email-field"]').type('igor@igor.me')
    cy.get('[data-cy="password-field"]').type('1234')
    cy.get('[data-cy="login-button"]').click()

    cy.wait(4000)
    cy.visit(`${URL_BASE}/credencials`)
    cy.wait(2000)
    const apiKeyAntiga = cy.get('[data-cy="api-key"]').invoke('text')
    cy.get('[data-cy="generate-api-key"]').click()
    cy.wait(2000)
    const apiKeyNovo = cy.get('[data-cy="api-key"]').invoke('text')
    expect(apiKeyAntiga).to.not.equal(apiKeyNovo)
  })
})
