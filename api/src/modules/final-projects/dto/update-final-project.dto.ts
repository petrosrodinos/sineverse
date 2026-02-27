import { PartialType } from '@nestjs/swagger';
import { CreateFinalProjectDto } from './create-final-project.dto';

export class UpdateFinalProjectDto extends PartialType(CreateFinalProjectDto) {}