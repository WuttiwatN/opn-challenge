import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator'

import { Gender } from 'src/common/types/user.type'

export class SignUpRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender

  @IsString()
  @IsNotEmpty()
  address: string

  @IsBoolean()
  @IsNotEmpty()
  isReceiveNewsletter: boolean
}
