class LoginPage {
  getLoginUsername() {
    return cy.get("#loginusername");
  }

  getLoginPassword() {
    return cy.get("#loginpassword");
  }

  getLogInButton() {
    return cy.get(
      "#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    );
  }
}

export default LoginPage;
