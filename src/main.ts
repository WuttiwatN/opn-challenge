import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { ResponseMiddleware } from './common/middlewares/response.middleware'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ResponseMiddleware())

  await app.listen(3000)
}
bootstrap()
