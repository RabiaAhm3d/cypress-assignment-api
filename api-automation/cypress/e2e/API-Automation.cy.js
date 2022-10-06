
describe ('API Automation',()=>{
    beforeEach('Login to the app',()=>{
        cy.intercept('GET','https://api.realworld.io/api/tags', {fixture: 'tags'})
        cy.LoginToApplication()
    })
    it('Should login ',()=>{
        cy.log('It worked');
    })
    it('Verify Request and response',()=>{
        cy.RequestANdResponse()
    })
    it('verify Tags are displayed',()=>{
        cy.log('we logged in')
        cy.VerifyTags()
    })
    it('verify Likes Count',()=>{
        cy.VeryLikeCount()

    })

    
    })