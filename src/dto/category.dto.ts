import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VisibleStatus } from 'src/types/common';

@ObjectType()
export class CategoryTable {
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
  section_id: number;
}
