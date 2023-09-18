class PaginationPage {
  getPaginationSection() {
    return cy.get(".pagination");
  }
  getNextButton() {
    return cy.get("#next2");
  }
}

export default PaginationPage;
