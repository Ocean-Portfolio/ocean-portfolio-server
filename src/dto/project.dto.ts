import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DateType, EndTime, VisibleStatus } from 'src/types/common';

@ObjectType()
export class ProjectTable {
  @Field(() => ID)
  id: number;

  @Field()
  sort_order: number;

  @Field()
  mode: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  content: string;

  @Field()
  date_type: DateType;

  @Field()
  end_time: EndTime;

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
  section_id: number;

  @Field({ nullable: true })
  image_id: number;
}
