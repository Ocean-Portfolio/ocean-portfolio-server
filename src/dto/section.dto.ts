import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SectionTable {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  visible_status: VisibleStatus;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  user_id: number;
}
