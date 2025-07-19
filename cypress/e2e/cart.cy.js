describe('Cart page', () => {

    // This is a hook used to run before each test
    beforeEach(() => {
      cy.visit("http://localhost:3000/")
    })

    it('Check page title', () => {
        cy.get('nav').contains('men').click()
        cy.url().should('include', '/men')
        cy.title().should("include","Men")
    })
})