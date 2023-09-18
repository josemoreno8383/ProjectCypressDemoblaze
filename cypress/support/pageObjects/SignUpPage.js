class SignUpPage {
  getSignUpUsername() {
    return cy.get("#sign-username");
  }

  getSignUpPassword() {
    return cy.get("#sign-password");
  }

  getSignUpButton() {
    return cy.get(
      "#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    );
  }
}

export default SignUpPage;
