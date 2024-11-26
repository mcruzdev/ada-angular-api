import { Module } from '@nestjs/common';

import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventsModule } from './events/events.module';

import { ToDoModule } from './to-do/to-do.module';

import { SignUpController } from './sign-up/sign-up.controller';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: './ada.db',
  autoLoadModels: true,
  synchronize: false,
};

@Module({
  imports: [SequelizeModule.forRoot(dataBaseConfig), EventsModule, ToDoModule],
  controllers: [AppController, SignUpController],
  providers: [AppService],
})
export class AppModule {}
