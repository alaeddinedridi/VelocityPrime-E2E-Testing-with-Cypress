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
        const total = round(cartProductPrice + expectedShippingPrice + expectedTax)   
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
            return cartProductPrice
        })
    }

    getCartProductName=()=>{
        return cy.getByData("cart-product-name").invoke('text').then((cartProductName)=>{
            cy.log("Cart product name:",cartProductName)
        })
    }

    getCartProductDescription=()=>{
        return cy.getByData("cart-product-description").invoke('text').then((cartProductDescription)=>{
            cy.log("Cart product description:",cartProductDescription)
        })
    }

    getCartPriceOfItems=()=>{
        return cy.getByData("number_of_items").then(($el) => {
            const priceOfItems = Number($el.text().split(" ")[1])
            cy.log("Actual price of items:",priceOfItems)
            return priceOfItems
        })
    }

    getCartShippingPrice=()=>{
        return cy.getByData("shipping_price").then(($el) => {
            const shippingPrice = Number($el.text().split(" ")[1])
            cy.log("Actual shipping price:",shippingPrice)
            return shippingPrice
        })
    }

    getCartTax=()=>{
        return cy.getByData("tax").then(($el) => {
            const tax = Number($el.text().split(" ")[1])
            cy.log("Actual tax:",tax)
            return tax
        })
    }

    getCartTotal=()=>{
        return cy.getByData("total").then(($el) => {
            const total = Number($el.text().split(" ")[1])
            cy.log("Actual total price of items:",total)
            return total
        })
    }
    
}

