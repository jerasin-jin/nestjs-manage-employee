import { Module, Provider } from '@nestjs/common';
import { PositionService } from './services/position.service';
import { PositionController } from './controllers/position.controller';
import { Position } from './models';
import { TypeOrmModule } from '@nestjs/typeorm';

const positionServiceProvider: Provider = {
  provide: 'PositionService',
  useClass: PositionService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  providers: [positionServiceProvider],
  controllers: [PositionController],
  exports: [positionServiceProvider],
})
export class PositionModule {}
