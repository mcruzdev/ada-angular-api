import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ToDoController } from './to-do.controller';
import { ToDo } from './to-do.entity';

@Module({
  imports: [SequelizeModule.forFeature([ToDo])],
  controllers: [ToDoController],
})
export class ToDoModule {}
