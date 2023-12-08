import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ImageTable } from 'src/dto/image.dto';
import { ImageService } from './image.service';

@Resolver(() => ImageTable)
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Query(() => [ImageTable])
  async getImage(): Promise<ImageTable[]> {
    return await this.imageService.findAll();
  }

  @Query(() => [ImageTable])
  async getImageByName(@Args('name') name: string): Promise<ImageTable[]> {
    return await this.imageService.findByName(name);
  }

  @Query(() => ImageTable)
  async getImageById(@Args('id') id: number): Promise<ImageTable> {
    return await this.imageService.findById(id);
  }

  // @Mutation(() => ImageTable)
  // async deleteImage(@Args('id') id: number): Promise<ImageTable> {
  //   return await this.imageService.deleteImage(id);
  // }
}
