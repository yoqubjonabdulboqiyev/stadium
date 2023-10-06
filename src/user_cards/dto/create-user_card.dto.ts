import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateUserCardDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  number: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
  @IsNotEmpty()
  @IsNumber()
  month: number;
}
