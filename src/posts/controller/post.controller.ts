import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/currentUser';
import { isEmpty } from 'src/common/utils';
import { CreatePostDto } from '../dto/create_post.dto';
import { PostQueryDto } from '../dto/query.dto';
import { UpdatePostDto } from '../dto/update_post.dto';
import { PostService } from '../service/post.service';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  async post_list(@Query() query: PostQueryDto) {
    return this.postService.post_findAll(isEmpty(query) ? null : query);
  }
  @Get(':post_id')
  async post_find(@Param('post_id') post_id: string) {
    return this.postService.post_findOne(post_id);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async post_add(@CurrentUser() user, @Body() post: CreatePostDto) {
    console.log(user);
    const categories = post.categories?.map((category) => ({
      id: category,
    }));
    console.log(categories);
    return this.postService.post_add({
      ...post,
      author: { connect: { id: user.id } },
      categories: { connect: categories },
    });
  }

  @Put(':post_id')
  @UseGuards(JwtAuthGuard)
  async post_update(
    @CurrentUser() user,
    @Param('post_id') post_id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const categories = updatePostDto.categories?.map((category) => ({
      id: category,
    }));
    return await this.postService.post_update(post_id, {
      ...updatePostDto,
      categories: { set: categories },
    });
  }
  @Delete(':post_id')
  @UseGuards(JwtAuthGuard)
  async post_remove(@Param('post_id') post_id: string) {
    return await this.postService.post_delete(post_id);
  }
}
