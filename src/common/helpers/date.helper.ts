import * as moment from 'moment'

export function ageFromDateOfBirthday(dateOfBirth: string): number {
  return moment().diff(dateOfBirth, 'years')
}
