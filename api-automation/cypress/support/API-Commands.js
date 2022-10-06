Cypress.Commands.add('LoginToApplication',()=>{
    cy.visit('http://localhost:4200/login')
    cy.get('[placeholder="Email"]').type('artem.bondar16@gmail.com')
    cy.get('[placeholder="Password"]').type('CypressTest1')
    cy.get('form').submit()

})
Cypress.Commands.add('RequestANdResponse',()=>{
    cy.intercept('POST','https://api.realworld.io/api/articles/').as('postArticles')
    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type('This is the title'+ Math.random(2))
    cy.get('[formcontrolname="description"]').type('This is the discription')
    cy.get('[formcontrolname="body"]').type('This is the Body of the article')
    cy.contains('Publish Article').click()
    cy.wait('@postArticles')
    cy.get('@postArticles').then(xhr=>{
        console.log(xhr)
        expect(xhr.response.statusCode).to.equal(200)
        expect(xhr.request.body.article.body).to.equal('This is the Body of the article')
        expect(xhr.response.body.article.description).to.equal('This is the discription')

    })
    Cypress.Commands.add('VerifyTags',()=>{
        cy.get('.tag-list')
        .should('contain','cypress')
        .and('contain','Automation')
    })
    Cypress.Commands.add('VeryLikeCount',()=>{
        cy.intercept('GET','https://api.realworld.io/api/articles/feed*',{"articles":[],"articlesCounts":0})
        cy.intercept('GET','https://api.realworld.io/api/articles*',{fixture:'article'})
        cy.contains('Global Feed').click()
        cy.get('app-article-list button').then(heartList=>{
            expect(heartList[0]).to.contain('1')
        })

    })



})