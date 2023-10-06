import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserCard } from './models/user_card.model';

@Injectable()
export class UserCardsService {
  constructor(
    @InjectModel(UserCard) private readonly userCardRepo: typeof UserCard,
  ) {}
  async createCard(createUserCardDto: CreateUserCardDto) {
    const findCard = await this.userCardRepo.findOne({
      where: {
        number: createUserCardDto.number,
      },
    });
    if (!findCard) {
      const newCard = await this.userCardRepo.create(createUserCardDto);
      if (newCard) {
        return {
          message: 'User Card Created Successfully',
          card: newCard,
        };
      } else {
        throw new HttpException(
          'INTERNAL SERVER ERROR',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        'Card Number Already Exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllCards() {
    const cards = await this.userCardRepo.findAll();
    if (!cards) {
      throw new HttpException('Cards Not Found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Cards Found Successfully',
      cards,
    };
  }

  async findOneCard(id: number) {
    const card = await this.userCardRepo.findByPk(id);
    if (!card) {
      throw new HttpException('Card Not Found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Card Found Successfully',
      card,
    };
  }

  async updateCard(id: number, updateUserCardDto: UpdateUserCardDto) {
    const updatedCard = await this.userCardRepo
      .update(updateUserCardDto, {
        where: {
          id,
        },
        returning: true,
      })
      .then((res) => res[1][0]);

    if (!updatedCard) {
      throw new HttpException('card not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Card updated successfully',
      card: updatedCard,
    };
  }

  async removeCard(id: number) {
    const res = await this.userCardRepo.destroy({
      where: {
        id,
      },
    });
    if (!res) {
      throw new HttpException('card not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Card removed',
    };
  }
}
