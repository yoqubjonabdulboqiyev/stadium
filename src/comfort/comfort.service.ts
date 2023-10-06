import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './models/comfort.model';
@Injectable()
export class ComfortService {
  constructor(
    @InjectModel(Comfort) private readonly comfortRepo: typeof Comfort,
  ) {}
  async createComfort(createComfortDto: CreateComfortDto) {
    const existsCategory = await this.comfortRepo.findOne({
      where: {
        name: createComfortDto.name,
      },
    });
    if (existsCategory) {
      throw new BadRequestException('Comfort already exists');
    }
    try {
      const newComfort = await this.comfortRepo.create(createComfortDto);
      return {
        message: 'Comfort created successfully',
        category: newComfort,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllComfort() {
    const comforts = await this.comfortRepo.findAll();
    if (comforts.length >= 1) {
      return {
        message: 'Comfort fetched successfully',
        comforts,
      };
    }
    throw new HttpException('Comforts not found', HttpStatus.NOT_FOUND);
  }

  async findOneComfort(id: number) {
    const comfort = await this.comfortRepo.findByPk(id);
    if (!comfort) {
      throw new HttpException('Comfort not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Comfort fetched successfully',
      comfort,
    };
  }

  async updateComfort(id: number, updateCategoryDto: UpdateComfortDto) {
    const updateComfort = await this.comfortRepo
      .update(updateCategoryDto, {
        where: {
          id: id,
        },
        returning: true,
      })
      .then((data) => data[1][0]);

    if (!updateComfort) {
      throw new HttpException('Comfort not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Comfort updated successfully',
      category: updateComfort,
    };
  }

  async removeComfort(id: number) {
    const removeComfort = await this.comfortRepo.destroy({
      where: {
        id: id,
      },
    });
    if (!removeComfort) {
      throw new HttpException('Comfort not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Comfort removed successfully',
      comfort: removeComfort,
    };
  }
}
