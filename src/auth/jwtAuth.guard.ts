import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }


// para extraes datos del usuario a partir del jwt
handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
        throw err || new UnauthorizedException();
    }
    return user;
}
}
