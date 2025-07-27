export class ProductsPage { 
    viewProduct=()=>{
        cy.getByData("product").first().trigger('mouseover')
        .find('[data-test="add-to-cart"]').click()
    }

    
    sortProductsByLatest=()=>{
        cy.getByData("latest").then(($el)=>{
            cy.wrap($el).click()
        })
    }

    verifySortedByLatest=()=>{

    }

    sortProductsByNewest=()=>{
        cy.getByData("newest").then(($el)=>{
            cy.wrap($el).click()
        })
    }

    verifySortedByNewest=()=>{

    }

    sortProductsByPriceAsc=()=>{
        cy.getByData("low").then(($el)=>{
            cy.wrap($el).click()
        })
    }

    verifySortedByPriceAsc=()=>{
        return cy.getPrices().then((prices) => {
            cy.log("Prices:",prices)
            const sortedAsc = [...prices].sort((a, b) => a - b);
            cy.log("sortedAsc:",sortedAsc)
            return cy.wrap(sortedAsc)
        })
    }


    sortProductsByPriceDesc=()=>{
        cy.getByData("high").then(($el)=>{
            cy.wrap($el).click()
        })
    }

    verifySortedByPriceDesc=()=>{
       
        return cy.getPrices().then((prices) => {
            cy.log("Prices:",prices)
            const sortedDesc = [...prices].sort((a, b) => b - a);
            cy.log("sortedDesc:",sortedDesc)
            return cy.wrap(sortedDesc)
        })
    }

    showAvailableProducts=()=>{
        cy.getByData("available").then(($el)=>{
            cy.wrap($el).click()
        })
    }

   
}