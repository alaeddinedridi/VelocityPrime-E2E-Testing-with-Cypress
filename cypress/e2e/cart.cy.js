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
        assertCartIsEmpty(cartPage)
    })

    

    it('Add one product in the cart', () => {

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
        let size=undefined
        let quantity=undefined
        let cartProductSize=undefined
        let cartProductQuantity=undefined

        cartPage.goShopping()
        productsPage.viewProduct()

        cy.waitForLoadingToFinish()

        productPage.getProductName().then((pName)=>{
            productName=pName
        })

        productPage.getProductPrice().then((price) => {
            productPrice=price
        })

        productPage.getProductDescription().then((pDescription)=>{
            productDescription=pDescription
        })
        
        productPage.selectSize().then((productSize)=>{
            size=productSize
        })

        productPage.selectQuantity().then((productQuantity)=>{
            quantity=productQuantity
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

        cartPage.getCartSize().then((cartPSize)=>{
            cartProductSize=cartPSize
        })

        cartPage.getCartQuantity().then((cartPQuantity)=>{
            cartProductQuantity=cartPQuantity
        })


        cy.then(() => {
            let expectedShippingPrice= cartPage.calculateShippingPrice(cartProductPrice)
            let expectedTax= cartPage.calculateTax(cartProductPrice)
            let expectedTotalPrice= cartPage.calculateTotalPrice(cartProductPrice,expectedShippingPrice,expectedTax)

            cy.log("Check if the name of product in product page is equal to the name of product added in cart")
            expect(cartProductName).to.equal(productName)
            cy.log("Check if the price of product in product page is equal to the price of product added in cart")
            expect(cartProductPrice).to.equal(productPrice)
            cy.log("Check if the description of product in product page is equal to the description of product added in cart")
            expect(cartProductDescription).to.equal(productDescription)
            cy.log("Check if shipping price is correctly calculated")
            expect(shippingPrice).to.equal(expectedShippingPrice)
            cy.log("Check if tax is correctly calculated")
            expect(tax).to.equal(expectedTax)
            cy.log("Check if the total price is correctly calculated")
            expect(total).to.equal(expectedTotalPrice)

            expect(priceOfItems).to.equal(cartProductPrice)
            cy.log("Check if the size of product in product page is equal to the size of product added in cart")
            expect(size[0].toUpperCase()).to.equal(cartProductSize[0].toUpperCase())
            cy.log("Check if the quantity of product in product page is equal to the quantity of product added in cart")
            expect(quantity).to.equal(cartProductQuantity)
        })

    })

    it('Remove one product from the cart', () => {
        cartPage.removeCartProduct().then(()=>{
            assertCartIsEmpty(cartPage)
        })
    })
   
})


function assertCartIsEmpty(cartPage) {
    cy.contains("Cart is empty.")

    cartPage.getCartPriceOfItems().then((priceOfItems) => {
        expect(priceOfItems).to.equal(0)
    })

    cartPage.getCartShippingPrice().then((shippingPrice) => {
        expect(shippingPrice).to.equal(0)
    })

    cartPage.getCartTax().then((tax) => {
        expect(tax).to.equal(0)
    })

    cartPage.getCartTotal().then((total) => {
        expect(total).to.equal(0)
    })
}