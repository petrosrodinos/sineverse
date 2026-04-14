import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SceneOrderDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsNumber()
  @IsNotEmpty()
  order: number;
}

export class ReorderScenesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SceneOrderDto)
  scenes: SceneOrderDto[];
}
