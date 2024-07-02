import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Position } from '../../position';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsNumber()
  annualLeaveCount?: number;

  @IsOptional()
  @IsNumber()
  personalLeaveCount?: number;

  @IsOptional()
  @IsNumber()
  sickLeaveCount?: number;

  @IsOptional()
  @IsNumber()
  leaveWithOutPay?: number;

  @IsNotEmpty()
  @IsNumber()
  position: Position;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
