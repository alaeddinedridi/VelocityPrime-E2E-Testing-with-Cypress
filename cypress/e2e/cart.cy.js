import {CartPage} from '../pages/CartPage'
import {HomePage} from '../pages/HomePage'
import { ProductsPage } from '../pages/ProductsPage'
import { ProductPage } from '../pages/ProductPage'

const cartPage = new CartPage()
const homePage = new HomePage()
const productsPage = new ProductsPage()
const productPage = new ProductPage()

describe('Cart page', () => {

    // This is a hook used to run before each test
    beforeEach(() => {
        homePage.visit()
        cy.getByData('cart-icon').click()
    })

    it('Check page title', () => {
        
        cy.url().should('include', '/cart')
        cy.title().should("include","Cart")
    })

    it('Cart should be empty', () => {

        cy.contains("Cart is empty.")

        cartPage.getCartPriceOfItems().then((priceOfItems)=>{
            expect(priceOfItems).to.equal(0) 
        })

        cartPage.getCartShippingPrice().then((shippingPrice)=>{
            expect(shippingPrice).to.equal(0)
        })
        
        cartPage.getCartTax().then((tax)=>{
            expect(tax).to.equal(0)
        })
 
        cartPage.getCartTotal().then((total)=>{
            expect(total).to.equal(0)
        })
      
    })

    

    it.only('Add one product in the cart', () => {

        cartPage.goShopping()
        productsPage.viewProduct()

        cy.waitForLoadingToFinish()

        let productName=undefined
        let productPrice=undefined
        let productDescription=undefined
        let cartProductName=undefined
        let cartProductPrice=undefined
        let cartProductDescription=undefined
        let priceOfItems=undefined
        let shippingPrice=undefined
        let tax=undefined
        let total=undefined

        productPage.getProductName().then((pName)=>{
            productName=pName
        })

        productPage.getProductPrice().then((price) => {
            productPrice=price
        })

        productPage.getProductDescription().then((pDescription)=>{
            productDescription=pDescription
        })
        
        productPage.addToCart()
        productPage.goToCart()

        cartPage.getCartProductName().then((cartPName)=>{
            cartProductName=cartPName
        })

        cartPage.getCartProductPrice().then((cartPPrice)=>{
            cartProductPrice=cartPPrice
        })

        cartPage.getCartProductDescription().then((cartPDescription)=>{
            cartProductDescription=cartPDescription
        })
    
        cartPage.getCartPriceOfItems().then((itemsPrice)=>{
            priceOfItems=itemsPrice
        })
        cartPage.getCartShippingPrice().then((priceOfShipping)=>{
            shippingPrice=priceOfShipping
        })
        cartPage.getCartTax().then((cartTax)=>{
            tax=cartTax
        })
        cartPage.getCartTotal().then((cartTotal)=>{
            total=cartTotal
        })



        cy.then(() => {
            let expectedShippingPrice= cartPage.calculateShippingPrice(cartProductPrice)
            let expectedTax= cartPage.calculateTax(cartProductPrice)
            let expectedTotalPrice= cartPage.calculateTotalPrice(cartProductPrice,expectedShippingPrice,expectedTax)

            expect(cartProductName).to.equal(productName)
            expect(cartProductPrice).to.equal(productPrice)
            expect(cartProductDescription).to.equal(productDescription)
            expect(shippingPrice).to.equal(expectedShippingPrice)
            expect(tax).to.equal(expectedTax)
            expect(total).to.equal(expectedTotalPrice)
            expect(priceOfItems).to.equal(cartProductPrice)
        })

    })
})