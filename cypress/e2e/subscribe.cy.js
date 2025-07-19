describe("Newsletter Subscribe Form", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/")
    })
  
    it("allows users to subscribe to the email list", () => {
        // Get the email field with data-test="email-input" and type in "ala@gmail.com"
        cy.getByData("email-input").type("ala@gmail.com")
        // Click on the subscribe button
        cy.getByData("subscribe-btn").click()
        // Check that "modal-message" element “exists” in the DOM
        cy.getByData("modal-message").should("exist").contains("You have successfully subscribed to our newsletter!")
    })

    it("does NOT allow an invalid email address", () => {
        cy.getByData("email-input").type("ala")
        cy.getByData("subscribe-btn").click()
        cy.getByData("modal-message").should("not.exist")
    })
  })