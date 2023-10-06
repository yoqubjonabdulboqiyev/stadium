import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
  Column,
} from 'sequelize-typescript';

interface CategoryAttributes {
  name: string;
  parent_id: number;
}
@Table({
  tableName: 'categories',
})
export class Category extends Model<Category, CategoryAttributes> {
  @ApiProperty({
    example: 1,
    description: 'category id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'big stadium',
    description: 'category name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ForeignKey(() => Category)
  @ApiProperty({
    example: 1,
    description: 'category parent id',
  })
  @Column({
    type: DataType.INTEGER,
  })
  parent_id: number;
  @BelongsTo(() => Category)
  categoryParent: Category;
}
