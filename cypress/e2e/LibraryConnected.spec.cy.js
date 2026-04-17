// Test de categories
describe("Test de la fonction categorie", ()=>{
    beforeEach(()=>{
        cy.visit('127.0.0.1:8000/login')
        cy.get("#email").type("jeandupont@gmail.com");
        cy.get("#password").type("1234");
        cy.contains("button", /se connecter/i).click();
        cy.visit('127.0.0.1:8000/category/all')
    });

    it("Le bouton ajouter une categorie doit exister, être visible et avoir un href", ()=>{
        cy.contains("a", /Ajouter une categorie/i)
        .should("exist")
        .and("be.visible")
        .and("have.attr", "href");
    })

})

describe("Test de la fonction ajout de categorie", ()=>{
    beforeEach(()=>{
        cy.visit('127.0.0.1:8000/login')
        cy.get("#email").type("jeandupont@gmail.com");
        cy.get("#password").type("1234");
        cy.contains("button", /se connecter/i).click();
        cy.visit('127.0.0.1:8000/category/add')
    });

    it("Doit pouvoir ajouter une catégories non existante", ()=>{
        let name="webtoon"+Date.now();
        cy.get("#name").type(name);
        cy.contains("button", /ajouter/i).click();
    });
    it("Doit display un message de validation lors de l'ajout d'une catégories non existante dans une div semantiquement correcte", ()=>{
        let name="webtoon"+Date.now();
        cy.get("#name").type(name);
        cy.contains("button", /ajouter/i).click();
        cy.get('[data-cy="success-message"]').should("be.visible");

    });

    it("Doit display un message d'erreur en créant une categorie deja existante", ()=>{
        cy.get("#name").type("manga");
        cy.contains("button", /ajouter/i).click();
        cy.get("#name").type("manga");
        cy.contains("button", /ajouter/i).click();

        cy.get('article[aria-invalid="true"]').should("exist")

    });

})