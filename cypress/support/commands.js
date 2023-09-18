import LoginPage from "../support/pageObjects/LoginPage";
import NavBarPage from "../support/pageObjects/NavBarPage";
import HomePage from "../support/pageObjects/HomePage";
import ProductDeatilPage from "../support/pageObjects/ProductDeatilPage";
import OrderModalPage from "../support/pageObjects/OrderModalPage";

const loginPage = new LoginPage();
const navBarPage = new NavBarPage();
const homePage = new HomePage();
const productDeatilPage = new ProductDeatilPage();
const orderModalPage = new OrderModalPage();

let username = Cypress.env("test_username");
let password = Cypress.env("test_password");

Cypress.Commands.add("login", () => {
    navBarPage.getLogInButton().click();
    cy.wait(500);
    loginPage.getLoginUsername().click().type(username, { delay: 50 });
    loginPage.getLoginPassword().click().type(password, { delay: 50 });
    loginPage.getLogInButton().click();
    navBarPage.getAuthenticatedUserSection().should("contain", "Welcome");
    navBarPage.getAuthenticatedUserSection().should("contain", username);
  });
  

Cypress.Commands.add("addToCartAndVerifyAlert", () => {
    productDeatilPage.getAddToCartButton().should("exist").click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Product added.");
    });
  });

  
Cypress.Commands.add(
    "navigateToCategoryAndSelectProduct",
    (categoryName, positionOfproduct) => {
      navBarPage.getHomeButton().click();
      homePage.getCategoriesList().contains(categoryName).click();
      homePage.getItemsList().eq(positionOfproduct).click();
      cy.url().should("include", "/prod");
    }
  );


  Cypress.Commands.add("fillOrderInformation", () => {
    cy.fixture("orderData").then((userFixture) => {
      cy.wait(1000);
      orderModalPage
        .getInputName()
        .should("exist")
        .should("be.visible")
        .type(userFixture.name, { delay: 240 });
      orderModalPage
        .getInputCountry()
        .should("exist")
        .should("be.visible")
        .type(userFixture.country, { delay: 50 });
      orderModalPage
        .getInputCity()
        .should("exist")
        .should("be.visible")
        .type(userFixture.city, { delay: 50 });
      orderModalPage
        .getInputCard()
        .should("exist")
        .should("be.visible")
        .type(userFixture.card, { delay: 50 });
      orderModalPage
        .getInputMonth()
        .should("exist")
        .should("be.visible")
        .type(userFixture.month, { delay: 50 });
      orderModalPage
        .getInputYear()
        .should("exist")
        .should("be.visible")
        .type(userFixture.year, { delay: 50 });
    });
    orderModalPage.getButtonPurchase().click();
  });


  Cypress.Commands.add("getNextDisplayProperty", () => {
    /**Return "none" when the button Next is not visible
     * Return "block" when the button Next is visible
     */
    const displayPropertyValue = Cypress.$("#next2").css("display");
    return displayPropertyValue;
  });