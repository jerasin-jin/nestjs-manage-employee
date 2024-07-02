import {
  Injectable,
  Inject,
  BadRequestException,
  OnModuleInit,
} from '@nestjs/common';
import { DataSource, Repository, DeleteResult } from 'typeorm';
import { Employee } from '../models';
import { EmployeeProps } from '../interfaces';
import * as bcrypt from 'bcrypt';
import { PositionService } from '../../position';
import { initEmployee } from '../../common/init.data';

@Injectable()
export class EmployeeService implements OnModuleInit {
  constructor(
    private dataSource: DataSource,
    @Inject('PositionService') private positionService: PositionService,
  ) {}

  async onModuleInit() {
    console.log('onModuleInit');
    await this.createEmployee(initEmployee as any);
    console.log('CreatePosition Success');
  }

  get repo(): Repository<Employee> {
    return this.dataSource.getRepository(Employee);
  }

  public getEmployees(): Promise<Employee[]> {
    return this.repo.find({ relations: ['position'] });
  }

  public getEmployeeById(id: number): Promise<Employee> {
    return this.repo.findOne({ where: { id } });
  }

  public async createEmployee(props: EmployeeProps): Promise<Employee> {
    const employee = await this.repo.findOne({ where: { email: props.email } });

    if (employee != null) return employee;

    const positionId = parseInt(props.position as any);

    const position = await this.positionService.getPositionById(positionId);

    if (position == null) {
      throw new BadRequestException(null, 'Position Not Found');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(props.password, salt);

    const data = this.repo.create({ ...props, password: hash, salt });

    try {
      return this.repo.save(data);
    } catch (error) {
      throw error;
    }
  }

  public async updateEmployee(
    employeeId: number,
    props: Partial<EmployeeProps>,
  ) {
    const employee = await this.repo.findOne({ where: { id: employeeId } });

    delete props.password;

    if (employee == null) return;

    return this.repo.save({
      ...employee,
      ...props,
    });
  }

  public async deleteEmployee(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
