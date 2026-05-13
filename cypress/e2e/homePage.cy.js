describe('Home Page', () => {
  beforeEach(() => {
    // Preserve the session to avoid logging in before each test
    cy.session('user', () => {
      cy.login('demo@cosdensolutions.io', 'cosdensolutions');
    });

    cy.visit('http://localhost:5173/');
  });

  it('renders the home page with expected elements', () => {
    cy.get('[data-testid="homepage"]').should('exist');
    cy.get('[data-testid="listing-filters"]').should('exist');
    cy.get('[data-testid="listing-list"]').should('exist');
  });
});
