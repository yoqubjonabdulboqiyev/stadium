import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.model';
@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly regionRepo: typeof Region,
  ) {}
  async createRegion(createRegionDto: CreateRegionDto) {
    const existsRegion = await this.regionRepo.findOne({
      where: {
        name: createRegionDto.name,
      },
    });
    if (existsRegion) {
      throw new BadRequestException('Region already exists');
    }
    try {
      const newRegion = await this.regionRepo.create(createRegionDto);
      return {
        message: 'Region created successfully',
        region: newRegion,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllRegion() {
    const regions = await this.regionRepo.findAll();
    if (regions.length >= 1) {
      return {
        message: 'Region fetched successfully',
        regions,
      };
    }
    throw new HttpException('Regions not found', HttpStatus.NOT_FOUND);
  }

  async findOneRegion(id: number) {
    const region = await this.regionRepo.findByPk(id);
    if (!region) {
      throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Region fetched successfully',
      region,
    };
  }

  async updateRegion(id: number, updateRegionDto: UpdateRegionDto) {
    const updateRegion = await this.regionRepo
      .update(updateRegionDto, {
        where: {
          id: id,
        },
        returning: true,
      })
      .then((data) => data[1][0]);

    if (!updateRegion) {
      throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Region updated successfully',
      region: updateRegion,
    };
  }

  async removeRegion(id: number) {
    const removeRegion = await this.regionRepo.destroy({
      where: {
        id: id,
      },
    });
    if (!removeRegion) {
      throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Region removed successfully',
      region: removeRegion,
    };
  }
}
