import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employee } from '../../employee';
import { LeaveScheduleStatus, LeaveScheduleType } from '../interfaces';

@Entity('leaveSchedule')
export class LeaveSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, { nullable: false })
  employeeId: Employee;

  @Column({ nullable: false })
  type: LeaveScheduleType;

  @Column({ default: LeaveScheduleStatus.Pending })
  status: LeaveScheduleStatus;

  @Column({ nullable: false })
  fromDate: string;

  @Column({ nullable: false })
  toDate: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt: string;

  @Column({
    nullable: true,
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedAt?: string;

  @Column({ default: true })
  active: boolean;
}
