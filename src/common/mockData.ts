import { Gender, User } from './types/user.type'

import { Product } from './types/cart.type'
import { encrypt } from './helpers/encryption.helper'

export const mockUsersCollection: { [key: string]: User } = {
  ['test@gmail.com']: {
    email: 'test@gmail.com',
    password: encrypt('password'),
    name: 'test test',
    dateOfBirth: '1998-08-18',
    gender: Gender.MALE,
    address: 'address',
    isReceiveNewsletter: true,
  },
}

export const mockProductCollection: { [key: string]: Product } = {
  ['product-1']: {
    price: 100,
  },
  ['product-2']: {
    price: 200,
  },
  ['product-3']: {
    price: 300,
  },
  ['product-4']: {
    price: 400,
  },
}
