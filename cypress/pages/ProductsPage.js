export class ProductsPage { 
    viewProduct=()=>{
        cy.getByData("product").first().trigger('mouseover')
        .find('[data-test="add-to-cart"]').click()
    }
}