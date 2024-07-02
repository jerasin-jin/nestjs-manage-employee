import {
  Controller,
  Inject,
  Get,
  Param,
  Post,
  Body,
  BadRequestException,
  Put,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { PositionService } from '../services';
import { CreatePositionDto, UpdatePositionDto } from '../dto';
import { Roles } from '../../common/roles.decorator';
import { MasterPosition } from '../interfaces';
import { JwtAuthGuard } from '../../guard';

@UseGuards(JwtAuthGuard)
@Roles(MasterPosition.Admin)
@Controller('position')
export class PositionController {
  constructor(
    @Inject('PositionService') private positionService: PositionService,
  ) {}

  @Get('all')
  async getPositions() {
    return this.positionService.getPositions();
  }

  @Get(':id')
  async getPositionById(@Param('id') id: number) {
    return this.positionService.getPositionById(id);
  }

  @Post()
  async createPosition(@Body() body: CreatePositionDto) {
    const result = await this.positionService.createPosition(body);

    if (result == null) throw new BadRequestException();

    return result;
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() body: UpdatePositionDto,
  ) {
    const result = await this.positionService.updatePosition(id, body);

    if (result == null) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number) {
    const result = await this.positionService.deletePosition(id);

    if (result.affected > 0) return 'Delete Success';

    throw new BadRequestException();
  }
}
