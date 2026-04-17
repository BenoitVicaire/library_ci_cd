// Test accueil
describe("test de la fonction accueil de l'app", () => {
//test addition float
    beforeEach(() => {
        // On considère que l'app tourne sur le port par défaut de Vite
        cy.visit('127.0.0.1:8000/')
        
    });
    // Test navbar
        // Test si la navbar existe et est visible
        it("Should exist", ()=>{
            cy.get(".container nav")
            .should("exist")
            .and('be.visible')
        })
        // Test si la navbar à des liens
        it("Should have links", ()=>{
            cy.get(".container nav")
            .find("a")
            .should("exist")
        });
        // Test si les liens fonctionnent
        it("Home link work", ()=>{
            cy.get('.container nav a[href="/"]').click();
            cy.url().should("include", "/");
        });
        
});

    // Test inscription
describe("test de la fonction inscription de l'app", () => {

    beforeEach(() => {
        cy.visit('127.0.0.1:8000/register')
        cy.fixture('dataSetUser').as('userData');
    });

    //Test d'inscription d'user
    it("doit remplir les champs du formulaire avec des données provenant de la fixture", function (){
        const user = this.userData.users[0];
        
        cy.get("#firstname").type(user.firstname);
        cy.get("#lastname").type(user.lastname);
        cy.get("#email").type(user.email);
        cy.get("#password").type(user.password);
        cy.get("#confirm-password").type(user["confirm-password"]);

        cy.get("button").contains("Inscription").click()
    });
});

    // Test de connexion :
describe("Test de la fonction connexion", ()=>{
    beforeEach(() => {
        cy.visit('127.0.0.1:8000/login')
        cy.fixture('dataSetUser').as('userData');
    });

    it("Doit obtenir un message d'erreur en renseignant les mauvais credentials", function(){
        const user = this.userData.users[1];

        cy.get("#email").type(user.email);
        cy.get("#password").type(user.password);
        cy.contains("button", /se connecter/i).click();

        cy.get('article[aria-invalid="true"]').should("exist")
        
    });
    it("Doit obtenir un message de validation en renseignant les bons credentials", function(){
        const user = this.userData.users[0];

        cy.get("#email").type(user.email);
        cy.get("#password").type(user.password);
        cy.contains("button", /se connecter/i).click();

        cy.get('article[aria-invalid="true"]').should("not.exist")
        cy.get('[data-cy="success-message"]').should("be.visible");
        
    });
})

