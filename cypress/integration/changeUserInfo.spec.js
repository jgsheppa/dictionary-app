describe('Create account and login', () => {
  it('Should register and log in the user', () => {
    cy.viewport(1440, 1192);
    // Verify that the cart link works
    cy.visit('localhost:3000');

    // Click and go to login
    cy.get('[data-cy=hamburger-menu]').click();
    cy.get('[data-cy=go-to-login]').click();

    // Enter username
    cy.get('[data-cy=username]').type('aaa');
    // Enter password
    cy.get('[data-cy=password]').type('bbb');
    cy.get('[data-cy=login]').click();

    // Go to Profile
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
    cy.get('[data-cy=edit-user-username]').type('bearmanpig');
    //Edit email
    cy.get('[data-cy=edit-user-email]').clear();
    cy.get('[data-cy=edit-user-email]').type('bearmanpig@bear.com');
    cy.get('[data-cy=submit-edits]').click();

    // Edit user info to original form
    cy.get('[data-cy=edit-user-info]').click();
    // Edit first name
    cy.get('[data-cy=edit-user-firstname]').clear();
    cy.get('[data-cy=edit-user-firstname]').type('John');
    // Edit last name
    cy.get('[data-cy=edit-user-lastname]').clear();
    cy.get('[data-cy=edit-user-lastname]').type('Smith');
    // Edit username
    cy.get('[data-cy=edit-user-username]').clear();
    cy.get('[data-cy=edit-user-username]').type('aaa');
    //Edit email
    cy.get('[data-cy=edit-user-email]').clear();
    cy.get('[data-cy=edit-user-email]').type('Jsmith@smith.com');
    cy.get('[data-cy=submit-edits]').click();
    // Logout
    cy.get('[data-cy=hamburger-menu]').click();
    cy.get('[data-cy=go-to-logout]').click();
  });
});
