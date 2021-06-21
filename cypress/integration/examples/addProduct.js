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

describe('Tutorials Ninja Shopping', function () {

    it('Add New Product', function () {
        cy.get('[class="caption"]').contains('MacBook').click()
        cy.get('.col-sm-4 > h1').should('include.text','MacBook')
        cy.get('.list-unstyled h2').then(function(el){
            let price = el.text()
            cy.log(price)
        })
        cy.get('#input-quantity').clear().type(2)
        cy.get('#button-cart').click()
        cy.get('#cart').click()

        cy.get('.text-right .fa.fa-shopping-cart').click()

    })
})