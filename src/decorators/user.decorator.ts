import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";
import { users } from "@prisma/client";

export const LoggedUser = createParamDecorator((data: string, context: ExecutionContext): users => {
    const request = context.switchToHttp().getRequest()
    if (!request.user) {
        throw new NotFoundException()
    }

    return request.user
})