describe('Create account and login', () => {
  it('Should register and log in the user', () => {
    cy.viewport(1440, 1192);
    // Verify that the cart link works
    cy.visit('localhost:3000');

    // Click and go to login
    cy.get('[data-cy=hamburger-menu]').should('be.visible').click();
    cy.get('[data-cy=go-to-login]').click();

    // Click and go to register
    cy.get('[data-cy=go-to-register]').should('be.visible');
    cy.get('[data-cy=go-to-register]').click();

    // Enter registration information
    // Enter first name
    cy.get('[data-cy=firstname]').type('John');
    // Enter last name
    cy.get('[data-cy=lastname]').type('Smith');
    // Enter email
    cy.get('[data-cy=email]').type('JSmith@catdog.com');
    // Enter username
    cy.get('[data-cy=username]').type('catdog');
    // Enter password
    cy.get('[data-cy=password]').type('dogcat');
    // Register
    cy.get('[data-cy=register-user]').click();

    // Go to login
    cy.get('[data-cy=hamburger-menu]').should('be.visible').click();
    cy.get('[data-cy=go-to-login]').click();
    // Enter username
    cy.get('[data-cy=username]').type('catdog');
    // Enter password
    cy.get('[data-cy=password]').type('dogcat');
    cy.get('[data-cy=login]').click();

    // Go to Profile
    cy.get('[data-cy=go-to-profile]').click();

    // Click delete profile link
    cy.get('[data-cy=go-to-delete-account]').click();
    // Delete Account
    cy.get('[data-cy=delete-profile]').click();
  });
});
