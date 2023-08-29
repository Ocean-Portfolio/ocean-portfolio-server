import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class KeywordTable {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  main_text: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  visible_status: VisibleStatus;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  category_id: number;
}
