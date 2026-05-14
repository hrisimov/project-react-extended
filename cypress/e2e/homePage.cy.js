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

  it('displays the correct number of initial listings', () => {
    const expectedListingsCount = 12;

    cy.get('[data-testid="listing-list"] > *').should(
      'have.length',
      expectedListingsCount,
    );
  });

  it('filters listings correctly', () => {
    cy.get('[data-testid="listing-filters"] input[name="search"]').type(
      'Paris',
    );

    cy.get('[data-testid="listing-filters-submit"]').click();

    cy.get('[data-testid="listing-list"] > *').should('have.length', 6);

    for (let i = 0; i < 16; i++) {
      cy.get('[data-testid="stepper-increment"]').click();
    }

    cy.get('[data-testid="listing-filters-submit"]').click();

    cy.get('[data-testid="listing-list"] > *').should('have.length', 1);
  });

  it('handles no results scenario', () => {
    cy.get('[data-testid="listing-filters"] input[name="search"]').type(
      'Non-existent',
    );

    cy.get('[data-testid="listing-filters-submit"]').click();

    cy.get('[data-testid="listing-list"] > *').should('have.length', 0);
    cy.contains('No listings found.').should('be.visible');
  });
});
