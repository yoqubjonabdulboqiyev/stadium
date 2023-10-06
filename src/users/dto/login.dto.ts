import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
