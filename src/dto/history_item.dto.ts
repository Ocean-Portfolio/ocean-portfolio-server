import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DateType, HistoryMode, VisibleStatus } from 'src/types/common';

@ObjectType()
export class HistoryItemTable {
  @Field(() => ID)
  id: number;

  @Field()
  sort_order: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  position: string;

  @Field({ nullable: true })
  content: string;

  @Field()
  date_type: DateType;

  @Field({ nullable: true })
  start_date: string;

  @Field({ nullable: true })
  end_date: string;

  @Field()
  visible_status: VisibleStatus;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  history_id: number;
}
