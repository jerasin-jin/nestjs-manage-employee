import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  NotFoundException,
  BadRequestException,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from '../services';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';
import { JwtAuthGuard } from '../../guard';
import { Roles } from '../../common/roles.decorator';
import { MasterPosition } from '../../position';

@UseGuards(JwtAuthGuard)
@Roles(MasterPosition.Admin)
@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject('EmployeeService') private employeeService: EmployeeService,
  ) {}

  @Get('all')
  async getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: number) {
    return this.employeeService.getEmployeeById(id);
  }

  @Post()
  async createEmployee(@Body() body: CreateEmployeeDto) {
    return this.employeeService.createEmployee(body);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() body: UpdateEmployeeDto,
  ) {
    const result = await this.employeeService.updateEmployee(id, body);

    if (result == null) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number) {
    const result = await this.employeeService.deleteEmployee(id);

    if (result.affected > 0) return 'Delete Success';

    throw new BadRequestException();
  }
}
