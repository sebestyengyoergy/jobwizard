// form_submit.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Filling and sending the form', () =>
{
  before(() =>
  {
    cy.intercept('http://localhost:8080', { body: { success: true } }).as('submitForm');
    cy.viewport(1024, 768);
    cy.request('/de');
    // load job details
  });

  it('Step 1. Fill job_title, organization', () =>
  {
    // fill step 1 (general data)
    cy.get('[name="job_title"]').type('Software Developer');
    cy.get('[name="organization"]').type('CROSS Solution');
    cy.get('[name="next"]').click();
  });

  it('Step 2. Fill text fields', () =>
  {
    // fill step 2 (cover letter)
    cy.get('[name="intro"]').type('My cover letter');
    cy.get('[name="tasks"]').type('My cover letter');
    cy.get('[name="next"]').click();
  });

  it('Step 3. fill categories', () =>
  {
    cy.get('[name="next"]').click();
  });

  it('Step 4. Download', () =>
  {
    cy.intercept('http://localhost:8080', { body: { success: true } }).as('submitForm');
    // fill step 5 (privacy)
    cy.get('[name="copy"]').parents('.q-checkbox').click();
    cy.get('[name="terms"]').parent().click();
    // submit form
    cy.get('[name="next"]').click();
    cy.wait('@submitForm');
    cy.get('.form_submit_success');
  });
});
