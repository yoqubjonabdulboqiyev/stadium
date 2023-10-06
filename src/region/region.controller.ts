import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post('create')
  createCategory(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.createRegion(createRegionDto);
  }

  @Get()
  findAllCategory() {
    return this.regionService.findAllRegion();
  }

  @Get(':id')
  findOneCategory(@Param('id') id: string) {
    return this.regionService.findOneRegion(+id);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionService.updateRegion(+id, updateRegionDto);
  }

  @Delete(':id')
  removeCategory(@Param('id') id: string) {
    return this.regionService.removeRegion(+id);
  }
}
