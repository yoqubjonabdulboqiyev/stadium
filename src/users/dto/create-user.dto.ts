import {
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    example: '<NAME>',
    description: 'user first name',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;
  @ApiProperty({
    example: '<NAME>',
    description: 'user last name',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;
  @ApiProperty({
    example: '<Username>',
    description: 'username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    example: '<Password>',
    description: 'hashed password',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
  })
  password: string;
  @ApiProperty({
    example: '<password>',
    description: 'confirm password',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
  @ApiProperty({
    example: '<Telegram Link>',
    description: 'telegram link',
  })
  @IsString()
  @IsNotEmpty()
  telegram_link: string;
  @ApiProperty({
    example: '<Email>',
    description: 'email',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '<998901236352>',
    description: 'phone number',
  })
  @IsPhoneNumber('UZ')
  phone: string;
  @ApiProperty({
    example: '<User Photo>',
    description: 'user photo',
  })
  @ApiProperty({
    example: '2000.01.01',
    description: 'birthday',
  })
  @IsNotEmpty()
  birthday: Date;
}
