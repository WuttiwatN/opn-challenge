import { ExecutionContext, createParamDecorator } from '@nestjs/common'

import { TokenPayload } from '../types/auth.type'

export const AuthenticatedUser = createParamDecorator(
  (_, ctx: ExecutionContext): TokenPayload => {
    const request = ctx.switchToHttp().getRequest()
    return request.tokenPayload
  },
)
