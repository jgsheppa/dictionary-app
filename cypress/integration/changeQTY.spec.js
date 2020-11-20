describe('Add and remove products to and from cart', () => {
  it('Shopping page navigation works', () => {
    // Verify that the cart link works
    cy.visit('/');

    // Click to go to checkout
    cy.get('[data-cy=go-to-shop]').click();

    cy.get('[data-cy=product-list]').should('be.visible');

    // Clicks on first book
    cy.get('[data-cy=products1]').click();
    // Check that book image is visible
    cy.get('[data-cy=product-image]').should('be.visible');

    // Add book to cart
    cy.get('[data-cy=add-product-to-cart]').click();

    cy.get('[data-cy=back-to-shop]').click();
    cy.get('[data-cy=header-cart-value]').should('contain', 1);

    // Clicks on first book for second purchase
    cy.get('[data-cy=products1]').click();
    // Check that book image is visible
    cy.get('[data-cy=product-image]').should('be.visible');

    // Add book to cart for second time
    cy.get('[data-cy=add-product-to-cart]').click();
    // Go to checkout
    cy.get('[data-cy=go-to-checkout]').click();
    // Check that subtotal exists
    cy.get('[data-cy=checkout-button]').should('be.visible');
    // Cart value in header should be 2
    cy.get('[data-cy=header-cart-value]').should('contain', 2);
    // Go back to cart
    cy.get('[data-cy=go-to-cart]').click();
    // Confirm remove item button
    cy.get('[data-cy=remove-button]').should('be.visible').click();
    // Go back to shop
    cy.get('[data-cy=go-to-shop]').click();
    // Get value from cart in header

    cy.get('[data-cy=header-cart-value]').should('contain', 0);
  });
});
