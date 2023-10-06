import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, DataType, Column } from 'sequelize-typescript';

interface RegionAttributes {
  name: string;
}
@Table({
  tableName: 'regions',
})
export class Region extends Model<Region, RegionAttributes> {
  @ApiProperty({
    example: 1,
    description: 'region id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'fergana',
    description: 'region name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
