import { HomePage } from '../pages/HomePage'
import { ProductsPage } from '../pages/ProductsPage'


const productsPage = new ProductsPage()
const homePage = new HomePage()


describe('products tests', () => {

    let supposedToBesortedPricesDesc=[]
    let supposedToBesortedPricesAsc=[]
    let sortedPricesDesc=[]
    let sortedPricesAsc=[]

    beforeEach(() => {
        homePage.visit()
        cy.getByData('men').click()
        cy.waitForLoadingToFinish()

    })

    it('Verify products sorted by price', () => {
        cy.wait(2000)

        productsPage.sortProductsByPriceDesc()

        cy.getPrices().then((prices) => {
            supposedToBesortedPricesDesc=prices
        })

        productsPage.verifySortedByPriceDesc().then((prices)=>{
            sortedPricesDesc=prices
        })

        productsPage.sortProductsByPriceAsc()

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

    it('Verify products sorted by date', () => {

    })

})