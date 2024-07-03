import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

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
