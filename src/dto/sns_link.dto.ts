import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VisibleStatus } from 'src/types/common';

@ObjectType()
export class SNSLinkTable {
  @Field(() => ID)
  id: number;

  @Field()
  type: string;

  @Field()
  link: string;

  @Field()
  visible_status: VisibleStatus;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  user_id: number;
}

@ObjectType()
export class CreateSNSLink {
  type: string;
  link: string;
  user_id: number;
}
