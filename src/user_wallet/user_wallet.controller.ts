import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserWalletService } from './user_wallet.service';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';

@Controller('user-wallets')
export class UserWalletController {
  constructor(private readonly userWalletService: UserWalletService) {}

  @Post('create')
  createWallet(@Body() createUserWalletDto: CreateUserWalletDto) {
    return this.userWalletService.createWallet(createUserWalletDto);
  }

  @Get()
  findAllUserWallets() {
    return this.userWalletService.findAllUserWallets();
  }
  @Get(':id')
  findOneWallet(@Param('id') id: string) {
    return this.userWalletService.findOneWallet(+id);
  }
  @Put(':id')
  updateWallet(
    @Param('id') id: string,
    @Body() updateUserWalletDto: UpdateUserWalletDto,
  ) {
    return this.userWalletService.updateWallet(+id, updateUserWalletDto);
  }

  @Delete(':id')
  removeWallet(@Param('id') id: string) {
    return this.userWalletService.removeWallet(+id);
  }
}
