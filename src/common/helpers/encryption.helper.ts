import * as bcrypt from 'bcrypt'

export function encrypt(plainText: string): string {
  return bcrypt.hashSync(plainText, bcrypt.genSaltSync(8))
}

export function compare(plainText: string, hashedText: string): boolean {
  return bcrypt.compareSync(plainText, hashedText)
}
