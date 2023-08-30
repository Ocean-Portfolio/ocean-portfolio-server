import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VisibleStatus } from 'src/types/common';

@ObjectType()
export class CollabTable {
  @Field(() => ID)
  id: number;

  @Field()
  collab_text: string;

  @Field()
  notion_link: string;

  @Field()
  visible_status: VisibleStatus;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
