import { mockUsersCollection } from '../mockData'

export function createToken(email: string): string {
  return `fake_token_${email}`
}

export function getUserIdFromToken(token: string): string | null {
  const email = token.split('fake_token_')[1]
  return mockUsersCollection[email] ? email : null
}
