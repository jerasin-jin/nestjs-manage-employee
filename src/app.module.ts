import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule, Employee } from './employee';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { LeaveScheduleModule, LeaveSchedule } from './schedule';
import { PositionModule, Position } from './position';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'api',
      password: '123456',
      database: 'api',
      entities: [Employee, Position, LeaveSchedule],
      synchronize: true,
    }),
    PositionModule,
    EmployeeModule,
    AuthModule,
    ConfigModule,
    LeaveScheduleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
