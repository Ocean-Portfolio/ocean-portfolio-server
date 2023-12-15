import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserTable {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field({ nullable: true })
  last_login: string;

  @Field({ nullable: true })
  job: string;

  @Field({ nullable: true })
  image_id: number;
}
