import HomePage from "../support/pageObjects/HomePage";
import NavBarPage from "../support/pageObjects/NavBarPage";
import SignUpPage from "../support/pageObjects/SignUpPage";
import LoginPage from "../support/pageObjects/LoginPage";

describe("Test 1", () => {
  let username = Cypress.env("test_username");
  let password = Cypress.env("test_password");
  const homePage = new HomePage();
  const navBarPage = new NavBarPage();
  const signUpPage = new SignUpPage();
  const loginPage = new LoginPage();
  beforeEach(() => {
    cy.visit("/");
  });

  it("Try signup with same user", () => {
    cy.window().then((win) => {
      cy.stub(win, "alert").as("windowAlert");
    });
    navBarPage.getSignUpButton().click();
    cy.wait(500);
    signUpPage.getSignUpUsername().click().type(username, { delay: 50 });
    signUpPage.getSignUpPassword().click().type(password, { delay: 50 });
    signUpPage.getSignUpButton().click();
    cy.get("@windowAlert").should("be.calledWith", "This user already exist.");
  });

  it("Try to log in and log out", () => {
    navBarPage.getLogInButton().click();
    cy.wait(500);
    loginPage.getLoginUsername().click().type(username, { delay: 50 });
    loginPage.getLoginPassword().click().type(password, { delay: 50 });
    loginPage.getLogInButton().click();
    navBarPage.getAuthenticatedUserSection().should("contain", "Welcome");
    navBarPage.getAuthenticatedUserSection().should("contain", username);
    navBarPage.getLogInButton().should("not.be.visible");
    navBarPage.getLogOutButton().click();
    navBarPage.getAuthenticatedUserSection().should("not.be.visible");
    navBarPage.getLogInButton().should("be.visible");
  });

  it("Try to login with incorrect username", () => {
    cy.window().then((win) => {
      cy.stub(win, "alert").as("windowAlert");
    });

    navBarPage.getLogInButton().click();
    cy.wait(500);
    loginPage
      .getLoginUsername()
      .click()
      .type("fakeUserForWrongAuthentication", { delay: 50 });
    loginPage.getLoginPassword().click().type(password, { delay: 50 });
    loginPage.getLogInButton().click();
    cy.get("@windowAlert").should("be.calledWith", "User does not exist.");
    loginPage.getLoginUsername().should("be.visible");
    loginPage.getLoginPassword().should("be.visible");
    loginPage.getLogInButton().should("be.visible");
  });
});
