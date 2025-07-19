// you can see this as the name of the component or suite
describe('Home page', () => {

  // This is a hook used to run before each test
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  // // this is the test (and the name of the test)
  // it('check page title', () => {
  //   // get the title and get if it's equal to "baby page"
  //   cy.title().should("eq","baby page")
  // })

  // // "only" is used to run only this test
  // it.only("the features on the homepage are correct", () => {
  //   // return element(s) having the tag name "dt" and if there are more than an element, use the ".eq" to get
  //   // a specific element
  //   //cy.get("dt").eq(0)
  //   // Return the element having the tag name "nav" and all it's children elements
  //   cy.get("nav")
  // })

  // // The best way to find elements is to put "data-test" attribute in each html element
  // it.only('The copyright text in footer is correct', ()=>{
  //   // as we will find elements the same way and we don't want to repeat the same code dozens of times
  //   // we create a custom command under support/commands.js
  //   //getByData is the custom command that will replace this: cy.get("[data-test='copyright']")
  //   cy.getByData("copyright").contains("Copyright @ 2025 Velocity'")
  // })

  context("navbar tests", () => {
    it('should navigate to men page when clicking on Men link', () => {
      cy.get('nav').contains('men').click()
      cy.url().should('include', '/men')
      cy.title().should("include","Men")
    })

    it('should navigate to women page when clicking on Women link', () => {
      cy.get('nav').contains('women').click()
      cy.url().should('include', '/women')
      cy.title().should("include","Women")
    })

    it('should navigate to contact page when clicking on Contact link', () => {
      cy.get('nav').contains('contact').click()
      cy.url().should('include', '/contact')
      cy.title().should("include","Contact")
    })

    it('should navigate to home page when clicking on Home link', () => {
      cy.get('nav').contains('home').click()
      cy.url().should('include', '/home')
      cy.title().should("include","Home")
    })
  })


  // if we have multiple sections in home page and each section (example: footer) has tests, we can group those tests using "context"
  context("footer tests", () => {


    it('The copyright text in footer is correct', ()=>{
      cy.getByData("copyright").contains("Copyright @ 2025 Velocity'")
    })

    it("allows visiters to subscribe to the email list", () => {
      // Get the email field with data-test="email-input" and type in "ala@gmail.com"
      cy.getByData("email-input").type("ala@gmail.com")
      // Click on the subscribe button
      cy.getByData("subscribe-btn").click()
      // Check that "modal-message" element “exists” in the DOM
      cy.getByData("modal-message").should("exist").contains("You have successfully subscribed to our newsletter!")
    })

    it("Visitors can not subscribe more than once using the same email address", () => {
      // Get the email field with data-test="email-input" and type in "ala@gmail.com"
      cy.getByData("email-input").type("ala@gmail.com")
      // Click on the subscribe button
      cy.getByData("subscribe-btn").click()
      // Check that "modal-message" element “exists” in the DOM
      cy.getByData("modal-message").should("exist").contains("This email has already been used.")
    })

    it("does NOT allow an invalid email address", () => {
      cy.getByData("email-input").type("ala")
      cy.getByData("subscribe-btn").click()
      cy.getByData("modal-message").should("not.exist")
    })

    it("Socal media links work", () => {
      // Click on all "a" links using .click({multiple:true})
      cy.getByData("social-media-links").find("a").eq(2).should("have.attr", "href", "https://www.instagram.com/velocity_prime_/")
      // this is used for internal links/routes
      //cy.location("pathname").should("equal", "https://www.instagram.com/velocity_prime_/")

    })
  })


})