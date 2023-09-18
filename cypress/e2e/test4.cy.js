import HomePage from "../support/pageObjects/HomePage";
import PaginationPage from "../support/pageObjects/PaginationPage";

const homePage = new HomePage();
const paginationPage = new PaginationPage();
let homeProducts = [];
let subcatProducts = [];
describe("Test 4", () => {
  beforeEach(() => {
    cy.visit("/").wait(2000);
    cy.intercept("POST", "pagination").as("pagination");
    cy.intercept("POST", "bycat").as("bycat");
  });

  let saveProductsCategory = ($catArray) => {
    homePage.getItemsList().each(($items) => {
      $catArray.push($items.text());
    });
    cy.getNextDisplayProperty().then(($res) => {
      if ($res === "none") {
        cy.log("The Next button is not visible, do not continue");
      } else {
        paginationPage.getNextButton().click();
        cy.wait("@pagination");
        saveProductsCategory($catArray);
      }
    });
  };

  let validateCategory = ($catName) => {
    homePage
      .getCategoriesList()
      .contains($catName)
      .click()
      .then(() => {
        cy.wait("@bycat");
        subcatProducts = [];
      })
      .then(() => {
        saveProductsCategory(subcatProducts);
      })
      .then(() => {
        cy.wrap(subcatProducts).each(($subCatItem) => {
          expect(homeProducts).to.include($subCatItem);
        });
      });
  };

  it("Validate if the main category contains the products of the subcategories", () => {
    cy.wrap().then(() => {
      cy.log("START Home");
      saveProductsCategory(homeProducts);
    });
    homePage.getCategoriesList().each(($element) => {
      cy.log("START category :" + $element.text());
      validateCategory($element.text());
    });
  });
});
