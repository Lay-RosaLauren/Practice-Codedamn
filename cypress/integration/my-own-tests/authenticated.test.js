/// <reference types="cypress" />

const token = Cypress.env('token')
  

describe("Basic Authenticated Desktop Tests", () => {
  before(() => {
    cy.then(() => {
      window.localStorage.setItem("_auth_token", token);
    });
  });

  beforeEach(() => {
    // bootstrapping external things
    cy.viewport(1280, 720);
    cy.visit("https://codedamn.com");
  });

  it("Should pass", () => {
    cy.visit("https://codedamn.com/playground/QaGtEXr7PAoEVbUt_grry");
    cy.get("div");
    cy.log("Edit src/App.jsx and save to reload!");
    cy.log("CODE");
    cy.contains("Browser Logs").should("be.visible");
    cy.contains("Terminal").should("be.visible");
    cy.contains('index.jsx').click();
    cy.contains("React").should("exist")

    const fileName = Math.random().toString().slice(0, 3)
    cy.get('[data-testid=xterm]')
      .type('{ctrl}{c}')
      .type(`touch index.${fileName}.js{enter}`)
    cy.contains(`index.${fileName}.js`).rightclick()
    cy.contains('Delete File').click()
    cy.contains('Do you really want to delete this file?').should('exist')
    cy.get('.grid > .bg-indigo-600').click().and('not.exist')
  });
});
