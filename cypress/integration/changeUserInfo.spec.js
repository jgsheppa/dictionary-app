describe('Create account and login', () => {
  it('Should register and log in the user', () => {
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

    // Go to Profile
    // cy.get('[data-cy=hamburger-menu]').click();
    cy.get('[data-cy=go-to-profile]').click();

    cy.get('[data-cy=edit-user-info]').click();

    // Edit user info
    // Edit first name
    cy.get('[data-cy=edit-user-firstname]').clear();
    cy.get('[data-cy=edit-user-firstname]').type('Jane');
    // Edit last name
    cy.get('[data-cy=edit-user-lastname]').clear();
    cy.get('[data-cy=edit-user-lastname]').type('Crane');
    // Edit username
    cy.get('[data-cy=edit-user-username]').clear();
    cy.get('[data-cy=edit-user-username]').type('rocky');
    //Edit email
    cy.get('[data-cy=edit-user-email]').clear();
    cy.get('[data-cy=edit-user-email]').type('rocky@bear.com');
    cy.get('[data-cy=submit-edits]').click();

    // Edit user info to original form
    cy.get('[data-cy=edit-user-info]').click();
    // Edit first name
    cy.get('[data-cy=edit-user-firstname]').clear();
    cy.get('[data-cy=edit-user-firstname]').type('Jake');
    // Edit last name
    cy.get('[data-cy=edit-user-lastname]').clear();
    cy.get('[data-cy=edit-user-lastname]').type('Snake');
    // Edit username
    cy.get('[data-cy=edit-user-username]').clear();
    cy.get('[data-cy=edit-user-username]').type('yyy');
    //Edit email
    cy.get('[data-cy=edit-user-email]').clear();
    cy.get('[data-cy=edit-user-email]').type('Jsnake@smith.com');
    cy.get('[data-cy=submit-edits]').click();
    // Logout
    cy.get('[data-cy=hamburger-menu]').click();
    cy.get('[data-cy=go-to-logout]').click();
  });
});
