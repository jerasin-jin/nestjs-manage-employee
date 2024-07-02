import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
// import { PositionName } from '../interfaces';

export class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}

export class UpdatePositionDto extends CreatePositionDto {
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
