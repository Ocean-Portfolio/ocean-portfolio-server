import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VisibleStatus } from 'src/types/common';

@ObjectType()
export class ImageTable {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  storage_url: string;

  @Field()
  generation_id: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  visible_status: VisibleStatus;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
