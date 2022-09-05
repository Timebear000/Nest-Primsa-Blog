import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { getCurrentDate } from 'src/common/utils/time.utls';
import PrismaService from 'src/prisma/service/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}
  async post_add(create_data: Prisma.PostCreateInput): Promise<Post> {
    return await this.prismaService.post.create({
      data: { ...create_data, updatedAt: getCurrentDate(new Date()) },
    });
  }
  async post_findAll(query?: Prisma.PostInclude): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      include: query,
    });
  }
  async post_findOne(id: string): Promise<Post> {
    return await this.prismaService.post.findUnique({ where: { id: id } });
  }
  async post_update(id: string, data: Prisma.PostUpdateInput): Promise<Post> {
    return await this.prismaService.post.update({
      where: { id: id },
      data: data,
    });
  }
  async post_delete(id: string): Promise<Post> {
    return await this.prismaService.post.delete({ where: { id: id } });
  }
}
