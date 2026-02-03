import { AuthTokenService } from "src/auth/domain/ports/auth-token-service.interface";
import { HashService } from "src/auth/domain/ports/hash-service.interface";
import { LoginResponse } from "src/auth/domain/ports/login-response.interface";
import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { LoginUserDto } from "src/auth/dto/login-user.dto";


export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashService: HashService,
        private readonly tokenService: AuthTokenService,
    ) { }
    async execute(dto: LoginUserDto): Promise<LoginResponse> {

        const user = await this.userRepository.findByEmail(dto.email);

        // El dummy hash previene ataques de timing
        const dummyHash = '$2b$10$Dbv7JkR9vP/A1N5vX8u.ceO2G8Y6Z5G8Y6Z5G8Y6Z5G8Y6Z5G8Y6Z';

        const passwordHashToCompare = user ? user.passwordHash : dummyHash;

        const isPasswordValid = await this.hashService.compare(dto.password, passwordHashToCompare);

        if (!user || !isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = await this.tokenService.generateToken({ Id: user.id, email: user.email });

        return{
            user,
            accessToken: token,
        };
    }
}

