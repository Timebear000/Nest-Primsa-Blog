import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import PrismaService from 'src/prisma/service/prisma.service';
import { CreateCategoryDto } from '../dto/create_category.dto';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  async category_add(create_data: CreateCategoryDto): Promise<Category> {
    return await this.prismaService.category.create({ data: create_data });
  }
  async category_findAll(query: Prisma.CategoryInclude): Promise<Category[]> {
    return await this.prismaService.category.findMany({ include: query });
  }
  async category_findOne(id: string): Promise<Category> {
    return await this.prismaService.category.findUnique({ where: { id: id } });
  }
  async category_update(id: string, data: Category): Promise<Category> {
    return await this.prismaService.category.update({
      where: { id: id },
      data: data,
    });
  }
  async category_delete(id: string): Promise<Category> {
    return await this.prismaService.category.delete({ where: { id: id } });
  }
}
