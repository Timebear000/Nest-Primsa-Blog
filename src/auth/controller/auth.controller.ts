import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../../users/dto/create_user.dto';
import { LocalAuthGuard } from '../guards/local-auth.gurad';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/currentUser';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return {
      user: req.user,
      accessToken: await this.authService.sign(req.user),
    };
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@CurrentUser() user) {
    return user;
  }
  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    const newUser = await this.authService.registerUser(createUser);
    return {
      user: newUser,
      accessToken: this.authService.sign(newUser),
    };
  }
}
