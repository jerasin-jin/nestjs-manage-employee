import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Position } from '../../position';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  password: string;

  @Column({ unique: true })
  salt: string;

  @Column({ unique: true })
  code: string;

  @Column()
  startDate: string;

  @Column({ default: 0 })
  annualLeaveCount: number;

  @Column({ default: 0 })
  personalLeaveCount: number;

  @Column({ default: 30 })
  sickLeaveCount: number;

  @Column({ default: 15 })
  leaveWithOutPay: number;

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

  @ManyToOne(() => Position)
  @JoinColumn()
  position: Position;
}
