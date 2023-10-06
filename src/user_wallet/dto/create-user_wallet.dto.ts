import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateUserWalletDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
  @IsNumber()
  @IsNotEmpty()
  wallet: number;
}
