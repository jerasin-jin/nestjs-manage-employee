import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource, Repository, DeleteResult } from 'typeorm';
import { Position } from '../models';
import { PositionProps } from '../interfaces';
import { CreatePositionDto } from '../dto';
import { initPosition } from '../../common/init.data';
@Injectable()
export class PositionService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    console.log('onModuleInit');
    await this.createPosition(initPosition);
    console.log('CreatePosition Success');
  }

  get repo(): Repository<Position> {
    return this.dataSource.getRepository(Position);
  }

  public getPositions(): Promise<Position[]> {
    return this.repo.find();
  }

  public getPositionById(id: number): Promise<Position> {
    return this.repo.findOne({ where: { id } });
  }

  public async createPosition(props: CreatePositionDto): Promise<Position> {
    const position = await this.repo.findOne({ where: { name: props.name } });

    if (position != null || position?.code == props.code) return;

    const data = this.repo.create(props);

    try {
      return this.repo.save(data);
    } catch (error) {
      return error;
    }
  }

  public async updatePosition(
    positionId: number,
    props: Partial<PositionProps>,
  ) {
    const position = await this.repo.findOne({ where: { id: positionId } });

    if (position == null) return;

    return this.repo.save({
      ...position,
      ...props,
    });
  }

  public async deletePosition(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
