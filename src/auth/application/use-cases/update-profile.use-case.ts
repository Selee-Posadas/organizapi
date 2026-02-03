import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { UpdateUserDto } from "src/auth/dto/update-user.dto";
import { User } from "src/auth/domain/entities/user.entity";

export class UpdateProfileUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(userId: string, dto: UpdateUserDto):Promise<User>{
        if(dto.email){
            const existingUser = await this.userRepository.findByEmail(dto.email);

            if(existingUser && existingUser.id !== userId){
                throw new Error('Email is already in use by another account.');
            }
        }

        const updatedUser = await this.userRepository.update(userId, {
            name: dto.name,
            email: dto.email,
            avatarId: dto.avatarId,
        });

        return updatedUser;
    
    }
}