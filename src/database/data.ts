import { nanoid } from 'nanoid';

const hondaModel1SKU = nanoid();
const hondaModel2SKU = nanoid();
const toyotaModel1SKU = nanoid();

export const users = [
  {
    firstName: 'user',
    lastName: 'one',
    email: 'user@one.com',
    password: 'password',
  },
  {
    firstName: 'user',
    lastName: 'two',
    email: 'user@two.com',
    password: 'password',
  },
  {
    firstName: 'user',
    lastName: 'three',
    email: 'user@three.com',
    password: 'password',
  },
  {
    firstName: 'user',
    lastName: 'four',
    email: 'user@four.com',
    password: 'password',
  },
  {
    firstName: 'user',
    lastName: 'five',
    email: 'user@five.com',
    password: 'password',
  },
];

export const categories = [
  {
    name: 'cars', // level 1
    discount: 7.7,
  },
  {
    name: 'honda', // level 2
    parent: 1,
    discount: 3,
  },
  {
    name: 'honda-model-1', // level 3
    parent: 2,
  },
  {
    name: 'honda-model-2', // level 3
    parent: 2,
    discount: 4,
  },
  {
    name: 'toyota', // level 2
    parent: 1,
  },
  {
    name: 'toyota-model-1', // level 3
    parent: 5,
  },
];

export const products = [
  {
    name: 'Honda Model 1',
    sku: hondaModel1SKU,
    code: nanoid(),
    discount: 4.5,
    price: 100,
    category: 3 as unknown,
  },
  {
    name: 'Honda Model 2',
    sku: hondaModel2SKU,
    code: nanoid(),
    discount: 0,
    price: 120,
    category: 4 as unknown,
  },
  {
    name: 'Toyota Model 1',
    sku: toyotaModel1SKU,
    code: nanoid(),
    discount: 0,
    price: 150,
    category: 6 as unknown,
  },
];
