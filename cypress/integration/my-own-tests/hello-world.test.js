/// <reference types="cypress" />

describe("Basic Tests", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://codedamn.com");
  });
  it("We have correct page title", () => {
    //cy.viewport('iphone-8')
    cy.contains("Let's go!").should("exist");
    cy.get("div#root").should("exist");
    cy.get("div#noroot").should("not.exist");
    cy.get("div[id=root]").should("exist");
  });

  it("The Login Page", () => {
    cy.contains("Sign in").click();
    cy.contains("Sign in to your account").should("exist");
    cy.contains("Don't have an account?").should("exist");
    cy.contains("Create one").should("exist");
  });

  it("The Login Page Links Work", () => {
    cy.contains("Sign in").click();
    cy.log("Going to forgot your password");
    cy.contains("Forgot your password?").click({ force: true });
    cy.url().should("include", "/password-reset");
    cy.url().then((value) => {
      cy.log("The current real URL is: ", value);
    });
    cy.log("The current real URL is: ", cy.url());
    cy.contains("Reset your password").should("exist");
    cy.go("back");
    cy.contains("Create one").should("exist");
    cy.contains("Create one").click();
    cy.url().should("include", "/register");
  });

  it("Login should display correct error", () => {
    cy.contains("Sign in").click();
    cy.contains("Unable to authorize").should("not.exist");
    cy.get("[data-testid=username]").type("Lay", { force: true });
    cy.get("[data-testid=password]").type("12345", { force: true });
    cy.get('[data-testid="login"]').click({ force: true });

    cy.contains("Don't have an account? Create one").should("be.visible");
  });

  it("Login should display correct", () => {
    // TODO: Set this as localStorage token for authentication
    cy.contains("Sign in").click();
    cy.get("[data-testid=username]").type(Cypress.env("username"), {
      force: true,
    });
    cy.get("[data-testid=password]").type(Cypress.env("password"), {
      log: false,
      force: true,
    });
    cy.get('[data-testid="login"]').click();
    cy.url().should("include", "/dashboard")
    cy.contains("Good morning, Rosa.").should("be.visible")
  })
})
