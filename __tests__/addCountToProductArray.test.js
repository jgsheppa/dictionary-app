import { addQtyToBookInfo } from '../util/testUtils';

const testBookIds = [1, 2, 3, 4];
const testCookieIds = [1, 4];

const cookies = [
  { id: 1, count: 5 },
  { id: 2, count: 0 },
  { id: 3, count: 0 },
  { id: 4, count: 10 },
];

const products = [
  {
    first_name: 'Kobo',
    last_name: 'Abe',
    title: 'Woman in the Dunes',
    product_image: '/kobo_abe.jpg',
    price: '10.00',
    alt: 'Woman in the Dunes by Kobo Abe',
  },
  {
    first_name: 'Alan',
    last_name: 'Moore',
    title: 'Watchmen',
    product_image: '/watchmen.jpg',
    price: '22.00',
    alt: 'Watchmen by Allen Moore',
  },
  {
    first_name: 'Franz',
    last_name: 'Kafka',
    title: 'Der Prozess',
    product_image: '/Kafka_Der_Prozess_1925.jpg',
    price: '7.00',
    alt: 'Der Prozess by Franz Kafka',
  },
  {
    first_name: 'Dr.',
    last_name: 'Suess',
    title: 'The Sleep Book',
    product_image: '/sleepbook.jpg',
    price: '15.00',
    alt: 'The Sleep Book by Dr. Seuss',
  },
];

test('Add count to product array', () => {
  expect(
    addQtyToBookInfo(products, testCookieIds, testBookIds, cookies),
  ).toContainEqual({
    first_name: 'Kobo',
    last_name: 'Abe',
    title: 'Woman in the Dunes',
    product_image: '/kobo_abe.jpg',
    price: '10.00',
    alt: 'Woman in the Dunes by Kobo Abe',
    count: 5,
  });
});

test('Add count to product array', () => {
  expect(
    addQtyToBookInfo(products, testCookieIds, testBookIds, cookies),
  ).toContainEqual({
    first_name: 'Dr.',
    last_name: 'Suess',
    title: 'The Sleep Book',
    product_image: '/sleepbook.jpg',
    price: '15.00',
    alt: 'The Sleep Book by Dr. Seuss',
    count: 10,
  });
});
