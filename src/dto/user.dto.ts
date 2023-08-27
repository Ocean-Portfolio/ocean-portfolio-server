import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserTable {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field({ nullable: true })
  last_login: string;
}
