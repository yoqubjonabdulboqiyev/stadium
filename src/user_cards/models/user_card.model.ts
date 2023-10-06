import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, DataType, Model } from 'sequelize-typescript';

interface UserCardModelAttr {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  number: string;
  year: number;
  month: number;
  is_active: boolean;
  is_main: boolean;
}
@Table({
  tableName: 'user_cards',
})
export class UserCard extends Model<UserCard, UserCardModelAttr> {
  @ApiProperty({
    example: 1,
    description: 'user-card id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 1,
    description: 'user id',
  })
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;
  @ApiProperty({
    example: '<NAME>',
    description: 'name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ApiProperty({
    example: '0987654321',
    description: 'phone',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;
  @ApiProperty({
    example: '0987654321',
    description: 'number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  number: string;
  @ApiProperty({
    example: 2020,
    description: 'year',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;
  @ApiProperty({
    example: 1,
    description: 'month',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  month: number;
  @ApiProperty({
    example: true,
    description: 'is_active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
  @ApiProperty({
    example: true,
    description: 'is_main',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_main: boolean;
}
