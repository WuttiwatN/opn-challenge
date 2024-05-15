import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'

import { UserUseCase } from './user.use-case'
import {
  SignUpRequestDto,
  UpdateUserInfoRequestDto,
  ChangePasswordRequestDto,
  SignInRequestDto,
} from './dto/requests'
import {
  GetUserInfoResponseDto,
  SignUpAndSignInResponseDto,
  UpdateUserInfoResponseDto,
} from './dto/responses'
import { Public } from 'src/common/guards/auth.guard'
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user.decorator'
import { TokenPayload } from 'src/common/types/auth.type'

@Controller()
export class UserUseCaseController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() dto: SignUpRequestDto): Promise<SignUpAndSignInResponseDto> {
    return this.userUseCase.signUp(dto)
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() dto: SignInRequestDto): Promise<SignUpAndSignInResponseDto> {
    return this.userUseCase.signIn(dto)
  }

  @Get('me')
  getUserInfo(
    @AuthenticatedUser()
    tokenPayload: TokenPayload,
  ): GetUserInfoResponseDto {
    return this.userUseCase.getUserInfo(tokenPayload)
  }

  @Put('me')
  updateUserInfo(
    @AuthenticatedUser()
    tokenPayload: TokenPayload,
    @Body() dto: UpdateUserInfoRequestDto,
  ): UpdateUserInfoResponseDto {
    return this.userUseCase.updateUserInfo(tokenPayload, dto)
  }

  @Delete('me')
  deleteUser(
    @AuthenticatedUser()
    tokenPayload: TokenPayload,
  ): void {
    return this.userUseCase.deleteUser(tokenPayload)
  }

  @Put('change-password')
  changePassword(
    @AuthenticatedUser()
    tokenPayload: TokenPayload,
    @Body() dto: ChangePasswordRequestDto,
  ): void {
    return this.userUseCase.changePassword(tokenPayload, dto)
  }
}
