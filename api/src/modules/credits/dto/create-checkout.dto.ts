import { IsString, MinLength } from 'class-validator';

export class CreateCreditCheckoutDto {
  @IsString()
  @MinLength(1)
  pack_key: string;
}
