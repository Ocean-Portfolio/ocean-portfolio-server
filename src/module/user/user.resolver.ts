import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { UserTable } from 'src/dto/user.dto';
import { UserService } from 'src/module/user/user.service';
import { GraphQLResolveInfo } from 'graphql';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserTable])
  async getUser(
    @Args('userId', { nullable: true }) userId?: string,
    @Info() info?: GraphQLResolveInfo,
  ): Promise<UserTable[]> {
    if (info && info.fieldNodes[0].selectionSet) {
      const requestedFields = info.fieldNodes[0].selectionSet.selections.map(
        (selection) => {
          if (selection.kind === 'Field' && selection.name.value) {
            return selection.name.value;
          }

          return '';
        },
      );

      return await this.userService.getUser(userId, requestedFields);
    }

    return await this.userService.getUser(userId);
  }
}
