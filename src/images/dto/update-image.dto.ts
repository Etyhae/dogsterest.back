import { PartialType } from '@nestjs/mapped-types';
import { ImageDto } from './get-image.dto';

export class UpdateImageDto extends PartialType(ImageDto) {
  id: number;
}
