import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Employee } from '../../employee';
import { LeaveScheduleType, LeaveScheduleStatus } from '../../schedule';

export class CreateLeaveScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: Employee;

  @IsNotEmpty()
  @IsNumber()
  type: LeaveScheduleType;

  @IsOptional()
  @IsNumber()
  status?: LeaveScheduleStatus;

  @IsNotEmpty()
  @IsString()
  fromDate: string;

  @IsNotEmpty()
  @IsString()
  toDate: string;
}

export class UpdateLeaveScheduleDto extends CreateLeaveScheduleDto {
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
