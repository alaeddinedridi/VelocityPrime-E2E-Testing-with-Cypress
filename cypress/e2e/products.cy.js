import { HomePage } from '../pages/HomePage'
import { ProductsPage } from '../pages/ProductsPage'


const productsPage = new ProductsPage()
const homePage = new HomePage()


describe('products tests', () => {

    let supposedToBesortedPricesDesc=[]
    let supposedToBesortedPricesAsc=[]
    let sortedPricesDesc=[]
    let sortedPricesAsc=[]

    const viewports = [
        { name: 'iphone-6', type: 'mobile' },
        { name: 'ipad-2', type: 'tablet' },
        { name: 'macbook-15', type: 'desktop' }
    ]

    // beforeEach(() => {
    //     homePage.visit()
    //     cy.getByData('men').click()
    //     cy.waitForLoadingToFinish()

    // })

    viewports.forEach(({ name, type }) => {
        it(`Verify products sorted by price on ${name}`, () => {

            cy.viewport(name)
            homePage.visit()
            if (type === "mobile" || type === "tablet" ){
                productsPage.showNavMenu()
            }
            cy.wait(2000)
            cy.waitForLoadingToFinish()
            
            if (type === "mobile" || type === "tablet" ){
                cy.get('aside [data-test="men"]').click()
            }else{
                cy.get('header [data-test="men"]').click()
            }

            cy.wait(2000)

            if (type === "mobile" || type === "tablet" ){
                productsPage.showFilters()
            }

            productsPage.sortProductsByPriceDesc()
            cy.wait(2000)

            cy.getPrices().then((prices) => {
                supposedToBesortedPricesDesc=prices
            })

            productsPage.verifySortedByPriceDesc().then((prices)=>{
                sortedPricesDesc=prices
            })

            productsPage.sortProductsByPriceAsc()
            cy.wait(2000)
            
            cy.getPrices().then((prices) => {
                supposedToBesortedPricesAsc=prices
            })

            productsPage.verifySortedByPriceAsc().then((prices)=>{
                sortedPricesAsc=prices
            })

            cy.then(() => {
                expect(supposedToBesortedPricesDesc).to.deep.equal(sortedPricesDesc)
                expect(supposedToBesortedPricesAsc).to.deep.equal(sortedPricesAsc)
            })
        })
    })

    it('Verify products sorted by date', () => {

    })

})