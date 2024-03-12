import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VisibleStatus } from 'src/types/common';

@ObjectType()
export class HistoryImpactTable {
  @Field(() => ID)
  id: number;

  @Field()
  sort_order: number;

  @Field()
  before: string;

  @Field()
  after: string;

  @Field({ nullable: true })
  content: string;

  @Field()
  visible_status: VisibleStatus;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  history_item_id: number;
}
