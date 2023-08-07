import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PlanDate {
  @Field()
  plan_date: string;

  @Field({ nullable: true })
  plan_time?: string;
}

@ObjectType()
export class BillingTable {
  @Field(() => ID)
  id: string;

  @Field()
  billing_title: string;

  @Field()
  bill: number;

  @Field()
  travel_plan_id: number;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}

@ObjectType()
export class TravelPlanTable {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field()
  plan_date: string;

  @Field({ nullable: true })
  plan_time?: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}

@ObjectType()
export class TravelPlanItem {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field(() => PlanDate, { nullable: true })
  planning: PlanDate;

  @Field(() => [BillingTable], { nullable: true })
  billing_list: BillingTable[];

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
