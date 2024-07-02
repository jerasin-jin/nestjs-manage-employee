import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeModule } from 'src/employee';
import { JwtStrategy } from '../guard';
import { configService } from '../config/config.module';

@Module({
  imports: [
    EmployeeModule,
    JwtModule.register({
      secret: configService.jwt_secret,
      signOptions: { expiresIn: configService.expire_in },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
