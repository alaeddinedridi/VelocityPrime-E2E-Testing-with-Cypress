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
}