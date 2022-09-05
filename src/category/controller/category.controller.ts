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
import { Category } from '@prisma/client';
import { isEmpty } from 'src/common/utils';
import { CreateCategoryDto } from '../dto/create_category.dto';
import { CategoryQueryDto } from '../dto/query.dto';
import { CategoryService } from '../service/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async category_list(@Query() query: CategoryQueryDto) {
    return this.categoryService.category_findAll(isEmpty(query) ? null : query);
  }
  @Get(':category_id')
  async category_find(@Param('category_id') category_id: string) {
    return this.categoryService.category_findOne(category_id);
  }
  @Post()
  async category_add(@Body() category: CreateCategoryDto) {
    return this.categoryService.category_add(category);
  }

  @Put(':category_id')
  async category_update(
    @Param('category_id') category_id: string,
    @Body() category: Category,
  ) {
    return await this.categoryService.category_update(category_id, category);
  }
  @Delete(':category_id')
  async category_remove(@Param('category_id') category_id: string) {
    return await this.categoryService.category_delete(category_id);
  }
}
