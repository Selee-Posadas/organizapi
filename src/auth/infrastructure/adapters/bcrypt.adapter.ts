import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { HashService } from "src/auth/domain/ports/hash-service.interface";

@Injectable()
export class BcryptAdapter implements HashService {
    private readonly saltRounds = 10;

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}