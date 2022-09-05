import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import PrismaService from 'src/prisma/service/prisma.service';
import { CreateUserDto } from '../dto/create_user.dto';
import { UserQueryInclude } from '../dto/query.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async user_add(create_data: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({ data: create_data });
  }

  async user_findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email: email },
    });
  }
  async user_findAll(query: UserQueryInclude): Promise<User[]> {
    return await this.prismaService.user.findMany({ include: query });
  }
  async user_findOne(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id: id } });
  }
  async user_update(id: string, data: User): Promise<User> {
    return await this.prismaService.user.update({
      where: { id: id },
      data: data,
    });
  }
  async user_delete(id: string): Promise<User> {
    return await this.prismaService.user.delete({ where: { id: id } });
  }
}
