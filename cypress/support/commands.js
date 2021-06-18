// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('form', function (size) {
    // fill-out form
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return makeid(size)

})


Cypress.Commands.add('Login', function (email, password) {

    cy.get('#logo').should('include.text','Your Store')
    cy.get('[title="My Account"]').click()
    cy.get('.dropdown-menu.dropdown-menu-right').contains('Login').click()
    cy.get('[class="well"]').contains('Returning Customer').should('include.text','Returning Customer')
    
    cy.get('#input-email').type(email)
    cy.get('#input-password').type(password)
    cy.get('[value="Login"]').click()
    cy.get('[id="content"]').should('include.text','My Account')


})