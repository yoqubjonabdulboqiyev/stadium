import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Comfort } from 'src/comfort/models/comfort.model';

interface ComfortStadiumAttributes {
  name: string;
  stadium_id: number;
  comfort_id: number;
}
@Table({
  tableName: 'comfort_stadiums',
})
export class ComfortStadium extends Model<
  ComfortStadium,
  ComfortStadiumAttributes
> {
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
    example: '1',
    description: 'stadium id',
  })
  @Column({
    type: DataType.INTEGER,
  })
  stadium_id: number;
  @ForeignKey(() => Comfort)
  @ApiProperty({
    example: '1',
    description: 'comfort id',
  })
  @Column({
    type: DataType.INTEGER,
  })
  comfort_id: number;
  @BelongsTo(() => Comfort)
  comfort: Comfort;
}
