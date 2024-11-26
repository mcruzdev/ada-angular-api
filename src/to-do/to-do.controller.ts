import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { ToDo } from './to-do.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('to-do')
export class ToDoController {
  constructor(
    @InjectModel(ToDo)
    private readonly toDoRepository: typeof ToDo,
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() req: CreateTodoRequest) {
    const possibleToDo = await this.toDoRepository.findOne({
      where: {
        title: req.title,
      },
    });

    if (possibleToDo) {
      return res.status(HttpStatus.CONFLICT).json({
        title: 'Conflict',
        message:
          'A to-do item with this title already exists. Please choose a different title.',
      });
    }

    const todo = {
      id: randomUUID().toString(),
      title: req.title,
      completed: false,
    };

    await this.toDoRepository.create(todo);

    return res.status(HttpStatus.OK).json(todo);
  }

  @Get()
  async findAll(@Query() queryParams: any) {
    let query = {};
    if (queryParams.only == 'completed') {
      query = { completed: true };
    } else if (queryParams.only == 'not-completed') {
      query = { completed: false };
    }

    return this.toDoRepository.findAll({
      where: { ...query },
    });
  }

  @Patch(':id')
  async complete(
    @Res() res: Response,
    @Param() params: any,
    @Body() req: UpdateStatusRequest,
  ) {
    if (!params.id) {
      return res.status(HttpStatus.NOT_FOUND).json({
        title: 'Not Found',
        message: 'Are you ok?',
      });
    }

    await this.toDoRepository.update(
      {
        completed: req.status,
      },
      {
        where: {
          id: params.id,
        },
        returning: true,
      },
    );

    return res.status(HttpStatus.OK).json(
      await this.toDoRepository.findOne({
        where: {
          id: params.id,
        },
      }),
    );
  }
}

interface CreateTodoRequest {
  title: string;
}

interface UpdateStatusRequest {
  status: boolean;
}
