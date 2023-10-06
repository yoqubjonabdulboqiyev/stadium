import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Region } from 'src/region/models/region.model';

interface DistrictAttributes {
  name: string;
  region_id: number;
}
@Table({
  tableName: 'districts',
})
export class District extends Model<District, DistrictAttributes> {
  @ApiProperty({
    example: 1,
    description: 'district id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'al hilol',
    description: 'district name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ForeignKey(() => Region)
  @ApiProperty({
    example: '1',
    description: 'region id',
  })
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;
  @BelongsTo(() => Region)
  region: Region;
}
