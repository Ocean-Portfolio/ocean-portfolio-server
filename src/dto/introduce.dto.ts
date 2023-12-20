import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VisibleStatus } from 'src/types/common';

@ObjectType()
export class IntroduceTable {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  slogan: string;

  @Field({ nullable: true })
  intro_text: string;

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
