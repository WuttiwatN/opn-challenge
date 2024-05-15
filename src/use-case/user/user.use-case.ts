import {
  ChangePasswordRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
  UpdateUserInfoRequestDto,
} from './dto/requests'
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import {
  GetUserInfoResponseDto,
  SignUpAndSignInResponseDto,
} from './dto/responses'

import { TokenPayload } from 'src/common/types/auth.type'
import { UserService } from 'src/domain/user/user.service'
import { ageFromDateOfBirthday } from 'src/common/helpers/date.helper'
import { compare } from 'src/common/helpers/encryption.helper'
import { createToken } from 'src/common/helpers/token.helper'
import { plainToClass } from 'class-transformer'

@Injectable()
export class UserUseCase {
  constructor(private userService: UserService) {}

  async signUp(dto: SignUpRequestDto): Promise<SignUpAndSignInResponseDto> {
    const { email } = dto
    const isExistingUser = this.userService.getUserByEmail(email)
    if (isExistingUser) {
      throw new ConflictException(`Email ${email} is already exist`)
    }
    const result = this.userService.createUser(dto)
    return plainToClass(SignUpAndSignInResponseDto, {
      token: createToken(result.email),
    })
  }

  async signIn(dto: SignInRequestDto): Promise<SignUpAndSignInResponseDto> {
    const { email, password } = dto
    const user = this.userService.getUserByEmail(email)
    if (!user) {
      throw new UnauthorizedException(
        'The email address or password is incorrect',
      )
    }
    const { password: currentPassword } = user
    if (!compare(password, currentPassword)) {
      throw new UnauthorizedException(
        'The email address or password is incorrect',
      )
    }
    return plainToClass(SignUpAndSignInResponseDto, {
      token: createToken(email),
    })
  }

  getUserInfo(tokenPayload: TokenPayload): GetUserInfoResponseDto {
    const { email } = tokenPayload
    const result = this.userService.getUserByEmail(email)
    return plainToClass(GetUserInfoResponseDto, {
      ...result,
      age: ageFromDateOfBirthday(result.dateOfBirth),
    })
  }

  updateUserInfo(
    tokenPayload: TokenPayload,
    dto: UpdateUserInfoRequestDto,
  ): GetUserInfoResponseDto {
    const { email } = tokenPayload
    const { dateOfBirth, gender, address, isReceiveNewsletter } = dto
    const result = this.userService.updateUserInfo(email, {
      dateOfBirth,
      gender,
      address,
      isReceiveNewsletter,
    })

    return plainToClass(GetUserInfoResponseDto, {
      ...result,
      age: ageFromDateOfBirthday(result.dateOfBirth),
    })
  }

  deleteUser(tokenPayload: TokenPayload): void {
    const { email } = tokenPayload
    this.userService.deleteUser(email)
  }

  changePassword(
    tokenPayload: TokenPayload,
    dto: ChangePasswordRequestDto,
  ): void {
    const { email } = tokenPayload
    const { password, newPassword } = dto
    this.userService.changePassword(email, password, newPassword)
  }
}
