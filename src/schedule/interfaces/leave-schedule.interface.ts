import { Employee } from '../../employee';

export enum LeaveScheduleStatus {
  'Pending' = 1,
  'Approve' = 2,
  'Deny' = 3,
}

export enum LeaveScheduleType {
  'AnnualLeave' = 1,
  'PersonalLeave' = 2,
  'SickLeave' = 3,
  'LeaveWithOutPay' = 4,
}

export interface LeaveScheduleProps {
  employeeId: Employee;
  type: LeaveScheduleType;
  status?: LeaveScheduleStatus;
  fromDate: string;
  toDate: string;
  active?: boolean;
}
