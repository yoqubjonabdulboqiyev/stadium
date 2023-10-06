import { IsString, IsNotEmpty } from 'class-validator';
export class CreateComfortDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
