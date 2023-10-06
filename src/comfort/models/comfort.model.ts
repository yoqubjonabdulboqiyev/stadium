import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, DataType, Column } from 'sequelize-typescript';

interface ComfortAttributes {
  name: string;
  parent_id: number;
}
@Table({
  tableName: 'comfort',
})
export class Comfort extends Model<Comfort, ComfortAttributes> {
  @ApiProperty({
    example: 1,
    description: 'comfort id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'big stadium',
    description: 'comfort name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
