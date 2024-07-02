import {
  Inject,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto';
import { EmployeeService, Employee } from '../../employee';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('EmployeeService') private employeeService: EmployeeService,
  ) {}

  public async validateUser(data: LoginDto): Promise<Employee> {
    const employee = await this.employeeService.repo.findOne({
      where: { email: data.email },
      relations: ['position'],
    });

    if (employee == null)
      throw new NotFoundException(null, 'Employee Not Found');

    const isMatch = await bcrypt.compare(data.password, employee.password);

    if (!isMatch) throw new UnauthorizedException(null, 'Unauthorized');

    return employee;
  }

  public async login(user: LoginDto) {
    const validate = await this.validateUser(user);
    const payload = {
      username: validate.email,
      position: validate.position.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
