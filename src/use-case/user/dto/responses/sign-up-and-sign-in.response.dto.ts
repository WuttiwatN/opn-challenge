import { Exclude, Expose } from 'class-transformer'

import { IsString } from 'class-validator'

@Exclude()
export class SignUpAndSignInResponseDto {
  @Expose()
  @IsString()
  token: string
}
