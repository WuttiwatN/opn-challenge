import { Gender, User } from './types/user.type'

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
