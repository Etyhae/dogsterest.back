import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('/add')
  async addDogs(): Promise<Image[]> {
    return this.imagesService.addDogs();
  }

  @Get('/woof')
  async getDog(): Promise<Image[]> {
    return this.imagesService.getDog();
  }

  @Patch(':id/like')
  async setLike(@Param('id') id: number): Promise<Image> {
    const updateImageDto = new UpdateImageDto();
    updateImageDto.id = id;
    return this.imagesService.setLike(updateImageDto);
  }
}
