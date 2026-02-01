import { 
  Controller, 
  Post, 
  Body, 
  ConflictException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth') 
export class AuthController {
  
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {

      const user = await this.registerUserUseCase.execute(createUserDto);

      const { passwordHash, ...safeUser } = user;


      return {
        message: 'User registered successfully',
        user: safeUser,
      };

    } catch (error) {
      if (error.message === 'User with this email already exists') {
        
        throw new ConflictException(error.message);
      }

      
      throw error;
    }
  }
}