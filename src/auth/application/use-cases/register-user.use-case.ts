import { User } from "src/auth/domain/entities/user.entity";
import { HashService } from "src/auth/domain/ports/hash-service.interface";
import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { CreateUserDto } from "src/auth/dto/create-user.dto";

export class RegisterUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashService: HashService,
    ) { }

    async execute(dto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(dto.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const hashedPassword = await this.hashService.hash(dto.password);

        const newUser = User.createNew(
            dto.email,
            hashedPassword,
            dto.name,
        );
        return this.userRepository.create(newUser);
    }
}