import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [PrismaModule, UsersModule, CategoryModule, PostsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
