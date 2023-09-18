class NavBarPage {
  getSignUpButton() {
    return cy.get("#signin2");
  }

  getLogInButton() {
    return cy.get("#login2");
  }

  getAuthenticatedUserSection() {
    return cy.get("#nameofuser");
  }

  getLogOutButton() {
    return cy.get("#logout2");
  }

  getCartButton() {
    return cy.get("#cartur");
  }

  getHomeButton() {
    return cy.contains(".nav-link", "Home");
  }
}

export default NavBarPage;
