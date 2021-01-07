describe('Create account and login', () => {
  it('Should register and log in the user', () => {
    cy.viewport(1440, 1192);
    // Verify that the cart link works
    cy.visit('localhost:3000');

    // Click and go to login
    cy.get('[data-cy=hamburger-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-cy=go-to-login]').click();
    // cy.get('[data-cy=sign-in]', { timeout: 10000 }).should('be.visible');
    // Click and go to register
    cy.get('[data-cy=go-to-register]').should('be.visible');
    cy.get('[data-cy=go-to-register]').click({ force: true });

    // Enter registration information
    // Enter first name
    cy.get('[data-cy=firstname]').type('John').blur();
    // Enter last name
    cy.get('[data-cy=lastname]').type('Smith').focus().blur();
    // Enter email
    cy.get('[data-cy=email]').type('JSmith@catdog.com').focus().blur();
    // Enter username
    cy.get('[data-cy=username]').type('catdog').focus().blur();
    // Enter password
    cy.get('[data-cy=password]').type('dogcat').focus().blur();
    // Register
    cy.get('[data-cy=register-user]').click();

    // Go to login
    cy.get('[data-cy=hamburger-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-cy=go-to-login]').should('be.visible').click({ force: true });
    // cy.get('[data-cy=sign-in]', { timeout: 10000 }).should('be.visible');
    // Enter username
    cy.get('[data-cy=login-username]').type('catdog').blur();
    // Enter password
    cy.get('[data-cy=password]').type('dogcat', { force: true }).focus().blur();
    cy.get('[data-cy=login]').click({ force: true });

    // Go to Profile
    cy.get('[data-cy=home-page-text]').should('be.visible');
    cy.get('[data-cy=hamburger-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-cy=go-to-profile]').click({ force: true });

    // Click delete profile link
    cy.get('[data-cy=go-to-delete-account]').click({ force: true });
    // Delete Account
    cy.get('[data-cy=delete-profile]').click();
  });
});
