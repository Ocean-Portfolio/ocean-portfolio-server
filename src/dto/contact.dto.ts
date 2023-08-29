import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactTable {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  email_description: string;

  @Field()
  visible_status: VisibleStatus;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  section_id: number;
}
