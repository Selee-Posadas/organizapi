import {
  Controller,
  Post,
  Body,
  ConflictException,
  UnauthorizedException
} from '@nestjs/common';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) { }

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

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const {user, accessToken} = await this.loginUseCase.execute(loginUserDto);
      const { passwordHash, ...safeUser } = user;

      return {
        message: 'Login successful',
        user: safeUser,
        token: accessToken,
      };
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        throw new UnauthorizedException(error.message);
      } else {
        throw error;
      }

    }
  }
}