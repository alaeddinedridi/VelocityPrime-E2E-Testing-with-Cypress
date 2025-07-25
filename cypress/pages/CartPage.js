export class CartPage { 
    
    round = (num)=>{
        return Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
    }

    calculateShippingPrice= (cartProductPrice)=>{
        const shippingPrice=cartProductPrice > 100 ? 0 : 7.00
        cy.log("Expected shipping price:",shippingPrice)
        return shippingPrice
    }

    calculateTax=(cartProductPrice)=>{
        const tax = this.round(cartProductPrice * 0.15)
        cy.log("Expected tax:",tax)
        return tax
    }

    calculateTotalPrice=(cartProductPrice,expectedShippingPrice,expectedTax)=>{
        const total = this.round(cartProductPrice + expectedShippingPrice + expectedTax)   
        cy.log("Expected total price:",total)
        return total
    }

    goShopping=()=>{
        cy.getByData("shopping").click()
    }

    getCartProductPrice=()=>{
        return cy.getByData("cart-product-price").invoke('text').then((pricestr)=>{
            const cartProductPrice = Number(pricestr.split(" ")[1])
            cy.log("Cart product price:",cartProductPrice)
            return cy.wrap(cartProductPrice)
        })
    }

    getCartProductName=()=>{
        return cy.getByData("cart-product-name").invoke('text').then((cartProductName)=>{
            cy.log("Cart product name:",cartProductName)
            return cy.wrap(cartProductName)
        })
    }

    getCartProductDescription=()=>{
        return cy.getByData("cart-product-description").invoke('text').then((cartProductDescription)=>{
            cy.log("Cart product description:",cartProductDescription)
            return cy.wrap(cartProductDescription)
        })
    }

    getCartPriceOfItems=()=>{
        return cy.getByData("number_of_items").then(($el) => {
            const priceOfItems = Number($el.text().split(" ")[1])
            cy.log("Actual price of items:",priceOfItems)
            return cy.wrap(priceOfItems)
        })
    }

    getCartShippingPrice=()=>{
        return cy.getByData("shipping_price").then(($el) => {
            const shippingPrice = Number($el.text().split(" ")[1])
            cy.log("Actual shipping price:",shippingPrice)
            return cy.wrap(shippingPrice)
        })
    }

    getCartTax=()=>{
        return cy.getByData("tax").then(($el) => {
            const tax = Number($el.text().split(" ")[1])
            cy.log("Actual tax:",tax)
            return cy.wrap(tax)
        })
    }

    getCartTotal=()=>{
        return cy.getByData("total").then(($el) => {
            const total = Number($el.text().split(" ")[1])
            cy.log("Actual total price of items:",total)
            return cy.wrap(total)
        })
    }

    getCartQuantity=()=>{
        return cy.getByData("quantity").then(($el) => {
            const quantity = Number($el.text())
            cy.log("Actual quantity of a product in cart:",quantity)
            return cy.wrap(quantity)
        })
    }
    
    getCartSize=()=>{
        return cy.getByData("size").then(($el) => {
            const size = $el.text()
            cy.log("Actual size of a product in cart:",size)
            return cy.wrap(size)
        })
    }

    removeCartProduct=()=>{
        return cy.getByData("remove-product").then(($el)=>{
            cy.log("Remove product from cart")
            cy.wrap($el).click()
        })
    }
}

