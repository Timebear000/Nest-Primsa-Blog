import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { isEmpty } from 'src/common/utils';
import { CreateUserDto } from '../dto/create_user.dto';
import { UserQueryInclude } from '../dto/query.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async user_list(@Query() query: UserQueryInclude) {
    return this.userService.user_findAll(isEmpty(query) ? null : query);
  }
  @Get(':uuid')
  async user_find(@Param('uuid') uuid: string) {
    return this.userService.user_findOne(uuid);
  }
  @Post()
  async user_add(@Body() user: CreateUserDto) {
    return this.userService.user_add(user);
  }

  @Put(':uuid')
  async user_update(@Param('uuid') uuid: string, @Body() user: User) {
    return await this.userService.user_update(uuid, user);
  }
  @Delete(':uuid')
  async user_remove(@Param('uuid') uuid: string) {
    return await this.userService.user_delete(uuid);
  }
}
