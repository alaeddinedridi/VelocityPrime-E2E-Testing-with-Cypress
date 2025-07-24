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
        let shippingPrice=undefined
        let tax=undefined
        let total=undefined
        let priceOfItems=undefined

        cy.contains("Cart is empty.")

        cy.getByData("number_of_items").then(($el) => {
            priceOfItems = Number($el.text().split(" ")[1])
            expect(priceOfItems).to.equal(0)
        })
        cy.getByData("shipping_price").then(($el) => {
            shippingPrice = Number($el.text().split(" ")[1])
            expect(shippingPrice).to.equal(0)
        })
        cy.getByData("tax").then(($el) => {
            tax = Number($el.text().split(" ")[1])
            expect(tax).to.equal(0)
        })
        cy.getByData("total").then(($el) => {
            total = Number($el.text().split(" ")[1])
            expect(total).to.equal(0)
        })
    })

    

    it.only('Add one product in the cart', () => {

        cartPage.goShopping()
        productsPage.viewProduct()

        cy.waitForLoadingToFinish()
     
        let productName=undefined

        productPage.getProductName().then((pName)=>{
            productName=pName
        })

        productPage.getProductPrice().then((price) => {
            expect(price).to.equal(29.99); // Or whatever you expect
        });

        let productDescription=productPage.getProductDescription().then((productDescription)=>{
            return productDescription
        })
        
        productPage.addToCart()
        productPage.goToCart()

        let cartProductName=cartPage.getCartProductName().then((cartProductName)=>{
            return cartProductName
        })

        //let cartProductPrice=cartPage.getCartProductPrice()

        let cartProductDescription=cartPage.getCartProductDescription().then((cartProductDescription)=>{
            return cartProductDescription
        })
    
        // let priceOfItems=cartPage.getCartPriceOfItems().then((priceOfItems)=>{
        //     return priceOfItems
        // })
        // let shippingPrice=cartPage.getCartShippingPrice().then((shippingPrice)=>{
        //     return shippingPrice
        // })
        // let tax=cartPage.getCartTax().then((tax)=>{
        //     return tax
        // })
        // let total=cartPage.getCartTotal().then((total)=>{
        //     return total
        // })



        // cy.then(() => {
        //     let expectedShippingPrice= cartPage.calculateShippingPrice(cartProductPrice)
        //     let expectedTax= cartPage.calculateTax(cartProductPrice)
        //     let expectedTotalPrice= cartPage.calculateTotalPrice(cartProductPrice,expectedShippingPrice,expectedTax)

        //     expect(cartProductName).to.equal(productName)
        //     expect(cartProductPrice).to.equal(productPrice)
        //     expect(cartProductDescription).to.equal(productDescription)
        //     expect(shippingPrice).to.equal(expectedShippingPrice)
        //     expect(tax).to.equal(expectedTax)
        //     expect(total).to.equal(expectedTotalPrice)
        //     expect(priceOfItems).to.equal(cartProductPrice)
        // })

    })
})