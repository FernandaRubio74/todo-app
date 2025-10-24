import { Injectable, ExecutionContext, UnauthorizedException, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(JwtAuthGuard.name);

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        this.logger.debug(`Auth header: ${request.headers.authorization}`);
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
