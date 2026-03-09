import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/auth/domain/entities/user.entity';
import type { HashService } from 'src/auth/domain/ports/hash-service.interface';
import type { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('HashService')
    private readonly hashService: HashService,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const hashedPassword = await this.hashService.hash(dto.password);

    const newUser = User.createNew(dto.email, hashedPassword, dto.name);
    return this.userRepository.create(newUser);
  }
}
