class OrderModalPage {
  getInputName() {
    return cy.get("#name");
  }

  getInputCountry() {
    return cy.get("#country");
  }

  getInputCity() {
    return cy.get("#city");
  }

  getInputCard() {
    return cy.get("#card");
  }

  getInputMonth() {
    return cy.get("#month");
  }

  getInputYear() {
    return cy.get("#year");
  }

  getButtonPurchase() {
    return cy.contains("Purchase");
  }

  getAlertConfirmationOrder() {
    return cy.get(".sweet-alert > h2");
  }

  getButtonConfirmationOrder() {
    return cy.get(".confirm");
  }
}

export default OrderModalPage;
