describe('Create account and login', () => {
  it('Should register and log in the user', () => {
    cy.viewport(1440, 1192);
    // Verify that the cart link works
    cy.visit('localhost:3000');

    // Click and go to login
    cy.get('[data-cy=hamburger-menu]').click();
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
    cy.get('[data-cy=hamburger-menu]').click();
    cy.get('[data-cy=go-to-login]').click();
    // Enter username
    cy.get('[data-cy=username]').type('catdog');
    // Enter password
    cy.get('[data-cy=password]').type('dogcat');
    cy.get('[data-cy=login]').click();

    // Go to Profile
    cy.get('[data-cy=go-to-profile]').click();

    // Log out
    cy.get('[data-cy=hamburger-menu]').click();
    cy.get('[data-cy=go-to-logout]').click();

    // // Clicks on first book
    // cy.get('[data-cy=products1]').click();
    // // Check that book image is visible
    // cy.get('[data-cy=product-image]').should('be.visible');

    // // Add book to cart
    // cy.get('[data-cy=add-product-to-cart]').click();

    // cy.get('[data-cy=back-to-shop]').click();
    // cy.get('[data-cy=header-cart-value]').should('contain', 1);

    // // Clicks on first book for second purchase
    // cy.get('[data-cy=products1]').click();
    // // Check that book image is visible
    // cy.get('[data-cy=product-image]').should('be.visible');

    // // Add book to cart for second time
    // cy.get('[data-cy=add-product-to-cart]').click();
    // // Go to checkout
    // cy.get('[data-cy=go-to-checkout]').click();
    // // Check that subtotal exists
    // cy.get('[data-cy=checkout-button]').should('be.visible');
    // // Cart value in header should be 2
    // cy.get('[data-cy=header-cart-value]').should('contain', 2);
    // // Go back to cart
    // cy.get('[data-cy=go-to-cart]').click();
    // // Confirm remove item button
    // cy.get('[data-cy=remove-button]').should('be.visible').click();
    // // Go back to shop
    // cy.get('[data-cy=go-to-shop]').click();
    // // Get value from cart in header

    // cy.get('[data-cy=header-cart-value]').should('contain', 0);
  });
});
