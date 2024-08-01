import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryDbService } from './categoryDb.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryDbService],
  exports: [CategoryDbService, TypeOrmModule.forFeature([Category])]
})

export class CategoryModule {}
