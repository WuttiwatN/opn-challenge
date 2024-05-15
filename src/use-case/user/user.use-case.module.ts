import { CartService } from 'src/domain/cart/cart.service'
import { Module } from '@nestjs/common'
import { UserModule } from 'src/domain/user/user.module'
import { UserUseCase } from './user.use-case'
import { UserUseCaseController } from './user.use-case.controller'

@Module({
  imports: [UserModule],
  controllers: [UserUseCaseController],
  providers: [UserUseCase, CartService],
})
export class UserUseCaseModule {}
