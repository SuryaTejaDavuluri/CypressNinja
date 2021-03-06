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

after(function(){
    cy.clearCookie('OCSESSID')
})

describe('Tutorials Ninja Shopping', function () {


    let gadget = "MP3"
    let products = ['iPod Classic','iPod Touch']

    for (let x of products) {


    it('Browse Product', function () {

        cy.get('#logo').click()

        
        if (gadget == 'Desktops' || gadget == 'Components') {
            cy.get('.nav.navbar-nav .dropdown .dropdown-toggle').each(function (el, index, $list) {

                let product = $list.eq(index).text()
                cy.log(product)
                if (product.includes(gadget)) {
                    cy.wrap(el).click()
                    if (product == 'Desktops') {
                        cy.get('.dropdown.open').find('.list-unstyled a').each(function (el1, index1, $list1) {
                            let item = $list1.eq(index1).text()
                            cy.log(item)
                            if (item.includes('Mac')) {
                                cy.wrap(el1).click()
                            }
                        })
                    }
                    else {
                        cy.get('.dropdown.open').find('.list-unstyled a').each(function (el1, index1, $list1) {
                            let item = $list1.eq(index1).text()
                            cy.log(item)
                            if (item.includes('Monitors')) {
                                cy.wrap(el1).click()
                            }
                        })
                    }
                }
            })

        }
        else if (gadget == 'Laptop' || gadget == 'MP3') {
            cy.get('.nav.navbar-nav .dropdown .dropdown-toggle').each(function (el, index, $list) {

                let product = $list.eq(index).text()
                cy.log(product)
                if (product.includes(gadget)) {
                    cy.wrap(el).click()
                    cy.get('.dropdown.open').find('.see-all').click()

                }
            })


        }

        else if (gadget == 'Cameras') {
            cy.get(':nth-child(7) > a').click()
        }
        else {
            cy.get('.nav.navbar-nav li a').contains(gadget).click({ force: true })
        }

    })


    

    // for (let x of products) {

        it('Add "' + x + '"', function () {
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
           

            cy.get('#logo').click()

        })






    }

    it('Checkout', function () {
        cy.get('.pull-right').contains('Checkout').click()
        cy.get('#content h1').should('include.text','Checkout')
        cy.get('#button-payment-address').click()
        cy.get('#button-shipping-address').click()
        cy.get('#button-shipping-method').click()
        cy.get('[name="agree"]').check()
        cy.get('#button-payment-method').click()
        // cy.get('#button-confirm').click()
    })


})