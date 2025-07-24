import {AuthPage} from '../pages/AuthPage'
import { HomePage } from '../pages/HomePage'



const authPage = new AuthPage()
const homePage = new HomePage()

describe('Authentication page', () => {

    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage();
        cy.window().then((win) => win.sessionStorage.clear());
        homePage.visit()
        cy.getByData('login-icon').click()
    })

    while (1 < 5){
    it('Validate login with valid credentials', ()=> {
        const errors = [];
        cy.fixture('users').then((users) => {
            for (const user of users) {
                cy.log(`Scenario: ${user.scenario}`)
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
                        try{
                            cy.getByData("emailerror").should("be.visible")
                        } catch (e) {
                            errors.push("Email visibility error: " + e.message);
                        }
                        
                        try{
                            cy.getByData("emailerror").should("contain",user.emailError)
                        } catch (e) {
                            errors.push("Email expected error: " + e.message);
                        }
                    }
        
                    if (user.passwordError){
                        try{
                            cy.getByData("passworderror").should("be.visible").and("contain",user.passwordError)
                        } catch (e) {
                            errors.push("Password visibility error: " + e.message);
                        }

                        try{
                            cy.getByData("passworderror").should("contain",user.passwordError)
                        } catch (e) {
                            errors.push("Password expected error: " + e.message);
                        }
                    }
        
                    // if (user.unifiedError){
                    //     cy.getByData("unified-error").should("be.visible").and("contain",user.unifiedError)
                    // }
                }
                cy.visit("/#/admin/login")
                
            }
        })
    })
    }
})