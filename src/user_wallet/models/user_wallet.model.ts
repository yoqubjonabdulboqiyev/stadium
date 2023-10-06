import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'sequelize-typescript';
import {
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
interface UserWalletAttr {
  id: number;
  user_id: number;
  wallet: number;
}
@Table({
  tableName: 'user_wallet',
})
export class UserWallet extends Model<UserWallet, UserWalletAttr> {
  @ApiProperty({
    example: 1,
    description: 'Wallet',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ApiProperty({
    example: 1,
    description: 'User id',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;
  @ApiProperty({
    example: 1,
    description: 'Wallet',
  })
  @Column({
    type: DataType.BIGINT,
  })
  wallet: number;
  @BelongsTo(() => User)
  user: User;
}
