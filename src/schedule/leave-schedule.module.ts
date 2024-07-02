import { Module, Provider } from '@nestjs/common';
import { LeaveScheduleController } from './controllers/leave-schedule.controller';
import { LeaveScheduleService } from './services/leave-schedule.service';
import { EmployeeModule } from 'src/employee';

const leaveScheduleServiceProvider: Provider = {
  provide: 'LeaveScheduleService',
  useClass: LeaveScheduleService,
};

@Module({
  imports: [EmployeeModule],
  controllers: [LeaveScheduleController],
  providers: [leaveScheduleServiceProvider],
  exports: [leaveScheduleServiceProvider],
})
export class LeaveScheduleModule {}
