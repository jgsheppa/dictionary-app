import {
  addProductToCookieCart,
  deleteProductFromCookieCart,
} from '../util/testUtils';

const cart = [
  { id: 1, count: 0 },
  { id: 2, count: 5 },
  { id: 3, count: 10 },
];

const cart1 = [
  { id: 1, count: 0 },
  { id: 2, count: 5 },
  { id: 3, count: 10 },
];

const cart2 = [
  { id: 1, count: 0 },
  { id: 2, count: 5 },
  { id: 3, count: 10 },
];

test('Add one to count of 0', () => {
  expect(addProductToCookieCart(cart, 1)).toContainEqual({ id: 1, count: 1 });
});

test('Add one to count of 5', () => {
  expect(addProductToCookieCart(cart1, 2)).toContainEqual({ id: 2, count: 6 });
});

test('Add one to count of 10', () => {
  expect(addProductToCookieCart(cart2, 3)).toContainEqual({ id: 3, count: 11 });
});

test('Remove all items from Id 1', () => {
  expect(deleteProductFromCookieCart(cart, 1)).toContainEqual({
    id: 1,
    count: 0,
  });
});

test('Remove all items from Id 2', () => {
  expect(deleteProductFromCookieCart(cart1, 2)).toContainEqual({
    id: 2,
    count: 0,
  });
});

test('Remove all items from Id 3', () => {
  expect(deleteProductFromCookieCart(cart2, 3)).toContainEqual({
    id: 3,
    count: 0,
  });
});
