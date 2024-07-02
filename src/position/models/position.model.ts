import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { PositionName } from '../interfaces';

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

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
