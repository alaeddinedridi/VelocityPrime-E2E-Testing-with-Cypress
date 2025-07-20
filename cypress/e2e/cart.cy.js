describe('Cart page', () => {

    // This is a hook used to run before each test
    beforeEach(() => {
      cy.visit("http://localhost:3000/")
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


        cy.getByData("shopping").click()

        cy.getByData("product").first().trigger('mouseover')
        .find('[data-test="add-to-cart"]').click()

        cy.waitForLoadingToFinish()

       
        cy.getByData("product-price").invoke('text').then((pricestr)=>{
            productPrice = Number(pricestr.split(" ")[1])
            cy.log("Product price:",productPrice)
        })
        
        cy.getByData("product-name").invoke('text').then((name)=>{
            productName = name
            cy.log("Product name:",productName)
        })

        cy.getByData("product-description").invoke('text').then((description)=>{
            productDescription = description
            cy.log("Product description:",productDescription)
        })
        

        cy.getByData("add-to-cart").click()
        cy.getByData('cart-icon').click()

        
        cy.getByData("cart-product-price").invoke('text').then((pricestr)=>{
            cartProductPrice = Number(pricestr.split(" ")[1])
            cy.log("Cart product price:",cartProductPrice)
        })

        cy.getByData("cart-product-name").invoke('text').then((name)=>{
            cartProductName = name
            cy.log("Cart product name:",cartProductName)

        })

        cy.getByData("cart-product-description").invoke('text').then((description)=>{
            cartProductDescription = description
            cy.log("Cart product description:",cartProductDescription)

        })
        
        cy.getByData("number_of_items").then(($el) => {
            priceOfItems = Number($el.text().split(" ")[1])
            cy.log("Actual price of items:",priceOfItems)

        })
        cy.getByData("shipping_price").then(($el) => {
            shippingPrice = Number($el.text().split(" ")[1])
            cy.log("Actual shipping price:",shippingPrice)

        })
        cy.getByData("tax").then(($el) => {
            tax = Number($el.text().split(" ")[1])
            cy.log("Actual tax:",tax)
        })
        cy.getByData("total").then(($el) => {
            total = Number($el.text().split(" ")[1])
            cy.log("Actual total price of items:",total)

        })

        const round = (num)=>{
            return Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
        }

        const calculateShippingPrice= (cartProductPrice)=>{
            const shippingPrice=cartProductPrice > 100 ? 0 : 7.00
            cy.log("Expected shipping price:",shippingPrice)
            return shippingPrice
        }

        const calculateTax=(cartProductPrice)=>{
            const tax = round(cartProductPrice * 0.15)
            cy.log("Expected tax:",tax)
            return tax
        }

        const calculateTotalPrice=(cartProductPrice,expectedShippingPrice,expectedTax)=>{
            const total = round(cartProductPrice + expectedShippingPrice + expectedTax)   
            cy.log("Expected total price:",total)
            return total 
        }

        

        cy.then(() => {
            let expectedShippingPrice= calculateShippingPrice(cartProductPrice)
            let expectedTax= calculateTax(cartProductPrice)
            let expectedTotalPrice= calculateTotalPrice(cartProductPrice,expectedShippingPrice,expectedTax)

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