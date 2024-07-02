import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository, DeleteResult } from 'typeorm';
import { LeaveSchedule } from '../models';
import {
  LeaveScheduleProps,
  LeaveScheduleStatus,
  LeaveScheduleType,
} from '../interfaces';
import { EmployeeService, Employee } from '../../employee';
import { DateTime } from 'luxon';
import {
  DefaultStatus,
  FormatServiceResponse,
} from '../../common/master.interface';

@Injectable()
export class LeaveScheduleService {
  constructor(
    private dataSource: DataSource,
    @Inject('EmployeeService') private employeeService: EmployeeService,
  ) {}

  private get repo(): Repository<LeaveSchedule> {
    return this.dataSource.getRepository(LeaveSchedule);
  }

  public async getLeaveSchedules(): Promise<LeaveSchedule[]> {
    const result = await this.repo.find({
      // select: {
      //   employeeId: {
      //     id: true,
      //   },
      // },
      relations: ['employeeId'],
    });

    return result.map((item) => {
      return {
        ...item,
        type: LeaveScheduleType[item.type],
        status: LeaveScheduleStatus[item.status],
      };
    }) as any;
  }

  public async getLeaveSchedule(id: number): Promise<LeaveSchedule> {
    const leaveSchedule = await this.repo.findOne({ where: { id } });

    if (leaveSchedule == null) {
      throw new NotFoundException(null, 'LeaveSchedule Not Found');
    }

    leaveSchedule.status = LeaveScheduleStatus[leaveSchedule.status] as any;
    leaveSchedule.type = LeaveScheduleType[leaveSchedule.type] as any;
    return leaveSchedule;
  }

  public async createLeaveSchedule(
    props: LeaveScheduleProps,
  ): Promise<LeaveSchedule> {
    if (!this.validateDateTime(props)) {
      throw new BadRequestException(null, 'ValidateDateTime Failed');
    }

    const employee = await this.employeeService.getEmployeeById(
      props.employeeId as any,
    );

    if (employee == null) {
      throw new NotFoundException(null, 'Employee Not Found');
    }

    const leaveTypes = Object.values(LeaveScheduleType);

    if (!leaveTypes.includes(props.type)) {
      throw new BadRequestException(null, 'Leave Type Wrong');
    }

    if (
      this.calculateQuotaLeave(employee, props).status != DefaultStatus.SUCCESS
    ) {
      throw new BadRequestException(null, 'Leave Not Quota');
    }

    await this.employeeService.updateEmployee(
      employee.id,
      this.calculateQuotaLeave(employee, props).data,
    );
    const data = this.repo.create(props);

    return this.repo.save(data);
  }

  public async updateLeaveSchedule(
    id: number,
    props: LeaveScheduleProps,
  ): Promise<LeaveSchedule> {
    if (!this.validateDateTime(props)) {
      throw new BadRequestException(null, 'ValidateDateTime Failed');
    }

    const employee = await this.employeeService.getEmployeeById(
      props.employeeId as any,
    );

    if (employee == null) {
      throw new NotFoundException(null, 'Employee Not Found');
    }

    const leaveTypes = Object.values(LeaveScheduleType);

    if (!leaveTypes.includes(props.type)) {
      throw new BadRequestException(null, 'Leave Type Wrong');
    }

    if (
      this.calculateQuotaLeave(employee, props).status != DefaultStatus.SUCCESS
    ) {
      throw new BadRequestException(null, 'Leave Not Quota');
    }

    const leaveSchedule = await this.getLeaveSchedule(id);

    if (leaveSchedule == null) {
      throw new NotFoundException(null, 'LeaveSchedule Not Found');
    }

    await this.employeeService.updateEmployee(
      employee.id,
      this.calculateQuotaLeave(employee, props).data,
    );

    return this.repo.save({ ...leaveSchedule, ...props });
  }

  public async deleteLeaveSchedule(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }

  private calculateQuotaLeave(
    employee: Employee,
    props: LeaveScheduleProps,
  ): FormatServiceResponse<Employee> {
    const result = {
      status: DefaultStatus.FAILED,
      data: employee,
    };

    switch (props.type) {
      case LeaveScheduleType.AnnualLeave:
        if (employee.annualLeaveCount >= this.diffDateTime(props)) {
          result.status = DefaultStatus.SUCCESS;
          result.data = {
            ...employee,
            annualLeaveCount:
              employee.annualLeaveCount - this.diffDateTime(props),
          };
        }
        break;
      case LeaveScheduleType.LeaveWithOutPay:
        if (employee.leaveWithOutPay >= this.diffDateTime(props)) {
          result.status = DefaultStatus.SUCCESS;
          result.data = {
            ...employee,
            leaveWithOutPay:
              employee.leaveWithOutPay - this.diffDateTime(props),
          };
        }
        break;
      case LeaveScheduleType.PersonalLeave:
        if (employee.personalLeaveCount >= this.diffDateTime(props)) {
          result.status = DefaultStatus.SUCCESS;
          result.data = {
            ...employee,
            personalLeaveCount:
              employee.personalLeaveCount - this.diffDateTime(props),
          };
        }

        break;
      case LeaveScheduleType.SickLeave:
        console.log('SickLeave');
        if (employee.sickLeaveCount >= this.diffDateTime(props)) {
          result.status = DefaultStatus.SUCCESS;
          result.data = {
            ...employee,
            sickLeaveCount: employee.sickLeaveCount - this.diffDateTime(props),
          };
        }
        break;
      default:
        break;
    }

    return result;
  }

  private diffDateTime(props: LeaveScheduleProps) {
    const fromDateTime = DateTime.fromISO(props.fromDate, { zone: 'utc' });
    const toDateTime = DateTime.fromISO(props.toDate, { zone: 'utc' });

    return toDateTime.diff(fromDateTime, ['days']).days;
  }

  private validateDateTime(props: LeaveScheduleProps): boolean {
    const fromDateTime = DateTime.fromISO(props.fromDate, { zone: 'utc' });
    const toDateTime = DateTime.fromISO(props.toDate, { zone: 'utc' });
    const current = DateTime.utc();

    if (
      fromDateTime.toISODate() > toDateTime.toISODate() ||
      fromDateTime.toISODate() < current.toISODate() ||
      toDateTime.toISODate() < current.toISODate()
    ) {
      throw new BadRequestException(null, 'DateTime Wrong');
    }

    return true;
  }
}
