import { Position } from '../../position';

export interface EmployeeProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  code: string;
  startDate: string;
  annualLeaveCount?: number;
  personalLeaveCount?: number;
  sickLeaveCount?: number;
  leaveWithOutPay?: number;
  active?: boolean;
  position: Position;
}
