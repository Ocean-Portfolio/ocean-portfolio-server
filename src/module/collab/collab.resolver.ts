import { CollabTable } from 'src/dto/collab.dto';
import { CollabService } from './collab.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => CollabTable)
export class CollabResolver {
  constructor(private readonly contactService: CollabService) {}

  @Query(() => [CollabTable])
  async getCollab(): Promise<CollabTable[]> {
    return await this.contactService.findAll();
  }
}
