import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { AuthTokenService } from "src/auth/domain/ports/auth-token-service.interface";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject('AuthTokenService')
        private readonly authTokenService: AuthTokenService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('No token provided or invalid format');
        }

        const token = authHeader.split(' ')[1];
        try {
            const payload = await this.authTokenService.verifyToken(token);

            if (!payload) {
                throw new UnauthorizedException('Invalid token or expired token');
            }

            request['user'] = payload;
            return true;

        } catch (error) {
            throw new UnauthorizedException('Authentication failed');

        }
    }
}