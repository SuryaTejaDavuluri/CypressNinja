/// <reference types="cypress" />

before(function () {

    cy.clearCookies()
    cy.visit('')

    let email = Cypress.env('email')
    let password = Cypress.env('password')
    cy.log(email, password)
    cy.Login(email, password)
    cy.ClearCart()


})

// after(function(){
//     cy.clearCookie('OCSESSID')
// })

describe('Tutorials Ninja Shopping', function () {


    let products = ['MacBook', 'iPhone']
    
    for (let x of products) {

        it('Add "' + x + '"', function () {
            
            cy.get('#logo').click()
            let product = x
            this.product = product
            cy.get('[class="caption"] h4').contains(product).click()
            cy.get('.col-sm-4 > h1').should('include.text', product)
            cy.get('.list-unstyled h2').then(function (el) {
                let price = el.text()
                price = Number(price.trim().slice(1))
                this.price = price
                cy.log(this.price)
            })
            let quantity = 2
            this.quantity = quantity
            cy.get('#input-quantity').clear().type(this.quantity)
            cy.get('#button-cart').click()
            cy.clearCookie('OCSESSID')

        })
    // }

        it('View "' + x + '" Cart', function () {
        // it('View Cart', function () {    
            cy.get('#cart').click()
            cy.get('.text-right .fa.fa-shopping-cart').click()
            cy.get('.text-left a').eq(0).then(function (el) {
                let item = el.text()
                cy.log(item)
                expect(item).to.equal(this.product)

            })

            cy.get('.text-left a').eq(0).parent().next().then(function (el) {
                let item = el.text()
                cy.log(item)
                item = item.split(" ")
                item = Number(item[1])
                expect(item).to.equal(this.quantity)

            })

            cy.get('.text-left a').eq(0).parent().next().next().then(function (el) {
                let item = el.text()
                cy.log(item)
                item = item.trim().slice(1).replace(',', '')
                expect(Number(item)).to.equal(this.price * this.quantity)

            })

            // cy.wait(5000)
            // cy.get('.breadcrumb a:visible').eq(0).click()

        })
    }










})