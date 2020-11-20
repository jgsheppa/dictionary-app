import { sumQuantityOfProducts } from '../util/testUtils';

const cart = [
  { id: 1, count: 0 },
  { id: 2, count: 2 },
  { id: 3, count: 1 },
];

const cart1 = [
  { id: 1, count: 3 },
  { id: 2, count: 4 },
  { id: 3, count: 1 },
];

const cart2 = [
  { id: 1, count: 100 },
  { id: 2, count: 25 },
  { id: 3, count: 1 },
];

test('cart sum is 3', () => {
  expect(sumQuantityOfProducts(cart)).toBe(3);
});

test('cart sum is 8', () => {
  expect(sumQuantityOfProducts(cart1)).toBe(8);
});

test('cart sum is 126', () => {
  expect(sumQuantityOfProducts(cart2)).toBe(126);
});
