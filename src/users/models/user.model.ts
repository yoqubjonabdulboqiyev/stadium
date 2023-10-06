import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { UserWallet } from 'src/user_wallet/models/user_wallet.model';

interface UserAttributes {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  telegram_link: string;
  email: string;
  phone: string;
  user_photo: string;
  birthday: Date;
  is_owner: boolean;
  is_active: boolean;
  hashed_refresh_token: string;
}
@Table({
  tableName: 'users',
})
export class User extends Model<User,UserAttributes> {
  @ApiProperty({
    example: 1,
    description: 'user id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: '<NAME>',
    description: 'user first name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;
  @ApiProperty({
    example: '<NAME>',
    description: 'user last name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;
  @ApiProperty({
    example: '<Username>',
    description: 'username',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;
  @ApiProperty({
    example: '<Password>',
    description: 'hashed password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @ApiProperty({
    example: '<Telegram Link>',
    description: 'telegram link',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  telegram_link: string;
  @ApiProperty({
    example: '<Email>',
    description: 'email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;
  @ApiProperty({
    example: '<Phone>',
    description: 'phone',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;
  @ApiProperty({
    example: '<User Photo>',
    description: 'user photo',
  })
  @Column({
    type: DataType.STRING,
  })
  user_photo: string;
  @ApiProperty({
    example: '<Birthday>',
    description: 'birthday',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthday: Date;
  @ApiProperty({
    example: '<Is Owner>',
    description: 'is owner',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;
  @ApiProperty({
    example: '<true>',
    description: 'is active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
  @ApiProperty({
    example: 'token',
    description: 'is refresh token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
  @HasOne(() => UserWallet)
  wallet: UserWallet;
}
