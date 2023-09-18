class CartPage {
  getCartProductList() {
    return cy.get("#tbodyid tr");
  }

  getCartProductDeleteButton() {
    return cy.get('a[onclick^="deleteItem"]');
  }

  getCartOrderButton() {
    return cy.contains("Place Order");
  }

  getCartOrderTotal() {
    return cy.get("#totalp");
  }
}

export default CartPage;
