import { Args, Query, Resolver } from '@nestjs/graphql';
import { SNSLinkTable } from 'src/dto/sns_link.dto';
import { SNSLinkService } from 'src/module/sns_link/sns_link.service';

@Resolver(() => SNSLinkTable)
export class SNSLinkResolver {
  constructor(private readonly snsLinkService: SNSLinkService) {}

  @Query(() => [SNSLinkTable])
  async getSNSByUserId(
    @Args('user_id') userId: number,
  ): Promise<SNSLinkTable[]> {
    return await this.snsLinkService.findByUserId(userId);
  }

  @Query(() => [SNSLinkTable])
  async getSNSByName(@Args('name') name: string): Promise<SNSLinkTable[]> {
    return await this.snsLinkService.findByType(name);
  }

  @Query(() => SNSLinkTable)
  async getSNSById(@Args('id') id: number): Promise<SNSLinkTable> {
    return await this.snsLinkService.findById(id);
  }
}
