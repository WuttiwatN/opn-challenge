import { Exclude, Expose } from 'class-transformer'
import { IsEnum, IsString } from 'class-validator'

import { Gender } from 'src/common/types/user.type'

@Exclude()
export class UpdateUserInfoResponseDto {
  @Expose()
  @IsString()
  age: number

  @Expose()
  @IsEnum(Gender)
  gender: Gender

  @Expose()
  @IsString()
  address: string

  @Expose()
  @IsString()
  isReceiveNewsletter: boolean
}
