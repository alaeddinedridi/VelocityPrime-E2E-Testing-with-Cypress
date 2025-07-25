export class ProductPage { 

    getProductPrice=()=>{
        return cy.getByData("product-price").invoke('text').then((priceStr) => {
            const productPrice = Number(priceStr.split(" ")[1])
            cy.log("Product price:", productPrice)
            return cy.wrap(productPrice)
        });
    }

    getProductName=()=>{
        return cy.getByData("product-name").then(($el) => {
            const productName = $el.text()
            cy.log("Product name:",productName)
            return cy.wrap(productName)
        })   
    }

    getProductDescription=()=>{
        return cy.getByData("product-description").then(($el) => {
            const productDescription = $el.text()
            cy.log("Product description:",productDescription)
            return cy.wrap(productDescription)
        })
    }

    addToCart=()=>{
        cy.getByData("add-to-cart").click()
    }

    goToCart=()=>{
        cy.getByData('cart-icon').click()
    }

    selectSize=()=>{
        return cy.getByData("medium").then(($el) => {
            const size = $el.text() 
            cy.wrap($el).click()
            cy.log("selected size:",size)
            return cy.wrap(size)
        })
    }
    
    selectQuantity=()=>{
        return cy.getByData("increase").then(($el)=>{
            cy.wrap($el).click()
            cy.getByData("quantity").invoke("val").then((value) => {
                cy.log("selected quantity:",value)
                return cy.wrap(Number(value))
            })
        })
    }
}