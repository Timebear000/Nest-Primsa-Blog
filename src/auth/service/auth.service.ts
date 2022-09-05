import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/users/service/user.service';
import { CreateUserDto } from '../../users/dto/create_user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async valdiateUser(email: string, password: string) {
    const user = await this.userService.user_findOneByEmail(email);
    if (!user || user.password != password) return false;
    return user;
  }
  async registerUser(createUser: CreateUserDto) {
    return await this.userService.user_add(createUser);
  }

  sign(user: User) {
    return this.jwtService.sign({ id: user.id, sub: user.email });
  }

  async get_user(id: string) {
    return await this.userService.user_findOne(id);
  }
}
