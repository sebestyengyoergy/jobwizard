// form_submit.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('check apply_url, apply_email and apply_post', () =>
{
  before(() =>
  {
    cy.intercept('http://localhost:8080', { body: { success: true } }).as('submitForm');
    cy.visit('/en');
    // load job details
  });

  it('Step 1. apply by email', () =>
  {
    cy.get('input[name="apply_url"]').type('http://cross-solution.de');
    cy.get('input[name="apply_email"]').type('bleek@cross-solution.de');
    cy.get('input[name="apply_url"]').should('be.enabled');
    cy.get('input[name="apply_post"]').get('svg').click();
    cy.get('input[name="apply_url"]').should('be.disabled');

    cy.get('button[name="preview"]').then(($btn) => {
      cy.wrap($btn).click();
    });

    cy.get('iframe#jobpreview').invoke('attr', 'srcdoc').then( ($job) => {
      cy.state('document').write($job)
      cy.contains('Apply by regular post');
      return null
    })

  });

});
