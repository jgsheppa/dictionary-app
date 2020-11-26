import { registerUser } from '../util/database';

test('cart sum is 8', () => {
  expect(sumQuantityOfProducts(cart1)).toBe(8);
});

test('Add one to count of 0', () => {
  expect(addProductToCookieCart(cart, 1)).toContainEqual({ id: 1, count: 1 });
});

test('Add one to count of 5', () => {
  expect(addProductToCookieCart(cart1, 2)).toContainEqual({ id: 2, count: 6 });
});

test('Remove all items from Id 1', () => {
  expect(deleteProductFromCookieCart(cart, 1)).toContainEqual({
    id: 1,
    count: 0,
  });
});

test('Remove all items from Id 3', () => {
  expect(deleteProductFromCookieCart(cart2, 3)).toContainEqual({
    id: 3,
    count: 0,
  });
});
