export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export type User = {
  email: string
  password: string
  name: string
  dateOfBirth: string
  gender: Gender
  address: string
  isReceiveNewsletter: boolean
}
