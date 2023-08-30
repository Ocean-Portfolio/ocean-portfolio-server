import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DateType, VisibleStatus } from 'src/types/common';

@ObjectType()
export class HistoryTable {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  position: string;

  @Field()
  date_type: DateType;

  @Field()
  start_date: string;

  @Field()
  end_date: string;

  @Field()
  visible_status: VisibleStatus;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  category_id: number;
}
