import { Args, Query, Resolver } from '@nestjs/graphql';
import { IntroduceTable } from 'src/dto/introduce.dto';
import { IntroduceService } from './introduce.service';

@Resolver(() => IntroduceTable)
export class IntroduceResolver {
  constructor(private readonly introduceService: IntroduceService) {}

  @Query(() => [IntroduceTable])
  async getIntroduces(): Promise<IntroduceTable[]> {
    return await this.introduceService.findAll();
  }

  @Query(() => IntroduceTable)
  async getIntroducesBySectionId(
    @Args('section_id') sectionId: number,
  ): Promise<IntroduceTable> {
    return await this.introduceService.findBySectionId(sectionId);
  }

  @Query(() => IntroduceTable)
  async getIntroduceById(@Args('id') id: number): Promise<IntroduceTable> {
    return await this.introduceService.findById(id);
  }
}
