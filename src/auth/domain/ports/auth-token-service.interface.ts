import { UserPayload } from "./user-payload.interface";

export interface AuthTokenService {
    generateToken(payload: UserPayload): Promise<string>;
    verifyToken(token: string): Promise<UserPayload | null>;
}