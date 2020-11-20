describe('Test checkout flow', () => {
  it('Cart navigation works', () => {
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

    // Click to go to checkout
    cy.get('[data-cy=go-to-checkout]').click();
    // Type in first name
    cy.get('[data-cy=firstname]').type('John');
    // Type last name
    cy.get('[data-cy=lastname]').type('Doe');
    // Type street address
    cy.get('[data-cy=streetaddress]').type('1010 Computer St.');
    // Enter apartment number
    cy.get('[data-cy=aptnumber]').type('22');
    // Enter city
    cy.get('[data-cy=city]').type('Moon City');
    // Enter state
    cy.get('[data-cy=state]').type('Moonland');
    // Enter country
    cy.get('[data-cy=country]').type('Moontopia');
    // Enter zipcode
    cy.get('[data-cy=zipcode]').type('101010');
    // Enter e-mail
    cy.get('[data-cy=email]').type('johndoe@moon.space');
    // Enter cardholder
    cy.get('[data-cy=cardholder]').type('John Doe');
    // Enter card number
    cy.get('[data-cy=cardnumber]').type('1111222233334444');
    // Enter expiration month
    cy.get('[data-cy=mm]').type('10');
    // Enter expiration year
    cy.get('[data-cy=yy]').type('22');
    // Enter security number
    cy.get('[data-cy=securitynumber]').type('789');
    // Go to thank you page
    cy.get('[data-cy=go-to-thank-you-page]').click();
  });
});
