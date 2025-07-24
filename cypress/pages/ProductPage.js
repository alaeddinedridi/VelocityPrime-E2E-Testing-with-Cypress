export class ProductPage { 

    getProductPrice=()=>{
        return cy.getByData("product-price").invoke('text').then((priceStr) => {
            const productPrice = Number(priceStr.split(" ")[1]);
            cy.log("Product price:", productPrice);
            return productPrice; // ✅ returns from inside .then()
        });
    }

    getProductName=()=>{
        cy.getByData("product-name").invoke('text').as("productName")
        const productName=cy.get("@productName")    
        cy.log("Product name:",productName)
        return productName
        
    }

    getProductDescription=()=>{
        cy.getByData("product-description").invoke('text').as("productDescription")
        const productDescription=cy.get("@productDescription")
        cy.log("Product description:",productDescription)
        return productDescription
    }

    addToCart=()=>{
        cy.getByData("add-to-cart").click()
    }

    goToCart=()=>{
        cy.getByData('cart-icon').click()
    }
}