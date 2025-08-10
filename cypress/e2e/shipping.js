import {AuthPage} from '../pages/AuthPage'
import { HomePage } from '../pages/HomePage'
import { ShippingPage } from '../pages/ShippingPage'




const homePage = new HomePage()
const shippingPage= new ShippingPage()

const users = require('../fixtures/users.json')


describe('Shipping page', () => {

  

    beforeEach(() => {
        cy.clearCookies()
        cy.clearLocalStorage();
        cy.window().then((win) => win.sessionStorage.clear());
        homePage.visit()
        

    })


   
})