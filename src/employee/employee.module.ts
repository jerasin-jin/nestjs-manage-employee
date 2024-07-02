import { Module, Provider } from '@nestjs/common';
import { EmployeeController } from './controllers';
import { EmployeeService } from './services/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './models';
import { PositionModule } from '../position';

const employeeServiceProvider: Provider = {
  provide: 'EmployeeService',
  useClass: EmployeeService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), PositionModule],
  controllers: [EmployeeController],
  providers: [employeeServiceProvider],
  exports: [employeeServiceProvider],
})
export class EmployeeModule {}
