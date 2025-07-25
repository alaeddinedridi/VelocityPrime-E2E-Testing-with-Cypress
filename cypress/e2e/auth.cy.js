import {AuthPage} from '../pages/AuthPage'
import { HomePage } from '../pages/HomePage'



const authPage = new AuthPage()
const homePage = new HomePage()

const users = require('../fixtures/users.json')


describe('Authentication page', () => {

  

    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage();
        cy.window().then((win) => win.sessionStorage.clear());
        homePage.visit()
        cy.getByData('login-icon').click()

    })


    users.forEach((user) => {
  
        it(`Login test - Scenario: ${user.scenario}`, ()=> {
        
            cy.log(`Email: ${user.email || 'EMPTY EMAIL'} and Password: ${user.password}`)
            
            authPage.enterEmail(user.email)
            authPage.enterPassword(user.password)
            authPage.login()

            if (user.expected === 'success') {
                cy.url().should('include', '/admin/dashboard')
                cy.title().should("include","Admin Dashboard")
                cy.getByData('dashboard-element').should('exist')
            } else {
                if (user.emailError){         
                    cy.getByData("emailerror").should("be.visible")
                    cy.getByData("emailerror").should("contain",user.emailError)     
                }

                if (user.passwordError){
                    cy.getByData("passworderror").should("be.visible").and("contain",user.passwordError)
                    cy.getByData("passworderror").should("contain",user.passwordError)
                }

                if (user.unifiedError){
                    cy.getByData("unified-error").should("be.visible").and("contain",user.unifiedError)
                }
            }
            

        })
    })
})