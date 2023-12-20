import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SectionType, VisibleStatus } from 'src/types/common';

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

  @Field()
  sort_order: number;

  @Field()
  section_type: SectionType;
}
