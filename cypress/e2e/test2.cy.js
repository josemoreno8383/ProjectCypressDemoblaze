import NavBarPage from "../support/pageObjects/NavBarPage";
import CartPage from "../support/pageObjects/CartPage";
import OrderModalPage from "../support/pageObjects/OrderModalPage";

const navBarPage = new NavBarPage();
const cartPage = new CartPage();
const orderModalPage = new OrderModalPage();

describe("Test 2", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.intercept("POST", "deleteitem").as("deleteitem");
  });

  it("try to add and remove from cart", () => {
    cy.navigateToCategoryAndSelectProduct("Phones", 1);
    cy.addToCartAndVerifyAlert();
    cy.navigateToCategoryAndSelectProduct("Phones", 2);
    cy.addToCartAndVerifyAlert();
    navBarPage.getCartButton().click();
    cartPage.getCartProductList().should("have.length", 2);
    cartPage.getCartProductDeleteButton().eq(1).click();
    cy.wait("@deleteitem");
    cartPage.getCartProductList().should("have.length", 1);
    cartPage.getCartOrderButton().click();
    cy.fillOrderInformation();
    cy.wait(2000);
    orderModalPage
      .getAlertConfirmationOrder()
      .contains("Thank you for your purchase!");
    orderModalPage.getButtonConfirmationOrder().click();
  });
});
