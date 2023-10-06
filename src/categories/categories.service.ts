import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryRepo: typeof Category,
  ) {}
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const existsCategory = await this.categoryRepo.findOne({
      where: {
        name: createCategoryDto.name,
      },
    });
    if (existsCategory) {
      throw new BadRequestException('Category already exists');
    }
    try {
      const newCategory = await this.categoryRepo.create(createCategoryDto);
      return {
        message: 'Category created successfully',
        category: newCategory,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllCategory() {
    const categories = await this.categoryRepo.findAll();
    if (categories.length >= 1) {
      return {
        message: 'Categories fetched successfully',
        categories,
      };
    }
    throw new HttpException('Categories not found', HttpStatus.NOT_FOUND);
  }

  async findOneCategory(id: number) {
    const category = await this.categoryRepo.findByPk(id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Category fetched successfully',
      category,
    };
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = await this.categoryRepo
      .update(updateCategoryDto, {
        where: {
          id: id,
        },
        returning: true,
      })
      .then((data) => data[1][0]);

    if (!updateCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Category updated successfully',
      category: updateCategory,
    };
  }

  async removeCategory(id: number) {
    const removeCategory = await this.categoryRepo.destroy({
      where: {
        id: id,
      },
    });
    if (!removeCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Category removed successfully',
      category: removeCategory,
    };
  }
}
