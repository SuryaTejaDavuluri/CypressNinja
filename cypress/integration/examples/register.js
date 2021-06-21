/// <reference types="cypress" />

before(function () {

    cy.clearCookies()
    cy.visit('')

    let email = Cypress.env('email')
    let password = Cypress.env('password')
    cy.log(email, password)
    cy.Login(email, password)

})

describe('Tutorials Ninja Registration', function () {

    it('Register New Account', function () {

        cy.get('#logo').should('include.text','Your Store')
        cy.get('[title="My Account"]').click()
        cy.get('.dropdown-menu.dropdown-menu-right').contains('Logout').click()
        cy.get('[title="My Account"]').click()
        cy.get('.dropdown-menu.dropdown-menu-right').contains('Register').click()
        cy.get('[id="content"]').should('include.text','Register Account')
        cy.get('#input-firstname').type('Test First Name')
        cy.get('#input-lastname').type('Test Last Name')
        cy.form(9).then(function (el) {
            cy.get('#input-email').type(el + "@test.com")
        })
        cy.get('#input-telephone').type('9876543210')
        cy.get('#input-password').type('password')
        cy.get('#input-confirm').type('password')
        cy.get('[name="agree"]').check()
        cy.get('[value="Continue"]').click()
        cy.get('[id="content"]').should('include.text','Your Account Has Been Created!')
        
    })
})