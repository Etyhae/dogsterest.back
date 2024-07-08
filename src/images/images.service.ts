import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { UpdateImageDto } from './dto/update-image.dto';
import axios from 'axios';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async getDog(): Promise<Image[]> {
    const randomDogImage = await this.imagesRepository.find();

    return this.imagesRepository.save(randomDogImage);
  }

  async addDogs(): Promise<Image[]> {
    const url = 'https://random.dog/doggos';

    try {
      const res = await axios.get(url);
      const images: Image[] = res.data.map((image: Image) => ({
        url: image,
      }));

      return await this.imagesRepository.save(images);
    } catch (error) {
      console.error('Error fetching or saving images:', error);
      throw error;
    }
  }

  async setLike(UpdateImageDto: UpdateImageDto): Promise<Image> {
    try {
      const image = await this.imagesRepository.findOne({
        where: { id: UpdateImageDto.id },
      });
      if (!image) {
        throw new Error('Image not found');
      }

      await this.imagesRepository.increment(
        { id: UpdateImageDto.id },
        'likes',
        1,
      );

      return await this.imagesRepository.findOne({
        where: { id: UpdateImageDto.id },
      });
    } catch (error) {
      console.error('Error image like:', error);
      throw new InternalServerErrorException('Failed update image likes');
    }
  }
}
