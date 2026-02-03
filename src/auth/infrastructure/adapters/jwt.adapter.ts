import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenService } from "src/auth/domain/ports/auth-token-service.interface";
import { UserPayload } from "src/auth/domain/ports/user-payload.interface";


@Injectable()
export class JwtAdapter implements AuthTokenService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async generateToken(payload: UserPayload): Promise<string> {
        return this.jwtService.signAsync(payload);
    }
    async verifyToken(token: string): Promise<UserPayload | null> {
        try {
            return await this.jwtService.verifyAsync<UserPayload>(token);
        } catch (error) {
            return null;
        }
    }
}