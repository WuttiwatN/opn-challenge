import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { compare, encrypt } from 'src/common/helpers/encryption.helper'

import { User } from 'src/common/types/user.type'
import { mockUsersCollection } from 'src/common/mockData'

@Injectable()
export class UserService {
  getUserByEmail(email: string): User | null {
    return mockUsersCollection[email]
  }

  createUser(user: User): User | null {
    const { email, password } = user
    return (mockUsersCollection[email] = {
      ...user,
      password: encrypt(password),
    })
  }

  updateUserInfo(
    email: string,
    user: Omit<User, 'email' | 'password' | 'name'>,
  ): User | null {
    return (mockUsersCollection[email] = {
      ...mockUsersCollection[email],
      ...user,
    })
  }

  deleteUser(email: string): void {
    delete mockUsersCollection[email]
  }

  changePassword(email: string, password: string, newPassword: string): void {
    const user = mockUsersCollection[email]
    const currentPassword = user.password
    if (!compare(password, currentPassword)) {
      throw new UnprocessableEntityException('The password is incorrect')
    }
    user.password = encrypt(newPassword)
  }
}
