class HomePage {
  getCategoriesList() {
    return cy.get("[onclick].list-group-item");
  }

  getItemsList() {
    return cy.get(".card > .card-block > .card-title > .hrefch");
  }
}

export default HomePage;
