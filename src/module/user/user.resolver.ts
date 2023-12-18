import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { UserTable } from 'src/dto/user.dto';
import { UserService } from 'src/module/user/user.service';
import { GraphQLResolveInfo } from 'graphql';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserTable])
  async getUsers(): Promise<UserTable[]> {
    return await this.userService.getUsers();
  }

  @Query(() => [UserTable])
  async getUserById(
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

      return await this.userService.getUserById(userId, requestedFields);
    }

    return await this.userService.getUserById(userId);
  }

  @Query(() => UserTable)
  async getUserByName(@Args('name') name: string): Promise<UserTable> {
    return await this.userService.getUserByName(name);
  }
}
