import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SNSLinkTable {
  @Field(() => ID)
  id: number;

  @Field()
  type: string;

  @Field()
  link: string;

  @Field()
  visible_status: VisibleStatus;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  user_id: number;
}
