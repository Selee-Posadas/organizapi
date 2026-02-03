import {
  Controller,
  Post,
  Body,
  ConflictException,
  UnauthorizedException,
  Get,
  Req,
  UseGuards,
  Patch
} from '@nestjs/common';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './infrastructure/guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileUseCase } from './application/use-cases/update-profile.use-case';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
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
      const { user, accessToken } = await this.loginUseCase.execute(loginUserDto);
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

 @Patch('me')
@UseGuards(AuthGuard)
async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
  try {

    const updatedUser = await this.updateProfileUseCase.execute(req.user.id, updateUserDto);


    const { passwordHash, ...safeUser } = updatedUser;
    
    return {
      message: 'Profile updated successfully',
      user: safeUser,
    };

  } catch (error) {

    if (error.message === 'Email already in use by another account') {
      throw new ConflictException(error.message);
    }

    throw error;
  }
}


  //esto es de prueba, despues borrar
  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req) {
    return {
      message: 'Esto es una prueba de perfil protegido',
      user: req.user,
    }
  }

}