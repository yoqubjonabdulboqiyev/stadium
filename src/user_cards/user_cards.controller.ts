import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserCardsService } from './user_cards.service';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';

@Controller('user-cards')
export class UserCardsController {
  constructor(private readonly userCardsService: UserCardsService) {}

  @Post('/create')
  createCard(@Body() createUserCardDto: CreateUserCardDto) {
    return this.userCardsService.createCard(createUserCardDto);
  }

  @Get()
  findAllCards() {
    return this.userCardsService.findAllCards();
  }

  @Get(':id')
  findOneCard(@Param('id') id: string) {
    return this.userCardsService.findOneCard(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserCardDto: UpdateUserCardDto,
  ) {
    return this.userCardsService.updateCard(+id, updateUserCardDto);
  }

  @Delete(':id')
  removeCard(@Param('id') id: string) {
    return this.userCardsService.removeCard(+id);
  }
}
