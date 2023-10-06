import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserWallet } from './models/user_wallet.model';

@Injectable()
export class UserWalletService {
  constructor(
    @InjectModel(UserWallet) private readonly userWalletRepo: typeof UserWallet,
  ) {}
  async createWallet(createUserWalletDto: CreateUserWalletDto) {
    const findWallet = await this.userWalletRepo.findOne({
      where: { wallet: createUserWalletDto.wallet },
    });
    if (!findWallet) {
      const newWallet = await this.userWalletRepo.create(createUserWalletDto);
      if (newWallet) {
        return {
          message: 'Wallet created successfully',
          wallet: newWallet,
        };
      } else {
        throw new HttpException(
          'Wallet not created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    throw new HttpException('Wallet already exists', HttpStatus.BAD_REQUEST);
  }

  async findAllUserWallets() {
    const wallets = await this.userWalletRepo.findAll();
    if (!wallets) {
      throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Wallets found successfully',
      wallets,
    };
  }

  async findOneWallet(id: number) {
    const wallet = await this.userWalletRepo.findByPk(id);
    if (!wallet) {
      throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Wallet found successfully',
      wallet,
    };
  }

  async updateWallet(id: number, updateUserWalletDto: UpdateUserWalletDto) {
    const updatedWallet = await this.userWalletRepo
      .update(updateUserWalletDto, {
        where: {
          id,
        },
        returning: true,
      })
      .then((result) => result[1][0]);

    if (!updatedWallet) {
      throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Wallet updated successfully',
      wallet: updatedWallet,
    };
  }

  async removeWallet(id: number) {
    const res = await this.userWalletRepo.destroy({
      where: {
        id,
      },
    });
    if (!res) {
      throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Wallet deleted successfully',
    };
  }
}
