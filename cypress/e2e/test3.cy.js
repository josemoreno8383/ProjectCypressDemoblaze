import NavBarPage from "../support/pageObjects/NavBarPage";
import CartPage from "../support/pageObjects/CartPage";
import OrderModalPage from "../support/pageObjects/OrderModalPage";

const navBarPage = new NavBarPage();
const cartPage = new CartPage();
const orderModalPage = new OrderModalPage();
describe("Test 3", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("orderData").as("orderDataJson");
    cy.intercept("POST", "deleteitem").as("deleteitem");
  });

  it("Try to create an order and remove items from the cart", () => {
    let total = 0;
    cy.login();
    cy.navigateToCategoryAndSelectProduct("Phones", 0);
    cy.addToCartAndVerifyAlert();
    cy.navigateToCategoryAndSelectProduct("Phones", 1);
    cy.addToCartAndVerifyAlert();
    navBarPage.getCartButton().click();
    cy.url().should("include", "/cart");
    cartPage.getCartProductList().should("have.length", 2);
    cartPage.getCartProductDeleteButton().eq(1).click();
    cy.wait("@deleteitem");
    cartPage.getCartProductList().should("have.length", 1);
    cartPage
      .getCartOrderTotal()
      .invoke("text")
      .then(($amount) => {
        total = $amount;
      })
      .then(() => {
        cartPage.getCartOrderButton().click();
        cy.fillOrderInformation();
        cy.wait(2000);
        orderModalPage
          .getAlertConfirmationOrder()
          .contains("Thank you for your purchase!");
        cy.fixture("orderData").then((userFixture) => {
          cy.get(".sweet-alert")
            .invoke("text")
            .then(($text) => {
              expect($text).to.include("Amount: " + total + " USD");
              expect($text).to.include("Card Number: " + userFixture.card);
              expect($text).to.include("Name: " + userFixture.name);
            });
        });
        orderModalPage.getButtonConfirmationOrder().click();
        cy.url().should("include", "/index");
      });
  });
});
