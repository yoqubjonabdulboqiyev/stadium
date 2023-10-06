import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';

@Controller('comforts')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @Post('create')
  createCategory(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.createComfort(createComfortDto);
  }

  @Get()
  findAllCategory() {
    return this.comfortService.findAllComfort();
  }

  @Get(':id')
  findOneCategory(@Param('id') id: string) {
    return this.comfortService.findOneComfort(+id);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateComfortDto: UpdateComfortDto,
  ) {
    return this.comfortService.updateComfort(+id, updateComfortDto);
  }

  @Delete(':id')
  removeCategory(@Param('id') id: string) {
    return this.comfortService.removeComfort(+id);
  }
}
