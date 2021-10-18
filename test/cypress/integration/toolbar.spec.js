// form_submit.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Use Parameter tb=1 and check for menu icon', () =>
{
  before(() =>
  {
    cy.intercept('http://localhost:8080', { body: { success: true } }).as('submitForm');
    cy.viewport(1024, 768);
    cy.visit('/en');
    // load job details
  });

  it('open and close drawer', () =>
  {
    cy.get('.q-drawer__content').should('not.be.visible');
    // check for menu-open icon
    cy.get('.mdi-menu-open').click();
    cy.get('.q-drawer__content').should('be.visible');
    // check for menu icon
    cy.get('.mdi-menu').click();
    cy.get('.q-drawer__content').should('not.be.visible');
    cy.contains('CROSS Solution');
  });

  it('check for Speculative Application', () =>
  {
    cy.visit('/en?tb=1');
    // check for menu-open icon
    cy.contains('Speculative Application');
  });
});
