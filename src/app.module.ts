import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Link} from "./link/link.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 9906,
      "username": "root",
      "password": "",
      "database": "TPS",
      "logging" : false,
      "entities": [__dirname + "/**/*.entity{.ts,.js}"],
      "synchronize": true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
