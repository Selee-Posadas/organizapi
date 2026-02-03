import { User } from "src/auth/domain/entities/user.entity";

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
}