import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SectionType, VisibleStatus } from 'src/types/common';

@ObjectType()
export class SectionTable {
  @Field(() => ID)
  id: number;

  @Field()
  sort_order: number;

  @Field()
  name: string;

  @Field()
  section_type: SectionType;

  @Field()
  visible_status: VisibleStatus;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  user_id: number;
}
