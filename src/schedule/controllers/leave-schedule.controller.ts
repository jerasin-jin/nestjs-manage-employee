import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LeaveScheduleService } from '../services';
import {
  CreateLeaveScheduleDto,
  UpdateLeaveScheduleDto,
} from '../dto/leave-schedule.dto';
import { JwtAuthGuard } from '../../guard';
import { Roles } from '../../common/roles.decorator';
import { MasterPosition } from '../../position';

@Controller('leaveSchedule')
export class LeaveScheduleController {
  constructor(
    @Inject('LeaveScheduleService')
    private leaveScheduleService: LeaveScheduleService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Roles(MasterPosition.Admin)
  @Get('all')
  async getLeaveSchedules() {
    return this.leaveScheduleService.getLeaveSchedules();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getLeaveSchedule(@Param('id') id: number) {
    return this.leaveScheduleService.getLeaveSchedule(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createLeaveSchedule(@Body() body: CreateLeaveScheduleDto) {
    return this.leaveScheduleService.createLeaveSchedule(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateLeaveSchedule(
    @Param('id') id: number,
    @Body() body: UpdateLeaveScheduleDto,
  ) {
    return this.leaveScheduleService.updateLeaveSchedule(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(MasterPosition.Admin)
  @Delete(':id')
  async deleteLeaveSchedule(@Param('id') id: number) {
    return this.leaveScheduleService.deleteLeaveSchedule(id);
  }
}
