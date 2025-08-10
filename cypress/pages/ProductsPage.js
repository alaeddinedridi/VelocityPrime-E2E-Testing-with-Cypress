export class ProductsPage { 
    viewProduct=()=>{
        cy.getByData("product").first().trigger('mouseover')
        .find('[data-test="add-to-cart"]').click()
    }

    
    sortProductsByLatest=()=>{
        cy.log("Click on the 'The latest'")
        cy.getByData("latest").then(($el)=>{
            cy.wrap($el).click()
        })
    }

    verifySortedByLatest=()=>{

    }

    sortProductsByNewest=()=>{
        cy.log("Click on the 'The newest'")
        cy.getByData("newest").then(($el)=>{
            cy.wrap($el).click()
        })
    }

    verifySortedByNewest=()=>{
        
    }

    sortProductsByPriceAsc=()=>{
        cy.log("Click on the 'price low to high'")
        cy.getByData("low").then(($el)=>{
            cy.wrap($el).click()
        })
    }

    verifySortedByPriceAsc=()=>{
        return cy.getPrices().then((prices) => {
            cy.log("Actual products order by price:",prices)
            const sortedAsc = [...prices].sort((a, b) => a - b);
            cy.log("Expected products order by price:",sortedAsc)
            return cy.wrap(sortedAsc)
        })
    }


    sortProductsByPriceDesc=()=>{
        cy.log("Click on the 'price high to low'")
        cy.getByData("high").then(($el)=>{
            cy.wrap($el).click()
        })
    }

    verifySortedByPriceDesc=()=>{
       
        return cy.getPrices().then((prices) => {
            cy.log("Actual products order by price:",prices)
            const sortedDesc = [...prices].sort((a, b) => b - a);
            cy.log("Expected products order by price:",sortedDesc)
            return cy.wrap(sortedDesc)
        })
    }

    showAvailableProducts=()=>{
        cy.log("Only show products that are in stock")
        cy.getByData("available").then(($el)=>{
            cy.wrap($el).click()
        })
    }

    showFilters=()=>{
        cy.getByData("show-filters").then(($el)=>{
            cy.wrap($el).click()
        })
    }

    showNavMenu=()=>{
        cy.getByData("show-nav-menu").then(($el)=>{
            cy.wrap($el).click()
        })
    }
   
    clickNavItem=()=>{
        cy.getByData('men').click()
    }
}