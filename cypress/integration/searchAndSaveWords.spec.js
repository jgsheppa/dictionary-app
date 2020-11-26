describe('Search for words and save them to list', () => {
  it('Should save words and then delete them', () => {
    cy.viewport(1440, 1192);
    // Verify that the cart link works
    cy.visit('localhost:3000');

    // Click and go to login
    cy.get('[data-cy=hamburger-menu]').click();
    cy.get('[data-cy=go-to-login]').click();

    // Enter username
    cy.get('[data-cy=username]').type('yyy');
    // Enter password
    cy.get('[data-cy=password]').type('zzz');
    cy.get('[data-cy=login]').click();

    // Click to change language
    cy.get('[data-cy=change-language]').select('English - Russian');

    // Enter search term
    cy.get('[data-cy=search-for-term]').type('work');
    cy.get('[data-cy=search]').click();

    // Create list
    cy.get('[data-cy=click-on-list]').click();
    cy.get('[data-cy=enter-list-name]').type('airplane');
    cy.get('[data-cy=submit-list]').click();
    cy.get('[data-cy=close-list-box]').click();

    // Change language to German
    cy.get('[data-cy=change-language]').select('English - German');
    // Enter German search term
    cy.get('[data-cy= search-for-term]').type('work');
    cy.get('[data-cy=search]').click();

    // Add word to list
    cy.get('[data-cy=click-on-list]').click();
    cy.get('[data-cy=add-to-list]').click({ multiple: true });
    cy.get('[data-cy=close-list-box]').click();

    // Go to Profile
    cy.get('[data-cy=go-to-profile]').click({ force: true });

    // Click on edit
    cy.get('[data-cy=click-edit-list]').click();
    cy.get('[data-cy=click-delete-button]').click({ multiple: true });
    // Logout
    cy.get('[data-cy=hamburger-menu]').click();
    cy.get('[data-cy=go-to-logout]').click();
  });
});
