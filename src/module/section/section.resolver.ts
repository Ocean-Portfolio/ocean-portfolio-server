import { Args, Query, Resolver } from '@nestjs/graphql';
import { SectionTable } from 'src/dto/section.dto';
import { SectionService } from 'src/service/section.service';

@Resolver(() => SectionTable)
export class SectionResolver {
  constructor(private readonly sectionService: SectionService) {}

  @Query(() => [SectionTable])
  async getSectionsByUserId(
    @Args('user_id') userId: number,
  ): Promise<SectionTable[]> {
    return await this.sectionService.findByUserId(userId);
  }

  @Query(() => [SectionTable])
  async getSectionsByName(@Args('name') name: string): Promise<SectionTable[]> {
    return await this.sectionService.findByName(name);
  }

  @Query(() => SectionTable)
  async getSectionById(@Args('id') id: number): Promise<SectionTable> {
    return await this.sectionService.findById(id);
  }
}
