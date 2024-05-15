import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './common/guards/auth.guard'
import { Module } from '@nestjs/common'
import { UserUseCaseModule } from './use-case/user/user.use-case.module'

@Module({
  imports: [UserUseCaseModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
