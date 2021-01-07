describe('Create account and login', () => {
  it('Should change the information of the user', () => {
    cy.viewport(1440, 1192);
    // Verify that the cart link works
    cy.visit('localhost:3000');

    // Click and go to login
    cy.get('[data-cy=hamburger-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-cy=go-to-login]').click();
    cy.get('[data-cy=sign-in]', { timeout: 10000 }).should('be.visible');
    // Click and go to register
    cy.get('[data-cy=go-to-register]').should('be.visible').focus();
    cy.get('[data-cy=go-to-register]').click({ force: true }).blur();

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
    cy.get('[data-cy=register-user]').click().focus().blur();

    // Go to login
    cy.get('[data-cy=hamburger-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-cy=go-to-login]').click();
    cy.get('[data-cy=sign-in]').should('be.visible'); // Enter username

    cy.get('[data-cy=login-username]')
      .should('be.visible')
      .type('catdog')
      .blur();

    // Enter password
    cy.get('[data-cy=password]').type('dogcat', { force: true });
    cy.get('[data-cy=login]').click();

    // Go to Profile
    cy.get('[data-cy=home-page-text]').should('be.visible');
    cy.get('[data-cy=hamburger-menu]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-cy=go-to-profile]').click({ force: true });

    cy.get('[data-cy=edit-user-info]').click();

    // Edit user info
    // Edit first name
    cy.get('[data-cy=edit-user-firstname]').clear();
    cy.get('[data-cy=edit-user-firstname]').type('Jane').blur();
    // Edit last name
    cy.get('[data-cy=edit-user-lastname]').clear();
    cy.get('[data-cy=edit-user-lastname]').type('Crane').focus().blur();
    // Edit username
    cy.get('[data-cy=edit-user-username]').clear();
    cy.get('[data-cy=edit-user-username]').type('roky2').focus().blur();
    //Edit email
    cy.get('[data-cy=edit-user-email]').clear();
    cy.get('[data-cy=edit-user-email]').type('rocky1@bear.com');
    cy.get('[data-cy=submit-edits]').click();

    // Edit user info to original form
    cy.get('[data-cy=edit-user-info]').click();
    // Edit first name
    cy.get('[data-cy=edit-user-firstname]').clear();
    cy.get('[data-cy=edit-user-firstname]').type('Jake').blur();
    // Edit last name
    cy.get('[data-cy=edit-user-lastname]').clear();
    cy.get('[data-cy=edit-user-lastname]').type('Snake').focus().blur();
    // Edit username
    cy.get('[data-cy=edit-user-username]').clear();
    cy.get('[data-cy=edit-user-username]').type('yxy').focus().blur();
    //Edit email
    cy.get('[data-cy=edit-user-email]').clear();
    cy.get('[data-cy=edit-user-email]').type('JSm@catdog.com');
    cy.get('[data-cy=submit-edits]').click();

    // Click delete profile link
    cy.get('[data-cy=go-to-delete-account]').click();
    // Delete Account
    cy.get('[data-cy=delete-profile]').click();
  });
});
